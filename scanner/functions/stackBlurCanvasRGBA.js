function stackBlurCanvasRGBA( id, top_x, top_y, width, height, radius )
{
	var canvas  = document.getElementById( id );
	var context = canvas.getContext("2d");
	return stackBlurContextRGBA(context, top_x, top_y, width, height, radius);
}