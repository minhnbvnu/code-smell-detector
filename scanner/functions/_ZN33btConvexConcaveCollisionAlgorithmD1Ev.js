function _ZN33btConvexConcaveCollisionAlgorithmD1Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV33btConvexConcaveCollisionAlgorithm;
	r2 = _ZTV24btConvexTriangleCallback;
	r0 = r0 >> 2;
	r1 = (r1 + 8)|0;
	r2 = (r2 + 8)|0;
	heap32[(r0)] = r1;
	heap32[(r0+3)] = r2;
	r1 = heap32[(r0+15)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+5)];
	r3 = heap32[(r0+19)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = heap32[(r0+15)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	r3 = heap32[(r0+19)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	r1 = _ZTV18btTriangleCallback;
	r3 = _ZTV30btActivatingCollisionAlgorithm;
	r1 = (r1 + 8)|0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = (r3 + 8)|0;
	heap32[(r0+3)] = r1;
	heap32[(r0)] = r2;
	return;
}