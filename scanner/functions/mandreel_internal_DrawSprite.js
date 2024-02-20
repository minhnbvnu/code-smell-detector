function mandreel_internal_DrawSprite(sp)
{
	if ( imandreel_ctx_canvas == null )
	{
		console.log("Mandreel_2D_DrawSprite error: canvas context is null");
		return;
	}

	var hw_id = heap32[sp>>2]; sp+=4;
	var u0 = heapFloat[sp>>2]; sp+=4;
	var u1 = heapFloat[sp>>2]; sp+=4;
	var v0 = heapFloat[sp>>2]; sp+=4;
	var v1 = heapFloat[sp>>2]; sp+=4;
	//var x = heapFloat[sp>>2]; sp+=4;
	//var y = heapFloat[sp>>2]; sp+=4;
	var sx = heapFloat[sp>>2]; sp+=4;
	var sy = heapFloat[sp>>2]; sp+=4;
	//var rot = heapFloat[sp>>2]; sp+=4;
	var m11 = heapFloat[sp>>2]; sp+=4;
	var m12 = heapFloat[sp>>2]; sp+=4;
	var m21 = heapFloat[sp>>2]; sp+=4;
	var m22 = heapFloat[sp>>2]; sp+=4;
	var tx = heapFloat[sp>>2]; sp+=4;
	var ty = heapFloat[sp>>2]; sp+=4;
	var color = heap32[sp>>2]; sp+=4;

	//ctx_canvas.fillStyle="#FF0000";
	//ctx_canvas.fillRect(tx,ty,sx,sy);
	var texture = array_ids_ogl[hw_id];

	if ( texture == null )
	{
		console.log("Mandreel_2D_DrawSprite error: texture invalid ("+hw_id+") or loading yet...");
		return;
	}

	var width = (u1-u0)*texture.width;
	var height = (v1-v0)*texture.height;

	if (width == 0)
		return;
	if (height == 0)
		return;

	var x_offset = u0*texture.width;
	var y_offset = v0*texture.height;

	//dump(x_offset + ' ' + y_offset + ' ' + texture.width + ' ' + texture.height + ' ' + x + ' ' +y + ' ' + width + ' ' + height + '\n');

	x_offset = x_offset % texture.width;
	y_offset = y_offset % texture.height;

	var scale_x, scale_y;
	if (sx<0)
		scale_x = -1;
	else
		scale_x = 1;
	if (sy<0)
		scale_y = -1;
	else
		scale_y = 1;

	var simple_draw = false;//scale_x == 1 && scale_y == 1 && rot == 0;
	var x_pos = (0.5*sx + tx/* + 240*/);
	var y_pos = (/*320*/ + ((0.5*sy + ty) /*+ 160*/));
	var new_sx = sx;
	var new_sy = sy;

	imandreel_ctx_canvas.globalAlpha = (color>>>24)/255;

	if (!simple_draw)
	{
		imandreel_ctx_canvas.save()
		/*ctx_canvas.translate(x_pos + new_sx/2, y_pos + new_sy/2)
		ctx_canvas.rotate(-rot*Math.PI/180);
		ctx_canvas.scale(scale_x, scale_y);
		ctx_canvas.translate(-(x_pos + new_sx/2), -(y_pos + new_sy/2))*/
		imandreel_ctx_canvas.setTransform(m11,m12,m21,m22,tx,ty);
	}

	/*if (x_offset<0 || y_offset<0 || (x_offset+width)>texture.width || (y_offset+height)>texture.height)
	{
		dump(x_offset + ' ' + y_offset + ' ' + texture.width + ' ' + texture.height + ' ' + x + ' ' +y + ' ' + width + ' ' + height + '\n');
	}*/

	if (new_sx<0)
	{
		x_pos += new_sx;
		new_sx = -new_sx;
	}
	if (new_sy<0)
	{
		y_pos += new_sy;
		new_sy = -new_sy;
	}

	//ctx_canvas.drawImage(texture,x_offset,y_offset, width, height, x_pos, y_pos , new_sx, new_sy);
	imandreel_ctx_canvas.drawImage(texture,x_offset,y_offset, width, height, 0,0, 1,1);

	if (!simple_draw)
		imandreel_ctx_canvas.restore()
}