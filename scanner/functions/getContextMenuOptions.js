function getContextMenuOptions(elem) {
	var optionsID = elem.attr('class').replace(/ /g, '_');
	if (optionsID == "") return 'itemOptions';
	if (!($('#' + optionsID).length)) {
		// Create a clone to itemOptions with menus specific to this element
		var newOptions = $('#itemOptions').clone().attr('id', optionsID);
		if (!elem.hasClass('cap_select')) $('.select', newOptions).remove();
		if (!elem.hasClass('cap_download')) $('.download', newOptions).remove();
		if (!elem.hasClass('cap_rename')) $('.rename', newOptions).remove();
		if (!elem.hasClass('cap_move')) $('.move', newOptions).remove();
		$('.replace', newOptions).remove(); // we remove replace since it is not implemented on Opera + Chrome and works only if #preview panel is on on FF
		if (!elem.hasClass('cap_delete')) $('.delete', newOptions).remove();
		$('#itemOptions').after(newOptions);
	}
	return optionsID;
}