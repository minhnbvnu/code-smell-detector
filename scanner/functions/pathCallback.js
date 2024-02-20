function pathCallback(error, stdout, stderr, callback) {
		if (error) {
			grunt.fatal(`Command failed: ${error}`);
		}

		if (path === null) {
			path = stdout;
		} else if (path !== stdout) {
			grunt.fatal('Path shouldn\'t have changed!');
		}

		callback();
	}