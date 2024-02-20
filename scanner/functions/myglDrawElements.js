function myglDrawElements(sp)
{
	var mode = heapU32[sp>>2]; sp+=4;
	var count = heapU32[sp>>2]; sp+=4;
	var type = heapU32[sp>>2]; sp+=4;
	var offset = heapU32[sp>>2]; sp+=4;


	if (mandreel_draw_enable)
		imandreel_gl.drawElements(mode, count, type, offset);



}