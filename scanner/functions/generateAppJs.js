function generateAppJs(paths, compileConfig, restrictionPath, compilerMakeFile) {
	var alloyJs = path.join(paths.app, 'alloy.js');

	if (restrictionPath !== null && !_.includes(restrictionPath, path.join(paths.app, 'alloy.js')) ) {
		// skip alloy.js processing when filtering on another file
		return;
	}

	// info needed to generate app.js
	var target = {
			filename: path.join('Resources', titaniumFolder, 'app.js'),
			filepath: path.join(paths.resources, titaniumFolder, 'app.js'),
			template: path.join(alloyRoot, 'template', 'app.js')
		},

		// additional data used for source mapping
		data = {
			'__MAPMARKER_ALLOY_JS__': {
				filename: 'app' + path.sep + 'alloy.js',
				filepath: alloyJs
			}
		},

		// hash used to determine if we need to rebuild
		hash = U.createHash(alloyJs);

	// is it already generated from a prior compile?
	buildLog.data[buildPlatform] || (buildLog.data[buildPlatform] = {});
	if (!compileConfig.buildLog.data.deploytypeChanged && fs.existsSync(target.filepath) && buildLog.data[buildPlatform][alloyJs] === hash) {
		logger.info('[app.js] using cached app.js...');
		restrictionSkipOptimize = (restrictionPath !== null);

	// if not, generate the platform-specific app.js and save its hash
	} else {
		logger.info('[app.js] Titanium entry point processing...');

		// trigger our custom compiler makefile
		if (compilerMakeFile.isActive) {
			compilerMakeFile.trigger('compile:app.js', _.clone(compileConfig));
		}

		sourceMapper.generateCodeAndSourceMap({
			target: target,
			data: data,
		}, compileConfig);
		fileRestrictionUpdatedFiles.push(path.relative('Resources', target.filename));
		buildLog.data[buildPlatform][alloyJs] = hash;
	}

	buildLog.data[buildPlatform]['theme'] = theme;
	logger.info('');
}