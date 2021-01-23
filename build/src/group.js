"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var memoize = require('memoizee');

var _require = require('./util.js'),
    unknownOp = _require.unknownOp,
    hashify = _require.hashify,
    build = require('./lang/expression.js'),
    Fields = require('./lang/fields.js');

var Operator = /*#__PURE__*/function () {
  function Operator() {
    _classCallCheck(this, Operator);
  }

  _createClass(Operator, [{
    key: "getOpValueWithRefs",
    value: function getOpValueWithRefs(expr, doc, cb) {
      var ast = expr.ast,
          fields = expr.fields;
      cb(ast.run(fields));
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    }
  }], [{
    key: "getNoRefsSteps",
    value: function getNoRefsSteps(steps) {
      return steps.in_iter;
    }
  }, {
    key: "getOpValue",
    value: function getOpValue(expr, cb) {
      cb(expr.ast.run());
    }
  }]);

  return Operator;
}();

var Sum = /*#__PURE__*/function (_Operator) {
  _inherits(Sum, _Operator);

  var _super = _createSuper(Sum);

  function Sum() {
    var _this;

    _classCallCheck(this, Sum);

    _this = _super.call(this);
    _this._value = 0;
    return _this;
  }

  _createClass(Sum, [{
    key: "getOpValueWithRefs",
    value: function getOpValueWithRefs(expr, doc, cb) {
      _get(_getPrototypeOf(Sum.prototype), "getOpValueWithRefs", this).call(this, expr, doc, function (value) {
        Sum._verify(value, cb);
      });
    }
  }, {
    key: "add",
    value: function add(value) {
      this._value += value;
    }
  }], [{
    key: "_verify",
    value: function _verify(value, cb) {
      if (typeof value === 'number') {
        cb(value);
      }
    }
  }, {
    key: "getOpValue",
    value: function getOpValue(expr, cb) {
      _get(_getPrototypeOf(Sum), "getOpValue", this).call(this, expr, function (value) {
        return Sum._verify(value, cb);
      });
    }
  }]);

  return Sum;
}(Operator);

var Avg = /*#__PURE__*/function (_Sum) {
  _inherits(Avg, _Sum);

  var _super2 = _createSuper(Avg);

  function Avg() {
    var _this2;

    _classCallCheck(this, Avg);

    _this2 = _super2.call(this);
    _this2._count = 0;
    return _this2;
  }

  _createClass(Avg, [{
    key: "add",
    value: function add(value) {
      this._count++;

      _get(_getPrototypeOf(Avg.prototype), "add", this).call(this, value);
    }
  }, {
    key: "value",
    get: function get() {
      return this._value / this._count || 0;
    }
  }]);

  return Avg;
}(Sum);

var Compare = /*#__PURE__*/function (_Operator2) {
  _inherits(Compare, _Operator2);

  var _super3 = _createSuper(Compare);

  function Compare(fn) {
    var _this3;

    _classCallCheck(this, Compare);

    _this3 = _super3.call(this);
    _this3._value = null;
    _this3._fn = fn;
    _this3._add = _this3._add1;
    return _this3;
  }

  _createClass(Compare, [{
    key: "_add1",
    value: function _add1(value) {
      this._value = value;
      this._add = this._add2;
    }
  }, {
    key: "_add2",
    value: function _add2(new_value) {
      if (this._fn(new_value, this._value)) {
        this._value = new_value;
      }
    }
  }, {
    key: "add",
    value: function add(value) {
      if (value != null) {
        this._add(value);
      }
    }
  }], [{
    key: "getNoRefsSteps",
    value: function getNoRefsSteps(steps) {
      return steps.in_end;
    }
  }]);

  return Compare;
}(Operator);

var Min = /*#__PURE__*/function (_Compare) {
  _inherits(Min, _Compare);

  var _super4 = _createSuper(Min);

  function Min() {
    _classCallCheck(this, Min);

    return _super4.call(this, function (a, b) {
      return a < b;
    });
  }

  return Min;
}(Compare);

var Max = /*#__PURE__*/function (_Compare2) {
  _inherits(Max, _Compare2);

  var _super5 = _createSuper(Max);

  function Max() {
    _classCallCheck(this, Max);

    return _super5.call(this, function (a, b) {
      return a > b;
    });
  }

  return Max;
}(Compare);

var Push = /*#__PURE__*/function (_Operator3) {
  _inherits(Push, _Operator3);

  var _super6 = _createSuper(Push);

  function Push() {
    var _this4;

    _classCallCheck(this, Push);

    _this4 = _super6.call(this);
    _this4._value = [];
    return _this4;
  }

  _createClass(Push, [{
    key: "add",
    value: function add(value) {
      this._value.push(value);
    }
  }]);

  return Push;
}(Operator);

var AddToSet = /*#__PURE__*/function (_Operator4) {
  _inherits(AddToSet, _Operator4);

  var _super7 = _createSuper(AddToSet);

  function AddToSet() {
    var _this5;

    _classCallCheck(this, AddToSet);

    _this5 = _super7.call(this);
    _this5._hashes = {};
    return _this5;
  }

  _createClass(AddToSet, [{
    key: "add",
    value: function add(value) {
      this._hashes[hashify(value)] = value;
    }
  }, {
    key: "value",
    get: function get() {
      var docs = [];

      for (var hash in this._hashes) {
        docs.push(this._hashes[hash]);
      }

      return docs;
    }
  }], [{
    key: "getNoRefsSteps",
    value: function getNoRefsSteps(steps) {
      return steps.in_end;
    }
  }]);

  return AddToSet;
}(Operator);

var runSteps = function runSteps(steps) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var _iterator = _createForOfIteratorHelper(steps),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var fn = _step.value;
      fn.apply(void 0, args);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var runInEnd = function runInEnd(in_end, groups) {
  var _iterator2 = _createForOfIteratorHelper(groups),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var group_doc = _step2.value;
      runSteps(in_end, group_doc);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};

var groupLoopFn = function groupLoopFn(next, in_end, groups, fn) {
  return function (cb) {
    var done = function done(error) {
      if (!error) {
        runInEnd(in_end, groups);
      }

      cb(error, groups);
    };

    (function iterate() {
      next(function (error, doc) {
        if (!doc) {
          return done(error);
        }

        fn(doc);
        iterate();
      });
    })();
  };
};

var createGroupByRefFn = function createGroupByRefFn(next, expr, steps) {
  var in_start = steps.in_start,
      in_iter = steps.in_iter,
      in_end = steps.in_end;
  var groups = [];
  var add = memoize(function (_id_hash, _id) {
    var group_doc = {
      _id: _id
    };
    groups.push(group_doc);
    runSteps(in_start, group_doc);
    return group_doc;
  }, {
    length: 1
  });
  var ast = expr.ast;

  var _idFn = function _idFn(doc) {
    return ast.run(new Fields(doc));
  };

  var onDoc;

  if (in_iter.length) {
    onDoc = function onDoc(doc) {
      var _id = _idFn(doc);

      var group_doc = add(hashify(_id), _id);
      runSteps(in_iter, group_doc, doc);
    };
  } else {
    onDoc = function onDoc(doc) {
      var _id = _idFn(doc);

      add(hashify(_id), _id);
    };
  }

  return groupLoopFn(next, in_end, groups, onDoc);
};

var createGroupFn = function createGroupFn(next, expr, steps) {
  if (expr.has_refs) {
    return createGroupByRefFn(next, expr, steps);
  }

  var in_start = steps.in_start,
      in_iter = steps.in_iter,
      in_end = steps.in_end;
  var groups = [];

  var initGroupDoc = function initGroupDoc() {
    var group_doc = {
      _id: expr.ast.run()
    };
    runSteps(in_start, group_doc);
    groups.push(group_doc);
    return group_doc;
  };

  if (in_iter.length) {
    var add = memoize(function () {
      return initGroupDoc();
    });
    return groupLoopFn(next, in_end, groups, function (doc) {
      runSteps(in_iter, add(), doc);
    });
  }

  return function (cb) {
    next(function (error, doc) {
      if (doc) {
        initGroupDoc();
        runInEnd(in_end, groups);
      }

      cb(error, groups);
    });
  };
};

var ops = {
  $sum: Sum,
  $avg: Avg,
  $min: Min,
  $max: Max,
  $push: Push,
  $addToSet: AddToSet
};

var _build = function _build(steps, field, value) {
  var in_start = steps.in_start,
      in_iter = steps.in_iter,
      in_end = steps.in_end;
  var op_strs = Object.keys(value);

  if (op_strs.length > 1) {
    throw Error("fields must have only one operator");
  }

  var op_str = op_strs[0],
      Op = ops[op_str];

  if (!Op) {
    if (op_str[0] === '$') {
      unknownOp(op_str);
    }

    throw Error("unexpected field '".concat(op_str, "'"));
  }

  var expr = build(value[op_str]);
  in_start.push(function (group_doc) {
    group_doc[field] = new Op(expr);
  });

  if (expr.has_refs) {
    in_iter.push(function (group_doc, doc) {
      var fields = new Fields(doc);

      if (!fields.ensure(expr.paths)) {
        return;
      }

      var op = group_doc[field],
          _expr = Object.assign({
        fields: fields
      }, expr),
          add = function add(value) {
        return op.add(value);
      };

      op.getOpValueWithRefs(_expr, doc, add);
    });
  } else {
    Op.getOpValue(expr, function (value) {
      Op.getNoRefsSteps(steps).push(function (group_doc) {
        group_doc[field].add(value);
      });
    });
  }

  in_end.push(function (group_doc) {
    group_doc[field] = group_doc[field].value;
  });
};

module.exports = function (_next, spec) {
  if (!spec.hasOwnProperty('_id')) {
    throw Error("the '_id' field is missing");
  }

  var expr = build(spec._id);
  var new_spec = Object.assign({}, spec);
  delete new_spec._id;
  var steps = {
    in_start: [],
    in_iter: [],
    in_end: []
  };

  for (var field in new_spec) {
    _build(steps, field, new_spec[field]);
  }

  var group = createGroupFn(_next, expr, steps);

  var _next2 = function next(cb) {
    group(function (error, groups) {
      if (error) {
        cb(error);
      } else {
        (_next2 = function next(cb) {
          return cb(null, groups.pop());
        })(cb);
      }
    });
  };

  return function (cb) {
    return _next2(cb);
  };
};