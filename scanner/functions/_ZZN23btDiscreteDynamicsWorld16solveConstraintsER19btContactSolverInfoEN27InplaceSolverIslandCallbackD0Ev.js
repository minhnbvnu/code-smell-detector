function _ZZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoEN27InplaceSolverIslandCallbackD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTVZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoE27InplaceSolverIslandCallback;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+21)];
if(!(r1 ==0)) //_LBB644_4
{
	r3 = heapU8[r0+88];
if(!(r3 ==0)) //_LBB644_3
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
	heap32[(r2+21)] = 0;
}
	r1 = 1;
	heap8[r0+88] = r1;
	heap32[(r2+21)] = 0;
	heap32[(r2+19)] = 0;
	heap32[(r2+20)] = 0;
	r3 = heap32[(r2+16)];
if(!(r3 ==0)) //_LBB644_8
{
	r4 = heapU8[r0+68];
if(!(r4 ==0)) //_LBB644_7
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r2+16)] = 0;
}
	heap8[r0+68] = r1;
	heap32[(r2+16)] = 0;
	heap32[(r2+14)] = 0;
	heap32[(r2+15)] = 0;
	r3 = heap32[(r2+11)];
if(!(r3 ==0)) //_LBB644_12
{
	r4 = heapU8[r0+48];
if(!(r4 ==0)) //_LBB644_11
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r2+11)] = 0;
}
	heap8[r0+48] = r1;
	heap32[(r2+11)] = 0;
	heap32[(r2+9)] = 0;
	heap32[(r2+10)] = 0;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}