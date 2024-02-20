function _checkForUnsupportedFeatures(o, xdNode, ctx) {
	if (o.textScript !== "none") {
		// super / subscript
		ctx.log.warn("Superscript & subscript are not currently supported.", xdNode);
	}
	if (o.textTransform !== "none") {
		// uppercase / lowercase / titlecase
		ctx.log.warn("Text transformations (all caps, title case, lowercase) are not currently supported.", xdNode);
	}
	if (o.paragraphSpacing) {
		ctx.log.warn("Paragraph spacing is not currently supported.", xdNode);
	}
	if (o.strokeEnabled && o.stroke) {
		// outline text
		ctx.log.warn("Text border is not currently supported.", xdNode);
	}
}