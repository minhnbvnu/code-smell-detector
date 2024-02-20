function addChangedSymbol(element) {
	var object = getNodeFromElement(element);
	if(object != undefined && !object.isChanged) {
		$(object.nodeId+" .w2ui-node-caption").append("<span class='isChanged'>*</span>");
		object.isChanged = true;
	}
}