function _ZN28btHashedOverlappingPairCache20cleanOverlappingPairER16btBroadphasePairP12btDispatcher(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
if(!(r1 ==0)) //_LBB120_2
{
	r2 = heap32[(fp+2)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = r2 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+13)];
	r3 = heap32[(r0+2)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	heap32[(r0+2)] = 0;
}
	return;
}