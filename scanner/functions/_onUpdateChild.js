function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}