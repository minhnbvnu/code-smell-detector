function mxShapeBasicPartConcEllipse(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.startAngle = 0.25;
	this.endAngle = 0.75;
	this.arcWidth = 0.5;
}