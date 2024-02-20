function getTaskAndResult(request, response, next) {
		app.webservice.task(request.params.id).get({}, (error, task) => {
			if (error) {
				return next('route');
			}
			app.webservice
				.task(request.params.id)
				.result(request.params.rid)
				.get({full: true}, (webserviceError, result) => {
					if (webserviceError) {
						return next('route');
					}
					response.locals.task = task;
					response.locals.result = result;
					next();
				});
		});
	}