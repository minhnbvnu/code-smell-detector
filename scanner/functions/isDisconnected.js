function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}