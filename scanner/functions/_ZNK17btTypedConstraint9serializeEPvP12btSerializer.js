function _ZNK17btTypedConstraint9serializeEPvP12btSerializer(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = r0 >> 2;
	r2 = heap32[(fp)];
	r3 = heap32[(r1)];
	r3 = r3 >> 2;
	r4 = r2 >> 2;
	r3 = heap32[(r3+7)];
	r5 = heap32[(r4+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	r5 = heap32[(fp+1)];
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r5 = r5 >> 2;
	heap32[(r5)] = r_g0;
	r3 = heap32[(r1)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+7)];
	r6 = heap32[(r4+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	heap32[(r5+1)] = r_g0;
	r3 = heap32[(r1)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+10)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = r_g0;
	r6 = heap32[(r1)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+7)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0;
	heap32[(r5+2)] = r6;
if(!(r6 ==0)) //_LBB615_2
{
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+12)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	r0 = heap32[(r4+1)];
	heap32[(r5+3)] = r0;
	r0 = heapU8[r2+16];
	heap32[(r5+6)] = r0;
	r0 = heap32[(r4+3)];
	heap32[(r5+5)] = r0;
	r0 = heap32[(r4+2)];
	heap32[(r5+4)] = r0;
	heap32[(r5+7)] = heap32[(r4+7)];
	heap32[(r5+8)] = heap32[(r4+8)];
	heap32[(r5+9)] = 0;
	r0 = heap32[(r4+5)];
	r1 = r0 >> 2;
	r1 = heap32[(r1+120)];
if(!(r1 <1)) //_LBB615_7
{
	r1 = 0;
_6: while(true){
	r0 = r0 >> 2;
	r0 = heap32[(r0+122)];
	r3 = r1 << 2;
	r0 = (r0 + r3)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
if(!(r0 !=r2)) //_LBB615_6
{
	heap32[(r5+9)] = 1;
}
	r1 = (r1 + 1)|0;
	r0 = heap32[(r4+5)];
	r3 = r0 >> 2;
	r3 = heap32[(r3+120)];
	if(r3 >r1) //_LBB615_4
{
continue _6;
}
else{
break _6;
}
}
}
	r0 = heap32[(r4+6)];
	r1 = r0 >> 2;
	r1 = heap32[(r1+120)];
_12: do {
if(!(r1 <1)) //_LBB615_12
{
	r1 = 0;
_14: while(true){
	r0 = r0 >> 2;
	r0 = heap32[(r0+122)];
	r3 = r1 << 2;
	r0 = (r0 + r3)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
if(!(r0 !=r2)) //_LBB615_11
{
	heap32[(r5+9)] = 1;
}
	r1 = (r1 + 1)|0;
	r0 = heap32[(r4+6)];
	r3 = r0 >> 2;
	r3 = heap32[(r3+120)];
	if(r3 >r1) //_LBB615_9
{
continue _14;
}
else{
break _12;
}
}
}
} while(0);
	r0 = _2E_str76;
	r_g0 = r0;
	return;
}