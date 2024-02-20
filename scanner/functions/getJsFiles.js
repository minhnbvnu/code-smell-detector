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