function _ZN33btConvexConcaveCollisionAlgorithmD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV33btConvexConcaveCollisionAlgorithm;
	r2 = _ZTV24btConvexTriangleCallback;
	r1 = (r1 + 8)|0;
	r3 = r0 >> 2;
	r2 = (r2 + 8)|0;
	heap32[(r3)] = r1;
	heap32[(r3+3)] = r2;
	r1 = heap32[(r3+15)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+5)];
	r4 = heap32[(r3+19)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = heap32[(r3+15)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	r4 = heap32[(r3+19)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	r1 = _ZTV18btTriangleCallback;
	r4 = _ZTV30btActivatingCollisionAlgorithm;
	r1 = (r1 + 8)|0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = (r4 + 8)|0;
	heap32[(r3+3)] = r1;
	heap32[(r3)] = r2;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}