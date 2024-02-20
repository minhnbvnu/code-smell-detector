function extractStrings() {
	try {
		var sourceDir = paths.app;
		var files = walkSync(sourceDir);
		var styleSuffix = '.' + CONST.FILE_EXT.STYLE;
		var controllerSuffix = '.' + CONST.FILE_EXT.CONTROLLER;
		var viewSuffix = '.' + CONST.FILE_EXT.VIEW;

		// filter only js, xml and style files
		files = _.filter(files, function(f) {
			f = path.normalize(f);
			return f.substr(-styleSuffix.length) === styleSuffix ||
				f.substr(-viewSuffix.length) === viewSuffix ||
				f.substr(-controllerSuffix.length) === controllerSuffix;
		});

		var strings = [];
		_.each(files, function(f) {
			var file = path.join(sourceDir, f);
			var fileContent = fs.readFileSync(file, 'utf8');
			var calls = fileContent.match(searchRegex);

			if (calls && calls.length > 0) {
				logger.debug(file + ': ' + calls.length + ' strings found.');

				_.each(calls, function(call) {
					var matches = call.match(valueRegex);
					strings.push(matches[1]);
				});
			}
		});

		strings = _.uniq(strings);
		logger.info('Found ' + strings.length + ' unique i18n strings in code. Checking against current i18n file...');
		return strings;
	} catch (e) {
		return [];
	}
}