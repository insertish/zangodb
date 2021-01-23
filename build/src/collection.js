"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Q = require('q');

var _require = require('./util.js'),
    getIDBError = _require.getIDBError,
    Cursor = require('./cursor.js'),
    _aggregate = require('./aggregate.js'),
    _update = require('./update.js'),
    _remove = require('./remove.js');
/** Class representing a collection. */


var Collection = /*#__PURE__*/function () {
  /** <strong>Note:</strong> Do not instantiate directly. */
  function Collection(db, name) {
    _classCallCheck(this, Collection);

    this._db = db;
    this._name = name;
    this._indexes = new Set();
  }
  /**
   * The name of the collection.
   * @type {string}
   */


  _createClass(Collection, [{
    key: "_isIndexed",
    value: function _isIndexed(path) {
      return this._indexes.has(path) || path === '_id';
    }
    /**
     * Open a cursor that satisfies the specified query criteria.
     * @param {object} [expr] The query document to filter by.
     * @param {object} [projection_spec] Specification for projection.
     * @return {Cursor}
     *
     * @example
     * col.find({ x: 4, g: { $lt: 10 } }, { k: 0 });
     */

  }, {
    key: "find",
    value: function find(expr, projection_spec) {
      var cur = new Cursor(this, 'readonly');
      cur.filter(expr);

      if (projection_spec) {
        cur.project(projection_spec);
      }

      return cur;
    }
    /**
     * Retrieve one document that satisfies the specified query criteria.
     * @param {object} [expr] The query document to filter by.
     * @param {object} [projection_spec] Specification for projection.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     *
     * @example
     * col.findOne({ x: 4, g: { $lt: 10 } }, { k: 0 });
     */

  }, {
    key: "findOne",
    value: function findOne(expr, projection_spec, cb) {
      if (typeof projection_spec === 'function') {
        cb = projection_spec;
        projection_spec = null;
      }

      var deferred = Q.defer();
      var cur = this.find(expr, projection_spec).limit(1);
      cur.toArray(function (error, docs) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(docs[0]);
        }
      });
      deferred.promise.nodeify(cb);
      return deferred.promise;
    }
    /**
     * Evaluate an aggregation framework pipeline.
     * @param {object[]} pipeline The pipeline.
     * @return {Cursor}
     *
     * @example
     * col.aggregate([
     *     { $match: { x: { $lt: 8 } } },
     *     { $group: { _id: '$x', array: { $push: '$y' } } },
     *     { $unwind: '$array' }
     * ]);
     */

  }, {
    key: "aggregate",
    value: function aggregate(pipeline) {
      return _aggregate(this, pipeline);
    }
  }, {
    key: "_validate",
    value: function _validate(doc) {
      for (var field in doc) {
        if (field[0] === '$') {
          throw Error("field name cannot start with '$'");
        }

        var value = doc[field];

        if (Array.isArray(value)) {
          var _iterator = _createForOfIteratorHelper(value),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var element = _step.value;

              this._validate(element);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else if (_typeof(value) === 'object') {
          this._validate(value);
        }
      }
    }
    /**
     * @param {object|object[]} docs Documents to insert.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     *
     * @example
     * col.insert([{ x: 4 }, { k: 8 }], (error) => {
     *     if (error) { throw error; }
     * });
     *
     * @example
     * col.insert({ x: 4 }, (error) => {
     *     if (error) { throw error; }
     * });
     */

  }, {
    key: "insert",
    value: function insert(docs, cb) {
      var _this = this;

      if (!Array.isArray(docs)) {
        docs = [docs];
      }

      var deferred = Q.defer();

      this._db._getConn(function (error, idb) {
        var trans;
        var name = _this._name;

        try {
          trans = idb.transaction([name], 'readwrite');
        } catch (error) {
          return deferred.reject(error);
        }

        trans.oncomplete = function () {
          return deferred.resolve();
        };

        trans.onerror = function (e) {
          return deferred.reject(getIDBError(e));
        };

        var store = trans.objectStore(name);
        var i = 0;

        var iterate = function iterate() {
          var doc = docs[i];

          try {
            _this._validate(doc);
          } catch (error) {
            return deferred.reject(error);
          }

          var req = store.add(doc);

          req.onsuccess = function () {
            i++;

            if (i < docs.length) {
              iterate();
            }
          };
        };

        iterate();
      });

      deferred.promise.nodeify(cb);
      return deferred.promise;
    }
  }, {
    key: "_modify",
    value: function _modify(fn, expr, cb) {
      var deferred = Q.defer();
      var cur = new Cursor(this, 'readwrite');
      cur.filter(expr);
      fn(cur, function (error) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      deferred.promise.nodeify(cb);
      return deferred.promise;
    }
    /**
     * Update documents that match a filter.
     * @param {object} expr The query document to filter by.
     * @param {object} spec Specification for updating.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     *
     * @example
     * col.update({
     *     age: { $gte: 18 }
     * }, {
     *     adult: true
     * }, (error) => {
     *     if (error) { throw error; }
     * });
     */

  }, {
    key: "update",
    value: function update(expr, spec, cb) {
      var fn = function fn(cur, cb) {
        return _update(cur, spec, cb);
      };

      return this._modify(fn, expr, cb);
    }
    /**
     * Delete documents that match a filter.
     * @param {object} expr The query document to filter by.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     *
     * @example
     * col.remove({ x: { $ne: 10 } }, (error) => {
     *     if (error) { throw error; }
     * });
     */

  }, {
    key: "remove",
    value: function remove(expr, cb) {
      return this._modify(_remove, expr, cb);
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }]);

  return Collection;
}();

module.exports = Collection;