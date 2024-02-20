function getPluginLoadConfig(plugins) {
		var paths = {},
		    entryPoints = [],
		    names = [],
		    baseUrlByName = {},
		    map = {},
		    parts,
		    bundleName,
		    pluginName,
		    basePath = Aloha.settings.basePath || '',
		    bundlePath,
		    bundles = Aloha.settings.bundles || {},
		    i;
		for (i = 0; i < plugins.length; i++) {
			parts = plugins[i].split('/');
			bundleName = parts[0];
			pluginName = parts[1];
			if (bundles[bundleName]) {
				bundlePath = basePath + bundles[bundleName];
			} else {
				bundlePath = basePath + '../plugins/' + bundleName;
			}
			mergePluginPaths(paths, bundlePath, pluginName);
			baseUrlByName[pluginName] = bundlePath + '/' + pluginName;
			entryPoints.push(pluginName + '/' + pluginName + '-plugin');
			map[pluginName] = {'jquery': 'aloha/jquery'};
		}
		return {
			paths: paths,
			entryPoints: entryPoints,
			baseUrlByName: baseUrlByName,
			names: names,
			map: map
		};
	}