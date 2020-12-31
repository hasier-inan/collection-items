import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {assert} from "chai";
import Menu from "../menu";
import CollectionItems from "../";
import ItemContainer from "../item-container"
import SearchField from "react-search-field";
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

        it("Menu item does not contain selected property by default", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            assert.isUndefined(component.find(Menu).props().items[0].selected,
                "Expected no menu item to be selected");
        });

        it("Menu item contains selected property when selected", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            component.find('.menu-item').at(0).simulate('click');
            assert.equal(component.find(Menu).props().items[0].selected, true,
                "Expected menu item to be selected");
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

        it("Category selection displays breadcrumb", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            component.find('.menu-item').at(0).simulate('click');
            assert.equal(component.find('.breadcrumb-item.breadcrumb-item--category').text(), categories[0].title,
                "Expected breadcrumb to be set with selected category");
        });

    });

    describe("Breadcrumb", () => {

        it("Loads all items when home link is followed in the breadcrumb", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);

            component.find('.menu-item').at(0).simulate('click');
            assert.exists(component.find(".collection-items__breadcrumb"), "Expected breadcrumb to be displayed");
            component.find('.breadcrumb-item--home').at(0).simulate('click');
            assert.isFalse(component.find('.collection-items__breadcrumb').exists(), "Expected no breadcrumb");
            assert.deepEqual(component.find(ItemContainer).props().items, _flatten(_values(items)),
                "Expected items to be updated according to selected category");
        });

        it("No breadcrumb is included when category is not selected", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);
            assert.isFalse(component.find('.collection-items__breadcrumb').exists(), "Expected no breadcrumb");
        });
    });

    describe("Search items", () => {

        it("does not include a search text by default", () => {
            const component = mount(<CollectionItems categories={categories} items={items}/>);
            assert.equal(component.find(ItemContainer).props().items.length, 3, "Expected all items to be included");
        });

        it("search triggered by submit button filters items ", () => {
            const searchText = 'title1',
                component = mount(<CollectionItems categories={categories} items={items}/>);
            component.find(SearchField).props().onSearchClick(searchText);

            setImmediate(() => {
                component.update();
                assert.equal(component.find(ItemContainer).props().items.length, 1,
                    "Expected a unique item to be included");
                assert.equal(component.find(ItemContainer).props().items[0].title, searchText,
                    "Expected item title to match");

            });
        });

        it("search triggered by enter keydown filters items ", () => {
            const searchText = 'title1',
                component = mount(<CollectionItems categories={categories} items={items}/>);
            component.find(SearchField).props().onEnter(searchText);

            setImmediate(() => {
                component.update();
                assert.equal(component.find(ItemContainer).props().items.length, 1,
                    "Expected a unique item to be included");
                assert.equal(component.find(ItemContainer).props().items[0].title, searchText,
                    "Expected item title to match");

            });
        });

        it("category selection discards search text", () => {
            const searchText = 'title1',
                component = mount(<CollectionItems categories={categories} items={items}/>);
            component.find(SearchField).props().onSearchClick(searchText);

            setImmediate(() => {
                component.update();
                component.find('.menu-item').at(1).simulate('click');
                assert.deepEqual(component.find(ItemContainer).props().items, items[5],
                    "Expected items to be updated according to selected category");

            });
        });

    });
});
