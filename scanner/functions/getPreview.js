async function getPreview(node, retryCount=0) {
	// return null when something goes wrong, empty string for an empty preview
	if (!node) { return ''; }
	if (!previewFile) { return null; }
	let bounds = node.localBounds;
	let scale = Math.min(20, 200 / bounds.height, 400 / bounds.width) * 3; // for hi-dpi
	try {
		await app.createRenditions([{
			node, scale,
			outputFile: previewFile,
			type: app.RenditionType.PNG,
		}]);
	} catch(e) {
		if (retryCount > 0) {
			await $.delay(100);
			return await getPreview(node, retryCount-1);
		} else {
			return null;
		}
	}
	const data = await previewFile.read({ format: fs.formats.binary });
	return 'data:image/png;base64,' + base64ArrayBuffer(data);
}