function parseScenegraphNode(xdNode, ctx, mode, ignoreVisible=false) {
	if (!ignoreVisible && !xdNode.visible) { return null; }

	let node = null, isWidget = false;
	let isArtboard = xdNode instanceof xd.Artboard, isComponent = xdNode instanceof xd.SymbolInstance;
	
	if (xdNode instanceof xd.RootNode) {
		throw("parseScenegraphNode() run on RootNode");
	} else if (isComponent && mode === ParseMode.SYMBOLS_AS_GROUPS) {
		node = new Group(xdNode, ctx);
	} else if (isArtboard || isComponent) {
		node = isArtboard ? ctx.getArtboardFromXdNode(xdNode) : ctx.getComponentFromXdNode(xdNode);
		if (node) {
			if (node.parsed) { return node; }
			if (node.layout.type === LayoutType.PINNED) {
				// since components can be parsed out of order
				ctx.usesPinned();
			}
			node.parsed = isWidget = true;
		}
	} else {
		for (let i=0; i<NODE_FACTORIES.length && !node; i++) {
			node = NODE_FACTORIES[i].create(xdNode, ctx);
		}
	}
	if (!node) {
		ctx.log.error(`Unable to create export node from ${getXDLabel(xdNode)} named '${xdNode.constructor.name}'.`, xdNode);
		return null;
	}

	// post processing:
	if (isWidget) {
		ctx.pushWidget(node);
		parseChildren(node, ctx, mode);
		ctx.popWidget();
	} else if (node instanceof Group) {
		parseChildren(node, ctx, mode);
	} else if (node instanceof Grid) {
		if (ctx.inGrid) {
			ctx.log.warn("Nested repeat grids are currently unsupported, and may result in unexpected behaviour.", xdNode);
		}
		let kids = node.xdNode.children, child = kids && kids.at(0);
		ctx.pushGrid();
		node.item = child && parseScenegraphNode(child, ctx, ParseMode.SYMBOLS_AS_GROUPS);
		ctx.popGrid();
		combineShapes(node.item, ctx);
	}

	addWidgetImports(node, ctx);

	// add decorators:
	for (let i=0; i<DECORATOR_FACTORIES.length; i++) {
		let decorator = DECORATOR_FACTORIES[i].create(node, ctx);
		if (decorator) { node.addDecorator(decorator); }
	}
	return node;
}