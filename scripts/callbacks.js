'use strict';

function on_colours_changed(keepCache) {
	ui.getColours();

	if (panel.colMarker) {
		panel.getFields(ppt.viewBy, ppt.filterBy);
		if (lib) {
			lib.getLibrary();
			lib.rootNodes(true, true);
		}
	}
	sbar.setCol();
	pop.createImages();
	but.createImages();
	if (!keepCache) img.clearCache();
	img.createImages();
	but.refresh(true);
	sbar.resetAuto();
	ui.createImages();
	if (!ppt.themed) ui.blurReset();
	window.Repaint();
}

function on_font_changed() {
	sbar.logScroll();
	pop.deactivateTooltip();
	ui.getFont();
	panel.on_size(true);
	if (ui.style.topBarShow || ppt.sbarShow) but.refresh(true);
	sbar.resetAuto();
	window.Repaint();
	sbar.setScroll();
}

function on_char(code) {
	pop.on_char(code);
	find.on_char(code);
	if (!ppt.searchShow) return;
	search.on_char(code);
}

function on_focus(is_focused) {
	if (!is_focused) {
		timer.clear(timer.cursor);
		panel.search.cursor = false;
		panel.searchPaint();
	}
	pop.on_focus(is_focused);
}

function on_get_album_art_done(handle, art_id, image, image_path) {
	ui.on_get_album_art_done(handle, image, image_path);
}

function on_item_focus_change(playlistIndex) {
	lib.checkFilter();
	if (!pop.setFocus) {
		if (ppt.followPlaylistFocus && playlistIndex == $.pl_active && !ppt.libSource) {
			setSelection(fb.GetFocusItem());
		}
	} else pop.setFocus = false;
	ui.focus_changed();
}

function on_key_down(vkey) {
	pop.on_key_down(vkey);
	img.on_key_down(vkey);
	if (!ppt.searchShow) return;
	search.on_key_down(vkey);
}

function on_key_up(vkey) {
	img.on_key_up(vkey);
	if (!ppt.searchShow) return;
	search.on_key_up(vkey)
}

function on_library_items_added(handleList) {
	if (ppt.libSource == 2) return;
	if (lib.v2_init) {
		lib.v2_init = false;
		if (ui.w < 1 || !window.IsVisible) return;
		lib.initialise(handleList);
		return;
	}
	if (!ppt.libAutoSync || ppt.fixedPlaylist || !ppt.libSource) return;
	lib.treeState(false, 2, handleList, 0);
}

function on_library_items_removed(handleList) {
	if (!ppt.libAutoSync || ppt.fixedPlaylist || !ppt.libSource) return;
	if (ppt.libSource == 2) {
		const libList = lib.list.Clone();
		libList.Sort();
		handleList.Sort();
		handleList.MakeIntersection(libList);
	}
	lib.treeState(false, 2, handleList, 2);
}

function on_library_items_changed(handleList) {
	if (!ppt.libAutoSync || ppt.fixedPlaylist || !ppt.libSource) return;
	if (ppt.libSource == 2) {
		const libList = lib.list.Clone();
		libList.Sort();
		handleList.Sort();
		handleList.MakeIntersection(libList);
	}
	lib.treeState(false, 2, handleList, 1);
}

function on_main_menu(index) {
	pop.on_main_menu(index);
}

function on_metadb_changed(handleList, isDatabase) {
	if (isDatabase && !panel.statistics || lib.list.Count != lib.libNode.length) return;
	if (ppt.fixedPlaylist || !ppt.libSource) {	
		handleList.Convert().some(h => {
			const i = lib.full_list.Find(h);
			if (i != -1) {
				const isMainChanged = lib.isMainChanged(handleList);
				if (isMainChanged) lib.treeState(false, 2);
				ui.focus_changed();
				return true;
			}
		});
	}
}

function on_mouse_lbtn_dblclk(x, y) {
	but.lbtn_dn(x, y);
	if (ppt.searchShow) search.lbtn_dblclk(x, y);
	pop.lbtn_dblclk(x, y);
	sbar.lbtn_dblclk(x, y);
}

function on_mouse_lbtn_down(x, y) {
	if (ppt.touchControl) panel.last_pressed_coord = {
		x: x,
		y: y
	};
	if (ui.style.topBarShow || ppt.sbarShow) but.lbtn_dn(x, y);
	if (ppt.searchShow) search.lbtn_dn(x, y);
	pop.lbtn_dn(x, y);
	sbar.lbtn_dn(x, y);
	ui.sz.y_start = y;
}

function on_mouse_lbtn_up(x, y) {
	pop.lbtn_up(x, y);
	if (ppt.searchShow) search.lbtn_up();
	but.lbtn_up(x, y);
	sbar.lbtn_up();
}

function on_mouse_leave() {
	if (ui.style.topBarShow || ppt.sbarShow) but.leave();
	sbar.leave();
	pop.leave();
}

function on_mouse_mbtn_dblclk(x, y, mask) {
	pop.mbtnDblClickOrAltDblClick(x, y, mask, 'mbtn');
}

function on_mouse_mbtn_down(x, y) {
	pop.mbtn_dn(x, y);
}

function on_mouse_mbtn_up(x, y, mask) {
	// hacks at default settings blocks on_mouse_mbtn_up, at least in windows; workaround configure hacks: main window > move with > caption only & ensure pseudo-caption doesn't overlap buttons
	pop.mbtnUpOrAltClickUp(x, y, mask, 'mbtn');
}

function on_mouse_move(x, y) {
	if (panel.m.x == x && panel.m.y == y) return;
	pop.hand = false;
	if (ui.style.topBarShow || ppt.sbarShow) but.move(x, y);
	if (ppt.searchShow) search.move(x, y);
	pop.move(x, y);
	pop.dragDrop(x, y);
	sbar.move(x, y);
	ui.zoomDrag(x, y);
	panel.m.x = x;
	panel.m.y = y;
}

function on_mouse_rbtn_up(x, y) {
	if (y < panel.search.h && x > panel.search.x && x < panel.search.x + panel.search.w) {
		if (ppt.searchShow) search.rbtn_up(x, y);
	} else men.rbtn_up(x, y);
	return true;
}

function on_mouse_wheel(step) {
	pop.deactivateTooltip();
	if (!vk.k('zoom')) sbar.wheel(step);
	else ui.wheel(step);
}

function on_notify_data(name, info) {
	if (ppt.libSource == 2 && name != 'bio_imgChange') {
		const panelSelectionPlaylists = ppt.panelSelectionPlaylist.split(/\s*\|\s*/);
		panelSelectionPlaylists.some(v=> {
			if (name == v) {
				lib.list = new FbMetadbHandleList(info);
				if ($.equalHandles(lib.list.Convert(), lib.full_list.Convert())) return;
				lib.full_list = lib.list.Clone();
				ppt.lastPanelSelectionPlaylist = `${v} Cache`;
				const pln = plman.FindOrCreatePlaylist(`${v} Cache`, false);
				plman.ClearPlaylist(pln);
				plman.InsertPlaylistItems(pln, 0, lib.list);
				lib.searchCache = {};
				pop.clearTree();
				pop.cache = {
					'standard': {},
					'search': {},
					'filter': {}
				}
				lib.treeState(false, 2, null, 3);
				ui.expandHandle = lib.list.Count ? lib.list[0] : null;
				ui.on_playback_new_track();
				lib.treeState(false, ppt.rememberTree);
				return;		
			}
		});
	}

	switch (name) {
		case '!!.tags update':
			lib.treeState(false, 2);
			break;
		case 'newThemeColours':
			if (!ppt.themed) break;
			ppt.theme = info.theme;
			ppt.themeBgImage = info.themeBgImage;
			ppt.themeColour = info.themeColour;
			on_colours_changed(true);
			break;	
		case 'Sync col': {
			if (!ppt.themed) break;
			const themeLight = ppt.themeLight;
			if (themeLight != info.themeLight) {
				ppt.themeLight = info.themeLight;
				on_colours_changed(true);
			}
			break;
		}
		case 'Sync image':
			if (!ppt.themed) break;
			sync.image(new GdiBitmap(info.image), info.id);
			break;
	}
	if (ui.id.local && name.startsWith('opt_')) {
		const clone = typeof info === 'string' ? String(info) : info;
		on_notify(name, clone);
	}
}

function on_paint(gr) {
	if (!lib.initialised) {
		lib.initialise();
	}
	ui.draw(gr);
	lib.checkTree();
	img.draw(gr);
	ui.drawLine(gr);
	search.draw(gr);
	pop.draw(gr);
	sbar.draw(gr);
	but.draw(gr);
	find.draw(gr);
}

function on_playback_new_track(handle) {
	lib.checkFilter();
	pop.getNowplaying(handle);
	if (!ppt.recItemImage || ppt.libSource != 2) ui.on_playback_new_track(handle);
}

function on_playback_stop(reason) {
	if (reason == 2) return;
	pop.getNowplaying('', true);
	on_item_focus_change();
}

function on_playback_queue_changed() {
	on_queue_changed();
}

function on_playlists_changed() {
	men.playlists_changed();
	if ($.pl_active != plman.ActivePlaylist) $.pl_active = plman.ActivePlaylist;
	let fixedPlaylistIndex = -1;
	if (ppt.fixedPlaylist) {
		fixedPlaylistIndex = plman.FindPlaylist(ppt.fixedPlaylistName);
		if (fixedPlaylistIndex == -1) {
			ppt.fixedPlaylist = false;
			ppt.libSource = 0;
			if (panel.imgView) img.clearCache();
			lib.playlist_update();
		}
	}
}

function on_playlist_items_added(playlistIndex) {
	if (ppt.fixedPlaylist) {
		const fixedPlaylistIndex = plman.FindPlaylist(ppt.fixedPlaylistName);
		if (playlistIndex == fixedPlaylistIndex) {
			lib.playlist_update(playlistIndex);
			return
		}
	}
	if (!ppt.libSource && playlistIndex == $.pl_active) {
		lib.playlist_update(playlistIndex);

	}
}

function on_playlist_items_removed(playlistIndex) {
	if (ppt.fixedPlaylist) {
		const fixedPlaylistIndex = plman.FindPlaylist(ppt.fixedPlaylistName);
		if (playlistIndex == fixedPlaylistIndex) {
			lib.playlist_update(playlistIndex);
			return
		}
	}

	if (!ppt.libSource && playlistIndex == $.pl_active) {
		lib.playlist_update(playlistIndex);
	}
}

function on_playlist_items_reordered(playlistIndex) {
	if (!ppt.libSource && playlistIndex == $.pl_active) {
		lib.playlist_update(playlistIndex);
	}
}

function on_playlist_switch() {
	$.pl_active = plman.ActivePlaylist;
	if (!ppt.libSource) {
		lib.playlist_update();
	}
	ui.focus_changed();
}

const on_queue_changed = $.debounce(() => {
	if (ppt.itemShowStatistics != 7) return;
	pop.tree.forEach(v => {
		v.id = '';
		v.count = '';
		delete v.statistics;
		delete v._statistics;
	});
	pop.cache = {
		'standard': {},
		'search': {},
		'filter': {}
	}
	panel.treePaint();
	}, 250, {
	leading:  true,
	trailing: true
});

function on_script_unload() {
	but.on_script_unload();
	pop.deactivateTooltip();
}

function on_selection_changed() {
	if (!panel.setSelection()) return;
	setSelection(fb.GetSelection());
}

const windowMetricsPath = `${fb.ProfilePath}settings\\themed\\windowMetrics.json`;
function on_size() {
	ui.w = window.Width;
	ui.h = window.Height;
	if (!ui.w || !ui.h) return;

	pop.deactivateTooltip();
	tooltip.SetMaxWidth(Math.max(ui.w, 800));
	ui.blurReset();
	ui.calcText(true)

	if (ppt.themed && ppt.theme) {
		const themed_image = `${fb.ProfilePath}settings\\themed\\themed_image.bmp`;	
		if ($.file(themed_image)) sync.image(gdi.Image(themed_image));
	}

	panel.on_size();
	if (ui.style.topBarShow || ppt.sbarShow) but.refresh(true);
	sbar.resetAuto();
	find.on_size();

	if (!ppt.themed) return;
	const windowMetrics = $.jsonParse(windowMetricsPath, {}, 'file');
	windowMetrics[window.Name] = {
		w: ui.w,
		h: ui.h
	}
	$.save(windowMetricsPath, JSON.stringify(windowMetrics, null, 3), true);
}

function setSelection(handle) {
	if (!handle || !panel.list.Count) return;
	const item = panel.list.Find(handle);
	let idx = -1;
	pop.tree.forEach((v, i) => {
		if (!v.root && pop.inRange(item, v.item)) idx = i;
	});
	if (idx != -1) {
		if (!panel.imgView) pop.focusShow(idx);
		else pop.showItem(idx, 'focus');
	}
}