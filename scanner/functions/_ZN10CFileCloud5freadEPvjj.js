function _ZN10CFileCloud5freadEPvjj(sp)
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
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	r3 = heap32[(r0+4)];
	r4 = heap32[(r0+2)];
	r2 = (r2 * r1)|0;
	r5 = (r3 + r2)|0;
	r6 = (r4 - r3)|0;
	r2 = r5 > r4 ? r6 : r2;
	if(r2 <0) //_LBB777_2
{
	r0 = -1;
	r_g0 = r0;
	return;
}
else{
	r4 = heap32[(fp+1)];
	r5 = heap32[(r0+6)];
	r3 = (r5 + r3)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r2;
	memcpy(i7);
	r3 = heap32[(r0+4)];
	r3 = (r3 + r2)|0;
	heap32[(r0+4)] = r3;
	r0 = Math.floor(uint(r2) /uint(r1));
	r_g0 = r0;
	return;
}
}