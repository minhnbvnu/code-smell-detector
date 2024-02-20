function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}