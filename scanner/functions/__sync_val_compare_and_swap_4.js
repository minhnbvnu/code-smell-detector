function __sync_val_compare_and_swap_4(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp+1)];
if(!(r1 !=r2)) //_LBB789_2
{
	r2 = heap32[(fp+2)];
	heap32[(r0)] = r2;
}
	r_g0 = r1;
	return;
}