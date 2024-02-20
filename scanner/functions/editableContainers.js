function editableContainers() {
	    return $(map(Aloha.editables, function (editable) {
			return document.getElementById(editable.getId());
		}));
    }