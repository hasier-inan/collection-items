# Collection items
Component to list a set of items based on given categories and items. Basic usage:
```js 
 <CollectionItems
        items={items}
        categories={categories}
    />

```

Provided `items` will need to follow a specific structure, as shown below. Each entry will be constructed with the category id (or name) as key and the list of _items_ as values:
```js   
const items = {
    1: [{
        title: "a title",
        subtitle: "a subtitle",
        image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
    }],
    5: [
        {
            title: "another title",
            subtitle: "another subtitle",
            image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
        },
        {
            title: "another title2",
            subtitle: "another subtitle",
            image: "https://img.discogs.com/i3O2NPFVVU0unDFHvrAoV3KfMAU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12641858-1539175125-1540.jpeg.jpg",
        }
    ]
};
```

If no categories are specified, no menu will be included, otherwise all categories will be listed in a burguer menu:
```js
  const categories = [
      {
          'id': 1,
          'title': 'category1',
      },
      {
          'id': 5,
          'title': 'category2',
      }
  ];
```

Selecting a category in the menu will list all items that belong to that category. Otherwise all items will be listed.

Other properties:
- defaultCategory: Category id that will be displayed when full collection is accessed. Undefined by default, it will load the entire collection in this case.
- onItemClick: Callback function with clicked item.
- onCategorySelect: Callback function with selected category.
- enableBreadcrumb: It will include a breadcumb above the collection items with selected category and home button. True by default.  
- displayFullCollection: It will display the entire collection when no category is selected. True by default.  
