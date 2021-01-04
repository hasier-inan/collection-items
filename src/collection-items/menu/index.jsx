import "./index.scss";

import {slide as BurguerMenu} from 'react-burger-menu'
import PropTypes from 'prop-types';

const React = require('react');

class Menu extends React.Component {

    constructor(props) {
        super(props);

        const {
            isOpen
        } = props;

        this.state = {menuOpen: isOpen}
    }

    getItems() {
        const {
            items
        } = this.props;

        return items.map((value, index) => {
            return <a
                key={index}
                onClick={() => {
                    value.onSelect();
                    this.setState({menuOpen: false});
                }}
                className={`menu-item ml-4 mt-2 ${value.selected ? 'selected' : ''}`}>{value.title}</a>
        });
    }

    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen})
    }

    render() {
        const {
            menuOpen
        } = this.state;

        return (
            <BurguerMenu onStateChange={this.handleStateChange.bind(this)} isOpen={menuOpen}>
                {this.getItems()}
            </BurguerMenu>
        )
    }
}

Menu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        selected: PropTypes.bool,
        title: PropTypes.string.isRequired,
        onSelect: PropTypes.func,
    })),
    isOpen: PropTypes.bool.isRequired
};

export default Menu;