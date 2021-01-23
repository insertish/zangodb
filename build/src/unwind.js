"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./util.js'),
    toPathPieces = _require.toPathPieces,
    get = _require.get;

module.exports = function (_next, path) {
  var path_pieces = toPathPieces(path.substring(1)),
      elements = [],
      fn = function fn(cb) {
    return cb(null, elements.pop());
  };

  var onDoc = function onDoc(doc, cb) {
    var old_length = elements.length;
    get(doc, path_pieces, function (obj, field) {
      var new_elements = obj[field];

      if (!new_elements) {
        return;
      }

      if (new_elements[Symbol.iterator]) {
        var _iterator = _createForOfIteratorHelper(new_elements),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var element = _step.value;
            elements.push(_defineProperty({}, field, element));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    });

    if (old_length === elements.length) {
      return _next2(cb);
    }

    fn(cb);
  };

  var _next2 = function next(cb) {
    _next(function (error, doc) {
      if (error) {
        cb(error);
      } else if (doc) {
        onDoc(doc, cb);
      } else {
        (_next2 = fn)(cb);
      }
    });
  };

  return function (cb) {
    return _next2(cb);
  };
};