function cosf(sp)
  {
  var value = heapFloat[sp>>2];
	f_g0 = Math.cos(value);
	//assert (isNaN(f_g0) == false);
  }