var moment = require('moment');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setTemplateFormats([
    "md",
    "html",
    "txt",
    "jpeg",
    "jpg",
    "png",
    "GIF",
    "webp",
    "wav",
    "mp3"
  ]);
  eleventyConfig.addPassthroughCopy("style");
  eleventyConfig.addPassthroughCopy("webfonts");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addLiquidFilter("customDate", function(value, arg) { 
    return moment(value).utc().format(arg);
  });

  eleventyConfig.addFilter("utcDate", function(value, arg) { 
    return moment(value).utc().format(arg);
  });

  eleventyConfig.addFilter("getParent", function(currentUrl) {
    // This function takes the URL of the curent page and returns the parent URL and
    // parent slug
    let array = currentUrl.split('/');
    array.pop();
    array.pop();
    let parentUrl = array.join('/');
    let parentSlug = array.pop();
    if (parentSlug == '') {
      parentSlug = 'home';
    }
    if (parentUrl == '') {
      parentUrl = '/';
    }
    return [parentUrl,parentSlug];
  });

  eleventyConfig.addFilter("sortByUpdated", function(value) { 
  // This function takes an array of pages and sorts them by date updated. 
  // If they don't have an "updated" date, it sorts them by date created instead.
    
    value.forEach(function(item) {
      // If the page doesn't have a date updated, we'll sort it by it's date created.
      if (typeof item.data.updated == 'undefined') {
          item.data.sortdate = item.date;
      } else { // Otherwise, sort by date updated
        item.data.sortdate = item.data.updated;
      };
    });

    // Do the sort
    value.sort(function(a, b) {
      return b.data.sortdate - a.data.sortdate;
    });

    return value;
  });

  eleventyConfig.addNunjucksFilter("split", function(value, arg) { 
    return value.split(arg);
  });

  eleventyConfig.addShortcode("blogIcon", function(postType) {
    switch (postType) {
      case 'reply':
        return '<i class="fas fa-reply"></i>';
        break;
      case 'link':
        return '<i class="fas fa-link"></i>';
        break;
      case 'post':
        return '<i class="far fa-file-alt"></i>';
        break;
      case 'blurb':
        return '<i class="fas fa-feather"></i>';
        break;
      default:
        return "";
    }
  });

  let markdownIt = require("markdown-it");
  let markdownItDeflist = require("markdown-it-deflist");
  let markdownItFootnote = require("markdown-it-footnote");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItTocDoneRight = require("markdown-it-toc-done-right");
  let markdownItAttrs = require("markdown-it-attrs");
  let markdownItTaskLists = require("markdown-it-task-lists");
  let markdownItEmoji = require("markdown-it-emoji");
  let markdownItContainer = require("markdown-it-container");

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };
  let markdownLib = markdownIt(options).use(markdownItDeflist).use(markdownItFootnote).use(markdownItAnchor).use(markdownItTocDoneRight).use(markdownItAttrs).use(markdownItTaskLists).use(markdownItEmoji).use(markdownItContainer, 'full-bleed');
  eleventyConfig.setLibrary("md", markdownLib);

  markdownLib.renderer.rules.footnote_block_open = () => (
    '<h1>Footnotes</h1>\n' +
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n'
  );

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };

};


