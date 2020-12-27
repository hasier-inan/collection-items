import "./index.scss";
import PropTypes from "prop-types";
import React from "react";

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
            } = props,
            style = {
                width: `${width}px`,
                height: `${height}px`
            };

        if (image) {
            return (<img className={'item__image'} src={image} style={style}/>);
        }
        return (<div className={'item__image item--no-image'} style={style}/>);
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
};

/* istanbul ignore next */
Item.defaultProps = {
    "className": "",
    "image": "",
    "subtitle": "",
    "width": 150,
    "height": 150,
};

export default Item;
