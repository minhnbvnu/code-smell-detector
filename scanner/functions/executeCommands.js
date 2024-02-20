function executeCommands(keys) {
	keys.forEach(key => {
		execSync(`${runner} run ${key}${getTrailingOptions()}`, {
			cwd,
			stdio: [process.stdin, process.stdout, process.stderr]
		});
	});
}