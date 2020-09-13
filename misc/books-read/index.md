---
title: Books I've read
date: 2020-09-13
tags: misc
templateEngineOverride: njk,md
---
<div class="booklist">
{% for currentPage in collections['books'] | reverse %}
  <div class="bookdetails">
  <h2>{{ currentPage.data.title }} by {{ currentPage.data.author }}</h2>
  </div>
  <figure style="float: left;"><img style="width: 150px;" src="{{ currentPage.data.cover }}"></figure>
  <div class="bookreview">
  <p>Finished {{ currentPage.date | utcDate("YYYY-MM-DD") }}</p>
    <p>{{ currentPage.templateContent | safe }}</p>
  </div>
{% endfor %}
</div>
