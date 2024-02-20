function fmod(sp)
  {
  var value = heapDouble[sp>>3];sp+=8;
  var value2 = heapDouble[sp>>3];
	f_g0 = value % value2;
  }