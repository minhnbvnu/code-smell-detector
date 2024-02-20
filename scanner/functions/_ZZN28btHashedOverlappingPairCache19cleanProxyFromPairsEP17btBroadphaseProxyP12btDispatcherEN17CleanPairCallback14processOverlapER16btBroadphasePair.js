function _ZZN28btHashedOverlappingPairCache19cleanProxyFromPairsEP17btBroadphaseProxyP12btDispatcherEN17CleanPairCallback14processOverlapER16btBroadphasePair(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	r2 = heap32[(r0+1)];
	r3 = r1 >> 2;
	r4 = heap32[(r3)];
	if(r4 ==r2) //_LBB123_2
{
__label__ = 2;
}
else{
	r3 = heap32[(r3+1)];
	if(r3 !=r2) //_LBB123_3
{
__label__ = 3;
}
else{
__label__ = 2;
}
}
if (__label__ == 2){
	r2 = heap32[(r0+2)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+8)];
	r0 = heap32[(r0+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	r0 = 0;
	r_g0 = r0;
	return;
}