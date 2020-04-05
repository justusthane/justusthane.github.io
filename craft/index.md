---
layout: layouts/page.liquid
menu: 'sewing/craft'
tagline: '&nbsp;projects'
title: 'Sewing & other crafty things'
tags: ''
---
<ul>
{% for page in collections.craft %}
  <li><a href="{{ page.url }}">{{ page.data.title }}</a> <span class="date">(published {{ page.date | date: '%Y-%m-%d' }})</span></li>
{% endfor %}
</ul>
