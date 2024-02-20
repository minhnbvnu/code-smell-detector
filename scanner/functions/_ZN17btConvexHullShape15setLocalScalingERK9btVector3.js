function _ZN17btConvexHullShape15setLocalScalingERK9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = r0 >> 2;
	r1 = r1 >> 2;
	heap32[(r2+3)] = heap32[(r1)];
	heap32[(r2+4)] = heap32[(r1+1)];
	heap32[(r2+5)] = heap32[(r1+2)];
	heap32[(r2+6)] = heap32[(r1+3)];
	heap32[(g0)] = r0;
	_ZN34btPolyhedralConvexAabbCachingShape15recalcLocalAabbEv(i7);
	return;
}