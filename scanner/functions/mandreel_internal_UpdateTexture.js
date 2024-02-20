function mandreel_internal_UpdateTexture(sp)
{
	if ( imandreel_ctx_canvas == null )
	{
		console.log("Mandreel_2D_UpdateTexture error: canvas context is null");
		return;
	}

	var hw_id = heap32[sp>>2]; sp+=4;
	var dataptr = heap32[sp>>2]; sp+=4;
	var width = heap32[sp>>2]; sp+=4;
	var height = heap32[sp>>2]; sp+=4;

	var imageData = imandreel_ctx_canvas.getImageData(0,0,width,height);
	var data = imageData.data;
	for (var y = 0; y < (height*width*4); ++y)
	{
		data[y] = heapU8[dataptr + y];
	}
	imandreel_ctx_canvas.putImageData(imageData,0,0);

	var dataurl = imandreel_ctx_canvas.canvas.toDataURL();

	var image = new Image();
	image.onerror = function()
	{
		dump('error updating texture '+hw_id+'\n');
    }
	image.onload = function()
	{
		//dump('texture '+hw_id+' updated\n'+'width '+image.width+' height '+image.height);
		array_ids_ogl[hw_id] = image;
	}
	image.src = dataurl;
}