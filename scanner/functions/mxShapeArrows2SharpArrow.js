function mxShapeArrows2SharpArrow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy1 = 0.5;
	this.dx1 = 0.5;
	this.dx2 = 0.5;
	this.notch = 0;
}