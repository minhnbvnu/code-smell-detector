function _ZNK26btTriangleIndexVertexArray14setPremadeAabbERK9btVector3S2_(sp)
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
	heap32[(r0+13)] = heap32[(r1)];
	heap32[(r0+14)] = heap32[(r1+1)];
	r2 = heap32[(fp+2)];
	heap32[(r0+15)] = heap32[(r1+2)];
	r2 = r2 >> 2;
	heap32[(r0+16)] = heap32[(r1+3)];
	heap32[(r0+17)] = heap32[(r2)];
	heap32[(r0+18)] = heap32[(r2+1)];
	heap32[(r0+19)] = heap32[(r2+2)];
	heap32[(r0+20)] = heap32[(r2+3)];
	heap32[(r0+12)] = 1;
	return;
}