"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

var _reactBurgerMenu = require("react-burger-menu");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var React = require('react');

var Menu = /*#__PURE__*/function (_React$Component) {
  _inherits(Menu, _React$Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, props);
    var isOpen = props.isOpen;
    _this.state = {
      menuOpen: isOpen
    };
    return _this;
  }

  _createClass(Menu, [{
    key: "sortByParents",
    value: function sortByParents(list) {
      var parents = list.filter(function (item) {
        return !(item !== null && item !== void 0 && item.parent);
      });
      var items = [];
      parents.forEach(function (parent) {
        items.push(parent);
        var children = list.filter(function (list) {
          return (list === null || list === void 0 ? void 0 : list.parent) === parent.id;
        });

        if (children) {
          items.push.apply(items, _toConsumableArray(children));
        }
      });
      return items;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this2 = this;

      var items = this.props.items;
      return this.sortByParents(items).map(function (value, index) {
        var isSelected = '',
            isChildren = '',
            icon = items.filter(function (v) {
          return v.parent === value.id;
        }).length ? _freeSolidSvgIcons.faChevronCircleDown : _freeSolidSvgIcons.faChevronCircleRight;

        if (value.parent) {
          isChildren = 'children';
        }

        if (value.selected) {
          isSelected = 'selected';
        }

        return /*#__PURE__*/React.createElement("a", {
          key: index,
          onClick: function onClick() {
            value.onSelect();

            _this2.setState({
              menuOpen: false
            });
          },
          className: "menu-item mt-2 ".concat(isSelected, " ").concat(isChildren)
        }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: icon,
          className: 'menu-item--bullet',
          size: "xs"
        }), value.title);
      });
    }
  }, {
    key: "handleStateChange",
    value: function handleStateChange(state) {
      this.setState({
        menuOpen: state.isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      var menuOpen = this.state.menuOpen;
      return /*#__PURE__*/React.createElement(_reactBurgerMenu.slide, {
        onStateChange: this.handleStateChange.bind(this),
        isOpen: menuOpen
      }, this.getItems());
    }
  }]);

  return Menu;
}(React.Component);

Menu.propTypes = {
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
    selected: _propTypes["default"].bool,
    title: _propTypes["default"].string.isRequired,
    parent: _propTypes["default"].any,
    onSelect: _propTypes["default"].func
  })),
  isOpen: _propTypes["default"].bool.isRequired
};
var _default = Menu;
exports["default"] = _default;