"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./util.js'),
    toPathPieces = _require.toPathPieces,
    get = _require.get,
    set = _require.set,
    modify = _require.modify,
    remove1 = _require.remove1,
    rename = _require.rename,
    equal = _require.equal,
    unknownOp = _require.unknownOp,
    getIDBError = _require.getIDBError;

var ops = {};

ops.$set = function (path_pieces, value) {
  return function (doc) {
    set(doc, path_pieces, value);
  };
};

ops.$unset = function (path_pieces) {
  return function (doc) {
    return remove1(doc, path_pieces);
  };
};

ops.$rename = function (path_pieces, new_name) {
  return function (doc) {
    rename(doc, path_pieces, new_name);
  };
};

var modifyOp = function modifyOp(path_pieces, update, init) {
  return function (doc) {
    modify(doc, path_pieces, update, init);
  };
};

var arithOp = function arithOp(fn) {
  return function (path_pieces, value1) {
    var update = function update(obj, field) {
      var value2 = obj[field];

      if (typeof value2 === 'number') {
        obj[field] = fn(value1, value2);
      }
    };

    var init = function init(obj, field) {
      return obj[field] = 0;
    };

    return modifyOp(path_pieces, update, init);
  };
};

ops.$inc = arithOp(function (a, b) {
  return a + b;
});
ops.$mul = arithOp(function (a, b) {
  return a * b;
});

var compareOp = function compareOp(fn) {
  return function (path_pieces, value) {
    var update = function update(obj, field) {
      if (fn(value, obj[field])) {
        obj[field] = value;
      }
    };

    var init = function init(obj, field) {
      return obj[field] = value;
    };

    return modifyOp(path_pieces, update, init);
  };
};

ops.$min = compareOp(function (a, b) {
  return a < b;
});
ops.$max = compareOp(function (a, b) {
  return a > b;
});

ops.$push = function (path_pieces, value) {
  var update = function update(obj, field) {
    var elements = obj[field];

    if (Array.isArray(elements)) {
      elements.push(value);
    }
  };

  var init = function init(obj, field) {
    return obj[field] = [value];
  };

  return modifyOp(path_pieces, update, init);
};

ops.$pop = function (path_pieces, direction) {
  var pop;

  if (direction < 1) {
    pop = function pop(e) {
      return e.shift();
    };
  } else {
    pop = function pop(e) {
      return e.pop();
    };
  }

  return function (doc) {
    get(doc, path_pieces, function (obj, field) {
      var elements = obj[field];

      if (Array.isArray(elements)) {
        pop(elements);
      }
    });
  };
};

ops.$pullAll = function (path_pieces, values) {
  return function (doc) {
    get(doc, path_pieces, function (obj, field) {
      var elements = obj[field];

      if (!Array.isArray(elements)) {
        return;
      }

      var new_elements = [];

      var hasValue = function hasValue(value1) {
        var _iterator = _createForOfIteratorHelper(values),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value2 = _step.value;

            if (equal(value1, value2)) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      var _iterator2 = _createForOfIteratorHelper(elements),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var element = _step2.value;

          if (!hasValue(element)) {
            new_elements.push(element);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      obj[field] = new_elements;
    });
  };
};

ops.$pull = function (path_pieces, value) {
  return ops.$pullAll(path_pieces, [value]);
};

ops.$addToSet = function (path_pieces, value) {
  return function (doc) {
    get(doc, path_pieces, function (obj, field) {
      var elements = obj[field];

      if (!Array.isArray(elements)) {
        return;
      }

      var _iterator3 = _createForOfIteratorHelper(elements),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;

          if (equal(element, value)) {
            return;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      elements.push(value);
    });
  };
};

var build = function build(steps, field, value) {
  if (field[0] !== '$') {
    return steps.push(ops.$set(toPathPieces(field), value));
  }

  var op = ops[field];

  if (!op) {
    unknownOp(field);
  }

  for (var path in value) {
    steps.push(op(toPathPieces(path), value[path]));
  }
};

module.exports = function (cur, spec, cb) {
  var steps = [];

  for (var field in spec) {
    build(steps, field, spec[field]);
  }

  if (!steps.length) {
    return cb(null);
  }

  (function iterate() {
    cur._next(function (error, doc, idb_cur) {
      if (!doc) {
        return cb(error);
      }

      var _iterator4 = _createForOfIteratorHelper(steps),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var fn = _step4.value;
          fn(doc);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var idb_req = idb_cur.update(doc);
      idb_req.onsuccess = iterate;

      idb_req.onerror = function (e) {
        return cb(getIDBError(e));
      };
    });
  })();
};