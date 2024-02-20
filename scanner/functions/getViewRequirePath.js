function getViewRequirePath(node) {
		var regex = new RegExp('\\.' + CONST.FILE_EXT.VIEW + '$'),
			src = node.getAttribute('src'),
			fullname = exports.getNodeFullname(node),
			name = node.getAttribute('name') || CONST.NAME_WIDGET_DEFAULT,
			type = fullname === 'Alloy.Widget' ? 'widget' : node.getAttribute('type') || CONST.REQUIRE_TYPE_DEFAULT,
			fullpaths = [];

		var platform;
		if (compilerConfig && compilerConfig.alloyConfig && compilerConfig.alloyConfig.platform) {
			platform = compilerConfig.alloyConfig.platform;
		}

		// Must be a view, with a valid src, in a <Require> element
		if (!src) {
			return null;
		} else if (fullname === 'Alloy.Require' && type === 'view') {
			if (platform) { fullpaths.push(path.join(compilerConfig.dir.views, platform, src)); }
			fullpaths.push(path.join(compilerConfig.dir.views, src));
		} else if (fullname === 'Alloy.Widget' ||
			(fullname === 'Alloy.Require' && type === 'widget')) {
			U.getWidgetDirectories(compilerConfig.dir.home).forEach(function(wDir) {
				if (wDir.manifest.id === src) {
					if (platform) {
						fullpaths.push(path.join(wDir.dir, CONST.DIR.VIEW, platform, name));
					}
					fullpaths.push(path.join(wDir.dir, CONST.DIR.VIEW, name));
				}
			});
		} else {
			return null;
		}

		// check the extensions on the paths to check
		var found = false;
		var fullpath;
		for (var i = 0; i < fullpaths.length; i++) {
			fullpath = fullpaths[i];
			fullpath += regex.test(fullpath) ? '' :  '.' + CONST.FILE_EXT.VIEW;
			if (fs.existsSync(fullpath)) {
				found = true;
				break;
			}
		}

		// abort if there's no view to be found
		if (!found) {
			U.die([
				type + ' "' + src + '" ' + (type === 'widget' ? 'view "' + name + '" ' : '') +
					'does not exist.',
				'The following paths were inspected:'
			].concat(fullpaths));
		}

		return fullpath;
	}