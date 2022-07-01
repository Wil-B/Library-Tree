# v2.3.2 [unreleased]

### Added
- Hover effect (background): frame style in album art view can be displayed as an image border (display tab)
- Menu configure that opens Spider Monkey Configuration (right click + shift)

### Changed
- Settings are now always added to the context menu if shift is pressed

### Fixed
- Occasional issues with the options dialog not opening due to the feature checker wrongly reporting Spider Monkey Panel Show HTML Dialog as unsupported. In such cases there is now a confirm to guard against false negatives. Additionally, there is a manual setting in the first panel property
- Minor colour selection and draw issues

<br />

# v2.3.1

### Fixed
Issue with getting album art index character

### Added
Checks to test if ShowHtmlDialog is supported, with fallback to an alternative where possible (thx to regor)

<br />

# v2.3.0

### Changed
- Album art index character(s) that show on scrollbar drag are now configurable:
    - No limit to number, e.g. can be single letter up to full name (album art tab)
    - Year can be autodetected and 4 digits shown, if number above is less than 4 (album art tab)
- Improved horizontal flow mode metrics
- Removed the ability to auto-update from old versions (v2.1.3 or earlier)

### Added
- New clean preset with alternative selection model and new node style (menu\quicksetup)
	- info: alternative selection model is automatically used if selection\full line is enabled (behaviour tab) & hover effect (background) is set to none (display tab). It works best with highlight text on hover enabled (display tab)
- New random colour dark theme (display tab)
- Ability to show source at root, e.g. library, playlist name, panel etc (display tab). Default off. Useful if you don't use a constant source
- Option to customise the name of 'Library Tree Panel Selection' playlist (panel properties: 'Playlist: Panel Selection'): it's used to save the contents of the 2nd panel between foobar2000 restarts.
- Hover effect: tree / album art: option to always use mouse pointer (no hand) (display tab)

### Fixed
- Album art: draw issue with dark overlay labels (compact/grid mode)
- Keystroke navigation irregularities
- No display sorting of albums starting with numbers
- plman.GetPlaylistLockedActions(playlistIndex) error when playlistIndex is invalid
- Lines sometimes overdrawing expanded [-] square icon
- Rare library update crash
- Wine stabilisation: library tree should no longer give errors in Wine, but some limitations remain:
    - copy & paste into search box may not work. It can be fixed by installing [this version of Spider Monkey Panel (v1.6.2-dev+7c0928bf)](https://github.com/Wil-B/Find-and-Play/files/8575143/foo_spider_monkey_panel.zip) which includes marc2k3's utils.GetClipboardText/utils.SetClipboardText (thx to marc2k3)
    - recycler is unlikely to work: it's used when refreshing images: windows explorer can be used to remove images from the cache instead
    - options dialog may not load: menu now indicates there was a problem & console explains what can be done instead
- Miscellaneous fixes

<br />

# v2.2.0
### Added
- Album art
- Playlist source
- Two panel mode (optional)
- Album art flow mode
- '¦' soft splitter that combines different fields into same branch level, e.g.
	`%album artist%¦%artist% or %<album artist>%¦%<artist>%`
- New options dialog

### Changed
- Send to new playlist now checks playlist lock status
- Smooth scroll: enhanced smoothness when using scrollbar
- Refactored code
