function addWidgetImports(node, ctx) {
	let xdNode = node.xdNode, fixCase = !!NodeUtils.getProp(xd.root, PropType.NORMALIZE_NAME_CASE);

	// Gather imports for components
	if (xdNode instanceof xd.SymbolInstance) {
		let master = ctx.masterComponents[xdNode.symbolId];
		if (master) { ctx.addImport(`./${cleanFileName(master.widgetName, fixCase)}.dart`, true); }
		else { trace(`Didn't add import for component '${xdNode.name}' because the master was not found`); }
	}

	// Gather imports for interactions on nodes that reference other artboards
	let l = NodeUtils.getInteractionCount(xdNode);
	for (let i = 0; i < l; ++i) {
		let action = xdNode.triggeredInteractions[i].action;
		if (action.type !== "goToArtboard") { continue; }
		let artboard = ctx.getArtboardFromXdNode(action.destination);
		if (artboard) { ctx.addImport(`./${cleanFileName(artboard.widgetName, fixCase)}.dart`, true); }
		else { trace(`Didn't add import for destination artboard '${action.destination.name}' because it was not found. This is likely due to a duplicate name.`); }
	}
}