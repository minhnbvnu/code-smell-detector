function http(opts) {
	let server = createServer(setup(opts));
	let address = new URL(listen(server));
	return {
		close: server.close.bind(server),
		send(method, path, opts) {
			let uri = new URL(path, address);
			return send(method, uri, opts);
		}
	};
}