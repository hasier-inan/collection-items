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
            } = this.props;

        let flattenValues = _flatten(_values(items));
        if (searchText) {
            return _filter(flattenValues, (item) => {
                return JSON.stringify(item).toUpperCase().includes(searchText.toUpperCase());
            });
        }
        return flattenValues
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
            selectedCategory,
            title,
        } = this.state;

        if (selectedCategory) {
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
            categories
        } = this.state;

        if (categories.length > 0) {
            return <Menu items={categories}
                         isOpen={false}
            />;
        }
    }

    render() {
        const {
            onItemClick,
        } = this.props;

        return (
            <div className={'collection-items'}>
                {this.renderMenu()}
                {this.renderHeader()}
                {this.renderBreadcrumb()}
                <ItemContainer
                    items={this.retrieveItems()}
                    onItemClick={onItemClick}
                />
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
};

/* istanbul ignore next */
CollectionItems.defaultProps = {
    categories: [],
    onItemClick: () => {
    },
    onCategorySelect: () => {
    },
};

export default CollectionItems;
