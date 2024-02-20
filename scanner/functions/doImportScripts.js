function doImportScripts(msg) {
		if (msg.scripts && msg.scripts.length > 0)
			importScripts.apply(undefined, msg.scripts);
		postMessage({type: 'importScripts'});
	}