function resetTestApp(callback) {
	var paths = exports.paths;
	fs.removeSync(paths.harness);
	fs.mkdirpSync(paths.harness);
	fs.copySync(paths.harnessTemplate, paths.harness);
	exec('alloy new "' + paths.harness + '"', {env: createEnv() }, function(error, stdout, stderr) {
		if (error) {
			console.error('Failed to create new alloy project at ' + paths.harness);
			console.error(stderr);
			process.exit(1);
		}
		callback();
	});
}