function getStreamResult(stream) {
		const ministream = new Minipass();
		stream.pipe(ministream);
		return ministream.collect();
	}