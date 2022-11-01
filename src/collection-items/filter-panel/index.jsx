import "./index.scss";

import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";


class FilterPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {},
        };
    }

    buildOptions(options) {
        const filterOptions = options.map((option) => {
            return {
                value: option,
                label: option
            }
        });

        return filterOptions;
    }

    selectionPerformed(filterKey, options) {
        const
            {
                onFilterSelect,
            } = this.props,
            {
                filters,
            } = this.state;

        if (options) {
            filters[filterKey] = options.map((option) => {
                return option.value;
            });
        } else {
            filters[filterKey] = [];
        }

        this.setState({filters});
        onFilterSelect(filters);
    }

    renderSelects() {
        const {
            filters
        } = this.props;

        return (Object.keys(filters).map((filterKey, index) => {
            const options = filters[filterKey].values,
                label = filters[filterKey].label;
            return (
                <div key={index}
                     className={`item-filter__select item-filter--${filterKey}`}>
                    <label>
                        {label}
                    </label>
                    <Select
                        isMulti
                        isSearchable
                        placeholder={'Any'}
                        onChange={(option) => this.selectionPerformed(filterKey, option)}
                        options={this.buildOptions(options)}
                    />
                </div>
            )
        }));
    }

    render() {
        return (<div className={'item-filter'}>
                {this.renderSelects()}
            </div>
        );
    }
}

FilterPanel.propTypes = {
    "filters": PropTypes.object.isRequired,
    "onFilterSelect": PropTypes.func.isRequired,
};

export default FilterPanel;
