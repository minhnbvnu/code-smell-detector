function _ZN21btCollisionDispatcher22freeCollisionAlgorithmEPv(sp)
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
	r0 = heap32[(fp+1)];
if(!(r0 ==0)) //_LBB176_5
{
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+48)];
	r1 = r1 >> 2;
	r2 = heap32[(r1+4)];
if(!(uint(r2) >uint(r0))) //_LBB176_4
{
	r3 = heap32[(r1)];
	r4 = heap32[(r1+1)];
	r3 = (r3 * r4)|0;
	r2 = (r2 + r3)|0;
if(!(uint(r2) <=uint(r0))) //_LBB176_4
{
	r2 = r0 >> 2;
	r3 = heap32[(r1+3)];
	heap32[(r2)] = r3;
	heap32[(r1+3)] = r0;
	r0 = heap32[(r1+2)];
	r0 = (r0 + 1)|0;
	heap32[(r1+2)] = r0;
	return;
}
}
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	return;
}