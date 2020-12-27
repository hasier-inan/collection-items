import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CollectionItems from "../";
import React from "react";
import Item from "../item";
import {assert} from "chai";
import _merge from "lodash/merge";

configure({"adapter": new Adapter()});

describe("CollectionItems", () => {

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
            const anItem = mount(<CollectionItems items={items}/>);
            assert.lengthOf(anItem.find(Item), items.length, "Expected all items to be drawn");
        });

        it("default width and height is included", () => {
            const width = 666, height = 888,
                anItem = mount(<CollectionItems items={items} defaultHeight={height} defaultWidth={width}/>);
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
            const anItem = mount(<CollectionItems items={items} defaultHeight={defaultHeight}
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

    });
});
