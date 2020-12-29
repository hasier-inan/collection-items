import "./index.scss";

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

    buildCategories(categories) {
        return categories.map((category) => {
            return {
                id: category.id || category.title,
                title: category.title,
                onSelect: () => {
                    this.setState({
                        selectedCategory: category.id,
                        title: category.title,
                    });
                }
            }
        });
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
        const {
            title,
        } = this.state;

        return (
            <div className={'collection-items'}>
                {this.renderMenu()}
                <div className={'collection-items__header'}></div>
                <ItemContainer
                    title={title}
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
