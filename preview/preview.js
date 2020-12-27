import React from "react";
import ReactDOM from "react-dom";
import CollectionItems from "../src/collection-items";

const items = [
    {
        title: "American Made Music to Strip By and Educated Horse compilation large title",
        subtitle: "A large subtitle with many things to say but nothing clear ellipsis should work as expected in this case",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    },
    {
        title: "Hellbilly Deluxe",
        subtitle: "Nothing",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    },
    {
        title: "Art",
        subtitle: "Nothing at all",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    },
    {
        title: "Art",
        subtitle: "A large subtitle with many things to say but nothing clear ellipsis should work as expected in this case",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    },
    {
        title: "So it be, an American Made Music to Strip By and Educated Horse compilation large title",
        subtitle: "A large subtitle with many things to say but nothing clear ellipsis should work as expected in this case",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    },
];

ReactDOM.render(React.createElement(() =>
    <CollectionItems
        items={items}
    />), window.collectionitems);
