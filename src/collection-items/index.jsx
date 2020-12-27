import "./index.scss";

import Item from "./item";
import React from "react";
import PropTypes from "prop-types";
import _merge from "lodash/merge";

const CollectionItems = (props) => {

    const renderCollectionItems = () => {
        const {
            items,
            defaultWidth,
            defaultHeight,
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
                />
            }
        );
    };

    return (<div className={'collection-items'}>
        {renderCollectionItems()}
    </div>);
};

CollectionItems.propTypes = {
    "items": PropTypes.arrayOf(
        PropTypes.shape(Item.propTypes)
    ),
    "defaultWidth": PropTypes.number,
    "defaultHeight": PropTypes.number,
};

/* istanbul ignore next */
CollectionItems.defaultProps = {
    "items": [],
    "defaultWidth": 150,
    "defaultHeight": 150,
};

export default CollectionItems;
