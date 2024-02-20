function BuildLog(_projectPath) {
	// make/reference singleton instance
	if (BuildLog.instance) {
		return BuildLog.instance;
	}
	BuildLog.instance = this;

	// set "private" variables
	projectPath = _projectPath;
	dir = path.join(projectPath, CONST.DIR.BUILD);
	file = path.join(dir, 'build.json');

	// expose data object
	this.isNew = true;
	this.data = {};

	// make sure the alloy build folder exists
	if (!fs.existsSync(dir)) {
		fs.mkdirpSync(dir);
	}

	// load it up
	this.read();
}