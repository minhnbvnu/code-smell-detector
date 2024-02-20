function resetNodesAndTheirObject() {
	$(".isChanged").remove();
	for (index in objectArray) 
		objectArray[index].isChanged = false;
}