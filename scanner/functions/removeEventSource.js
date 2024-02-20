function removeEventSource(source) {
		sources = $.grep(sources, function(src) {
			return !isSourcesEqual(src, source);
		});
		// remove all client events from that source
		cache = $.grep(cache, function(e) {
			return !isSourcesEqual(e.source, source);
		});
		reportEvents(cache);
	}