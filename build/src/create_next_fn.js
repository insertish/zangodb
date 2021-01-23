"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var merge = require('deepmerge');

var _require = require('./util.js'),
    hashify = _require.hashify,
    getIDBError = _require.getIDBError,
    filter = require('./filter.js'),
    sort = require('./sort.js');

var _require2 = require('./lang/filter.js'),
    build = _require2.build,
    Conjunction = _require2.Conjunction,
    Disjunction = _require2.Disjunction,
    Exists = _require2.Exists;

var toIDBDirection = function toIDBDirection(value) {
  return value > 0 ? 'next' : 'prev';
};

var joinPredicates = function joinPredicates(preds) {
  if (preds.length > 1) {
    return new Conjunction(preds);
  }

  return preds[0];
};

var removeClause = function removeClause(_ref) {
  var parent = _ref.parent,
      index = _ref.index;
  parent.args.splice(index, 1);
};

var openConn = function openConn(_ref2, cb) {
  var col = _ref2.col,
      read_pref = _ref2.read_pref;

  col._db._getConn(function (error, idb) {
    if (error) {
      return cb(error);
    }

    var name = col._name;

    try {
      var trans = idb.transaction([name], read_pref);

      trans.onerror = function (e) {
        return cb(getIDBError(e));
      };

      cb(null, trans.objectStore(name));
    } catch (error) {
      cb(error);
    }
  });
};

var getIDBReqWithIndex = function getIDBReqWithIndex(store, clause) {
  var key_range = clause.idb_key_range || null,
      direction = clause.idb_direction || 'next',
      literal = clause.path.literal;
  var index;

  if (literal === '_id') {
    index = store;
  } else {
    index = store.index(literal);
  }

  return index.openCursor(key_range, direction);
};

var getIDBReqWithoutIndex = function getIDBReqWithoutIndex(store) {
  return store.openCursor();
};

var buildPredicates = function buildPredicates(pipeline) {
  var new_pipeline = [];

  var _iterator = _createForOfIteratorHelper(pipeline),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          fn = _step$value[0],
          arg = _step$value[1];

      if (fn === filter) {
        var pred = build(arg);

        if (pred === false) {
          return;
        }

        if (!pred) {
          continue;
        }

        arg = pred;
      }

      new_pipeline.push([fn, arg]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return new_pipeline;
};

var initPredAndSortSpec = function initPredAndSortSpec(config) {
  var pipeline = config.pipeline,
      preds = [],
      sort_specs = [];
  var i = 0;

  var _iterator2 = _createForOfIteratorHelper(pipeline),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          fn = _step2$value[0],
          arg = _step2$value[1];

      if (fn === sort) {
        sort_specs.push(arg);
      } else if (fn === filter) {
        preds.push(arg);
      } else {
        break;
      }

      i++;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  pipeline.splice(0, i);
  config.pred = joinPredicates(preds);

  if (sort_specs.length) {
    config.sort_spec = sort_specs.reduce(merge, {});
  }
};

var getClauses = function getClauses(col, pred) {
  if (!pred) {
    return [];
  }

  var clauses = [],
      exists_clauses = [];

  var _iterator3 = _createForOfIteratorHelper(pred.getClauses()),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var clause = _step3.value;

      if (col._isIndexed(clause.path.literal)) {
        if (clause instanceof Exists) {
          exists_clauses.push(clause);
        } else {
          clauses.push(clause);
        }
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (clauses.length) {
    return clauses;
  }

  return exists_clauses;
};

var initClauses = function initClauses(config) {
  var col = config.col,
      pred = config.pred;
  config.clauses = getClauses(col, pred);
};

var initHint = function initHint(config) {
  if (!config.hint) {
    return;
  }

  var clauses = config.clauses,
      hint = config.hint;
  var new_clauses = [];

  var _iterator4 = _createForOfIteratorHelper(clauses),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var clause = _step4.value;

      if (clause.path.literal === hint) {
        new_clauses.push(clause);
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  if (!new_clauses.length) {
    new_clauses = [{
      path: {
        literal: hint
      }
    }];
  }

  config.clauses = new_clauses;
};

var initSort = function initSort(config) {
  if (!config.sort_spec) {
    return;
  }

  var clauses = config.clauses,
      spec = config.sort_spec,
      pipeline = config.pipeline;
  var new_clauses = [];

  var _iterator5 = _createForOfIteratorHelper(clauses),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var clause = _step5.value;
      var literal = clause.path.literal;

      if (!spec.hasOwnProperty(literal)) {
        continue;
      }

      var order = spec[literal];
      clause.idb_direction = toIDBDirection(order);
      new_clauses.push(clause);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if (new_clauses.length) {
    config.clauses = new_clauses;
  } else {
    pipeline.unshift([sort, spec]);
  }
};

var createGetIDBReqFn = function createGetIDBReqFn(_ref3) {
  var pred = _ref3.pred,
      clauses = _ref3.clauses,
      pipeline = _ref3.pipeline;
  var getIDBReq;

  if (clauses.length) {
    var clause = clauses[0];

    getIDBReq = function getIDBReq(store) {
      return getIDBReqWithIndex(store, clause);
    };

    if (!pred || clause === pred) {
      return getIDBReq;
    }

    removeClause(clause);
  } else {
    getIDBReq = getIDBReqWithoutIndex;

    if (!pred) {
      return getIDBReq;
    }
  }

  pipeline.unshift([filter, pred]);
  return getIDBReq;
};

var createGetIDBCurFn = function createGetIDBCurFn(config) {
  var idb_cur, idb_req;
  var getIDBReq = createGetIDBReqFn(config);

  var onIDBCur = function onIDBCur(cb) {
    idb_req.onsuccess = function (e) {
      idb_cur = e.target.result;
      cb();
    };

    idb_req.onerror = function (e) {
      return cb(getIDBError(e));
    };
  };

  var progressCur = function progressCur(cb) {
    onIDBCur(cb);
    idb_cur["continue"]();
  };

  var _getCur = function getCur(cb) {
    openConn(config, function (error, store) {
      if (error) {
        return cb(error);
      }

      idb_req = getIDBReq(store);
      onIDBCur(function (error) {
        if (idb_cur) {
          _getCur = progressCur;
        }

        cb(error);
      });
    });
  };

  return function (cb) {
    return _getCur(function (error) {
      return cb(error, idb_cur);
    });
  };
};

var addPipelineStages = function addPipelineStages(_ref4, next) {
  var pipeline = _ref4.pipeline;

  var _iterator6 = _createForOfIteratorHelper(pipeline),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _step6$value = _slicedToArray(_step6.value, 2),
          fn = _step6$value[0],
          arg = _step6$value[1];

      next = fn(next, arg);
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return next;
};

var createParallelNextFn = function createParallelNextFn(config) {
  var next_fns = [],
      pred_args = config.pred.args;

  for (var i = pred_args.length - 1; i >= 0; i--) {
    var new_config = {
      col: config.col,
      read_pref: config.read_pref,
      pred: pred_args[i],
      pipeline: []
    };
    initClauses(new_config);

    var _next = createNextFn(new_config);

    next_fns.push(addPipelineStages(new_config, _next));
  }

  var _id_hashes = new Set();

  var onDoc = function onDoc(doc) {
    var _id_hash = hashify(doc._id);

    if (!_id_hashes.has(_id_hash)) {
      return _id_hashes.add(_id_hash);
    }
  };

  var getNextFn = function getNextFn() {
    return next_fns.pop();
  };

  var currentNextFn = getNextFn();

  var changeNextFn = function changeNextFn(cb) {
    if (currentNextFn = getNextFn()) {
      next(cb);
    } else {
      cb();
    }
  };

  var next = function next(cb) {
    currentNextFn(function (error, doc, idb_cur) {
      if (error) {
        cb(error);
      } else if (!doc) {
        changeNextFn(cb);
      } else if (onDoc(doc)) {
        cb(null, doc, idb_cur);
      } else {
        next(cb);
      }
    });
  };

  var spec = config.sort_spec;

  if (spec) {
    config.pipeline.push([sort, spec]);
  }

  return next;
};

var createNextFn = function createNextFn(config) {
  var getIDBCur = createGetIDBCurFn(config);

  var next = function next(cb) {
    getIDBCur(function (error, idb_cur) {
      if (!idb_cur) {
        cb(error);
      } else {
        cb(null, idb_cur.value, idb_cur);
      }
    });
  };

  return next;
};

module.exports = function (cur) {
  var pipeline;

  try {
    pipeline = buildPredicates(cur._pipeline);
  } catch (error) {
    return function (cb) {
      return cb(error);
    };
  }

  if (!pipeline) {
    return function (cb) {
      return cb();
    };
  }

  var config = {
    col: cur._col,
    read_pref: cur._read_pref,
    hint: cur._hint,
    pipeline: pipeline
  };
  initPredAndSortSpec(config);
  var next;

  if (config.pred instanceof Disjunction) {
    next = createParallelNextFn(config);
  } else {
    initClauses(config);
    initHint(config);
    initSort(config);
    next = createNextFn(config);
  }

  return addPipelineStages(config, next);
};