var moment = require('moment');

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "html",
    "txt",
    "jpeg",
    "jpg",
    "GIF"
  ]);
  eleventyConfig.addPassthroughCopy("style");
  eleventyConfig.addPassthroughCopy("webfonts");
  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addLiquidFilter("customDate", function(value, arg) { 
    return moment(value).utc().format(arg);
  });

  let markdownIt = require("markdown-it");
  let markdownItDeflist = require("markdown-it-deflist");
  let markdownItFootnote = require("markdown-it-footnote");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItTocDoneRight = require("markdown-it-toc-done-right");
  let markdownItAttrs = require("markdown-it-attrs");
  let markdownItTaskLists = require("markdown-it-task-lists");

  let options = {
    html: true,
    breaks: true,
    linkify: true
};
  let markdownLib = markdownIt(options).use(markdownItDeflist).use(markdownItFootnote).use(markdownItAnchor).use(markdownItTocDoneRight).use(markdownItAttrs).use(markdownItTaskLists);
  eleventyConfig.setLibrary("md", markdownLib);
};

