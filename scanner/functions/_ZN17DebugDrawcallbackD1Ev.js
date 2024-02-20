function _ZN17DebugDrawcallbackD1Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = _ZTV17DebugDrawcallback;
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r2 = (r0 + 8)|0;
	r3 = _ZTV31btInternalTriangleIndexCallback;
	r0 = (r0 + 32)|0;
	heap32[(r1)] = r2;
	r2 = _ZTV18btTriangleCallback;
	r3 = (r3 + 8)|0;
	heap32[(r1+1)] = r0;
	r0 = (r2 + 8)|0;
	heap32[(r1+1)] = r3;
	heap32[(r1)] = r0;
	return;
}