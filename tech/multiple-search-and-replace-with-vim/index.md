---
title: How to search and replace multiple strings with Vim
date: 2021-09-21
---

## Intro
All of our Solarwinds Orion email alerts decided to stop working last week---rather than containing the alert variables, such as the IP address of the node, they just contained the variables themselves, e.g. `${IP_Address}`. [Turns out](https://support.solarwinds.com/SuccessCenter/s/article/Alert-email-shows-the-variable-instead-of-the-variable-information?language=en_US) Solarwinds replaced all the old variables with new ones. Cool. So now it's a matter of going through each one of our dozens of alerts and updating the variables.


In other words, for each alert, we have something that looks like this (some of the HTML has been trimmed out for "brevity"):
```html
<span  style="font-weight: bold;">${Status}</span> notification for
<span style="font-weight: bold;"> ${NodeName}</span>
<br> (${IP})
</span>
</tr>
<tr>
<td>
<br>
<table class="alert"  style="border-collapse: collapse; font-family: Verdana; font-size: 10pt; text-align: left; margin-left: auto; margin-right: auto; width: 982px; height: 182px;"  border="0" cellpadding="0" cellspacing="0">
<tbody>
<tr>
<th colspan="2"  style="background-color: rgb(255, 224, 224); text-align: justify; font-weight: bold;"> Network Alert</th>
</tr>
<tr>
<td style="font-weight: bold;">Alert: </td>
<td style="text-align: left;">The Following Node Has Gone down</td>
</tr>
<tr class="alt">
<td  style="background-color: rgb(255, 224, 224); text-align: justify; font-weight: bold;">Node Name</td>
<td  style="background-color: rgb(255, 224, 224); text-align: justify;">${NodeName}</td>
</tr>
<tr>
<td style="font-weight: bold;">Location</td>
<td>${location}</td>
</tr>
<tr class="alt">
<td  style="background-color: rgb(255, 224, 224); text-align: justify; font-weight: bold;">System Name</td>
<td  style="background-color: rgb(255, 224, 224); text-align: justify;">${DNS}</td>
</tr>
<tr>
<td style="font-weight: bold;">IP Address</td>
<td>${IP_Address}</td>
</tr>
<tr class="alt">
<td  style="background-color: rgb(255, 224, 224); text-align: justify; font-weight: bold;">Node URL</td>
<td  style="background-color: rgb(255, 224, 224); text-align: justify;">
<a  href="${NodeDetailsURL}">Click Here</a>
</td>
</tr>
<tr>
<td style="font-weight: bold;">Time of Alert</td>
<td>${Time} ${Date}&nbsp;</td>
</tr>
<tr>
<td  style="background-color: rgb(255, 224, 224); font-weight: bold;">Description</td>
<td style="background-color: rgb(255, 224, 224);">${N=SwisEntity;M=NodeDescription}</td>
</tr>

```
...and we need to replace each of those variables with the new variable:

```md
- ${NodeName} -> ${N=SwisEntity;M=DisplayName}
- ${IP} -> ${N=SwisEntity;M=IP_Address}
- ${IP_Address} -> ${N=SwisEntity;M=IP_Address}
- ${Status} -> ${N=SwisEntity;M=Status;F=Status}
- ${location} -> ${N=SwisEntity;M=Location}
- ${DNS} -> ${N=SwisEntity;M=DNS}
- ${NodeDetailsURL} -> ${N=SwisEntity;M=DetailsUrl}
- ${Time} -> ${N=Alerting;M=AlertTriggerTime;F=DateTime} 
- ${N=SwisEntity;M=NodeDescription} -> ${N=SwisEntity;M=NodeDescription}
- ${AlertName} -> ${N=Alerting;M=AlertName}
- ${Node.Caption} -> ${N=SwisEntity;M=Node.Caption}
```

Sure, we could go through each alert manually and update them. Or we could copy/paste the alerts into a Word Processor and search and replace each variable individually. Vim can do us one better though, and at least update all the variables in each alert at once.

## Howto
We're going to create a macro to execute a list of substitutions all at once. And since we're saving it as a macro, we can execute the same list of substitutions again for each alert.
1. Paste the above alert HTML into a new Vim buffer.
2. Open a new empty buffer in a split with `:vnew`
3. Into the empty buffer, put the following:
  ```text
  :%s/\V${NodeName}/${N=SwisEntity;M=DisplayName}/e
  :%s/\V${IP}/${N=SwisEntity;M=IP_Address}/e
  :%s/\V${IP_Address}/${N=SwisEntity;M=IP_Address}/e
  :%s/\V${Status}/${N=SwisEntity;M=Status;F=Status}/e
  :%s/\V${location}/${N=SwisEntity;M=Location}/e
  :%s/\V${DNS}/${N=SwisEntity;M=DNS}/e
  :%s/\V${NodeDetailsURL}/${N=SwisEntity;M=DetailsUrl}/e
  :%s/\V${Time}/${N=Alerting;M=AlertTriggerTime;F=DateTime}/ e
  :%s/\V${N=SwisEntity;M=NodeDescription}/${N=SwisEntity;M=NodeDescription}/e
  :%s/\V${AlertName}/${N=Alerting;M=AlertName}/e
  :%s/\V${Node.Caption}/${N=SwisEntity;M=Node.Caption}/e
  
  ```
  Note that the empty line at the end is important, otherwise the macro won't execute the last substitution because there's no linebreak (enter) after the last substitution.
  
4. Now we'll yank that buffer into the `q` register with the following: `gg"qyG`
5. Now switch back to the split containing the HTML, and execute register `q` as a macro: `@q`
6. Each of the variables in the HTML should have been replaced with the updated variable. Now for each additional alert, we just have to paste it into the same Vim split and execute the macro again using `@q`. If you find an additional variable you need to add to the list to replace, you can simply add it to the list in the split containing the macro, and then yank the whole thing to the register again as in Step 4.

Here's an asciicast of the whole process (recommend viewing full screen):

<script id="asciicast-6klAFaK454KkmvS7UqSFbc7Fz" src="https://asciinema.org/a/6klAFaK454KkmvS7UqSFbc7Fz.js" async></script>
