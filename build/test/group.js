"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('chai'),
    expect = _require.expect;

var docs = [{
  x: 2,
  g: 1
}, {
  x: 2,
  g: 4
}, {
  x: 2,
  g: 4
}, {
  x: 2,
  g: 3
}, {
  x: 8,
  g: 8
}, {
  x: 8,
  g: 8
}, {
  x: 8,
  g: 6
}, {
  x: 8,
  g: 2
}];
var db = new zango.Db(Math.random(), ['col']);
var col = db.collection('col');
before(function () {
  return col.insert(docs);
});
after(function () {
  return db.drop();
});

var group = function group(spec, expected_docs, done) {
  col.aggregate([{
    $group: spec
  }]).toArray(function (error, docs) {
    if (error) {
      throw error;
    }

    expect(docs).to.have.lengthOf(expected_docs.length);

    var _iterator = _createForOfIteratorHelper(docs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var doc = _step.value;
        expect(expected_docs).to.deep.include(doc);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    done();
  });
};

describe('grouping', function () {
  it('should group by a literal value', function (done) {
    group({
      _id: null
    }, [{
      _id: null
    }], done);
  });
  it('should group by a referenced value', function (done) {
    group({
      _id: '$x'
    }, [{
      _id: 2
    }, {
      _id: 8
    }], done);
  });
});
describe('$sum', function () {
  it('should compute the sum of a literal value', function (done) {
    group({
      _id: '$x',
      sum: {
        $sum: 1
      }
    }, [{
      _id: 2,
      sum: 4
    }, {
      _id: 8,
      sum: 4
    }], done);
  });
  it('should compute the sum of a referenced value', function (done) {
    group({
      _id: '$x',
      sum: {
        $sum: '$g'
      }
    }, [{
      _id: 2,
      sum: 12
    }, {
      _id: 8,
      sum: 24
    }], done);
  });
});
describe('$avg', function () {
  it('should compute the average of a literal value', function (done) {
    group({
      _id: '$x',
      avg: {
        $avg: 1
      }
    }, [{
      _id: 2,
      avg: 1
    }, {
      _id: 8,
      avg: 1
    }], done);
  });
  it('should compute the average of a referenced value', function (done) {
    group({
      _id: '$x',
      avg: {
        $avg: '$g'
      }
    }, [{
      _id: 2,
      avg: 3
    }, {
      _id: 8,
      avg: 6
    }], done);
  });
});
describe('$push', function () {
  it('should push a literal value to an array', function (done) {
    group({
      _id: '$x',
      array: {
        $push: 1
      }
    }, [{
      _id: 2,
      array: [1, 1, 1, 1]
    }, {
      _id: 8,
      array: [1, 1, 1, 1]
    }], done);
  });
  it('should push a referenced value to an array', function (done) {
    group({
      _id: '$x',
      array: {
        $push: '$g'
      }
    }, [{
      _id: 2,
      array: [1, 4, 4, 3]
    }, {
      _id: 8,
      array: [8, 8, 6, 2]
    }], done);
  });
});
describe('$addToSet', function () {
  it('should push a unique literal value to an array', function (done) {
    group({
      _id: '$x',
      array: {
        $addToSet: 1
      }
    }, [{
      _id: 2,
      array: [1]
    }, {
      _id: 8,
      array: [1]
    }], done);
  });
  it('should push a unique referenced value to an array', function (done) {
    group({
      _id: '$x',
      array: {
        $addToSet: '$g'
      }
    }, [{
      _id: 2,
      array: [1, 4, 3]
    }, {
      _id: 8,
      array: [8, 6, 2]
    }], done);
  });
});
describe('$max', function () {
  it('should retrieve the max literal value', function (done) {
    group({
      _id: '$x',
      max: {
        $max: 1
      }
    }, [{
      _id: 2,
      max: 1
    }, {
      _id: 8,
      max: 1
    }], done);
  });
  it('should retrieve the max referenced value', function (done) {
    group({
      _id: '$x',
      max: {
        $max: '$g'
      }
    }, [{
      _id: 2,
      max: 4
    }, {
      _id: 8,
      max: 8
    }], done);
  });
});
describe('$min', function () {
  it('should retrieve the min literal value', function (done) {
    group({
      _id: '$x',
      min: {
        $min: 1
      }
    }, [{
      _id: 2,
      min: 1
    }, {
      _id: 8,
      min: 1
    }], done);
  });
  it('should retrieve the min referenced value', function (done) {
    group({
      _id: '$x',
      min: {
        $min: '$g'
      }
    }, [{
      _id: 2,
      min: 1
    }, {
      _id: 8,
      min: 2
    }], done);
  });
});