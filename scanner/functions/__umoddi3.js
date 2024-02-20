function __umoddi3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = sp + -8;
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r0;
	__udivmoddi4(i7);
	r0 = r0 >> 2;
	r1 = heap32[(fp+-2)];
	r0 = heap32[(r0+1)];
	r_g0 = r1;
	r_g1 = r0;
	return;
}