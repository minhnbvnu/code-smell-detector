function processModels(dirs) {
	var models = [];
	var modelTemplateFile = path.join(alloyRoot, 'template', 'model.js');

	_.each(dirs, function(dirObj) {
		var modelDir = path.join(dirObj.dir, CONST.DIR.MODEL);
		if (!fs.existsSync(modelDir)) {
			return;
		}

		var migrationDir = path.join(dirObj.dir, CONST.DIR.MIGRATION);
		var manifest = dirObj.manifest;
		var isWidget = typeof manifest !== 'undefined' && manifest !== null;
		var pathPrefix = isWidget ? 'widgets/' + manifest.id + '/' : '';
		_.each(fs.readdirSync(modelDir), function(file) {
			if (!modelRegex.test(file)) {
				logger.warn('Non-model file "' + file + '" in ' + pathPrefix + 'models directory');
				return;
			}
			logger.info('[' + pathPrefix + 'models/' + file + '] model processing...');

			var fullpath = path.join(modelDir, file);
			var basename = path.basename(fullpath, '.' + CONST.FILE_EXT.MODEL);

			// generate model code based on model.js template and migrations
			var code = _.template(fs.readFileSync(modelTemplateFile, 'utf8'))({
				basename: basename,
				modelJs: fs.readFileSync(fullpath, 'utf8'),
				migrations: findModelMigrations(basename, migrationDir)
			});

			// write the model to the runtime file
			var casedBasename = U.properCase(basename);
			var modelRuntimeDir = path.join(compileConfig.dir.resources,
				titaniumFolder, 'alloy', 'models');
			if (isWidget) {
				modelRuntimeDir = path.join(compileConfig.dir.resources,
					titaniumFolder, 'alloy', 'widgets', manifest.id, 'models');
			}
			fs.mkdirpSync(modelRuntimeDir);
			fs.writeFileSync(path.join(modelRuntimeDir, casedBasename + '.js'), code);
			models.push(basename);
		});
	});

	return models;
}