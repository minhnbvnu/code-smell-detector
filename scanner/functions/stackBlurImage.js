function stackBlurImage( imageID, canvasID, radius, blurAlphaChannel )
{

 	var img = document.getElementById( imageID );
	var w = img.naturalWidth;
    var h = img.naturalHeight;

	var canvas = document.getElementById( canvasID );

    canvas.style.width  = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext("2d");
    context.clearRect( 0, 0, w, h );
    context.drawImage( img, 0, 0 );

	if ( isNaN(radius) || radius < 1 ) return;

	if ( blurAlphaChannel )
		stackBlurCanvasRGBA( canvasID, 0, 0, w, h, radius );
	else
		stackBlurCanvasRGB( canvasID, 0, 0, w, h, radius );
}