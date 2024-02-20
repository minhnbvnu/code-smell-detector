function isWidget(xdNode) {
	// returns true if the xdNode is an exportable widget.
	return xdNode instanceof xd.Artboard || (xdNode instanceof xd.SymbolInstance && xdNode.isMaster);
}