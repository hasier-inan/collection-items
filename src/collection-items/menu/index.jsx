import "./index.scss";

import {slide as BurguerMenu} from 'react-burger-menu'
import PropTypes from 'prop-types';
import {faChevronCircleDown, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require('react');

class Menu extends React.Component {

    constructor(props) {
        super(props);

        const {
            isOpen
        } = props;

        this.state = {menuOpen: isOpen}
    }

    sortByParents(list) {
        const parents = list.filter(item=>!item?.parent);
        let items =[];
        parents.forEach(parent=> {
            items.push(parent);
            const children = list.filter(list => list?.parent === parent.id);
            if (children) {
                items.push(...children);
            }
        });
        return items;
    }

    getItems() {
        const {
            items
        } = this.props;

        return this.sortByParents(items).map((value, index) => {
            let isSelected = '',
             isChildren = '',
             icon = items.filter(v=>v.parent===value.id).length ? faChevronCircleDown : faChevronCircleRight;

            if (value.parent) {
                isChildren = 'children';
            }
            if (value.selected) {
                isSelected = 'selected';
            }
            return <a
                key={index}
                onClick={() => {
                    value.onSelect();
                    this.setState({menuOpen: false});
                }}
                className={`menu-item mt-2 ${isSelected} ${isChildren}`}>
                <FontAwesomeIcon icon={icon} className={'menu-item--bullet'} size="xs"/>
                {value.title}
            </a>
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
        parent: PropTypes.any,
        onSelect: PropTypes.func,
    })),
    isOpen: PropTypes.bool.isRequired
};

export default Menu;
