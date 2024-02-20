async function exportAllImages(selection, root) {
	if (!checkXDVersion()) { return; }
	if (!await project.checkRoot()) { return null; }
	let imageF = project.images;

	let ctx = new Context(ContextTarget.FILES);
	let imageNames = _scanForImages(root, {}), count = 0, total = 0;
	for (let n in imageNames) {
		let data = imageNames[n];
		if (!data.includeInExportAll) { continue; }
		total++;
		let fileName = await _exportImageData(data, n, imageF, ctx);
		if (fileName) { count++; }
	}
	_pruneImageMap(imageNames);

	ctx.resultMessage = $.getExportAllMessage(count, total, "named image");

	ctx.log.dump(ctx.resultMessage);
	return ctx;
}