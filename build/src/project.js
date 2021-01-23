"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./util.js'),
    toPathPieces = _require.toPathPieces,
    set = _require.set,
    remove2 = _require.remove2,
    copy = _require.copy;

var build = require('./lang/expression.js');

var Fields = require('./lang/fields.js');

var addition = function addition(doc, new_doc, new_fields) {
  var _iterator = _createForOfIteratorHelper(new_fields),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          path_pieces = _step$value[0],
          add = _step$value[1];

      add(doc, new_doc, path_pieces);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return new_doc;
};

var _build = function _build(value1) {
  var _build2 = build(value1),
      ast = _build2.ast,
      paths = _build2.paths,
      has_refs = _build2.has_refs;

  if (!has_refs) {
    var value2 = ast.run();
    return function (doc) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return set.apply(void 0, args.concat([value2]));
    };
  }

  return function (doc) {
    var fields = new Fields(doc);

    if (fields.ensure(paths)) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      set.apply(void 0, args.concat([ast.run(fields)]));
    }
  };
};

var project = function project(_next, spec) {
  var toBool = function toBool(path) {
    return !!spec[path];
  };

  var _id_bool = true;

  if (spec.hasOwnProperty('_id')) {
    _id_bool = toBool('_id');
    delete spec._id;
  }

  var existing_fields = [],
      new_fields = [];
  var is_inclusion = true;

  var _mode = function _mode(path) {
    if (toBool(path) !== is_inclusion) {
      throw Error('cannot mix inclusions and exclusions');
    }
  };

  var _mode2 = function mode(path) {
    is_inclusion = toBool(path);
    _mode2 = _mode;
  };

  for (var path in spec) {
    var value = spec[path];
    var path_pieces = toPathPieces(path);

    if (typeof value === 'boolean' || value === 1 || value === 0) {
      _mode2(path);

      existing_fields.push(path_pieces);
    } else {
      new_fields.push([path_pieces, _build(value)]);
    }
  }

  var steps = [];

  if (new_fields.length) {
    steps.push(function (doc, new_doc) {
      return addition(doc, new_doc, new_fields);
    });
  }

  if (!existing_fields.length) {
    var _project;

    if (_id_bool) {
      _project = function _project(doc, new_doc) {
        if (doc.hasOwnProperty('_id')) {
          new_doc._id = doc._id;
        }
      };
    } else {
      _project = function _project(doc, new_doc) {
        delete new_doc._id;
      };
    }

    steps.push(function (doc, new_doc) {
      _project(doc, new_doc);

      return new_doc;
    });
  } else {
    if (is_inclusion === _id_bool) {
      existing_fields.push(['_id']);
    }

    var _project2 = is_inclusion ? copy : remove2;

    steps.push(function (doc) {
      return _project2(doc, existing_fields);
    });
  }

  var next = function next(cb) {
    _next(function (error, doc) {
      if (!doc) {
        return cb(error);
      }

      var new_doc = doc;

      var _iterator2 = _createForOfIteratorHelper(steps),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var fn = _step2.value;
          new_doc = fn(doc, new_doc);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      cb(null, new_doc);
    });
  };

  return next;
};

module.exports = project;