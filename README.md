# Library Tree

<!-- <img src= "https://img.shields.io/github/v/release/Wil-b/Library-Tree?include_prereleases">[![CodeFactor](https://www.codefactor.io/repository/github/wil-b/smp-scripts/badge?s=e31aef34da666a7f881d60c035843654ee451e7d)](https://www.codefactor.io/repository/github/wil-b/smp-scripts) -->

 Feature rich library viewer for foobar2000.
 
 ### HIGHLIGHT
 Now supports all types of album art including artist photos & album covers.

 <kbd> <img src="https://user-images.githubusercontent.com/35600752/118013262-d73cc280-b349-11eb-9197-e3d4ba1a7e71.png"> </kbd>
 
 ### FEATURES
- Tree viewer + album art support.
- Library and playlist sources.
- Single panel and two panel modes.
- Album art flow mode.

### REQUIREMENTS:
- [foobar2000](https://www.foobar2000.org)
- [Spider Monkey Panel 1.4.1+](https://www.foobar2000.org/components)
- IE8 or later
- [FontAwesome](https://github.com/FortAwesome/Font-Awesome/blob/fa-4/fonts/fontawesome-webfont.ttf?raw=true)

IMPORTANT: If updating from v2.1.3, and you wish to retain settings, export panel properties before installing the new version. Import them after installation.
### INSTALLATION
This version has to be installed as package.
1) Add a spider monkey panel to foobar2000.
1) Right click the spider monkey panel while pressing the windows key + shift. Choose configure panel.
2) On the script tab choose package.
3) Click the import button and import the library tree package.

##### Troubleshooting
Please note that the package manager is a new feature of spider monkey panel. If you experience issues with the spider monkey panel installer follow the guide below.

<i>Portable foobar2000 installs</i>

1) Create a new package first. Call it, e.g. test, & delete it afterwards. This should create a missing folder which then allows Library Tree to be installed.
2) Try using the development build of spider monkey panel which has the required bug fix.

<i>Standard foobar2000 installs</i>

You'll need to install the package manually or wait for fixed spider monkey panel release. For completeness the below covers portable installs as well.
To do a manual install, create the following path in YOUR_FOOBAR_PROFILE_PATH: foo_spider_monkey_panel\packages\\{E85C9EF0-778B-46DD-AF20-F4BE831360DD}.
You need to end up with the following master folder:
- For standard installations of any version of foobar2000: .\foobar2000\foo_spider_monkey_panel\packages\\{E85C9EF0-778B-46DD-AF20-F4BE831360DD}
- For portable installations of foobar2000 v1.6 or later: .\foobar2000\profile\foo_spider_monkey_panel\packages\\{E85C9EF0-778B-46DD-AF20-F4BE831360DD}
- For portable installations of foobar2000 1.5 or earlier: .\foobar2000\foo_spider_monkey_panel\packages\\{E85C9EF0-778B-46DD-AF20-F4BE831360DD}

Extract the Library Tree.zip. Copy the content, ie. the assets folder, the scripts folder and the two files, main.js and package.json, into the above folder.

![T_Rex](https://user-images.githubusercontent.com/35600752/118255885-b5a41e00-b4a4-11eb-8f19-7a24e5215463.png)

#### Credits
- Original Jscript library search (2013): thanhdat1710
- Original JS smooth browser design (2015): Br3tt (aka falstaff)

