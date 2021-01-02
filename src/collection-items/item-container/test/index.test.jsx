import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemContainer from "../";
import React from "react";
import Item from "../../item";
import {assert} from "chai";
import _merge from "lodash/merge";
import sinon from "sinon";

configure({"adapter": new Adapter()});

describe("ItemContainer", () => {

    const items = [
        {
            title: "title1",
            subtitle: "sub1",
            image: "img1",
        },
        {
            title: "title2",
            subtitle: "sub2",
            image: "img2",
        }
    ];

    describe("Component is mount", () => {

        it("draws collection of items", () => {
            const anItem = mount(<ItemContainer items={items}/>);
            assert.lengthOf(anItem.find(Item), items.length, "Expected all items to be drawn");
        });

        it("adds title if included", () => {
            const title = 'something',
                anItem = mount(<ItemContainer items={items} title={title}/>);

            let itemTitle = anItem.find('.item-container__title');
            assert.exists(itemTitle, "Expected title to be included");
            assert.equal(itemTitle.text(), title, "Expected title value to match");
        });

        it("no title is added if not included", () => {
            const anItem = mount(<ItemContainer items={items}/>);

            assert.isFalse(anItem.find(".item-container__title").exists(), "Expected no title to be included");
        });

        it("default width and height is included", () => {
            const width = 666, height = 888,
                anItem = mount(<ItemContainer items={items} defaultHeight={height} defaultWidth={width}/>);
            items.map((item, index) => {
                assert.equal(anItem.find(Item).at(index).props().width, width,
                    "Expected width to match default one");
                assert.equal(anItem.find(Item).at(index).props().height, height,
                    "Expected height to match default one");
            });
        });

        it("item width and height overrides default ones", () => {
            const defaultWidth = 666,
                defaultHeight = 888,
                customWidth = 111,
                customHeight = 211;
            items[1] = _merge({}, items[1], {width: customWidth, height: customHeight,});
            const anItem = mount(<ItemContainer items={items} defaultHeight={defaultHeight}
                                                defaultWidth={defaultWidth}/>);

            assert.equal(anItem.find(Item).at(0).props().width, defaultWidth,
                "Expected width to match default one");
            assert.equal(anItem.find(Item).at(0).props().height, defaultHeight,
                "Expected height to match default one");
            assert.equal(anItem.find(Item).at(1).props().width, customWidth,
                "Expected width to be override");
            assert.equal(anItem.find(Item).at(1).props().height, customHeight,
                "Expected height to be override");
        });

        it("triggers item click callback with item", () => {
            const spy = sinon.spy(),
                anItem = mount(<ItemContainer items={items} onItemClick={spy}/>);

            anItem.find(".item__image").at(0).simulate("click");
            assert(spy.calledOnce, "Expected callback to be triggered with values.");
            assert.deepEqual(spy.args[0][0], items[0], "Expected item to be included as argument");
        });

    });
});
