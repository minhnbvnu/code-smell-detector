function _ZZN28btHashedOverlappingPairCache37removeOverlappingPairsContainingProxyEP17btBroadphaseProxyP12btDispatcherEN18RemovePairCallback14processOverlapER16btBroadphasePair(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	r0 = heap32[(r0+1)];
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	if(r2 ==r0) //_LBB126_2
{
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	r1 = heap32[(r1+1)];
	r0 = r1 == r0;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
}