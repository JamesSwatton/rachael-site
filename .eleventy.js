const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
    //add css to watch list
    // eleventyConfig.addWatchTarget("./css/")

    // copy images to _site
    eleventyConfig.addPassthroughCopy("assets");
    // copy css to _site
    eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.setDataDeepMerge(true);

    // CUSTOM FILTERS
    eleventyConfig.addFilter("stripUrl", function(url, n = 1) {
        return url.split("/")[n];
    })

    eleventyConfig.addFilter("indexOf", function(array, el) {
        return array.indexOf(el);
    })

    eleventyConfig.addFilter("includes", function(array, item) {
        if (array) {
            return array.includes(item)
        } else {
            return false
        }
    })

    eleventyConfig.addFilter("getProperty", function(array, prop) {
        return array.map(item => item.data[prop])
    })

    eleventyConfig.addFilter("last", function(array, n) {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        } else if (array.length < Math.abs(n)) {
            return array;
        }
        return array.slice(n);
    })

    eleventyConfig.addFilter("posToNeg", function(n) {
        return -n
    })

    eleventyConfig.addFilter("min", function(...numbers) {
        return Math.min.apply(null, numbers);
    })

    eleventyConfig.addFilter("readableDate", function(dateObj) {
        return DateTime.fromJSDate(dateObj, {zone: "utc"}).toFormat("dd LLL yyyy");
    })

    // filter out generic tags from tag collection
    function filterTagList(tags) {
        return (tags || []).filter(tag => ["post", "posts", "publication", "publications", "research", "project", "projects"].indexOf(tag) == -1);
    }

    eleventyConfig.addFilter("filterTagList", filterTagList);

    eleventyConfig.addCollection("years", function(collection) {
        const yearSet = new Set();
        collection.getFilteredByTag("publications").forEach(element => {
            if (element.data.year) yearSet.add(element.data.year)
        })

        return yearSet;
    })

    eleventyConfig.addCollection("tagList", function(collection) {
        const tagSet = new Set();
        collection.getAll().forEach(element => {
            (element.data.tags || []).forEach(tag => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    })

    eleventyConfig.addCollection("navList", function(collection) {
        return collection.getAll()
            .filter(item => item.data.nav)
            .sort((a, b) => a.data.nav.order - b.data.nav.order);
    })
}
