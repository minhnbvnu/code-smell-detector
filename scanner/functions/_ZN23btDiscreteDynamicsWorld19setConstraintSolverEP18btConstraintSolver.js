function _ZN23btDiscreteDynamicsWorld19setConstraintSolverEP18btConstraintSolver(sp)
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
	r1 = heapU8[r0+245];
if(!(r1 ==0)) //_LBB648_3
{
	r1 = r0 >> 2;
	r1 = heap32[(r1+44)];
if(!(r1 ==0)) //_LBB648_3
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r3 = (r3 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r2)] = r3;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r1 = heap32[(fp+1)];
	r2 = 0;
	r3 = r0 >> 2;
	heap8[r0+245] = r2;
	heap32[(r3+44)] = r1;
	return;
}