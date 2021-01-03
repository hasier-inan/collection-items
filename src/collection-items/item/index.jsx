import "./index.scss";
import 'react-lazy-load-image-component/src/effects/opacity.css';

import PropTypes from "prop-types";
import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Item = (props) => {

    const renderSubtitle = () => {
        const {
            subtitle,
        } = props;

        if (subtitle) {
            return <div title={subtitle} className={'item__subtitle ellipsify'}>{subtitle}</div>;
        }
    };

    const renderImage = () => {
        const {
                width,
                height,
                image,
                onClick,
                lazyLoad,
            } = props,
            style = {
                width: `${width}px`,
                height: `${height}px`
            };

        if (image) {
            return (<LazyLoadImage
                className={'item__image'}
                onClick={onClick}
                src={image}
                style={style}
                effect="opacity"
                visibleByDefault={!lazyLoad}
            />);
        }
        return (<div className={'item__image item--no-image'} style={style} onClick={onClick}/>);
    };

    const {
        className,
        title,
        width,
    } = props;

    return (
        <div className={`item ${className}`} style={{width: `${width}px`}}>
            {renderImage()}
            <div title={title} className={'item__title ellipsify'}>{title}</div>
            {renderSubtitle()}
        </div>
    );
};

Item.propTypes = {
    "className": PropTypes.string,
    "image": PropTypes.string,
    "title": PropTypes.string.isRequired,
    "subtitle": PropTypes.string,
    "width": PropTypes.number,
    "height": PropTypes.number,
    "lazyLoad": PropTypes.bool,
    "onClick": PropTypes.func,
};

/* istanbul ignore next */
Item.defaultProps = {
    "className": "",
    "image": "",
    "subtitle": "",
    "width": 150,
    "height": 150,
    "lazyLoad": true,
    "onClick": () => {
    },
};

export default Item;
