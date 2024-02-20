function fetchEvents(start, end) {
		rangeStart = start;
		rangeEnd = end;
		cache = [];
		var fetchID = ++currentFetchID;
		var len = sources.length;
		pendingSourceCnt = len;
		for (var i=0; i<len; i++) {
			fetchEventSource(sources[i], fetchID);
		}
	}