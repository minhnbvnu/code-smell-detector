function toggleEditMode(e) {
	if (isEditable) {
		$.dash.stopEditing();
	} else {
		$.dash.startEditing();
	}
}