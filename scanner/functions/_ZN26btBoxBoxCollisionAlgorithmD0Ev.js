function _ZN26btBoxBoxCollisionAlgorithmD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV26btBoxBoxCollisionAlgorithm;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heapU8[r0+8];
if(!(r1 ==0)) //_LBB162_3
{
	r1 = heap32[(r2+3)];
if(!(r1 ==0)) //_LBB162_3
{
	r3 = heap32[(r2+1)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
}
	r1 = _ZTV30btActivatingCollisionAlgorithm;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}