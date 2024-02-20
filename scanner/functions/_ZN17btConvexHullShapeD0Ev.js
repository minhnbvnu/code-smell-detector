function _ZN17btConvexHullShapeD0Ev(sp)
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
	r1 = _ZTV17btConvexHullShape;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+25)];
if(!(r1 ==0)) //_LBB448_4
{
	r3 = heapU8[r0+104];
if(!(r3 ==0)) //_LBB448_3
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r2+25)] = 0;
}
	r1 = 1;
	heap8[r0+104] = r1;
	heap32[(r2+25)] = 0;
	r1 = _ZTV13btConvexShape;
	heap32[(r2+23)] = 0;
	r1 = (r1 + 8)|0;
	heap32[(r2+24)] = 0;
	heap32[(r2)] = r1;
if(!(r0 ==0)) //_LBB448_6
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	return;
}