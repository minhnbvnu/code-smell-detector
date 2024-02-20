function isPluginActivatedByName(config) {
		return $.type(config) === 'array' && $.inArray(pluginName, config) !== -1;
	}