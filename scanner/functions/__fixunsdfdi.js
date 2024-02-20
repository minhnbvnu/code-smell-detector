function __fixunsdfdi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = sp + 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = r0 >>> 20;
	r1 = r1 & 2047;
	r2 = (r1 + -1023)|0;
if(!(r2 <0)) //_LBB753_5
{
if(!(r0 <0)) //_LBB753_5
{
	r3 = heap32[(fp)];
	r0 = r0 & 1048575;
	r0 = r0 | 1048576;
	if(r2 <53) //_LBB753_4
{
	r2 = 1075;
	r1 = (r2 - r1)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	__lshrdi3(i7);
	return;
}
else{
	r1 = (r1 + -1075)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	__ashldi3(i7);
	return;
}
}
}
	r0 = 0;
	r_g0 = r0;
	r_g1 = r0;
	return;
}