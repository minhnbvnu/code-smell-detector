function gatherWidgets(xdNode, ctx) {
	if (xdNode instanceof xd.SymbolInstance) {
		ctx.addComponentInstance(new Component(xdNode, ctx));
	} else if (xdNode instanceof xd.Artboard) {
		ctx.addArtboard(new Artboard(xdNode, ctx));
	}
	if (xdNode.children) { xdNode.children.forEach((o) => gatherWidgets(o, ctx)); }
}