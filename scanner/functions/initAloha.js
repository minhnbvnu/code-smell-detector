function initAloha(event, next) {
		if (!isBrowserSupported()) {
			var console = window.console;
			if (console) {
				var fn = console.error ? 'error' : console.log ? 'log' : null;
				if (fn) {
					console[fn]('This browser is not supported');
				}
			}
			return;
		}

		// Because different css is to be applied based on what the user-agent
		// supports.  For example: outlines do not render in IE7.
		if (Aloha.browser.webkit) {
			$('html').addClass('aloha-webkit');
		} else if (Aloha.browser.opera) {
			$('html').addClass('aloha-opera');
		} else if (Aloha.browser.msie) {
			$('html').addClass('aloha-ie' + parseInt(Aloha.browser.version, 10));
		} else if (Aloha.browser.mozilla) {
			$('html').addClass('aloha-mozilla');
		}

		if (navigator.appVersion.indexOf('Win') !== -1) {
			Aloha.OSName = 'Win';
		} else if (navigator.appVersion.indexOf('Mac') !== -1) {
			Aloha.OSName = 'Mac';
		} else if (navigator.appVersion.indexOf('X11') !== -1) {
			Aloha.OSName = 'Unix';
		} else if (navigator.appVersion.indexOf('Linux') !== -1) {
			Aloha.OSName = 'Linux';
		}

		// Fix inconsistent browser behavior in Internet Explorer:
		// per default the Internet Explorer's own feature AutoUrlDetect is turned on.
		// When this feature is active the "editor will automatically create a hyperlink
		// for any text that is formatted as a URL."
		// https://msdn.microsoft.com/en-us/library/aa769893(v=vs.85).aspx
		// http://blogs.msdn.com/b/ieinternals/archive/2010/09/15/ie9-beta-minor-change-list.aspx
		//
		// Since this behavior is different to all other browsers we will
		// turn this feature off in Internet Explorer >= 9 (turning it off is supported
		// starting from IE9)
		if (Aloha.browser.msie && parseFloat(Aloha.browser.version) >= 9.0 && typeof document.execCommand === 'function') {
			document.execCommand('AutoUrlDetect', false, false);
		}

		registerEvents();
		Aloha.settings.base = Aloha.getAlohaUrl();
		Aloha.Log.init();

		// Initialize error handler for general javascript errors.
		if (Aloha.settings.errorhandling) {
			window.onerror = function (msg, url, line) {
				Aloha.Log.error(Aloha, 'Error message: ' + msg + '\nURL: ' +
				                       url + '\nLine Number: ' + line);
				return true;
			};
		}

		event();
		next();
	}