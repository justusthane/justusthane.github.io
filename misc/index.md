---
layout: 'layouts/page.liquid'
menu: 'misc'
tagline: '/fun&amp;notfun'
title: 'Miscellaneous'
tags: ''
---
<ul>
{% for page in collections.misc %}
  <li><a href="{{ page.url }}">{{ page.data.title }}</a> <span class="date">(published {{ page.date | date: '%Y-%m-%d' }}{% if page.data.updated %}, updated {{ page.data.updated }}{% endif %})</span></li>
{% endfor %}
</ul>
