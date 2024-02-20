function __fixunsdfsi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = sp + 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = r0 >>> 20;
	r1 = r1 & 2047;
	r2 = (r1 + -1023)|0;
if(!(r2 <0)) //_LBB847_3
{
if(!(r0 <0)) //_LBB847_3
{
	r2 = heap32[(fp)];
	r2 = r2 >>> 21;
	r0 = r0 << 11;
	r0 = r2 | r0;
	r2 = 1054;
	r0 = r0 | -2147483648;
	r1 = (r2 - r1)|0;
	r0 = r0 >>> r1;
	r_g0 = r0;
	return;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}