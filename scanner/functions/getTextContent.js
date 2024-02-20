function getTextContent(node){
	switch(node.nodeType){
	case 1:
	case 11:
		var buf = [];
		node = node.firstChild;
		while(node){
			if(node.nodeType!==7 && node.nodeType !==8){
				buf.push(getTextContent(node));
			}
			node = node.nextSibling;
		}
		return buf.join('');
	default:
		return node.nodeValue;
	}
}