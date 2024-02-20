function runOnBrowser(url, browserConfig, opts) {
	browser = wd.promiseRemote(opts.selenium);
	log('Selenium is on %s', browser.noAuthConfigUrl.hostname);
	browser.on('status', function(data) {
		//seleniumLog(data);
	});
	browser.on('command', function(meth, path, data) {
		if (data && typeof data === 'object') {
			var data = JSON.stringify(data);
		}
		seleniumLog(meth, (path || '').substr(0, 70), (data || '').substr(0, 70));
	});

	var metrics = new Metrics(opts.metrics);
	var actions = new Actions(opts.actions);

	return metrics.setup(opts).then(function() {
		return actions.setup(opts);
	}).then(function() {
		log('Stating browser with', JSON.stringify(browserConfig));
		return browser.init(browserConfig);
	}).then(function() {
		log('Session is ' + browser.sessionID);
		log('Running Prescript');
		return opts.preScript(browser);
	}).then(function() {
		if (url) {
			return browser.get(url);
		}
	}).then(function() {
		return metrics.start(browser, browserConfig);
	}).then(function() {
		return actions.perform(browser, browserConfig);
	}).then(function() {
		return metrics.teardown(browser, browserConfig);
	}).then(function() {
		return metrics.getResults();
	}).fin(function() {
		if (!opts.debugBrowser) {
			return browser.quit().catch(function() {
				return Q();
			});
		}
	});
}