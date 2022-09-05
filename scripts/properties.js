'use strict';

class PanelProperty {
	constructor(name, default_value) {
		this.name = name;
		this.default_value = default_value;
		this.value = ppt.get(this.name, default_value);
	}

	// Methods

	get() {
		return this.value;
	}
	set(new_value) {
		if (this.value !== new_value) {
			ppt.set(this.name, new_value);
			this.value = new_value;
		}
	}
}

class PanelProperties {
	constructor() {
		// this.name_list = {}; debug
	}

	// Methods

	init(type, properties, thisArg) {
		switch (type) {
			case 'auto':
				properties.forEach(v => {
					// this.validate(v); debug
					this.add(v);
				});
				break;
			case 'manual':
				properties.forEach(v => thisArg[v[2]] = this.get(v[0], v[1]));
				break;
		}
	}

	validate(item) {
		if (!$.isArray(item) || item.length !== 3 || typeof item[2] !== 'string') {
			throw (`invalid property: requires array: [string, any, string]`);
		}

		if (item[2] === 'add') {
			throw (`property_id: ${item[2]}\nThis id is reserved`);
		}

		if (this[item[2]] != null || this[item[2] + '_internal'] != null) {
			throw (`property_id: ${item[2]}\nThis id is already occupied`);
		}

		if (this.name_list[item[0]] != null) {
			throw (`property_name: ${item[0]}\nThis name is already occupied`);
		}
	}

	add(item) {
		// this.name_list[item[0]] = 1; debug
		this[`${item[2]}_internal`] = new PanelProperty(item[0], item[1]);

		Object.defineProperty(this, item[2], {
			get() {
				return this[`${item[2]}_internal`].get();
			},
			set(new_value) {
				this[`${item[2]}_internal`].set(new_value);
			}
		});
	}

	get(name, default_value) {
		return window.GetProperty(name, default_value);
	} // initialisation

	set(name, new_value) {
		return window.SetProperty(name, new_value);
	}

	toggle(name) {
		this[name] = !this[name];
	}
}

let properties = [
	['- Show Html Dialog Unsupported-0 Supported-1 Autocheck-2', 2, 'isHtmlDialogSupported'],
	['Colour Swap', false, 'swapCol'],
	['Cover Auto-Fill', true, 'autoFill'],
	['Cover Opacity (0-100)', 10, 'covAlpha'],

	['Custom Colour Text', '171,171,190', 'text'],
	['Custom Colour Text Highlight', '121,194,255', 'text_h'],
	['Custom Colour Text Selected', '255,255,255', 'textSel'],
	['Custom Colour Text Nowplaying Highlight', 'rgb(121-194-255)', 'nowp'],
	['Custom Colour Search Text', '171,171,190', 'search'],
	['Custom Colour Buttons', '113,125,147', 'txt_box'],
	['Custom Colour Background', '4,39,68', 'bg'],
	['Custom Colour Background Accent', '18,52,85', 'bg_h'],
	['Custom Colour Background Selected', '37,71,108', 'bgSel'],
	['Custom Colour Frame Hover', '35,132,182', 'frame'],
	['Custom Colour Frame Selected', '49,145,198', 'bgSelframe'],
	['Custom Colour Item Counts', '171,171,190', 'counts'],
	['Custom Colour Node Collapse', '171,171,190', 'icon_c'],
	['Custom Colour Node Expand', '171,171,190', 'icon_e'],
	['Custom Colour Node Hover', '121,194,255', 'icon_h'],
	['Custom Colour Node Lines', '48,70,90', 'line'],
	['Custom Colour Separators', '48,71,90', 's_line'],
	['Custom Colour Side Marker', '121,194,255', 'sideMarker'],
	['Custom Colour Transparent Fill', '0,0,0,0.06', 'bgTrans'],

	['Custom Colour Text Use', false, 'textUse'],
	['Custom Colour Text Highlight Use', false, 'text_hUse'],
	['Custom Colour Text Selected Use', false, 'textSelUse'],
	['Custom Colour Text Nowplaying Highlight Use', false, 'nowpUse'],
	['Custom Colour Search Text Use', false, 'searchUse'],
	['Custom Colour Buttons Use', false, 'txt_boxUse'],
	['Custom Colour Background Use', false, 'bgUse'],
	['Custom Colour Background Accent Use', false, 'bg_hUse'],
	['Custom Colour Background Selected Use', false, 'bgSelUse'],
	['Custom Colour Frame Hover Use', false, 'frameUse'],
	['Custom Colour Frame Selected Use', false, 'bgSelframeUse'],
	['Custom Colour Item Counts Use', false, 'countsUse'],
	['Custom Colour Node Collapse Use', false, 'icon_cUse'],
	['Custom Colour Node Expand Use', false, 'icon_eUse'],
	['Custom Colour Node Hover Use', false, 'icon_hUse'],
	['Custom Colour Node Lines Use', false, 'lineUse'],
	['Custom Colour Separators Use', false, 's_lineUse'],
	['Custom Colour Side Marker Use', false, 'sideMarkerUse'],
	['Custom Colour Transparent Fill Use', false, 'bgTransUse'],

	['Custom Font', 'Segoe UI,16,0', 'custFont'],
	['Custom Font Album Art Line 1', 'Segoe UI,1', 'custAlbumArtGrpFont'],
	['Custom Font Album Art Line 2', 'Segoe UI Semibold,0', 'custAlbumArtLotFont'],
	['Custom Font Album Art Line 3', 'Segoe UI,0', 'custAlbumArtDurFont'],

	['Custom Font Use', false, 'custFontUse'],
	['Custom Font Album Art Line 1 Use', false, 'custAlbumArtGrpFontUse'],
	['Custom Font Album Art Line 2 Use', false, 'custAlbumArtLotFontUse'],
	['Custom Font Album Art Line 3 Use', false, 'custAlbumArtDurFontUse'],
	
	['Custom Font Node Icon', 'Segoe UI Symbol', 'custIconFont'],
	['Custom Font Scroll Icon', 'Segoe UI Symbol', 'butCustIconFont'],

	['Double-Click Action', 1, 'dblClickAction'],
	['Filter By', 0, 'filterBy'],
	['Font Size', 16, 'baseFontSize'],
	['Full Line Selection', true, 'fullLineSelection'],
	['Height', 578, 'pn_h'],
	['Height Auto [Expand/Collapse With Root]', false, 'pn_h_auto'],
	['Height Auto-Collapse', 100, 'pn_h_min'],
	['Height Auto-Expand', 578, 'pn_h_max'],
	['Highlight Nowplaying', false, 'highLightNowplaying'],
	['Highlight Row', 2, 'highLightRow'],
	['Highlight Frame Image', false, 'frameImage'],
	['Highlight Text', false, 'highLightText'],
	['Hot Key [Focus Not Needed]: 1-10 // Assign Spider Monkey Panel index in keyboard shortcuts', 'CollapseAll,0,PlaylistAdd,0,PlaylistInsert,0,PlaylistNew,0,Search,0,SearchClear,0', 'hotKeys'],

	['Image Blur Background Auto-Fill', false, 'blurAutofill'],
	['Image Blur Background Level (%)', 90, 'blurTemp'],
	['Image Blur Background Opacity (%)', 30, 'blurAlpha'],
	['Image Current Root', 17, 'curRootImg'],
	['Image Current No Artist', 2, 'curNoArtistImg'],
	['Image Current No Cover', 6, 'curNoCoverImg'],
	['Image Disk Cache Enabled', true, 'albumArtDiskCache'],
	['Image Group Level', 0, 'albumArtGrpLevel'],
	['Image Group Names', JSON.stringify({}), 'albumArtGrpNames'],
	['Image Flip Labels', false, 'albumArtFlipLabels'],
	['Image Flow Mode', false, 'albumArtFlowMode'],
	['Image Follow Selection Flow Mode', true, 'flowModeFollowSelection'],
	['Image Follow Selection Standard Mode', false, 'stndModeFollowSelection'],
	['Image Item Overlay', 1, 'itemOverlayType'],
	['Image Label', 1, 'albumArtLabelType'],
	['Image Memory Limit MB (0 = default)', 0, 'memoryLimit'],
	['Image No Artist Images', JSON.stringify([]), 'noArtistImages'],
	['Image No Cover Images', JSON.stringify([]), 'noCoverImages'],
	['Image Preload Images In Disk Cache', false, 'albumArtPreLoad'],
	['Image Root Images', JSON.stringify([]), 'rootImages'],
	['Image Show Album Art', false, 'albumArtShow'],
	['Image Show Index Letter', true, 'albumArtLetter'],
	['Image Show Options', true, 'albumArtOptionsShow'],
	['Image Style [Front] Regular-0 Auto-Fill-1 Circular-2', 1, 'imgStyleFront'],
	['Image Style [Back] Regular-0 Auto-Fill-1 Circular-2', 1, 'imgStyleBack'],
	['Image Style [Disc] Regular-0 Auto-Fill-1 Circular-2', 1, 'imgStyleDisc'],
	['Image Style [Icon] Regular-0 Auto-Fill-1 Circular-2', 1, 'imgStyleIcon'],
	['Image Style [Artist] Regular-0 Auto-Fill-1 Circular-2', 2, 'imgStyleArtist'],
	['Image Thumbnail Gap Standard', 0, 'thumbNailGapStnd'],
	['Image Thumbnail Gap Compact', 3, 'thumbNailGapCompact'],
	['Image Thumbnail Size', 2, 'thumbNailSize'],
	['Image Type', 0, 'artId'],
	['Image View By: Same As Tree', true, 'artTreeSameView'],

	['Initial Load Filters', true, 'initialLoadFilters'],
	['Initial Load Views', true, 'initialLoadViews'],
	['Key: Send to Playlist', 0, 'keyAction'],
	['Library Auto-Sync', true, 'libAutoSync'],
	['Library Sort Date Before Album', true, 'yearBeforeAlbum'],
	
	['Library Source', 1, 'libSource'],
	['Library Source: Active Playlist Follow Focus', true, 'followPlaylistFocus'],
	['Library Source: Fixed Playlist', false, 'fixedPlaylist'],
	['Library Source: Fixed Playlist Name', '', 'fixedPlaylistName'],


	['Limit Menu Expand: 10-6000', 500, 'treeExpandLimit'],
	['Limit Tree Auto Expand: 10-1000', 350, 'autoExpandLimit'],
	['Line Padding', 5, 'verticalPad'],
	['Line Padding Album Art', 2, 'verticalAlbumArtPad'],
	['Margin', Math.round(8 * $.scale), 'margin'],
	['Mouse: Always Pointer (no hand)', false, 'mousePointerOnly'],

	['Node: Auto Collapse', false, 'autoCollapse'],
	['Node: Highlight on Hover', true, 'highLightNode'],
	['Node: Item Counts Align Right', true, 'countsRight'],
	['Node: Item Counts Hide-0 Tracks-1 Sub-Items-2', 1, 'nodeCounts'],
	['Node: Item Show Duration', false, 'itemShowDuration'],
	['Node: Root Hide-0 All Music-1 View Name-2', 1, 'rootNode'],
	['Node: Root Inline Style', true, 'inlineRoot'],
	['Node: Root Show Source', false, 'showSource'],
	['Node: Show Lines', true, 'nodeLines'],
	['Node: Show Tracks', true, 'showTracks'],
	['Node: Style', 2, 'nodeStyle'],
	['Node [Squares]: Windows', false, 'winNode'],
	['Node Custom Icon: +|-', '\uE013|\uE015', 'iconCustom'],
	['Node Custom Icon: Vertical Offset (%)', -2, 'iconVerticalPad'],
	['Play on Enter or Send from Menu', false, 'autoPlay'],
	['Playlist: Add to Current [Alt+Click]', false, 'altAddToCur'],
	['Playlist: Add to Current [MiddleClick]', true, 'mbtnAddToCur'],
	['Playlist: Custom Sort', '', 'customSort'],
	['Playlist: Default', 'Library View', 'libPlaylist'],
	['Playlist: Default Activate on Change', true, 'activateOnChange'],
	['Playlist: Panel Selection', 'Library Tree Panel Selection', 'panelSelectionPlaylist'],
	['Playlist: Send to Current', false, 'sendToCur'],
	['Prefixes to Strip or Swap (| Separator)', 'A|The', 'prefix'],
	['Preset: Load Current View', true, 'presetLoadCurView'],
	['Remember.Proc', false, 'process'],
	['Remember.Tree', true, 'rememberTree'],
	['Remember.View', false, 'rememberView'],
	['Reset Tree', false, 'reset'],
	['Row Stripes', true, 'rowStripes'],

	['Scroll Step 0-10 (0 = Page)', 3, 'scrollStep'],
	['Scroll Smooth Duration 0-5000 msec (Max)', 500, 'durationScroll'],
	['Scroll Touch Flick Distance 0-10', 0.8, 'flickDistance'],
	['Scroll Touch Flick Duration 0-5000 msec (Max)', 3000, 'durationTouchFlick'],
	['Scroll: Smooth Scroll', true, 'smooth'],
	['Scrollbar Arrow Custom Icon', '\uE0A0', 'arrowSymbol'],
	['Scrollbar Arrow Custom Icon: Vertical Offset (%)', -24, 'sbarButPad'],
	['Scrollbar Arrow Width', Math.round(11 * $.scale), 'sbarArrowWidth'],
	['Scrollbar Button Type', 0, 'sbarButType'],
	['Scrollbar Colour Grey-0 Blend-1', 1, 'sbarCol'],
	['Scrollbar Grip MinHeight', Math.round(20 * $.scale), 'sbarGripHeight'],
	['Scrollbar Height Prefer Full', true, 'sbarFullHeight'],
	['Scrollbar Narrow Bar Width (0 = Auto)', 0, 'narrowSbarWidth'],
	['Scrollbar Padding', 0, 'sbarPad'],
	['Scrollbar Show', 1, 'sbarShow'],
	['Scrollbar Type Default-0 Styled-1 Windows-2', 1, 'sbarType'],
	['Scrollbar Width', Math.round(11 * $.scale), 'sbarWidth'],
	['Scrollbar Width Bar', 11, 'sbarBase_w'],
	['Scrollbar Windows Metrics', false, 'sbarWinMetrics'],

	['Search Enter', false, 'searchEnter'],
	['Search History', JSON.stringify([]), 'searchHistory'],
	['Search Send', 1, 'searchSend'],

	['Show Filter', true, 'filterShow'],
	['Show Panel Source Message', true, 'panelSourceMsg'],
	['Show Search', true, 'searchShow'],
	['Show Settings', true, 'settingsShow'],
	['Side Marker Width', 0, 'sideMarkerWidth'],
	['Single-Click Action', 1, 'clickAction'],
	['Theme', 0, 'theme'],
	['Touch Step 1-10', 1, 'touchStep'],
	['Tree Auto Expand', false, 'treeAutoExpand'],
	['Tree Auto Expand Single Items', false, 'treeAutoExpandSingle'],
	['Tree Indent', Math.round(19 * $.scale), 'treeIndent'],
	['Tree List View', false, 'treeListView'],
	['Touch Control', false, 'touchControl'],
	['View By', 1, 'viewBy'],
	['View By Album Art', 1, 'albumArtViewBy'],
	['View By Tree', 1, 'treeViewBy'],
	['Zoom Filter Size (%)', 100, 'zoomFilter'],
	['Zoom Font Size (%)', 100, 'zoomFont'],
	['Zoom Node Size (%)', 100, 'zoomNode'],
	['Zoom Image Size (%)', 100, 'zoomImg'],
	['Zoom Tooltip [Button] (%)', 100, 'zoomTooltipBut']
];

const ppt = new PanelProperties;
ppt.init('auto', properties);
ppt.set('Image Pre-Load Images In Disk Cache', null);
ppt.set('Image Root Collage', null);
ppt.set('Image Show Index Number', null);
ppt.set('Image Show Index Year Auto', null);
ppt.set('Node [Squares]: Windows 0 or 1', null);
properties = undefined;