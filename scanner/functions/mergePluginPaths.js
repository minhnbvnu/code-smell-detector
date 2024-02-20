function mergePluginPaths(paths, bundlePath, pluginName) {
		var resourceFolders = ['nls', 'css', 'vendor', 'res'],
		    resourceFolder,
		    i;
		paths[pluginName] = bundlePath + '/' + pluginName + '/lib';
		for (i = 0; i < resourceFolders.length; i++) {
			var resourceFolder = resourceFolders[i];
			paths[pluginName + '/' + resourceFolder]
				= bundlePath + '/' + pluginName + '/' + resourceFolder;
		}
	}