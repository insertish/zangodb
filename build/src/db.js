"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EventEmitter = require('events'),
    memoize = require('memoizee'),
    Q = require('q');

var _require = require('./util.js'),
    getIDBError = _require.getIDBError;

var Collection = require('./collection.js');
/**
 * Db blocked event.
 * @event Db#blocked
 *
 * @example
 * db.on('blocked', () => {
 *     console.log('database version cannot be upgraded');
 * });
 */

/**
 * Class representing a database.
 * @param {string} name The name of the database.
 * @param {number} [version] The version of the database.
 * @param {object|string[]} config The collections configuration.
 *
 * @example
 * let db = new zango.Db('mydb', {
 *     // Define collection.
 *     col1: {
 *         // Create index if it doesn't already exist.
 *         index1: true,
 *
 *         // Delete index from pre-existing database.
 *         index2: false
 *     },
 *
 *      // Define collection with indexes.
 *     col2: ['index1', 'index2'],
 *
 *     // Define collection without indexes.
 *     col3: true,
 *
 *     // Delete collection from pre-existing database.
 *     col4: false
 * });
 *
 * @example
 * // Define collections without indexes.
 * let db = new zango.Db('mydb', ['col1', 'col2']);
 */


var Db = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Db, _EventEmitter);

  var _super = _createSuper(Db);

  function Db(name, version, config) {
    var _this;

    _classCallCheck(this, Db);

    _this = _super.call(this);
    _this._name = name;

    if (_typeof(version) === 'object') {
      config = version;
    } else {
      _this._version = version;
    }

    _this._cols = {};
    _this._config = {};

    _this._initGetConn();

    if (Array.isArray(config)) {
      var _iterator = _createForOfIteratorHelper(config),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _name = _step.value;

          _this._addCollection(_name);

          _this._config[_name] = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      for (var _name2 in config) {
        _this._addCollection(_name2);

        _this._addIndex(config[_name2], _name2);
      }
    }

    return _this;
  }
  /**
   * The name of the database.
   * @type {string}
   */


  _createClass(Db, [{
    key: "_addCollection",
    value: function _addCollection(name) {
      this._cols[name] = new Collection(this, name);
    }
  }, {
    key: "_addIndex",
    value: function _addIndex(index_config, path) {
      var config = this._config;

      if (!index_config) {
        return config[path] = false;
      }

      if (_typeof(index_config) !== 'object') {
        return config[path] = {};
      }

      var col = this._cols[path];

      if (Array.isArray(index_config)) {
        var new_value = {};

        var _iterator2 = _createForOfIteratorHelper(index_config),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var index_path = _step2.value;
            new_value[index_path] = true;

            col._indexes.add(index_path);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        config[path] = new_value;
      } else {
        for (var _index_path in index_config) {
          if (index_config[_index_path]) {
            col._indexes.add(_index_path);
          }
        }

        config[path] = index_config;
      }
    }
  }, {
    key: "_addStore",
    value: function _addStore(idb, name) {
      var store = idb.createObjectStore(name, {
        keyPath: '_id',
        autoIncrement: true
      });
      var index_config = this._config[name];

      for (var path in index_config) {
        if (index_config[path]) {
          store.createIndex(path, path, {
            unique: false
          });
        } else {
          store.deleteIndex(path);
        }
      }
    }
  }, {
    key: "_getConn",
    value: function _getConn(cb) {
      var _this2 = this;

      var req;

      if (this._version) {
        req = indexedDB.open(this._name, this._version);
      } else {
        req = indexedDB.open(this._name);
      }

      req.onsuccess = function (e) {
        var idb = e.target.result;
        _this2._idb = idb;
        _this2._version = idb.version;
        _this2._open = true;
        cb(null, idb);
      };

      req.onerror = function (e) {
        return cb(getIDBError(e));
      };

      req.onupgradeneeded = function (e) {
        var idb = e.target.result;

        for (var name in _this2._config) {
          try {
            if (!_this2._config[name]) {
              idb.deleteObjectStore(name);
            } else if (!idb.objectStoreNames.contains(name)) {
              _this2._addStore(idb, name);
            }
          } catch (error) {
            return cb(error);
          }
        }
      };

      req.onblocked = function () {
        return _this2.emit('blocked');
      };
    }
  }, {
    key: "_initGetConn",
    value: function _initGetConn() {
      this._getConn = memoize(this._getConn, {
        async: true
      });
    }
    /**
     * Retrieve a {@link Collection} instance.
     * @param {string} name The name of the collection.
     * @return {Collection}
     *
     * @example
     * let col = db.collection('mycol');
     */

  }, {
    key: "collection",
    value: function collection(name) {
      var col = this._cols[name];

      if (!col) {
        throw Error("collection '".concat(name, "' does not exist"));
      }

      return col;
    }
    /**
     * Open connection to the database.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     */

  }, {
    key: "open",
    value: function open(cb) {
      var _this3 = this;

      var deferred = Q.defer();

      this._getConn(function (error) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(_this3);
        }
      });

      deferred.promise.nodeify(cb);
      return deferred.promise;
    }
    /**
     * Close the connection if it is open.
     */

  }, {
    key: "close",
    value: function close() {
      if (this._open) {
        this._idb.close();

        this._open = false;

        this._initGetConn();
      }
    }
    /**
     * Delete the database, closing the connection if it is open.
     * @param {function} [cb] The result callback.
     * @return {Promise}
     *
     * @example
     * db.drop((error) => {
     *     if (error) { throw error; }
     * });
     */

  }, {
    key: "drop",
    value: function drop(cb) {
      this.close();
      var deferred = Q.defer();
      var req = indexedDB.deleteDatabase(this._name);

      req.onsuccess = function () {
        return deferred.resolve();
      };

      req.onerror = function (e) {
        return deferred.reject(getIDBError(e));
      };

      deferred.promise.nodeify(cb);
      return deferred.promise;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * The version of the database.
     * @type {number}
     */

  }, {
    key: "version",
    get: function get() {
      return this._version;
    }
  }]);

  return Db;
}(EventEmitter);

module.exports = Db;