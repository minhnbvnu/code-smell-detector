function _ZN10CFileCloud6fwriteEPKvjj(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+3)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+1)];
	r2 = (r1 * r2)|0;
	r4 = heap32[(r0+4)];
	r5 = (r4 + r2)|0;
	r6 = heap32[(r0+3)];
	if(r5 >r6) //_LBB786_2
{
	r4 = (r2 + r4)|0;
	r4 = (r4 + 131072)|0;
	heap32[(r0+3)] = r4;
	r5 = heap32[(r0+6)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	realloc(i7);
	r5 = r_g0;
	heap32[(r0+6)] = r5;
	r4 = heap32[(r0+4)];
}
else{
	r5 = heap32[(r0+6)];
}
	r4 = (r5 + r4)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r2;
	memcpy(i7);
	r3 = heap32[(r0+4)];
	r2 = (r3 + r2)|0;
	heap32[(r0+4)] = r2;
	r3 = heap32[(r0+5)];
if(!(r2 <=r3)) //_LBB786_5
{
	heap32[(r0+5)] = r2;
}
	r_g0 = r1;
	return;
}