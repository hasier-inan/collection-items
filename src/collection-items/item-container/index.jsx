import "./index.scss";

import Item from "../item";
import React from "react";
import PropTypes from "prop-types";
import _merge from "lodash/merge";

const ItemContainer = (props) => {

    const renderTitle = () => {
        const {
            title,
        } = props;

        if (title) {
            return <h1 className={'item-container__title text-center'}>{title}</h1>;
        }
    };

    const renderItemContainer = () => {
        const {
                items,
                defaultWidth,
                defaultHeight,
                onItemClick,
                lazyLoad,
            } = props;

        return items.map((item, index) => {
                const itemProps = _merge({
                    width: defaultWidth,
                    height: defaultHeight,
                }, item, {
                    className: 'collection-items__item mt-1 m-1 d-inline-block',
                });

                return <Item key={index}
                             {...itemProps}
                             onClick={() => {
                                 onItemClick(item);
                             }}
                             lazyLoad={lazyLoad}
                />
            }
        );
    };

    return (<div className={'item-container'}>
        {renderTitle()}
        {renderItemContainer()}
    </div>);
};

ItemContainer.propTypes = {
    "items": PropTypes.arrayOf(
        PropTypes.shape(Item.propTypes)
    ),
    "title": PropTypes.string,
    "defaultWidth": PropTypes.number,
    "defaultHeight": PropTypes.number,
    "onItemClick": PropTypes.func,
    "lazyLoad": PropTypes.bool,
};

/* istanbul ignore next */
ItemContainer.defaultProps = {
    "items": [],
    "title": "",
    "defaultWidth": 150,
    "defaultHeight": 150,
    "onItemClick": () => {
    },
    "lazyLoad": true,
};

export default ItemContainer;
