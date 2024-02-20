function updateUiAfterMutation(formatPlugin, rangeObject) {
		// select the modified range
		rangeObject.select();
		// update Button toggle state. We take Selection.getRangeObject()
		// because rangeObject is not up-to-date
		onSelectionChanged(formatPlugin, Selection.getRangeObject());
	}