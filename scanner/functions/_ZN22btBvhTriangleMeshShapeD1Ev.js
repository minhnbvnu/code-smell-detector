function _ZN22btBvhTriangleMeshShapeD1Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV22btBvhTriangleMeshShape;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r0 = heapU8[r0+61];
if(!(r0 ==0)) //_LBB414_3
{
	r0 = heap32[(r2+13)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+13)];
if(!(r0 ==0)) //_LBB414_3
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	r0 = _ZTV14btConcaveShape;
	r0 = (r0 + 8)|0;
	heap32[(r2)] = r0;
	return;
}