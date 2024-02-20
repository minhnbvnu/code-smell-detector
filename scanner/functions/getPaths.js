function getPaths(project, templateName, testapp) {
	var alloy = path.join(__dirname, '..', '..');
	var template = path.join(alloy, 'template');
	var projectTemplates = path.join(alloy, '..', 'templates');
	var templateReadme = path.join(projectTemplates, templateName, 'README.md');
	var customTemplateDir;
	var customAppDir;
	var readMeFile;

	if (fs.existsSync(templateName) && !testapp) {
		customTemplateDir = templateName;
		customAppDir = path.join(templateName, 'app');
		readMeFile = path.join(customTemplateDir, 'README');
	} else if (fs.existsSync(templateReadme)) {
		readMeFile = templateReadme;
	}

	var paths = {
		// alloy paths
		alloy: alloy,
		template: path.join(alloy, 'template'),
		readme: fs.existsSync(readMeFile) ? readMeFile : path.join(template, 'README'),
		appTemplate: (!testapp) ? customAppDir || path.join(projectTemplates, templateName, 'app') : path.join(sampleAppsDir, testapp),
		projectTemplate: (!testapp) ? customTemplateDir || path.join(projectTemplates, templateName) : path.join(sampleAppsDir, testapp),

		// project paths
		project: project,
		resources: path.join(project, 'Resources'),
		build: path.join(project, 'build')
	};

	// validate the existence of the paths
	_.each(paths, function(v, k) {
		if (!fs.existsSync(v)) {
			var errs = [BASE_ERR];
			switch (k) {
				case 'build':
					// skip
					return;
				case 'projectTemplate':
					var projError = (!testapp) ? 'Project template "' + templateName : 'Test app "' + testapp;
					errs.push(projError + '" not found at "' + v + '"');
					break;
				case 'appTemplate':
					var appError = (!testapp) ? 'Application template "' + v : 'Test app "' + testapp;
					errs.push(appError + '" not found');
					break;
				case 'project':
					errs.push('Project path not found at "' + v + '"');
					break;
				default:
					errs.push('"' + v + '" not found.');
					break;
			}
			U.die(errs);
		}
	});

	// Added after validation, since they won't exist yet
	_.extend(paths, {
		app: path.join(paths.project, 'app'),
		assets: path.join(paths.project, 'app', 'assets'),
		plugins: path.join(paths.project, 'plugins'),
		packageJson: path.join(paths.project, 'package.json'),
		eslintTemplate: path.join(paths.appTemplate, 'eslintrc_js'),
		eslintApp: path.join(paths.project, '.eslintrc.js'),
		appReadme: path.join(paths.project, 'README.md')
	});

	return paths;
}