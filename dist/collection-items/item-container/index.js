"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

var _item = _interopRequireDefault(require("../item"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ItemContainer = function ItemContainer(props) {
  var renderTitle = function renderTitle() {
    var title = props.title;

    if (title) {
      return /*#__PURE__*/_react["default"].createElement("h1", {
        className: 'item-container__title text-center'
      }, title);
    }
  };

  var renderItemContainer = function renderItemContainer() {
    var items = props.items,
        defaultWidth = props.defaultWidth,
        defaultHeight = props.defaultHeight,
        onItemClick = props.onItemClick,
        lazyLoad = props.lazyLoad,
        _subtitleRender = props.subtitleRender;
    return items.map(function (item, index) {
      var itemProps = (0, _merge2["default"])({
        width: defaultWidth,
        height: defaultHeight
      }, item, {
        className: 'collection-items__item mt-1 m-1 d-inline-block'
      });
      return /*#__PURE__*/_react["default"].createElement(_item["default"], _extends({
        key: index
      }, itemProps, {
        onClick: function onClick() {
          onItemClick(item);
        },
        lazyLoad: lazyLoad,
        subtitleRender: function subtitleRender() {
          return _subtitleRender(item);
        }
      }));
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'item-container'
  }, renderTitle(), renderItemContainer());
};

ItemContainer.propTypes = {
  "items": _propTypes["default"].arrayOf(_propTypes["default"].shape(_item["default"].propTypes)),
  "title": _propTypes["default"].string,
  "defaultWidth": _propTypes["default"].number,
  "defaultHeight": _propTypes["default"].number,
  "onItemClick": _propTypes["default"].func,
  "lazyLoad": _propTypes["default"].bool,
  "subtitleRender": _propTypes["default"].func
};
/* istanbul ignore next */

ItemContainer.defaultProps = {
  "items": [],
  "title": "",
  "defaultWidth": 150,
  "defaultHeight": 150,
  "onItemClick": function onItemClick() {},
  "lazyLoad": true,
  "subtitleRender": function subtitleRender() {}
};
var _default = ItemContainer;
exports["default"] = _default;