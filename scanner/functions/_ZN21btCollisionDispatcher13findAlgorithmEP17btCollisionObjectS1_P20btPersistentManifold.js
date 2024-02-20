function _ZN21btCollisionDispatcher13findAlgorithmEP17btCollisionObjectS1_P20btPersistentManifold(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = sp + -8;
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = r0 >> 2;
	r4 = heap32[(fp+3)];
	heap32[(fp+-2)] = r1;
	r5 = heap32[(fp+2)];
	r6 = r2 >> 2;
	heap32[(r3+1)] = r4;
	r3 = heap32[(r6+48)];
	r4 = r5 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r4+48)];
	r3 = heap32[(r3+1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+1)];
	r3 = (r3 * 144)|0;
	r1 = (r1 + r3)|0;
	r3 = r4 << 2;
	r1 = (r1 + r3)|0;
	r1 = r1 >> 2;
	r1 = heap32[(r1+50)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+2)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	return;
}