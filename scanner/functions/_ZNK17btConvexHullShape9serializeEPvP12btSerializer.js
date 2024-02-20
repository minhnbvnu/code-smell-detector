function _ZNK17btConvexHullShape9serializeEPvP12btSerializer(sp)
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
	i7 = sp + -24;var g0 = i7>>2; // save stack
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
if(!(r4 ==0)) //_LBB451_2
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+12)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
	r2 = r3 >> 2;
	r3 = heap32[(r2+1)];
	heap32[(r5+1)] = r3;
	heap32[(r5+7)] = heap32[(r2+7)];
	heap32[(r5+8)] = heap32[(r2+8)];
	heap32[(r5+9)] = heap32[(r2+9)];
	heap32[(r5+10)] = heap32[(r2+10)];
	heap32[(r5+3)] = heap32[(r2+3)];
	heap32[(r5+4)] = heap32[(r2+4)];
	heap32[(r5+5)] = heap32[(r2+5)];
	heap32[(r5+6)] = heap32[(r2+6)];
	heap32[(r5+11)] = heap32[(r2+11)];
	r3 = heap32[(r2+23)];
	heap32[(r5+15)] = r3;
	if(r3 ==0) //_LBB451_7
{
	heap32[(r5+13)] = 0;
	heap32[(r5+14)] = 0;
	r0 = _2E_str6224;
	r_g0 = r0;
	return;
}
else{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	r6 = heap32[(r2+25)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	heap32[(r5+13)] = r_g0;
	heap32[(r5+14)] = 0;
	r5 = heap32[(r1)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+4)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 16;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r5 = r_g0;
if(!(r3 <1)) //_LBB451_6
{
	r4 = r5 >> 2;
	r4 = heap32[(r4+2)];
	r6 = 0;
_9: while(true){
	r7 = r6 << 4;
	r8 = heap32[(r2+25)];
	r9 = (r4 + r7)|0;
	r7 = (r8 + r7)|0;
	r8 = r9 >> 2;
	r7 = r7 >> 2;
	heap32[(r8)] = heap32[(r7)];
	heap32[(r8+1)] = heap32[(r7+1)];
	r6 = (r6 + 1)|0;
	heap32[(r8+2)] = heap32[(r7+2)];
	heap32[(r8+3)] = heap32[(r7+3)];
if(!(r3 !=r6)) //_LBB451_5
{
break _9;
}
}
}
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	r2 = heap32[(r2+25)];
	r3 = _2E_str5223;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r5 = _2E_str6224;
	r_g0 = r5;
	return;
}
}