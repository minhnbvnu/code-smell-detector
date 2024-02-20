function myglDrawArrays(sp)
{
	var mode = heap32[sp>>2];sp+=4;
	var first = heap32[sp>>2];sp+=4;
	var count = heap32[sp>>2];sp+=4;

	if (mandreel_draw_enable)
		imandreel_gl.drawArrays(mode, first, count);


	//dump('draw arrays ' + mode + ' ' + first + ' ' + count + '\n');
 }