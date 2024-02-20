function tlsf_malloc(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = (r0 + -1)|0;
	if(uint(r2) <uint(1073741823)) //_LBB727_2
{
	r0 = (r0 + 7)|0;
	r0 = r0 & -8;
	r2 = 12;
	r0 = uint(r0) < uint(r2) ? r2 : r0;
}
else{
	r0 = 0;
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	block_locate_free(i7);
	r2 = r_g0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r0;
	r0 = s_current_memory;
	block_prepare_used(i7);
	r1 = r_g0;
	r2 = r2 >> 2;
	r0 = r0 >> 2;
	r2 = heap32[(r2+1)];
	r3 = heap32[(r0)];
	r2 = r2 & -4;
	r2 = (r3 + r2)|0;
	r3 = s_max_memory;
	r3 = r3 >> 2;
	heap32[(r0)] = r2;
	r0 = heap32[(r3)];
if(!(uint(r2) <=uint(r0))) //_LBB727_5
{
	heap32[(r3)] = r2;
}
	r_g0 = r1;
	return;
}