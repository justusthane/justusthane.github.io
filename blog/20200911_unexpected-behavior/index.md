---
title: 'Unexpected behavior'
date: 2020-09-11
type: 'post'
---
First I added my pixel art avatar to the top of this site. Then I decided it would be fun if the eyes moved, so I created three new versions of the image, with the eyes looking left, right, and down, and wrote some Javascript to swap the images depending on the cursor location. Then I thought I'd give it some more personality by having it blink randomly, so I created another version of the image with the eyes closed, and wrote a function that, every 0 - 15 seconds, swaps the image with the eyes-closed version, waits 150 miliseconds, and swaps it back.

It works really nicely. Sometimes it will go along time between blinks and you can have a staring contest. Sometimes it blinks twice in quick succession.

But through some quirk in the code that I don't understand, if you don't interact with the site for a while it defaults to the eyes-closed state, and the eyes stay closed until you interact again. It sleeps. I don't understand how this happens---the function is written so after 150 miliseconds, the eyes should reopen. I don't understand it, and I love it.
