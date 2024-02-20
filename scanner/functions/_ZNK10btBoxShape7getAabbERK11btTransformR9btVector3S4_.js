function _ZNK10btBoxShape7getAabbERK11btTransformR9btVector3S4_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f1 = heapFloat[(r1+7)];
	f2 = heapFloat[(r1+8)];
	f3 = heapFloat[(r1+9)];
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	heapFloat[(g0)] = f1;
	heapFloat[(g0+1)] = f2;
	heapFloat[(g0+2)] = f3;
	heapFloat[(g0+3)] = f_g0;
	heap32[(g0+4)] = r0;
	heap32[(g0+5)] = r1;
	heap32[(g0+6)] = r2;
	_Z15btTransformAabbRK9btVector3fRK11btTransformRS_S5_(i7);
	return;
}