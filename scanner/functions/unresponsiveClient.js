function unresponsiveClient(request) {
			request.id = 'unresponsive';
			return when.defer().promise;
		}