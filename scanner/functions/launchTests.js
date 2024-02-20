function launchTests() {
	jasmine.getEnv().addReporter(new CR({
		doneCallback: function(runner) {
			alert(runner.specs().length + ' specs, ' + runner.results().failedCount + ' failed');
		}
	}));
	jasmine.getEnv().execute();
}