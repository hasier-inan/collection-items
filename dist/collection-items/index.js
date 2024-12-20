"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _reactSearchField = _interopRequireDefault(require("react-search-field"));

var _itemContainer = _interopRequireDefault(require("./item-container"));

var _menu = _interopRequireDefault(require("./menu"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _item = _interopRequireDefault(require("./item"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _every2 = _interopRequireDefault(require("lodash/every"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _filterPanel = _interopRequireDefault(require("./filter-panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var CollectionItems = /*#__PURE__*/function (_React$Component) {
  _inherits(CollectionItems, _React$Component);

  var _super = _createSuper(CollectionItems);

  function CollectionItems(props) {
    var _this;

    _classCallCheck(this, CollectionItems);

    _this = _super.call(this, props);
    var categories = _this.props.categories;
    _this.state = {
      categories: _this.buildCategories(categories),
      isMenuOpen: false,
      displayFilter: false,
      filters: {}
    };
    return _this;
  }

  _createClass(CollectionItems, [{
    key: "buildCategories",
    value: function buildCategories(categories, selectedId) {
      var _this2 = this;

      var onCategorySelect = this.props.onCategorySelect;
      return categories.map(function (category) {
        var categoryId = category.id || category.title;
        return {
          id: categoryId,
          selected: selectedId && selectedId === categoryId,
          title: category.title,
          parent: category.parent,
          onSelect: function onSelect() {
            onCategorySelect && onCategorySelect(categoryId);

            _this2.setState({
              selectedCategory: categoryId,
              isMenuOpen: false,
              searchText: undefined,
              title: category.title,
              categories: _this2.buildCategories(categories, categoryId)
            });
          }
        };
      });
    }
  }, {
    key: "retrieveFilteredItems",
    value: function retrieveFilteredItems() {
      var _this$props = this.props,
          items = _this$props.items,
          displayFullCollection = _this$props.displayFullCollection;

      if (displayFullCollection) {
        return (0, _flatten2["default"])((0, _values2["default"])(items));
      }
    }
  }, {
    key: "childrenItems",
    value: function childrenItems(category) {
      var _this$props2 = this.props,
          items = _this$props2.items,
          categories = _this$props2.categories,
          childrenKeys = categories.filter(function (c) {
        return c.parent === category;
      }).map(function (c) {
        return c.id;
      });
      return childrenKeys.flatMap(function (k) {
        return items[k];
      });
    }
  }, {
    key: "retrieveItems",
    value: function retrieveItems() {
      var _this$state = this.state,
          selectedCategory = _this$state.selectedCategory,
          searchText = _this$state.searchText,
          _this$props3 = this.props,
          items = _this$props3.items,
          defaultCategory = _this$props3.defaultCategory,
          displayedCategory = selectedCategory || defaultCategory;
      var updatedItems;

      if (searchText) {
        var flattenValues = (0, _flatten2["default"])((0, _values2["default"])(items));
        updatedItems = (0, _filter2["default"])(flattenValues, function (item) {
          return JSON.stringify(item).toUpperCase().includes(searchText.toUpperCase());
        });
      } else {
        updatedItems = displayedCategory ? [].concat(_toConsumableArray(items[displayedCategory]), _toConsumableArray(this.childrenItems(selectedCategory))) : this.retrieveFilteredItems();
      }

      return this.filterItems(updatedItems);
    }
  }, {
    key: "filterItems",
    value: function filterItems(items) {
      var filters = this.state.filters,
          filterKeys = Object.keys(filters);

      if (filterKeys.length < 1) {
        return items;
      }

      return (0, _filter2["default"])(items, function (item) {
        var allPropertiesMatch = true;
        filterKeys.forEach(function (filterKey) {
          var allowedValues = filters[filterKey];

          if (allowedValues.length > 0) {
            allPropertiesMatch = allPropertiesMatch && allowedValues.includes(item[filterKey]);
          }
        });
        return allPropertiesMatch;
      });
    }
  }, {
    key: "searchItem",
    value: function searchItem(text) {
      this.setState({
        selectedCategory: undefined,
        searchText: text
      });
    }
  }, {
    key: "handleFilterPanel",
    value: function handleFilterPanel() {
      var displayFilter = this.state.displayFilter;
      this.setState({
        displayFilter: !displayFilter
      });
    }
  }, {
    key: "removeCategory",
    value: function removeCategory() {
      var categories = this.props.categories;
      this.setState({
        selectedCategory: undefined,
        title: undefined,
        searchText: undefined,
        categories: this.buildCategories(categories)
      });
    }
  }, {
    key: "updateFilters",
    value: function updateFilters(filters) {
      this.setState({
        filters: filters
      });
    }
  }, {
    key: "renderItemContainers",
    value: function renderItemContainers() {
      var _this3 = this;

      var _this$props4 = this.props,
          groupBy = _this$props4.groupBy,
          showGroup = _this$props4.showGroup,
          subtitleRender = _this$props4.subtitleRender,
          filteredItems = this.retrieveItems();

      if (!groupBy) {
        return /*#__PURE__*/_react["default"].createElement(_itemContainer["default"], _extends({}, this.props, {
          items: filteredItems
        }));
      }

      return (0, _map2["default"])((0, _groupBy2["default"])(filteredItems, groupBy), function (items, group) {
        return /*#__PURE__*/_react["default"].createElement(_itemContainer["default"], _extends({}, _this3.props, {
          key: group,
          items: items,
          title: showGroup ? group : undefined,
          subtitleRender: subtitleRender
        }));
      });
    }
  }, {
    key: "renderFilter",
    value: function renderFilter() {
      var displayFilter = this.state.displayFilter,
          filterableProperties = this.props.filterableProperties;

      if (Object.keys(filterableProperties).length > 0) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "collection-items__filter-area ".concat(displayFilter ? 'filter-area--show' : '')
        }, /*#__PURE__*/_react["default"].createElement(_filterPanel["default"], {
          filters: filterableProperties,
          onFilterSelect: this.updateFilters.bind(this)
        }));
      }
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var displayFilter = this.state.displayFilter;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "container-overlay ".concat(displayFilter ? 'container-overlay--show' : '')
      });
    }
  }, {
    key: "renderBreadcrumb",
    value: function renderBreadcrumb() {
      var enableBreadcrumb = this.props.enableBreadcrumb,
          _this$state2 = this.state,
          selectedCategory = _this$state2.selectedCategory,
          title = _this$state2.title;

      if (enableBreadcrumb && selectedCategory) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'collection-items__breadcrumb'
        }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faHome,
          onClick: this.removeCategory.bind(this),
          className: 'breadcrumb-item breadcrumb-item--home'
        }), /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faAngleRight,
          className: 'breadcrumb-item'
        }), /*#__PURE__*/_react["default"].createElement("span", {
          className: 'breadcrumb-item breadcrumb-item--category'
        }, title));
      }
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var title = this.props.title;

      if (title) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'collection-items__title'
        }, title);
      }
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var footer = this.props.footer;

      if (footer) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'collection-items__footer'
        }, footer);
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this$state3 = this.state,
          searchText = _this$state3.searchText,
          filters = _this$state3.filters,
          isFiltered = Object.keys(filters).length > 0 && (0, _every2["default"])(filters, function (value) {
        return value.length > 0;
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'collection-items__header'
      }, this.renderTitle(), /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faFilter,
        onClick: this.handleFilterPanel.bind(this),
        className: "collection-items__filter ".concat(isFiltered ? 'collection-items__filter-selected' : '')
      }), /*#__PURE__*/_react["default"].createElement(_reactSearchField["default"], {
        placeholder: "Search...",
        searchText: searchText,
        classNames: "collection-items__search-field",
        onSearchClick: this.searchItem.bind(this),
        onEnter: this.searchItem.bind(this)
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$state4 = this.state,
          categories = _this$state4.categories,
          isMenuOpen = _this$state4.isMenuOpen,
          displayFilter = _this$state4.displayFilter;

      if (categories.length > 0) {
        return /*#__PURE__*/_react["default"].createElement(_menu["default"], {
          items: categories,
          isOpen: isMenuOpen
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'collection-items'
      }, this.renderFilter(), this.renderMenu(), this.renderHeader(), /*#__PURE__*/_react["default"].createElement("div", {
        className: 'collection-items__content'
      }, this.renderOverlay(), this.renderBreadcrumb(), this.renderItemContainers()), this.renderFooter());
    }
  }]);

  return CollectionItems;
}(_react["default"].Component);

CollectionItems.propTypes = {
  categories: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    'title': _propTypes["default"].string.isRequired,
    'parent': _propTypes["default"].any,
    'id': _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  })),
  fixedWidth: _propTypes["default"].number,
  defaultCategory: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  items: _propTypes["default"].objectOf(_propTypes["default"].arrayOf(_propTypes["default"].shape(_item["default"].propTypes))).isRequired,
  onItemClick: _propTypes["default"].func,
  onCategorySelect: _propTypes["default"].func,
  enableBreadcrumb: _propTypes["default"].bool,
  displayFullCollection: _propTypes["default"].bool,
  filterableProperties: _propTypes["default"].object,
  groupBy: _propTypes["default"].string,
  title: _propTypes["default"].string,
  footer: _propTypes["default"].string,
  showGroup: _propTypes["default"].bool,
  subtitleRender: _propTypes["default"].func
};
/* istanbul ignore next */

CollectionItems.defaultProps = {
  categories: [],
  fixedWidth: 0,
  defaultCategory: undefined,
  onItemClick: function onItemClick() {},
  onCategorySelect: function onCategorySelect() {},
  enableBreadcrumb: true,
  displayFullCollection: true,
  filterableProperties: {},
  groupBy: '',
  title: undefined,
  footer: undefined,
  showGroup: true,
  subtitleRender: function subtitleRender() {}
};
var _default = CollectionItems;
exports["default"] = _default;