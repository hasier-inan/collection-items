import "./index.scss";

import {faAngleRight, faFilter, faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchField from "react-search-field";
import ItemContainer from "./item-container";
import Menu from "./menu";
import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import _filter from "lodash/filter";
import _flatten from "lodash/flatten";
import _values from "lodash/values";
import FilterPanel from "./filter-panel";

class CollectionItems extends React.Component {

    constructor(props) {
        super(props);

        const {
            categories,
        } = this.props;

        this.state = {
            categories: this.buildCategories(categories),
            isMenuOpen: false,
            displayFilter: false,
            filters: {},
        };
    }

    buildCategories(categories, selectedId) {
        const {
            onCategorySelect,
        } = this.props;

        return categories.map((category) => {
            const categoryId = category.id || category.title;
            return {
                id: categoryId,
                selected: selectedId && selectedId === categoryId,
                title: category.title,
                onSelect: () => {
                    onCategorySelect && onCategorySelect(categoryId);

                    this.setState({
                        selectedCategory: categoryId,
                        isMenuOpen: false,
                        searchText: undefined,
                        title: category.title,
                        categories: this.buildCategories(categories, categoryId),
                    });
                }
            }
        });
    }

    retrieveFilteredItems() {
        const {
            items,
            displayFullCollection,
        } = this.props;

        if (displayFullCollection) {
            return _flatten(_values(items))
        }
    }

    retrieveItems() {
        const {
                selectedCategory,
                searchText,
            } = this.state,
            {
                items,
                defaultCategory,
            } = this.props,
            displayedCategory = selectedCategory || defaultCategory;

        let updatedItems;
        if (searchText) {
            let flattenValues = _flatten(_values(items));
            updatedItems = _filter(flattenValues, (item) => {
                return JSON.stringify(item).toUpperCase().includes(searchText.toUpperCase());
            });
        } else {
            updatedItems = displayedCategory ? items[displayedCategory] : this.retrieveFilteredItems();
        }
        return this.filterItems(updatedItems);
    }

    filterItems(items) {
        const {
                filters,
            } = this.state,
            filterKeys = Object.keys(filters);

        if (filterKeys.length < 1) {
            return items;
        }

        return _filter(items, (item) => {
            let allPropertiesMatch = true;
            filterKeys.forEach((filterKey) => {
                const allowedValues = filters[filterKey];
                
                if (allowedValues.length > 0) {
                    allPropertiesMatch = allPropertiesMatch && allowedValues.includes(item[filterKey]);
                }
            });
            return allPropertiesMatch;
        });
    }

    searchItem(text) {
        this.setState({
            selectedCategory: undefined,
            searchText: text,
        })
    }

    handleFilterPanel() {
        const {
            displayFilter
        } = this.state;

        this.setState({displayFilter: !displayFilter});
    }

    removeCategory() {
        const {
            categories
        } = this.props;

        this.setState({
            selectedCategory: undefined,
            title: undefined,
            searchText: undefined,
            categories: this.buildCategories(categories),
        });
    }

    updateFilters(filters) {
        this.setState({filters});
    }

    renderFilter() {
        const {
                displayFilter,
            } = this.state,
            {
                filterableProperties
            } = this.props;

        if (Object.keys(filterableProperties).length > 0) {
            return (<div className={`collection-items__filter-area ${displayFilter ? 'filter-area--show' : ''}`}>
                <FilterPanel
                    filters={filterableProperties}
                    onFilterSelect={this.updateFilters.bind(this)}
                />
            </div>);
        }
    }

    renderBreadcrumb() {
        const {
                enableBreadcrumb,
            } = this.props,
            {
                selectedCategory,
                title,
            } = this.state;

        if (enableBreadcrumb && selectedCategory) {
            return (<div className={'collection-items__breadcrumb'}>
                <FontAwesomeIcon icon={faHome} onClick={this.removeCategory.bind(this)}
                                 className={'breadcrumb-item breadcrumb-item--home'}/>
                <FontAwesomeIcon icon={faAngleRight} className={'breadcrumb-item'}/>
                <span className={'breadcrumb-item breadcrumb-item--category'}>{title}</span>
            </div>);
        }
    }

    renderHeader() {
        const {
            searchText,
            filters,
        } = this.state,
            filterKeys = Object.keys(filters);

        return (<div className={'collection-items__header'}>
            <FontAwesomeIcon icon={faFilter} onClick={this.handleFilterPanel.bind(this)}
                             className={`collection-items__filter ${filterKeys.length > 0 
                                 ? 'collection-items__filter-selected' : ''}`}/>
            <SearchField
                placeholder={"Search..."}
                searchText={searchText}
                classNames={"collection-items__search-field"}
                onSearchClick={this.searchItem.bind(this)}
                onEnter={this.searchItem.bind(this)}
            />
        </div>)
    }

    renderMenu() {
        const {
            categories,
            isMenuOpen,
        } = this.state;

        if (categories.length > 0) {
            return <Menu items={categories}
                         isOpen={isMenuOpen}
            />;
        }
    }

    render() {

        return (
            <div className={'collection-items'}>
                {this.renderFilter()}
                {this.renderMenu()}
                {this.renderHeader()}
                <div className={'collection-items__content'}>
                    {this.renderBreadcrumb()}
                    <ItemContainer
                        {...this.props}
                        items={this.retrieveItems()}
                    />
                </div>
            </div>);
    }
}

CollectionItems.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            'title': PropTypes.string.isRequired,
            'id': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ),
    defaultCategory: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    items: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape(Item.propTypes)
        )).isRequired,
    onItemClick: PropTypes.func,
    onCategorySelect: PropTypes.func,
    enableBreadcrumb: PropTypes.bool,
    displayFullCollection: PropTypes.bool,
    filterableProperties: PropTypes.object,
};

/* istanbul ignore next */
CollectionItems.defaultProps = {
    categories: [],
    defaultCategory: undefined,
    onItemClick: () => {
    },
    onCategorySelect: () => {
    },
    enableBreadcrumb: true,
    displayFullCollection: true,
    filterableProperties: {},
};

export default CollectionItems;
