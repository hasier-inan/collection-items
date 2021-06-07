import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilterPanel from "../";
import React from "react";
import {assert} from "chai";
import sinon from "sinon";
import Select from "react-select";

configure({"adapter": new Adapter()});

describe("Filter", () => {

    describe("Component is mount", () => {
        it("includes all selectable components", () => {
            const spy = sinon.spy(),
                component = mount(<FilterPanel onFilterSelect={spy}
                                               filters={{
                                                   something: {label: 'Title', values: ['doh']},
                                                   something_else: {label: 'Title', values: ["dah"]}
                                               }}/>);
            assert.equal(component.find(Select).length, 2, "Expected all select dropdown components to be rendered");
        });

        it("includes all options in the dropdown", () => {
            const options = ['doh', 'dah', 'duh'],
                spy = sinon.spy(),
                component = mount(<FilterPanel onFilterSelect={spy}
                                               filters={{something: {label: 'Title', values: options}}}/>);
            let renderedOptions = component.find(Select).props().options;
            options.map((option, index) => {
                assert.equal(option, renderedOptions[index].value, "Expected option to be rendered");
            });
        });

        it("triggers a filter change callback with multiple selections", () => {
            const spy = sinon.spy(),
                values = ['doh', 'dah', 'duh'],
                allFilters = {something: {label: 'Title', values}},
                component = mount(<FilterPanel onFilterSelect={spy}
                                               filters={allFilters}/>);

            component.find(Select).props().onChange([{value: 'doh'}, {value: 'dah'}, {value: 'duh'}]);

            assert(spy.calledOnce, "Expected callback to be triggered with selected values.");
            assert.deepEqual(spy.args[0][0], {something: values}, "Expected all filters to be passed");
        });

        it("triggers a filter change callback with no selections", () => {
            const spy = sinon.spy(),
                component = mount(<FilterPanel onFilterSelect={spy}
                                               filters={{something: {label: 'Title', values: ['doh', 'dh', 'duh']}}}/>);

            component.find(Select).props().onChange(null);

            assert(spy.calledOnce, "Expected callback to be triggered with selected values.");
            assert.deepEqual(spy.args[0][0], {something: []}, "Expected all filters to be passed");
        });

        it("calculates dropdown width based on content length with a minimum size", () => {
            const values = ['d',],
                component = mount(<FilterPanel onFilterSelect={() => {
                }}
                                               filters={{something: {label: 'Title', values}}}/>);

            assert.deepEqual(component.find('.item-filter__select').props().style, {width: '72px'});

        });

        it("calculates dropdown width based on all content length", () => {
            const values = ['d', 'd', 'duh'],
                component = mount(<FilterPanel onFilterSelect={() => {
                }}
                                               filters={{something: {label: 'Title', values}}}/>);

            assert.deepEqual(component.find('.item-filter__select').props().style, {width: '88px'});

        });

        it("calculates dropdown width based on all content length with a maximum width", () => {
            const values = ['d', 'd', 'duh duh duh duh very long content'],
                component = mount(<FilterPanel onFilterSelect={() => {
                }}
                                               filters={{something: {label: 'Title', values}}}/>);

            assert.deepEqual(component.find('.item-filter__select').props().style, {width: '250px'});

        });

    });

});

