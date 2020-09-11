---
title: Sort pages by date updated
date: 2020-09-10
---
It's been bothering me for a while that the pages on this site were sorted by the date created rather than the date updated (if there was one), so that the first created pages are always at the bottom of the list regardless of how recently they were updated. I want fresh stuff at the top! The only date that Eleventy provides out of the box is the date created---there is no concept of date modified by default. I had created a "modified" value in the YAML frontmatter for each page for display purposes, but there wasn't a way to sort by those dates...until now!

It required creating a custom Eleventy filter that takes the supplied array of pages and sorts them by my "date modified" value, and I'm super proud of myself for getting there. It's pretty basic stuff, but it felt good to figure it out.

[Here's the commit](https://github.com/justusthane/justusthane.github.io/commit/0e68643daeaef6b5a6b2dd00463eb30f33b33ee8).

It's cool how easy it was to make this happen (my lack of Javascript chops notwithstanding). I feel like a superhero every time I add a filter to introduce new functionality to my site. [Eleventy](https://11ty.dev) rocks!
