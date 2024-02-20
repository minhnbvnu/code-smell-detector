function getChecks(file, fullpath, opts) {
	opts = opts || {};
	var isDir = fs.statSync(fullpath).isDirectory();
	var checks = [];

	// Check all the app folder file types
	if (opts.types) {
		_.each(opts.types, function(type) {
			var dir = CONST.DIR[type];

			// use type-specific extension if it's not a directory
			if (!isDir) {
				file = extension(file, CONST.FILE_EXT[type]);
			}

			// use widget path, if it's a widget
			if (opts.widgetId) {
				dir = path.join(CONST.DIR.WIDGET, opts.widgetId, dir);
			}

			// create the file checks
			checks.push(
				path.join(dirs.app, dir, file),
				path.join(dirs.app, dir, platform, file)
			);
		});

	// use explicit full location paths
	} else if (opts.locations) {
		// strip off the platform if present
		var parts = file.split(/[\\\/]/);
		if (parts[0] === titaniumFolder) {
			parts.shift();
		}
		file = parts.join('/');

		// Is it a widget file?
		var keys = _.keys(widgetsInUse);
		for (var i = 0; i < keys.length; i++) {
			var widgetId = keys[i];

			// did we find the widget root path?
			if (parts.length === 1 && parts[0] === widgetId) {
				return null;
			}

			// is this a widget asset?
			if (_.includes(parts, widgetId)) {
				file = _.without(parts, widgetId).join('/');
				break;
			}
		}

		// No widget? Just use the given locations.
		_.each(opts.locations, function(loc) {
			checks.push(path.join(loc, file));
		});
	}

	return checks;
}