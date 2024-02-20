function _ZNK10btBoxShape9getVertexEiR9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >>> 1;
	r2 = heap32[(fp)];
	r2 = r2 >> 2;
	r1 = r1 & 1;
	r3 = r0 >>> 2;
	r0 = r0 & 1;
	r4 = 0;
	f0 =                         1;
	f1 =                         0;
	r3 = r3 & 1;
	r5 = r1 ^ 1;
	f0 = r0 == r4 ? f0 : f1;
	f1 = heapFloat[(r2+7)];
	f2 = r0; //fitos r0, f2
	r0 = heap32[(fp+2)];
	r4 = r3 ^ 1;
	f3 = r5; //fitos r5, f3
	f4 = heapFloat[(r2+8)];
	f5 = r1; //fitos r1, f5
	f6 = heapFloat[(r2+9)];
	f0 = f1*f0;
	f1 = f1*f2;
	f2 = r4; //fitos r4, f2
	f7 = r3; //fitos r3, f7
	r0 = r0 >> 2;
	f3 = f4*f3;
	f4 = f4*f5;
	f0 = f0-f1;
	f1 = f6*f2;
	f2 = f6*f7;
	f3 = f3-f4;
	heapFloat[(r0)] = f0;
	f0 = f1-f2;
	heapFloat[(r0+1)] = f3;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
}