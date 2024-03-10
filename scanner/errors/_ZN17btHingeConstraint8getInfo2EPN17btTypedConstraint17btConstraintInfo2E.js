function _ZN17btHingeConstraint8getInfo2EPN17btTypedConstraint17btConstraintInfo2E(sp)
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
	var f18;
	var f19;
	var f20;
	var f21;
	var f22;
	var f23;
	var f24;
	var f25;
	var f26;
	var f27;
	var f28;
	var f29;
	var f30;
var __label__ = 0;
	i7 = sp + -136;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+1)];
	r3 = heap32[(r1+6)];
	r4 = heap32[(r1+5)];
	r5 = heapU8[r0+723];
	r6 = heapU8[r0+724];
_1: do {
	if(r6 ==0) //_LBB596_60
{
	r5 = r5 & 255;
	if(r5 ==0) //_LBB596_62
{
	r4 = r4 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r1+147)];
	f1 = heapFloat[(r4+9)];
	f2 = heapFloat[(r4+5)];
	f3 = heapFloat[(r4+1)];
	f4 = heapFloat[(r1+148)];
	f5 = heapFloat[(r4+10)];
	f6 = heapFloat[(r4+6)];
	f7 = heapFloat[(r4+2)];
	f8 = heapFloat[(r1+163)];
	f9 = heapFloat[(r3+9)];
	heapFloat[(fp+-3)] = f9;
	f10 = heapFloat[(r3+5)];
	heapFloat[(fp+-2)] = f10;
	f11 = heapFloat[(r3+1)];
	heapFloat[(fp+-1)] = f11;
	f12 = heapFloat[(r1+164)];
	f13 = heapFloat[(r3+10)];
	f14 = heapFloat[(r3+6)];
	f9 = heapFloat[(r3+2)];
	heapFloat[(fp+-7)] = f9;
	f10 = heapFloat[(r1+137)];
	f11 = heapFloat[(r1+141)];
	f15 = heapFloat[(r1+136)];
	f16 = heapFloat[(r1+140)];
	f17 = heapFloat[(r1+135)];
	f18 = heapFloat[(r1+139)];
	f19 = heapFloat[(r1+153)];
	f20 = heapFloat[(r1+157)];
	f21 = f1*f0;
	f22 = f5*f4;
	f23 = f2*f0;
	f24 = f6*f4;
	f0 = f3*f0;
	f4 = f7*f4;
	f25 = heapFloat[(r1+149)];
	f26 = heapFloat[(r4+11)];
	f27 = heapFloat[(r4+7)];
	f28 = heapFloat[(r4+3)];
	f9 = heapFloat[(fp+-3)];
	f29 = f9*f8;
	heapFloat[(fp+-8)] = f29;
	f30 = f13*f12;
	heapFloat[(fp+-10)] = f30;
	f9 = heapFloat[(fp+-2)];
	f9 = f9*f8;
	heapFloat[(fp+-9)] = f9;
	f9 = f14*f12;
	heapFloat[(fp+-12)] = f9;
	f9 = heapFloat[(fp+-1)];
	f8 = f9*f8;
	heapFloat[(fp+-11)] = f8;
	f9 = heapFloat[(fp+-7)];
	f12 = f9*f12;
	heapFloat[(fp+-13)] = f12;
	f8 = heapFloat[(r1+165)];
	f9 = heapFloat[(r3+11)];
	heapFloat[(fp+-4)] = f9;
	f9 = heapFloat[(r3+7)];
	heapFloat[(fp+-6)] = f9;
	f9 = heapFloat[(r3+3)];
	heapFloat[(fp+-5)] = f9;
	f9 = heapFloat[(r1+145)];
	f12 = heapFloat[(r1+144)];
	f29 = heapFloat[(r1+143)];
	f30 = heapFloat[(r1+161)];
	f21 = f21+f22;
	heapFloat[(fp+-15)] = f21;
	f22 = f26*f25;
	f21 = f23+f24;
	heapFloat[(fp+-16)] = f21;
	f23 = f27*f25;
	f0 = f0+f4;
	heapFloat[(fp+-14)] = f0;
	f0 = f28*f25;
	heapFloat[(fp+-23)] = f0;
	f0 = f10*f1;
	heapFloat[(fp+-24)] = f0;
	f4 = f11*f5;
	f21 = f15*f1;
	heapFloat[(fp+-18)] = f21;
	f24 = f16*f5;
	f1 = f17*f1;
	heapFloat[(fp+-20)] = f1;
	f5 = f18*f5;
	f25 = f10*f2;
	heapFloat[(fp+-17)] = f25;
	f0 = f11*f6;
	f1 = f15*f2;
	heapFloat[(fp+-19)] = f1;
	f1 = f16*f6;
	heapFloat[(fp+-28)] = f1;
	f2 = f17*f2;
	heapFloat[(fp+-21)] = f2;
	f1 = f18*f6;
	heapFloat[(fp+-29)] = f1;
	f2 = f10*f3;
	heapFloat[(fp+-25)] = f2;
	f6 = f11*f7;
	f10 = f15*f3;
	heapFloat[(fp+-26)] = f10;
	f11 = f16*f7;
	f3 = f17*f3;
	heapFloat[(fp+-22)] = f3;
	f7 = f18*f7;
	f15 = heapFloat[(fp+-8)];
	f16 = heapFloat[(fp+-10)];
	f15 = f15+f16;
	heapFloat[(fp+-27)] = f15;
	f16 = heapFloat[(fp+-4)];
	f17 = f16*f8;
	f18 = heapFloat[(fp+-9)];
	f21 = heapFloat[(fp+-12)];
	f18 = f18+f21;
	heapFloat[(fp+-8)] = f18;
	f21 = heapFloat[(fp+-6)];
	f25 = f21*f8;
	f1 = heapFloat[(fp+-11)];
	f2 = heapFloat[(fp+-13)];
	f1 = f1+f2;
	heapFloat[(fp+-9)] = f1;
	f2 = heapFloat[(fp+-5)];
	f1 = f2*f8;
	heapFloat[(fp+-11)] = f1;
	f2 = heapFloat[(fp+-3)];
	f2 = f19*f2;
	heapFloat[(fp+-3)] = f2;
	f1 = f20*f13;
	heapFloat[(fp+-12)] = f1;
	f2 = heapFloat[(fp+-2)];
	f2 = f19*f2;
	heapFloat[(fp+-10)] = f2;
	f1 = f20*f14;
	heapFloat[(fp+-13)] = f1;
	f2 = heapFloat[(fp+-1)];
	f2 = f19*f2;
	heapFloat[(fp+-2)] = f2;
	f3 = heapFloat[(fp+-7)];
	f1 = f20*f3;
	heapFloat[(fp+-30)] = f1;
	r5 = r2 >> 2;
	f2 = heapFloat[(r4+15)];
	f3 = heapFloat[(fp+-15)];
	f3 = f3+f22;
	heapFloat[(fp+-7)] = f3;
	f8 = heapFloat[(r4+14)];
	f10 = heapFloat[(fp+-16)];
	f1 = f10+f23;
	heapFloat[(fp+-15)] = f1;
	f1 = heapFloat[(r4+13)];
	heapFloat[(fp+-1)] = f1;
	f3 = heapFloat[(fp+-14)];
	f10 = heapFloat[(fp+-23)];
	f3 = f3+f10;
	heapFloat[(fp+-16)] = f3;
	f10 = heapFloat[(fp+-24)];
	f4 = f10+f4;
	heapFloat[(fp+-14)] = f4;
	f1 = f9*f26;
	heapFloat[(fp+-23)] = f1;
	f3 = heapFloat[(fp+-18)];
	f1 = f3+f24;
	heapFloat[(fp+-18)] = f1;
	f3 = f12*f26;
	f4 = heapFloat[(fp+-20)];
	f4 = f4+f5;
	f5 = f29*f26;
	f10 = heapFloat[(fp+-17)];
	f0 = f10+f0;
	f10 = f9*f27;
	f13 = heapFloat[(fp+-19)];
	f14 = heapFloat[(fp+-28)];
	f13 = f13+f14;
	f14 = f12*f27;
	f15 = heapFloat[(fp+-21)];
	f16 = heapFloat[(fp+-29)];
	f15 = f15+f16;
	f16 = f29*f27;
	f18 = heapFloat[(fp+-25)];
	f6 = f18+f6;
	f9 = f9*f28;
	f18 = heapFloat[(fp+-26)];
	f11 = f18+f11;
	f12 = f12*f28;
	f18 = heapFloat[(fp+-22)];
	f7 = f18+f7;
	f18 = f29*f28;
	f19 = heapFloat[(fp+-27)];
	f17 = f19+f17;
	f19 = heapFloat[(r3+15)];
	f20 = heapFloat[(fp+-8)];
	f20 = f20+f25;
	f21 = heapFloat[(r3+14)];
	f22 = heapFloat[(fp+-9)];
	f23 = heapFloat[(fp+-11)];
	f22 = f22+f23;
	f23 = heapFloat[(r3+13)];
	f24 = heapFloat[(fp+-3)];
	f25 = heapFloat[(fp+-12)];
	f24 = f24+f25;
	f25 = heapFloat[(fp+-4)];
	f25 = f30*f25;
	f26 = heapFloat[(fp+-10)];
	f27 = heapFloat[(fp+-13)];
	f26 = f26+f27;
	f27 = heapFloat[(fp+-6)];
	f27 = f30*f27;
	f28 = heapFloat[(fp+-2)];
	f29 = heapFloat[(fp+-30)];
	f28 = f28+f29;
	f29 = heapFloat[(fp+-5)];
	f29 = f30*f29;
	r6 = heap32[(r5+6)];
	f30 = heapFloat[(fp+-7)];
	f30 = f30+f2;
	heapFloat[(fp+-2)] = f30;
	f30 = heapFloat[(fp+-15)];
	f30 = f30+f8;
	heapFloat[(fp+-3)] = f30;
	f30 = heapFloat[(fp+-16)];
	f1 = heapFloat[(fp+-1)];
	f1 = f30+f1;
	heapFloat[(fp+-4)] = f1;
	f1 = heapFloat[(fp+-14)];
	f30 = heapFloat[(fp+-23)];
	f1 = f1+f30;
	f30 = heapFloat[(fp+-18)];
	f3 = f30+f3;
	f4 = f4+f5;
	f0 = f0+f10;
	f5 = f13+f14;
	f10 = f15+f16;
	f6 = f6+f9;
	f9 = f11+f12;
	f7 = f7+f18;
	f11 = f17+f19;
	f12 = f20+f21;
	f13 = f22+f23;
	f14 = f24+f25;
	f15 = f26+f27;
	f16 = f28+f29;
	r7 = heapU8[r0+720];
	if(r7 ==0) //_LBB596_64
{
	r7 = heap32[(r5+2)];
	r7 = r7 >> 2;
	heap32[(r7)] = 1065353216;
	r7 = r6 << 2;
	r8 = heap32[(r5+2)];
	r7 = (r7 + r8)|0;
	r7 = r7 >> 2;
	heap32[(r7+1)] = 1065353216;
	r7 = r6 << 3;
	r8 = heap32[(r5+2)];
	r7 = (r7 + r8)|0;
	r7 = r7 >> 2;
	heap32[(r7+2)] = 1065353216;
	f2 = heapFloat[(r4+15)];
	f8 = heapFloat[(r4+14)];
	f17 = heapFloat[(r4+13)];
	heapFloat[(fp+-1)] = f17;
}
	r7 = heap32[(r5+3)];
	r8 = r7 >> 2;
	f17 = heapFloat[(fp+-3)];
	f8 = f17-f8;
	f17 = heapFloat[(fp+-2)];
	f2 = f17-f2;
	heap32[(r8)] = 0;
	r9 = (r6 + 1)|0;
	r10 = r6 << 2;
	f17 = -f8;
	heapFloat[(r8+1)] = f2;
	r11 = (r6 + 2)|0;
	r9 = r9 << 2;
	r12 = (r7 + r10)|0;
	heapFloat[(r8+2)] = f17;
	r13 = (r6 + 3)|0;
	r11 = r11 << 2;
	r14 = (r7 + r9)|0;
	r12 = r12 >> 2;
	f2 = -f2;
	heap32[(r8+3)] = 0;
	r8 = r13 << 2;
	r13 = (r7 + r11)|0;
	r14 = r14 >> 2;
	heapFloat[(r12)] = f2;
	r12 = r6 << 3;
	r15 = (r7 + r8)|0;
	f17 = heapFloat[(fp+-4)];
	f2 = heapFloat[(fp+-1)];
	f2 = f17-f2;
	r13 = r13 >> 2;
	heap32[(r14)] = 0;
	r14 = r12 | 4;
	r16 = (r7 + r12)|0;
	r15 = r15 >> 2;
	heapFloat[(r13)] = f2;
	r13 = (r12 + 8)|0;
	r17 = (r7 + r14)|0;
	r16 = r16 >> 2;
	heap32[(r15)] = 0;
	r15 = (r12 + 12)|0;
	r18 = (r7 + r13)|0;
	r17 = r17 >> 2;
	f2 = -f2;
	heapFloat[(r16)] = f8;
	r7 = (r7 + r15)|0;
	r16 = r18 >> 2;
	heapFloat[(r17)] = f2;
	r7 = r7 >> 2;
	heap32[(r16)] = 0;
	heap32[(r7)] = 0;
	r7 = heap32[(r5+5)];
	f2 = heapFloat[(r3+15)];
	f8 = heapFloat[(r3+14)];
	f17 = heapFloat[(r3+13)];
	f2 = f11-f2;
	r16 = r7 >> 2;
	f18 = -f2;
	heap32[(r16)] = 0;
	f8 = f12-f8;
	heapFloat[(r16+1)] = f18;
	r17 = (r7 + r10)|0;
	heapFloat[(r16+2)] = f8;
	r9 = (r7 + r9)|0;
	r17 = r17 >> 2;
	heap32[(r16+3)] = 0;
	f17 = f13-f17;
	r11 = (r7 + r11)|0;
	r9 = r9 >> 2;
	heapFloat[(r17)] = f2;
	r8 = (r7 + r8)|0;
	r11 = r11 >> 2;
	f2 = -f17;
	heap32[(r9)] = 0;
	r9 = (r7 + r12)|0;
	r8 = r8 >> 2;
	heapFloat[(r11)] = f2;
	r11 = (r7 + r14)|0;
	r9 = r9 >> 2;
	f2 = -f8;
	heap32[(r8)] = 0;
	r8 = (r7 + r13)|0;
	r11 = r11 >> 2;
	heapFloat[(r9)] = f2;
	r7 = (r7 + r15)|0;
	r8 = r8 >> 2;
	heapFloat[(r11)] = f17;
	r7 = r7 >> 2;
	heap32[(r8)] = 0;
	heap32[(r7)] = 0;
	f2 = heapFloat[(r5)];
	f8 = heapFloat[(r5+1)];
	f2 = f2*f8;
	r7 = heapU8[r0+720];
if(!(r7 !=0)) //_LBB596_67
{
	r6 = r6 << 1;
	r7 = heap32[(r5+7)];
	f8 = heapFloat[(fp+-4)];
	f8 = f13-f8;
	r7 = r7 >> 2;
	f8 = f8*f2;
	heapFloat[(r7)] = f8;
	r7 = heap32[(r5+7)];
	r7 = (r7 + r10)|0;
	f8 = heapFloat[(fp+-3)];
	f8 = f12-f8;
	r7 = r7 >> 2;
	f8 = f8*f2;
	heapFloat[(r7)] = f8;
	r6 = r6 << 2;
	r7 = heap32[(r5+7)];
	r6 = (r7 + r6)|0;
	f8 = heapFloat[(fp+-2)];
	f8 = f11-f8;
	r6 = r6 >> 2;
	f8 = f8*f2;
	heapFloat[(r6)] = f8;
}
	r2 = (r2 + 4)|0;
	r6 = heap32[(r5+6)];
	r7 = (r6 * 3)|0;
	r8 = heap32[(r5+3)];
	r9 = r7 << 2;
	r8 = (r8 + r9)|0;
	r8 = r8 >> 2;
	r10 = (r7 + 1)|0;
	heapFloat[(r8)] = f7;
	r8 = r10 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r8)|0;
	r10 = r10 >> 2;
	r7 = (r7 + 2)|0;
	heapFloat[(r10)] = f10;
	r7 = r7 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r7)|0;
	r10 = r10 >> 2;
	heapFloat[(r10)] = f4;
	r6 = r6 << 4;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r6)|0;
	r10 = r10 >> 2;
	heapFloat[(r10)] = f9;
	r10 = r6 | 4;
	r11 = heap32[(r5+3)];
	r11 = (r11 + r10)|0;
	r11 = r11 >> 2;
	heapFloat[(r11)] = f5;
	r11 = r6 | 8;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r11)|0;
	r12 = r12 >> 2;
	heapFloat[(r12)] = f3;
	r12 = heap32[(r5+5)];
	r12 = (r12 + r9)|0;
	r12 = r12 >> 2;
	f8 = -f7;
	heapFloat[(r12)] = f8;
	r12 = heap32[(r5+5)];
	r8 = (r12 + r8)|0;
	r8 = r8 >> 2;
	f8 = -f10;
	heapFloat[(r8)] = f8;
	r8 = heap32[(r5+5)];
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	f8 = -f4;
	heapFloat[(r7)] = f8;
	r7 = heap32[(r5+5)];
	r7 = (r7 + r6)|0;
	r7 = r7 >> 2;
	f8 = -f9;
	heapFloat[(r7)] = f8;
	r7 = heap32[(r5+5)];
	r7 = (r7 + r10)|0;
	r7 = r7 >> 2;
	f8 = -f5;
	heapFloat[(r7)] = f8;
	r7 = heap32[(r5+5)];
	r7 = (r7 + r11)|0;
	f8 = f0*f14;
	f11 = f1*f15;
	f12 = f1*f16;
	f13 = f6*f14;
	f8 = f8-f11;
	f11 = f12-f13;
	f12 = f6*f15;
	f13 = f0*f16;
	r7 = r7 >> 2;
	f14 = -f3;
	f12 = f12-f13;
	heapFloat[(r7)] = f14;
	f7 = f8*f7;
	f10 = f11*f10;
	r7 = heap32[(r5+7)];
	f7 = f7+f10;
	f4 = f12*f4;
	r7 = (r7 + r9)|0;
	f4 = f7+f4;
	r7 = r7 >> 2;
	f4 = f4*f2;
	heapFloat[(r7)] = f4;
	f4 = f8*f9;
	f5 = f11*f5;
	r7 = heap32[(r5+7)];
	f4 = f4+f5;
	f3 = f12*f3;
	r6 = (r7 + r6)|0;
	f3 = f4+f3;
	r6 = r6 >> 2;
	f2 = f3*f2;
	heapFloat[(r6)] = f2;
	r6 = heapU8[r0+722];
	if(r6 !=0) //_LBB596_69
{
	f2 = heapFloat[(r1+176)];
	f3 = heapFloat[(r1+179)];
	f2 = f2*f3;
	f3 =                         0;
	r6 = 1;
	r7 = 2;
	r6 = f2 > f3 ? r6 : r7;
}
else{
	f2 =                         0;
	r6 = 0;
}
	r7 = heapU8[r0+721];
	r8 = 0;
	r9 = r7 != r8;
	r9 = r9 & 1;
	r9 = r9 | r6;
	if(r9 ==0) //_LBB596_59
{
__label__ = 54;
break _1;
}
else{
	r9 = heap32[(r5+6)];
	r9 = (r9 * 5)|0;
	r10 = heap32[(r5+3)];
	r11 = r9 << 2;
	r10 = (r10 + r11)|0;
	r10 = r10 >> 2;
	r12 = (r9 + 1)|0;
	heapFloat[(r10)] = f6;
	r10 = r12 << 2;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r10)|0;
	r12 = r12 >> 2;
	r9 = (r9 + 2)|0;
	heapFloat[(r12)] = f0;
	r9 = r9 << 2;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r9)|0;
	r12 = r12 >> 2;
	heapFloat[(r12)] = f1;
	r12 = heap32[(r5+5)];
	r12 = (r12 + r11)|0;
	r12 = r12 >> 2;
	f3 = -f6;
	heapFloat[(r12)] = f3;
	r12 = heap32[(r5+5)];
	r10 = (r12 + r10)|0;
	r10 = r10 >> 2;
	f3 = -f0;
	heapFloat[(r10)] = f3;
	r10 = heap32[(r5+5)];
	r9 = (r10 + r9)|0;
	r9 = r9 >> 2;
	f3 = -f1;
	heapFloat[(r9)] = f3;
	r9 = heap32[(r5+7)];
	r9 = (r9 + r11)|0;
	f3 = heapFloat[(r1+172)];
	f4 = heapFloat[(r1+173)];
	r9 = r9 >> 2;
	heap32[(r9)] = 0;
	r9 = r6 != r8;
	r10 = f3 == f4;
	r12 = heap32[(r1+183)];
	r9 = r9 & r10;
	r10 = r12 & 2;
	if(r10 !=0) //_LBB596_73
{
	r2 = (r0 + 744)|0;
}
	r2 = r2 >> 2;
	f5 = heapFloat[(r2)];
	r2 = r7 == r8;
	r2 = r9 | r2;
if(!(r2 != 0)) //_LBB596_91
{
	r2 = r12 & 4;
if(!(r2 ==0)) //_LBB596_77
{
	r2 = heap32[(r5+8)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = heap32[(r1+184)];
}
	f7 =                         1;
	f8 =                         0;
	f9 = heapFloat[(r1+167)];
_24: do {
	if(f3 <f4) //_LBB596_79
{
	f10 = heapFloat[(r1+178)];
	f11 = heapFloat[(r5)];
	f11 = f11*f5;
	f11 = f9/f11;
	if(f11 >=f8) //_LBB596_84
{
	if(f11 >f8) //_LBB596_86
{
if(!(f10 >f4)) //_LBB596_89
{
	f8 = f4-f11;
if(!(f8 >=f10)) //_LBB596_89
{
	f7 = f4-f10;
	f8 = f7/f11;
break _24;
}
}
	f8 =                         0;
	f8 = f10 > f4 ? f8 : f7;
}
else{
break _24;
}
}
else{
if(!(f10 <f3)) //_LBB596_83
{
	f8 = f3-f11;
if(!(f8 <=f10)) //_LBB596_83
{
	f7 = f3-f10;
	f8 = f7/f11;
break _24;
}
}
	f8 =                         0;
	f8 = f10 < f3 ? f8 : f7;
}
}
else{
	f8 = f3 > f4 ? f7 : f8;
}
} while(0);
	r2 = heap32[(r5+7)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	f7 = f9*f8;
	f8 = heapFloat[(r1+179)];
	f9 = heapFloat[(r2)];
	f7 = f7*f8;
	f7 = f9+f7;
	heapFloat[(r2)] = f7;
	r2 = heap32[(r5+9)];
	f7 = heapFloat[(r1+168)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	f7 = -f7;
	heapFloat[(r2)] = f7;
	r2 = heap32[(r5+10)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = heap32[(r1+168)];
}
	if(r6 ==0) //_LBB596_59
{
__label__ = 54;
break _1;
}
else{
	r2 = heap32[(r5+7)];
	r2 = (r2 + r11)|0;
	f7 = heapFloat[(r5)];
	r2 = r2 >> 2;
	f5 = f7*f5;
	f7 = heapFloat[(r2)];
	f2 = f5*f2;
	f2 = f7+f2;
	heapFloat[(r2)] = f2;
	r0 = heapU8[r0+732];
	r0 = r0 & 1;
if(!(r0 ==0)) //_LBB596_94
{
	r0 = heap32[(r5+8)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = heap32[(r1+185)];
}
	if(f3 !=f4) //_LBB596_96
{
	r0 = heap32[(r5+9)];
	if(r6 !=1) //_LBB596_98
{
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = -8388609;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
}
else{
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 2139095039;
}
}
else{
	r0 = heap32[(r5+9)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = -8388609;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 2139095039;
}
	f2 = heapFloat[(r1+171)];
	f3 =                         0;
	if(f2 <=f3) //_LBB596_107
{
__label__ = 53;
break _1;
}
else{
	f4 = heapFloat[(r4+80)];
	f5 = heapFloat[(r3+80)];
	f7 = heapFloat[(r4+81)];
	f8 = heapFloat[(r3+81)];
	f4 = f4*f6;
	f7 = f7*f0;
	f9 = heapFloat[(r4+82)];
	f10 = heapFloat[(r3+82)];
	f5 = f5*f6;
	f0 = f8*f0;
	f4 = f4+f7;
	f6 = f9*f1;
	f0 = f5+f0;
	f1 = f10*f1;
	f4 = f4+f6;
	f0 = f0+f1;
	f0 = f4-f0;
	if(r6 !=1) //_LBB596_104
{
	if(f0 <=f3) //_LBB596_107
{
__label__ = 53;
break _1;
}
else{
	r0 = heap32[(r5+7)];
	f1 = -f2;
	r0 = (r0 + r11)|0;
	f0 = f0*f1;
	r0 = r0 >> 2;
	f1 = heapFloat[(r0)];
	if(f1 <=f0) //_LBB596_107
{
__label__ = 53;
break _1;
}
else{
	heapFloat[(r0)] = f0;
__label__ = 53;
break _1;
}
}
}
else{
	if(f0 >=f3) //_LBB596_107
{
__label__ = 53;
break _1;
}
else{
	r0 = heap32[(r5+7)];
	f2 = -f2;
	r0 = (r0 + r11)|0;
	f0 = f0*f2;
	r0 = r0 >> 2;
	f2 = heapFloat[(r0)];
	if(f2 >=f0) //_LBB596_107
{
__label__ = 53;
break _1;
}
else{
	heapFloat[(r0)] = f0;
__label__ = 53;
break _1;
}
}
}
}
}
}
}
else{
	r0 = _2E_str1149;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 331;
	_assert(i7);
}
}
else{
	r5 = r5 & 255;
	if(r5 ==0) //_LBB596_3
{
	r4 = r4 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r3+9)];
	heapFloat[(fp+-5)] = f0;
	f1 = heapFloat[(r1+163)];
	f0 = heapFloat[(r3+5)];
	heapFloat[(fp+-6)] = f0;
	f2 = heapFloat[(r3+1)];
	heapFloat[(fp+-4)] = f2;
	f0 = heapFloat[(r3+10)];
	heapFloat[(fp+-7)] = f0;
	f2 = heapFloat[(r1+164)];
	f0 = heapFloat[(r3+6)];
	heapFloat[(fp+-8)] = f0;
	f3 = heapFloat[(r3+2)];
	heapFloat[(fp+-9)] = f3;
	f4 = heapFloat[(r4+9)];
	f5 = heapFloat[(r1+147)];
	f6 = heapFloat[(r4+5)];
	f7 = heapFloat[(r4+1)];
	f8 = heapFloat[(r4+10)];
	f9 = heapFloat[(r1+148)];
	f10 = heapFloat[(r4+6)];
	f11 = heapFloat[(r4+2)];
	f0 = heapFloat[(fp+-5)];
	f12 = f0*f1;
	f0 = heapFloat[(fp+-7)];
	f13 = f0*f2;
	f14 = heapFloat[(r3+11)];
	heapFloat[(fp+-2)] = f14;
	f15 = heapFloat[(r1+165)];
	f16 = heapFloat[(r3+7)];
	heapFloat[(fp+-3)] = f16;
	f17 = heapFloat[(r3+3)];
	heapFloat[(fp+-1)] = f17;
	f18 = f4*f5;
	f19 = f8*f9;
	f20 = heapFloat[(r4+11)];
	f21 = heapFloat[(r1+149)];
	f22 = heapFloat[(r4+7)];
	f23 = heapFloat[(r4+3)];
	f0 = heapFloat[(fp+-6)];
	f24 = f0*f1;
	f0 = heapFloat[(fp+-8)];
	f25 = f0*f2;
	f26 = f6*f5;
	f27 = f10*f9;
	f28 = heapFloat[(fp+-4)];
	f1 = f28*f1;
	f2 = f3*f2;
	f5 = f7*f5;
	f9 = f11*f9;
	f29 = heapFloat[(r1+137)];
	f30 = heapFloat[(r1+141)];
	f0 = heapFloat[(r1+136)];
	f3 = heapFloat[(r1+140)];
	f14 = heapFloat[(r1+153)];
	f16 = heapFloat[(r1+157)];
	f12 = f12+f13;
	heapFloat[(fp+-14)] = f12;
	f13 = heapFloat[(fp+-2)];
	f17 = f13*f15;
	f18 = f18+f19;
	f19 = f20*f21;
	f24 = f24+f25;
	f25 = heapFloat[(fp+-3)];
	f28 = f25*f15;
	f26 = f26+f27;
	f27 = f22*f21;
	f1 = f1+f2;
	heapFloat[(fp+-10)] = f1;
	f2 = heapFloat[(fp+-1)];
	f15 = f2*f15;
	f5 = f5+f9;
	heapFloat[(fp+-12)] = f5;
	f9 = f23*f21;
	f21 = heapFloat[(r1+145)];
	f1 = heapFloat[(r1+144)];
	f2 = heapFloat[(r1+161)];
	f5 = heapFloat[(r3+84)];
	f12 = heapFloat[(r4+84)];
	f13 =   1.1920928955078125e-007;
	heapFloat[(fp+-11)] = f13;
	f25 = f29*f4;
	heapFloat[(fp+-13)] = f25;
	f25 = f30*f8;
	f4 = f0*f4;
	heapFloat[(fp+-16)] = f4;
	f8 = f3*f8;
	f4 = f29*f6;
	heapFloat[(fp+-15)] = f4;
	f4 = f30*f10;
	f6 = f0*f6;
	heapFloat[(fp+-18)] = f6;
	f10 = f3*f10;
	f29 = f29*f7;
	f30 = f30*f11;
	f0 = f0*f7;
	heapFloat[(fp+-17)] = f0;
	f3 = f3*f11;
	f7 = heapFloat[(fp+-5)];
	f0 = f14*f7;
	heapFloat[(fp+-19)] = f0;
	f6 = heapFloat[(fp+-7)];
	f6 = f16*f6;
	f7 = heapFloat[(fp+-6)];
	f7 = f14*f7;
	heapFloat[(fp+-5)] = f7;
	f11 = heapFloat[(fp+-8)];
	f11 = f16*f11;
	f0 = heapFloat[(fp+-4)];
	f0 = f14*f0;
	heapFloat[(fp+-4)] = f0;
	f14 = heapFloat[(fp+-9)];
	f14 = f16*f14;
	f16 = heapFloat[(fp+-14)];
	f16 = f16+f17;
	f17 = heapFloat[(r3+15)];
	f18 = f18+f19;
	f19 = heapFloat[(r4+15)];
	f24 = f24+f28;
	f28 = heapFloat[(r3+14)];
	f26 = f26+f27;
	f27 = heapFloat[(r4+14)];
	f0 = heapFloat[(fp+-10)];
	f0 = f0+f15;
	f15 = heapFloat[(r3+13)];
	f7 = heapFloat[(fp+-12)];
	f7 = f7+f9;
	f9 = heapFloat[(r4+13)];
	r5 = r2 >> 2;
	f16 = f16+f17;
	f17 = f18+f19;
	f18 = f24+f28;
	f19 = f26+f27;
	f0 = f0+f15;
	f7 = f7+f9;
	f9 = heapFloat[(fp+-13)];
	f9 = f9+f25;
	f15 = f21*f20;
	f24 = heapFloat[(fp+-16)];
	f8 = f24+f8;
	f20 = f1*f20;
	f24 = heapFloat[(fp+-15)];
	f4 = f24+f4;
	f24 = f21*f22;
	f25 = heapFloat[(fp+-18)];
	f10 = f25+f10;
	f22 = f1*f22;
	f25 = f29+f30;
	f21 = f21*f23;
	f26 = heapFloat[(fp+-17)];
	f3 = f26+f3;
	f1 = f1*f23;
	f23 = heapFloat[(fp+-19)];
	f6 = f23+f6;
	f23 = heapFloat[(fp+-2)];
	f23 = f2*f23;
	f26 = heapFloat[(fp+-5)];
	f11 = f26+f11;
	f26 = heapFloat[(fp+-3)];
	f26 = f2*f26;
	f27 = heapFloat[(fp+-4)];
	f14 = f27+f14;
	f27 = heapFloat[(fp+-1)];
	f2 = f2*f27;
	r6 = f12 < f13;
	r7 = f5 < f13;
	f12 = f12+f5;
	r8 = heap32[(r5+6)];
	f9 = f9+f15;
	heapFloat[(fp+-3)] = f9;
	f8 = f8+f20;
	f4 = f4+f24;
	heapFloat[(fp+-2)] = f4;
	f4 = f10+f22;
	f9 = f25+f21;
	heapFloat[(fp+-4)] = f9;
	f1 = f3+f1;
	f3 = f6+f23;
	heapFloat[(fp+-7)] = f3;
	f3 = f11+f26;
	heapFloat[(fp+-6)] = f3;
	f2 = f14+f2;
	heapFloat[(fp+-5)] = f2;
	f2 = f16-f17;
	heapFloat[(fp+-8)] = f2;
	f2 = f18-f19;
	heapFloat[(fp+-9)] = f2;
	f2 = f0-f7;
	heapFloat[(fp+-10)] = f2;
	r6 = r6 | r7;
	f2 =                         0;
	if(f12 >f2) //_LBB596_5
{
	f5 = f5/f12;
}
else{
	f5 =                       0.5;
}
	f3 =                         1;
	heapFloat[(fp+-1)] = f3;
	f6 = f3-f5;
	f9 = heapFloat[(fp+-4)];
	f9 = f9*f5;
	f10 = heapFloat[(fp+-5)];
	f10 = f10*f6;
	f11 = heapFloat[(fp+-2)];
	f11 = f11*f5;
	f12 = heapFloat[(fp+-6)];
	f12 = f12*f6;
	f9 = f9+f10;
	f10 = f11+f12;
	f11 = heapFloat[(fp+-3)];
	f11 = f11*f5;
	f12 = heapFloat[(fp+-7)];
	f12 = f12*f6;
	f11 = f11+f12;
	f12 = f9*f9;
	f13 = f10*f10;
	f12 = f12+f13;
	f13 = f11*f11;
	f12 = f12+f13;
	heapFloat[(g0)] = f12;
	sqrtf(i7);
	f3 = f3/f_g0;
	f12 = heapFloat[(r3+13)];
	f13 = heapFloat[(r3+14)];
	f14 = heapFloat[(r4+13)];
	f15 = heapFloat[(r4+14)];
	f9 = f9*f3;
	f0 = f0-f12;
	f7 = f7-f14;
	f10 = f10*f3;
	f12 = f18-f13;
	f13 = f19-f15;
	f14 = heapFloat[(r3+15)];
	f15 = heapFloat[(r4+15)];
	f3 = f11*f3;
	f11 = f16-f14;
	f14 = f17-f15;
	f15 = f0*f9;
	f16 = f12*f10;
	f17 = f7*f9;
	f18 = f13*f10;
	f15 = f15+f16;
	f16 = f11*f3;
	f17 = f17+f18;
	f18 = f14*f3;
	f15 = f15+f16;
	f16 = f17+f18;
	f17 = f10*f15;
	f18 = f10*f16;
	f19 = f9*f15;
	f20 = f9*f16;
	f15 = f3*f15;
	f16 = f3*f16;
	f12 = f12-f17;
	f13 = f13-f18;
	f0 = f0-f19;
	f7 = f7-f20;
	f11 = f11-f15;
	f14 = f14-f16;
	f21 = f12*f5;
	f22 = f13*f6;
	f23 = f0*f5;
	f24 = f7*f6;
	f21 = f21+f22;
	f22 = f23+f24;
	f23 = f11*f5;
	f24 = f14*f6;
	f15 = f16-f15;
	f16 = f18-f17;
	f17 = f20-f19;
	f18 = f23+f24;
	f19 = f22*f22;
	f20 = f21*f21;
	f23 = f15*f5;
	f24 = f16*f5;
	f25 = f17*f5;
	f15 = f15*f6;
	f16 = f16*f6;
	f17 = f17*f6;
	f19 = f19+f20;
	f20 = f18*f18;
	f19 = f19+f20;
	r7 = r8 << 1;
	f14 = f14+f23;
	f13 = f13+f24;
	f7 = f7+f25;
	f11 = f11-f15;
	f12 = f12-f16;
	f0 = f0-f17;
	f15 = heapFloat[(fp+-11)];
	if(f19 >f15) //_LBB596_8
{
	heapFloat[(g0)] = f19;
	sqrtf(i7);
	f4 = heapFloat[(fp+-1)];
	f8 = f4/f_g0;
	f1 = f22*f8;
	f4 = f21*f8;
	f8 = f18*f8;
}
	r9 = heap32[(r5+3)];
	f15 = f13*f8;
	f16 = f14*f4;
	r9 = r9 >> 2;
	f15 = f15-f16;
	heapFloat[(r9)] = f15;
	r9 = heap32[(r5+3)];
	f15 = f14*f1;
	f16 = f7*f8;
	r9 = r9 >> 2;
	f15 = f15-f16;
	heapFloat[(r9+1)] = f15;
	r9 = heap32[(r5+3)];
	f15 = f7*f4;
	f16 = f13*f1;
	r9 = r9 >> 2;
	f15 = f15-f16;
	heapFloat[(r9+2)] = f15;
	f15 = f12*f8;
	f16 = f11*f4;
	f15 = f15-f16;
	r9 = heap32[(r5+5)];
	r9 = r9 >> 2;
	f15 = -f15;
	heapFloat[(r9)] = f15;
	f15 = f11*f1;
	f16 = f0*f8;
	f15 = f15-f16;
	r9 = heap32[(r5+5)];
	f16 = f10*f8;
	f17 = f3*f4;
	f18 = f9*f4;
	f19 = f10*f1;
	f20 = f3*f1;
	f21 = f9*f8;
	r9 = r9 >> 2;
	f15 = -f15;
	f16 = f16-f17;
	f17 = f18-f19;
	f18 = f20-f21;
	heapFloat[(r9+1)] = f15;
	f15 = f0*f4;
	f19 = f12*f1;
	f15 = f15-f19;
	r9 = heap32[(r5+5)];
	f19 = f7*f18;
	f20 = f13*f16;
	f21 = f14*f16;
	f22 = f7*f17;
	f23 = f13*f17;
	f24 = f14*f18;
	f25 = f0*f18;
	f26 = f12*f16;
	f27 = f11*f16;
	f28 = f0*f17;
	f29 = f12*f17;
	f30 = f11*f18;
	f19 = f19-f20;
	f20 = f21-f22;
	f21 = f23-f24;
	f22 = f25-f26;
	f23 = f27-f28;
	f24 = f29-f30;
	r9 = r9 >> 2;
	f15 = -f15;
	heapFloat[(r9+2)] = f15;
	if(r6 != 0) //_LBB596_11
{
	r9 = heapU8[r0+722];
if(!(r9 ==0)) //_LBB596_10
{
	f24 = f24*f6;
	f23 = f23*f6;
	f22 = f22*f6;
	f21 = f21*f5;
	f20 = f20*f5;
	f19 = f19*f5;
}
}
	r9 = r8 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r9)|0;
	r10 = r10 >> 2;
	r11 = (r8 + 1)|0;
	heapFloat[(r10)] = f21;
	r10 = r11 << 2;
	r11 = heap32[(r5+3)];
	r11 = (r11 + r10)|0;
	r11 = r11 >> 2;
	r12 = (r8 + 2)|0;
	heapFloat[(r11)] = f20;
	r11 = r12 << 2;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r11)|0;
	r12 = r12 >> 2;
	heapFloat[(r12)] = f19;
	r12 = heap32[(r5+5)];
	r12 = (r12 + r9)|0;
	r12 = r12 >> 2;
	f15 = -f24;
	heapFloat[(r12)] = f15;
	r12 = heap32[(r5+5)];
	r10 = (r12 + r10)|0;
	r10 = r10 >> 2;
	f15 = -f23;
	heapFloat[(r10)] = f15;
	r10 = heap32[(r5+5)];
	r10 = (r10 + r11)|0;
	f15 = f7*f10;
	f19 = f13*f9;
	f20 = f14*f9;
	f7 = f7*f3;
	f13 = f13*f3;
	f14 = f14*f10;
	f21 = f0*f10;
	f23 = f12*f9;
	f24 = f11*f9;
	f0 = f0*f3;
	f12 = f12*f3;
	f11 = f11*f10;
	f15 = f15-f19;
	f7 = f20-f7;
	f13 = f13-f14;
	f14 = f21-f23;
	f0 = f24-f0;
	f11 = f12-f11;
	r10 = r10 >> 2;
	f12 = -f22;
	heapFloat[(r10)] = f12;
	if(r6 != 0) //_LBB596_15
{
	f11 = f11*f6;
	f0 = f0*f6;
	f14 = f14*f6;
	f13 = f13*f5;
	f7 = f7*f5;
	f15 = f15*f5;
}
	r6 = r7 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r6)|0;
	r10 = r10 >> 2;
	r11 = r7 | 1;
	heapFloat[(r10)] = f13;
	r10 = r11 << 2;
	r11 = heap32[(r5+3)];
	r11 = (r11 + r10)|0;
	r11 = r11 >> 2;
	r7 = (r7 + 2)|0;
	heapFloat[(r11)] = f7;
	r7 = r7 << 2;
	r11 = heap32[(r5+3)];
	r11 = (r11 + r7)|0;
	r11 = r11 >> 2;
	heapFloat[(r11)] = f15;
	r11 = heap32[(r5+5)];
	r11 = (r11 + r6)|0;
	r11 = r11 >> 2;
	f5 = -f11;
	heapFloat[(r11)] = f5;
	r11 = heap32[(r5+5)];
	r11 = (r11 + r10)|0;
	r11 = r11 >> 2;
	f0 = -f0;
	heapFloat[(r11)] = f0;
	r11 = heap32[(r5+5)];
	r7 = (r11 + r7)|0;
	r7 = r7 >> 2;
	f0 = -f14;
	heapFloat[(r7)] = f0;
	r7 = heapU8[r0+720];
if(!(r7 !=0)) //_LBB596_18
{
	f0 = heapFloat[(r5)];
	f5 = heapFloat[(r5+1)];
	f0 = f0*f5;
	r7 = heap32[(r5+2)];
	r7 = r7 >> 2;
	heapFloat[(r7)] = f1;
	r7 = heap32[(r5+2)];
	r7 = r7 >> 2;
	heapFloat[(r7+1)] = f4;
	r7 = heap32[(r5+2)];
	r7 = r7 >> 2;
	heapFloat[(r7+2)] = f8;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r9)|0;
	r7 = r7 >> 2;
	heapFloat[(r7)] = f16;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r9)|0;
	r7 = r7 >> 2;
	heapFloat[(r7+1)] = f18;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r9)|0;
	r7 = r7 >> 2;
	heapFloat[(r7+2)] = f17;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r6)|0;
	r7 = r7 >> 2;
	heapFloat[(r7)] = f9;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r10)|0;
	r7 = r7 >> 2;
	heapFloat[(r7)] = f10;
	r7 = heap32[(r5+2)];
	r7 = (r7 + r6)|0;
	r7 = r7 >> 2;
	f5 = heapFloat[(fp+-10)];
	f6 = f1*f5;
	f7 = heapFloat[(fp+-9)];
	f11 = f4*f7;
	heapFloat[(r7+2)] = f3;
	f6 = f6+f11;
	f11 = heapFloat[(fp+-8)];
	f12 = f8*f11;
	r7 = heap32[(r5+7)];
	f6 = f6+f12;
	r7 = r7 >> 2;
	f6 = f6*f0;
	heapFloat[(r7)] = f6;
	f6 = f16*f5;
	f12 = f18*f7;
	r7 = heap32[(r5+7)];
	f6 = f6+f12;
	f12 = f17*f11;
	r7 = (r7 + r9)|0;
	f6 = f6+f12;
	r7 = r7 >> 2;
	f6 = f6*f0;
	heapFloat[(r7)] = f6;
	f5 = f9*f5;
	f6 = f10*f7;
	r7 = heap32[(r5+7)];
	f5 = f5+f6;
	f6 = f3*f11;
	r6 = (r7 + r6)|0;
	f5 = f5+f6;
	r6 = r6 >> 2;
	f0 = f5*f0;
	heapFloat[(r6)] = f0;
}
	r2 = (r2 + 4)|0;
	r6 = (r8 * 3)|0;
	r7 = r6 << 2;
	r9 = heap32[(r5+3)];
	r9 = (r9 + r7)|0;
	r9 = r9 >> 2;
	r10 = (r6 + 1)|0;
	heapFloat[(r9)] = f1;
	r9 = r10 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r9)|0;
	r10 = r10 >> 2;
	r6 = (r6 + 2)|0;
	heapFloat[(r10)] = f4;
	r6 = r6 << 2;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r6)|0;
	r10 = r10 >> 2;
	heapFloat[(r10)] = f8;
	r8 = r8 << 4;
	r10 = heap32[(r5+3)];
	r10 = (r10 + r8)|0;
	r10 = r10 >> 2;
	heapFloat[(r10)] = f16;
	r10 = r8 | 4;
	r11 = heap32[(r5+3)];
	r11 = (r11 + r10)|0;
	r11 = r11 >> 2;
	heapFloat[(r11)] = f18;
	r11 = r8 | 8;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r11)|0;
	r12 = r12 >> 2;
	heapFloat[(r12)] = f17;
	r12 = heap32[(r5+5)];
	r12 = (r12 + r7)|0;
	r12 = r12 >> 2;
	f0 = -f1;
	heapFloat[(r12)] = f0;
	r12 = heap32[(r5+5)];
	r9 = (r12 + r9)|0;
	r9 = r9 >> 2;
	f0 = -f4;
	heapFloat[(r9)] = f0;
	r9 = heap32[(r5+5)];
	r6 = (r9 + r6)|0;
	r6 = r6 >> 2;
	f0 = -f8;
	heapFloat[(r6)] = f0;
	r6 = heap32[(r5+5)];
	r6 = (r6 + r8)|0;
	r6 = r6 >> 2;
	f0 = -f16;
	heapFloat[(r6)] = f0;
	r6 = heap32[(r5+5)];
	r6 = (r6 + r10)|0;
	r6 = r6 >> 2;
	f0 = -f18;
	heapFloat[(r6)] = f0;
	r6 = heap32[(r5+5)];
	r6 = (r6 + r11)|0;
	f5 = heapFloat[(fp+-7)];
	f0 = heapFloat[(fp+-2)];
	f6 = f0*f5;
	f11 = heapFloat[(fp+-6)];
	f7 = heapFloat[(fp+-3)];
	f12 = f7*f11;
	f13 = heapFloat[(fp+-5)];
	f7 = f7*f13;
	f14 = heapFloat[(fp+-4)];
	f5 = f14*f5;
	f6 = f6-f12;
	f5 = f7-f5;
	f7 = f14*f11;
	f0 = f0*f13;
	r6 = r6 >> 2;
	f11 = -f17;
	heapFloat[(r6)] = f11;
	f0 = f7-f0;
	f1 = f6*f1;
	f4 = f5*f4;
	r6 = heap32[(r5+7)];
	f1 = f1+f4;
	f4 = f0*f8;
	f7 = heapFloat[(r5)];
	f8 = heapFloat[(r5+1)];
	r6 = (r6 + r7)|0;
	f1 = f1+f4;
	f4 = f7*f8;
	r6 = r6 >> 2;
	f1 = f1*f4;
	heapFloat[(r6)] = f1;
	f1 = f6*f16;
	f5 = f5*f18;
	r6 = heap32[(r5+7)];
	f1 = f1+f5;
	f0 = f0*f17;
	r6 = (r6 + r8)|0;
	f0 = f1+f0;
	r6 = r6 >> 2;
	f0 = f0*f4;
	heapFloat[(r6)] = f0;
	r6 = heapU8[r0+722];
	if(r6 !=0) //_LBB596_20
{
	f0 = heapFloat[(r1+176)];
	f1 = heapFloat[(r1+179)];
	f0 = f0*f1;
	r6 = 1;
	r7 = 2;
	r6 = f0 > f2 ? r6 : r7;
}
else{
	f0 =                         0;
	r6 = 0;
}
	r7 = heapU8[r0+721];
	r8 = 0;
	r9 = r7 != r8;
	r9 = r9 & 1;
	r9 = r9 | r6;
	if(r9 ==0) //_LBB596_59
{
__label__ = 54;
}
else{
	r9 = heap32[(r5+6)];
	r9 = (r9 * 5)|0;
	r10 = heap32[(r5+3)];
	r11 = r9 << 2;
	r10 = (r10 + r11)|0;
	r10 = r10 >> 2;
	r12 = (r9 + 1)|0;
	heapFloat[(r10)] = f9;
	r10 = r12 << 2;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r10)|0;
	r12 = r12 >> 2;
	r9 = (r9 + 2)|0;
	heapFloat[(r12)] = f10;
	r9 = r9 << 2;
	r12 = heap32[(r5+3)];
	r12 = (r12 + r9)|0;
	r12 = r12 >> 2;
	heapFloat[(r12)] = f3;
	r12 = heap32[(r5+5)];
	r12 = (r12 + r11)|0;
	r12 = r12 >> 2;
	f1 = -f9;
	heapFloat[(r12)] = f1;
	r12 = heap32[(r5+5)];
	r10 = (r12 + r10)|0;
	r10 = r10 >> 2;
	f1 = -f10;
	heapFloat[(r10)] = f1;
	r10 = heap32[(r5+5)];
	r9 = (r10 + r9)|0;
	r9 = r9 >> 2;
	f1 = -f3;
	heapFloat[(r9)] = f1;
	r9 = heap32[(r5+7)];
	r9 = (r9 + r11)|0;
	f1 = heapFloat[(r1+172)];
	f4 = heapFloat[(r1+173)];
	r9 = r9 >> 2;
	heap32[(r9)] = 0;
	r9 = r6 != r8;
	r10 = f1 == f4;
	r12 = heap32[(r1+183)];
	r9 = r9 & r10;
	r10 = r12 & 2;
	if(r10 !=0) //_LBB596_24
{
	r2 = (r0 + 744)|0;
}
	r2 = r2 >> 2;
	f5 = heapFloat[(r2)];
	r2 = r7 == r8;
	r2 = r9 | r2;
if(!(r2 != 0)) //_LBB596_42
{
	r2 = r12 & 4;
if(!(r2 ==0)) //_LBB596_28
{
	r2 = heap32[(r5+8)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = heap32[(r1+184)];
}
	f6 = heapFloat[(r1+167)];
_94: do {
	if(f1 <f4) //_LBB596_30
{
	f7 = heapFloat[(r1+178)];
	f8 = heapFloat[(r5)];
	f8 = f8*f5;
	f8 = f6/f8;
	if(f8 >=f2) //_LBB596_35
{
	if(f8 >f2) //_LBB596_37
{
if(!(f7 >f4)) //_LBB596_40
{
	f2 = f4-f8;
if(!(f2 >=f7)) //_LBB596_40
{
	f2 = f4-f7;
	f2 = f2/f8;
break _94;
}
}
	f2 =                         0;
	f8 = heapFloat[(fp+-1)];
	f2 = f7 > f4 ? f2 : f8;
}
else{
break _94;
}
}
else{
if(!(f7 <f1)) //_LBB596_34
{
	f2 = f1-f8;
if(!(f2 <=f7)) //_LBB596_34
{
	f2 = f1-f7;
	f2 = f2/f8;
break _94;
}
}
	f2 =                         0;
	f8 = heapFloat[(fp+-1)];
	f2 = f7 < f1 ? f2 : f8;
}
}
else{
	f7 = heapFloat[(fp+-1)];
	f2 = f1 > f4 ? f7 : f2;
}
} while(0);
	r2 = heap32[(r5+7)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	f2 = f6*f2;
	f6 = heapFloat[(r1+179)];
	f7 = heapFloat[(r2)];
	f2 = f2*f6;
	f2 = f7+f2;
	heapFloat[(r2)] = f2;
	r2 = heap32[(r5+9)];
	f2 = heapFloat[(r1+168)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	f2 = -f2;
	heapFloat[(r2)] = f2;
	r2 = heap32[(r5+10)];
	r2 = (r2 + r11)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = heap32[(r1+168)];
}
	if(r6 ==0) //_LBB596_59
{
__label__ = 54;
}
else{
	r2 = heap32[(r5+7)];
	r2 = (r2 + r11)|0;
	f2 = heapFloat[(r5)];
	r2 = r2 >> 2;
	f2 = f2*f5;
	f5 = heapFloat[(r2)];
	f0 = f2*f0;
	f0 = f5+f0;
	heapFloat[(r2)] = f0;
	r0 = heapU8[r0+732];
	r0 = r0 & 1;
if(!(r0 ==0)) //_LBB596_45
{
	r0 = heap32[(r5+8)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = heap32[(r1+185)];
}
	if(f1 !=f4) //_LBB596_47
{
	r0 = heap32[(r5+9)];
	if(r6 !=1) //_LBB596_49
{
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = -8388609;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
}
else{
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 2139095039;
}
}
else{
	r0 = heap32[(r5+9)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = -8388609;
	r0 = heap32[(r5+10)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 2139095039;
}
	f0 = heapFloat[(r1+171)];
	f1 =                         0;
	if(f0 <=f1) //_LBB596_58
{
__label__ = 53;
}
else{
	f2 = heapFloat[(r4+80)];
	f4 = heapFloat[(r3+80)];
	f5 = heapFloat[(r4+81)];
	f6 = heapFloat[(r3+81)];
	f2 = f2*f9;
	f5 = f5*f10;
	f7 = heapFloat[(r4+82)];
	f8 = heapFloat[(r3+82)];
	f4 = f4*f9;
	f6 = f6*f10;
	f2 = f2+f5;
	f5 = f7*f3;
	f4 = f4+f6;
	f3 = f8*f3;
	f2 = f2+f5;
	f3 = f4+f3;
	f2 = f2-f3;
	if(r6 !=1) //_LBB596_55
{
	if(f2 <=f1) //_LBB596_58
{
__label__ = 53;
}
else{
	r0 = heap32[(r5+7)];
	f0 = -f0;
	r0 = (r0 + r11)|0;
	f0 = f2*f0;
	r0 = r0 >> 2;
	f1 = heapFloat[(r0)];
	if(f1 <=f0) //_LBB596_58
{
__label__ = 53;
}
else{
	heapFloat[(r0)] = f0;
__label__ = 53;
}
}
}
else{
	if(f2 >=f1) //_LBB596_58
{
__label__ = 53;
}
else{
	r0 = heap32[(r5+7)];
	f0 = -f0;
	r0 = (r0 + r11)|0;
	f0 = f2*f0;
	r0 = r0 >> 2;
	f1 = heapFloat[(r0)];
	if(f1 >=f0) //_LBB596_58
{
__label__ = 53;
}
else{
	heapFloat[(r0)] = f0;
__label__ = 53;
}
}
}
}
}
}
}
else{
	r0 = _2E_str1149;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 682;
	_assert(i7);
}
}
} while(0);
if (__label__ == 53){
	r0 = heap32[(r5+7)];
	r0 = (r0 + r11)|0;
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	f1 = heapFloat[(r1+170)];
	f0 = f0*f1;
	heapFloat[(r0)] = f0;
}
	return;
}