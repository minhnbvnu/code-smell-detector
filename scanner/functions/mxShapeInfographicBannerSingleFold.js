function mxShapeInfographicBannerSingleFold(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
	this.dx2 = 0.5;
	this.notch = 0.5;
}