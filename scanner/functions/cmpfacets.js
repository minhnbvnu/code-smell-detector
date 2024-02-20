function cmpfacets(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r0 = heap32[(r0)];
	r1 = heap32[(r1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r2 = heap32[(r0+5)];
	r3 = heap32[(r1+5)];
	if(r2 !=r3) //_LBB702_2
{
	r0 = (r3 - r2)|0;
	r_g0 = r0;
	return;
}
else{
	r2 = heap32[(r1+1)];
	r3 = heap32[(r0+1)];
	r0 = _2E_str538;
	r3 = r3 == 0 ? r0 : r3;
	r2 = r2 == 0 ? r0 : r2;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	strcmp(i7);
	return;
}
}