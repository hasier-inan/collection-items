import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Item from "../";
import React from "react";
import {assert} from "chai";
import sinon from "sinon";

configure({"adapter": new Adapter()});

describe("Item", () => {

    const imageOptions = {
        title: 'a title'
    };

    describe("Component is mount", () => {

        it("component exists", () => {
            const anItem = mount(<Item {...imageOptions} />);
            assert.exists(anItem.find(".item"), "Expected collection item");
        });

        it("includes the classname", () => {
            const aClassName = 'something',
                anItem = mount(<Item {...imageOptions} className={aClassName}/>);
            assert.isTrue(anItem.find(".item").prop("className").includes(aClassName),
                "Expected classname to be included");
        });

        it("includes the image", () => {
            const anImage = '/somewhere/far/away',
                anItem = mount(<Item {...imageOptions} image={anImage}/>);
            assert.equal(anItem.find(".item__image").prop("src"), anImage,
                "Expected image url to be set");
        });

        it("includes the default image", () => {
            const anItem = mount(<Item {...imageOptions}/>);
            assert.exists(anItem.find(".item__image.item--no-image"), "Expected empty image to be included");
        });

        it("includes the title", () => {
            const anItem = mount(<Item {...imageOptions}/>);
            assert.equal(anItem.find('.item__title').text(), imageOptions.title, "Expected title to be set");
        });

        it("includes the subtitle", () => {
            const subtitle = 'something',
                anItem = mount(<Item {...imageOptions} subtitle={subtitle}/>);
            assert.equal(anItem.find('.item__subtitle').text(), subtitle, "Expected subtitle to be set");
        });

        it("includes no subtitle element", () => {
            const anItem = mount(<Item {...imageOptions}/>);
            assert.isFalse(anItem.find(".item__subtitle").exists(), "Expected subtitle not to be included");
        });

    });

    describe("Component size is included", () => {

        it("includes the image area with specific size", () => {
            const width = 666,
                height = 888,
                anItem = mount(<Item {...imageOptions} image={'something'} width={width} height={height}/>);
            assert.deepEqual(anItem.find(".item__image").prop("style"), {width: `${width}px`, height: `${height}px`},
                "Expected item width to be set");
        });

        it("width is applied", () => {
            const width = 666,
                anItem = mount(<Item {...imageOptions} width={width}/>);
            assert.deepEqual(anItem.find(".item").prop("style"), {width: `${width}px`},
                "Expected item width to be set");
        });

        it("default width is applied", () => {
            const anItem = mount(<Item {...imageOptions} />);
            assert.deepEqual(anItem.find(".item").prop("style"), {width: '150px'},
                "Expected defaultitem width to be set");
        });

    });

    describe("Item interaction", () => {

        it("triggers item click when image exists", () => {
            const
                spy = sinon.spy(),
                anItem = mount(<Item {...imageOptions} image={'something'} onClick={spy}/>);

            anItem.find(".item__image").simulate("click");

            assert(spy.calledOnce, "Expected callback to be triggered with values.");
        });

        it("triggers item click when image does not exist", () => {
            const spy = sinon.spy(),
                anItem = mount(<Item {...imageOptions} onClick={spy}/>);

            anItem.find(".item--no-image").simulate("click");

            assert(spy.calledOnce, "Expected callback to be triggered with values.");
        });

    });
});
