---
title: "'Open With' Vim from MacOS Finder"
date: 2020-05-08
---
I use Vim on the command line for almost all my text editing. Occasionally find myself browsing around in Finder and wishing I could right-click a file and open it in Vim on the terminal.

I found the following solution. First, [follow the instructions here](https://gist.github.com/charlietran/43639b0f4e0a01c7c20df8f1929b76f2) to create a "TerminalVim.app" application. At this point, we're 90% of the way there. You should be able to right-click any file, click Open With, choose Other, and browse to your new TerminalVim.app.

However, that's still more steps than we would like. In order to add TerminalVim to your **Open With** list:

1. Right-click your new **TerminalVim.app**, and click **Show Package Contents**.
1. Open **Contents/Info.plist**
1. Find the line `<key>CFBundleTypeExtensions</key>` and add new array items for each file type you want to associate with your app, as shown:
``` xml
<key>CFBundleTypeExtensions</key>
<array>
  <string>html</string>
  <string>plist</string>
  <string>csv</string>
  <string>txt</string>
</array>
```
4. Run `/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -f /Applications/TerminalVim.app`
1. Run `killall Finder`
1. You should now be able to right-click one of your chosen file types and open it in Vim!
