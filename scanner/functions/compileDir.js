function compileDir(from, to, command, options) {
	if (!command.output) handleError({ code: 'MISSING_OUTPUT_DIR' });

	try {
		fs.mkdirSync(to);
	} catch (e) {
		if (e.code !== 'EEXIST') throw e;
	}

	fs.readdirSync(from).forEach(function(file) {
		compile(path.resolve(from, file), path.resolve(to, file), command, options);
	});
}