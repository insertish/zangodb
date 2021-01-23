"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('chai'),
    expect = _require.expect;

var _require2 = require('../src/lang/filter.js'),
    build = _require2.build,
    Fields = require('../src/lang/fields.js'),
    waterfall = require('./waterfall.js');

var db = new zango.Db(Math.random(), {
  col: ['x', 'g']
});
var col = db.collection('col');
var docs = [{
  x: 4,
  k: 8
}, {
  x: 2,
  g: 3
}, {
  x: 3,
  z: 3
}, {
  x: 6,
  g: 9
}, {
  x: 10,
  k: 4
}, {
  x: 2,
  g: 8
}, {
  x: 2,
  g: 8,
  z: 10
}, {
  x: undefined
}, {
  x: null
}, {
  x: [{
    k: 2
  }, {
    k: 8
  }]
}];
before(function () {
  return col.insert(docs);
});
after(function () {
  return db.drop();
});

var query = function query(expr, done) {
  var cur = col.find(expr);
  var pred = build(expr);

  var fn = function fn(doc) {
    return pred.run(new Fields(doc));
  };

  var expected_docs = docs.filter(fn);
  expect(expected_docs).to.have.length.above(0);
  cur.toArray(function (error, docs) {
    if (error) {
      throw error;
    }

    expect(docs).to.have.lengthOf(expected_docs.length);

    var _iterator = _createForOfIteratorHelper(docs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var doc = _step.value;
        delete doc._id;
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

describe('equality (without $eq)', function () {
  it('should test for equality', function (done) {
    waterfall([function (next) {
      return query({
        x: 4
      }, next);
    }, function (next) {
      return query({
        x: undefined
      }, next);
    }, function (next) {
      return query({
        x: null
      }, next);
    }], done);
  });
});
describe('$eq', function () {
  it('should test for equality', function (done) {
    query({
      x: {
        $eq: 4
      }
    }, done);
  });
});
describe('conjunction without $and', function () {
  it('should perform conjunction', function (done) {
    query({
      x: 2,
      g: 3
    }, done);
  });
});
describe('$and', function () {
  it('should perform conjunction', function (done) {
    query({
      $and: [{
        x: 2
      }, {
        g: 3
      }]
    }, done);
  });
});
describe('$or', function () {
  it('should perform disjunction', function (done) {
    waterfall([function (next) {
      return query({
        $or: [{
          x: 2
        }, {
          g: 3
        }]
      }, next);
    }, function (next) {
      query({
        $or: [{
          $or: [{
            x: 2
          }, {
            g: 3
          }]
        }, {
          z: 8
        }]
      }, next);
    }], done);
  });
});
describe('$gt', function () {
  it('should perform greater than comparison', function (done) {
    query({
      x: {
        $gt: 3
      }
    }, done);
  });
});
describe('$gte', function () {
  it('should perform greater than or equal comparison', function (done) {
    query({
      x: {
        $gte: 6
      }
    }, done);
  });
});
describe('$lt', function () {
  it('should perform less than comparison', function (done) {
    query({
      x: {
        $lt: 8
      }
    }, done);
  });
});
describe('$lte', function () {
  it('should perform less than or equal comparison', function (done) {
    query({
      x: {
        $lte: 6
      }
    }, done);
  });
});
describe('$gt and $lt', function () {
  it('should perform gt and lt comparison', function (done) {
    query({
      x: {
        $gt: 3,
        $lt: 8
      }
    }, done);
  });
});
describe('$gte and $lt', function () {
  it('should perform gte and lt comparison', function (done) {
    query({
      x: {
        $gte: 3,
        $lt: 8
      }
    }, done);
  });
});
describe('$gt and $lte', function () {
  it('should perform gt and lte comparison', function (done) {
    query({
      x: {
        $gt: 3,
        $lte: 8
      }
    }, done);
  });
});
describe('$gte and $lte', function () {
  it('should perform gte and lte comparison', function (done) {
    query({
      x: {
        $gte: 3,
        $lte: 8
      }
    }, done);
  });
});
describe('$in', function () {
  it('should perform disjunction equality test', function (done) {
    query({
      x: {
        $in: [2, 4, 8]
      }
    }, done);
  });
});
describe('$nin', function () {
  it('should perform conjunction inequality test', function (done) {
    query({
      x: {
        $nin: [2, 4, 8]
      }
    }, done);
  });
});
describe('$elemMatch', function () {
  it('should test if any iterable elements satisify a predicate', function (done) {
    query({
      x: {
        $elemMatch: {
          k: 8
        }
      }
    }, done);
  });
});
describe('$exists', function () {
  it('should test if document contains a field', function (done) {
    query({
      g: {
        $exists: 1
      }
    }, done);
  });
  it("should test if document doesn't contain a field", function (done) {
    query({
      g: {
        $exists: 0
      }
    }, done);
  });
});