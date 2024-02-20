function inlineWorker (script) {
	function wrap (type, content, typeName) {
		try {
			var url = type(content, 'text/javascript');
			var worker = new Worker(url);

			define(worker, '_url', url);
			define(worker, '_terminate', worker.terminate);
			define(worker, 'terminate', terminate);

			if (inlineWorker.type) return worker;

			inlineWorker.type = typeName;
			inlineWorker.createURL = type;

			return worker;
		} catch (e) {
			return null;
		}
	}

	var createDynURL = Sink.createDynURL;
	var worker;

	if (inlineWorker.createURL) {
		return wrap(inlineWorker.createURL, script, inlineWorker.type);
	}

	worker = wrap(createDynURL.createBlob, script, 'blob');
	if (worker) return worker;

	worker = wrap(createDynURL.createBlobBuilder, script, 'blobbuilder');
	if (worker) return worker;

	worker = wrap(createDynURL.createData, script, 'data');

	return worker;
}