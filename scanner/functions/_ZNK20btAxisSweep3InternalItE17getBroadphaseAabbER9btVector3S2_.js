function _ZNK20btAxisSweep3InternalItE17getBroadphaseAabbER9btVector3S2_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	heap32[(r1)] = heap32[(r0+2)];
	heap32[(r1+1)] = heap32[(r0+3)];
	r2 = heap32[(fp+2)];
	heap32[(r1+2)] = heap32[(r0+4)];
	r2 = r2 >> 2;
	heap32[(r1+3)] = heap32[(r0+5)];
	heap32[(r2)] = heap32[(r0+6)];
	heap32[(r2+1)] = heap32[(r0+7)];
	heap32[(r2+2)] = heap32[(r0+8)];
	heap32[(r2+3)] = heap32[(r0+9)];
	return;
}