function _ZN7CFileLS6fflushEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+5];
if(!(r1 ==0)) //_LBB784_2
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+5)];
	r1 = heap32[(r1+6)];
	r0 = (r0 + 28)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	mandreel_writels(i7);
}
	r0 = 0;
	r_g0 = r0;
	return;
}