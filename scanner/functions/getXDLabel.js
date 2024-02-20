function getXDLabel(xdNode) {
	if (xdNode == null) { return "none"; }
	// not necessarily the ideal location for this method, but it's good to maintain proximity to the other similar methods.
	if (xdNode instanceof xd.Text) { return "text"; }
    if (xdNode instanceof xd.Group || xdNode instanceof xd.ScrollableGroup) { return "group"; }
	if (xdNode instanceof xd.RepeatGrid) { return "grid"; }
    if (xdNode instanceof xd.SymbolInstance) { return "component"; }
    if (xdNode instanceof xd.Artboard) { return "artboard"; }
    if (xdNode instanceof xd.Path || xdNode instanceof xd.Polygon ||
        xdNode instanceof xd.Rectangle || xdNode instanceof xd.Ellipse ||
        xdNode instanceof xd.BooleanGroup || xdNode instanceof xd.Line) {
            return "shape";
    }
    return "unknown element";
}