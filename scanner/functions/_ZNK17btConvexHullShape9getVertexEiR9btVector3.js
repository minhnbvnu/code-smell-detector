function _ZNK17btConvexHullShape9getVertexEiR9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	r2 = heap32[(r0+25)];
	r1 = r1 << 4;
	r1 = (r2 + r1)|0;
	r1 = r1 >> 2;
	r2 = heap32[(fp+2)];
	f0 = heapFloat[(r1+2)];
	f1 = heapFloat[(r0+5)];
	f2 = heapFloat[(r1+1)];
	f3 = heapFloat[(r0+4)];
	f4 = heapFloat[(r1)];
	f5 = heapFloat[(r0+3)];
	r0 = r2 >> 2;
	f4 = f4*f5;
	f2 = f2*f3;
	heapFloat[(r0)] = f4;
	f0 = f0*f1;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
}