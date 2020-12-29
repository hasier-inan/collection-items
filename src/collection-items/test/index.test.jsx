import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {assert} from "chai";
import Menu from "../menu";
import CollectionItems from "../";
import ItemContainer from "../item-container"
import _flatten from "lodash/flatten";
import _values from "lodash/values";

configure({"adapter": new Adapter()});

describe("CollectionItems", () => {

    const categories = [
        {
            'id': 1,
            'title': 'category1',
        },
        {
            'id': 5,
            'title': 'category2',
        },
    ];

    const items = {
        1: [{
            title: "title1",
        }],
        5: [
            {
                title: "title2",
            },
            {
                title: "title3",
            }
        ]
    };

    describe("Component includes menu", () => {

        it("Menu is not rendered when no categories are found", () => {
            const component = mount(<CollectionItems items={[]}/>);
            assert.isFalse(component.find(Menu).exists(), "Expected no menu to be rendered");
        });

        it("Menu is rendered", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>),
                menuItems = component.find(Menu).props().items;

            categories.forEach((category, index) => {
                assert.equal(menuItems[index].title, category.title, "Expected menu title to be set");
                assert.equal(menuItems[index].id, category.id, "Expected menu id to be set");
            });
        });

        it("Menu items ids are set based on title when not defined", () => {
            const categories = [{
                    title: 'something',
                }],
                component = mount(<CollectionItems categories={categories} items={items}/>);

            assert.equal(component.find(Menu).props().items[0].id, categories[0].title,
                "Expected id to be the title value");
        });

        it("Having no category selected leaves all flatten items", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            assert.deepEqual(component.find(ItemContainer).props().items, _flatten(_values(items)),
                "Expected items to be updated according to selected category");
        });

        it("Category selection triggers item list update", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            component.find('.menu-item').at(0).simulate('click');
            assert.deepEqual(component.find(ItemContainer).props().items, items[1],
                "Expected items to be updated according to selected category");
        });
    });
});
