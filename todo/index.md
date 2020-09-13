---
title: 'Things I want to do on this site'
menu: 'todo'
tagline: '&nbsp;for this site'
date: 2020-02-11
updated: 2020-09-11
templateEngineOverride: md
---

## Site
- [x] Stop images from being sideways :\ 
   - *[This was apparently just an issue with the exif data from iPhone photos](https://stackoverflow.com/questions/20290419/why-do-my-webpage-images-appear-sideways-in-my-html-but-correct-when-in-full-scr). Opening the images in Preview and saving them fixed it.*
- [x] Fix site tagline on mobile
- [x] Manual ordering for home page links
- [x] Split homepage into "Here" and "Elsewhere" sections
    - [x] Figure out better way to manage homepage *elsewhere* links other than hardcoded in the template
        - *[Links now defined in home page frontmatter YAML](https://github.com/justusthane/grav-justus.ws/commit/294faf768b95e80e0b8ba2b7028cc7ca797f202e) rather than hardcoded into template. Yay!*
- [x] Resize images
- [ ] Fix disappearing taglines on small site
- [x] Make blog
    - *[Made blog](https://github.com/justusthane/grav-justus.ws/commit/e3a307f5c5976b22ed4dd1e2932df896f8dbdaf6)!*
    - [x] Different content types (long post, blurb, photo, link, etc)
      - Trying to figure out how to embed the posts on the blog page using the partials template corresponding to the post type. The problem is that the normal way of embedding, `{% include 'partials/post.md' with {'page': 'item'} %}`, explicitly defines the template, where I want to use a template depending on the embedded page type (e.g. photo.md should use partials/photo.twig.html).
         - One possibility might be to build the blog as a modular page, which appears to do this automatically. However, I'm not sure if that will work since each post should also be accessible individually by its own URL
         - It also appears from the [Twig documentation](https://twig.symfony.com/doc/2.x/tags/include.html) that the template name can be a Twig expression, so there might be some room to play there.
              - *[Figured it out](https://github.com/justusthane/grav-justus.ws/commit/d4b3607705bf5760afa877bc220391db318ae5d5), and this ended up being the way. Ended up being super easy: `{% include 'partials/' ~ child.template ~ '.html.twig' with {page: child, embed: true} %}`*
         - I've also posted on the Grav forum looking for help.
    - [ ] Tags
- [ ] Automatic ToC for long pages?
   - How to parse Markdown and pull headers into Twig template?
- [x] On listing pages show date published/date updated
- [x] Figure out how to unobstrusively integrate an [h-Card](http://microformats.org/wiki/h-card) into the homepage?
   - Maybe integrate with the Elsewhere section, since that's mostly links to me at other places?
   - Or "Me" section?
   - [ ] ~~Eventually move the h-card to a footer below an hr~~
- [ ] [Semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [x] Favicon
- [ ] Add indicator for external links
- [x] Write Grav plugin to render these markdown checkboxes as HTML checkboxes
   - Model after Github markdown preview checkboxes
    - *Done! Well, I didn't write a Grav plugin, instead I rebuilt the site in the pretty cool [Eleventy static site generator](https://11ty.dev), which uses markdown.it, and it turns out there's a [markdown.it plugin](https://www.npmjs.com/package/markdown-it-task-lists) that does exactly what I wanted. Awesome!*
- [x] Add *Links* page
   - [x] Maybe actually put links on the links page
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
- [ ] Sort pages by date updated rather than date created
- [ ] Implement [MailGo](https://mailgo.dev/) for mailto: links?

## Content
- [ ] Worm composting article?
- [x] [Cast iron pan care](https://justus.ws/food/care-of-cast-iron-pans)
- [ ] In appreciation of the bamboo spatula
- [ ] Glove darning blog post
- [ ] FZF article
- [ ] Add /now page
- [x] Add "How does this site work?" page
- [ ] Self-composting page?
   - Define the entire page (save maybe nav and a brief message?) in a single template
   - Delete one character out of the template every time the page is loaded
      - How will it change over time? As parts of HTML tags are deleted the structure will slowly become visible as it breaks down.
- [ ] "Slow Story": use a neural network or something to generate a story at a speed of one word per day
    - I definitely don't know how to do this, but I like the idea and it might be fun to figure out?
- [ ] Cybersecurity for regular folks
- [x] Switching off gmail
- [ ] Update How page
