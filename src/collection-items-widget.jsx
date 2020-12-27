import React from "react";
import {render} from "react-dom";
import CollectionItems from "./collection-items";
/* istanbul ignore file */
var buildCollectionItems = function(element, props){
    render(<CollectionItems {...props}/>, document.querySelector(`${element}`));
}

export {buildCollectionItems};
