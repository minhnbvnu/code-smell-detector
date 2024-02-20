function authorize(config) {
	var state, url, dismissWindow;

	return new Promise(function (resolve) {

		state = Math.random() * new Date().getTime();
		url = new UrlBuilder(config.authorizationUrlBase).build({
			'response_type': 'token',
			'redirect_uri': config.redirectUrl,
			'client_id': config.clientId,
			'scope': config.scope,
			'state': state
		});

		dismissWindow = config.windowStrategy(url);

		pubsub.subscribe(state, function (authorization) {
			dismissWindow();
			resolve(authorization);
		});

	});
}