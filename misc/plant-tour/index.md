---
layout: 'layouts/gallery.njk'
title: A tour of my houseplants
date: 2020-10-03
---
{% for currentpage in page.url | getChildren %}
{{ currentpage.title }}
{% endfor %}

{% for currentPage in collection['misc'] %}
{{ currentPage }}
??
{% endfor %}
Hello

{{ page.url }}
