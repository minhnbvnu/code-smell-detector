async function exportSelected(selection, root) {
	if (!checkXDVersion()) { return; }
	let xdNode = $.getSelectedItem(selection);
	if (!xdNode) { alert("Select an Artboard or Master Component."); return null; }

	if (!NodeUtils.isWidget(xdNode)) {
		let msg = "Only Artboards and Master Components can be exported as Widgets.";
		if (xdNode instanceof xd.SymbolInstance) {
			msg += ` Press <b>${$.getCmdKeyStr()}-Shift-K</b> to locate the Master Component.`;
		}
		alert(msg);
		return null;
	}

	if (!await project.checkRoot()) { return null; }
	let codeF = project.code;

	let ctx = new Context(ContextTarget.FILES);
	let fileName, node = parse(root, xdNode, ctx);
	if (node) {
		// Write the widget we have selected to disk
		fileName = await writeWidget(node, codeF, ctx);
	}

	await project.validate(ctx);

	ctx.resultMessage = fileName ? `Exported '${fileName}' successfully` : "Widget export failed";
	
	ctx.log.dump(ctx.resultMessage);
	return ctx;
}