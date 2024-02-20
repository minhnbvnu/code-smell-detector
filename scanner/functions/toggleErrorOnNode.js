function toggleErrorOnNode(element, turnOn) {
	var object = getNodeFromElement(element);
	if(object != undefined && turnOn)
		$(object.nodeId).addClass("error");
	else if(object != undefined && $(object.contentId).find(".error").length == 0) 
		$(object.nodeId).removeClass("error");
}