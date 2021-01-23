"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./util.js'),
    unknownOp = _require.unknownOp;

var Cursor = require('./cursor.js');

var ops = {
  $match: function $match(cur, doc) {
    return cur.filter(doc);
  },
  $project: function $project(cur, spec) {
    return cur.project(spec);
  },
  $group: function $group(cur, spec) {
    return cur.group(spec);
  },
  $unwind: function $unwind(cur, path) {
    return cur.unwind(path);
  },
  $sort: function $sort(cur, spec) {
    return cur.sort(spec);
  },
  $skip: function $skip(cur, num) {
    return cur.skip(num);
  },
  $limit: function $limit(cur, num) {
    return cur.limit(num);
  }
};

var getStageObject = function getStageObject(doc) {
  var op_keys = Object.keys(doc);

  if (op_keys.length > 1) {
    throw Error('stages must be passed only one operator');
  }

  var op_key = op_keys[0],
      fn = ops[op_key];

  if (!fn) {
    unknownOp(op_key);
  }

  return [fn, doc[op_key]];
};

var aggregate = function aggregate(col, pipeline) {
  var cur = new Cursor(col, 'readonly');

  var _iterator = _createForOfIteratorHelper(pipeline),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var doc = _step.value;

      var _getStageObject = getStageObject(doc),
          _getStageObject2 = _slicedToArray(_getStageObject, 2),
          fn = _getStageObject2[0],
          arg = _getStageObject2[1];

      fn(cur, arg);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return cur;
};

module.exports = aggregate;