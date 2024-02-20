function _ZThn4_N17DebugDrawcallbackD0Ev(sp)
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
	r1 = _ZTV17DebugDrawcallback;
	r2 = r0 >> 2;
	r3 = (r1 + 8)|0;
	r4 = _ZTV31btInternalTriangleIndexCallback;
	r1 = (r1 + 32)|0;
	heap32[(r2+-1)] = r3;
	r3 = _ZTV18btTriangleCallback;
	r4 = (r4 + 8)|0;
	heap32[(r2)] = r1;
	r1 = (r3 + 8)|0;
	heap32[(r2)] = r4;
	heap32[(r2+-1)] = r1;
	r0 = (r0 + -4)|0;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}