function isTableRowScopeMarker(node) {
	return (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'tr')
		|| (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'html');
}