function _ZN10CFileCloud6fcloseEv(sp)
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
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+5];
if(!(r1 ==0)) //_LBB788_2
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+5)];
	r3 = r2 << 1;
	heap32[(g0)] = r3;
	malloc(i7);
	r4 = r_g0;
	r1 = heap32[(r1+6)];
	r5 = sp + -4;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r5;
	_ZN12mandreel_b64L11b64_encode_EPKhjPcjjPNS_6B64_RCE(i7);
	r2 = (r0 + 28)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r_g0;
	mandreel_writecloud(i7);
	heap32[(g0)] = r4;
	free(i7);
}
	r1 = 0;
	r2 = r0 >> 2;
	heap8[r0+4] = r1;
	r0 = heap32[(r2+6)];
	heap32[(g0)] = r0;
	free(i7);
	r_g0 = r1;
	return;
}