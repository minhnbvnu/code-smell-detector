async function exportImage(selection, root) {
	if (!checkXDVersion()) { return; }
	let xdNode = $.getSelectedItem(selection), name = NodeUtils.getImageName(xdNode);
	if (!name) { alert("You must set an image name before exporting."); return; }

	if (!await project.checkRoot()) { return null; }
	let imageF = project.images;

	// Do a full scan so we have maxW/maxH values:
	let data = _scanForImages(root, {})[name];
	let ctx = new Context(ContextTarget.FILES);
	let fileName = await _exportImageData(data, name, imageF, ctx);
	ctx.resultMessage = fileName ? `Exported '${fileName}' successfully` : "Image export failed";

	ctx.log.dump(ctx.resultMessage);
	return ctx;
}