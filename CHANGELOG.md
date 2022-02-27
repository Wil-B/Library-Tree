# v2.2.1

### Changed
- album art view: number of index character(s) that appear on dragging scrollbar is now user configurable (options > album art tab)
	- option to auto-detect leading %date% in view pattern and show 4 digits
- custom node default: changed to clean + - (new installs - if updating, reset page on advaced tab is required for them to be available)
- improved horizontal flow mode metrics
- removed the ability to auto-update from old versions (v2.1.3 or earlier)

### Added
- ability to show source (library, playlist name, panel etc): options\display tab\root. Default off. Useful if you don't use a constant source
- option to customise the name of 'Library Tree Panel Selection' playlist (panel properties: 'Playlist: Panel Selection'): it's used to save the contents of the 2nd panel between foobar2000 restarts.

### Fixed
- album art: draw issue with dark overlay labels (compact/grid mode)
- no display sorting of albums starting with numbers
- plman.GetPlaylistLockedActions(playlistIndex) error when playlistIndex is invalid
- lines sometimes overdrawing expanded [-] square icon
- rare library update crash
- Wine stabilisation: biography should no longer give errors in Wine, but some limitations remain:
    - copy & paste into search box using clipboard may not work. This may be fixed in due course through an update to Spider Monkey Panel.
    - recycler is unlikely to work: it's used when refreshing images: windows explorer can be used to remove images from the cache instead
    - options dialog doesn't load: menu now indicates there was a problem & console explains what to do instead

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
