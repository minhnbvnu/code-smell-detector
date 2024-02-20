function sendtoburp() {
	var pkg_class_method = zTree.getSelectedNodes()[0].pkg_class_method;
	$('#InspectText').val(pkg_class_method);
}