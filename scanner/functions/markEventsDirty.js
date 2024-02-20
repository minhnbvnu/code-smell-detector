function markEventsDirty() {
		$.each(viewInstances, function(i, inst) {
			inst.eventsDirty = true;
		});
	}