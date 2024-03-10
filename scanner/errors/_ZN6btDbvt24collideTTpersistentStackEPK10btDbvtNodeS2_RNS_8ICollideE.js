function _ZN6btDbvt24collideTTpersistentStackEPK10btDbvtNodeS2_RNS_8ICollideE(sp)
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
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
_1: do {
if(!(r0 ==0)) //_LBB101_57
{
	r1 = heap32[(fp+2)];
if(!(r1 ==0)) //_LBB101_57
{
	r2 = heap32[(fp)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+6)];
if(!(r4 >127)) //_LBB101_17
{
	r5 = heap32[(r3+7)];
if(!(r5 >127)) //_LBB101_17
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r6 = (r6 + 1)|0;
	heap32[(r5)] = r6;
	heap32[(g0)] = 1043;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB101_6
{
	r6 = 0;
	r7 = (r5 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r5 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r5;
	r5 = r7;
}
	r6 = (r2 + 32)|0;
	if(r4 <1) //_LBB101_9
{
	r4 = r6 >> 2;
	r8 = heap32[(r4)];
}
else{
	r7 = 0;
_13: while(true){
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r9 = r7 << 3;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r5 + r9)|0;
	r11 = heap32[(r10+1)];
	r10 = heap32[(r10)];
	r9 = r9 >> 2;
	r7 = (r7 + 1)|0;
	heap32[(r9)] = r10;
	heap32[(r9+1)] = r11;
if(!(r4 !=r7)) //_LBB101_10
{
break _13;
}
}
	r6 = (r2 + 32)|0;
}
if(!(r8 ==0)) //_LBB101_16
{
	r4 = heapU8[r2+36];
if(!(r4 ==0)) //_LBB101_15
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r7 = heap32[(r4)];
	r7 = (r7 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r4)] = r7;
	r4 = heap32[(r8+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	r4 = r6 >> 2;
	heap32[(r4)] = 0;
}
	r4 = 1;
	r6 = r6 >> 2;
	heap8[r2+36] = r4;
	heap32[(r6)] = r5;
	heap32[(r3+7)] = 128;
}
}
	r4 = heap32[(fp+3)];
	heap32[(r3+6)] = 128;
	r5 = heap32[(r3+8)];
	r5 = r5 >> 2;
	r6 = 1;
	r7 = 124;
	heap32[(r5)] = r0;
	heap32[(r5+1)] = r1;
_24: while(true){
	r0 = r6;
	r6 = (r0 + -1)|0;
	r1 = heap32[(r3+8)];
	r5 = r6 << 3;
	r5 = (r1 + r5)|0;
	r5 = r5 >> 2;
	r8 = heap32[(r5)];
	r5 = heap32[(r5+1)];
	if(r6 >r7) //_LBB101_20
{
	r7 = heap32[(r3+6)];
	r9 = r7 << 1;
_28: do {
if(!(r7 >r9)) //_LBB101_38
{
if(!(r7 >=r9)) //_LBB101_38
{
	r10 = heap32[(r3+7)];
	if(r10 <r9) //_LBB101_24
{
	if(r9 !=0) //_LBB101_26
{
	r10 = gNumAlignedAllocs;
	r10 = r10 >> 2;
	r11 = heap32[(r10)];
	r12 = r7 << 4;
	r11 = (r11 + 1)|0;
	r12 = r12 | 3;
	heap32[(r10)] = r11;
	r10 = (r12 + 16)|0;
	heap32[(g0)] = r10;
	malloc(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB101_28
{
	r11 = 0;
	r12 = (r10 + 4)|0;
	r11 = (r11 - r12)|0;
	r11 = r11 & 15;
	r11 = (r10 + r11)|0;
	r12 = (r11 + 4)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r10;
	r10 = r12;
}
}
else{
	r10 = 0;
}
if(!(r7 <1)) //_LBB101_32
{
	r11 = (r1 + 4)|0;
	r12 = (r10 + 4)|0;
	r13 = r7;
_40: while(true){
	r14 = r11 >> 2;
	r15 = heap32[(r14)];
	r14 = heap32[(r14+-1)];
	r16 = r12 >> 2;
	r13 = (r13 + -1)|0;
	r11 = (r11 + 8)|0;
	r12 = (r12 + 8)|0;
	heap32[(r16+-1)] = r14;
	heap32[(r16)] = r15;
if(!(r13 !=0)) //_LBB101_31
{
break _40;
}
}
}
if(!(r1 ==0)) //_LBB101_36
{
	r11 = heapU8[r2+36];
if(!(r11 ==0)) //_LBB101_35
{
	r11 = gNumAlignedFree;
	r11 = r11 >> 2;
	r12 = heap32[(r11)];
	r12 = (r12 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r11)] = r12;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r3+8)] = 0;
}
	r1 = 1;
	heap8[r2+36] = r1;
	heap32[(r3+8)] = r10;
	heap32[(r3+7)] = r9;
if(!(r7 <r9)) //_LBB101_23
{
break _28;
}
}
_49: while(true){
	r7 = (r7 + -1)|0;
if(!(r7 !=0)) //_LBB101_37
{
break _28;
}
}
}
}
} while(0);
	r7 = (r9 + -4)|0;
	heap32[(r3+6)] = r9;
}
	if(r8 !=r5) //_LBB101_43
{
	r1 = r8 >> 2;
	r9 = r5 >> 2;
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r9+4)];
if(!(f0 >f1)) //_LBB101_41
{
	f0 = heapFloat[(r1+4)];
	f1 = heapFloat[(r9)];
if(!(f0 <f1)) //_LBB101_41
{
	f0 = heapFloat[(r1+1)];
	f1 = heapFloat[(r9+5)];
if(!(f0 >f1)) //_LBB101_41
{
	f0 = heapFloat[(r1+5)];
	f1 = heapFloat[(r9+1)];
if(!(f0 <f1)) //_LBB101_41
{
	f0 = heapFloat[(r1+2)];
	f1 = heapFloat[(r9+6)];
if(!(f0 >f1)) //_LBB101_41
{
	f0 = heapFloat[(r1+6)];
	f1 = heapFloat[(r9+2)];
if(!(f0 <f1)) //_LBB101_41
{
	r10 = heap32[(r9+10)];
	r11 = heap32[(r1+10)];
	if(r11 ==0) //_LBB101_53
{
	if(r10 ==0) //_LBB101_55
{
	r0 = r4 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+2)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r5;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
else{
	r5 = r0 << 3;
	r6 = heap32[(r3+8)];
	r6 = (r6 + r5)|0;
	r1 = heap32[(r9+9)];
	r6 = r6 >> 2;
	heap32[(r6+-2)] = r8;
	heap32[(r6+-1)] = r1;
	r6 = heap32[(r3+8)];
	r5 = (r6 + r5)|0;
	r1 = heap32[(r9+10)];
	r5 = r5 >> 2;
	r6 = (r0 + 1)|0;
	heap32[(r5)] = r8;
	heap32[(r5+1)] = r1;
}
}
else{
	r6 = heap32[(r3+8)];
	if(r10 ==0) //_LBB101_52
{
	r8 = r0 << 3;
	r6 = (r6 + r8)|0;
	r6 = r6 >> 2;
	r9 = heap32[(r1+9)];
	heap32[(r6+-2)] = r9;
	heap32[(r6+-1)] = r5;
	r6 = heap32[(r3+8)];
	r6 = (r6 + r8)|0;
	r8 = heap32[(r1+10)];
	r9 = r6 >> 2;
	r6 = (r0 + 1)|0;
	heap32[(r9)] = r8;
	heap32[(r9+1)] = r5;
}
else{
	r5 = r0 << 3;
	r6 = (r6 + r5)|0;
	r8 = heap32[(r9+9)];
	r10 = heap32[(r1+9)];
	r6 = r6 >> 2;
	heap32[(r6+-2)] = r10;
	heap32[(r6+-1)] = r8;
	r6 = heap32[(r3+8)];
	r6 = (r6 + r5)|0;
	r8 = heap32[(r9+9)];
	r10 = heap32[(r1+10)];
	r6 = r6 >> 2;
	heap32[(r6)] = r10;
	heap32[(r6+1)] = r8;
	r6 = heap32[(r3+8)];
	r6 = (r5 + r6)|0;
	r8 = heap32[(r9+10)];
	r10 = heap32[(r1+9)];
	r6 = r6 >> 2;
	heap32[(r6+2)] = r10;
	heap32[(r6+3)] = r8;
	r6 = heap32[(r3+8)];
	r6 = (r5 + r6)|0;
	r5 = heap32[(r9+10)];
	r1 = heap32[(r1+10)];
	r8 = r6 >> 2;
	r6 = (r0 + 3)|0;
	heap32[(r8+4)] = r1;
	heap32[(r8+5)] = r5;
}
}
}
}
}
}
}
}
}
else{
	r5 = r8 >> 2;
	r8 = heap32[(r5+10)];
	if(r8 !=0) //_LBB101_42
{
	r6 = r0 << 3;
	r8 = heap32[(r3+8)];
	r8 = (r8 + r6)|0;
	r1 = heap32[(r5+9)];
	r8 = r8 >> 2;
	heap32[(r8+-2)] = r1;
	heap32[(r8+-1)] = r1;
	r8 = heap32[(r3+8)];
	r8 = (r8 + r6)|0;
	r1 = heap32[(r5+10)];
	r8 = r8 >> 2;
	heap32[(r8)] = r1;
	heap32[(r8+1)] = r1;
	r8 = heap32[(r3+8)];
	r6 = (r6 + r8)|0;
	r8 = heap32[(r5+10)];
	r5 = heap32[(r5+9)];
	r1 = r6 >> 2;
	r6 = (r0 + 2)|0;
	heap32[(r1+2)] = r5;
	heap32[(r1+3)] = r8;
}
}
	if(r6 !=0) //_LBB101_18
{
continue _24;
}
else{
break _1;
}
}
}
}
} while(0);
	return;
}