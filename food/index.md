---
layout: layouts/page.liquid
menu: food
tagline: '&nbsp& kitchen'
title: Recipes & tools
tags: ''
---
<ul>
{% for page in collections.food %}
  <li><a href="{{ page.url }}">{{ page.data.title }}</a> <span class="date">(published {{ page.date | date: '%Y-%m-%d' }}{% if page.data.updated %}, updated {{ page.data.updated }}{% endif %})</span></li>
{% endfor %}
</ul>
