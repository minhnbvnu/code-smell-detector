function gettimeofday(sp)
  {
  var ptr = heap32[sp>>2];
  var time_ms = Date_now();
	heap32[ptr>>2] = time_ms/1000;
	heap32[(ptr>>2)+1] = (time_ms%1000)*1000;
	r_g0 = 0;
  }