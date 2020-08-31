var moment = require('moment');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setTemplateFormats([
    "md",
    "html",
    "txt",
    "jpeg",
    "jpg",
    "png",
    "GIF",
    "wav",
    "mp3"
  ]);
  eleventyConfig.addPassthroughCopy("style");
  eleventyConfig.addPassthroughCopy("webfonts");
  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addLiquidFilter("customDate", function(value, arg) { 
    return moment(value).utc().format(arg);
  });

  eleventyConfig.addFilter("utcDate", function(value, arg) { 
    return moment(value).utc().format(arg);
  });

  eleventyConfig.addNunjucksFilter("split", function(value, arg) { 
    return value.split(arg);
  });

  let markdownIt = require("markdown-it");
  let markdownItDeflist = require("markdown-it-deflist");
  let markdownItFootnote = require("markdown-it-footnote");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItTocDoneRight = require("markdown-it-toc-done-right");
  let markdownItAttrs = require("markdown-it-attrs");
  let markdownItTaskLists = require("markdown-it-task-lists");
  let markdownItEmoji = require("markdown-it-emoji");

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
};
  let markdownLib = markdownIt(options).use(markdownItDeflist).use(markdownItFootnote).use(markdownItAnchor).use(markdownItTocDoneRight).use(markdownItAttrs).use(markdownItTaskLists).use(markdownItEmoji);
  eleventyConfig.setLibrary("md", markdownLib);

markdownLib.renderer.rules.footnote_block_open = () => (
  '<h3>Footnotes</h3>\n' +
  '<section class="footnotes">\n' +
  '<ol class="footnotes-list">\n'
);

};


