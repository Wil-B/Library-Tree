# Library Tree

<!-- <img src= "https://img.shields.io/github/v/release/Wil-b/Library-Tree?include_prereleases">[![CodeFactor](https://www.codefactor.io/repository/github/wil-b/smp-scripts/badge?s=e31aef34da666a7f881d60c035843654ee451e7d)](https://www.codefactor.io/repository/github/wil-b/smp-scripts) -->

Feature rich library viewer for [foobar2000](https://www.foobar2000.org), now extended to include album art.
 
 ### FEATURES
- Tree viewer + album art support
- Library and playlist sources
- Single panel and two panel modes
- Album art flow mode

### REQUIREMENTS:
- [foobar2000](https://www.foobar2000.org)
- [Spider Monkey Panel 1.5.2+](https://www.foobar2000.org/components)
- IE8 or later
- [FontAwesome](https://github.com/FortAwesome/Font-Awesome/blob/fa-4/fonts/fontawesome-webfont.ttf?raw=true)

### INSTALLATION
Install as a package as follows.

New install or update:
1) Add a spider monkey panel to foobar2000 if required
2) Close any instances of windows explorer using foobar2000 folders or subfolders
3) Right click the spider monkey panel while pressing the windows key + shift
4) Choose configure panel
5) On the script tab ensure package is selected
6) Open package manager if it doesn't open automatically
7) Import the package

## Screenshots

### Two panel mode with artist images and covers
![2pane](https://user-images.githubusercontent.com/35600752/155884212-9bea1326-3430-46a4-a86e-3bc4b09e4dd4.png)
The screenshot is using the dark theme and columns UI with dividing splitter hidden.

### Flow mode (upper) and tree modes (lower)
![Muse](https://user-images.githubusercontent.com/35600752/155903327-9631a328-2f67-4f25-9cbd-316e5f5210b5.png)
Tree modes shows various node styles with, left to right: user interface theme; dark theme; blend theme; album art background

### Two panel mode with index and covers
![Character](https://user-images.githubusercontent.com/35600752/156163852-5d8295f4-3ff2-4ef4-849f-0bd5ce24ba8e.png)
To set up the above, position two Spider Monkey Panels side by side. Add library tree to each. The screenshot is using the dark theme (display tab) and columns UI with the dividing splitter hidden.
- Right panel: set source to panel & follow instructions on pop-up
- Left panel: on display tab, tick 'List view (tree)'. Use a view pattern something like: 
```
$cut(%artist%,1)|%artist%|$if2(%album%,εXtra)|[[%discnumber%.]%tracknumber%. ][%track artist% - ]%title%
```
### Tree mode with album art background + jump search
![T_Rex](https://user-images.githubusercontent.com/35600752/118255885-b5a41e00-b4a4-11eb-8f19-7a24e5215463.png)

## Credits
- Original Jscript library search (2013): thanhdat1710
- Original JS smooth browser design (2015): Br3tt (aka falstaff)
