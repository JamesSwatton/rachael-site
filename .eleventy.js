const { DateTime } = require("luxon");
let metadata = require("./_data/metadata.json");

module.exports = function(eleventyConfig) {
    //add css to watch list
    // eleventyConfig.addWatchTarget("./css/")

    // copy images to _site
    eleventyConfig.addPassthroughCopy("assets");
    // copy css to _site
    eleventyConfig.addPassthroughCopy("css");
    // copy CNAME to _site
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.setDataDeepMerge(true);

    // CUSTOM FILTERS
    eleventyConfig.addFilter("sortBy", function(collection, data) {
        collection.forEach(item => {
            if (!item[data]) return;
            if (item[data] && typeof item[data] !== "string" ||
                item[data] && typeof item[data] !== "number") {
                return;
            }
        })
        return collection.sort((a,b) => a.data.year - b.data.year);
    })
    
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

        return Array.from(yearSet).sort();
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
            .filter(item => item.data.title)
            .filter(item => metadata.navOrder.includes(item.data.title.toLowerCase()))
            .sort((a, b) => metadata.navOrder.indexOf(a.data.title.toLowerCase()) - metadata.navOrder.indexOf(b.data.title.toLowerCase()));
    })
}
