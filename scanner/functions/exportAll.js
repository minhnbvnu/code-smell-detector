async function exportAll(selection, root) {
	if (!checkXDVersion()) { return; }
	let ctx = new Context(ContextTarget.FILES);

	if (!await project.checkRoot()) { return null; }
	let codeF = project.code;

	let count = 0, total = 0;
	// Parse entire document, getting all artboards and components, combining them in one object for iteration
	parse(root, null, ctx);
	let widgets = Object.assign({}, ctx.artboards, ctx.masterComponents);
	// Write each widget to disk
	for (let n in widgets) {
		if (NodeUtils.getProp(widgets[n].xdNode, PropType.INCLUDE_IN_EXPORT_PROJECT) === false)
			continue;
		++total;
		let fileName = await writeWidget(widgets[n], codeF, ctx);
		if (fileName) { count++; }
	}

	await exportColors(ctx);
	await exportCharStyles(ctx);
	await project.validate(ctx);

	ctx.resultMessage = $.getExportAllMessage(count, total, "widget");

	ctx.log.dump(ctx.resultMessage);
	return ctx;
}