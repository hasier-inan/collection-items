import chai from "chai";
import chaiAsPromised from 'chai-as-promised';

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {url: "http://localhost:3000/"});
const { window } = jsdom;

function copyProps(src, target) {

    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}


global.window = window;

global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};

copyProps(window, global);

chai.use(chaiAsPromised);

/* eslint-disable no-unused-vars */
const should = chai.should();
