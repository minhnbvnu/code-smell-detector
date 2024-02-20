function _ZN16btEmptyAlgorithm10CreateFunc24CreateCollisionAlgorithmER36btCollisionAlgorithmConstructionInfoP17btCollisionObjectS4_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 8;
	r1 = _ZTV20btCollisionAlgorithm;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r3 = r_g0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r3)] = r1;
	r0 = heap32[(r0)];
	r1 = _ZTV16btEmptyAlgorithm;
	r1 = (r1 + 8)|0;
	heap32[(r3+1)] = r0;
	heap32[(r3)] = r1;
	return;
}