function isTableBodyScopeMarker(node) {
	return (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'tbody')
		|| (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'tfoot')
		|| (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'thead')
		|| (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.localName === 'html');
}