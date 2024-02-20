async function writeWidget(node, codeF, ctx) {
	let fileName = node.widgetName + ".dart";
	let fileStr = node.serializeWidget(ctx);
	fileStr = _formatDart(fileStr, false, ctx, node);
	
	if (!fileStr) { return null; }

	await codeF.writeFile(fileName, fileStr, ctx);
	return fileName;
}