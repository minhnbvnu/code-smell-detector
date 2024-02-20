function Orphanage(projectDir, _platform, opts) {
	opts = opts || {};
	platform = _platform;
	titaniumFolder = platforms[platform].titaniumFolder;
	theme = opts.theme;
	adapters = opts.adapters || [];

	// gather directories to be used throughout Orphanage
	var resourcesDir = path.join(projectDir, CONST.RESOURCES_DIR);
	dirs = {
		app: path.join(projectDir, CONST.ALLOY_DIR),
		resources: path.join(projectDir, CONST.RESOURCES_DIR),
		runtime: path.join(resourcesDir, platforms[platform].titaniumFolder, CONST.ALLOY_RUNTIME_DIR)
	};

	// get widgets in use
	_.each(U.getWidgetDirectories(dirs.app) || [], function(wObj) {
		widgetsInUse[path.basename(wObj.dir)] = wObj.dir;
	});
}