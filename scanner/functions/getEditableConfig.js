function getEditableConfig(plugin, editable) {
		var id = editable.getId();
		if (!id) {
			return null;
		}
		if (configLookup[id]) {
			return configLookup[id];
		}
		var config = plugin.getEditableConfig(editable.obj);
		if (!config) {
			return null;
		}
		configLookup[id] = parseConfiguration(config);
		return configLookup[id];
	}