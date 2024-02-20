function errorClient(request) {
			return when.reject({ request: request, id: 'error' });
		}