function loadMomentLanguages(config) {
	// retrieve the languages of the project
	var i18nPath = path.join(config.dir.project, 'i18n');
	if (fs.existsSync(i18nPath)) {
		var languages = _.filter(fs.readdirSync(i18nPath), function(file) {
			return fs.statSync(path.join(i18nPath, file)).isDirectory();
		});

		// filter the momentjs translation files that match one of these languages
		var availableI18nPath = path.join(BUILTINS_PATH, 'moment', 'lang');
		var fileNames = _.filter(fs.readdirSync(availableI18nPath), function(file) {
			return _.indexOf(languages, file.substr(0, 2)) !== -1;
		});

		// import these files
		_.each(fileNames, function(file) {
			var source = path.join(BUILTINS_PATH, 'moment', 'lang', file);
			var dest = path.join(config.dir.resources, 'alloy', 'moment', 'lang', file);
			loadBuiltin(source, file, dest);
		});
	}
}