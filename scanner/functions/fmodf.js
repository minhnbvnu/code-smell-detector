function fmodf(sp)
  {
  var value = heapFloat[sp>>2];sp+=4;
  var value2 = heapFloat[sp>>2];
	f_g0 = value % value2;
  }