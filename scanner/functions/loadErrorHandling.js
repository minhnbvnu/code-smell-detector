function loadErrorHandling(app, config, callback) {
	app.express.get('*', (request, response) => {
		response.status(404);
		response.render('404');
	});
	app.express.use((error, request, response, next) => {
		/* eslint no-unused-vars: 'off' */
		if (error.code === 'ECONNREFUSED') {
			error = new Error('Could not connect to Pa11y Webservice');
		}
		app.emit('route-error', error);
		if (process.env.NODE_ENV !== 'production') {
			response.locals.error = error;
		}
		response.status(500);
		response.render('500');
	});

	app.server.listen(config.port, error => {
		callback(error, app);
	});
}