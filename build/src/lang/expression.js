"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var _require = require('../util.js'),
    unknownOp = _require.unknownOp,
    MISSING = require('./missing_symbol.js'),
    Path = require('./path.js');

var Value = /*#__PURE__*/function () {
  function Value(value) {
    _classCallCheck(this, Value);

    this.value = value;
  }

  _createClass(Value, [{
    key: "run",
    value: function run() {
      return this.value;
    }
  }, {
    key: "ResultType",
    get: function get() {
      return this.constructor;
    }
  }], [{
    key: "any",
    value: function any(value) {
      if (typeof value === 'number') {
        return new NumberValue(value);
      }

      if (typeof value === 'string') {
        return new StringValue(value);
      }

      if (Array.isArray(value)) {
        return new ArrayValue(value);
      }

      if (value instanceof Date) {
        return new DateValue(value);
      }

      return new Value(value);
    }
  }, {
    key: "literal",
    value: function literal(value) {
      return new Literal(Value.any(value));
    }
  }]);

  return Value;
}();

var NumberValue = /*#__PURE__*/function (_Value) {
  _inherits(NumberValue, _Value);

  var _super = _createSuper(NumberValue);

  function NumberValue() {
    _classCallCheck(this, NumberValue);

    return _super.apply(this, arguments);
  }

  _createClass(NumberValue, null, [{
    key: "isType",
    value: function isType(value) {
      return typeof value === 'number';
    }
  }]);

  return NumberValue;
}(Value);

var StringValue = /*#__PURE__*/function (_Value2) {
  _inherits(StringValue, _Value2);

  var _super2 = _createSuper(StringValue);

  function StringValue() {
    _classCallCheck(this, StringValue);

    return _super2.apply(this, arguments);
  }

  _createClass(StringValue, null, [{
    key: "isType",
    value: function isType(value) {
      return typeof value === 'string';
    }
  }]);

  return StringValue;
}(Value);

var ArrayValue = /*#__PURE__*/function (_Value3) {
  _inherits(ArrayValue, _Value3);

  var _super3 = _createSuper(ArrayValue);

  function ArrayValue() {
    _classCallCheck(this, ArrayValue);

    return _super3.apply(this, arguments);
  }

  _createClass(ArrayValue, null, [{
    key: "isType",
    value: function isType(value) {
      return Array.isArray(value);
    }
  }]);

  return ArrayValue;
}(Value);

var DateValue = /*#__PURE__*/function (_Value4) {
  _inherits(DateValue, _Value4);

  var _super4 = _createSuper(DateValue);

  function DateValue() {
    _classCallCheck(this, DateValue);

    return _super4.apply(this, arguments);
  }

  _createClass(DateValue, null, [{
    key: "isType",
    value: function isType(value) {
      return value instanceof Date;
    }
  }]);

  return DateValue;
}(Value);

var Literal = /*#__PURE__*/function (_Value5) {
  _inherits(Literal, _Value5);

  var _super5 = _createSuper(Literal);

  function Literal() {
    _classCallCheck(this, Literal);

    return _super5.apply(this, arguments);
  }

  _createClass(Literal, [{
    key: "run",
    value: function run() {
      return this.value.run();
    }
  }, {
    key: "ResultType",
    get: function get() {
      return this.value.ResultType;
    }
  }]);

  return Literal;
}(Value);

var Get = /*#__PURE__*/function () {
  function Get(path) {
    _classCallCheck(this, Get);

    this.path = path;
  }

  _createClass(Get, [{
    key: "run",
    value: function run(fields) {
      var value = fields.get(this.path);
      return value === MISSING ? null : value;
    }
  }]);

  return Get;
}();

var ObjectExpr = /*#__PURE__*/function (_Value6) {
  _inherits(ObjectExpr, _Value6);

  var _super6 = _createSuper(ObjectExpr);

  function ObjectExpr() {
    _classCallCheck(this, ObjectExpr);

    return _super6.apply(this, arguments);
  }

  _createClass(ObjectExpr, [{
    key: "run",
    value: function run(fields) {
      var result = {},
          value = this.value;

      for (var field in value) {
        result[field] = value[field].run(fields);
      }

      return result;
    }
  }]);

  return ObjectExpr;
}(Value);

var Operator = /*#__PURE__*/function () {
  function Operator() {
    _classCallCheck(this, Operator);

    this.args = [];
  }

  _createClass(Operator, [{
    key: "add",
    value: function add(node) {
      this.args.push(node);
    }
  }, {
    key: "alt",
    get: function get() {
      return new Value(null);
    }
  }]);

  return Operator;
}();

var FnOp = /*#__PURE__*/function (_Operator) {
  _inherits(FnOp, _Operator);

  var _super7 = _createSuper(FnOp);

  function FnOp(fn) {
    var _this;

    _classCallCheck(this, FnOp);

    _this = _super7.call(this);
    _this.fn = fn;
    return _this;
  }

  _createClass(FnOp, [{
    key: "run",
    value: function run(fields) {
      var args = this.args,
          fn = this.fn;
      return args.map(function (arg) {
        return arg.run(fields);
      }).reduce(fn);
    }
  }, {
    key: "length",
    get: function get() {
      return Infinity;
    }
  }]);

  return FnOp;
}(Operator);

var UnaryFnOp = /*#__PURE__*/function (_FnOp) {
  _inherits(UnaryFnOp, _FnOp);

  var _super8 = _createSuper(UnaryFnOp);

  function UnaryFnOp() {
    _classCallCheck(this, UnaryFnOp);

    return _super8.apply(this, arguments);
  }

  _createClass(UnaryFnOp, [{
    key: "run",
    value: function run(fields) {
      return this.fn(this.args[0].run(fields));
    }
  }, {
    key: "length",
    get: function get() {
      return 1;
    }
  }]);

  return UnaryFnOp;
}(FnOp);

var fnOp = function fnOp(Parent, fn) {
  return /*#__PURE__*/function (_Parent) {
    _inherits(_class, _Parent);

    var _super9 = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super9.call(this, fn);
    }

    return _class;
  }(Parent);
};

var opTypes = function opTypes(Parent, InputType) {
  var ResultType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : InputType;

  var Constructor = /*#__PURE__*/function (_Parent2) {
    _inherits(Constructor, _Parent2);

    var _super10 = _createSuper(Constructor);

    function Constructor() {
      _classCallCheck(this, Constructor);

      return _super10.apply(this, arguments);
    }

    return Constructor;
  }(Parent);

  Constructor.prototype.InputType = InputType;
  Constructor.prototype.ResultType = ResultType;
  return Constructor;
};

var ArithOp = /*#__PURE__*/function (_opTypes) {
  _inherits(ArithOp, _opTypes);

  var _super11 = _createSuper(ArithOp);

  function ArithOp() {
    _classCallCheck(this, ArithOp);

    return _super11.apply(this, arguments);
  }

  return ArithOp;
}(opTypes(FnOp, NumberValue));

var arithOp = function arithOp(fn) {
  return fnOp(ArithOp, fn);
};

var Add = /*#__PURE__*/function (_arithOp) {
  _inherits(Add, _arithOp);

  var _super12 = _createSuper(Add);

  function Add() {
    _classCallCheck(this, Add);

    return _super12.apply(this, arguments);
  }

  return Add;
}(arithOp(function (a, b) {
  return a + b;
}));

var Subtract = /*#__PURE__*/function (_arithOp2) {
  _inherits(Subtract, _arithOp2);

  var _super13 = _createSuper(Subtract);

  function Subtract() {
    _classCallCheck(this, Subtract);

    return _super13.apply(this, arguments);
  }

  return Subtract;
}(arithOp(function (a, b) {
  return a - b;
}));

var Multiply = /*#__PURE__*/function (_arithOp3) {
  _inherits(Multiply, _arithOp3);

  var _super14 = _createSuper(Multiply);

  function Multiply() {
    _classCallCheck(this, Multiply);

    return _super14.apply(this, arguments);
  }

  return Multiply;
}(arithOp(function (a, b) {
  return a * b;
}));

var Divide = /*#__PURE__*/function (_arithOp4) {
  _inherits(Divide, _arithOp4);

  var _super15 = _createSuper(Divide);

  function Divide() {
    _classCallCheck(this, Divide);

    return _super15.apply(this, arguments);
  }

  return Divide;
}(arithOp(function (a, b) {
  return a / b;
}));

var Mod = /*#__PURE__*/function (_arithOp5) {
  _inherits(Mod, _arithOp5);

  var _super16 = _createSuper(Mod);

  function Mod() {
    _classCallCheck(this, Mod);

    return _super16.apply(this, arguments);
  }

  return Mod;
}(arithOp(function (a, b) {
  return a % b;
}));

var MathOp = /*#__PURE__*/function (_opTypes2) {
  _inherits(MathOp, _opTypes2);

  var _super17 = _createSuper(MathOp);

  function MathOp() {
    _classCallCheck(this, MathOp);

    return _super17.apply(this, arguments);
  }

  _createClass(MathOp, [{
    key: "run",
    value: function run(fields) {
      return this.fn.apply(this, _toConsumableArray(this.args.map(function (arg) {
        return arg.run(fields);
      })));
    }
  }, {
    key: "length",
    get: function get() {
      return this.fn.length;
    }
  }]);

  return MathOp;
}(opTypes(FnOp, NumberValue));

var mathOp = function mathOp(fn) {
  return fnOp(MathOp, fn);
};

var Abs = /*#__PURE__*/function (_mathOp) {
  _inherits(Abs, _mathOp);

  var _super18 = _createSuper(Abs);

  function Abs() {
    _classCallCheck(this, Abs);

    return _super18.apply(this, arguments);
  }

  return Abs;
}(mathOp(Math.abs));

var Ceil = /*#__PURE__*/function (_mathOp2) {
  _inherits(Ceil, _mathOp2);

  var _super19 = _createSuper(Ceil);

  function Ceil() {
    _classCallCheck(this, Ceil);

    return _super19.apply(this, arguments);
  }

  return Ceil;
}(mathOp(Math.ceil));

var Floor = /*#__PURE__*/function (_mathOp3) {
  _inherits(Floor, _mathOp3);

  var _super20 = _createSuper(Floor);

  function Floor() {
    _classCallCheck(this, Floor);

    return _super20.apply(this, arguments);
  }

  return Floor;
}(mathOp(Math.floor));

var Ln = /*#__PURE__*/function (_mathOp4) {
  _inherits(Ln, _mathOp4);

  var _super21 = _createSuper(Ln);

  function Ln() {
    _classCallCheck(this, Ln);

    return _super21.apply(this, arguments);
  }

  return Ln;
}(mathOp(Math.log));

var Log10 = /*#__PURE__*/function (_mathOp5) {
  _inherits(Log10, _mathOp5);

  var _super22 = _createSuper(Log10);

  function Log10() {
    _classCallCheck(this, Log10);

    return _super22.apply(this, arguments);
  }

  return Log10;
}(mathOp(Math.log10));

var Pow = /*#__PURE__*/function (_mathOp6) {
  _inherits(Pow, _mathOp6);

  var _super23 = _createSuper(Pow);

  function Pow() {
    _classCallCheck(this, Pow);

    return _super23.apply(this, arguments);
  }

  return Pow;
}(mathOp(Math.pow));

var Sqrt = /*#__PURE__*/function (_mathOp7) {
  _inherits(Sqrt, _mathOp7);

  var _super24 = _createSuper(Sqrt);

  function Sqrt() {
    _classCallCheck(this, Sqrt);

    return _super24.apply(this, arguments);
  }

  return Sqrt;
}(mathOp(Math.sqrt));

var Trunc = /*#__PURE__*/function (_mathOp8) {
  _inherits(Trunc, _mathOp8);

  var _super25 = _createSuper(Trunc);

  function Trunc() {
    _classCallCheck(this, Trunc);

    return _super25.apply(this, arguments);
  }

  return Trunc;
}(mathOp(Math.trunc));

var StringConcatOp = /*#__PURE__*/function (_opTypes3) {
  _inherits(StringConcatOp, _opTypes3);

  var _super26 = _createSuper(StringConcatOp);

  function StringConcatOp() {
    _classCallCheck(this, StringConcatOp);

    return _super26.apply(this, arguments);
  }

  return StringConcatOp;
}(opTypes(FnOp, StringValue));

var Concat = /*#__PURE__*/function (_fnOp) {
  _inherits(Concat, _fnOp);

  var _super27 = _createSuper(Concat);

  function Concat() {
    _classCallCheck(this, Concat);

    return _super27.apply(this, arguments);
  }

  return Concat;
}(fnOp(StringConcatOp, function (a, b) {
  return a + b;
}));

var CaseOp = /*#__PURE__*/function (_opTypes4) {
  _inherits(CaseOp, _opTypes4);

  var _super28 = _createSuper(CaseOp);

  function CaseOp() {
    _classCallCheck(this, CaseOp);

    return _super28.apply(this, arguments);
  }

  _createClass(CaseOp, [{
    key: "alt",
    get: function get() {
      return new StringValue('');
    }
  }]);

  return CaseOp;
}(opTypes(UnaryFnOp, StringValue));

var ToLower = /*#__PURE__*/function (_fnOp2) {
  _inherits(ToLower, _fnOp2);

  var _super29 = _createSuper(ToLower);

  function ToLower() {
    _classCallCheck(this, ToLower);

    return _super29.apply(this, arguments);
  }

  return ToLower;
}(fnOp(CaseOp, function (s) {
  return s.toLowerCase();
}));

var ToUpper = /*#__PURE__*/function (_fnOp3) {
  _inherits(ToUpper, _fnOp3);

  var _super30 = _createSuper(ToUpper);

  function ToUpper() {
    _classCallCheck(this, ToUpper);

    return _super30.apply(this, arguments);
  }

  return ToUpper;
}(fnOp(CaseOp, function (s) {
  return s.toUpperCase();
}));

var ConcatArraysOp = /*#__PURE__*/function (_opTypes5) {
  _inherits(ConcatArraysOp, _opTypes5);

  var _super31 = _createSuper(ConcatArraysOp);

  function ConcatArraysOp() {
    _classCallCheck(this, ConcatArraysOp);

    return _super31.apply(this, arguments);
  }

  return ConcatArraysOp;
}(opTypes(FnOp, ArrayValue));

var ConcatArrays = /*#__PURE__*/function (_fnOp4) {
  _inherits(ConcatArrays, _fnOp4);

  var _super32 = _createSuper(ConcatArrays);

  function ConcatArrays() {
    _classCallCheck(this, ConcatArrays);

    return _super32.apply(this, arguments);
  }

  return ConcatArrays;
}(fnOp(ConcatArraysOp, function (a, b) {
  return a.concat(b);
}));

var DateOp = /*#__PURE__*/function (_opTypes6) {
  _inherits(DateOp, _opTypes6);

  var _super33 = _createSuper(DateOp);

  function DateOp() {
    _classCallCheck(this, DateOp);

    return _super33.apply(this, arguments);
  }

  return DateOp;
}(opTypes(UnaryFnOp, DateValue, NumberValue));

var dateOp = function dateOp(fn) {
  return fnOp(DateOp, fn);
};

var DayOfMonth = /*#__PURE__*/function (_dateOp) {
  _inherits(DayOfMonth, _dateOp);

  var _super34 = _createSuper(DayOfMonth);

  function DayOfMonth() {
    _classCallCheck(this, DayOfMonth);

    return _super34.apply(this, arguments);
  }

  return DayOfMonth;
}(dateOp(function (d) {
  return d.getDate();
}));

var Year = /*#__PURE__*/function (_dateOp2) {
  _inherits(Year, _dateOp2);

  var _super35 = _createSuper(Year);

  function Year() {
    _classCallCheck(this, Year);

    return _super35.apply(this, arguments);
  }

  return Year;
}(dateOp(function (d) {
  return d.getUTCFullYear();
}));

var Month = /*#__PURE__*/function (_dateOp3) {
  _inherits(Month, _dateOp3);

  var _super36 = _createSuper(Month);

  function Month() {
    _classCallCheck(this, Month);

    return _super36.apply(this, arguments);
  }

  return Month;
}(dateOp(function (d) {
  return d.getUTCMonth() + 1;
}));

var Hour = /*#__PURE__*/function (_dateOp4) {
  _inherits(Hour, _dateOp4);

  var _super37 = _createSuper(Hour);

  function Hour() {
    _classCallCheck(this, Hour);

    return _super37.apply(this, arguments);
  }

  return Hour;
}(dateOp(function (d) {
  return d.getUTCHours();
}));

var Minute = /*#__PURE__*/function (_dateOp5) {
  _inherits(Minute, _dateOp5);

  var _super38 = _createSuper(Minute);

  function Minute() {
    _classCallCheck(this, Minute);

    return _super38.apply(this, arguments);
  }

  return Minute;
}(dateOp(function (d) {
  return d.getUTCMinutes();
}));

var Second = /*#__PURE__*/function (_dateOp6) {
  _inherits(Second, _dateOp6);

  var _super39 = _createSuper(Second);

  function Second() {
    _classCallCheck(this, Second);

    return _super39.apply(this, arguments);
  }

  return Second;
}(dateOp(function (d) {
  return d.getUTCSeconds();
}));

var Millisecond = /*#__PURE__*/function (_dateOp7) {
  _inherits(Millisecond, _dateOp7);

  var _super40 = _createSuper(Millisecond);

  function Millisecond() {
    _classCallCheck(this, Millisecond);

    return _super40.apply(this, arguments);
  }

  return Millisecond;
}(dateOp(function (d) {
  return d.getUTCMilliseconds();
}));

var TypeCond = /*#__PURE__*/function () {
  function TypeCond(stack, args, op) {
    _classCallCheck(this, TypeCond);

    var InputType = op.InputType,
        alt = op.alt;
    this.result_types = new Set([op.ResultType, alt.ResultType]);
    this.stack = stack;
    this.isType = InputType.isType;
    this.args = args;
    this.op = op;
    this.alt_value = alt.value;
  }

  _createClass(TypeCond, [{
    key: "run",
    value: function run(fields) {
      var stack = this.stack,
          isType = this.isType,
          op = this.op;
      var new_args = [];

      var _iterator = _createForOfIteratorHelper(this.args),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var arg = _step.value;
          var result = arg.run(fields);

          if (!isType(result)) {
            return this.alt_value;
          }

          new_args.push(result);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      for (var i = new_args.length - 1; i >= 0; i--) {
        stack.push(new_args[i]);
      }

      return op.run(fields);
    }
  }]);

  return TypeCond;
}();

var PopFromStack = /*#__PURE__*/function () {
  function PopFromStack(stack) {
    _classCallCheck(this, PopFromStack);

    this.stack = stack;
  }

  _createClass(PopFromStack, [{
    key: "run",
    value: function run() {
      return this.stack.pop();
    }
  }]);

  return PopFromStack;
}();

var ops = {
  $add: Add,
  $subtract: Subtract,
  $multiply: Multiply,
  $divide: Divide,
  $mod: Mod,
  $abs: Abs,
  $ceil: Ceil,
  $floor: Floor,
  $ln: Ln,
  $log10: Log10,
  $pow: Pow,
  $sqrt: Sqrt,
  $trunc: Trunc,
  $concat: Concat,
  $toLower: ToLower,
  $toUpper: ToUpper,
  $concatArrays: ConcatArrays,
  $dayOfMonth: DayOfMonth,
  $year: Year,
  $month: Month,
  $hour: Hour,
  $minute: Minute,
  $second: Second,
  $millisecond: Millisecond
};

var buildOp = function buildOp(paths, name, args) {
  var Op = ops[name];

  if (!Op) {
    unknownOp(name);
  }

  if (!Array.isArray(args)) {
    args = [args];
  }

  var op = new Op(),
      tc_nodes = [],
      new_paths = [],
      stack = [];

  for (var i = 0; i < args.length && i < op.length; i++) {
    var arg = build(new_paths, args[i]);

    if (arg.ResultType) {
      if (arg.ResultType !== op.InputType) {
        return op.alt;
      }

      op.add(arg);
      continue;
    }

    if (arg instanceof TypeCond) {
      if (!arg.result_types.has(op.InputType)) {
        return op.alt;
      }

      if (arg.result_types.size === 1) {
        op.add(arg);
        continue;
      }
    }

    tc_nodes.push(arg);
    op.add(new PopFromStack(stack));
  }

  if (!new_paths.length) {
    return new op.ResultType(op.run());
  }

  paths.push.apply(paths, new_paths);

  if (!tc_nodes.length) {
    return op;
  }

  return new TypeCond(stack, tc_nodes, op);
};

var buildObject = function buildObject(paths, expr) {
  var op_names = new Set(),
      fields = new Set();

  for (var field in expr) {
    (field[0] === '$' ? op_names : fields).add(field);
  }

  if (op_names.size > 1) {
    throw Error('objects cannot have more than one operator');
  }

  if (op_names.size) {
    var _iterator2 = _createForOfIteratorHelper(fields),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var path = _step2.value;
        throw Error("unexpected field '".concat(path, "'"));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(op_names),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var name = _step3.value;

        if (name === '$literal') {
          return Value.literal(expr[name]);
        }

        return buildOp(paths, name, expr[name]);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  var new_paths = [],
      obj = {};

  for (var _field in expr) {
    obj[_field] = build(new_paths, expr[_field]);
  }

  var node = new ObjectExpr(obj);

  if (!new_paths.length) {
    return new Value(node.run());
  }

  paths.push.apply(paths, new_paths);
  return node;
};

var build = function build(paths, expr) {
  if (typeof expr === 'string' && expr[0] === '$') {
    var path = new Path(expr.substring(1));
    paths.push(path);
    return new Get(path);
  }

  if (expr == null || expr.constructor !== Object) {
    return Value.any(expr);
  }

  return buildObject(paths, expr);
};

module.exports = function (expr) {
  var paths = [],
      ast = build(paths, expr);
  return {
    ast: ast,
    paths: paths,
    has_refs: !!paths.length
  };
};