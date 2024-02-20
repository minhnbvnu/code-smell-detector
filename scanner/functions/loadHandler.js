function loadHandler (params, cb) {
		// We're using 'readystatechange' because IE and Opera happily support both
		var link = params.link;
			link[onreadystatechange] = link[onload] = function () {
			if (!link.readyState || link.readyState == 'complete') {
					features["event-link-onload"] = true;
				cleanup(params);
				cb();
			}
		};
	}