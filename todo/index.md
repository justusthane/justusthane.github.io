---
layout: "layouts/page.njk"
title: 'Things I want to do on this site'
date: 2020-02-11
updated: 2020-09-11
templateEngineOverride: md
eleventyNavigation:
  key: todo
  parent: home
  tagline: ' for this site'
  order: 80
---

## Site
- [x] Fix images on blog!
- [x] On listing pages show date published/date updated
- [ ] [Semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [x] Favicon
- [ ] Add indicator for external links
- [ ] Add RSS feeds
- [ ] Add options page
    - [x] light theme/dark theme
        - [x] default to device preference
            - dark mode now exists for devices that prefer it! still need to make it manual option as well.
    - [ ] LocalStorage to indicate new items since last visit
- [ ] WebMentions
- [ ] Comments
- [ ] In-line links to load image on demand. Identify with little photo icon (similar to external links). 
    - button to load all images in page/post
- [x] Add default layout for all pages
  - Done, thanks to [this](https://github.com/11ty/eleventy/issues/380#issuecomment-568033456) handy tip for accomplishing this in Eleventy
- [x] Sort pages by date updated rather than date created
  - Done. [Commit](https://github.com/justusthane/justusthane.github.io/commit/0e68643daeaef6b5a6b2dd00463eb30f33b33ee8)
- [ ] Implement [MailGo](https://mailgo.dev/) for mailto: links?
- [ ] Change my [utcDate filter](/tech/eleventy-utc-dates/) to use Luxon instead of MomentJS, since Eleventy already includes Luxon.

## Content
- [ ] Worm composting article?
- [x] [Cast iron pan care](https://justus.ws/food/care-of-cast-iron-pans)
- [x] In appreciation of the bamboo spatula
- [ ] Glove darning blog post
- [ ] FZF article
- [x] Add /now page
- [x] Add "How does this site work?" page
- [ ] Self-composting page?
   - Define the entire page (save maybe nav and a brief message?) in a single template
   - Delete one character out of the template every time the page is loaded
      - How will it change over time? As parts of HTML tags are deleted the structure will slowly become visible as it breaks down.
- [ ] "Slow Story": use a neural network or something to generate a story at a speed of one word per day
    - I definitely don't know how to do this, but I like the idea and it might be fun to figure out?
- [ ] Cybersecurity for regular folks
- [x] Switching off gmail
- [x] Update How page
