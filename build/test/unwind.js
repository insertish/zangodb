"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('chai'),
    expect = _require.expect;

var db = new zango.Db(Math.random(), ['col']);
var col = db.collection('col');
var doc = {
  elements: [1, 3, 3]
};
before(function () {
  return col.insert(doc);
});
after(function () {
  return db.drop();
});
it('should unwind an iterable', function (done) {
  var expected_docs = [{
    elements: 1
  }, {
    elements: 3
  }, {
    elements: 3
  }];
  col.aggregate([{
    $unwind: '$elements'
  }]).toArray(function (error, docs) {
    if (error) {
      throw error;
    }

    expect(docs).to.have.lengthOf(expected_docs.length);

    var _iterator = _createForOfIteratorHelper(docs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _doc = _step.value;
        delete _doc._id;
        expect(expected_docs).to.deep.include(_doc);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    done();
  });
});