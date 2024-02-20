async function _exportImageData(data, name, imageF, ctx) {
	let xdNode = data.xdNode, fill = xdNode.fill;
	let imgW = fill.naturalWidth, imgH = fill.naturalHeight;

	if (!NodeUtils.getProp(xd.root, PropType.RESOLUTION_AWARE)) {
		return await _exportImageFile(data.xdNode, name, imgW, imgH, imageF, ctx);
	}

	// Resolution aware export:
	let maxW = data.maxW, maxH = data.maxH;
	let aspect = imgW/imgH, maxScale = Math.min(imgW/maxW, imgH/maxH);
	let w = Math.max(maxW, maxH*aspect)+0.5 | 0, h = w / aspect + 0.5 | 0;

	let fileName = await _exportImageFile(xdNode, name, w, h, imageF, ctx);
	if (!fileName) { return null; }

	if (maxScale >= 3 && (imageF = project.imagesX3)) {
		await _exportImageFile(xdNode, name, w*3, h*3, imageF, ctx);
	}
	if (maxScale >= 2 && (imageF = project.imagesX2)) {
		await _exportImageFile(xdNode, name, w*2, h*2, imageF, ctx);
	}
	return fileName;
}