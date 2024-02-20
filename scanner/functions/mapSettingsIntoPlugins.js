function mapSettingsIntoPlugins(plugins, settings) {
		var plugin;
		for (plugin in settings) {
			if (settings.hasOwnProperty(plugin) && plugins[plugin]) {
				plugins[plugin].settings = settings[plugin] || {};
			}
		}
	}