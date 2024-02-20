async function _exportImageFile(xdNode, name, w, h, imageF, ctx) {
	if (!imageF) { return; }

	// Gets the selected node's image fill, creates a new xd.Rectangle node using the fill
	// at the natural size of the image, and then renders it to an image file.

	// There are two ways we could approach this.
	// One is to have this method return a rendition entry, and return it, then run them all at once.
	// The other is running them one at a time. This approach would let us show a progress bar,
	// and deal with errors individually, but may be slower?
	if (!(xdNode.fill instanceof xd.ImageFill)) {
		ctx.log.error('Tried to export an image from a node that does not have an image fill.', xNode);
		return;
	}

	let rect = new xd.Rectangle();
	rect.fill = xdNode.fill;
	rect.width = w;
	rect.height = h;

	let fileName = _getImageFileName(xdNode);

	let file = await imageF.getFile(fileName, ctx);

	if (!file) {
		ctx.log.error(`Could not create image file ('${fileName}').`, null);
		return null;
	}
	
	ctx.log.note(`Write image '${$.getRelPath(file, ctx)}'`);

	let type = _getRenditionType(xdNode);
	let opts = {
		node: rect,
		outputFile: file,
		type,
		scale: 1.0,
	};
	if (type === app.RenditionType.JPG) { opts.quality = 80; }

	await app.createRenditions([opts]).then(results => {
		//ctx.log.note(`Image output to: ${results[0].outputFile.nativePath}`);
	}).catch(error => {
		ctx.log.error(`Unable to export image ('${name}'): ${error}`, null);
		fileName = null;
	});
	return fileName;
}