function _ZN16btDbvtBroadphase7rayTestERK9btVector3S2_R23btBroadphaseRayCallbackS2_S2_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
	var r7;
	var r8;
	var f0;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = _ZTV19BroadphaseRayTester;
	r1 = sp + -8;
	r0 = (r0 + 8)|0;
	r2 = heap32[(fp+3)];
	r3 = heap32[(fp)];
	r4 = r1 >> 2;
	heap32[(fp+-2)] = r0;
	heap32[(r4+1)] = r2;
	r0 = r2 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r0+8)];
	r4 = heap32[(r3+1)];
	r5 = heap32[(fp+1)];
	r6 = (r2 + 4)|0;
	r2 = (r2 + 20)|0;
	r7 = heap32[(fp+4)];
	r8 = heap32[(fp+5)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r2;
	heapFloat[(g0+4)] = f0;
	heap32[(g0+5)] = r7;
	heap32[(g0+6)] = r8;
	heap32[(g0+7)] = r1;
	_ZNK6btDbvt15rayTestInternalEPK10btDbvtNodeRK9btVector3S5_S5_PjfS5_S5_RNS_8ICollideE(i7);
	f0 = heapFloat[(r0+8)];
	r0 = heap32[(r3+11)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r2;
	heapFloat[(g0+4)] = f0;
	heap32[(g0+5)] = r7;
	heap32[(g0+6)] = r8;
	heap32[(g0+7)] = r1;
	_ZNK6btDbvt15rayTestInternalEPK10btDbvtNodeRK9btVector3S5_S5_PjfS5_S5_RNS_8ICollideE(i7);
	return;
}