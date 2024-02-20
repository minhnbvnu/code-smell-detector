function getTextStyleParamList(o, isDefault, ctx, xdNode=null, fill=null) {
	let isStyleRange = o.length != null;

	// kind of an unusual place for this, but we want to run it on every style object:
	_checkForUnsupportedFeatures(o, xdNode, ctx);
	ctx.addFont(_getFontFamily(o), xdNode);

	// Builds an array of style parameters.
	return [
		_getFontFamilyParam(o),
		_getFontSizeParam(o),
		_getColorParam(o, fill),
		_getLetterSpacingParam(o),
		// The default style doesn't include weight, decoration, or style (italic):
		(isDefault ? null : _getFontStyleParam(o)),
		(isDefault ? null : _getFontWeightParam(o)),
		(isDefault ? null : _getTextDecorationParam(o)),
		// Line height & shadows are set at the node level in XD, so not included for ranges:
		(!isStyleRange || isDefault  ? _getHeightParam(xdNode || o) : null),
		(!isStyleRange || isDefault ? _getShadowsParam(xdNode || o) : null),
	];
}