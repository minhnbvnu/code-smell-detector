function _ZN23btCollisionPairCallback14processOverlapER16btBroadphasePair(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
	r2 = r1 >> 2;
	r2 = heap32[(r2+47)];
	r0 = heap32[(r0+1)];
	r3 = heap32[(fp+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = 0;
	r_g0 = r0;
	return;
}