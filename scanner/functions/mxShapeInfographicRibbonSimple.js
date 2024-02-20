function mxShapeInfographicRibbonSimple(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch1 = 0.5;
	this.notch2 = 0.5;
}