---
layout: 'layouts/page.njk'
title: 'How does this site work?'
menu: 'how'
tagline: '&nbsp;does this site work?'
---

## CMS

The site is powered by a pretty nifty if not slightly idiosyncratic (at least to me) flat-file CMS called [Grav](https://getgrav.org). I like it because all content and configuration is stored in text files rather than a database, which means it's simple to install and maintain, and I can version control everything, as well as add content from any platform without dealing with a slow CMS dashboard.

A static site generator would probably make a lot of sense for this site and I'd like to explore that some day, but I haven't quite wrapped my head around them yet. I want to be able to publish from anywhere, not just my computer where the SSG is installed, which means I would need a Continuous Integration server running to monitor for changes and rebuild the site. This seems *more* complicated to me than just running a CMS.

## Hosting

I host the site on [Cloudways](https://cloudways.com), a very cool VPS hosting provider. It spins up DigitalOcean, AWS, Google Cloud, Linode, or Vultr VMs in the background, but then manages the OS and installed packages for you, so you don't need to worry about security, configuration, etc. At $22/mo for one DigitalOcean server it's a little spendy for personal hosting, but I'm currently serving close to a dozen different websites on that one instance.

## Git

The entire site (CMS installation and all) is in a [Github repo](https://github.com/justusthane/grav-justus.ws). When I make a change to the site and push to the repo (or edit directly through the Github web interface), a Webhook tells Cloudways to pull the changes from the repo and the changes are live within seconds.

## Local development with Vagrant

*Coming soon*
