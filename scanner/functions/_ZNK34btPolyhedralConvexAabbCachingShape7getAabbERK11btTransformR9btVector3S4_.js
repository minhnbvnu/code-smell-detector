function _ZNK34btPolyhedralConvexAabbCachingShape7getAabbERK11btTransformR9btVector3S4_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	f0 = f_g0;
	r1 = heapU8[r0+84];
	if(r1 !=0) //_LBB474_2
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = (r0 + 52)|0;
	r0 = (r0 + 68)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	heapFloat[(g0+2)] = f0;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r2;
	heap32[(g0+5)] = r3;
	_Z15btTransformAabbRK9btVector3S1_fRK11btTransformRS_S5_(i7);
	return;
}
else{
	r0 = _2E_str6232;
	r1 = _2E_str7331;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 86;
	_assert(i7);
}
}