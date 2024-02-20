function __lshrdi3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r2 = r0 & 32;
	if(r2 ==0) //_LBB749_2
{
	r2 = heap32[(fp)];
if(!(r0 ==0)) //_LBB749_4
{
	r3 = 32;
	r3 = (r3 - r0)|0;
	r3 = r1 << r3;
	r2 = r2 >>> r0;
	r2 = r3 | r2;
	r1 = r1 >>> r0;
}
	r_g0 = r2;
	r_g1 = r1;
	return;
}
else{
	r0 = (r0 + -32)|0;
	r0 = r1 >>> r0;
	r1 = 0;
	r_g0 = r0;
	r_g1 = r1;
	return;
}
}