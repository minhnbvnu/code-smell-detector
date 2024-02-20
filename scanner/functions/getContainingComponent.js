function getContainingComponent(xdNode, inclusive=false) {
	if (!xdNode || xdNode === xd.root) { return null; }
	if (inclusive && xdNode instanceof xd.SymbolInstance) { return xdNode; }
	return getContainingComponent(xdNode.parent, true);
}