function findWidgetAsNodeModule(id) {
		var wFile;
		try {
			wFile = resolve.sync(path.join(CONST.NPM_WIDGET_PREFIX + id, 'widget'), { basedir: path.join(appDir, '..'), extensions: [ '.json' ], paths: paths() });
		} catch (err) {
			return;
		}

		var collection = parseManifestAsCollection(wFile);
		if (collection.manifest.id !== id) {
			return logger.warn('Expected "' + wFile + '" to have id "' + id + '" instead of "' + collection.manifest.id + '"');
		}

		var pFile = path.join(path.dirname(wFile), 'package.json');
		var pkg;
		try {
			pkg = jsonlint.parse(fs.readFileSync(pFile, 'utf8'));
		} catch (e) {
			exports.die('Error parsing "' + pFile + '"', e);
		}

		var missingKeywords = _.difference(CONST.NPM_WIDGET_KEYWORDS, pkg.keywords || []);
		if (missingKeywords.length > 0) {
			return logger.warn('Expected "' + pFile + '" to have missing keywords "' + missingKeywords.join('", "') + '"');
		}

		return collection;
	}