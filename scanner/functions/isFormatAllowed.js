function isFormatAllowed(tagname, plugin, editable) {
		if (!ContentRules.isAllowed(editable.obj[0], tagname)) {
			return false;
		}
		var config = plugin.getEditableConfig(editable.obj);
		return config ? $.inArray(tagname, config) > -1 : false;
	}