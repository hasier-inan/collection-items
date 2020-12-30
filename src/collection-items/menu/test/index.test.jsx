import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Menu from "../";
import {slide as BurguerMenu} from 'react-burger-menu'
import React from "react";
import {assert} from "chai";
import sinon from "sinon";

configure({"adapter": new Adapter()});

describe("Menu", () => {

    describe("Component is mount", () => {

        it("component exists and it is displayed", () => {
            const opened = true,
                component = mount(<Menu items={[]} isOpen={opened} />);
            assert.equal(component.find(BurguerMenu).props().isOpen, opened, "Expected menu component to be opened");
        });

        it("component exists and it is hidden", () => {
            const opened = false,
                component = mount(<Menu items={[]} isOpen={opened} />);
            assert.equal(component.find(BurguerMenu).props().isOpen, opened, "Expected menu component to be closed");
        });

    });

    describe("Items are included", () => {

        it("item titles are included", () => {
            const items = [{
                    'title': 'one',
                }, {
                    'title': 'two',
                },{
                    'title': 'three',
                }],
                component = mount(<Menu items={items} isOpen={true} />);
            items.forEach((item, index) => {
                assert.equal(component.find('.menu-item').at(index).text(), items[index].title,
                    "Expected all item titles to be set");
            });
        });

        it("item titles are included", () => {
            const
                spy = sinon.spy(),
                items = [{
                    'title': 'one',
                    onSelect:  spy,
                }],
                component = mount(<Menu items={items} isOpen={true} />);
            component.find(".menu-item").simulate("click");
            assert(spy.calledOnce, "Expected callback to be triggered");
        });

        it("item is not highlighted when not selected", () => {
            const
                items = [{
                    'title': 'one',
                }],
                component = mount(<Menu items={items} isOpen={true} />);
            assert.isFalse(component.find(".menu-item.selected").exists(),
                "Expected selected classname not to be included");
        });

        it("item is highlighted when selected", () => {
            const
                items = [{
                    'title': 'one',
                    'selected': true,
                }],
                component = mount(<Menu items={items} isOpen={true} />);
            assert.exists(component.find(".menu-item.selected"), "Expected selected classname to be included");
        });

    });
});
