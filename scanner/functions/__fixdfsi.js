function __fixdfsi(sp)
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
	r0 = sp + 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = r0 >>> 20;
	r1 = r1 & 2047;
	r2 = r0 & 1048575;
	r3 = -1;
	r4 = 1;
	r5 = (r1 + -1023)|0;
	r0 = r0 < 0 ? r3 : r4;
	r3 = heap32[(fp)];
	r2 = r2 | 1048576;
	if(uint(r5) >uint(51)) //_LBB843_2
{
	if(r5 <0) //_LBB843_5
{
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	r1 = (r1 + -1075)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	__ashldi3(i7);
}
}
else{
	r5 = 1075;
	r1 = (r5 - r1)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	__lshrdi3(i7);
}
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = r_g1;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r0;
	__muldi3(i7);
	return;
}