async function runHttpsServer()
{
	logger.info('running an HTTPS server...');

	// HTTPS server for the protoo WebSocket server.
	const tls =
	{
		cert : fs.readFileSync(config.https.tls.cert),
		key  : fs.readFileSync(config.https.tls.key)
	};

	httpsServer = https.createServer(tls, expressApp);

	await new Promise((resolve) =>
	{
		httpsServer.listen(
			Number(config.https.listenPort), config.https.listenIp, resolve);
	});
}