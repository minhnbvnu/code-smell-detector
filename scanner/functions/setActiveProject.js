function setActiveProject(dirPath) {
	currentProject = {};
	process.chdir(dirPath);

	const pkgPath = pkgUp.sync();

	if (!pkgPath) {
		console.log('Couldn\'t find package.json');
		return;
	}

	const pkg = require(pkgPath);

	currentProject.path = dirPath;
	currentProject.name = pkg.name || path.basename(dirPath, path.extname(dirPath));

	getGulpTasks().then(tasks => {
		tasks = _.pull(tasks, 'default');
		tasks.unshift('default');

		currentProject.tasks = tasks;

		console.log(prevPath, dirPath);

		// TODO: this prevent updating of tasklist from changes in the gulpfile
		if (prevPath !== dirPath) {
			prevPath = dirPath;
			createTrayMenu();
		}
	}).catch(err => {
		if (err.code !== 'MODULE_NOT_FOUND') {
			console.error(err);
		}
	});
}