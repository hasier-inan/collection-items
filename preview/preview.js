import React from "react";
import ReactDOM from "react-dom";
import CollectionItems from "../src/collection-items";

const items = {
    1: [],
    5: [{
        title: "Hellbilly Deluxe",
        subtitle: "Nothing",
        subtitle2: '****',
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
        group: "one",
        width: 80,
    },
        {
            title: "Art",
            subtitle: "Nothing at all",
            subtitle2: '*',
            image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
            group: "one",
        }],
    6: [{
        title: "Art",
        subtitle: "A large subtitle with many things to say but nothing clear ellipsis should work as expected in this case",
        subtitle2: '*',
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
        group: "two",
    },
        {
            title: "So it be, an American Made Music to Strip By and Educated Horse compilation large title",
            subtitle: "A large subtitle with many things to say but nothing clear ellipsis should work as expected in this case",
            subtitle2: '*****',
            image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
            group: "one",
        }]
};

const categories = [
    {
        'id': 1,
        'title': 'category1',
    },
    {
        'id': 5,
        'title': 'category2',
        'parent': 1,
    },
    {
        'id': 6,
        'title': 'category3',
        'parent': 1,
    },
];

ReactDOM.render(React.createElement(() =>
    <CollectionItems
        items={items}
        fixedWidth={180}
        categories={categories}
        onItemClick={(item) => {
            console.log(item)
        }}
        filterableProperties={{
            title: {label: 'Title', values: ['Hellbilly Deluxe', 'Art']},
            subtitle: {label: 'Something cool', values: ['Nothing', 'Nothing at all']},
            subtitle1: {
                label: 'Nothing important stuff',
                values: ['Nothing', 'Nothing at allNothing at allNothing at all']
            },
        }}
        title={'This is the page'}
        footer={'https://github.com/hasier-inan'}
        groupBy={'group'}
        subtitleRender={(item)=>(<div>{item.subtitle2}</div>)}
    />), window.collectionitems);
