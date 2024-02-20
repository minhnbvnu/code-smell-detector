function atan2f(sp)
  {
  var x = heapFloat[sp>>2];sp+=4;
  var y = heapFloat[sp>>2];
	f_g0 = Math.atan2(x,y);
  }