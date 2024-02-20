function initPluginManager(event, next) {
		// Because if there are no loadedPlugins specified, then the default is
		// to initialized all available plugins.
		if (0 === Aloha.loadedPlugins.length) {
			var plugins = PluginManager.plugins;
			var plugin;
			for (plugin in plugins) {
				if (plugins.hasOwnProperty(plugin)) {
					Aloha.loadedPlugins.push(plugin);
				}
			}
		}

		var fired = false;

		PluginManager.init(function () {
			if (!fired) {
				event();
				fired = true;
			}
			next();
		}, Aloha.loadedPlugins);

		if (!fired) {
			event();
			fired = true;
		}
	}