async function installDependencies(projectPath) {
	let npmExecutable = 'npm';
	const spawnOptions = {
		cwd: projectPath,
		stdio: 'inherit'
	};
	if (process.platform === 'win32') {
		spawnOptions.shell = true;
		npmExecutable += '.cmd';
	}
	return new Promise((resolve, reject) => {
		const child = spawn(npmExecutable, [ 'i' ], spawnOptions);
		child.on('close', code => {
			if (code !== 0) {
				return reject(new Error('Failed to install project dependencies.'));
			}

			resolve();
		});
	});
}