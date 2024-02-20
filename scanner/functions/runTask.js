function runTask(taskName) {
	const gulpPath = path.join(__dirname, 'node_modules', 'gulp', 'bin', 'gulp.js');
	const cp = spawn(gulpPath, [taskName, '--no-color']);

	cp.stdout.setEncoding('utf8');
	cp.stdout.on('data', data => {
		console.log(data);
	});

	// TODO: show progress in menubar menu
	// tray.menu = createTrayMenu(name, [], 'progress here');

	cp.stderr.setEncoding('utf8');

	cp.stderr.on('data', data => {
		console.error(data);
		displayNotification({text: `[error] ${data}`});
	});

	cp.on('exit', code => {
		if (code === 0) {
			displayNotification({
				title: 'gulp',
				subtitle: 'Finished running tasks'
			});
		} else {
			console.error(`Exited with error code ${code}`);

			displayNotification({
				title: 'gulp',
				subtitle: `Exited with error code ${code}`,
				sound: 'Basso'
			});
		}
	});
}