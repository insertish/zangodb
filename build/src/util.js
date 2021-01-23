"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var deepMerge = require('deepmerge'),
    clone = require('clone'),
    objectHash = require('object-hash');

var toPathPieces = function toPathPieces(path) {
  return path.split('.');
};

var _exists = function _exists(obj, path_pieces) {
  for (var i = 0; i < path_pieces.length - 1; i++) {
    var piece = path_pieces[i];

    if (!obj.hasOwnProperty(piece)) {
      return;
    }

    obj = obj[piece];

    if (!isObject(obj)) {
      return;
    }
  }

  if (obj.hasOwnProperty(path_pieces[i])) {
    return obj;
  }
};

var exists = function exists(obj, path_pieces) {
  return !!_exists(obj, path_pieces);
};

var create = function create(obj, path_pieces, i) {
  for (var j = i; j < path_pieces.length - 1; j++) {
    obj[path_pieces[j]] = {};
    obj = obj[path_pieces[j]];
  }

  return obj;
};

var get = function get(obj, path_pieces, fn) {
  if (obj = _exists(obj, path_pieces)) {
    fn(obj, path_pieces[path_pieces.length - 1]);
  }
}; // Set a value, creating the path if it doesn't exist.


var set = function set(obj, path_pieces, value) {
  var fn = function fn(obj, field) {
    return obj[field] = value;
  };

  modify(obj, path_pieces, fn, fn);
};

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
}; // Update a value or create it and its path if it doesn't exist.


var modify = function modify(obj, path_pieces, update, init) {
  var last = path_pieces[path_pieces.length - 1];

  var _create = function _create(i) {
    obj = create(obj, path_pieces, i);
    init(obj, last);
  };

  if (!obj.hasOwnProperty(path_pieces[0])) {
    return _create(0);
  }

  if (path_pieces.length > 1) {
    obj = obj[path_pieces[0]];

    for (var i = 1; i < path_pieces.length - 1; i++) {
      var piece = path_pieces[i];

      if (!isObject(obj[piece])) {
        return;
      }

      if (Array.isArray(obj) && piece < 0) {
        return;
      }

      if (!obj.hasOwnProperty(piece)) {
        return _create(i);
      }

      obj = obj[piece];
    }
  }

  update(obj, last);
}; // Delete specified paths from object.


var remove1 = function remove1(obj, path_pieces) {
  for (var i = 0; i < path_pieces.length - 1; i++) {
    obj = obj[path_pieces[i]];

    if (!isObject(obj)) {
      return;
    }
  }

  if (Array.isArray(obj)) {
    var index = Number.parseFloat(path_pieces[i]);

    if (Number.isInteger(index)) {
      obj.splice(index, 1);
    }
  } else {
    delete obj[path_pieces[i]];
  }
};

var _remove2 = function _remove2(obj, new_obj, paths) {
  var fn = function fn(field) {
    var new_paths = [];

    var _iterator = _createForOfIteratorHelper(paths),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var path_pieces = _step.value;

        if (path_pieces[0] !== field) {
          continue;
        }

        if (path_pieces.length === 1) {
          return;
        }

        new_paths.push(path_pieces.slice(1));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!new_paths.length) {
      new_obj[field] = clone(obj[field]);
    } else {
      var value = obj[field];
      new_obj[field] = new value.constructor();

      _remove2(value, new_obj[field], new_paths);
    }
  };

  for (var field in obj) {
    fn(field);
  }
}; // Copy an object ignoring specified paths.


var remove2 = function remove2(obj, paths) {
  var new_obj = new obj.constructor();

  _remove2(obj, new_obj, paths);

  return new_obj;
};

var rename = function rename(obj1, path_pieces, new_name) {
  get(obj1, path_pieces, function (obj2, field) {
    obj2[new_name] = obj2[field];
    delete obj2[field];
  });
}; // Copy an object by a path ignoring other fields.


var _copy = function _copy(obj, new_obj, path_pieces) {
  for (var i = 0; i < path_pieces.length - 1; i++) {
    var piece = path_pieces[i];
    obj = obj[piece];

    if (!isObject(obj)) {
      return;
    }

    new_obj[piece] = new obj.constructor();
    new_obj = new_obj[piece];
  }

  if (obj.hasOwnProperty(path_pieces[i])) {
    new_obj[path_pieces[i]] = obj[path_pieces[i]];
    return obj;
  }
}; // Copy an object by specified paths ignoring other paths.


var copy = function copy(obj, paths) {
  var new_objs = [];

  var _iterator2 = _createForOfIteratorHelper(paths),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var path_pieces = _step2.value;
      var new_obj = new obj.constructor();

      if (_copy(obj, new_obj, path_pieces)) {
        new_objs.push(new_obj);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return new_objs.reduce(deepMerge, {});
};

var equal = function equal(value1, value2) {
  return hashify(value1) === hashify(value2);
};

var unknownOp = function unknownOp(name) {
  throw Error("unknown operator '".concat(name, "'"));
};

var hashify = function hashify(value) {
  if (value === undefined) {
    return;
  }

  return objectHash(value);
};

var getIDBError = function getIDBError(e) {
  return Error(e.target.error.message);
};

module.exports.toPathPieces = toPathPieces;
module.exports.exists = exists;
module.exports.create = create;
module.exports.get = get;
module.exports.set = set;
module.exports.isObject = isObject;
module.exports.modify = modify;
module.exports.remove1 = remove1;
module.exports.remove2 = remove2;
module.exports.rename = rename;
module.exports.copy = copy;
module.exports.equal = equal;
module.exports.unknownOp = unknownOp;
module.exports.hashify = hashify;
module.exports.getIDBError = getIDBError;