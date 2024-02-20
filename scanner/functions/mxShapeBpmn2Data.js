function mxShapeBpmn2Data(bounds, fill, stroke, strokewidth)
{
	mxCellRenderer.prototype.getShape('note').call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
	this.dx = 0.5;
	this.notch = 0;
}