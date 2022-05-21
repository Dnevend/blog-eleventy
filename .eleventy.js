const moment = require('moment');
const markdownLib = require('./11ty/markdown.js');
// https://www.11ty.dev/docs/plugins/syntaxhighlight/
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
moment.locale('en');

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("imgs");
    eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.addFilter('dateIso', date => {
        return moment(date).toISOString();
    });

    eleventyConfig.addFilter('dateReadable', date => {
        return moment(date).utc().format('LL'); // E.g. May 31, 2019
    });

    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    eleventyConfig.setLibrary("md", markdownLib);
    
    eleventyConfig.addPlugin(syntaxHighlight, {
        // Change which Eleventy template formats use syntax highlighters
        templateFormats: ["*"], // default

        // Use only a subset of template types (11ty.js added in v4.0.0)
        // templateFormats: ["liquid", "njk", "md", "11ty.js"],

        // init callback lets you customize Prism
        init: function ({ Prism }) {
            Prism.languages.myCustomLanguage = '/* */';
        },

        // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
        preAttributes: {
            tabindex: 0
        },
        codeAttributes: {},
    });

}

function extractExcerpt(article) {
    if (!article.hasOwnProperty('templateContent')) {
        console.warn('Failed to extract excerpt: Document has no property "templateContent".');
        return null;
    }

    let excerpt = null;
    const content = article.templateContent;

    const separatorsList = [
        { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
        { start: '<p>', end: '</p>' }
    ];

    separatorsList.some(separators => {
        const startPosition = content.indexOf(separators.start);
        const endPosition = content.indexOf(separators.end);

        if (startPosition !== -1 && endPosition !== -1) {
            excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
            return true; // Exit out of array loop on first match
        }
    });

    return excerpt;
}