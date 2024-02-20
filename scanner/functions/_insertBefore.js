function _insertBefore(/*DomNode*/node, /*DomNode*/ref){
		var parent = ref.parentNode;
		if(parent){
			parent.insertBefore(node, ref);
		}
	}