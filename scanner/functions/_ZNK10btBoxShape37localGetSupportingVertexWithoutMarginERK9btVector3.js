function _ZNK10btBoxShape37localGetSupportingVertexWithoutMarginERK9btVector3(sp)
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
	var f6;
	var f7;
	var f8;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+2)];
	r1 = r1 >> 2;
	f0 = heapFloat[(r0+7)];
	r2 = heap32[(fp)];
	f1 = heapFloat[(r0+9)];
	f2 = heapFloat[(r0+8)];
	f3 =                         0;
	f4 = -f0;
	f5 = heapFloat[(r1)];
	f6 = heapFloat[(r1+2)];
	f7 = heapFloat[(r1+1)];
	f8 = -f2;
	r0 = r2 >> 2;
	f0 = f5 < f3 ? f4 : f0;
	f4 = -f1;
	f2 = f7 < f3 ? f8 : f2;
	heapFloat[(r0)] = f0;
	f0 = f6 < f3 ? f4 : f1;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
}