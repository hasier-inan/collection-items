"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

require("react-lazy-load-image-component/src/effects/opacity.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLazyLoadImageComponent = require("react-lazy-load-image-component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Item = function Item(props) {
  var renderSubtitle = function renderSubtitle() {
    var subtitle = props.subtitle;

    if (subtitle) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        title: subtitle,
        className: 'item__subtitle ellipsify'
      }, subtitle);
    }
  };

  var renderImage = function renderImage() {
    var width = props.width,
        height = props.height,
        image = props.image,
        onClick = props.onClick,
        lazyLoad = props.lazyLoad,
        style = {
      width: "".concat(width, "px"),
      height: "".concat(height, "px")
    };

    if (image) {
      return /*#__PURE__*/_react["default"].createElement(_reactLazyLoadImageComponent.LazyLoadImage, {
        className: 'item__image',
        onClick: onClick,
        src: image,
        style: style,
        effect: "opacity",
        visibleByDefault: !lazyLoad
      });
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: 'item__image item--no-image',
      style: style,
      onClick: onClick
    });
  };

  var className = props.className,
      title = props.title,
      width = props.width,
      subtitleRender = props.subtitleRender;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "item ".concat(className),
    style: {
      width: "".concat(width, "px")
    }
  }, renderImage(), /*#__PURE__*/_react["default"].createElement("div", {
    title: title,
    className: 'item__title ellipsify'
  }, title), renderSubtitle(), subtitleRender());
};

Item.propTypes = {
  "className": _propTypes["default"].string,
  "image": _propTypes["default"].string,
  "title": _propTypes["default"].string.isRequired,
  "subtitle": _propTypes["default"].string,
  "width": _propTypes["default"].number,
  "height": _propTypes["default"].number,
  "lazyLoad": _propTypes["default"].bool,
  "onClick": _propTypes["default"].func,
  "subtitleRender": _propTypes["default"].func
};
/* istanbul ignore next */

Item.defaultProps = {
  "className": "",
  "image": "",
  "subtitle": "",
  "width": 150,
  "height": 150,
  "lazyLoad": true,
  "onClick": function onClick() {},
  "subtitleRender": function subtitleRender() {}
};
var _default = Item;
exports["default"] = _default;