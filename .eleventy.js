const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addFilter("head", function(array, n) {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if(n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    })

    eleventyConfig.addFilter("min", function(...numbers) {
        return Math.min.apply(null, numbers);
    })

    eleventyConfig.addFilter("readableDate", function(dateObj) {
        return DateTime.fromJSDate(dateObj, {zone: "utc"}).toFormat("dd LLL yyyy");
    })

    // filter out generic tags from tag collection
    function filterTagList(tags) {
        return (tags || []).filter(tag => ["post", "posts", "publication", "publications"].indexOf(tag) == -1);
    }

    eleventyConfig.addFilter("filterTagList", filterTagList);

    eleventyConfig.addCollection("tagList", function(collection) {
        const tagSet = new Set();
        collection.getAll().forEach(element => {
            (element.data.tags || []).forEach(tag => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    })

    eleventyConfig.addCollection("navList", function(collection) {
        return collection.getAll()
            .filter(item => item.data.nav_order)
            .sort((a, b) => a.data.nav_order - b.data.nav_order);
    })
}
