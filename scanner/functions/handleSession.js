async function handleSession(websocket) {
	websocket.accept();
	websocket.addEventListener('message', async ({ data }) => {
		if (data === 'CLICK') {
			count += 1;
			websocket.send(JSON.stringify({ count, tz: new Date() }));
		} else {
			// An unknown message came into the server. Send back an error message
			websocket.send(JSON.stringify({ error: 'Unknown message received', tz: new Date() }));
		}
	});

	websocket.addEventListener('close', async evt => {
		// Handle when a client closes the WebSocket connection
		console.log(evt);
	});
}