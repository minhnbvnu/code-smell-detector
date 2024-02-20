function getEditableOriginalObj(editableElement) {
		var editable = Aloha.getEditableById(editableElement.attr('id'));

		return editable ? editable.originalObj : editableElement;
	}