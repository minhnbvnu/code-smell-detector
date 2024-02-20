function _ZN28btCompoundCollisionAlgorithm10CreateFunc24CreateCollisionAlgorithmER36btCollisionAlgorithmConstructionInfoP17btCollisionObjectS4_(sp)
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
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 44;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = r_g0;
	r2 = _ZTV20btCollisionAlgorithm;
	r3 = r1 >> 2;
	r2 = (r2 + 8)|0;
	heap32[(r3)] = r2;
	r2 = heap32[(r0)];
	r4 = _ZTV28btCompoundCollisionAlgorithm;
	r4 = (r4 + 8)|0;
	heap32[(r3+1)] = r2;
	r2 = 1;
	heap32[(r3)] = r4;
	heap8[r1+24] = r2;
	heap32[(r3+5)] = 0;
	heap32[(r3+3)] = 0;
	r2 = 0;
	heap32[(r3+4)] = 0;
	heap8[r1+28] = r2;
	r0 = heap32[(r0+1)];
	r4 = heap32[(fp+2)];
	heap32[(r3+8)] = r0;
	r0 = r4 >> 2;
	heap8[r1+36] = r2;
	r0 = heap32[(r0+48)];
	r0 = r0 >> 2;
	r2 = heap32[(r0+1)];
	if(r2 ==31) //_LBB325_2
{
	r2 = heap32[(fp+3)];
	r3 = r1 >> 2;
	r0 = heap32[(r0+17)];
	heap32[(r3+10)] = r0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r2;
	_ZN28btCompoundCollisionAlgorithm26preallocateChildAlgorithmsEP17btCollisionObjectS1_(i7);
	r_g0 = r1;
	return;
}
else{
	r0 = _2E_str99;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 32;
	_assert(i7);
}
}