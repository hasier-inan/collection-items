"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var FilterPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(FilterPanel, _React$Component);

  var _super = _createSuper(FilterPanel);

  function FilterPanel(props) {
    var _this;

    _classCallCheck(this, FilterPanel);

    _this = _super.call(this, props);
    _this.state = {
      filters: {}
    };
    return _this;
  }

  _createClass(FilterPanel, [{
    key: "buildOptions",
    value: function buildOptions(options) {
      var filterOptions = options.map(function (option) {
        return {
          value: option,
          label: option
        };
      });
      return filterOptions;
    }
  }, {
    key: "selectionPerformed",
    value: function selectionPerformed(filterKey, options) {
      var onFilterSelect = this.props.onFilterSelect,
          filters = this.state.filters;

      if (options) {
        filters[filterKey] = options.map(function (option) {
          return option.value;
        });
      } else {
        filters[filterKey] = [];
      }

      this.setState({
        filters: filters
      });
      onFilterSelect(filters);
    }
  }, {
    key: "calculateByOptionsLength",
    value: function calculateByOptionsLength(options) {
      var minWidth = 64,
          maxWidth = 250;
      var width = 0;
      options.forEach(function (option) {
        var currentWidth = 8 * option.length + minWidth;

        if (currentWidth > width) {
          width = maxWidth < currentWidth ? maxWidth : currentWidth;
        }
      });
      return width;
    }
  }, {
    key: "renderSelects",
    value: function renderSelects() {
      var _this2 = this;

      var filters = this.props.filters;
      return Object.keys(filters).map(function (filterKey, index) {
        var options = filters[filterKey].values,
            label = filters[filterKey].label;
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: index,
          style: {
            width: "".concat(_this2.calculateByOptionsLength(options), "px")
          },
          className: "item-filter__select item-filter--".concat(filterKey)
        }, /*#__PURE__*/_react["default"].createElement("label", null, label), /*#__PURE__*/_react["default"].createElement(_reactSelect["default"], {
          isMulti: true,
          isSearchable: true,
          placeholder: 'Any',
          onChange: function onChange(option) {
            return _this2.selectionPerformed(filterKey, option);
          },
          options: _this2.buildOptions(options)
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'item-filter'
      }, this.renderSelects());
    }
  }]);

  return FilterPanel;
}(_react["default"].Component);

FilterPanel.propTypes = {
  "filters": _propTypes["default"].object.isRequired,
  "onFilterSelect": _propTypes["default"].func.isRequired
};
var _default = FilterPanel;
exports["default"] = _default;