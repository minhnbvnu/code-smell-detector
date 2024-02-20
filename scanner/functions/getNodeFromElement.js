function getNodeFromElement(element) {
	var object;	
	for (index in objectArray) {
		if($(objectArray[index].contentId).find(element).length) {
			object = objectArray[index];
			break;
		}
	}
	return object;
}