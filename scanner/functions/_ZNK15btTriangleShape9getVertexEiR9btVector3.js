function _ZNK15btTriangleShape9getVertexEiR9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r0 = r0 << 4;
	r2 = heap32[(fp+2)];
	r0 = (r1 + r0)|0;
	r1 = r2 >> 2;
	r0 = r0 >> 2;
	heap32[(r1)] = heap32[(r0+13)];
	heap32[(r1+1)] = heap32[(r0+14)];
	heap32[(r1+2)] = heap32[(r0+15)];
	heap32[(r1+3)] = heap32[(r0+16)];
	return;
}