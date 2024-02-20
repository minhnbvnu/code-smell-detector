function _ZN16btDbvtBroadphase8aabbTestERK9btVector3S2_R24btBroadphaseAabbCallback(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -56;var g0 = i7>>2; // save stack
	r0 = _ZTV20BroadphaseAabbTester;
	r1 = sp + -8;
	r0 = (r0 + 8)|0;
	r2 = heap32[(fp+1)];
	r3 = r1 >> 2;
	r4 = heap32[(fp+3)];
	heap32[(fp+-2)] = r0;
	r0 = sp + -40;
	r2 = r2 >> 2;
	heap32[(r3+1)] = r4;
	r3 = r0 >> 2;
	heap32[(fp+-10)] = heap32[(r2)];
	heap32[(r3+1)] = heap32[(r2+1)];
	r4 = heap32[(fp+2)];
	heap32[(r3+2)] = heap32[(r2+2)];
	r4 = r4 >> 2;
	heap32[(r3+3)] = heap32[(r2+3)];
	heap32[(r3+4)] = heap32[(r4)];
	heap32[(r3+5)] = heap32[(r4+1)];
	r2 = heap32[(fp)];
	heap32[(r3+6)] = heap32[(r4+2)];
	r2 = r2 >> 2;
	heap32[(r3+7)] = heap32[(r4+3)];
	r3 = heap32[(r2+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	_ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(i7);
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	_ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(i7);
	return;
}