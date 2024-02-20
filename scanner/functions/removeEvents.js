function removeEvents(filter) {
		if (!filter) { // remove all
			cache = [];
			// clear all array sources
			for (var i=0; i<sources.length; i++) {
				if ($.isArray(sources[i].events)) {
					sources[i].events = [];
				}
			}
		}else{
			if (!$.isFunction(filter)) { // an event ID
				var id = filter + '';
				filter = function(e) {
					return e._id == id;
				};
			}
			cache = $.grep(cache, filter, true);
			// remove events from array sources
			for (var i=0; i<sources.length; i++) {
				if ($.isArray(sources[i].events)) {
					sources[i].events = $.grep(sources[i].events, filter, true);
				}
			}
		}
		reportEvents(cache);
	}