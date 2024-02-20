function _ZN28btHashedOverlappingPairCache19cleanProxyFromPairsEP17btBroadphaseProxyP12btDispatcher(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = _ZTVZN28btHashedOverlappingPairCache19cleanProxyFromPairsEP17btBroadphaseProxyP12btDispatcherE17CleanPairCallback;
	r1 = sp + -16;
	r0 = (r0 + 8)|0;
	r2 = r1 >> 2;
	r3 = heap32[(fp+1)];
	heap32[(fp+-4)] = r0;
	r0 = heap32[(fp)];
	heap32[(r2+1)] = r3;
	r3 = heap32[(fp+2)];
	heap32[(r2+2)] = r0;
	r4 = r0 >> 2;
	heap32[(r2+3)] = r3;
	r2 = heap32[(r4)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	return;
}