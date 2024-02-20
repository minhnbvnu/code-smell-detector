function _ZN26btTriangleIndexVertexArray24getLockedVertexIndexBaseEPPhRiR14PHY_ScalarTypeS2_S1_S2_S2_S4_i(sp)
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
	var r9;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+7)];
	r3 = heap32[(fp+9)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = r_g0;
	if(r0 >r3) //_LBB507_2
{
	r0 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	r5 = heap32[(fp+4)];
	r6 = heap32[(fp+5)];
	r7 = heap32[(fp+6)];
	r8 = heap32[(fp+7)];
	r9 = heap32[(fp+8)];
	r3 = r3 << 5;
	r1 = heap32[(r1+8)];
	r1 = (r1 + r3)|0;
	r1 = r1 >> 2;
	r3 = heap32[(r1+3)];
	r2 = r2 >> 2;
	heap32[(r2)] = r3;
	r0 = r0 >> 2;
	r2 = heap32[(r1+4)];
	heap32[(r0)] = r2;
	r0 = r4 >> 2;
	r2 = heap32[(r1+7)];
	heap32[(r0)] = r2;
	r0 = r5 >> 2;
	r2 = heap32[(r1+5)];
	heap32[(r0)] = r2;
	r0 = r8 >> 2;
	r2 = heap32[(r1)];
	heap32[(r0)] = r2;
	r0 = r6 >> 2;
	r2 = heap32[(r1+1)];
	heap32[(r0)] = r2;
	r0 = r7 >> 2;
	r2 = heap32[(r1+2)];
	heap32[(r0)] = r2;
	r0 = r9 >> 2;
	r1 = heap32[(r1+6)];
	heap32[(r0)] = r1;
	return;
}
else{
	r1 = _2E_str367;
	r3 = _2E_str1368;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 41;
	_assert(i7);
}
}