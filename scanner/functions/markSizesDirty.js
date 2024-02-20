function markSizesDirty() {
		$.each(viewInstances, function(i, inst) {
			inst.sizeDirty = true;
		});
	}