import "./index.scss";

import {faHome, faAngleRight} from "@fortawesome/free-solid-svg-icons";
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

class CollectionItems extends React.Component {

    constructor(props) {
        super(props);

        const {
            categories,
        } = this.props;

        this.state = {
            categories: this.buildCategories(categories),
            isMenuOpen: false,
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
                searchText,
            } = this.state,
            {
                items,
                displayFullCollection,
            } = this.props;

        let flattenValues = _flatten(_values(items));
        if (searchText) {
            return _filter(flattenValues, (item) => {
                return JSON.stringify(item).toUpperCase().includes(searchText.toUpperCase());
            });
        } else if (displayFullCollection) {
            return flattenValues
        }
    }

    retrieveItems() {
        const {
                selectedCategory,
            } = this.state,
            {
                items,
            } = this.props;

        return selectedCategory ? items[selectedCategory] : this.retrieveFilteredItems();
    }

    searchItem(text) {
        this.setState({
            selectedCategory: undefined,
            searchText: text,
        })
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
        } = this.state;

        return (<div className={'collection-items__header'}>
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
            categories                     ,
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
    items: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape(Item.propTypes)
        )).isRequired,
    onItemClick: PropTypes.func,
    onCategorySelect: PropTypes.func,
    enableBreadcrumb: PropTypes.bool,
    displayFullCollection: PropTypes.bool,
};

/* istanbul ignore next */
CollectionItems.defaultProps = {
    categories: [],
    onItemClick: () => {
    },
    onCategorySelect: () => {
    },
    enableBreadcrumb: true,
    displayFullCollection: true,
};

export default CollectionItems;
