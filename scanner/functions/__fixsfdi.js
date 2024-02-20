function __fixsfdi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >>> 23;
	r1 = r1 & 255;
	r2 = (r1 + -127)|0;
	if(r2 <0) //_LBB750_5
{
	r0 = 0;
	r_g0 = r0;
	r_g1 = r0;
	return;
}
else{
	r3 = r0 & 8388607;
	r0 = r0 >> 31;
	r3 = r3 | 8388608;
	r4 = 0;
	if(r2 <24) //_LBB750_3
{
	r2 = 150;
	r1 = (r2 - r1)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	__lshrdi3(i7);
	r1 = r_g0;
	r3 = r_g1;
}
else{
	r1 = (r1 + -150)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	__ashldi3(i7);
	r1 = r_g0;
	r3 = r_g1;
}
	r2 = r3 ^ r0;
	r1 = r1 ^ r0;
	r3 = 1;
	r2 = (r2 - r0)|0;
	r3 = uint(r1) < uint(r0) ? r3 : r4;
	r0 = (r1 - r0)|0;
	r1 = (r2 - r3)|0;
	r_g0 = r0;
	r_g1 = r1;
	return;
}
}