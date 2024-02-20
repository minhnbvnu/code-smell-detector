function highlightDisallowedElements(plugin, editable) {
		var config = plugin.getEditableConfig(editable.obj);
		var editableElement = editable.obj[0];
		
		if (isPluginActivated(config)) {
			EmptyParagraph.highlightEmptyElements(editableElement, config.emptyelements || DEFAULT_ELEMENTS);
		}
	}