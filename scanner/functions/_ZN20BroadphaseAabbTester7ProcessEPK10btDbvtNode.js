function _ZN20BroadphaseAabbTester7ProcessEPK10btDbvtNode(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+1)];
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r2 = r2 >> 2;
	r1 = heap32[(r1+2)];
	r2 = heap32[(r2+9)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}