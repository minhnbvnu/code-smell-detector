function findModelMigrations(name, inDir) {
	try {
		var migrationsDir = inDir || compileConfig.dir.migrations;
		var files = fs.readdirSync(migrationsDir);
		var part = '_' + name + '.' + CONST.FILE_EXT.MIGRATION;

		// look for our model
		files = _.reject(files, function(f) { return f.indexOf(part) === -1; });

		// sort them in the oldest order first
		files = files.sort(function(a, b) {
			var x = a.substring(0, a.length - part.length - 1);
			var y = b.substring(0, b.length - part.length - 1);
			if (x < y) { return -1; }
			if (x > y) { return 1; }
			return 0;
		});

		var codes = [];
		_.each(files, function(f) {
			var mf = path.join(migrationsDir, f);
			var m = fs.readFileSync(mf, 'utf8');
			var code = '(function(migration){\n ' +
				"migration.name = '" + name + "';\n" +
				"migration.id = '" + f.substring(0, f.length - part.length).replace(/_/g, '') + "';\n" +
				m +
				'})';
			codes.push(code);
		});
		logger.info('Found ' + codes.length + ' migrations for model: ' + name);
		return codes;
	} catch (E) {
		return [];
	}
}