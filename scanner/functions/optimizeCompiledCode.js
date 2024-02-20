function optimizeCompiledCode(alloyConfig, paths) {
	var lastFiles = [],
		files;

	// Get the list of JS files from the Resources directory
	// and exclude files that don't need to be optimized, or
	// have already been optimized.
	function getJsFiles() {
		if (alloyConfig.file && (fileRestrictionUpdatedFiles.length > 0)) {
			logger.info('Restricting optimize on file(s) : ' + fileRestrictionUpdatedFiles.join(', '));
			return fileRestrictionUpdatedFiles;
		}

		var exceptions = [
			'app.js',
			'alloy/CFG.js',
			'alloy/controllers/',
			'alloy/styles/',
			'alloy/backbone.js',
			'alloy/constants.js',
			'alloy/underscore.js',
			'alloy/widget.js'
		].concat(compileConfig.optimizingExceptions || []);

		// widget controllers are already optimized. It should be listed in exceptions.
		_.each(compileConfig.dependencies, function (version, widgetName) {
			exceptions.push('alloy/widgets/' + widgetName + '/controllers/');
		});

		_.each(exceptions.slice(0), function(ex) {
			exceptions.push(`${titaniumFolder}/${ex}`);
		});

		var excludePatterns = otherPlatforms.concat(['.+node_modules']);
		var rx = new RegExp('^(?!' + excludePatterns.join('|') + ').+\\.js$');
		return _.filter(walkSync(compileConfig.dir.resources), function(f) {
			return rx.test(f) && !_.find(exceptions, function(e) {
				return f.indexOf(e) === 0;
			}) && !fs.statSync(path.join(compileConfig.dir.resources, f)).isDirectory();
		});
	}

	while ((files = _.difference(getJsFiles(), lastFiles)).length > 0) {
		_.each(files, function(file) {
			var options = _.extend(_.clone(sourceMapper.OPTIONS_OUTPUT), {
					plugins: [
						[require('./ast/builtins-plugin'), compileConfig],
						[require('./ast/optimizer-plugin'), compileConfig.alloyConfig],
					]
				}),
				fullpath = path.join(compileConfig.dir.resources, file);

			logger.info('- ' + file);
			try {
				var result = babel.transformFileSync(fullpath, options);
				fs.writeFileSync(fullpath, result.code);
			} catch (e) {
				U.die('Error transforming JS file', e);
			}
		});
		lastFiles = _.union(lastFiles, files);
	}
}