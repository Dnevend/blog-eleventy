const markdownItDefault = require('markdown-it');
const markdonwItEmoji = require('markdown-it-emoji');
const markdownItAttrs = require('markdown-it-attrs');

const markdownIt = markdownItDefault({
    html: true,
    linkify: true,
    typographer: true
});
const markdownLib = markdownIt.use(markdonwItEmoji).use(markdownItAttrs);

module.exports = markdownLib;

// https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins