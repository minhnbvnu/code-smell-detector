function _ZN13btSphereShapeD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV13btConvexShape;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
if(!(r0 ==0)) //_LBB483_2
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