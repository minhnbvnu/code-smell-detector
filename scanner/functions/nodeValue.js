function nodeValue(node) {
	var result = "";
	if (node.nodeType == 1) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; ++i) {
			result += nodeValue(children[i]);
		}		
	}
	else if (node.nodeType == 3) {
		result = node.nodeValue;
	}
	return(result);
}