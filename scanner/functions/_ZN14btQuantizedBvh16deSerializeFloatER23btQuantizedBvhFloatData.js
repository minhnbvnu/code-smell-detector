function _ZN14btQuantizedBvh16deSerializeFloatER23btQuantizedBvhFloatData(sp)
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
	var r12;
	var r13;
	var r14;
	var r15;
	var r16;
	var r17;
	var r18;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r1 = r1 >> 2;
	r2 = r0 >> 2;
	heap32[(r2+5)] = heap32[(r1+4)];
	heap32[(r2+6)] = heap32[(r1+5)];
	heap32[(r2+7)] = heap32[(r1+6)];
	heap32[(r2+8)] = heap32[(r1+7)];
	heap32[(r2+1)] = heap32[(r1)];
	heap32[(r2+2)] = heap32[(r1+1)];
	heap32[(r2+3)] = heap32[(r1+2)];
	heap32[(r2+4)] = heap32[(r1+3)];
	heap32[(r2+9)] = heap32[(r1+8)];
	heap32[(r2+10)] = heap32[(r1+9)];
	heap32[(r2+11)] = heap32[(r1+10)];
	heap32[(r2+12)] = heap32[(r1+11)];
	r3 = heap32[(r1+12)];
	heap32[(r2+14)] = r3;
	r3 = 0;
	r4 = heap32[(r1+13)];
	r4 = r4 != r3;
	r4 = r4 & 1;
	heap8[r0+60] = r4;
	r4 = heap32[(r2+22)];
	r5 = heap32[(r1+14)];
if(!(r4 >=r5)) //_LBB147_17
{
	r6 = heap32[(r2+23)];
if(!(r6 >=r5)) //_LBB147_17
{
	if(r5 !=0) //_LBB147_4
{
	r6 = gNumAlignedAllocs;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r7 = (r7 + 1)|0;
	r8 = r5 << 6;
	heap32[(r6)] = r7;
	r6 = r8 | 19;
	heap32[(g0)] = r6;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB147_6
{
	r7 = 0;
	r8 = (r6 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r6 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r6;
	r6 = r8;
}
}
else{
	r6 = 0;
}
	r7 = (r0 + 96)|0;
	if(r4 <1) //_LBB147_9
{
	r4 = r7 >> 2;
	r9 = heap32[(r4)];
}
else{
	r8 = 0;
_12: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = (r6 + r8)|0;
	r11 = (r9 + r8)|0;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = 64;
	r4 = (r4 + -1)|0;
	r8 = (r8 + 64)|0;
	memcpy(i7);
if(!(r4 !=0)) //_LBB147_10
{
break _12;
}
}
	r7 = (r0 + 96)|0;
}
if(!(r9 ==0)) //_LBB147_16
{
	r4 = heapU8[r0+100];
if(!(r4 ==0)) //_LBB147_15
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r8 = heap32[(r4)];
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r4)] = r8;
	r4 = heap32[(r9+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	r4 = r7 >> 2;
	heap32[(r4)] = 0;
}
	r4 = 1;
	r7 = r7 >> 2;
	heap8[r0+100] = r4;
	heap32[(r7)] = r6;
	heap32[(r2+23)] = r5;
}
}
	heap32[(r2+22)] = r5;
_23: do {
if(!(r5 <1)) //_LBB147_20
{
	r4 = 0;
	r6 = heap32[(r1+16)];
	r5 = (r4 - r5)|0;
_25: while(true){
	r7 = (r4 * -12)|0;
	r7 = r7 << 2;
	r8 = r4 << 6;
	r9 = heap32[(r2+24)];
	r7 = (r6 + r7)|0;
	r9 = (r9 - r8)|0;
	r7 = r7 >> 2;
	r9 = r9 >> 2;
	heap32[(r9+4)] = heap32[(r7+4)];
	heap32[(r9+5)] = heap32[(r7+5)];
	heap32[(r9+6)] = heap32[(r7+6)];
	heap32[(r9+7)] = heap32[(r7+7)];
	r9 = heap32[(r2+24)];
	r9 = (r9 - r8)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = heap32[(r7)];
	heap32[(r9+1)] = heap32[(r7+1)];
	heap32[(r9+2)] = heap32[(r7+2)];
	heap32[(r9+3)] = heap32[(r7+3)];
	r9 = heap32[(r2+24)];
	r9 = (r9 - r8)|0;
	r10 = heap32[(r7+8)];
	r9 = r9 >> 2;
	heap32[(r9+8)] = r10;
	r9 = heap32[(r2+24)];
	r9 = (r9 - r8)|0;
	r10 = heap32[(r7+9)];
	r9 = r9 >> 2;
	heap32[(r9+9)] = r10;
	r9 = heap32[(r2+24)];
	r8 = (r9 - r8)|0;
	r7 = heap32[(r7+10)];
	r4 = (r4 + -1)|0;
	r8 = r8 >> 2;
	heap32[(r8+10)] = r7;
	if(r5 !=r4) //_LBB147_19
{
continue _25;
}
else{
break _23;
}
}
}
} while(0);
	r4 = heap32[(r2+32)];
	r5 = heap32[(r1+15)];
_28: do {
if(!(r4 >=r5)) //_LBB147_23
{
	r6 = (r0 + 124)|0;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	r6 = (r5 - r4)|0;
	r4 = r4 << 4;
	_ZN20btAlignedObjectArrayI18btQuantizedBvhNodeE7reserveEi(i7);
_30: while(true){
	r7 = heap32[(r2+34)];
	r7 = (r7 + r4)|0;
	r7 = r7 >> 2;
	r6 = (r6 + -1)|0;
	r4 = (r4 + 16)|0;
	heap32[(r7)] = 0;
	heap32[(r7+1)] = 0;
	heap32[(r7+2)] = 0;
	heap32[(r7+3)] = 0;
	if(r6 !=0) //_LBB147_22
{
continue _30;
}
else{
break _28;
}
}
}
} while(0);
	heap32[(r2+32)] = r5;
_33: do {
if(!(r5 <1)) //_LBB147_26
{
	r4 = 0;
	r6 = heap32[(r1+17)];
	r5 = (r4 - r5)|0;
_35: while(true){
	r7 = r4 << 4;
	r8 = (r6 - r7)|0;
	r9 = r8 >> 2;
	r10 = heap32[(r2+34)];
	r10 = (r10 - r7)|0;
	r9 = heap32[(r9+3)];
	r10 = r10 >> 2;
	heap32[(r10+3)] = r9;
	r9 = heap32[(r2+34)];
	r10 = heapU16[(r8+6)>>1];
	r9 = (r9 - r7)|0;
	heap16[(r9+6)>>1] = r10;
	r9 = heap32[(r2+34)];
	r10 = heapU16[(r8+8)>>1];
	r9 = (r9 - r7)|0;
	heap16[(r9+8)>>1] = r10;
	r9 = heap32[(r2+34)];
	r10 = heapU16[(r8+10)>>1];
	r9 = (r9 - r7)|0;
	heap16[(r9+10)>>1] = r10;
	r9 = heap32[(r2+34)];
	r10 = heapU16[(r8)>>1];
	r9 = (r9 - r7)|0;
	heap16[(r9)>>1] = r10;
	r9 = heap32[(r2+34)];
	r10 = heapU16[(r8+2)>>1];
	r9 = (r9 - r7)|0;
	heap16[(r9+2)>>1] = r10;
	r9 = heap32[(r2+34)];
	r8 = heapU16[(r8+4)>>1];
	r4 = (r4 + -1)|0;
	r7 = (r9 - r7)|0;
	heap16[(r7+4)>>1] = r8;
	if(r5 !=r4) //_LBB147_25
{
continue _35;
}
else{
break _33;
}
}
}
} while(0);
	r4 = heap32[(r1+19)];
	heap32[(r2+36)] = r4;
	r4 = heap32[(r2+38)];
	r5 = heap32[(r1+20)];
if(!(r4 >=r5)) //_LBB147_43
{
	r6 = heap32[(r2+39)];
if(!(r6 >=r5)) //_LBB147_43
{
	if(r5 !=0) //_LBB147_30
{
	r6 = gNumAlignedAllocs;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r7 = (r7 + 1)|0;
	r8 = r5 << 5;
	heap32[(r6)] = r7;
	r6 = r8 | 19;
	heap32[(g0)] = r6;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB147_32
{
	r7 = 0;
	r8 = (r6 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r6 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r6;
	r6 = r8;
}
}
else{
	r6 = 0;
}
	r7 = (r0 + 160)|0;
	if(r4 <1) //_LBB147_35
{
	r4 = r7 >> 2;
	r9 = heap32[(r4)];
}
else{
	r8 = 0;
_49: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = (r9 + r8)|0;
	r10 = r10 >> 2;
	r11 = (r6 + r8)|0;
	r4 = (r4 + -1)|0;
	r8 = (r8 + 32)|0;
	r12 = heap32[(r10)];
	r11 = r11 >> 2;
	r13 = heap32[(r10+1)];
	r14 = heap32[(r10+2)];
	r15 = heap32[(r10+3)];
	r16 = heap32[(r10+4)];
	r17 = heap32[(r10+5)];
	r18 = heap32[(r10+6)];
	r10 = heap32[(r10+7)];
	heap32[(r11)] = r12;
	heap32[(r11+1)] = r13;
	heap32[(r11+2)] = r14;
	heap32[(r11+3)] = r15;
	heap32[(r11+4)] = r16;
	heap32[(r11+5)] = r17;
	heap32[(r11+6)] = r18;
	heap32[(r11+7)] = r10;
if(!(r4 !=0)) //_LBB147_36
{
break _49;
}
}
	r7 = (r0 + 160)|0;
}
if(!(r9 ==0)) //_LBB147_42
{
	r4 = heapU8[r0+164];
if(!(r4 ==0)) //_LBB147_41
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r8 = heap32[(r4)];
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r4)] = r8;
	r4 = heap32[(r9+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	r4 = r7 >> 2;
	heap32[(r4)] = 0;
}
	r4 = 1;
	r7 = r7 >> 2;
	heap8[r0+164] = r4;
	heap32[(r7)] = r6;
	heap32[(r2+39)] = r5;
}
}
	heap32[(r2+38)] = r5;
_60: do {
if(!(r5 <1)) //_LBB147_46
{
	r0 = heap32[(r1+18)];
	r1 = (r3 - r5)|0;
_62: while(true){
	r4 = (r3 * -10)|0;
	r4 = r4 << 1;
	r4 = (r0 + r4)|0;
	r5 = r3 << 5;
	r6 = heap32[(r2+40)];
	r7 = heapU16[(r4+14)>>1];
	r6 = (r6 - r5)|0;
	heap16[(r6+6)>>1] = r7;
	r6 = heap32[(r2+40)];
	r7 = heapU16[(r4+16)>>1];
	r6 = (r6 - r5)|0;
	heap16[(r6+8)>>1] = r7;
	r6 = heap32[(r2+40)];
	r7 = heapU16[(r4+18)>>1];
	r6 = (r6 - r5)|0;
	heap16[(r6+10)>>1] = r7;
	r6 = heap32[(r2+40)];
	r7 = heapU16[(r4+8)>>1];
	r6 = (r6 - r5)|0;
	heap16[(r6)>>1] = r7;
	r6 = heap32[(r2+40)];
	r7 = heapU16[(r4+10)>>1];
	r6 = (r6 - r5)|0;
	heap16[(r6+2)>>1] = r7;
	r6 = (r3 * -5)|0;
	r7 = heap32[(r2+40)];
	r4 = heapU16[(r4+12)>>1];
	r6 = r6 << 2;
	r7 = (r7 - r5)|0;
	r6 = (r0 + r6)|0;
	heap16[(r7+4)>>1] = r4;
	r4 = r6 >> 2;
	r6 = heap32[(r2+40)];
	r6 = (r6 - r5)|0;
	r7 = heap32[(r4)];
	r6 = r6 >> 2;
	heap32[(r6+3)] = r7;
	r6 = heap32[(r2+40)];
	r5 = (r6 - r5)|0;
	r4 = heap32[(r4+1)];
	r3 = (r3 + -1)|0;
	r5 = r5 >> 2;
	heap32[(r5+4)] = r4;
	if(r1 !=r3) //_LBB147_45
{
continue _62;
}
else{
break _60;
}
}
}
} while(0);
	return;
}