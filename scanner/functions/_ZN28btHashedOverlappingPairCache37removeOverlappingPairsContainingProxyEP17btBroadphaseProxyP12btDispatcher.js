function _ZN28btHashedOverlappingPairCache37removeOverlappingPairsContainingProxyEP17btBroadphaseProxyP12btDispatcher(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = _ZTVZN28btHashedOverlappingPairCache37removeOverlappingPairsContainingProxyEP17btBroadphaseProxyP12btDispatcherE18RemovePairCallback;
	r1 = sp + -8;
	r0 = (r0 + 8)|0;
	r2 = heap32[(fp)];
	r3 = r1 >> 2;
	r4 = heap32[(fp+1)];
	heap32[(fp+-2)] = r0;
	r0 = r2 >> 2;
	heap32[(r3+1)] = r4;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+12)];
	r3 = heap32[(fp+2)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
}