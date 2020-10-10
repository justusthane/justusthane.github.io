---
title: Getting stuck on an approach
date: 2020-10-09
type: post
---
Once I start trying to solve a problem in a particular way, I find it very difficult to give up and look for an alternative approach---even though the alternative approach often ends up being much simpler.

I have an html file containing the lyrics to Radiohead's *Fitter Happier*:

``` html
Fitter, happier, more productive
Comfortable (not drinking too much)
Regular exercise at the gym (3 days a week)
Getting on better with your associate employee contemporaries
At ease
Eating well (no more microwave dinners and saturated fats)
A patient, better driver
A safer car (baby smiling in back seat)
Sleeping well (no bad dreams)
```

And I wanted to transform it such that each word/phrase is a link to a Google search for that same word/phrase, as such:

``` html
<a href="https://google.com/search?q=Fitter&btnI">Fitter</a>, <a href="https://google.com/search?q=happier&btnI">happier</a>, <a href="https://google.com/search?q=more productive&btnI">more productive</a>
<a href="https://google.com/search?q=Comfortable&btnI">Comfortable</a> (<a href="https://google.com/search?q=not drinking too much&btnI">not drinking too much</a>)
<a href="https://google.com/search?q=Regular exercise at the gym&btnI">Regular exercise at the gym</a> (<a href="https://google.com/search?q=3 days a week&btnI">3 days a week</a>)
```
...and so on (let's not worry about *why* right now). Of course this would be a pain in the ass to do manually, but I knew Vim would help me out.

It was clear upfront that a one-size-fits-all RegEx wouldn't do the trick here, since some of the links need to be a single word, while some are a phrase, and there's no obvious pattern---I need to decide for each one what I want the link to consist of.

My first approach, and the one that I got stuck on, was trying to use a visual selection in a search & replace expression. I figured that I could select a word or phrase, and then run a search & replace within that visual selection, replacing the selection with the appropriate HTML for a link to the selection. In Regular Expression terms, I'd be looking for `(.*)` within the selection (in other words, the entire selection), and replacing it with `<a href="https://google.com/search\?q=$1&btnI">$1</a>`

I tried to make this work for almost two hours---the issue was that I couldn't get Vim to save the entire visual selection to a single capture group, no matter what I tried. There's probably a way to do it, but I don't know it. Finally, it occured to me that macros would probably provide a solution. Macros allow you to record and reply a set of keystrokes. By this point I was frustrated and ready for a break, so I took Tawny for a walk, and while walking the (easy) solution came to me:


"zc<a href="https://google.com/search?q=z&btnI">z</a>€ýa
``` vim
v2e " Make any visual selection---in this case, we're selecting the next two words
qa " Begin recording a macro to register A
"zc " Yank the selection to the Z register, delete it, and switch to Insert mode
<a href="https://google.com/search?q= " Start typing our replacement string
^rz " Paste the contents of the Z buffer without leaving Insert mode
&btnI"> " Continue typing our replacement string
^rz " Again paste the contents of the Z buffer
</a> " Finish typing our replacement string
<esc> " Leave Insert mode
q " Stop recording our buffer
```

Now that we have our macro built, all we have to do to make the rest of the changes is select a word or phrase we want to "linkify", and execute our macro with `@a`

Here's the magic in action:
<script id="asciicast-xOq4vvQ1ze66wWIYgOqNsaXHP" src="https://asciinema.org/a/xOq4vvQ1ze66wWIYgOqNsaXHP.js" async></script>
