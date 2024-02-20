async function* readStream(body, compressed) {
	// Decompress the strem if needed
	var uncompressedStream;
	if (compressed) {
		const ds = new DecompressionStream('gzip');
		uncompressedStream = body.pipeThrough(ds);
	} else {
		uncompressedStream = body;
	}

	// Split the stream into an array of lines
	const reader = uncompressedStream.getReader();
	var remainder = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (remainder != '') {
				yield remainder;
			}
			break;
		}
		const stringData = new TextDecoder().decode(value);
		const chunks = stringData.split('\n');
		if (chunks.length > 1) {
			chunks[0] = remainder + chunks[0];
			remainder = '';
		}
		if (chunks.length > 0) {
			remainder = chunks.pop();
		}
		yield* chunks;
	}
}