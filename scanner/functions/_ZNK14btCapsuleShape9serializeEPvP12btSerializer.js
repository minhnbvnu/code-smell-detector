function _ZNK14btCapsuleShape9serializeEPvP12btSerializer(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+10)];
	r3 = heap32[(fp)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	r5 = heap32[(fp+1)];
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
	r5 = r5 >> 2;
	heap32[(r5)] = r4;
if(!(r4 ==0)) //_LBB423_2
{
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+12)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	r0 = r3 >> 2;
	r1 = heap32[(r0+1)];
	heap32[(r5+1)] = r1;
	heap32[(r5+7)] = heap32[(r0+7)];
	heap32[(r5+8)] = heap32[(r0+8)];
	heap32[(r5+9)] = heap32[(r0+9)];
	heap32[(r5+10)] = heap32[(r0+10)];
	heap32[(r5+3)] = heap32[(r0+3)];
	heap32[(r5+4)] = heap32[(r0+4)];
	heap32[(r5+5)] = heap32[(r0+5)];
	heap32[(r5+6)] = heap32[(r0+6)];
	heap32[(r5+11)] = heap32[(r0+11)];
	r0 = heap32[(r0+13)];
	heap32[(r5+13)] = r0;
	r0 = _2E_str6199;
	r_g0 = r0;
	return;
}