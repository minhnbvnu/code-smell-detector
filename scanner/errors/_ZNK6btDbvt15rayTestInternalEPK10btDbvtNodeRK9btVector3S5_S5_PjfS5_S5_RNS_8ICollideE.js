function _ZNK6btDbvt15rayTestInternalEPK10btDbvtNodeRK9btVector3S5_S5_PjfS5_S5_RNS_8ICollideE(sp)
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
	var r19;
	var r20;
	var r21;
	var r22;
	var r23;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
if(!(r0 ==0)) //_LBB105_43
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	f0 = heapFloat[(fp+4)];
	r4 = heap32[(fp+5)];
	r5 = heap32[(fp+6)];
	r6 = heap32[(fp+7)];
	r7 = gNumAlignedAllocs;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r8 = (r8 + 1)|0;
	heap32[(r7)] = r8;
	heap32[(g0)] = 531;
	malloc(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB105_3
{
	r9 = 0;
	r10 = (r8 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r8 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r8;
	r8 = r10;
}
	r9 = 0;
_6: while(true){
	r10 = r9 << 2;
	r10 = (r8 + r10)|0;
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = 0;
if(!(r9 !=128)) //_LBB105_5
{
break _6;
}
}
	r9 = 128;
	r10 = 1;
	r11 = 126;
	r12 = r8 >> 2;
	heap32[(r12)] = r0;
	r0 = r9;
	r12 = r10;
_9: while(true){
	r13 = r12;
	r12 = (r13 + -1)|0;
	r14 = r12 << 2;
	r14 = (r8 + r14)|0;
	r14 = r14 >> 2;
	r14 = heap32[(r14)];
	r15 = r14 >> 2;
	r16 = r5 >> 2;
	f1 = heapFloat[(r15+2)];
	f2 = heapFloat[(r16+2)];
	f3 = heapFloat[(r15+1)];
	f4 = heapFloat[(r16+1)];
	f5 = heapFloat[(r15)];
	f6 = heapFloat[(r16)];
	r16 = sp + -32;
	f5 = f5-f6;
	r17 = r16 >> 2;
	f3 = f3-f4;
	heapFloat[(fp+-8)] = f5;
	f1 = f1-f2;
	heapFloat[(r17+1)] = f3;
	heapFloat[(r17+2)] = f1;
	heap32[(r17+3)] = 0;
	r18 = r4 >> 2;
	f1 = heapFloat[(r15+6)];
	f2 = heapFloat[(r18+2)];
	f3 = heapFloat[(r15+5)];
	f4 = heapFloat[(r18+1)];
	f5 = heapFloat[(r15+4)];
	f6 = heapFloat[(r18)];
	f5 = f5-f6;
	f3 = f3-f4;
	heapFloat[(r17+4)] = f5;
	f1 = f1-f2;
	heapFloat[(r17+5)] = f3;
	heapFloat[(r17+6)] = f1;
	r18 = r3 >> 2;
	heap32[(r17+7)] = 0;
	r17 = heap32[(r18)];
	r19 = heap32[(r18+1)];
	r20 = (r10 - r19)|0;
	r21 = r17 << 4;
	r20 = r20 << 4;
	r21 = (r16 + r21)|0;
	r20 = (r16 + r20)|0;
	r22 = r1 >> 2;
	r21 = r21 >> 2;
	r20 = r20 >> 2;
	r23 = r2 >> 2;
	f1 = heapFloat[(r21)];
	f2 = heapFloat[(r22)];
	f3 = heapFloat[(r20+1)];
	f4 = heapFloat[(r22+1)];
	f1 = f1-f2;
	f5 = heapFloat[(r23)];
	f3 = f3-f4;
	f6 = heapFloat[(r23+1)];
	f1 = f1*f5;
	f3 = f3*f6;
if(!(f1 >f3)) //_LBB105_9
{
	r17 = (r10 - r17)|0;
	r17 = r17 << 4;
	r19 = r19 << 4;
	r17 = (r16 + r17)|0;
	r19 = (r16 + r19)|0;
	r17 = r17 >> 2;
	r19 = r19 >> 2;
	f7 = heapFloat[(r17)];
	f8 = heapFloat[(r19+1)];
	f2 = f7-f2;
	f4 = f8-f4;
	f2 = f2*f5;
	f4 = f4*f6;
	if(f4 <=f2) //_LBB105_10
{
	r17 = heap32[(r18+2)];
	r18 = 1;
	r18 = (r18 - r17)|0;
	r18 = r18 << 4;
	r18 = (r16 + r18)|0;
	r18 = r18 >> 2;
	f5 = heapFloat[(r18+2)];
	f6 = heapFloat[(r22+2)];
	f5 = f5-f6;
	f7 = heapFloat[(r23+2)];
	f1 = f1 < f4 ? f4 : f1;
	f4 = f5*f7;
if(!(f1 >f4)) //_LBB105_9
{
	r17 = r17 << 4;
	r16 = (r16 + r17)|0;
	r16 = r16 >> 2;
	f5 = heapFloat[(r16+2)];
	f5 = f5-f6;
	f2 = f3 < f2 ? f3 : f2;
	f3 = f5*f7;
if(!(f3 >f2)) //_LBB105_9
{
	f1 = f1 < f3 ? f3 : f1;
if(!(f1 >=f0)) //_LBB105_9
{
	f1 = f4 < f2 ? f4 : f2;
	f2 =                         0;
if(!(f1 <=f2)) //_LBB105_9
{
	r16 = heap32[(r15+10)];
	if(r16 ==0) //_LBB105_39
{
	r13 = r6 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+3)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r14;
	__FUNCTION_TABLE__[(r13)>>2](i7);
}
else{
	if(r12 >r11) //_LBB105_17
{
	r14 = r0 << 1;
_23: do {
	if(r0 <=r14) //_LBB105_19
{
if(!(r0 >=r14)) //_LBB105_18
{
	if(r9 <r14) //_LBB105_22
{
	if(r14 !=0) //_LBB105_24
{
	r9 = heap32[(r7)];
	r11 = r0 << 3;
	r9 = (r9 + 1)|0;
	r11 = r11 | 3;
	heap32[(r7)] = r9;
	r9 = (r11 + 16)|0;
	heap32[(g0)] = r9;
	malloc(i7);
	r9 = r_g0;
	if(r9 !=0) //_LBB105_26
{
	r11 = 0;
	r12 = (r9 + 4)|0;
	r11 = (r11 - r12)|0;
	r11 = r11 & 15;
	r11 = (r9 + r11)|0;
	r12 = (r11 + 4)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r9;
	r9 = r12;
}
}
else{
	r9 = 0;
}
if(!(r0 <1)) //_LBB105_30
{
	r11 = r8;
	r12 = r9;
	r16 = r0;
_35: while(true){
	r17 = r11 >> 2;
	r16 = (r16 + -1)|0;
	r18 = (r12 + 4)|0;
	r11 = (r11 + 4)|0;
	r12 = r12 >> 2;
	r17 = heap32[(r17)];
	heap32[(r12)] = r17;
	r12 = r18;
if(!(r16 !=0)) //_LBB105_29
{
break _35;
}
}
}
if(!(r8 ==0)) //_LBB105_32
{
	r11 = gNumAlignedFree;
	r11 = r11 >> 2;
	r12 = heap32[(r11)];
	r12 = (r12 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r11)] = r12;
	r8 = heap32[(r8+-1)];
	heap32[(g0)] = r8;
	free(i7);
}
	if(r0 <r14) //_LBB105_34
{
	r8 = r9;
	r9 = r14;
}
else{
	r8 = r9;
	r9 = r14;
break _23;
}
}
	r11 = r0;
_45: while(true){
	r12 = r0 << 2;
	r12 = (r8 + r12)|0;
	r11 = (r11 + -1)|0;
	r0 = (r0 + 1)|0;
	r12 = r12 >> 2;
	heap32[(r12)] = 0;
if(!(r11 !=0)) //_LBB105_36
{
break _23;
}
}
}
}
} while(0);
	r11 = (r14 + -2)|0;
}
else{
	r14 = r0;
}
	r0 = r13 << 2;
	r0 = (r8 + r0)|0;
	r0 = r0 >> 2;
	r12 = heap32[(r15+9)];
	heap32[(r0+-1)] = r12;
	r15 = heap32[(r15+10)];
	r12 = (r13 + 1)|0;
	heap32[(r0)] = r15;
	r0 = r14;
}
}
}
}
}
}
}
if(!(r12 !=0)) //_LBB105_7
{
break _9;
}
}
if(!(r8 ==0)) //_LBB105_43
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r8 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	return;
}