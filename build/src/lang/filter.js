"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('../util.js'),
    isObject = _require.isObject,
    equal = _require.equal,
    unknownOp = _require.unknownOp;

var MISSING = require('./missing_symbol.js'),
    Path = require('./path.js'),
    Fields = require('./fields.js');

var isIndexMatchable = function isIndexMatchable(value) {
  if (typeof value === 'number') {
    return !isNaN(value);
  }

  if (typeof value === 'string') {
    return true;
  }

  if (typeof value === 'boolean') {
    return true;
  }

  if (!value) {
    return false;
  }

  if (value.constructor === Object) {
    return false;
  }

  if (Array.isArray(value)) {
    var _iterator = _createForOfIteratorHelper(value),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;

        if (!isIndexMatchable(element)) {
          return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.valueOf());
  }

  return false;
};

var Operator = /*#__PURE__*/function () {
  function Operator() {
    _classCallCheck(this, Operator);
  }

  _createClass(Operator, [{
    key: "getClauses",
    value: function getClauses() {
      return this.is_index_matchable ? [this] : [];
    }
  }]);

  return Operator;
}();

var Connective = /*#__PURE__*/function (_Operator) {
  _inherits(Connective, _Operator);

  var _super = _createSuper(Connective);

  function Connective(args) {
    var _this;

    _classCallCheck(this, Connective);

    _this = _super.call(this);
    _this.args = args;
    return _this;
  }

  return Connective;
}(Operator);

var Conjunction = /*#__PURE__*/function (_Connective) {
  _inherits(Conjunction, _Connective);

  var _super2 = _createSuper(Conjunction);

  function Conjunction() {
    _classCallCheck(this, Conjunction);

    return _super2.apply(this, arguments);
  }

  _createClass(Conjunction, [{
    key: "getClauses",
    value: function getClauses() {
      var clauses = [];

      for (var i = 0; i < this.args.length; i++) {
        var op = this.args[i];

        if (op instanceof Connective) {
          clauses.push.apply(clauses, _toConsumableArray(op.getClauses()));
        } else if (op.is_index_matchable) {
          op.parent = this;
          op.index = i;
          clauses.push(op);
        }
      }

      return clauses;
    }
  }, {
    key: "run",
    value: function run(fields) {
      var _iterator2 = _createForOfIteratorHelper(this.args),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var arg = _step2.value;

          if (!arg.run(fields)) {
            return false;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return true;
    }
  }]);

  return Conjunction;
}(Connective);

var Disjunction = /*#__PURE__*/function (_Connective2) {
  _inherits(Disjunction, _Connective2);

  var _super3 = _createSuper(Disjunction);

  function Disjunction() {
    _classCallCheck(this, Disjunction);

    return _super3.apply(this, arguments);
  }

  _createClass(Disjunction, [{
    key: "getClauses",
    value: function getClauses() {
      return [];
    }
  }, {
    key: "run",
    value: function run(fields) {
      var _iterator3 = _createForOfIteratorHelper(this.args),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var arg = _step3.value;

          if (arg.run(fields)) {
            return true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return false;
    }
  }]);

  return Disjunction;
}(Connective);

var Negation = /*#__PURE__*/function (_Conjunction) {
  _inherits(Negation, _Conjunction);

  var _super4 = _createSuper(Negation);

  function Negation() {
    _classCallCheck(this, Negation);

    return _super4.apply(this, arguments);
  }

  _createClass(Negation, [{
    key: "getClauses",
    value: function getClauses() {
      return [];
    }
  }, {
    key: "run",
    value: function run(fields) {
      return !_get(_getPrototypeOf(Negation.prototype), "run", this).call(this, fields);
    }
  }]);

  return Negation;
}(Conjunction);

var Exists = /*#__PURE__*/function (_Operator2) {
  _inherits(Exists, _Operator2);

  var _super5 = _createSuper(Exists);

  function Exists(path, bool) {
    var _this2;

    _classCallCheck(this, Exists);

    _this2 = _super5.call(this);
    _this2.path = path;
    _this2.bool = bool;
    return _this2;
  }

  _createClass(Exists, [{
    key: "run",
    value: function run(fields) {
      return fields.get(this.path) !== MISSING === this.bool;
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return !!this.bool;
    }
  }]);

  return Exists;
}(Operator);

var Equal = /*#__PURE__*/function (_Operator3) {
  _inherits(Equal, _Operator3);

  var _super6 = _createSuper(Equal);

  function Equal(path, value) {
    var _this3;

    _classCallCheck(this, Equal);

    _this3 = _super6.call(this);
    _this3.path = path;
    _this3.value = value;
    return _this3;
  }

  _createClass(Equal, [{
    key: "run",
    value: function run(fields) {
      var value = fields.get(this.path);

      if (value === MISSING) {
        return false;
      }

      return equal(value, this.value);
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return isIndexMatchable(this.value);
    }
  }, {
    key: "idb_key_range",
    get: function get() {
      return IDBKeyRange.only(this.value);
    }
  }]);

  return Equal;
}(Operator);

var NotEqual = /*#__PURE__*/function (_Equal) {
  _inherits(NotEqual, _Equal);

  var _super7 = _createSuper(NotEqual);

  function NotEqual() {
    _classCallCheck(this, NotEqual);

    return _super7.apply(this, arguments);
  }

  _createClass(NotEqual, [{
    key: "run",
    value: function run(fields) {
      return !_get(_getPrototypeOf(NotEqual.prototype), "run", this).call(this, fields);
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return false;
    }
  }]);

  return NotEqual;
}(Equal);

var Range = /*#__PURE__*/function (_Operator4) {
  _inherits(Range, _Operator4);

  var _super8 = _createSuper(Range);

  function Range(path, fns, values) {
    var _this4;

    _classCallCheck(this, Range);

    _this4 = _super8.call(this);
    _this4.path = path;
    _this4.fns = fns;
    _this4.values = values;
    return _this4;
  }

  _createClass(Range, [{
    key: "run",
    value: function run(fields) {
      var value = fields.get(this.path);

      if (value === MISSING || value == null) {
        return false;
      }

      var fns = this.fns,
          values = this.values;

      for (var i = 0; i < fns.length; i++) {
        if (!fns[i](value, values[i])) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return true;
    }
  }]);

  return Range;
}(Operator);

var rangeMixin = function rangeMixin() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return /*#__PURE__*/function (_Range) {
    _inherits(_class, _Range);

    var _super9 = _createSuper(_class);

    function _class(path, values) {
      _classCallCheck(this, _class);

      return _super9.call(this, path, fns, values);
    }

    return _class;
  }(Range);
};

var gt = function gt(a, b) {
  return a > b;
},
    gte = function gte(a, b) {
  return a >= b;
},
    lt = function lt(a, b) {
  return a < b;
},
    lte = function lte(a, b) {
  return a <= b;
};

var Gt = /*#__PURE__*/function (_rangeMixin) {
  _inherits(Gt, _rangeMixin);

  var _super10 = _createSuper(Gt);

  function Gt() {
    _classCallCheck(this, Gt);

    return _super10.apply(this, arguments);
  }

  _createClass(Gt, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange;

      return (_IDBKeyRange = IDBKeyRange).lowerBound.apply(_IDBKeyRange, _toConsumableArray(this.values).concat([true]));
    }
  }]);

  return Gt;
}(rangeMixin(gt));

var Gte = /*#__PURE__*/function (_rangeMixin2) {
  _inherits(Gte, _rangeMixin2);

  var _super11 = _createSuper(Gte);

  function Gte() {
    _classCallCheck(this, Gte);

    return _super11.apply(this, arguments);
  }

  _createClass(Gte, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange2;

      return (_IDBKeyRange2 = IDBKeyRange).lowerBound.apply(_IDBKeyRange2, _toConsumableArray(this.values));
    }
  }]);

  return Gte;
}(rangeMixin(gte));

var Lt = /*#__PURE__*/function (_rangeMixin3) {
  _inherits(Lt, _rangeMixin3);

  var _super12 = _createSuper(Lt);

  function Lt() {
    _classCallCheck(this, Lt);

    return _super12.apply(this, arguments);
  }

  _createClass(Lt, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange3;

      return (_IDBKeyRange3 = IDBKeyRange).upperBound.apply(_IDBKeyRange3, _toConsumableArray(this.values).concat([true]));
    }
  }]);

  return Lt;
}(rangeMixin(lt));

var Lte = /*#__PURE__*/function (_rangeMixin4) {
  _inherits(Lte, _rangeMixin4);

  var _super13 = _createSuper(Lte);

  function Lte() {
    _classCallCheck(this, Lte);

    return _super13.apply(this, arguments);
  }

  _createClass(Lte, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange4;

      return (_IDBKeyRange4 = IDBKeyRange).upperBound.apply(_IDBKeyRange4, _toConsumableArray(this.values));
    }
  }]);

  return Lte;
}(rangeMixin(lte));

var GtLt = /*#__PURE__*/function (_rangeMixin5) {
  _inherits(GtLt, _rangeMixin5);

  var _super14 = _createSuper(GtLt);

  function GtLt() {
    _classCallCheck(this, GtLt);

    return _super14.apply(this, arguments);
  }

  _createClass(GtLt, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange5;

      return (_IDBKeyRange5 = IDBKeyRange).bound.apply(_IDBKeyRange5, _toConsumableArray(this.values).concat([true, true]));
    }
  }]);

  return GtLt;
}(rangeMixin(gt, lt));

var GteLt = /*#__PURE__*/function (_rangeMixin6) {
  _inherits(GteLt, _rangeMixin6);

  var _super15 = _createSuper(GteLt);

  function GteLt() {
    _classCallCheck(this, GteLt);

    return _super15.apply(this, arguments);
  }

  _createClass(GteLt, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange6;

      return (_IDBKeyRange6 = IDBKeyRange).bound.apply(_IDBKeyRange6, _toConsumableArray(this.values).concat([false, true]));
    }
  }]);

  return GteLt;
}(rangeMixin(gte, lt));

var GtLte = /*#__PURE__*/function (_rangeMixin7) {
  _inherits(GtLte, _rangeMixin7);

  var _super16 = _createSuper(GtLte);

  function GtLte() {
    _classCallCheck(this, GtLte);

    return _super16.apply(this, arguments);
  }

  _createClass(GtLte, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange7;

      return (_IDBKeyRange7 = IDBKeyRange).bound.apply(_IDBKeyRange7, _toConsumableArray(this.values).concat([true, false]));
    }
  }]);

  return GtLte;
}(rangeMixin(gt, lte));

var GteLte = /*#__PURE__*/function (_rangeMixin8) {
  _inherits(GteLte, _rangeMixin8);

  var _super17 = _createSuper(GteLte);

  function GteLte() {
    _classCallCheck(this, GteLte);

    return _super17.apply(this, arguments);
  }

  _createClass(GteLte, [{
    key: "idb_key_range",
    get: function get() {
      var _IDBKeyRange8;

      return (_IDBKeyRange8 = IDBKeyRange).bound.apply(_IDBKeyRange8, _toConsumableArray(this.values));
    }
  }]);

  return GteLte;
}(rangeMixin(gte, lte));

var ElemMatch = /*#__PURE__*/function (_Operator5) {
  _inherits(ElemMatch, _Operator5);

  var _super18 = _createSuper(ElemMatch);

  function ElemMatch(path, op) {
    var _this5;

    _classCallCheck(this, ElemMatch);

    _this5 = _super18.call(this);
    _this5.path = path;
    _this5.op = op;
    return _this5;
  }

  _createClass(ElemMatch, [{
    key: "run",
    value: function run(fields) {
      var elements = fields.get(this.path);

      if (!elements || !elements[Symbol.iterator]) {
        return false;
      }

      var op = this.op;

      var _iterator4 = _createForOfIteratorHelper(elements),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var obj = _step4.value;

          if (isObject(obj) && op.run(new Fields(obj))) {
            return true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return false;
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return false;
    }
  }]);

  return ElemMatch;
}(Operator);

var RegEx = /*#__PURE__*/function (_Operator6) {
  _inherits(RegEx, _Operator6);

  var _super19 = _createSuper(RegEx);

  function RegEx(path, expr) {
    var _this6;

    _classCallCheck(this, RegEx);

    _this6 = _super19.call(this);
    _this6.path = path;
    _this6.expr = expr;
    return _this6;
  }

  _createClass(RegEx, [{
    key: "run",
    value: function run(fields) {
      var value = fields.get(this.path);

      if (value === MISSING) {
        return false;
      }

      return this.expr.test(value);
    }
  }, {
    key: "is_index_matchable",
    get: function get() {
      return false;
    }
  }]);

  return RegEx;
}(Operator);

var $and = function $and(parent_args, args) {
  var _iterator5 = _createForOfIteratorHelper(args),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var expr = _step5.value;
      var arg = build(expr);

      if (arg === false) {
        return false;
      }

      if (!arg) {
        continue;
      }

      if (arg.constructor === Conjunction) {
        parent_args.push.apply(parent_args, _toConsumableArray(arg.args));
      } else {
        parent_args.push(arg);
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return true;
};

var $or = function $or(parent_args, args) {
  var new_args = [];
  var has_false;

  var _iterator6 = _createForOfIteratorHelper(args),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var expr = _step6.value;
      var arg = build(expr);

      if (!arg) {
        if (arg === false) {
          has_false = true;
        }

        continue;
      }

      if (arg.constructor === Disjunction) {
        new_args.push.apply(new_args, _toConsumableArray(arg.args));
      } else {
        new_args.push(arg);
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  if (new_args.length > 1) {
    parent_args.push(new Disjunction(new_args));
  } else if (new_args.length) {
    parent_args.push(new_args[0]);
  } else if (has_false) {
    return false;
  }

  return true;
};

var $not = function $not(parent_args, args) {
  var new_args = [];

  var _iterator7 = _createForOfIteratorHelper(args),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var expr = _step7.value;
      var arg = build(expr);

      if (arg) {
        new_args.push(arg);
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  if (new_args.length) {
    parent_args.push(new Negation(new_args));
  }

  return true;
};

var connectives = {
  $and: $and,
  $or: $or,
  $not: $not,
  $nor: $not
};
var ranges = [[GtLt, '$gt', '$lt'], [GteLt, '$gte', '$lt'], [GtLte, '$gt', '$lte'], [GteLte, '$gte', '$lte'], [Gt, '$gt'], [Gte, '$gte'], [Lt, '$lt'], [Lte, '$lte']];

var buildRange = function buildRange(new_args, path, params, op_keys) {
  var build = function build(RangeOp, range_keys) {
    var values = [];

    var _iterator8 = _createForOfIteratorHelper(range_keys),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var name = _step8.value;

        if (!op_keys.has(name)) {
          return;
        }

        var value = params[name];

        if (!isIndexMatchable(value)) {
          return false;
        }

        values.push(value);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    new_args.push(new RangeOp(path, values));
    return true;
  };

  var _iterator9 = _createForOfIteratorHelper(ranges),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _step9$value = _toArray(_step9.value),
          RangeOp = _step9$value[0],
          range_keys = _step9$value.slice(1);

      var result = build(RangeOp, range_keys);

      if (result === false) {
        return;
      }

      if (!result) {
        continue;
      }

      op_keys["delete"]('$gt');
      op_keys["delete"]('$gte');
      op_keys["delete"]('$lt');
      op_keys["delete"]('$lte');
      break;
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  return true;
};

var buildClause = function buildClause(parent_args, path, params) {
  var withoutOps = function withoutOps() {
    parent_args.push(new Equal(path, params));
    return true;
  };

  if (params == null || params.constructor !== Object) {
    return withoutOps();
  }

  var op_keys = new Set(Object.keys(params));

  if (op_keys.has('$exists') && !params.$exists) {
    parent_args.push(new Exists(path, false));
    return true;
  }

  var new_args = [];

  if (op_keys.has('$eq')) {
    new_args.push(new Equal(path, params.$eq));
    op_keys["delete"]('$eq');
  }

  if (op_keys.has('$ne')) {
    new_args.push(new NotEqual(path, params.$ne));
    op_keys["delete"]('$ne');
  }

  if (!buildRange(new_args, path, params, op_keys)) {
    return false;
  }

  if (op_keys.has('$in')) {
    var eqs = [];

    var _iterator10 = _createForOfIteratorHelper(params.$in),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var value = _step10.value;
        eqs.push(new Equal(path, value));
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    if (eqs.length > 1) {
      new_args.push(new Disjunction(eqs));
    } else if (eqs.length) {
      new_args.push(eqs[0]);
    }

    op_keys["delete"]('$in');
  }

  if (op_keys.has('$nin')) {
    var _iterator11 = _createForOfIteratorHelper(params.$nin),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _value = _step11.value;
        new_args.push(new NotEqual(path, _value));
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }

    op_keys["delete"]('$nin');
  }

  if (op_keys.has('$elemMatch')) {
    var op = build(params.$elemMatch);

    if (op) {
      new_args.push(new ElemMatch(path, op));
    }

    op_keys["delete"]('$elemMatch');
  }

  if (op_keys.has('$regex')) {
    var expr = new RegExp(params.$regex, params.$options);
    new_args.push(new RegEx(path, expr));
    op_keys["delete"]('$regex');
    op_keys["delete"]('$options');
  }

  if (params.$exists && !new_args.length) {
    new_args.push(new Exists(path, true));
    op_keys["delete"]('$exists');
  }

  var _iterator12 = _createForOfIteratorHelper(op_keys),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var name = _step12.value;

      if (name[0] === '$') {
        unknownOp(name);
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }

  if (!new_args.length) {
    return withoutOps();
  }

  parent_args.push.apply(parent_args, new_args);
  return true;
};

var build = function build(expr) {
  var args = [];

  for (var field in expr) {
    var value = expr[field],
        result = void 0;

    if (field[0] !== '$') {
      result = buildClause(args, new Path(field), value);
    } else {
      if (!Array.isArray(value)) {
        value = [value];
      }

      var fn = connectives[field];

      if (!fn) {
        unknownOp(field);
      }

      result = fn(args, value);
    }

    if (!result) {
      return result;
    }
  }

  if (!args.length) {
    return;
  }

  if (args.length === 1) {
    return args[0];
  }

  return new Conjunction(args);
};

module.exports.build = build;
module.exports.Conjunction = Conjunction;
module.exports.Disjunction = Disjunction;
module.exports.Exists = Exists;