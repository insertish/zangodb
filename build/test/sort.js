"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('chai'),
    expect = _require.expect;

var db = new zango.Db(Math.random(), {
  col: ['x']
});
var col = db.collection('col');
var docs = [{
  x: 4,
  k: 3
}, {
  x: 2,
  k: 9
}, {
  x: 3,
  k: 8
}];
before(function () {
  return col.insert(docs);
});
after(function () {
  return db.drop();
});

var _sort = function _sort(spec) {
  return col.find().sort(spec);
};

var sort = function sort(cur, expected_docs, done) {
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

var sortWithIndex = function sortWithIndex(spec) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  sort.apply(void 0, [_sort(spec).hint('x')].concat(args));
};

var sortWithoutIndex = function sortWithoutIndex(spec) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  sort.apply(void 0, [_sort(spec)].concat(args));
};

it('should sort by ascending using index', function (done) {
  sortWithIndex({
    x: 1
  }, [{
    x: 2,
    k: 9
  }, {
    x: 3,
    k: 8
  }, {
    x: 4,
    k: 3
  }], done);
});
it('should sort by ascending without index', function (done) {
  sortWithoutIndex({
    k: 1
  }, [{
    x: 4,
    k: 3
  }, {
    x: 3,
    k: 8
  }, {
    x: 2,
    k: 9
  }], done);
});
it('should sort by descending using index', function (done) {
  sortWithIndex({
    x: -1
  }, [{
    x: 4,
    k: 3
  }, {
    x: 3,
    k: 8
  }, {
    x: 2,
    k: 9
  }], done);
});
it('should sort by descending without index', function (done) {
  sortWithoutIndex({
    k: -1
  }, [{
    x: 2,
    k: 9
  }, {
    x: 3,
    k: 8
  }, {
    x: 4,
    k: 3
  }], done);
});