---
layout: layouts/page.liquid
menu: tech
tagline: '&nbsp; stuff'
title: Techsmithing
tags: ''
---
<ul>
{% for page in collections.tech %}
  <li><a href="{{ page.url }}">{{ page.data.title }}</a> <span class="date">(published {{ page.date | customDate: 'YYYY-MM-DD' }}{% if page.data.updated %}, updated {{ page.data.updated | customDate: 'YYYY-MM-DD' }}{% endif %})</span></li>
{% endfor %}
</ul>
