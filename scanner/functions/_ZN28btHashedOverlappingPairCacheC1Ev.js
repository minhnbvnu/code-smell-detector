function _ZN28btHashedOverlappingPairCacheC1Ev(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV28btHashedOverlappingPairCache;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	r3 = 1;
	heap32[(r2)] = r1;
	heap8[r0+20] = r3;
	heap32[(r2+4)] = 0;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
	r1 = 0;
	heap32[(r2+6)] = 0;
	heap8[r0+28] = r1;
	heap8[r0+48] = r3;
	heap32[(r2+11)] = 0;
	heap32[(r2+9)] = 0;
	heap32[(r2+10)] = 0;
	heap8[r0+68] = r3;
	heap32[(r2+16)] = 0;
	heap32[(r2+14)] = 0;
	r4 = gNumAlignedAllocs;
	heap32[(r2+15)] = 0;
	r4 = r4 >> 2;
	heap32[(r2+18)] = 0;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	heap32[(r4)] = r5;
	heap32[(g0)] = 51;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB141_2
{
	r5 = (r4 + 4)|0;
	r1 = (r1 - r5)|0;
	r1 = r1 & 15;
	r1 = (r4 + r1)|0;
	r5 = (r1 + 4)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r4;
	r4 = r5;
}
	heap8[r0+20] = r3;
	heap32[(r2+4)] = r4;
	heap32[(r2+3)] = 2;
	heap32[(g0)] = r0;
	_ZN28btHashedOverlappingPairCache10growTablesEv(i7);
	return;
}