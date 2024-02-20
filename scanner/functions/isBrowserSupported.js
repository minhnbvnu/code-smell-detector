function isBrowserSupported() {
		var browser = Aloha.browser;
		var version = browser.version;
		return !(
			// Chrome 21
			(browser.chrome && parseFloat(version) < 21) ||
			// Safari 4
			(browser.webkit && !browser.chrome && parseFloat(version) < 532.5) ||
			// FF 3.5
			(browser.mozilla && parseFloat(version) < 1.9) ||
			// IE 7
			(browser.msie && version < 7) ||
			// Right now Opera needs some work
			(browser.opera && version < 11)
		);
	}