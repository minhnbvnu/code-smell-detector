function initializePlugins(plugins, callback) {
		if (0 === plugins.length) {
			if (callback) {
				callback();
			}
			return;
		}
		var numToEnable = plugins.length;
		var onInit = function () {
			if (0 === --numToEnable && callback) {
				callback();
			}
		};
		var i;
		var ret;
		var plugin;
		for (i = 0; i < plugins.length; i++) {
			plugin = plugins[i];
			plugin.settings = plugin.settings || {};
			if (typeof plugin.settings.enabled === 'undefined') {
				plugin.settings.enabled = true;
			}
			if (plugin.settings.enabled && plugin.checkDependencies()) {
				ret = plugin.init();
				if (ret && typeof ret.done === 'function') {
					ret.done(onInit);
				} else {
					onInit();
				}
			} else {
				onInit();
			}
		}
	}