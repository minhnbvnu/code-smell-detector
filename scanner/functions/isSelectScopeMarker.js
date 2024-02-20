function isSelectScopeMarker(node) {
	return !(node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'optgroup')
		&& !(node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'option');
}