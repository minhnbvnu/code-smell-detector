function doCompile(platform) {
	if (!platform) { return; }

	exec('alloy compile ' + paths.harness + ' --config platform=' + platform, function(error, stdout, stderr) {
		if (error !== null) {
			console.error(error);
			console.error(stderr);
			process.exit(3);
		}

		var genDir = path.join(paths.apps, testApp, '_generated', platform);
		fs.removeSync(genDir);
		fs.mkdirpSync(genDir);

		var locations = [
			path.join('alloy', 'controllers'),
			path.join('alloy', 'models'),
			path.join('alloy', 'widgets')
		];
		_.each(locations, function(l) {
			var src = path.join(paths.harness, 'Resources', (platform === 'ios' ? 'iphone' : platform), l);
			var dst = path.join(genDir, l);
			if (fs.existsSync(src) && fs.readdirSync(src).length !== 0) {
				fs.mkdirpSync(dst);
				fs.copySync(src, dst);

				// we don't need to evaluate BaseController.js every time
				var bc = path.join(dst, 'BaseController.js');
				if (l === path.join('alloy', 'controllers') && fs.existsSync(bc)) {
					fs.unlinkSync(bc);
				}

				console.log('Generated runtime files in ' +
					path.join('_generated', platform, l).cyan
				);
			}
		});

		doCompile(platformsArray[platformCtr++]);
	});
}