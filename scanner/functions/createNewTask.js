function createNewTask(request, actions, headers) {
	return {
		name: request.body.name,
		url: request.body.url,
		standard: request.body.standard,
		ignore: request.body.ignore || [],
		timeout: request.body.timeout || undefined,
		wait: request.body.wait || undefined,
		actions,
		username: request.body.username || undefined,
		password: request.body.password || undefined,
		headers,
		hideElements: request.body.hideElements || undefined
	};
}