function __forceSuperLink(sp)
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
	var r7;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	__mandreel_internal_init(i7);
	r0 = sp + -8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r1 = _ZGVZ21Mandreel_GetTickCountE7s_first;
	gettimeofday(i7);
	r2 = heapU8[r1];
if(!(r2 !=0)) //_LBB823_2
{
	r2 = heap32[(fp+-2)];
	r3 = r2 >> 31;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 1000000;
	heap32[(g0+3)] = 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	__muldi3(i7);
	r4 = 1;
	r5 = (r_g0 + r0)|0;
	r6 = 0;
	r7 = r0 >> 31;
	r2 = uint(r5) < uint(r_g0) ? r4 : r6;
	r6 = _ZZ21Mandreel_GetTickCountE7s_first;
	r3 = (r_g1 + r7)|0;
	r0 = uint(r5) < uint(r0) ? r4 : r2;
	r2 = r6 >> 2;
	r0 = (r3 + r0)|0;
	heap32[(r2)] = r5;
	heap32[(r2+1)] = r0;
	heap8[r1] = r4;
}
	r0 = _ZZ29__mandreel_internal_preupdateE8s_bfirst_2E_b;
	r1 = heapU8[r0];
if(!(r1 != 0)) //_LBB823_4
{
	r1 = 1;
	heap8[r0] = r1;
}
	return;
}