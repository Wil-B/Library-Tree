'use strict';

function getSoFeatures() {
	const soFeat = {gecko: true, clipboard: true, dpi: true, recycle: true, gdiplus: true, segoe: true}
	const WshShell = new ActiveXObject('WScript.Shell');
	const app = new ActiveXObject('Shell.Application');
	let doc;
	// Internals
	try {doc = new ActiveXObject('htmlfile');} catch (e) {soFeat.gecko = false;}
	if (typeof doc !== 'undefined' && soFeat.gecko) {
		let clText = 'test', cache = null;
		try {
			cache = doc.parentWindow.clipboardData.getData('Text'); 
			doc.parentWindow.clipboardData.setData('Text', clText); 
			clText = doc.parentWindow.clipboardData.getData('Text');
			if (cache !== null) {doc.parentWindow.clipboardData.setData('Text', cache);} // Just in case previous clipboard data is needed
		} catch (e) {soFeat.clipboard = false;}
		if (clText !== 'test') {soFeat.clipboard = false;}
	} else {soFeat.clipboard = false;}
	// File system
	if (typeof app !== 'undefined') {
		try {app.NameSpace(10).MoveHere(null);} catch (e) {
			try {app.NameSpace(0).ParseName(null).InvokeVerb('delete');} catch (e) {soFeat.recycle = false;}
		}
	} else {soFeat.recycle = false;}
	// UI
	if (typeof WshShell !== 'undefined') {
		try {WshShell.RegRead('HKCU\\Control Panel\\Desktop\\WindowMetrics\\AppliedDPI');} catch (e) {soFeat.dpi = false;}
	} else {soFeat.dpi = false;}
	if (!utils.CheckFont('Arial')) {
		soFeat.gdiplus = false;
	}
	if (!utils.CheckFont('Segoe UI')) {
		soFeat.segoe = false;
	}
	return soFeat;
}

const soFeatures = getSoFeatures();