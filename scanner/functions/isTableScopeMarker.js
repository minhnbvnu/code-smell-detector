function isTableScopeMarker(node) {
	return (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'table')
		|| (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'html');
}