function swrite(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	r2 = heap32[(r0+2)];
	r3 = heap32[(fp+1)];
if(!(r2 ==r1)) //_LBB744_5
{
	r2 = (r2 - r1)|0;
	r4 = heap32[(r0)];
	r2 = uint(r2) < uint(r3) ? r2 : r3;
	if(r4 !=0) //_LBB744_3
{
	r5 = heap32[(fp)];
	r1 = (r4 + r1)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r2;
	memcpy(i7);
	r1 = heap32[(r0+1)];
	r4 = heap32[(r0)];
	r1 = (r1 + r2)|0;
	r5 = 0;
	heap8[r4+r1] = r5;
	r1 = heap32[(r0+1)];
}
	r1 = (r1 + r2)|0;
	heap32[(r0+1)] = r1;
}
	r_g0 = r3;
	return;
}