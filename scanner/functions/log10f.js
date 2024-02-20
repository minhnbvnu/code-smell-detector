function log10f(sp)
  {
  var value = heapFloat[sp>>2];
	f_g0 = Math.log(value)/Math.LN10;
  }