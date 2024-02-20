function assertTestAppIsRunning(url, done) {
	request(url, error => {
		if (error) {
			console.error('Error: Test app not started; run with `NODE_ENV=test node index.js`');
			process.exit(1);
		}
		done();
	});
}