function myglClear(sp)
  {
  var mask = heap32[sp>>2];sp+=4;


  //dump('clear ' + mask + '\n');
	if (mandreel_draw_enable)
		imandreel_gl.clear(mask);
  }