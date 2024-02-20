function simpleResponse(statusCode, message) {
	let resp = {
		message: message,
		status: statusCode,
	};

	return new Response(JSON.stringify(resp), {
		headers: jsonHeaders,
		status: statusCode,
	});
}