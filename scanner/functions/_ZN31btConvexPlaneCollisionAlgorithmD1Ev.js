function _ZN31btConvexPlaneCollisionAlgorithmD1Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV31btConvexPlaneCollisionAlgorithm;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r0 = heapU8[r0+8];
if(!(r0 ==0)) //_LBB309_3
{
	r0 = heap32[(r2+3)];
if(!(r0 ==0)) //_LBB309_3
{
	r1 = heap32[(r2+1)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
}
	return;
}