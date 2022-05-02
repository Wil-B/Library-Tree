# v2.2.1

### Changed
- Album art index character(s) that show on scrollbar drag:
    - Number now user configurable: no limit, e.g. can be single letter up to full name (album art tab)
    - Option to show 4 digits if leading %date% detected in view pattern (album art tab)
- Improved horizontal flow mode metrics
- Removed the ability to auto-update from old versions (v2.1.3 or earlier)

### Added
- Quicksetup: new clean preset with alternative selection model and new node style
	- info: alternative selection model is automatically used if selection\full line is enabled (behaviour tab) & hover effect (background) is set to none (display tab). It works best with highlight text on hover enabled (display tab)
- New random colour dark theme
- Ability to show source at root, e.g. library, playlist name, panel etc (display tab). Default off. Useful if you don't use a constant source
- Option to customise the name of 'Library Tree Panel Selection' playlist (panel properties: 'Playlist: Panel Selection'): it's used to save the contents of the 2nd panel between foobar2000 restarts.
- hover effect: tree / album art: option to always use mouse pointer (no hand)

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
