---
layout: layouts/page.liquid
menu: 'writings'
tagline: '&nbsp;&amp;&nbsp;musings'
title: 'Essays and other things'
tags: ''
---
<ul>
{% for page in collections.writings %}
  <li><a href="{{ page.url }}">{{ page.data.title }}</a> <span class="date">(published {{ page.date | date: '%Y-%m-%d' }}{% if page.data.updated %}, updated {{ page.data.updated }}{% endif %})</span></li>
{% endfor %}
</ul>
