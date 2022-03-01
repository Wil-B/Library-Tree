# v2.2.1

### Changed
- Album art index character(s) that show on scrollbar drag:
    - Number now user configurable (album art tab)
    - Option to show 4 digits if leading %date% detected in view pattern (album art tab)
- Improved horizontal flow mode metrics
- Custom nodes: default changed to clean + - (if updating, click reset page on advanced tab to replace previous style)
- Removed the ability to auto-update from old versions (v2.1.3 or earlier)

### Added
- Ability to show source at root, e.g. library, playlist name, panel etc (display tab). Default off. Useful if you don't use a constant source
- Option to customise the name of 'Library Tree Panel Selection' playlist (panel properties: 'Playlist: Panel Selection'): it's used to save the contents of the 2nd panel between foobar2000 restarts.

### Fixed
- Album art: draw issue with dark overlay labels (compact/grid mode)
- No display sorting of albums starting with numbers
- plman.GetPlaylistLockedActions(playlistIndex) error when playlistIndex is invalid
- Lines sometimes overdrawing expanded [-] square icon
- Rare library update crash
- Wine stabilisation: library tree should no longer give errors in Wine, but some limitations remain:
    - Copy & paste into search box using clipboard may not work. This may be fixed in due course through an update to Spider Monkey Panel
    - Recycler is unlikely to work: it's used when refreshing images: windows explorer can be used to remove images from the cache instead
    - Options dialog may not load: menu now indicates there was a problem & console explains what can be done instead

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
