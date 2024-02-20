function _getImageFillName(fill) {
	if (!fill) { return null; }
	// this is a huge hack, because ImageFill doesn't have a .file property
	let fillStr = fill.toString().replace(/\\/g, '/');
	// as of XD29, this returns a file name & dimensions
	let match = /ImageFill\(([^<][^(]+)\)/.exec(fillStr);
	return match ? match[1] : null;
}