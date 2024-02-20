function _ZN34btSphereTriangleCollisionAlgorithm10CreateFunc24CreateCollisionAlgorithmER36btCollisionAlgorithmConstructionInfoP17btCollisionObjectS4_(sp)
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
	heap32[(g0+1)] = 20;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = r_g0;
	r2 = heap32[(fp)];
	r3 = _ZTV20btCollisionAlgorithm;
	r4 = heap32[(r0+1)];
	r2 = heapU8[r2+4];
	r5 = r1 >> 2;
	r3 = (r3 + 8)|0;
	heap32[(r5)] = r3;
	r0 = heap32[(r0)];
	r3 = _ZTV34btSphereTriangleCollisionAlgorithm;
	r3 = (r3 + 8)|0;
	heap32[(r5+1)] = r0;
	r6 = 0;
	heap32[(r5)] = r3;
	heap8[r1+8] = r6;
	heap32[(r5+3)] = r4;
	heap8[r1+16] = r2;
if(!(r4 !=0)) //_LBB337_2
{
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = r0 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	r0 = r1 >> 2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = 1;
	heap32[(r0+3)] = r_g0;
	heap8[r1+8] = r3;
}
	r_g0 = r1;
	return;
}