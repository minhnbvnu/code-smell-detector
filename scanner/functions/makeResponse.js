function makeResponse(text, code) {
	return new Response(
		JSON.stringify({
			message: text,
		}),
		{
			status: code,
			headers: { 'content-type': 'application/json' },
		}
	);
}