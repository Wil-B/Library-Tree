'use strict';

class PopUpBox {
	constructor() {
		this.getHtmlCode();
		this.ok = true;
	}

	// Methods

	config(cfg, ppt, cfgWindow, ok_callback) {
		utils.ShowHtmlDialog(0, this.configHtmlCode, {
			data: [cfg, ppt, cfgWindow, ok_callback],
			resizable: true
		});
	}

	confirm(msg_title, msg_content, btn_yes_label, btn_no_label, height_adjust, confirm_callback) {
		utils.ShowHtmlDialog(0, this.confirmHtmlCode, {
			data: [msg_title, msg_content, btn_yes_label, btn_no_label, height_adjust, confirm_callback]
		});
	}

	getHtmlCode() {
		let cssPath = `${my_utils.packagePath}/assets/html/`;
		if (this.getWindowsVersion() === '6.1') {
			cssPath += 'styles7.css';
		} else {
			cssPath += 'styles10.css';
		}
		this.configHtmlCode = my_utils.getAsset('\\html\\config.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
		this.messageHtmlCode = my_utils.getAsset('\\html\\messageBox.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
		this.confirmHtmlCode = my_utils.getAsset('\\html\\confirm.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
	}

	getWindowsVersion() {
		let version = '';
		try {
			version = (WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentMajorVersionNumber')).toString();
			version += '.';
			version += (WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentMinorVersionNumber')).toString();
			return version;
		} catch (e) {}
		try {
			version = WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion');
			return version;
		} catch (e) {}
		return '6.1';
	}

	message() {
		utils.ShowHtmlDialog(0, this.messageHtmlCode, {
			data: [this.window_ok_callback, $.scale],
		});
	}

	window_ok_callback(status, clicked) {
		if (clicked) ppt.panelSourceMsg = false;
	}
}