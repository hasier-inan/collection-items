import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CollectionItems from "../";
import React from "react";
import { assert } from "chai";

configure({ "adapter": new Adapter() });

describe("CollectionItems", () => {

    let comp = null;

    describe("Component is mount", () => {

        it("draws collection of items", () => {

        });

    });
});
