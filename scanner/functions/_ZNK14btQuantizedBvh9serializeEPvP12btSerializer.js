function _ZNK14btQuantizedBvh9serializeEPvP12btSerializer(sp)
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
	var r10;
	var r11;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r0 = r0 >> 2;
	r2 = r1 >> 2;
	heap32[(r0+4)] = heap32[(r2+5)];
	heap32[(r0+5)] = heap32[(r2+6)];
	heap32[(r0+6)] = heap32[(r2+7)];
	heap32[(r0+7)] = heap32[(r2+8)];
	heap32[(r0)] = heap32[(r2+1)];
	heap32[(r0+1)] = heap32[(r2+2)];
	heap32[(r0+2)] = heap32[(r2+3)];
	heap32[(r0+3)] = heap32[(r2+4)];
	heap32[(r0+8)] = heap32[(r2+9)];
	heap32[(r0+9)] = heap32[(r2+10)];
	heap32[(r0+10)] = heap32[(r2+11)];
	heap32[(r0+11)] = heap32[(r2+12)];
	r3 = heap32[(r2+14)];
	heap32[(r0+12)] = r3;
	r1 = heapU8[r1+60];
	heap32[(r0+13)] = r1;
	r1 = heap32[(r2+22)];
	r3 = heap32[(fp+2)];
	heap32[(r0+14)] = r1;
	r1 = heap32[(r2+22)];
	if(r1 !=0) //_LBB143_2
{
	r1 = r3 >> 2;
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	r5 = heap32[(r2+24)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
	heap32[(r0+16)] = r4;
if(!(r4 ==0)) //_LBB143_7
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r5 = heap32[(r2+22)];
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 48;
	heap32[(g0+2)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
if(!(r5 <1)) //_LBB143_6
{
	r6 = r4 >> 2;
	r7 = 0;
	r6 = heap32[(r6+2)];
	r5 = (r7 - r5)|0;
_6: while(true){
	r8 = (r7 * -12)|0;
	r8 = r8 << 2;
	r9 = r7 << 6;
	r10 = heap32[(r2+24)];
	r8 = (r6 + r8)|0;
	r10 = (r10 - r9)|0;
	r8 = r8 >> 2;
	r10 = r10 >> 2;
	heap32[(r8+4)] = heap32[(r10+4)];
	heap32[(r8+5)] = heap32[(r10+5)];
	heap32[(r8+6)] = heap32[(r10+6)];
	heap32[(r8+7)] = heap32[(r10+7)];
	r10 = heap32[(r2+24)];
	r10 = (r10 - r9)|0;
	r10 = r10 >> 2;
	heap32[(r8)] = heap32[(r10)];
	heap32[(r8+1)] = heap32[(r10+1)];
	heap32[(r8+2)] = heap32[(r10+2)];
	heap32[(r8+3)] = heap32[(r10+3)];
	r10 = heap32[(r2+24)];
	r10 = (r10 - r9)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10+8)];
	heap32[(r8+8)] = r10;
	r10 = heap32[(r2+24)];
	r10 = (r10 - r9)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10+9)];
	heap32[(r8+9)] = r10;
	r10 = heap32[(r2+24)];
	r9 = (r10 - r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9+10)];
	r7 = (r7 + -1)|0;
	heap32[(r8+10)] = r9;
if(!(r5 !=r7)) //_LBB143_5
{
break _6;
}
}
}
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	r5 = heap32[(r2+24)];
	r6 = _2E_str32;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
}
else{
	heap32[(r0+16)] = 0;
}
	r1 = heap32[(r2+32)];
	heap32[(r0+15)] = r1;
	r1 = heap32[(r2+32)];
	if(r1 !=0) //_LBB143_9
{
	r1 = r3 >> 2;
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	r5 = heap32[(r2+34)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
	heap32[(r0+17)] = r4;
if(!(r4 ==0)) //_LBB143_14
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r5 = heap32[(r2+32)];
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 16;
	heap32[(g0+2)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
_14: do {
if(!(r5 <1)) //_LBB143_13
{
	r6 = r4 >> 2;
	r7 = 0;
	r6 = heap32[(r6+2)];
	r5 = (r7 - r5)|0;
_16: while(true){
	r8 = r7 << 4;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = r9 >> 2;
	r10 = (r6 - r8)|0;
	r9 = heap32[(r9+3)];
	r11 = r10 >> 2;
	heap32[(r11+3)] = r9;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = heapU16[(r9+6)>>1];
	heap16[(r10+6)>>1] = r9;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = heapU16[(r9+8)>>1];
	heap16[(r10+8)>>1] = r9;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = heapU16[(r9+10)>>1];
	heap16[(r10+10)>>1] = r9;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = heapU16[(r9)>>1];
	heap16[(r10)>>1] = r9;
	r9 = heap32[(r2+34)];
	r9 = (r9 - r8)|0;
	r9 = heapU16[(r9+2)>>1];
	heap16[(r10+2)>>1] = r9;
	r9 = heap32[(r2+34)];
	r8 = (r9 - r8)|0;
	r8 = heapU16[(r8+4)>>1];
	r7 = (r7 + -1)|0;
	heap16[(r10+4)>>1] = r8;
if(!(r5 !=r7)) //_LBB143_12
{
break _14;
}
}
}
} while(0);
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	r5 = heap32[(r2+34)];
	r6 = _2E_str133;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
}
else{
	heap32[(r0+17)] = 0;
}
	r1 = heap32[(r2+36)];
	heap32[(r0+19)] = r1;
	r1 = heap32[(r2+38)];
	heap32[(r0+20)] = r1;
	r1 = heap32[(r2+38)];
	if(r1 !=0) //_LBB143_16
{
	r1 = r3 >> 2;
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	r5 = heap32[(r2+40)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
	heap32[(r0+18)] = r4;
if(!(r4 ==0)) //_LBB143_21
{
	r0 = heap32[(r1)];
	r0 = r0 >> 2;
	r4 = heap32[(r2+38)];
	r0 = heap32[(r0+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 20;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	r0 = r_g0;
_24: do {
if(!(r4 <1)) //_LBB143_20
{
	r5 = r0 >> 2;
	r6 = 0;
	r5 = heap32[(r5+2)];
	r4 = (r6 - r4)|0;
_26: while(true){
	r7 = r6 << 5;
	r8 = heap32[(r2+40)];
	r9 = (r6 * -10)|0;
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8+6)>>1];
	r9 = r9 << 1;
	r9 = (r5 + r9)|0;
	heap16[(r9+14)>>1] = r8;
	r8 = heap32[(r2+40)];
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8+8)>>1];
	heap16[(r9+16)>>1] = r8;
	r8 = heap32[(r2+40)];
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8+10)>>1];
	heap16[(r9+18)>>1] = r8;
	r8 = heap32[(r2+40)];
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8)>>1];
	heap16[(r9+8)>>1] = r8;
	r8 = heap32[(r2+40)];
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8+2)>>1];
	heap16[(r9+10)>>1] = r8;
	r8 = heap32[(r2+40)];
	r8 = (r8 - r7)|0;
	r8 = heapU16[(r8+4)>>1];
	heap16[(r9+12)>>1] = r8;
	r8 = heap32[(r2+40)];
	r9 = (r6 * -5)|0;
	r8 = (r8 - r7)|0;
	r9 = r9 << 2;
	r8 = r8 >> 2;
	r9 = (r5 + r9)|0;
	r8 = heap32[(r8+3)];
	r9 = r9 >> 2;
	heap32[(r9)] = r8;
	r8 = heap32[(r2+40)];
	r7 = (r8 - r7)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+4)];
	r6 = (r6 + -1)|0;
	heap32[(r9+1)] = r7;
if(!(r4 !=r6)) //_LBB143_19
{
break _24;
}
}
}
} while(0);
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	r2 = heap32[(r2+40)];
	r4 = _2E_str234;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
}
else{
	heap32[(r0+18)] = 0;
}
	r0 = _2E_str335;
	r_g0 = r0;
	return;
}