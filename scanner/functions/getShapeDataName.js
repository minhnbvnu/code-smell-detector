function getShapeDataName(shape, ctx) {
	return '_svg_' + cleanDartName(shape.getSvgId(ctx));
}