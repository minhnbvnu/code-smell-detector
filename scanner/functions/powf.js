function powf(sp)
  {
  var value = heapFloat[sp>>2];
  var value2 = heapFloat[(sp+4)>>2];
	f_g0 = Math.pow(value,value2);
  }