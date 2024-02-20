function _ZNK23btDiscreteDynamicsWorld10getGravityEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	heap32[(r0)] = heap32[(r1+56)];
	heap32[(r0+1)] = heap32[(r1+57)];
	heap32[(r0+2)] = heap32[(r1+58)];
	heap32[(r0+3)] = heap32[(r1+59)];
	return;
}