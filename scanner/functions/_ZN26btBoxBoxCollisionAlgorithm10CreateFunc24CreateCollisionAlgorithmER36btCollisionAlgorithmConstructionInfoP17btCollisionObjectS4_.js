function _ZN26btBoxBoxCollisionAlgorithm10CreateFunc24CreateCollisionAlgorithmER36btCollisionAlgorithmConstructionInfoP17btCollisionObjectS4_(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 16;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = r_g0;
	r2 = _ZTV20btCollisionAlgorithm;
	r3 = r1 >> 2;
	r2 = (r2 + 8)|0;
	heap32[(r3)] = r2;
	r0 = heap32[(r0)];
	r2 = _ZTV26btBoxBoxCollisionAlgorithm;
	r2 = (r2 + 8)|0;
	heap32[(r3+1)] = r0;
	r4 = 0;
	heap32[(r3)] = r2;
	heap8[r1+8] = r4;
	r2 = r0 >> 2;
	heap32[(r3+3)] = 0;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+6)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB340_2
{
	r0 = r1 >> 2;
	r2 = heap32[(r0+1)];
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r3 = 1;
	heap32[(r0+3)] = r_g0;
	heap8[r1+8] = r3;
}
	r_g0 = r1;
	return;
}