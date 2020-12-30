import "./index.scss";

import {faHome, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ItemContainer from "./item-container";
import Menu from "./menu";
import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import _flatten from "lodash/flatten";
import _values from "lodash/values";

class CollectionItems extends React.Component {

    constructor(props) {
        super(props);

        const {
            categories
        } = this.props;

        this.state = {
            categories: this.buildCategories(categories),
        };
    }

    buildCategories(categories, selectedId) {
        return categories.map((category) => {
            const categoryId = category.id || category.title;
            return {
                id: categoryId,
                selected: selectedId && selectedId === categoryId,
                title: category.title,
                onSelect: () => {
                    this.setState({
                        selectedCategory: categoryId,
                        title: category.title,
                        categories: this.buildCategories(categories, categoryId),
                    });
                }
            }
        });
    }

    removeCategory() {
        const {
            categories
        } = this.props;

        this.setState({
            selectedCategory: undefined,
            title: undefined,
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
        return (<div className={'collection-items__header'} />)
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

    renderItems() {
        const {
                selectedCategory,
            } = this.state,
            {
                items,
            } = this.props;

        return selectedCategory ? items[selectedCategory] : _flatten(_values(items));
    }

    render() {
        return (
            <div className={'collection-items'}>
                {this.renderMenu()}
                {this.renderHeader()}
                {this.renderBreadcrumb()}
                <ItemContainer
                    items={this.renderItems()}
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
};

/* istanbul ignore next */
CollectionItems.defaultProps = {
    categories: [],
};

export default CollectionItems;
