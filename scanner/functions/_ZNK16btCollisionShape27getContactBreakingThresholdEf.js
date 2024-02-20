function _ZNK16btCollisionShape27getContactBreakingThresholdEf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	f1 = heapFloat[(fp+1)];
	f0 = f_g0*f1;
	f_g0 = f0;
	return;
}