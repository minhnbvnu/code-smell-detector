function _ZN14btQuantizedBvh9buildTreeEii(sp)
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
	var r24;
	var r25;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
	var f12;
	var f13;
	var f14;
	var f15;
	var f16;
	var f17;
var __label__ = 0;
	i7 = sp + -112;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
	r2 = (r1 - r0)|0;
	if(r2 >0) //_LBB154_2
{
	r3 = heap32[(fp)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+14)];
	if(r2 !=1) //_LBB154_7
{
_5: do {
	if(r0 <r1) //_LBB154_9
{
	r6 = heapU8[r3+60];
	f1 =                         0;
	r7 = r0;
	f2 = f1;
	f3 = f1;
_7: while(true){
	r8 = r6 & 255;
	if(r8 ==0) //_LBB154_12
{
	r9 = heap32[(r4+19)];
	r10 = r7 << 6;
	r9 = (r9 + r10)|0;
	r9 = r9 >> 2;
	f0 = heapFloat[(r9)];
	f5 = heapFloat[(r9+1)];
	f8 = heapFloat[(r9+2)];
	f4 = heapFloat[(r9+4)];
	f6 = heapFloat[(r9+5)];
	f7 = heapFloat[(r9+6)];
}
else{
	r9 = heap32[(r4+29)];
	r10 = r7 << 4;
	r11 = (r9 + r10)|0;
	r9 = heapU16[(r9+r10)>>1];
	r10 = heapU16[(r11+2)>>1];
	r12 = heapU16[(r11+4)>>1];
	r13 = heapU16[(r11+6)>>1];
	r14 = heapU16[(r11+8)>>1];
	r11 = heapU16[(r11+10)>>1];
	f0 = uint(r9); //fuitos r9, f0
	f4 = heapFloat[(r4+9)];
	f5 = uint(r13); //fuitos r13, f5
	f6 = uint(r10); //fuitos r10, f6
	f7 = heapFloat[(r4+10)];
	f8 = uint(r14); //fuitos r14, f8
	f9 = uint(r12); //fuitos r12, f9
	f10 = heapFloat[(r4+11)];
	f11 = uint(r11); //fuitos r11, f11
	f0 = f0/f4;
	f12 = heapFloat[(r4+1)];
	f4 = f5/f4;
	f5 = f6/f7;
	f6 = heapFloat[(r4+2)];
	f7 = f8/f7;
	f8 = f9/f10;
	f9 = heapFloat[(r4+3)];
	f10 = f11/f10;
	f0 = f0+f12;
	f5 = f5+f6;
	f8 = f8+f9;
	f4 = f4+f12;
	f6 = f7+f6;
	f7 = f10+f9;
}
	f0 = f4+f0;
	f4 =                       0.5;
	f5 = f6+f5;
	f6 = f7+f8;
	f0 = f0*f4;
	f5 = f5*f4;
	f6 = f6*f4;
	r7 = (r7 + 1)|0;
	f3 = f3+f0;
	f2 = f2+f5;
	f1 = f1+f6;
if(!(r1 !=r7)) //_LBB154_10
{
break _7;
}
}
	f0 = r2; //fitos r2, f0
	if(r0 <r1) //_LBB154_16
{
	f5 =                         1;
	f5 = f5/f0;
	f6 = f3*f5;
	f7 = f2*f5;
	f5 = f1*f5;
	f1 =                         0;
	r6 = r0;
	f2 = f1;
	f3 = f1;
_16: while(true){
	if(r8 ==0) //_LBB154_19
{
	r7 = heap32[(r4+19)];
	r9 = r6 << 6;
	r7 = (r7 + r9)|0;
	r7 = r7 >> 2;
	f8 = heapFloat[(r7)];
	f10 = heapFloat[(r7+1)];
	f13 = heapFloat[(r7+2)];
	f9 = heapFloat[(r7+4)];
	f11 = heapFloat[(r7+5)];
	f12 = heapFloat[(r7+6)];
}
else{
	r7 = heap32[(r4+29)];
	r9 = r6 << 4;
	r10 = (r7 + r9)|0;
	r7 = heapU16[(r7+r9)>>1];
	r9 = heapU16[(r10+2)>>1];
	r11 = heapU16[(r10+4)>>1];
	r12 = heapU16[(r10+6)>>1];
	r13 = heapU16[(r10+8)>>1];
	r10 = heapU16[(r10+10)>>1];
	f8 = uint(r7); //fuitos r7, f8
	f9 = heapFloat[(r4+9)];
	f10 = uint(r12); //fuitos r12, f10
	f11 = uint(r9); //fuitos r9, f11
	f12 = heapFloat[(r4+10)];
	f13 = uint(r13); //fuitos r13, f13
	f14 = uint(r11); //fuitos r11, f14
	f15 = heapFloat[(r4+11)];
	f16 = uint(r10); //fuitos r10, f16
	f8 = f8/f9;
	f17 = heapFloat[(r4+1)];
	f9 = f10/f9;
	f10 = f11/f12;
	f11 = heapFloat[(r4+2)];
	f12 = f13/f12;
	f13 = f14/f15;
	f14 = heapFloat[(r4+3)];
	f15 = f16/f15;
	f8 = f8+f17;
	f10 = f10+f11;
	f13 = f13+f14;
	f9 = f9+f17;
	f11 = f12+f11;
	f12 = f15+f14;
}
	f8 = f9+f8;
	f9 = f11+f10;
	f10 = f12+f13;
	f8 = f8*f4;
	f9 = f9*f4;
	f10 = f10*f4;
	f8 = f8-f6;
	f9 = f9-f7;
	f10 = f10-f5;
	f8 = f8*f8;
	f9 = f9*f9;
	f10 = f10*f10;
	r6 = (r6 + 1)|0;
	f3 = f3+f8;
	f2 = f2+f9;
	f1 = f1+f10;
if(!(r1 !=r6)) //_LBB154_17
{
break _5;
}
}
}
else{
	f1 =                         0;
	f2 = f1;
	f3 = f1;
}
}
else{
	f0 = r2; //fitos r2, f0
	f1 =                         0;
	f2 = f1;
	f3 = f1;
}
} while(0);
	f4 =                        -1;
	f5 =                         1;
	f0 = f0+f4;
	f0 = f5/f0;
	f3 = f3*f0;
	f2 = f2*f0;
	f0 = f1*f0;
	if(f3 >=f2) //_LBB154_23
{
	r6 = 2;
	r7 = 0;
	r6 = f3 < f0 ? r6 : r7;
}
else{
	r6 = 2;
	r7 = 1;
	r6 = f2 < f0 ? r6 : r7;
}
	r7 = sp + -32;
	r8 = r7 >> 2;
	heap32[(fp+-8)] = 0;
	heap32[(r8+1)] = 0;
	heap32[(r8+2)] = 0;
	heap32[(r8+3)] = 0;
	if(r0 <r1) //_LBB154_26
{
	r9 = heapU8[r3+60];
	f0 =                         0;
	r10 = r0;
	f1 = f0;
	f2 = f0;
_31: while(true){
	r11 = r9 & 255;
	if(r11 ==0) //_LBB154_29
{
	r11 = heap32[(r4+19)];
	r12 = r10 << 6;
	r11 = (r11 + r12)|0;
	r11 = r11 >> 2;
	f3 = heapFloat[(r11)];
	f6 = heapFloat[(r11+1)];
	f9 = heapFloat[(r11+2)];
	f4 = heapFloat[(r11+4)];
	f7 = heapFloat[(r11+5)];
	f8 = heapFloat[(r11+6)];
}
else{
	r11 = heap32[(r4+29)];
	r12 = r10 << 4;
	r13 = (r11 + r12)|0;
	r11 = heapU16[(r11+r12)>>1];
	r12 = heapU16[(r13+2)>>1];
	r14 = heapU16[(r13+4)>>1];
	r15 = heapU16[(r13+6)>>1];
	r16 = heapU16[(r13+8)>>1];
	r13 = heapU16[(r13+10)>>1];
	f3 = uint(r11); //fuitos r11, f3
	f4 = heapFloat[(r4+9)];
	f6 = uint(r15); //fuitos r15, f6
	f7 = uint(r12); //fuitos r12, f7
	f8 = heapFloat[(r4+10)];
	f9 = uint(r16); //fuitos r16, f9
	f10 = uint(r14); //fuitos r14, f10
	f11 = heapFloat[(r4+11)];
	f12 = uint(r13); //fuitos r13, f12
	f3 = f3/f4;
	f13 = heapFloat[(r4+1)];
	f4 = f6/f4;
	f6 = f7/f8;
	f7 = heapFloat[(r4+2)];
	f8 = f9/f8;
	f9 = f10/f11;
	f10 = heapFloat[(r4+3)];
	f11 = f12/f11;
	f3 = f3+f13;
	f6 = f6+f7;
	f9 = f9+f10;
	f4 = f4+f13;
	f7 = f8+f7;
	f8 = f11+f10;
}
	f3 = f4+f3;
	f4 =                       0.5;
	f6 = f7+f6;
	f7 = f8+f9;
	f3 = f3*f4;
	f6 = f6*f4;
	f4 = f7*f4;
	r10 = (r10 + 1)|0;
	f2 = f2+f3;
	f1 = f1+f6;
	f0 = f0+f4;
if(!(r1 !=r10)) //_LBB154_27
{
break _31;
}
}
	heapFloat[(r8+2)] = f0;
	heapFloat[(r8+1)] = f1;
	heapFloat[(fp+-8)] = f2;
}
else{
	f0 =                         0;
	f1 = f0;
	f2 = f0;
}
	f3 = r2; //fitos r2, f3
	f3 = f5/f3;
	f2 = f2*f3;
	f1 = f1*f3;
	heapFloat[(fp+-8)] = f2;
	f0 = f0*f3;
	heapFloat[(r8+1)] = f1;
	heapFloat[(r8+2)] = f0;
_40: do {
	if(r0 <r1) //_LBB154_34
{
	r8 = r6 << 2;
	r6 = (r7 + r8)|0;
	r6 = r6 >> 2;
	f0 = heapFloat[(r6)];
	r6 = r0 << 4;
	r7 = (r0 - r1)|0;
	r9 = r0 << 6;
	r10 = r6 | 12;
	r11 = 0;
	r12 = r9;
	r6 = r0;
_42: while(true){
	r13 = heapU8[r3+60];
	if(r13 ==0) //_LBB154_37
{
	r14 = r11 << 4;
	r15 = heap32[(r4+19)];
	r15 = (r15 + r9)|0;
	r14 = r14 << 2;
	r14 = (r15 - r14)|0;
	r14 = r14 >> 2;
	f1 = heapFloat[(r14)];
	f3 = heapFloat[(r14+1)];
	f6 = heapFloat[(r14+2)];
	f2 = heapFloat[(r14+4)];
	f4 = heapFloat[(r14+5)];
	f5 = heapFloat[(r14+6)];
}
else{
	r14 = heap32[(r4+29)];
	r14 = (r14 + r10)|0;
	r15 = r11 << 4;
	r14 = (r14 - r15)|0;
	r15 = heapU16[(r14+-12)>>1];
	r16 = heapU16[(r14+-10)>>1];
	r17 = heapU16[(r14+-8)>>1];
	r18 = heapU16[(r14+-6)>>1];
	r19 = heapU16[(r14+-4)>>1];
	r14 = heapU16[(r14+-2)>>1];
	f1 = uint(r15); //fuitos r15, f1
	f2 = heapFloat[(r4+9)];
	f3 = uint(r18); //fuitos r18, f3
	f4 = uint(r16); //fuitos r16, f4
	f5 = heapFloat[(r4+10)];
	f6 = uint(r19); //fuitos r19, f6
	f7 = uint(r17); //fuitos r17, f7
	f8 = heapFloat[(r4+11)];
	f9 = uint(r14); //fuitos r14, f9
	f1 = f1/f2;
	f10 = heapFloat[(r4+1)];
	f2 = f3/f2;
	f3 = f4/f5;
	f4 = heapFloat[(r4+2)];
	f5 = f6/f5;
	f6 = f7/f8;
	f7 = heapFloat[(r4+3)];
	f8 = f9/f8;
	f1 = f1+f10;
	f3 = f3+f4;
	f6 = f6+f7;
	f2 = f2+f10;
	f4 = f5+f4;
	f5 = f8+f7;
}
	f1 = f2+f1;
	f2 =                       0.5;
	r14 = sp + -48;
	f3 = f4+f3;
	f1 = f1*f2;
	f4 = f5+f6;
	r15 = r14 >> 2;
	f3 = f3*f2;
	heapFloat[(fp+-12)] = f1;
	f1 = f4*f2;
	heapFloat[(r15+1)] = f3;
	r14 = (r14 + r8)|0;
	heapFloat[(r15+2)] = f1;
	r14 = r14 >> 2;
	heap32[(r15+3)] = 0;
	f1 = heapFloat[(r14)];
	if(f1 >f0) //_LBB154_40
{
	if(r13 ==0) //_LBB154_42
{
	r13 = r11 << 4;
	r14 = heap32[(r4+19)];
	r15 = (r14 + r9)|0;
	r13 = r13 << 2;
	r13 = (r15 - r13)|0;
	r13 = r13 >> 2;
	r15 = heap32[(r13+15)];
	r16 = heap32[(r13+14)];
	r17 = heap32[(r13+13)];
	r18 = heap32[(r13+12)];
	r19 = heap32[(r13+11)];
	r20 = heap32[(r13+10)];
	r21 = heap32[(r13+9)];
	r22 = heap32[(r13+8)];
	f1 = heapFloat[(r13+7)];
	f2 = heapFloat[(r13+6)];
	f3 = heapFloat[(r13+5)];
	f4 = heapFloat[(r13+4)];
	f5 = heapFloat[(r13+3)];
	f6 = heapFloat[(r13+2)];
	f7 = heapFloat[(r13+1)];
	f8 = heapFloat[(r13)];
	r13 = r6 << 6;
	r23 = (r14 + r12)|0;
	r14 = (r14 + r13)|0;
	heap32[(g0)] = r23;
	heap32[(g0+1)] = r14;
	heap32[(g0+2)] = 64;
	memcpy(i7);
	r14 = heap32[(r4+19)];
	r13 = (r14 + r13)|0;
	r13 = r13 >> 2;
	heapFloat[(r13)] = f8;
	heapFloat[(r13+1)] = f7;
	heapFloat[(r13+2)] = f6;
	heapFloat[(r13+3)] = f5;
	heapFloat[(r13+4)] = f4;
	heapFloat[(r13+5)] = f3;
	heapFloat[(r13+6)] = f2;
	heapFloat[(r13+7)] = f1;
	heap32[(r13+8)] = r22;
	heap32[(r13+9)] = r21;
	heap32[(r13+10)] = r20;
	heap32[(r13+11)] = r19;
	heap32[(r13+12)] = r18;
	heap32[(r13+13)] = r17;
	heap32[(r13+14)] = r16;
	heap32[(r13+15)] = r15;
}
else{
	r13 = heap32[(r4+29)];
	r14 = (r13 + r10)|0;
	r15 = r11 << 4;
	r14 = (r14 - r15)|0;
	r15 = r6 << 4;
	r16 = r14 >> 2;
	r17 = heap32[(r16)];
	r18 = heapU16[(r14+-2)>>1];
	r19 = heapU16[(r14+-4)>>1];
	r20 = heapU16[(r14+-6)>>1];
	r21 = heapU16[(r14+-8)>>1];
	r22 = heapU16[(r14+-10)>>1];
	r23 = heapU16[(r13+r15)>>1];
	r24 = heapU16[(r14+-12)>>1];
	r13 = (r13 + r15)|0;
	heap16[(r14+-12)>>1] = r23;
	r23 = heapU16[(r13+2)>>1];
	heap16[(r14+-10)>>1] = r23;
	r23 = heapU16[(r13+4)>>1];
	heap16[(r14+-8)>>1] = r23;
	r23 = heapU16[(r13+6)>>1];
	heap16[(r14+-6)>>1] = r23;
	r23 = heapU16[(r13+8)>>1];
	heap16[(r14+-4)>>1] = r23;
	r23 = heapU16[(r13+10)>>1];
	r13 = r13 >> 2;
	heap16[(r14+-2)>>1] = r23;
	r13 = heap32[(r13+3)];
	heap32[(r16)] = r13;
	r13 = heap32[(r4+29)];
	r14 = (r13 + r15)|0;
	heap16[(r13+r15)>>1] = r24;
	heap16[(r14+2)>>1] = r22;
	heap16[(r14+4)>>1] = r21;
	heap16[(r14+6)>>1] = r20;
	heap16[(r14+8)>>1] = r19;
	r13 = r14 >> 2;
	heap16[(r14+10)>>1] = r18;
	heap32[(r13+3)] = r17;
}
	r6 = (r6 + 1)|0;
}
	r11 = (r11 + -1)|0;
	r12 = (r12 + 64)|0;
if(!(r7 !=r11)) //_LBB154_35
{
break _40;
}
}
}
else{
	r6 = r0;
}
} while(0);
	r7 = (r2 / 3)|0;
	r8 = (r7 + r0)|0;
	if(r8 >=r6) //_LBB154_48
{
__label__ = 46;
}
else{
	r8 = (r1 + -1)|0;
	r7 = (r8 - r7)|0;
	if(r7 <=r6) //_LBB154_48
{
__label__ = 46;
}
else{
__label__ = 47;
}
}
if (__label__ == 46){
	r6 = r2 >> 1;
	r6 = (r6 + r0)|0;
}
if(!(r6 ==r0)) //_LBB154_51
{
	if(r6 !=r1) //_LBB154_52
{
	r2 = heap32[(r4+14)];
	heap32[(fp+-21)] = r2;
	r2 = heapU8[r3+60];
	if(r2 ==0) //_LBB154_54
{
	r2 = heap32[(fp+-21)];
	r2 = r2 << 6;
	r7 = heap32[(r4+24)];
	r2 = (r7 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = heap32[(r4+5)];
	heap32[(r2+1)] = heap32[(r4+6)];
	heap32[(r2+2)] = heap32[(r4+7)];
	heap32[(r2+3)] = heap32[(r4+8)];
}
else{
	r2 = heap32[(r4+34)];
	r7 = heap32[(fp+-21)];
	r7 = r7 << 4;
	r2 = (r2 + r7)|0;
	r7 = (r3 + 20)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = 0;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
}
	r2 = heap32[(r4+14)];
	r7 = heapU8[r3+60];
	if(r7 ==0) //_LBB154_57
{
	r2 = r2 << 6;
	r7 = heap32[(r4+24)];
	r2 = (r7 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2+4)] = heap32[(r4+1)];
	heap32[(r2+5)] = heap32[(r4+2)];
	heap32[(r2+6)] = heap32[(r4+3)];
	heap32[(r2+7)] = heap32[(r4+4)];
}
else{
	r7 = heap32[(r4+34)];
	r2 = r2 << 4;
	r2 = (r7 + r2)|0;
	r2 = (r2 + 6)|0;
	r7 = (r3 + 4)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = 1;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
}
_73: do {
if(!(r0 >=r1)) //_LBB154_95
{
	r2 = r0;
_75: while(true){
	r7 = heapU8[r3+60];
_77: do {
	if(r7 ==0) //_LBB154_69
{
	r7 = heap32[(r4+19)];
	r8 = r2 << 6;
	r7 = (r7 + r8)|0;
	r7 = r7 >> 2;
	f0 = heapFloat[(r7+4)];
	r8 = sp + -80;
	heapFloat[(fp+-20)] = f0;
	f1 = heapFloat[(r7+5)];
	r8 = r8 >> 2;
	heapFloat[(r8+1)] = f1;
	f2 = heapFloat[(r7+6)];
	heapFloat[(r8+2)] = f2;
	f3 = heapFloat[(r7+7)];
	heapFloat[(r8+3)] = f3;
	f4 = heapFloat[(r7)];
	r8 = sp + -64;
	heapFloat[(fp+-16)] = f4;
	f5 = heapFloat[(r7+1)];
	r8 = r8 >> 2;
	heapFloat[(r8+1)] = f5;
	f6 = heapFloat[(r7+2)];
	heapFloat[(r8+2)] = f6;
	f7 = heapFloat[(r7+3)];
	heapFloat[(r8+3)] = f7;
	r7 = heap32[(r4+14)];
	r8 = heap32[(r4+24)];
	r7 = r7 << 6;
	r8 = (r8 + r7)|0;
	r8 = r8 >> 2;
	f8 = heapFloat[(r8)];
if(!(f4 >=f8)) //_LBB154_71
{
	heapFloat[(r8)] = f4;
}
	f4 = heapFloat[(r8+1)];
if(!(f5 >=f4)) //_LBB154_73
{
	heapFloat[(r8+1)] = f5;
}
	f4 = heapFloat[(r8+2)];
if(!(f6 >=f4)) //_LBB154_75
{
	heapFloat[(r8+2)] = f6;
}
	f4 = heapFloat[(r8+3)];
if(!(f7 >=f4)) //_LBB154_77
{
	heapFloat[(r8+3)] = f7;
}
	r8 = heap32[(r4+24)];
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	f4 = heapFloat[(r7+4)];
if(!(f4 >=f0)) //_LBB154_79
{
	heapFloat[(r7+4)] = f0;
}
	f0 = heapFloat[(r7+5)];
if(!(f0 >=f1)) //_LBB154_81
{
	heapFloat[(r7+5)] = f1;
}
	f0 = heapFloat[(r7+6)];
if(!(f0 >=f2)) //_LBB154_83
{
	heapFloat[(r7+6)] = f2;
}
	f0 = heapFloat[(r7+7)];
	if(f0 >=f3) //_LBB154_94
{
break _77;
}
else{
	heapFloat[(r7+7)] = f3;
}
}
else{
	r7 = heap32[(r4+29)];
	r8 = r2 << 4;
	r9 = (r7 + r8)|0;
	r10 = sp + -80;
	r11 = heapU16[(r9+10)>>1];
	r12 = heapU16[(r9+8)>>1];
	r13 = heapU16[(r9+6)>>1];
	f0 = heapFloat[(r4+11)];
	f1 = heapFloat[(r4+10)];
	f2 = heapFloat[(r4+9)];
	r14 = r10 >> 2;
	f3 = uint(r13); //fuitos r13, f3
	heap32[(r14+3)] = 0;
	f3 = f3/f2;
	f4 = heapFloat[(r4+1)];
	f3 = f3+f4;
	f5 = uint(r12); //fuitos r12, f5
	heapFloat[(fp+-20)] = f3;
	f3 = f5/f1;
	f5 = heapFloat[(r4+2)];
	f3 = f3+f5;
	f6 = uint(r11); //fuitos r11, f6
	heapFloat[(r14+1)] = f3;
	f3 = f6/f0;
	f6 = heapFloat[(r4+3)];
	f3 = f3+f6;
	heapFloat[(r14+2)] = f3;
	r7 = heapU16[(r7+r8)>>1];
	r8 = sp + -64;
	f3 = uint(r7); //fuitos r7, f3
	r7 = heapU16[(r9+4)>>1];
	r9 = heapU16[(r9+2)>>1];
	f7 = uint(r9); //fuitos r9, f7
	f2 = f3/f2;
	r9 = r8 >> 2;
	f3 = uint(r7); //fuitos r7, f3
	f1 = f7/f1;
	f2 = f2+f4;
	heap32[(r9+3)] = 0;
	f0 = f3/f0;
	f1 = f1+f5;
	heapFloat[(fp+-16)] = f2;
	f0 = f0+f6;
	heapFloat[(r9+1)] = f1;
	heapFloat[(r9+2)] = f0;
	r7 = heap32[(r4+14)];
	r9 = sp + -6;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = 0;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r8 = sp + -12;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = 1;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r8 = heapU16[(sp+-6)>>1];
	r9 = heap32[(r4+34)];
	r7 = r7 << 4;
	r10 = heapU16[(r9+r7)>>1];
	if(uint(r10) >uint(r8)) //_LBB154_63
{
	heap16[(r9+r7)>>1] = r8;
	r9 = heap32[(r4+34)];
}
	r8 = (r9 + r7)|0;
	r10 = heapU16[(sp+-12)>>1];
	r11 = heapU16[(r8+6)>>1];
	if(uint(r11) <uint(r10)) //_LBB154_66
{
	heap16[(r8+6)>>1] = r10;
	r9 = heap32[(r4+34)];
}
	r8 = (r9 + r7)|0;
	r10 = heapU16[(sp+-4)>>1];
	r11 = heapU16[(r8+2)>>1];
	if(uint(r11) >uint(r10)) //_LBB154_89
{
	heap16[(r8+2)>>1] = r10;
	r9 = heap32[(r4+34)];
}
	r8 = (r9 + r7)|0;
	r10 = heapU16[(sp+-10)>>1];
	r11 = heapU16[(r8+8)>>1];
	if(uint(r11) <uint(r10)) //_LBB154_90
{
	heap16[(r8+8)>>1] = r10;
	r9 = heap32[(r4+34)];
}
	r8 = (r9 + r7)|0;
	r10 = heapU16[(sp+-2)>>1];
	r11 = heapU16[(r8+4)>>1];
	if(uint(r11) >uint(r10)) //_LBB154_92
{
	heap16[(r8+4)>>1] = r10;
	r9 = heap32[(r4+34)];
}
	r7 = (r9 + r7)|0;
	r8 = heapU16[(sp+-8)>>1];
	r9 = heapU16[(r7+10)>>1];
	if(uint(r9) <uint(r8)) //_LBB154_93
{
	heap16[(r7+10)>>1] = r8;
}
}
} while(0);
	r2 = (r2 + 1)|0;
if(!(r1 !=r2)) //_LBB154_60
{
break _73;
}
}
}
} while(0);
	r2 = heap32[(r4+14)];
	r7 = (r2 + 1)|0;
	heap32[(r4+14)] = r7;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r6;
	_ZN14btQuantizedBvh9buildTreeEii(i7);
	r0 = heap32[(r4+14)];
	heap32[(fp+-23)] = r0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r1;
	_ZN14btQuantizedBvh9buildTreeEii(i7);
	r0 = heap32[(r4+14)];
	r0 = (r0 - r5)|0;
	heap32[(fp+-22)] = r0;
	r0 = heapU8[r3+60];
_120: do {
if(!(r0 ==0)) //_LBB154_143
{
	r0 = heap32[(fp+-22)];
	r0 = r0 << 4;
if(!(r0 <2049)) //_LBB154_142
{
	r0 = heap32[(r4+34)];
	r1 = heap32[(fp+-23)];
	r1 = r1 << 4;
	heap32[(fp+-24)] = r1;
	r2 = r2 << 4;
	r1 = (r0 + r1)|0;
	r2 = (r0 + r2)|0;
	r5 = r1 >> 2;
	r6 = r2 >> 2;
	r5 = heap32[(r5+3)];
	r8 = 0;
	r6 = heap32[(r6+7)];
	r9 = 1;
	r10 = (r8 - r6)|0;
	r6 = r6 < 0 ? r10 : r9;
	r10 = r6 << 4;
if(!(r10 >2048)) //_LBB154_119
{
	r10 = heap32[(r4+39)];
	r11 = heap32[(r4+38)];
	if(r10 ==r11) //_LBB154_100
{
	r12 = r11 << 1;
	r12 = r11 == 0 ? r9 : r12;
	if(r10 >=r12) //_LBB154_99
{
__label__ = 92;
}
else{
	if(r12 !=0) //_LBB154_103
{
	r10 = gNumAlignedAllocs;
	r10 = r10 >> 2;
	r13 = heap32[(r10)];
	r13 = (r13 + 1)|0;
	r14 = r12 << 5;
	heap32[(r10)] = r13;
	r10 = r14 | 19;
	heap32[(g0)] = r10;
	malloc(i7);
	r13 = r_g0;
	if(r13 !=0) //_LBB154_105
{
	r10 = 0;
	r14 = (r13 + 4)|0;
	r10 = (r10 - r14)|0;
	r10 = r10 & 15;
	r10 = (r13 + r10)|0;
	r14 = (r10 + 4)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r13;
	r13 = r14;
}
}
else{
	r13 = 0;
}
	r14 = (r3 + 160)|0;
	if(r11 <1) //_LBB154_108
{
	r10 = r14 >> 2;
	r16 = heap32[(r10)];
}
else{
	r10 = 0;
	r15 = r11;
_137: while(true){
	r16 = r14 >> 2;
	r16 = heap32[(r16)];
	r17 = (r16 + r10)|0;
	r17 = r17 >> 2;
	r18 = (r13 + r10)|0;
	r15 = (r15 + -1)|0;
	r10 = (r10 + 32)|0;
	r19 = heap32[(r17)];
	r18 = r18 >> 2;
	r20 = heap32[(r17+1)];
	r21 = heap32[(r17+2)];
	r22 = heap32[(r17+3)];
	r23 = heap32[(r17+4)];
	r24 = heap32[(r17+5)];
	r25 = heap32[(r17+6)];
	r17 = heap32[(r17+7)];
	heap32[(r18)] = r19;
	heap32[(r18+1)] = r20;
	heap32[(r18+2)] = r21;
	heap32[(r18+3)] = r22;
	heap32[(r18+4)] = r23;
	heap32[(r18+5)] = r24;
	heap32[(r18+6)] = r25;
	heap32[(r18+7)] = r17;
if(!(r15 !=0)) //_LBB154_109
{
break _137;
}
}
	r14 = (r3 + 160)|0;
}
	if(r16 !=0) //_LBB154_113
{
	r10 = heapU8[r3+164];
	if(r10 !=0) //_LBB154_115
{
	r10 = gNumAlignedFree;
	r10 = r10 >> 2;
	r15 = heap32[(r10)];
	r15 = (r15 + 1)|0;
	r16 = r16 >> 2;
	heap32[(r10)] = r15;
	r10 = heap32[(r16+-1)];
	heap32[(g0)] = r10;
	free(i7);
	r10 = heap32[(r4+38)];
}
else{
	r10 = r11;
}
	r15 = r14 >> 2;
	heap32[(r15)] = 0;
}
else{
	r10 = r11;
}
	r14 = r14 >> 2;
	heap8[r3+164] = r9;
	heap32[(r14)] = r13;
	heap32[(r4+39)] = r12;
__label__ = 110;
}
}
else{
__label__ = 92;
}
if (__label__ == 92){
	r10 = r11;
}
	r10 = (r10 + 1)|0;
	heap32[(r4+38)] = r10;
	r10 = heap32[(r4+40)];
	r12 = heapU16[(r2+16)>>1];
	r11 = r11 << 5;
	heap16[(r10+r11)>>1] = r12;
	r10 = (r10 + r11)|0;
	r11 = heapU16[(r2+18)>>1];
	heap16[(r10+2)>>1] = r11;
	r11 = heapU16[(r2+20)>>1];
	heap16[(r10+4)>>1] = r11;
	r11 = heapU16[(r2+22)>>1];
	heap16[(r10+6)>>1] = r11;
	r11 = heapU16[(r2+24)>>1];
	heap16[(r10+8)>>1] = r11;
	r2 = heapU16[(r2+26)>>1];
	r11 = r10 >> 2;
	heap16[(r10+10)>>1] = r2;
	heap32[(r11+3)] = r7;
	heap32[(r11+4)] = r6;
}
	r2 = (r8 - r5)|0;
	r2 = r5 < 0 ? r2 : r9;
	r5 = r2 << 4;
if(!(r5 >2048)) //_LBB154_141
{
	r5 = heap32[(r4+39)];
	r6 = heap32[(r4+38)];
	if(r5 ==r6) //_LBB154_122
{
	r7 = r6 << 1;
	r7 = r6 == 0 ? r9 : r7;
	if(r5 >=r7) //_LBB154_121
{
__label__ = 113;
}
else{
	if(r7 !=0) //_LBB154_125
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r10 = heap32[(r5)];
	r10 = (r10 + 1)|0;
	r11 = r7 << 5;
	heap32[(r5)] = r10;
	r5 = r11 | 19;
	heap32[(g0)] = r5;
	malloc(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB154_127
{
	r5 = (r10 + 4)|0;
	r5 = (r8 - r5)|0;
	r5 = r5 & 15;
	r5 = (r10 + r5)|0;
	r11 = (r5 + 4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r10;
	r10 = r11;
}
}
else{
	r10 = 0;
}
	r11 = (r3 + 160)|0;
	if(r6 <1) //_LBB154_130
{
	r5 = r11 >> 2;
	r12 = heap32[(r5)];
}
else{
	r5 = r6;
_166: while(true){
	r12 = r11 >> 2;
	r12 = heap32[(r12)];
	r13 = (r12 + r8)|0;
	r13 = r13 >> 2;
	r14 = (r10 + r8)|0;
	r5 = (r5 + -1)|0;
	r8 = (r8 + 32)|0;
	r15 = heap32[(r13)];
	r14 = r14 >> 2;
	r16 = heap32[(r13+1)];
	r17 = heap32[(r13+2)];
	r18 = heap32[(r13+3)];
	r19 = heap32[(r13+4)];
	r20 = heap32[(r13+5)];
	r21 = heap32[(r13+6)];
	r13 = heap32[(r13+7)];
	heap32[(r14)] = r15;
	heap32[(r14+1)] = r16;
	heap32[(r14+2)] = r17;
	heap32[(r14+3)] = r18;
	heap32[(r14+4)] = r19;
	heap32[(r14+5)] = r20;
	heap32[(r14+6)] = r21;
	heap32[(r14+7)] = r13;
if(!(r5 !=0)) //_LBB154_131
{
break _166;
}
}
	r11 = (r3 + 160)|0;
}
	if(r12 !=0) //_LBB154_135
{
	r5 = heapU8[r3+164];
	if(r5 !=0) //_LBB154_137
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r8 = heap32[(r5)];
	r8 = (r8 + 1)|0;
	r12 = r12 >> 2;
	heap32[(r5)] = r8;
	r5 = heap32[(r12+-1)];
	heap32[(g0)] = r5;
	free(i7);
	r5 = heap32[(r4+38)];
}
else{
	r5 = r6;
}
	r8 = r11 >> 2;
	heap32[(r8)] = 0;
}
else{
	r5 = r6;
}
	r8 = r11 >> 2;
	heap8[r3+164] = r9;
	heap32[(r8)] = r10;
	heap32[(r4+39)] = r7;
__label__ = 131;
}
}
else{
__label__ = 113;
}
if (__label__ == 113){
	r5 = r6;
}
	r5 = (r5 + 1)|0;
	heap32[(r4+38)] = r5;
	r5 = heap32[(r4+40)];
	r7 = heap32[(fp+-24)];
	r0 = heapU16[(r0+r7)>>1];
	r6 = r6 << 5;
	heap16[(r5+r6)>>1] = r0;
	r0 = (r5 + r6)|0;
	r5 = heapU16[(r1+2)>>1];
	heap16[(r0+2)>>1] = r5;
	r5 = heapU16[(r1+4)>>1];
	heap16[(r0+4)>>1] = r5;
	r5 = heapU16[(r1+6)>>1];
	heap16[(r0+6)>>1] = r5;
	r5 = heapU16[(r1+8)>>1];
	heap16[(r0+8)>>1] = r5;
	r1 = heapU16[(r1+10)>>1];
	r5 = r0 >> 2;
	heap16[(r0+10)>>1] = r1;
	r0 = heap32[(fp+-23)];
	heap32[(r5+3)] = r0;
	heap32[(r5+4)] = r2;
}
	r0 = heap32[(r4+38)];
	heap32[(r4+42)] = r0;
	r0 = heapU8[r3+60];
	if(r0 ==0) //_LBB154_143
{
break _120;
}
}
	r0 = heap32[(fp+-21)];
	r0 = r0 << 4;
	r4 = heap32[(r4+34)];
	r4 = (r4 + r0)|0;
	r0 = 0;
	r4 = r4 >> 2;
	r1 = heap32[(fp+-22)];
	r0 = (r0 - r1)|0;
	heap32[(r4+3)] = r0;
	return;
}
} while(0);
	r0 = heap32[(fp+-21)];
	r0 = r0 << 6;
	r1 = heap32[(r4+24)];
	r0 = (r1 + r0)|0;
	r0 = r0 >> 2;
	r1 = heap32[(fp+-22)];
	heap32[(r0+8)] = r1;
	return;
}
}
	r0 = _2E_str21;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 278;
	_assert(i7);
}
else{
	r1 = heapU8[r3+60];
	if(r1 ==0) //_LBB154_5
{
	r1 = heap32[(r4+24)];
	r2 = heap32[(r4+19)];
	r3 = r5 << 6;
	r0 = r0 << 6;
	r1 = (r1 + r3)|0;
	r0 = (r2 + r0)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 64;
	memcpy(i7);
}
else{
	r0 = r0 << 4;
	r1 = heap32[(r4+29)];
	r2 = heap32[(r4+34)];
	r3 = heapU16[(r1+r0)>>1];
	r5 = r5 << 4;
	r0 = (r1 + r0)|0;
	heap16[(r2+r5)>>1] = r3;
	r1 = (r2 + r5)|0;
	r2 = heapU16[(r0+2)>>1];
	heap16[(r1+2)>>1] = r2;
	r2 = heapU16[(r0+4)>>1];
	heap16[(r1+4)>>1] = r2;
	r2 = heapU16[(r0+6)>>1];
	heap16[(r1+6)>>1] = r2;
	r2 = heapU16[(r0+8)>>1];
	heap16[(r1+8)>>1] = r2;
	r2 = heapU16[(r0+10)>>1];
	r0 = r0 >> 2;
	heap16[(r1+10)>>1] = r2;
	r1 = r1 >> 2;
	r0 = heap32[(r0+3)];
	heap32[(r1+3)] = r0;
}
	r0 = heap32[(r4+14)];
	r0 = (r0 + 1)|0;
	heap32[(r4+14)] = r0;
	return;
}
}
else{
	r0 = _2E_str2246;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 127;
	_assert(i7);
}
}