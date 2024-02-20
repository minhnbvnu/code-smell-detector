function _ZN21btCollisionDispatcherD0Ev(sp)
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
	r1 = _ZTV21btCollisionDispatcher;
	r2 = _ZTV16btManifoldResult;
	r3 = r0 >> 2;
	r1 = (r1 + 8)|0;
	r2 = (r2 + 8)|0;
	heap32[(r3)] = r1;
	heap32[(r3+7)] = r2;
	r1 = heap32[(r3+5)];
if(!(r1 ==0)) //_LBB179_4
{
	r2 = heapU8[r0+24];
if(!(r2 ==0)) //_LBB179_3
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r4 = heap32[(r2)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r2)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r3+5)] = 0;
}
	r1 = 1;
	heap8[r0+24] = r1;
	heap32[(r3+5)] = 0;
	r1 = _ZTV12btDispatcher;
	heap32[(r3+3)] = 0;
	r1 = (r1 + 8)|0;
	heap32[(r3+4)] = 0;
	heap32[(r3)] = r1;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}