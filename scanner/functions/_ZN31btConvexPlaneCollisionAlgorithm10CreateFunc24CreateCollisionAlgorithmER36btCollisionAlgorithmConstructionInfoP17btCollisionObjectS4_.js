function _ZN31btConvexPlaneCollisionAlgorithm10CreateFunc24CreateCollisionAlgorithmER36btCollisionAlgorithmConstructionInfoP17btCollisionObjectS4_(sp)
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
	var r8;
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
	heap32[(g0+1)] = 28;
	r1 = heap32[(fp)];
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
	r3 = r1 >> 2;
	r4 = _ZTV20btCollisionAlgorithm;
	r5 = heap32[(r3+3)];
	r3 = heap32[(r3+2)];
	r1 = heapU8[r1+4];
	r6 = r2 >> 2;
	r4 = (r4 + 8)|0;
	heap32[(r6)] = r4;
	r0 = heap32[(r0)];
	r4 = _ZTV31btConvexPlaneCollisionAlgorithm;
	r4 = (r4 + 8)|0;
	heap32[(r6+1)] = r0;
	r7 = 0;
	heap32[(r6)] = r4;
	r4 = heap32[(fp+2)];
	r8 = heap32[(fp+3)];
	heap8[r2+8] = r7;
	heap32[(r6+3)] = 0;
	if(r1 !=0) //_LBB316_3
{
	r1 = 1;
	r6 = r2 >> 2;
	heap8[r2+16] = r1;
	heap32[(r6+5)] = r3;
	r3 = r0 >> 2;
	heap32[(r6+6)] = r5;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB316_5
{
	r0 = heap32[(r6+1)];
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	heap32[(r6+3)] = r_g0;
	heap8[r2+8] = r1;
}
}
else{
	r1 = r2 >> 2;
	heap8[r2+16] = r7;
	heap32[(r1+5)] = r3;
	r3 = r0 >> 2;
	heap32[(r1+6)] = r5;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r8;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB316_5
{
	r0 = heap32[(r1+1)];
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r8;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = 1;
	heap32[(r1+3)] = r_g0;
	heap8[r2+8] = r3;
}
}
	r_g0 = r2;
	return;
}