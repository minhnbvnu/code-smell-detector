function mandreel_internal_WriteFramebuffer(sp)
{
	if ( imandreel_ctx_canvas == null )
	{
		console.log("Mandreel_2D_UpdateTexture error: canvas context is null");
		return;
	}

	var dataptr = heap32[sp>>2]; sp+=4;
	var width = heap32[sp>>2]; sp+=4;
	var height = heap32[sp>>2]; sp+=4;

	var imageData = imandreel_ctx_canvas.getImageData(0,0,width,height);
	if ( imageData != null )
	{
		var data = imageData.data;
		if ( data != null )
		{
			var size = (height*width*4);
			if ( typeof imageData.data.set != "undefined" )
			{
				var sub = heapU8.subarray(dataptr,dataptr+size);
				imageData.data.set(sub);
			}
			else
			{
				for (var y = 0; y < size; ++y)
				{
					data[y] = heapU8[dataptr + y];
				}
			}

			imandreel_ctx_canvas.putImageData(imageData,0,0);
		}
		else
		{
			dump("WriteFramebuffer canvas data null");
		}
	}
	else
	{
		dump("WriteFramebuffer canvas imageData null");
	}
}