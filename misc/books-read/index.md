---
title: Books I've read
date: 2020-09-13
tags: misc
---
<div class="booklist">
{% for currentPage in collections['books'] | reverse %}
  <div class="bookdetails">
  <h2><em>{{ currentPage.data.title }}</em> by {{ currentPage.data.author }}</h2>
  </div>
  <figure style="float: left;"><img style="width: 150px;" src="{{ currentPage.data.cover }}"></figure>
  <div class="bookreview">
  <p><span class="{% if currentPage.data.dnf %}strike{% endif %}">Finished {{ currentPage.date | utcDate("YYYY-MM-DD") }}</span> {% if currentPage.data.dnf %}<strong>Did Not Finish</strong>{% endif %}</p>
    <p>{{ currentPage.templateContent | safe }}</p>
  </div>
{% endfor %}
</div>
