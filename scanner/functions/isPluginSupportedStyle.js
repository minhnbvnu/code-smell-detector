function isPluginSupportedStyle(style) {
		if(PLUGIN_SUPPORTED_STYLES.hasOwnProperty(style)) {
			return PLUGIN_SUPPORTED_STYLES[style];
		}
		return false;
	}