function _ZNK14btQuantizedBvh9serializeEPvjb(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+38)];
	r3 = heap32[(r1+42)];
	if(r3 ==r2) //_LBB146_2
{
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+3)];
	r5 = _ZTV14btQuantizedBvh;
	r6 = r3 >> 2;
	r5 = (r5 + 8)|0;
	heap32[(r1+42)] = r2;
	heap32[(r6)] = r5;
	r2 = 0;
	heap32[(r6+13)] = 277;
	r5 = 1;
	heap8[r3+60] = r2;
	heap8[r3+80] = r5;
	heap32[(r6+19)] = 0;
	heap32[(r6+17)] = 0;
	heap32[(r6+18)] = 0;
	heap8[r3+100] = r5;
	heap32[(r6+24)] = 0;
	heap32[(r6+22)] = 0;
	heap32[(r6+23)] = 0;
	heap8[r3+120] = r5;
	heap32[(r6+29)] = 0;
	heap32[(r6+27)] = 0;
	heap32[(r6+28)] = 0;
	heap8[r3+140] = r5;
	heap32[(r6+34)] = 0;
	heap32[(r6+32)] = 0;
	heap32[(r6+33)] = 0;
	heap32[(r6+36)] = 0;
	heap8[r3+164] = r5;
	heap32[(r6+40)] = 0;
	heap32[(r6+38)] = 0;
	heap32[(r6+39)] = 0;
	heap32[(r6+42)] = 0;
	heap32[(r6+1)] = -8388609;
	heap32[(r6+2)] = -8388609;
	heap32[(r6+3)] = -8388609;
	heap32[(r6+4)] = 0;
	heap32[(r6+5)] = 2139095039;
	heap32[(r6+6)] = 2139095039;
	heap32[(r6+7)] = 2139095039;
	heap32[(r6+8)] = 0;
	r7 = heap32[(r1+14)];
	if(r4 ==0) //_LBB146_4
{
	heap32[(r6+14)] = r7;
	heap32[(r6+1)] = heap32[(r1+1)];
	heap32[(r6+2)] = heap32[(r1+2)];
	heap32[(r6+3)] = heap32[(r1+3)];
	heap32[(r6+4)] = heap32[(r1+4)];
	heap32[(r6+5)] = heap32[(r1+5)];
	heap32[(r6+6)] = heap32[(r1+6)];
	heap32[(r6+7)] = heap32[(r1+7)];
	heap32[(r6+8)] = heap32[(r1+8)];
	heap32[(r6+9)] = heap32[(r1+9)];
	heap32[(r6+10)] = heap32[(r1+10)];
	heap32[(r6+11)] = heap32[(r1+11)];
	heap32[(r6+12)] = heap32[(r1+12)];
	r7 = heap32[(r1+36)];
	heap32[(r6+36)] = r7;
	r7 = heap32[(r1+42)];
}
else{
	r8 = r7 << 8;
	r9 = r7 >>> 8;
	r10 = r7 << 24;
	r8 = r8 & 16711680;
	r9 = r9 & 65280;
	r7 = r7 >>> 24;
	r8 = r10 | r8;
	r7 = r9 | r7;
	r7 = r8 | r7;
	heap32[(r6+14)] = r7;
	r7 = heapU8[r0+7];
	heap8[r3+4] = r7;
	r7 = heapU8[r0+6];
	heap8[r3+5] = r7;
	r7 = heapU8[r0+5];
	heap8[r3+6] = r7;
	r7 = heapU8[r0+4];
	heap8[r3+7] = r7;
	r7 = heapU8[r0+11];
	heap8[r3+8] = r7;
	r7 = heapU8[r0+10];
	heap8[r3+9] = r7;
	r7 = heapU8[r0+9];
	heap8[r3+10] = r7;
	r7 = heapU8[r0+8];
	heap8[r3+11] = r7;
	r7 = heapU8[r0+15];
	heap8[r3+12] = r7;
	r7 = heapU8[r0+14];
	heap8[r3+13] = r7;
	r7 = heapU8[r0+13];
	heap8[r3+14] = r7;
	r7 = heapU8[r0+12];
	heap8[r3+15] = r7;
	r7 = heapU8[r0+19];
	heap8[r3+16] = r7;
	r7 = heapU8[r0+18];
	heap8[r3+17] = r7;
	r7 = heapU8[r0+17];
	heap8[r3+18] = r7;
	r7 = heapU8[r0+16];
	heap8[r3+19] = r7;
	r7 = heapU8[r0+23];
	heap8[r3+20] = r7;
	r7 = heapU8[r0+22];
	heap8[r3+21] = r7;
	r7 = heapU8[r0+21];
	heap8[r3+22] = r7;
	r7 = heapU8[r0+20];
	heap8[r3+23] = r7;
	r7 = heapU8[r0+27];
	heap8[r3+24] = r7;
	r7 = heapU8[r0+26];
	heap8[r3+25] = r7;
	r7 = heapU8[r0+25];
	heap8[r3+26] = r7;
	r7 = heapU8[r0+24];
	heap8[r3+27] = r7;
	r7 = heapU8[r0+31];
	heap8[r3+28] = r7;
	r7 = heapU8[r0+30];
	heap8[r3+29] = r7;
	r7 = heapU8[r0+29];
	heap8[r3+30] = r7;
	r7 = heapU8[r0+28];
	heap8[r3+31] = r7;
	r7 = heapU8[r0+35];
	heap8[r3+32] = r7;
	r7 = heapU8[r0+34];
	heap8[r3+33] = r7;
	r7 = heapU8[r0+33];
	heap8[r3+34] = r7;
	r7 = heapU8[r0+32];
	heap8[r3+35] = r7;
	r7 = heapU8[r0+39];
	heap8[r3+36] = r7;
	r7 = heapU8[r0+38];
	heap8[r3+37] = r7;
	r7 = heapU8[r0+37];
	heap8[r3+38] = r7;
	r7 = heapU8[r0+36];
	heap8[r3+39] = r7;
	r7 = heapU8[r0+43];
	heap8[r3+40] = r7;
	r7 = heapU8[r0+42];
	heap8[r3+41] = r7;
	r7 = heapU8[r0+41];
	heap8[r3+42] = r7;
	r7 = heapU8[r0+40];
	heap8[r3+43] = r7;
	r7 = heapU8[r0+47];
	heap8[r3+44] = r7;
	r7 = heapU8[r0+46];
	heap8[r3+45] = r7;
	r7 = heapU8[r0+45];
	heap8[r3+46] = r7;
	r7 = heapU8[r0+44];
	heap8[r3+47] = r7;
	r7 = heapU8[r0+51];
	heap8[r3+48] = r7;
	r7 = heapU8[r0+50];
	heap8[r3+49] = r7;
	r7 = heapU8[r0+49];
	heap8[r3+50] = r7;
	r7 = heapU8[r0+48];
	heap8[r3+51] = r7;
	r7 = heap32[(r1+36)];
	r8 = r7 << 8;
	r9 = r7 >>> 8;
	r10 = r7 << 24;
	r8 = r8 & 16711680;
	r9 = r9 & 65280;
	r7 = r7 >>> 24;
	r8 = r10 | r8;
	r7 = r9 | r7;
	r7 = r8 | r7;
	heap32[(r6+36)] = r7;
	r7 = heap32[(r1+42)];
	r8 = r7 << 8;
	r9 = r7 >>> 8;
	r10 = r7 << 24;
	r8 = r8 & 16711680;
	r9 = r9 & 65280;
	r7 = r7 >>> 24;
	r8 = r10 | r8;
	r7 = r9 | r7;
	r7 = r8 | r7;
}
	heap32[(r6+42)] = r7;
	r7 = heapU8[r0+60];
	heap8[r3+60] = r7;
	r7 = (r3 + 172)|0;
	r8 = heap32[(r1+14)];
	r0 = heapU8[r0+60];
	if(r0 ==0) //_LBB146_20
{
	r0 = 0;
	heap8[r3+100] = r0;
	heap32[(r6+24)] = r7;
	heap32[(r6+22)] = r8;
	heap32[(r6+23)] = r8;
_9: do {
	if(r4 !=0) //_LBB146_22
{
if(!(r8 <1)) //_LBB146_29
{
	r5 = (r5 - r8)|0;
_12: while(true){
	r2 = r0 << 6;
	r9 = heap32[(r1+24)];
	r9 = (r9 - r2)|0;
	r10 = heapU8[r9+3];
	r7 = (r7 - r2)|0;
	heap8[r7] = r10;
	r10 = heapU8[r9+2];
	heap8[r7+1] = r10;
	r10 = heapU8[r9+1];
	heap8[r7+2] = r10;
	r10 = heapU8[r9];
	heap8[r7+3] = r10;
	r10 = heapU8[r9+7];
	heap8[r7+4] = r10;
	r10 = heapU8[r9+6];
	heap8[r7+5] = r10;
	r10 = heapU8[r9+5];
	heap8[r7+6] = r10;
	r10 = heapU8[r9+4];
	heap8[r7+7] = r10;
	r10 = heapU8[r9+11];
	heap8[r7+8] = r10;
	r10 = heapU8[r9+10];
	heap8[r7+9] = r10;
	r10 = heapU8[r9+9];
	heap8[r7+10] = r10;
	r10 = heapU8[r9+8];
	heap8[r7+11] = r10;
	r10 = heapU8[r9+15];
	heap8[r7+12] = r10;
	r10 = heapU8[r9+14];
	heap8[r7+13] = r10;
	r10 = heapU8[r9+13];
	heap8[r7+14] = r10;
	r9 = heapU8[r9+12];
	heap8[r7+15] = r9;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+24)];
	r10 = heapU8[r7+19];
	r9 = (r9 - r2)|0;
	heap8[r9+16] = r10;
	r10 = heapU8[r7+18];
	heap8[r9+17] = r10;
	r10 = heapU8[r7+17];
	heap8[r9+18] = r10;
	r10 = heapU8[r7+16];
	heap8[r9+19] = r10;
	r10 = heapU8[r7+23];
	heap8[r9+20] = r10;
	r10 = heapU8[r7+22];
	heap8[r9+21] = r10;
	r10 = heapU8[r7+21];
	heap8[r9+22] = r10;
	r10 = heapU8[r7+20];
	heap8[r9+23] = r10;
	r10 = heapU8[r7+27];
	heap8[r9+24] = r10;
	r10 = heapU8[r7+26];
	heap8[r9+25] = r10;
	r10 = heapU8[r7+25];
	heap8[r9+26] = r10;
	r10 = heapU8[r7+24];
	heap8[r9+27] = r10;
	r10 = heapU8[r7+31];
	heap8[r9+28] = r10;
	r10 = heapU8[r7+30];
	heap8[r9+29] = r10;
	r10 = heapU8[r7+29];
	heap8[r9+30] = r10;
	r7 = heapU8[r7+28];
	heap8[r9+31] = r7;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+8)];
	r9 = r7 << 8;
	r10 = r7 >>> 8;
	r11 = heap32[(r6+24)];
	r12 = r7 << 24;
	r9 = r9 & 16711680;
	r10 = r10 & 65280;
	r7 = r7 >>> 24;
	r11 = (r11 - r2)|0;
	r9 = r12 | r9;
	r7 = r10 | r7;
	r10 = r11 >> 2;
	r7 = r9 | r7;
	heap32[(r10+8)] = r7;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+9)];
	r9 = r7 << 8;
	r10 = r7 >>> 8;
	r11 = heap32[(r6+24)];
	r12 = r7 << 24;
	r9 = r9 & 16711680;
	r10 = r10 & 65280;
	r7 = r7 >>> 24;
	r11 = (r11 - r2)|0;
	r9 = r12 | r9;
	r7 = r10 | r7;
	r10 = r11 >> 2;
	r7 = r9 | r7;
	heap32[(r10+9)] = r7;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+10)];
	r9 = r7 << 8;
	r10 = r7 >>> 8;
	r11 = heap32[(r6+24)];
	r12 = r7 << 24;
	r9 = r9 & 16711680;
	r10 = r10 & 65280;
	r7 = r7 >>> 24;
	r2 = (r11 - r2)|0;
	r9 = r12 | r9;
	r7 = r10 | r7;
	r2 = r2 >> 2;
	r7 = r9 | r7;
	heap32[(r2+10)] = r7;
	if(r5 ==r0) //_LBB146_29
{
break _9;
}
else{
	r7 = heap32[(r6+24)];
	r0 = (r0 + -1)|0;
}
}
}
}
else{
	if(r8 >0) //_LBB146_26
{
	r5 = (r5 - r8)|0;
	r0 = 0;
_17: while(true){
	r2 = r0 << 6;
	r9 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r9 = (r9 - r2)|0;
	r7 = r7 >> 2;
	r9 = r9 >> 2;
	heap32[(r7)] = heap32[(r9)];
	heap32[(r7+1)] = heap32[(r9+1)];
	heap32[(r7+2)] = heap32[(r9+2)];
	heap32[(r7+3)] = heap32[(r9+3)];
	r7 = heap32[(r6+24)];
	r9 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r9 = (r9 - r2)|0;
	r7 = r7 >> 2;
	r9 = r9 >> 2;
	heap32[(r7+4)] = heap32[(r9+4)];
	heap32[(r7+5)] = heap32[(r9+5)];
	heap32[(r7+6)] = heap32[(r9+6)];
	heap32[(r7+7)] = heap32[(r9+7)];
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r9 = heap32[(r6+24)];
	r9 = (r9 - r2)|0;
	r7 = heap32[(r7+8)];
	r9 = r9 >> 2;
	heap32[(r9+8)] = r7;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r9 = heap32[(r6+24)];
	r9 = (r9 - r2)|0;
	r7 = heap32[(r7+9)];
	r9 = r9 >> 2;
	heap32[(r9+9)] = r7;
	r7 = heap32[(r1+24)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r9 = heap32[(r6+24)];
	r2 = (r9 - r2)|0;
	r7 = heap32[(r7+10)];
	r2 = r2 >> 2;
	heap32[(r2+10)] = r7;
	if(r5 ==r0) //_LBB146_29
{
break _9;
}
else{
	r7 = heap32[(r6+24)];
	r0 = (r0 + -1)|0;
}
}
}
}
} while(0);
	r5 = heap32[(r6+24)];
if(!(r5 ==0)) //_LBB146_33
{
	r0 = heapU8[r3+100];
if(!(r0 ==0)) //_LBB146_32
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
	r2 = (r2 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r0)] = r2;
	r5 = heap32[(r5+-1)];
	heap32[(g0)] = r5;
	free(i7);
}
	heap32[(r6+24)] = 0;
}
	r5 = r8 << 6;
	r0 = 0;
	heap8[r3+100] = r0;
	heap32[(r6+24)] = 0;
	heap32[(r6+22)] = 0;
	heap32[(r6+23)] = 0;
}
else{
	heap8[r3+140] = r2;
	heap32[(r6+34)] = r7;
	heap32[(r6+32)] = r8;
	heap32[(r6+33)] = r8;
_28: do {
	if(r4 !=0) //_LBB146_8
{
if(!(r8 <1)) //_LBB146_15
{
	r5 = (r5 - r8)|0;
_31: while(true){
	r0 = heap32[(r1+34)];
	r9 = r2 << 4;
	r0 = (r0 - r9)|0;
	r0 = heapU16[(r0)>>1];
	r10 = r0 << 8;
	r0 = r0 << 24;
	r10 = r10 & 16711680;
	r0 = r0 | r10;
	r7 = (r7 - r9)|0;
	r0 = r0 >>> 16;
	heap16[(r7)>>1] = r0;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = heapU16[(r7+2)>>1];
	r0 = r7 << 8;
	r7 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = heap32[(r6+34)];
	r7 = r7 | r0;
	r0 = (r10 - r9)|0;
	r7 = r7 >>> 16;
	heap16[(r0+2)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = heapU16[(r7+4)>>1];
	r0 = r7 << 8;
	r7 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = heap32[(r6+34)];
	r7 = r7 | r0;
	r0 = (r10 - r9)|0;
	r7 = r7 >>> 16;
	heap16[(r0+4)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = heapU16[(r7+6)>>1];
	r0 = r7 << 8;
	r7 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = heap32[(r6+34)];
	r7 = r7 | r0;
	r0 = (r10 - r9)|0;
	r7 = r7 >>> 16;
	heap16[(r0+6)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = heapU16[(r7+8)>>1];
	r0 = r7 << 8;
	r7 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = heap32[(r6+34)];
	r7 = r7 | r0;
	r0 = (r10 - r9)|0;
	r7 = r7 >>> 16;
	heap16[(r0+8)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = heapU16[(r7+10)>>1];
	r0 = r7 << 8;
	r7 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = heap32[(r6+34)];
	r7 = r7 | r0;
	r0 = (r10 - r9)|0;
	r7 = r7 >>> 16;
	heap16[(r0+10)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r9)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+3)];
	r0 = r7 << 8;
	r10 = r7 >>> 8;
	r11 = heap32[(r6+34)];
	r12 = r7 << 24;
	r0 = r0 & 16711680;
	r10 = r10 & 65280;
	r7 = r7 >>> 24;
	r9 = (r11 - r9)|0;
	r0 = r12 | r0;
	r7 = r10 | r7;
	r9 = r9 >> 2;
	r7 = r0 | r7;
	heap32[(r9+3)] = r7;
	if(r5 ==r2) //_LBB146_15
{
break _28;
}
else{
	r7 = heap32[(r6+34)];
	r2 = (r2 + -1)|0;
}
}
}
}
else{
	if(r8 >0) //_LBB146_12
{
	r5 = (r5 - r8)|0;
	r0 = 0;
_36: while(true){
	r2 = r0 << 4;
	r9 = heap32[(r1+34)];
	r9 = (r9 - r2)|0;
	r9 = heapU16[(r9)>>1];
	r7 = (r7 - r2)|0;
	heap16[(r7)>>1] = r9;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+34)];
	r7 = heapU16[(r7+2)>>1];
	r9 = (r9 - r2)|0;
	heap16[(r9+2)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+34)];
	r7 = heapU16[(r7+4)>>1];
	r9 = (r9 - r2)|0;
	heap16[(r9+4)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+34)];
	r7 = heapU16[(r7+6)>>1];
	r9 = (r9 - r2)|0;
	heap16[(r9+6)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+34)];
	r7 = heapU16[(r7+8)>>1];
	r9 = (r9 - r2)|0;
	heap16[(r9+8)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r9 = heap32[(r6+34)];
	r7 = heapU16[(r7+10)>>1];
	r9 = (r9 - r2)|0;
	heap16[(r9+10)>>1] = r7;
	r7 = heap32[(r1+34)];
	r7 = (r7 - r2)|0;
	r7 = r7 >> 2;
	r9 = heap32[(r6+34)];
	r2 = (r9 - r2)|0;
	r7 = heap32[(r7+3)];
	r2 = r2 >> 2;
	heap32[(r2+3)] = r7;
	if(r5 ==r0) //_LBB146_15
{
break _28;
}
else{
	r7 = heap32[(r6+34)];
	r0 = (r0 + -1)|0;
}
}
}
}
} while(0);
	r5 = heap32[(r6+34)];
if(!(r5 ==0)) //_LBB146_19
{
	r7 = heapU8[r3+140];
if(!(r7 ==0)) //_LBB146_18
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r0 = heap32[(r7)];
	r0 = (r0 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r7)] = r0;
	r5 = heap32[(r5+-1)];
	heap32[(g0)] = r5;
	free(i7);
}
	heap32[(r6+34)] = 0;
}
	r5 = r8 << 4;
	r7 = 0;
	heap8[r3+140] = r7;
	heap32[(r6+34)] = 0;
	heap32[(r6+32)] = 0;
	heap32[(r6+33)] = 0;
}
	r0 = heap32[(r6+40)];
	r2 = heap32[(r1+42)];
if(!(r0 ==0)) //_LBB146_38
{
	r7 = heapU8[r3+164];
if(!(r7 ==0)) //_LBB146_37
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r8 = (r8 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r7)] = r8;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	heap32[(r6+40)] = 0;
}
	r0 = (r5 + r3)|0;
	r0 = (r0 + 172)|0;
	r5 = 0;
	heap8[r3+164] = r5;
	heap32[(r6+40)] = r0;
	heap32[(r6+38)] = r2;
	heap32[(r6+39)] = r2;
	r2 = heap32[(r1+42)];
_53: do {
	if(r4 !=0) //_LBB146_40
{
if(!(r2 <1)) //_LBB146_46
{
__label__ = 41; //SET chanka
_55: while(true){
	r2 = r5 << 5;
	r4 = heap32[(r1+40)];
	r4 = heapU16[(r4+r2)>>1];
	r7 = r4 << 8;
	r4 = r4 << 24;
	r7 = r7 & 16711680;
	r4 = r4 | r7;
	r4 = r4 >>> 16;
	heap16[(r0+r2)>>1] = r4;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = heapU16[(r0+2)>>1];
	r4 = r0 << 8;
	r0 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = heap32[(r6+40)];
	r0 = r0 | r4;
	r4 = (r7 + r2)|0;
	r0 = r0 >>> 16;
	heap16[(r4+2)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = heapU16[(r0+4)>>1];
	r4 = r0 << 8;
	r0 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = heap32[(r6+40)];
	r0 = r0 | r4;
	r4 = (r7 + r2)|0;
	r0 = r0 >>> 16;
	heap16[(r4+4)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = heapU16[(r0+6)>>1];
	r4 = r0 << 8;
	r0 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = heap32[(r6+40)];
	r0 = r0 | r4;
	r4 = (r7 + r2)|0;
	r0 = r0 >>> 16;
	heap16[(r4+6)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = heapU16[(r0+8)>>1];
	r4 = r0 << 8;
	r0 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = heap32[(r6+40)];
	r0 = r0 | r4;
	r4 = (r7 + r2)|0;
	r0 = r0 >>> 16;
	heap16[(r4+8)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = heapU16[(r0+10)>>1];
	r4 = r0 << 8;
	r0 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = heap32[(r6+40)];
	r0 = r0 | r4;
	r4 = (r7 + r2)|0;
	r0 = r0 >>> 16;
	heap16[(r4+10)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
	r4 = r0 << 8;
	r7 = r0 >>> 8;
	r8 = heap32[(r6+40)];
	r9 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = r7 & 65280;
	r0 = r0 >>> 24;
	r8 = (r8 + r2)|0;
	r4 = r9 | r4;
	r0 = r7 | r0;
	r7 = r8 >> 2;
	r0 = r4 | r0;
	heap32[(r7+3)] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r2)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+4)];
	r4 = r0 << 8;
	r7 = r0 >>> 8;
	r8 = heap32[(r6+40)];
	r9 = r0 << 24;
	r4 = r4 & 16711680;
	r7 = r7 & 65280;
	r0 = r0 >>> 24;
	r2 = (r8 + r2)|0;
	r4 = r9 | r4;
	r0 = r7 | r0;
	r5 = (r5 + 1)|0;
	r2 = r2 >> 2;
	r0 = r4 | r0;
	heap32[(r2+4)] = r0;
	r0 = heap32[(r1+42)];
	if(r0 <=r5) //_LBB146_46
{
break _53;
}
else{
	r0 = heap32[(r6+40)];
}
}
}
}
else{
	if(r2 >0) //_LBB146_43
{
	r2 = 0;
_60: while(true){
	r4 = r2 << 5;
	r5 = heap32[(r1+40)];
	r5 = heapU16[(r5+r4)>>1];
	heap16[(r0+r4)>>1] = r5;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r5 = heap32[(r6+40)];
	r0 = heapU16[(r0+2)>>1];
	r5 = (r5 + r4)|0;
	heap16[(r5+2)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r5 = heap32[(r6+40)];
	r0 = heapU16[(r0+4)>>1];
	r5 = (r5 + r4)|0;
	heap16[(r5+4)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r5 = heap32[(r6+40)];
	r0 = heapU16[(r0+6)>>1];
	r5 = (r5 + r4)|0;
	heap16[(r5+6)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r5 = heap32[(r6+40)];
	r0 = heapU16[(r0+8)>>1];
	r5 = (r5 + r4)|0;
	heap16[(r5+8)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r5 = heap32[(r6+40)];
	r0 = heapU16[(r0+10)>>1];
	r5 = (r5 + r4)|0;
	heap16[(r5+10)>>1] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r0 = r0 >> 2;
	r5 = heap32[(r6+40)];
	r5 = (r5 + r4)|0;
	r0 = heap32[(r0+3)];
	r5 = r5 >> 2;
	heap32[(r5+3)] = r0;
	r0 = heap32[(r1+40)];
	r0 = (r0 + r4)|0;
	r0 = r0 >> 2;
	r5 = heap32[(r6+40)];
	r5 = (r5 + r4)|0;
	r0 = heap32[(r0+4)];
	r5 = r5 >> 2;
	heap32[(r5+4)] = r0;
	r0 = heap32[(r6+40)];
	r0 = (r0 + r4)|0;
	r0 = r0 >> 2;
	heap32[(r0+5)] = 0;
	r0 = heap32[(r6+40)];
	r0 = (r0 + r4)|0;
	r0 = r0 >> 2;
	heap32[(r0+6)] = 0;
	r0 = heap32[(r6+40)];
	r0 = (r0 + r4)|0;
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r0+7)] = 0;
	r0 = heap32[(r1+42)];
	if(r0 <=r2) //_LBB146_46
{
break _53;
}
else{
	r0 = heap32[(r6+40)];
}
}
}
}
} while(0);
	r0 = heap32[(r6+40)];
if(!(r0 ==0)) //_LBB146_50
{
	r1 = heapU8[r3+164];
if(!(r1 ==0)) //_LBB146_49
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	heap32[(r6+40)] = 0;
}
	r0 = 0;
	heap8[r3+164] = r0;
	heap32[(r6+40)] = 0;
	heap32[(r6+38)] = 0;
	heap32[(r6+39)] = 0;
	heap32[(r6)] = 0;
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	r0 = _2E_str638;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 847;
	_assert(i7);
}
}