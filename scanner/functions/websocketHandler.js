async function websocketHandler(req) {
	const upgradeHeader = req.headers.get('Upgrade');
	if (upgradeHeader !== 'websocket') {
		return new Response('Expected websocket', { status: 400 });
	}

	const [client, server] = Object.values(new WebSocketPair());
	await handleSession(server);

	return new Response(null, {
		status: 101,
		webSocket: client,
	});
}