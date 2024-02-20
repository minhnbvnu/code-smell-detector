function getLoadConfig() {
		var scripts,
		    script,
		    plugins = Aloha.settings.plugins && Aloha.settings.plugins.load,
		    baseUrl = Aloha.settings.baseUrl,
		    pluginsAttr,
		    regexAlohaJs = /\/aloha.js(\?\S*)?$/,
            regexStripFilename = /\/[^\/]*\.js$/,
		    i;

		if (!plugins || !baseUrl) {
			scripts = document.getElementsByTagName('script');
			for (i = 0; i < scripts.length; i++) {
				script = scripts[i];
				pluginsAttr = script.getAttribute('data-aloha-plugins');
				if (null != pluginsAttr) {
					if (!plugins) {
						plugins = pluginsAttr;
					}
					if (!baseUrl) {
						baseUrl = script.src.replace(regexStripFilename, '');
					}
					break;
				}
				if (!baseUrl && regexAlohaJs.test(script.src)) {
					baseUrl = script.src.replace(regexAlohaJs, '');
				}
			}
		}

		if (typeof plugins === 'string' && plugins !== '') {
			plugins = plugins.replace(/\s+/g, '').split(',');
		}

		return {
			baseUrl: baseUrl,
			plugins: plugins || []
		};
	}