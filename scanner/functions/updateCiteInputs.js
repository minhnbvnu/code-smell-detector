function updateCiteInputs(plugin) {
		var citeAnchorValue = plugin.effective.attr('cite');

		if (citeAnchorValue) {
			plugin.citeHrefField.setValue(citeAnchorValue);
		} else {
			plugin.citeHrefField.setPlaceholder();
		}

		var index = plugin.getIndexOfCitation(plugin.effective.attr('data-cite-id'));
		var note = plugin.citations[index].note;

		if (note) {
			plugin.citeNoteField.setValue(note);
		} else {
			plugin.citeNoteField.setPlaceholder();
		}
	}