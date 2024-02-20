function clearEditableConfig(editable) {
		var id = editable.getId();
		if (id && configLookup[id]) {
			delete configLookup[id];
		}
	}