function _ZNK16btCollisionShape20getAngularMotionDiscEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+3)];
	r2 = sp + -16;
	r3 = sp + -20;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = r2 >> 2;
	f0 = heapFloat[(fp+-4)];
	f1 = heapFloat[(r0+1)];
	f2 = heapFloat[(r0+2)];
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 = heapFloat[(fp+-5)];
	f0 = f_g0+f1;
	f_g0 = f0;
	return;
}