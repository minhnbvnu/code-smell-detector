function _ZN16btBoxBoxDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(sp)
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
	i7 = sp + -808;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = sp + -640;
	heap32[(fp+-160)] = heap32[(r1)];
	r3 = sp + -688;
	heap32[(fp+-172)] = heap32[(r1+16)];
	r4 = r2 >> 2;
	r5 = r3 >> 2;
	heap32[(r4+1)] = heap32[(r1+1)];
	heap32[(r5+1)] = heap32[(r1+17)];
	heap32[(r4+2)] = heap32[(r1+2)];
	heap32[(r5+2)] = heap32[(r1+18)];
	heap32[(r4+4)] = heap32[(r1+4)];
	heap32[(r5+4)] = heap32[(r1+20)];
	heap32[(r4+5)] = heap32[(r1+5)];
	heap32[(r5+5)] = heap32[(r1+21)];
	heap32[(r4+6)] = heap32[(r1+6)];
	heap32[(r5+6)] = heap32[(r1+22)];
	heap32[(r4+8)] = heap32[(r1+8)];
	heap32[(r5+8)] = heap32[(r1+24)];
	heap32[(r4+9)] = heap32[(r1+9)];
	heap32[(r5+9)] = heap32[(r1+25)];
	r6 = heap32[(fp)];
	heap32[(r4+10)] = heap32[(r1+10)];
	r6 = r6 >> 2;
	heap32[(r5+10)] = heap32[(r1+26)];
	r7 = heap32[(r6+2)];
	r8 = r7 >> 2;
	r9 = heap32[(r8)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+11)];
	f0 = heapFloat[(r8+7)];
	f1 = heapFloat[(r8+8)];
	f2 = heapFloat[(r8+9)];
	heap32[(g0)] = r7;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	f3 = f_g0;
	r9 = heap32[(r8)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+11)];
	heap32[(g0)] = r7;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	f4 = f_g0;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+11)];
	heap32[(g0)] = r7;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	f5 = f_g0;
	r6 = heap32[(r6+1)];
	r7 = r6 >> 2;
	r8 = heap32[(r7)];
	r8 = r8 >> 2;
	f6 = heapFloat[(r7+8)];
	r8 = heap32[(r8+11)];
	f7 = heapFloat[(r7+9)];
	f8 = heapFloat[(r7+7)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	f9 = f_g0;
	r8 = heap32[(r7)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+11)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	f10 = f_g0;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+11)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	f8 = f8+f_g0;
	f6 = f6+f10;
	f8 = f8+f8;
	f10 =                       0.5;
	heapFloat[(fp+-187)] = f10;
	f11 = heapFloat[(r1+30)];
	f12 = heapFloat[(r1+14)];
	f13 = heapFloat[(r1+29)];
	f14 = heapFloat[(r1+13)];
	f15 = heapFloat[(r1+28)];
	f16 = heapFloat[(r1+12)];
	f17 = heapFloat[(fp+-160)];
	f18 = heapFloat[(r4+4)];
	f19 = heapFloat[(r4+8)];
	f20 = heapFloat[(r4+1)];
	f21 = heapFloat[(r4+5)];
	f22 = heapFloat[(r4+9)];
	f23 = heapFloat[(r4+2)];
	f24 = heapFloat[(r4+6)];
	f25 = heapFloat[(r4+10)];
	r4 = sp + -236;
	f7 = f7+f9;
	f6 = f6+f6;
	f8 = f8*f10;
	heapFloat[(fp+-179)] = f8;
	f0 = f0+f5;
	f5 = f7+f7;
	f6 = f6*f10;
	heapFloat[(fp+-178)] = f6;
	r6 = r4 >> 2;
	heapFloat[(fp+-59)] = f8;
	f1 = f1+f4;
	f0 = f0+f0;
	f4 = f5*f10;
	heapFloat[(fp+-177)] = f4;
	heapFloat[(r6+1)] = f6;
	r7 = sp + -248;
	heap32[(fp+-186)] = r7;
	f2 = f2+f3;
	f1 = f1+f1;
	f0 = f0*f10;
	heapFloat[(fp+-181)] = f0;
	heapFloat[(r6+2)] = f4;
	f2 = f2+f2;
	f1 = f1*f10;
	heapFloat[(fp+-182)] = f1;
	r6 = r7 >> 2;
	heapFloat[(fp+-62)] = f0;
	f0 = f2*f10;
	heapFloat[(fp+-180)] = f0;
	heapFloat[(r6+1)] = f1;
	heapFloat[(r6+2)] = f0;
	f0 = f15-f16;
	heapFloat[(fp+-183)] = f0;
	f1 = f13-f14;
	heapFloat[(fp+-184)] = f1;
	f2 = heapFloat[(fp+-172)];
	heapFloat[(fp+-194)] = f2;
	f3 = heapFloat[(r5+4)];
	heapFloat[(fp+-195)] = f3;
	f4 = heapFloat[(r5+1)];
	heapFloat[(fp+-191)] = f4;
	f5 = heapFloat[(r5+5)];
	heapFloat[(fp+-192)] = f5;
	f6 = heapFloat[(r5+2)];
	heapFloat[(fp+-188)] = f6;
	f7 = heapFloat[(r5+6)];
	heapFloat[(fp+-189)] = f7;
	f8 = f11-f12;
	heapFloat[(fp+-185)] = f8;
	f9 = heapFloat[(r5+8)];
	heapFloat[(fp+-196)] = f9;
	f10 = heapFloat[(r5+9)];
	heapFloat[(fp+-193)] = f10;
	f11 = heapFloat[(r5+10)];
	heapFloat[(fp+-190)] = f11;
	f12 = f17*f2;
	f13 = f18*f3;
	f14 = f17*f0;
	f15 = f18*f1;
	f16 = f20*f0;
	f26 = f21*f1;
	f0 = f23*f0;
	heapFloat[(fp+-198)] = f0;
	f1 = f24*f1;
	f27 = f17*f4;
	f28 = f18*f5;
	f17 = f17*f6;
	f18 = f18*f7;
	f29 = f20*f2;
	f30 = f21*f3;
	f0 = f20*f4;
	heapFloat[(fp+-197)] = f0;
	f0 = f21*f5;
	f20 = f20*f6;
	f21 = f21*f7;
	f2 = f23*f2;
	f3 = f24*f3;
	f4 = f23*f4;
	f5 = f24*f5;
	f6 = f23*f6;
	f7 = f24*f7;
	f12 = f12+f13;
	f13 = f19*f9;
	f14 = f14+f15;
	f15 = f19*f8;
	f16 = f16+f26;
	f23 = f22*f8;
	f24 = heapFloat[(fp+-198)];
	f1 = f24+f1;
	f8 = f25*f8;
	f24 = f27+f28;
	f26 = f19*f10;
	f17 = f17+f18;
	f18 = f19*f11;
	f19 = f29+f30;
	f27 = f22*f9;
	f28 = heapFloat[(fp+-197)];
	f0 = f28+f0;
	f28 = f22*f10;
	f20 = f20+f21;
	f21 = f22*f11;
	f2 = f2+f3;
	f3 = f25*f9;
	f4 = f4+f5;
	f5 = f25*f10;
	f6 = f6+f7;
	f7 = f25*f11;
	f9 = f12+f13;
	r5 = heap32[(fp+2)];
	r6 = (r2 + 4)|0;
	r7 = (r3 + 4)|0;
	r8 = (r2 + 8)|0;
	r9 = (r3 + 8)|0;
	r10 = (r0 + 112)|0;
	r0 = (r0 + 48)|0;
	f10 = f14+f15;
	f11 = f16+f23;
	f1 = f1+f8;
	f8 = f24+f26;
	f12 = f17+f18;
	f13 = f19+f27;
	f0 = f0+f28;
	f14 = f20+f21;
	f2 = f2+f3;
	f3 = f4+f5;
	f4 = f6+f7;
	f5 =                         0;
	if(f9 <f5) //_LBB166_2
{
	f6 = -f9;
}
else{
	f6 = f9;
}
	if(f8 <f5) //_LBB166_5
{
	f7 = -f8;
}
else{
	f7 = f8;
}
	if(f12 <f5) //_LBB166_8
{
	f15 = -f12;
}
else{
	f15 = f12;
}
	if(f13 <f5) //_LBB166_11
{
	f16 = -f13;
}
else{
	f16 = f13;
}
	if(f0 <f5) //_LBB166_14
{
	f17 = -f0;
}
else{
	f17 = f0;
}
	if(f14 <f5) //_LBB166_17
{
	f18 = -f14;
}
else{
	f18 = f14;
}
	if(f2 <f5) //_LBB166_20
{
	f19 = -f2;
}
else{
	f19 = f2;
}
	if(f3 <f5) //_LBB166_23
{
	f20 = -f3;
}
else{
	f20 = f3;
}
	if(f4 <f5) //_LBB166_26
{
	f21 = -f4;
}
else{
	f21 = f4;
}
	if(f10 <f5) //_LBB166_29
{
	f22 = -f10;
}
else{
	f22 = f10;
}
	f23 = heapFloat[(fp+-181)];
	f23 = f23*f6;
	f24 = heapFloat[(fp+-179)];
	f23 = f24+f23;
	f24 = heapFloat[(fp+-182)];
	f24 = f24*f7;
	f23 = f23+f24;
	f24 = heapFloat[(fp+-180)];
	f24 = f24*f15;
	f23 = f23+f24;
	f22 = f22-f23;
_41: do {
if(!(f22 >f5)) //_LBB166_268
{
	f23 =  -3.4028234663852886e+038;
	if(f22 >f23) //_LBB166_33
{
	f23 =                         0;
	r11 = f10 < f23;
	r13 = sp + -640;
	r11 = r11 & 1;
	r12 = 1;
	f23 = f22;
}
else{
	r11 = 0;
	r12 = r11;
	r13 = r11;
}
	if(f11 <f5) //_LBB166_36
{
	f22 = -f11;
}
else{
	f22 = f11;
}
	f24 = heapFloat[(fp+-181)];
	f24 = f24*f16;
	f25 = heapFloat[(fp+-178)];
	f24 = f25+f24;
	f25 = heapFloat[(fp+-182)];
	f25 = f25*f17;
	f24 = f24+f25;
	f25 = heapFloat[(fp+-180)];
	f25 = f25*f18;
	f24 = f24+f25;
	f22 = f22-f24;
if(!(f22 >f5)) //_LBB166_268
{
	if(f22 >f23) //_LBB166_40
{
	f23 =                         0;
	r11 = f11 < f23;
	r11 = r11 & 1;
	r12 = 2;
	f23 = f22;
	r13 = r6;
}
	if(f1 <f5) //_LBB166_43
{
	f22 = -f1;
}
else{
	f22 = f1;
}
	f24 = heapFloat[(fp+-181)];
	f24 = f24*f19;
	f25 = heapFloat[(fp+-177)];
	f24 = f25+f24;
	f25 = heapFloat[(fp+-182)];
	f25 = f25*f20;
	f24 = f24+f25;
	f25 = heapFloat[(fp+-180)];
	f25 = f25*f21;
	f24 = f24+f25;
	f22 = f22-f24;
if(!(f22 >f5)) //_LBB166_268
{
	if(f22 >f23) //_LBB166_47
{
	f23 =                         0;
	r11 = f1 < f23;
	r11 = r11 & 1;
	r12 = 3;
	f23 = f22;
	r13 = r8;
}
	f24 = heapFloat[(fp+-183)];
	f22 = heapFloat[(fp+-194)];
	f22 = f22*f24;
	f25 = heapFloat[(fp+-184)];
	f24 = heapFloat[(fp+-195)];
	f24 = f24*f25;
	f22 = f22+f24;
	f25 = heapFloat[(fp+-185)];
	f24 = heapFloat[(fp+-196)];
	f24 = f24*f25;
	f22 = f22+f24;
	if(f22 <f5) //_LBB166_50
{
	f24 = -f22;
}
else{
	f24 = f22;
}
	f25 = heapFloat[(fp+-179)];
	f25 = f25*f6;
	f26 = heapFloat[(fp+-178)];
	f26 = f26*f16;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-177)];
	f26 = f26*f19;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-181)];
	f25 = f25+f26;
	f24 = f24-f25;
if(!(f24 >f5)) //_LBB166_268
{
	if(f24 >f23) //_LBB166_54
{
	f23 =                         0;
	r11 = f22 < f23;
	r13 = sp + -688;
	r11 = r11 & 1;
	r12 = 4;
	f23 = f24;
}
	f24 = heapFloat[(fp+-183)];
	f22 = heapFloat[(fp+-191)];
	f22 = f22*f24;
	f25 = heapFloat[(fp+-184)];
	f24 = heapFloat[(fp+-192)];
	f24 = f24*f25;
	f22 = f22+f24;
	f25 = heapFloat[(fp+-185)];
	f24 = heapFloat[(fp+-193)];
	f24 = f24*f25;
	f22 = f22+f24;
	if(f22 <f5) //_LBB166_57
{
	f24 = -f22;
}
else{
	f24 = f22;
}
	f25 = heapFloat[(fp+-179)];
	f25 = f25*f7;
	f26 = heapFloat[(fp+-178)];
	f26 = f26*f17;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-177)];
	f26 = f26*f20;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-182)];
	f25 = f25+f26;
	f24 = f24-f25;
if(!(f24 >f5)) //_LBB166_268
{
	if(f24 >f23) //_LBB166_61
{
	f23 =                         0;
	r11 = f22 < f23;
	r11 = r11 & 1;
	r12 = 5;
	f23 = f24;
	r13 = r7;
}
	f24 = heapFloat[(fp+-183)];
	f22 = heapFloat[(fp+-188)];
	f22 = f22*f24;
	f25 = heapFloat[(fp+-184)];
	f24 = heapFloat[(fp+-189)];
	f24 = f24*f25;
	f22 = f22+f24;
	f25 = heapFloat[(fp+-185)];
	f24 = heapFloat[(fp+-190)];
	f24 = f24*f25;
	f22 = f22+f24;
	if(f22 <f5) //_LBB166_64
{
	f24 = -f22;
}
else{
	f24 = f22;
}
	f25 = heapFloat[(fp+-179)];
	f25 = f25*f15;
	f26 = heapFloat[(fp+-178)];
	f26 = f26*f18;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-177)];
	f26 = f26*f21;
	f25 = f25+f26;
	f26 = heapFloat[(fp+-180)];
	f25 = f25+f26;
	f24 = f24-f25;
if(!(f24 >f5)) //_LBB166_268
{
	if(f24 >f23) //_LBB166_68
{
	f23 =                         0;
	r11 = f22 < f23;
	r11 = r11 & 1;
	r12 = 6;
	f23 = f24;
	r13 = r9;
}
	f22 = f1*f13;
	f24 = f11*f2;
	f25 =   9.9999997473787516e-006;
	f22 = f22-f24;
	f6 = f6+f25;
	f7 = f7+f25;
	f15 = f15+f25;
	heapFloat[(fp+-183)] = f15;
	f15 = f16+f25;
	f16 = f17+f25;
	f17 = f18+f25;
	f18 = f19+f25;
	heapFloat[(fp+-184)] = f18;
	f18 = f20+f25;
	heapFloat[(fp+-185)] = f18;
	f18 = f21+f25;
	if(f22 <f5) //_LBB166_71
{
	f19 = -f22;
}
else{
	f19 = f22;
}
	f21 = heapFloat[(fp+-184)];
	f20 = heapFloat[(fp+-178)];
	f20 = f20*f21;
	f21 = heapFloat[(fp+-177)];
	f21 = f21*f15;
	f20 = f20+f21;
	f24 = heapFloat[(fp+-183)];
	f21 = heapFloat[(fp+-182)];
	f21 = f21*f24;
	f20 = f20+f21;
	f21 = heapFloat[(fp+-180)];
	f21 = f21*f7;
	f20 = f20+f21;
	f19 = f19-f20;
	f20 =   1.1920928955078125e-007;
if(!(f19 >f20)) //_LBB166_268
{
	f21 = f2*f2;
	f21 = f21+f5;
	f24 = f13*f13;
	heapFloat[(fp+-188)] = f24;
	f24 = f21+f24;
	heapFloat[(g0)] = f24;
	sqrtf(i7);
	f24 = f_g0;
	if(f24 >f20) //_LBB166_75
{
	f25 = f19/f24;
	f19 =        1.0499999523162842;
	f19 = f25*f19;
	if(f19 <=f23) //_LBB166_74
{
__label__ = 69;
}
else{
	f19 =                         0;
	f23 = -f2;
	r11 = f22 < f19;
	f19 = f19/f24;
	f22 = f23/f24;
	f24 = f13/f24;
	r11 = r11 & 1;
	r12 = 7;
	r13 = 0;
	f23 = f25;
__label__ = 72;
}
}
else{
__label__ = 69;
}
if (__label__ == 69){
	f19 = f5;
	f22 = f5;
	f24 = f5;
}
	f25 = f1*f0;
	f26 = f11*f3;
	f25 = f25-f26;
	if(f25 <f5) //_LBB166_79
{
	f5 = -f25;
}
else{
	f5 = f25;
}
	f27 = heapFloat[(fp+-185)];
	f26 = heapFloat[(fp+-178)];
	f26 = f26*f27;
	f27 = heapFloat[(fp+-177)];
	f27 = f27*f16;
	f26 = f26+f27;
	f28 = heapFloat[(fp+-183)];
	f27 = heapFloat[(fp+-181)];
	f27 = f27*f28;
	f26 = f26+f27;
	f27 = heapFloat[(fp+-180)];
	f27 = f27*f6;
	f26 = f26+f27;
	f5 = f5-f26;
if(!(f5 >f20)) //_LBB166_268
{
	f26 = f3*f3;
	f27 =                         0;
	f26 = f26+f27;
	f28 = f0*f0;
	heapFloat[(fp+-189)] = f28;
	f28 = f26+f28;
	heapFloat[(g0)] = f28;
	sqrtf(i7);
	f28 = f_g0;
	if(f28 >f20) //_LBB166_83
{
	f5 = f5/f28;
	f29 =        1.0499999523162842;
	f29 = f5*f29;
if(!(f29 <=f23)) //_LBB166_82
{
	f19 =                         0;
	f22 = -f3;
	r11 = f25 < f19;
	f19 = f19/f28;
	f22 = f22/f28;
	f24 = f0/f28;
	r11 = r11 & 1;
	r12 = 8;
	r13 = 0;
	f23 = f5;
}
}
	f5 = f1*f14;
	f25 = f11*f4;
	f5 = f5-f25;
	if(f5 <f27) //_LBB166_87
{
	f25 = -f5;
}
else{
	f25 = f5;
}
	f28 = heapFloat[(fp+-178)];
	f28 = f28*f18;
	f29 = heapFloat[(fp+-177)];
	f29 = f29*f17;
	f28 = f28+f29;
	f29 = heapFloat[(fp+-181)];
	f29 = f29*f7;
	f28 = f28+f29;
	f29 = heapFloat[(fp+-182)];
	f29 = f29*f6;
	f28 = f28+f29;
	f25 = f25-f28;
if(!(f25 >f20)) //_LBB166_268
{
	f28 = f4*f4;
	f28 = f28+f27;
	f29 = f14*f14;
	heapFloat[(fp+-190)] = f29;
	f29 = f28+f29;
	heapFloat[(g0)] = f29;
	sqrtf(i7);
	f29 = f_g0;
	if(f29 >f20) //_LBB166_91
{
	f25 = f25/f29;
	f30 =        1.0499999523162842;
	f30 = f25*f30;
if(!(f30 <=f23)) //_LBB166_90
{
	f19 =                         0;
	f22 = -f4;
	r11 = f5 < f19;
	f19 = f19/f29;
	f22 = f22/f29;
	f24 = f14/f29;
	r11 = r11 & 1;
	r12 = 9;
	r13 = 0;
	f23 = f25;
}
}
	f5 = f10*f2;
	f25 = f1*f9;
	f5 = f5-f25;
	if(f5 <f27) //_LBB166_95
{
	f25 = -f5;
}
else{
	f25 = f5;
}
	f30 = heapFloat[(fp+-184)];
	f29 = heapFloat[(fp+-179)];
	f29 = f29*f30;
	f30 = heapFloat[(fp+-177)];
	f30 = f30*f6;
	f29 = f29+f30;
	f30 = heapFloat[(fp+-182)];
	f30 = f30*f17;
	f29 = f29+f30;
	f30 = heapFloat[(fp+-180)];
	f30 = f30*f16;
	f29 = f29+f30;
	f25 = f25-f29;
if(!(f25 >f20)) //_LBB166_268
{
	f29 = f9*f9;
	f21 = f21+f29;
	heapFloat[(g0)] = f21;
	sqrtf(i7);
	f21 = f_g0;
	if(f21 >f20) //_LBB166_99
{
	f25 = f25/f21;
	f30 =        1.0499999523162842;
	f30 = f25*f30;
if(!(f30 <=f23)) //_LBB166_98
{
	f22 =                         0;
	f23 = -f9;
	r11 = f5 < f22;
	f19 = f2/f21;
	f22 = f22/f21;
	f24 = f23/f21;
	r11 = r11 & 1;
	r12 = 10;
	r13 = 0;
	f23 = f25;
}
}
	f2 = f10*f3;
	f5 = f1*f8;
	f2 = f2-f5;
	if(f2 <f27) //_LBB166_103
{
	f5 = -f2;
}
else{
	f5 = f2;
}
	f25 = heapFloat[(fp+-185)];
	f21 = heapFloat[(fp+-179)];
	f21 = f21*f25;
	f25 = heapFloat[(fp+-177)];
	f25 = f25*f7;
	f21 = f21+f25;
	f25 = heapFloat[(fp+-181)];
	f25 = f25*f17;
	f21 = f21+f25;
	f25 = heapFloat[(fp+-180)];
	f25 = f25*f15;
	f21 = f21+f25;
	f5 = f5-f21;
if(!(f5 >f20)) //_LBB166_268
{
	f21 = f8*f8;
	f25 = f26+f21;
	heapFloat[(g0)] = f25;
	sqrtf(i7);
	f25 = f_g0;
	if(f25 >f20) //_LBB166_107
{
	f5 = f5/f25;
	f26 =        1.0499999523162842;
	f26 = f5*f26;
if(!(f26 <=f23)) //_LBB166_106
{
	f22 =                         0;
	f23 = -f8;
	r11 = f2 < f22;
	f19 = f3/f25;
	f22 = f22/f25;
	f24 = f23/f25;
	r11 = r11 & 1;
	r12 = 11;
	r13 = 0;
	f23 = f5;
}
}
	f2 = f10*f4;
	f1 = f1*f12;
	f1 = f2-f1;
	if(f1 <f27) //_LBB166_111
{
	f2 = -f1;
}
else{
	f2 = f1;
}
	f3 = heapFloat[(fp+-179)];
	f3 = f3*f18;
	f25 = heapFloat[(fp+-183)];
	f5 = heapFloat[(fp+-177)];
	f5 = f5*f25;
	f3 = f3+f5;
	f5 = heapFloat[(fp+-181)];
	f5 = f5*f16;
	f3 = f3+f5;
	f5 = heapFloat[(fp+-182)];
	f5 = f5*f15;
	f3 = f3+f5;
	f2 = f2-f3;
if(!(f2 >f20)) //_LBB166_268
{
	f3 = f12*f12;
	f5 = f28+f3;
	heapFloat[(g0)] = f5;
	sqrtf(i7);
	f5 = f_g0;
	if(f5 >f20) //_LBB166_115
{
	f2 = f2/f5;
	f25 =        1.0499999523162842;
	f25 = f2*f25;
if(!(f25 <=f23)) //_LBB166_114
{
	f22 =                         0;
	f23 = -f12;
	r11 = f1 < f22;
	f19 = f4/f5;
	f22 = f22/f5;
	f24 = f23/f5;
	r11 = r11 & 1;
	r12 = 12;
	r13 = 0;
	f23 = f2;
}
}
	f1 = f11*f9;
	f2 = f10*f13;
	f1 = f1-f2;
	if(f1 <f27) //_LBB166_119
{
	f2 = -f1;
}
else{
	f2 = f1;
}
	f4 = heapFloat[(fp+-179)];
	f4 = f4*f15;
	f5 = heapFloat[(fp+-178)];
	f5 = f5*f6;
	f4 = f4+f5;
	f5 = heapFloat[(fp+-182)];
	f5 = f5*f18;
	f4 = f4+f5;
	f6 = heapFloat[(fp+-185)];
	f5 = heapFloat[(fp+-180)];
	f5 = f5*f6;
	f4 = f4+f5;
	f2 = f2-f4;
if(!(f2 >f20)) //_LBB166_268
{
	f4 = heapFloat[(fp+-188)];
	f4 = f4+f29;
	f4 = f4+f27;
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	if(f4 >f20) //_LBB166_123
{
	f2 = f2/f4;
	f5 =        1.0499999523162842;
	f5 = f2*f5;
if(!(f5 <=f23)) //_LBB166_122
{
	f23 =                         0;
	f19 = -f13;
	r11 = f1 < f23;
	f19 = f19/f4;
	f22 = f9/f4;
	f24 = f23/f4;
	r11 = r11 & 1;
	r12 = 13;
	r13 = 0;
	f23 = f2;
}
}
	f1 = f11*f8;
	f2 = f10*f0;
	f1 = f1-f2;
	if(f1 <f27) //_LBB166_127
{
	f2 = -f1;
}
else{
	f2 = f1;
}
	f4 = heapFloat[(fp+-179)];
	f4 = f4*f16;
	f5 = heapFloat[(fp+-178)];
	f5 = f5*f7;
	f4 = f4+f5;
	f5 = heapFloat[(fp+-181)];
	f5 = f5*f18;
	f4 = f4+f5;
	f6 = heapFloat[(fp+-184)];
	f5 = heapFloat[(fp+-180)];
	f5 = f5*f6;
	f4 = f4+f5;
	f2 = f2-f4;
if(!(f2 >f20)) //_LBB166_268
{
	f4 = heapFloat[(fp+-189)];
	f4 = f4+f21;
	f4 = f4+f27;
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	if(f4 >f20) //_LBB166_131
{
	f2 = f2/f4;
	f5 =        1.0499999523162842;
	f5 = f2*f5;
if(!(f5 <=f23)) //_LBB166_130
{
	f23 =                         0;
	f19 = -f0;
	r11 = f1 < f23;
	f19 = f19/f4;
	f22 = f8/f4;
	f24 = f23/f4;
	r11 = r11 & 1;
	r12 = 14;
	r13 = 0;
	f23 = f2;
}
}
	f0 = f11*f12;
	f1 = f10*f14;
	f0 = f0-f1;
	if(f0 <f27) //_LBB166_135
{
	f1 = -f0;
}
else{
	f1 = f0;
}
	f2 = heapFloat[(fp+-179)];
	f2 = f2*f17;
	f5 = heapFloat[(fp+-183)];
	f4 = heapFloat[(fp+-178)];
	f4 = f4*f5;
	f2 = f2+f4;
	f5 = heapFloat[(fp+-185)];
	f4 = heapFloat[(fp+-181)];
	f4 = f4*f5;
	f2 = f2+f4;
	f5 = heapFloat[(fp+-184)];
	f4 = heapFloat[(fp+-182)];
	f4 = f4*f5;
	f2 = f2+f4;
	f1 = f1-f2;
if(!(f1 >f20)) //_LBB166_268
{
	f2 = heapFloat[(fp+-190)];
	f2 = f2+f3;
	f2 = f2+f27;
	heapFloat[(g0)] = f2;
	sqrtf(i7);
	f2 = f_g0;
	if(f2 <=f20) //_LBB166_140
{
__label__ = 128;
}
else{
	f1 = f1/f2;
	heapFloat[(fp+-183)] = f1;
	f3 =        1.0499999523162842;
	f1 = f1*f3;
	if(f1 <=f23) //_LBB166_140
{
__label__ = 128;
}
else{
	f23 =                         0;
	f19 = -f14;
	r11 = f0 < f23;
	f19 = f19/f2;
	f22 = f12/f2;
	f24 = f23/f2;
	r11 = r11 & 1;
	r13 = sp + -704;
	r12 = 15;
__label__ = 132;
}
}
if (__label__ == 128){
	if(r12 ==0) //_LBB166_268
{
break _41;
}
else{
	if(r13 !=0) //_LBB166_143
{
	r13 = r13 >> 2;
	f0 = heapFloat[(r13)];
	r6 = sp + -704;
	heapFloat[(fp+-176)] = f0;
	f1 = heapFloat[(r13+4)];
	r6 = r6 >> 2;
	heapFloat[(r6+1)] = f1;
	f19 = heapFloat[(r13+8)];
	heapFloat[(r6+2)] = f19;
	heapFloat[(fp+-183)] = f23;
__label__ = 133;
}
else{
	r13 = sp + -704;
	heapFloat[(fp+-183)] = f23;
__label__ = 132;
}
}
}
if (__label__ == 132){
	r6 = sp + -640;
	r6 = r6 >> 2;
	f0 = heapFloat[(fp+-160)];
	f1 = heapFloat[(r6+1)];
	f2 = heapFloat[(r6+2)];
	f0 = f0*f19;
	f1 = f1*f22;
	f0 = f0+f1;
	f1 = f2*f24;
	f0 = f0+f1;
	r7 = r13 >> 2;
	heapFloat[(r7)] = f0;
	f1 = heapFloat[(r6+4)];
	f2 = heapFloat[(r6+5)];
	f3 = heapFloat[(r6+6)];
	f1 = f1*f19;
	f2 = f2*f22;
	r7 = sp + -704;
	f1 = f1+f2;
	f2 = f3*f24;
	f1 = f1+f2;
	r7 = r7 >> 2;
	heapFloat[(r7+1)] = f1;
	f2 = heapFloat[(r6+8)];
	f3 = heapFloat[(r6+9)];
	f4 = heapFloat[(r6+10)];
	f19 = f2*f19;
	f2 = f3*f22;
	f19 = f19+f2;
	f2 = f4*f24;
	f19 = f19+f2;
	heapFloat[(r7+2)] = f19;
}
	if(r11 !=0) //_LBB166_147
{
	f0 = -f0;
	r6 = sp + -704;
	f1 = -f1;
	r6 = r6 >> 2;
	heapFloat[(fp+-176)] = f0;
	f19 = -f19;
	heapFloat[(r6+1)] = f1;
	heapFloat[(r6+2)] = f19;
}
	if(r12 <7) //_LBB166_153
{
	if(r12 >3) //_LBB166_155
{
	f0 = -f0;
	f1 = -f1;
	f19 = -f19;
	r1 = r0;
	r0 = r10;
}
else{
	r3 = sp + -640;
	r2 = sp + -688;
	r4 = sp + -236;
	heap32[(fp+-186)] = r4;
	r4 = sp + -248;
	r1 = r10;
}
	r6 = r2 >> 2;
	f2 = heapFloat[(r6)];
	f3 = heapFloat[(r6+4)];
	f4 = heapFloat[(r6+8)];
	f2 = f2*f0;
	f3 = f3*f1;
	f2 = f2+f3;
	f3 = f4*f19;
	f2 = f2+f3;
	heapFloat[(fp+-66)] = f2;
	f3 = heapFloat[(r6+1)];
	f4 = heapFloat[(r6+5)];
	f5 = heapFloat[(r6+9)];
	f3 = f3*f0;
	f4 = f4*f1;
	r7 = sp + -264;
	f3 = f3+f4;
	f4 = f5*f19;
	f3 = f3+f4;
	r8 = r7 >> 2;
	heapFloat[(r8+1)] = f3;
	f4 = heapFloat[(r6+2)];
	f5 = heapFloat[(r6+6)];
	f6 = heapFloat[(r6+10)];
	f4 = f4*f0;
	f5 = f5*f1;
	f4 = f4+f5;
	f5 = f6*f19;
	f4 = f4+f5;
	heapFloat[(r8+2)] = f4;
	if(f2 <f27) //_LBB166_158
{
	f2 = -f2;
}
	if(f3 <f27) //_LBB166_161
{
	f3 = -f3;
}
	if(f4 <f27) //_LBB166_164
{
	f4 = -f4;
}
	if(f3 <=f2) //_LBB166_169
{
	if(f2 <=f4) //_LBB166_171
{
	r6 = 2;
	r8 = 0;
	r9 = 1;
}
else{
	r6 = 0;
	r8 = 1;
	r9 = 2;
}
}
else{
	if(f3 <=f4) //_LBB166_168
{
	r6 = 2;
	r8 = 0;
	r9 = 1;
}
else{
	r6 = 1;
	r8 = 0;
	r9 = 2;
}
}
	r10 = r6 << 2;
	r11 = (r4 + r10)|0;
	r13 = (r2 + r10)|0;
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	r11 = r11 >> 2;
	r13 = r13 >> 2;
	f2 = heapFloat[(r11)];
	f3 = heapFloat[(r13)];
	f4 = heapFloat[(r1)];
	f5 = heapFloat[(r0)];
	r7 = (r7 + r10)|0;
	f4 = f4-f5;
	f3 = f2*f3;
	r7 = r7 >> 2;
	f5 = heapFloat[(r7)];
	if(f5 <f27) //_LBB166_174
{
	r7 = r6 | 4;
	r6 = r6 | 8;
	r7 = r7 << 2;
	r6 = r6 << 2;
	r7 = (r2 + r7)|0;
	r6 = (r2 + r6)|0;
	r7 = r7 >> 2;
	r6 = r6 >> 2;
	f5 = heapFloat[(r1+1)];
	f6 = heapFloat[(r0+1)];
	f7 = heapFloat[(r7)];
	f8 = heapFloat[(r6)];
	f9 = heapFloat[(r1+2)];
	f10 = heapFloat[(r0+2)];
	f5 = f5-f6;
	f6 = f2*f7;
	f7 = f9-f10;
	f2 = f2*f8;
	f3 = f4+f3;
	f4 = f5+f6;
	f2 = f7+f2;
}
else{
	r7 = r6 | 4;
	r6 = r6 | 8;
	r7 = r7 << 2;
	r6 = r6 << 2;
	r7 = (r2 + r7)|0;
	r6 = (r2 + r6)|0;
	r7 = r7 >> 2;
	r6 = r6 >> 2;
	f5 = heapFloat[(r1+1)];
	f6 = heapFloat[(r0+1)];
	f7 = heapFloat[(r7)];
	f8 = heapFloat[(r6)];
	f9 = heapFloat[(r1+2)];
	f10 = heapFloat[(r0+2)];
	f5 = f5-f6;
	f6 = f2*f7;
	f7 = f9-f10;
	f2 = f2*f8;
	f3 = f4-f3;
	f4 = f5-f6;
	f2 = f7-f2;
}
	r1 = -1;
	r6 = -4;
	r6 = r12 < 4 ? r1 : r6;
	r6 = (r6 + r12)|0;
	if(r6 ==1) //_LBB166_178
{
	r7 = 0;
	r10 = 2;
}
else{
	if(r6 !=0) //_LBB166_179
{
	r7 = 0;
	r10 = 1;
}
else{
	r7 = 1;
	r10 = 2;
}
}
	r11 = r8 | 4;
	r13 = r7 | 4;
	r14 = r8 | 8;
	r15 = r9 | 4;
	r16 = r7 | 8;
	r17 = r10 | 4;
	r7 = r7 << 2;
	r13 = r13 << 2;
	r11 = r11 << 2;
	r8 = r8 << 2;
	r18 = r9 | 8;
	r19 = (r3 + r7)|0;
	r13 = (r3 + r13)|0;
	r16 = r16 << 2;
	r20 = r10 << 2;
	r17 = r17 << 2;
	r10 = r10 | 8;
	r21 = (r2 + r8)|0;
	r11 = (r2 + r11)|0;
	r14 = r14 << 2;
	r15 = r15 << 2;
	r9 = r9 << 2;
	r19 = r19 >> 2;
	r13 = r13 >> 2;
	r16 = (r3 + r16)|0;
	r22 = (r3 + r20)|0;
	r17 = (r3 + r17)|0;
	r10 = r10 << 2;
	r21 = r21 >> 2;
	heap32[(fp+-178)] = r21;
	r11 = r11 >> 2;
	heap32[(fp+-177)] = r11;
	r14 = (r2 + r14)|0;
	r23 = (r2 + r9)|0;
	r15 = (r2 + r15)|0;
	r18 = r18 << 2;
	r16 = r16 >> 2;
	r22 = r22 >> 2;
	r17 = r17 >> 2;
	r3 = (r3 + r10)|0;
	r10 = r14 >> 2;
	heap32[(fp+-179)] = r10;
	r14 = r23 >> 2;
	heap32[(fp+-180)] = r14;
	r15 = r15 >> 2;
	r2 = (r2 + r18)|0;
	f5 = heapFloat[(r19)];
	f6 = heapFloat[(r21)];
	f7 = heapFloat[(r13)];
	f8 = heapFloat[(r11)];
	f9 = heapFloat[(r22)];
	f10 = heapFloat[(r14)];
	f11 = heapFloat[(r17)];
	f12 = heapFloat[(r15)];
	r3 = r3 >> 2;
	r2 = r2 >> 2;
	r8 = (r4 + r8)|0;
	f13 = f5*f6;
	f14 = f7*f8;
	f15 = heapFloat[(r16)];
	f16 = heapFloat[(r10)];
	f17 = heapFloat[(r3)];
	f18 = heapFloat[(r2)];
	r3 = r8 >> 2;
	r4 = (r4 + r9)|0;
	f6 = f9*f6;
	f8 = f11*f8;
	f21 = f3*f5;
	f22 = f4*f7;
	f13 = f13+f14;
	f14 = f15*f16;
	f5 = f5*f10;
	f7 = f7*f12;
	f13 = f13+f14;
	f14 = heapFloat[(r3)];
	r3 = r4 >> 2;
	f23 = f3*f9;
	f24 = f4*f11;
	f6 = f6+f8;
	f8 = f17*f16;
	f9 = f9*f10;
	f10 = f11*f12;
	f11 = f21+f22;
	f12 = f2*f15;
	f5 = f5+f7;
	f7 = f15*f18;
	f6 = f6+f8;
	f8 = f11+f12;
	f11 = f14*f13;
	f5 = f5+f7;
	f7 = heapFloat[(r3)];
	f12 = f23+f24;
	f15 = f2*f17;
	f9 = f9+f10;
	f10 = f17*f18;
	f9 = f9+f10;
	f10 = f12+f15;
	f12 = f14*f6;
	f14 = f8-f11;
	f15 = f7*f5;
	r3 = sp + -296;
	f16 = f10-f12;
	f7 = f7*f9;
	f17 = f14-f15;
	r4 = r3 >> 2;
	f18 = f16-f7;
	heapFloat[(fp+-74)] = f17;
	f14 = f14+f15;
	heapFloat[(r4+1)] = f18;
	f11 = f8+f11;
	f16 = f16+f7;
	heapFloat[(r4+2)] = f14;
	f12 = f10+f12;
	f14 = f11+f15;
	heapFloat[(r4+3)] = f16;
	f16 = f12+f7;
	heapFloat[(r4+4)] = f14;
	f11 = f11-f15;
	heapFloat[(r4+5)] = f16;
	r8 = heap32[(fp+-186)];
	r7 = (r8 + r7)|0;
	f7 = f12-f7;
	heapFloat[(r4+6)] = f11;
	r9 = sp + -304;
	r8 = (r8 + r20)|0;
	r7 = r7 >> 2;
	heapFloat[(r4+7)] = f7;
	r4 = sp + -368;
	r10 = 0;
	r11 = 4;
	r13 = r9 >> 2;
	r8 = r8 >> 2;
	heap32[(fp+-76)] = heap32[(r7)];
	heap32[(r13+1)] = heap32[(r8)];
	r7 = r10;
_217: while(true){
	if(r7 <2) //_LBB166_199
{
	r18 = 0;
	r17 = (r18 - r7)|0;
	r14 = r1;
	r8 = r4;
_220: while(true){
	r4 = r8;
	if(r14 >1) //_LBB166_196
{
break _220;
}
else{
	f7 = r14; //fitos r14, f7
	r16 = (r3 + 8)|0;
	r8 = r18;
	r10 = r18;
	r13 = r4;
_223: while(true){
	if(r11 >0) //_LBB166_181
{
	r19 = (r3 + r8)|0;
	r20 = (r16 + r8)|0;
	r21 = r7 << 2;
	r22 = (r9 + r21)|0;
	r23 = (r19 + r21)|0;
	r22 = r22 >> 2;
	r23 = r23 >> 2;
	f11 = heapFloat[(r22)];
	f12 = heapFloat[(r23)];
	f14 = f7*f12;
	if(f14 <f11) //_LBB166_183
{
	r24 = r13 >> 2;
	r25 = r19 >> 2;
	r10 = (r10 + 1)|0;
	heap32[(r24)] = heap32[(r25)];
	heap32[(r24+1)] = heap32[(r25+1)];
	r24 = r10 & 8;
	if(r24 ==0) //_LBB166_185
{
	r13 = (r13 + 8)|0;
	f12 = heapFloat[(r23)];
	f11 = heapFloat[(r22)];
}
else{
__label__ = 179;
break _217;
}
}
	r20 = r11 > 1 ? r20 : r3;
	r23 = (r20 + r21)|0;
	r23 = r23 >> 2;
	f14 = heapFloat[(r23)];
	f15 = f7*f12;
	f16 = f7*f14;
	r23 = f15 < f11;
	r24 = f16 < f11;
	r23 = r23 ^ r24;
	if(r23 != 0) //_LBB166_188
{
	r23 = r17 << 2;
	r19 = (r19 + r23)|0;
	r20 = (r20 + r23)|0;
	r19 = r19 >> 2;
	r20 = r20 >> 2;
	f15 = heapFloat[(r19+1)];
	f16 = heapFloat[(r20+1)];
	f11 = f7*f11;
	f16 = f16-f15;
	f14 = f14-f12;
	f14 = f16/f14;
	f11 = f11-f12;
	r19 = (r13 + r23)|0;
	f11 = f14*f11;
	r19 = r19 >> 2;
	f11 = f15+f11;
	heapFloat[(r19+1)] = f11;
	r19 = (r13 + r21)|0;
	f11 = heapFloat[(r22)];
	r10 = (r10 + 1)|0;
	r19 = r19 >> 2;
	f11 = f7*f11;
	heapFloat[(r19)] = f11;
	r19 = r10 & 8;
	if(r19 ==0) //_LBB166_190
{
	r13 = (r13 + 8)|0;
}
else{
__label__ = 179;
break _217;
}
}
	r11 = (r11 + -1)|0;
	r8 = (r8 + 8)|0;
}
else{
break _223;
}
}
	r3 = sp + -368;
	r8 = sp + -128;
	r8 = r4 == r3 ? r8 : r3;
	r14 = (r14 + 2)|0;
	r3 = r4;
	r11 = r10;
}
}
	r7 = (r7 + 1)|0;
}
else{
__label__ = 177;
break _217;
}
}
if (__label__ == 177){
	r4 = r3;
}
	r1 = sp + -368;
if(!(r4 ==r1)) //_LBB166_202
{
	r3 = r10 << 3;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r3;
	memcpy(i7);
}
	if(r10 <1) //_LBB166_268
{
break _41;
}
else{
	f7 = f13*f9;
	f11 = f5*f6;
	f12 =                         1;
	f7 = f7-f11;
	r3 = r6 << 2;
	f7 = f12/f7;
	r4 = heap32[(fp+-186)];
	r3 = (r4 + r3)|0;
	f6 = f6*f7;
	r3 = r3 >> 2;
	f11 = f13*f7;
	f5 = f5*f7;
	f7 = f9*f7;
	f6 = -f6;
	f9 = heapFloat[(r3)];
	r3 = heap32[(fp+-178)];
	f13 = heapFloat[(r3)];
	r3 = heap32[(fp+-180)];
	f14 = heapFloat[(r3)];
	r3 = heap32[(fp+-177)];
	f15 = heapFloat[(r3)];
	f16 = heapFloat[(r15)];
	r3 = heap32[(fp+-179)];
	f17 = heapFloat[(r3)];
	f18 = heapFloat[(r2)];
	r2 = (r1 + 4)|0;
	r3 = 0;
_243: while(true){
	r4 = r2 >> 2;
	f21 = heapFloat[(r4+-1)];
	f22 = heapFloat[(r4)];
	f23 = f21-f8;
	f24 = f22-f10;
	f25 = f23*f7;
	f26 = f24*f5;
	f25 = f25-f26;
	f23 = f23*f6;
	f24 = f24*f11;
	r4 = (r3 * 3)|0;
	f26 = f15*f25;
	f23 = f23+f24;
	f24 = f13*f25;
	r6 = sp + -464;
	r4 = r4 << 2;
	f25 = f17*f25;
	f26 = f4+f26;
	f28 = f16*f23;
	f24 = f3+f24;
	f29 = f14*f23;
	r4 = (r6 + r4)|0;
	f24 = f24+f29;
	f26 = f26+f28;
	f25 = f2+f25;
	f23 = f18*f23;
	f28 = f0*f24;
	f29 = f1*f26;
	f23 = f25+f23;
	r4 = r4 >> 2;
	heapFloat[(r4)] = f24;
	f24 = f28+f29;
	f25 = f19*f23;
	r7 = sp + -496;
	r8 = r3 << 2;
	r8 = (r7 + r8)|0;
	heapFloat[(r4+1)] = f26;
	f24 = f24+f25;
	f24 = f9-f24;
	r8 = r8 >> 2;
	heapFloat[(r4+2)] = f23;
	heapFloat[(r8)] = f24;
	if(f24 >=f27) //_LBB166_206
{
	r4 = r3 << 3;
	r8 = r4 | 4;
	r4 = (r1 + r4)|0;
	r8 = (r1 + r8)|0;
	r4 = r4 >> 2;
	r3 = (r3 + 1)|0;
	r8 = r8 >> 2;
	heapFloat[(r4)] = f21;
	heapFloat[(r8)] = f22;
}
	r10 = (r10 + -1)|0;
	r2 = (r2 + 8)|0;
if(!(r10 !=0)) //_LBB166_204
{
break _243;
}
}
	if(r3 <1) //_LBB166_268
{
break _41;
}
else{
	r2 = 4;
	r2 = r3 < 4 ? r3 : r2;
	r4 = 1;
	r8 = r2 < 1 ? r4 : r2;
	if(r3 >r8) //_LBB166_215
{
_252: do {
	if(r3 >1) //_LBB166_217
{
	f0 = heapFloat[(fp+-124)];
	r9 = 1;
	r7 = 0;
_254: while(true){
	r10 = sp + -496;
	r11 = r9 << 2;
	r10 = (r10 + r11)|0;
	r10 = r10 >> 2;
	f1 = heapFloat[(r10)];
	r10 = (r9 + 1)|0;
	r7 = f1 > f0 ? r9 : r7;
	f0 = f1 > f0 ? f1 : f0;
	r9 = r10;
if(!(r3 !=r10)) //_LBB166_218
{
break _252;
}
}
}
else{
	r7 = 0;
}
} while(0);
_258: do {
	if(r3 ==1) //_LBB166_224
{
	r9 = r1 >> 2;
	f0 = heapFloat[(fp+-92)];
	f1 = heapFloat[(r9+1)];
__label__ = 214;
break _258;
}
else{
	if(r3 ==2) //_LBB166_225
{
	r9 = r1 >> 2;
	f0 = heapFloat[(fp+-92)];
	f1 = heapFloat[(r9+2)];
	f2 = heapFloat[(r9+1)];
	f12 = heapFloat[(r9+3)];
	f0 = f0+f1;
	f1 = f2+f12;
	f2 = heapFloat[(fp+-187)];
	f0 = f0*f2;
	f1 = f1*f2;
__label__ = 214;
break _258;
}
else{
	r9 = (r3 + -1)|0;
_264: do {
	if(r9 >0) //_LBB166_223
{
	r10 = (r1 + 8)|0;
	f0 =                         0;
	f1 = f0;
	f2 = f0;
_266: while(true){
	r11 = r10 >> 2;
	f3 = heapFloat[(r11+-2)];
	f4 = heapFloat[(r11+1)];
	f5 = heapFloat[(r11)];
	f6 = heapFloat[(r11+-1)];
	f7 = f3*f4;
	f8 = f5*f6;
	f3 = f3+f5;
	f5 = f7-f8;
	f4 = f6+f4;
	f3 = f3*f5;
	f4 = f4*f5;
	r9 = (r9 + -1)|0;
	f2 = f2+f5;
	f1 = f3+f1;
	f0 = f4+f0;
	r10 = (r10 + 8)|0;
if(!(r9 !=0)) //_LBB166_226
{
break _264;
}
}
}
else{
	f0 = f27;
	f1 = f27;
	f2 = f27;
}
} while(0);
	r9 = r3 << 3;
	r9 = (r9 + r1)|0;
	r9 = r9 >> 2;
	r10 = r1 >> 2;
	f3 = heapFloat[(r9+-2)];
	f4 = heapFloat[(r10+1)];
	f5 = heapFloat[(fp+-92)];
	f6 = heapFloat[(r9+-1)];
	f7 = f3*f4;
	f8 = f5*f6;
	f7 = f7-f8;
	f2 = f2+f7;
	if(f2 <f27) //_LBB166_229
{
	f8 = -f2;
}
else{
	f8 = f2;
}
	if(f8 >f20) //_LBB166_232
{
	f8 =                         3;
	f2 = f2*f8;
	f2 = f12/f2;
}
else{
	f2 =        999999984306749440;
}
	if(r3 >0) //_LBB166_235
{
	f3 = f3+f5;
	f4 = f6+f4;
	f3 = f3*f7;
	f4 = f4*f7;
	f1 = f3+f1;
	f3 = f4+f0;
	f0 = f1*f2;
	f1 = f3*f2;
__label__ = 214;
}
else{
	r1 = 0;
__label__ = 219;
}
}
}
} while(0);
if (__label__ == 214){
	r1 = (r1 + 4)|0;
	r9 = sp + -32;
	r10 = r3;
_283: while(true){
	r11 = r1 >> 2;
	f2 = heapFloat[(r11+-1)];
	f3 = heapFloat[(r11)];
	f3 = f3-f1;
	f2 = f2-f0;
	heapFloat[(g0)] = f3;
	heapFloat[(g0+1)] = f2;
	r10 = (r10 + -1)|0;
	r1 = (r1 + 8)|0;
	r11 = (r9 + 4)|0;
	r9 = r9 >> 2;
	atan2f(i7);
	heapFloat[(r9)] = f_g0;
	r9 = r11;
if(!(r10 !=0)) //_LBB166_237
{
break _283;
}
}
	r1 = sp + -64;
	r9 = r3;
_286: while(true){
	r9 = (r9 + -1)|0;
	r10 = (r1 + 4)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = 1;
	r1 = r10;
if(!(r9 !=0)) //_LBB166_239
{
break _286;
}
}
	r1 = 1;
}
	r9 = sp + -64;
	r10 = r7 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	f0 =        6.2831854820251465;
	f1 = r8; //fitos r8, f1
	f1 = f0/f1;
	heap32[(r11)] = 0;
	heap32[(fp+-144)] = r7;
	f6 =                         0;
_290: while(true){
	if(r4 <r8) //_LBB166_242
{
	r11 = sp + -32;
	r13 = (r11 + r10)|0;
	r13 = r13 >> 2;
	f2 = r4; //fitos r4, f2
	f2 = f2*f1;
	f3 = heapFloat[(r13)];
	f2 = f2+f3;
	f3 =        3.1415927410125732;
	if(f2 >f3) //_LBB166_244
{
	f4 =       -6.2831854820251465;
	f2 = f2+f4;
}
	r13 = sp + -576;
	r14 = r4 << 2;
	r13 = (r13 + r14)|0;
	r13 = r13 >> 2;
	r14 = r1 & 1;
	heap32[(r13)] = r7;
	if(r14 ==0) //_LBB166_259
{
__label__ = 233;
break _290;
}
else{
	f4 =                1000000000;
	r14 = 0;
	r15 = r7;
_297: while(true){
	r16 = r14 << 2;
	r17 = (r9 + r16)|0;
	r17 = r17 >> 2;
	r17 = heap32[(r17)];
	if(r17 !=0) //_LBB166_249
{
	r16 = (r11 + r16)|0;
	r16 = r16 >> 2;
	f5 = heapFloat[(r16)];
	f5 = f5-f2;
	if(f5 <f6) //_LBB166_251
{
	f5 = -f5;
}
	if(f5 >f3) //_LBB166_254
{
	f5 = f0-f5;
}
if(!(f5 >=f4)) //_LBB166_248
{
	heap32[(r13)] = r14;
	r15 = r14;
	f4 = f5;
}
}
	r14 = (r14 + 1)|0;
if(!(r3 !=r14)) //_LBB166_247
{
break _297;
}
}
	if(r15 !=r7) //_LBB166_260
{
	r11 = r15 << 2;
	r11 = (r9 + r11)|0;
	r4 = (r4 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = 0;
}
else{
__label__ = 233;
break _290;
}
}
}
else{
__label__ = 236;
break _290;
}
}
switch(__label__ ){//multiple entries
case 233:
	r0 = _2E_str65;
	r1 = _2E_str166;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 248;
	_assert(i7);
break;
case 236:
	if(r8 >0) //_LBB166_267
{
	r1 = 0;
_315: while(true){
	r3 = sp + -576;
	r4 = r1 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = (r3 * 3)|0;
	r4 = r4 << 2;
	r4 = (r6 + r4)|0;
	r4 = r4 >> 2;
	f0 = heapFloat[(r4)];
	f1 = heapFloat[(r0)];
	f0 = f0+f1;
	heapFloat[(fp+-148)] = f0;
	r7 = sp + -592;
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(r0+1)];
	f1 = f1+f2;
	r8 = r7 >> 2;
	heapFloat[(r8+1)] = f1;
	f2 = heapFloat[(r4+2)];
	f3 = heapFloat[(r0+2)];
	f2 = f2+f3;
	r4 = sp + -496;
	r3 = r3 << 2;
	r3 = (r4 + r3)|0;
	r4 = r5 >> 2;
	heapFloat[(r8+2)] = f2;
	r4 = heap32[(r4)];
	r3 = r3 >> 2;
	r8 = sp + -704;
	f3 = heapFloat[(r3)];
	r3 = r4 >> 2;
	r4 = r8 >> 2;
	r3 = heap32[(r3+4)];
	f4 = -f3;
	f5 = heapFloat[(r4+2)];
	if(r12 >3) //_LBB166_265
{
	f6 = heapFloat[(fp+-176)];
	f7 = heapFloat[(r4+1)];
	f8 = f6*f3;
	r4 = sp + -160;
	f9 = f7*f3;
	f0 = f0-f8;
	r7 = r4 >> 2;
	f3 = f5*f3;
	f1 = f1-f9;
	heapFloat[(fp+-40)] = f0;
	f0 = f2-f3;
	heapFloat[(r7+1)] = f1;
	heapFloat[(r7+2)] = f0;
	r8 = sp + -144;
	f0 = -f6;
	heap32[(r7+3)] = 0;
	r7 = r8 >> 2;
	f1 = -f7;
	heapFloat[(fp+-36)] = f0;
	f0 = -f5;
	heapFloat[(r7+1)] = f1;
	heapFloat[(r7+2)] = f0;
	heap32[(r7+3)] = 0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r4;
	heapFloat[(g0+3)] = f4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
else{
	f0 = heapFloat[(r4+1)];
	f1 = heapFloat[(fp+-176)];
	r4 = sp + -176;
	f1 = -f1;
	r8 = r4 >> 2;
	f0 = -f0;
	heapFloat[(fp+-44)] = f1;
	f1 = -f5;
	heapFloat[(r8+1)] = f0;
	heapFloat[(r8+2)] = f1;
	heap32[(r8+3)] = 0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r7;
	heapFloat[(g0+3)] = f4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	r1 = (r1 + 1)|0;
	if(r1 >=r2) //_LBB166_268
{
break _41;
}
else{
continue _315;
}
}
}
else{
break _41;
}
break;
}
}
else{
	if(r12 <4) //_LBB166_212
{
	r1 = (r6 + 8)|0;
	r2 = sp + -496;
_324: while(true){
	r4 = r1 >> 2;
	f12 = heapFloat[(r4+-2)];
	f20 = heapFloat[(r0)];
	f12 = f12+f20;
	heapFloat[(fp+-132)] = f12;
	r6 = sp + -528;
	f12 = heapFloat[(r4+-1)];
	f20 = heapFloat[(r0+1)];
	r7 = r6 >> 2;
	f12 = f12+f20;
	heapFloat[(r7+1)] = f12;
	f12 = heapFloat[(r4)];
	f20 = heapFloat[(r0+2)];
	f12 = f12+f20;
	heapFloat[(r7+2)] = f12;
	r4 = r5 >> 2;
	r4 = heap32[(r4)];
	r7 = sp + -704;
	r7 = r7 >> 2;
	r4 = r4 >> 2;
	r8 = r2 >> 2;
	f12 = heapFloat[(r8)];
	f20 = heapFloat[(r7+2)];
	f27 = heapFloat[(r7+1)];
	f0 = heapFloat[(fp+-176)];
	r4 = heap32[(r4+4)];
	r7 = sp + -208;
	f0 = -f0;
	r8 = r7 >> 2;
	f27 = -f27;
	heapFloat[(fp+-52)] = f0;
	f20 = -f20;
	heapFloat[(r8+1)] = f27;
	heapFloat[(r8+2)] = f20;
	heap32[(r8+3)] = 0;
	f12 = -f12;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r6;
	heapFloat[(g0+3)] = f12;
	r3 = (r3 + -1)|0;
	r2 = (r2 + 4)|0;
	r1 = (r1 + 12)|0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	if(r3 ==0) //_LBB166_268
{
break _41;
}
else{
continue _324;
}
}
}
else{
	r1 = (r6 + 8)|0;
_327: while(true){
	r2 = r7 >> 2;
	r4 = r1 >> 2;
	f12 = heapFloat[(r2)];
	f20 = heapFloat[(fp+-176)];
	f27 = heapFloat[(r4+-2)];
	f0 = heapFloat[(r0)];
	f27 = f27+f0;
	f0 = f20*f12;
	r2 = sp + -704;
	f27 = f27-f0;
	heapFloat[(fp+-136)] = f27;
	r2 = r2 >> 2;
	f27 = heapFloat[(r2+1)];
	f0 = heapFloat[(r4+-1)];
	f1 = heapFloat[(r0+1)];
	r6 = sp + -544;
	f0 = f0+f1;
	f1 = f27*f12;
	r8 = r6 >> 2;
	f0 = f0-f1;
	heapFloat[(r8+1)] = f0;
	f0 = heapFloat[(r2+2)];
	f1 = heapFloat[(r4)];
	f2 = heapFloat[(r0+2)];
	f1 = f1+f2;
	f2 = f0*f12;
	f1 = f1-f2;
	r2 = r5 >> 2;
	heapFloat[(r8+2)] = f1;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	r4 = sp + -192;
	f20 = -f20;
	r8 = r4 >> 2;
	f27 = -f27;
	heapFloat[(fp+-48)] = f20;
	f20 = -f0;
	heapFloat[(r8+1)] = f27;
	heapFloat[(r8+2)] = f20;
	heap32[(r8+3)] = 0;
	f12 = -f12;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r6;
	heapFloat[(g0+3)] = f12;
	r3 = (r3 + -1)|0;
	r7 = (r7 + 4)|0;
	r1 = (r1 + 12)|0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	if(r3 ==0) //_LBB166_268
{
break _41;
}
else{
continue _327;
}
}
}
}
}
}
}
else{
	r0 = sp + -688;
	r2 = r0 >> 2;
	f20 = heapFloat[(fp+-172)];
	f27 = heapFloat[(r2+4)];
	f2 = heapFloat[(r2+5)];
	f3 = heapFloat[(r2+1)];
	f4 = f0*f20;
	f5 = f1*f27;
	f6 = heapFloat[(r2+8)];
	f7 = heapFloat[(r2+9)];
	f8 = heapFloat[(r2+6)];
	f9 = heapFloat[(r2+2)];
	f4 = f4+f5;
	f5 = f19*f6;
	f10 = f0*f3;
	f11 = f1*f2;
	f12 = heapFloat[(r2+10)];
	f4 = f4+f5;
	f5 = f10+f11;
	f10 = f19*f7;
	f11 = f0*f9;
	f13 = f1*f8;
	f14 =                         0;
	f15 =                        -1;
	f16 =                         1;
	f5 = f5+f10;
	f4 = f4 > f14 ? f15 : f16;
	f10 = f11+f13;
	f11 = f19*f12;
	f13 = heapFloat[(fp+-181)];
	f4 = f13*f4;
	f10 = f10+f11;
	f5 = f5 > f14 ? f15 : f16;
	f11 = heapFloat[(fp+-182)];
	f5 = f11*f5;
	r2 = sp + -640;
	f20 = f4*f20;
	f11 = heapFloat[(r1+28)];
	f10 = f10 > f14 ? f15 : f16;
	r3 = r2 >> 2;
	f13 = heapFloat[(fp+-180)];
	f10 = f13*f10;
	f27 = f4*f27;
	f13 = heapFloat[(r1+29)];
	f20 = f11+f20;
	f3 = f5*f3;
	r4 = (r12 + -7)|0;
	f11 = heapFloat[(r3+4)];
	f17 = heapFloat[(fp+-160)];
	f18 = heapFloat[(r3+8)];
	f21 = heapFloat[(r3+5)];
	f22 = heapFloat[(r3+1)];
	f23 = heapFloat[(r3+9)];
	f24 = heapFloat[(r3+6)];
	f25 = heapFloat[(r3+2)];
	f26 = heapFloat[(r3+10)];
	f4 = f4*f6;
	f6 = heapFloat[(r1+30)];
	f27 = f13+f27;
	f2 = f5*f2;
	f20 = f20+f3;
	f3 = f10*f9;
	f9 = heapFloat[(r1+12)];
	heapFloat[(fp+-182)] = f9;
	f9 = heapFloat[(r1+13)];
	heapFloat[(fp+-181)] = f9;
	f9 = heapFloat[(r1+14)];
	heapFloat[(fp+-180)] = f9;
	r3 = (r4 / 3)|0;
	r4 = (r4 % 3)|0;
	r10 = sp + -512;
	f20 = f20+f3;
	f3 = f6+f4;
	f4 = f5*f7;
	f27 = f27+f2;
	f2 = f10*f8;
	r3 = r3 << 2;
	r4 = r4 << 2;
	f27 = f27+f2;
	r12 = r10 >> 2;
	heapFloat[(fp+-128)] = f20;
	f2 = f3+f4;
	f3 = f10*f12;
	r2 = (r2 + r3)|0;
	r0 = (r0 + r4)|0;
	f2 = f2+f3;
	heapFloat[(r12+1)] = f27;
	r2 = r2 >> 2;
	heapFloat[(r12+2)] = f2;
	r0 = r0 >> 2;
	f3 = heapFloat[(r2)];
	f4 = heapFloat[(r0)];
	f5 = heapFloat[(r2+4)];
	f6 = heapFloat[(r0+4)];
	f7 = heapFloat[(r2+8)];
	f8 = heapFloat[(r0+8)];
	f9 = f3*f4;
	f10 = f5*f6;
	f9 = f9+f10;
	f10 = f7*f8;
	f9 = f9+f10;
	f10 = f9*f9;
	f10 = f16-f10;
	f12 =   9.9999997473787516e-005;
	if(f10 >f12) //_LBB166_151
{
	f12 = f0*f17;
	f13 = f1*f11;
	f12 = f12+f13;
	f13 = f19*f18;
	f28 = f0*f22;
	f29 = f1*f21;
	f12 = f12+f13;
	f13 = f28+f29;
	f28 = f19*f23;
	f29 = f0*f25;
	f30 = f1*f24;
	f13 = f13+f28;
	f12 = f12 > f14 ? f16 : f15;
	f28 = f29+f30;
	f29 = f19*f26;
	f30 = heapFloat[(fp+-179)];
	f12 = f30*f12;
	f28 = f28+f29;
	f13 = f13 > f14 ? f16 : f15;
	f29 = heapFloat[(fp+-178)];
	f13 = f29*f13;
	f17 = f12*f17;
	f11 = f12*f11;
	f12 = f12*f18;
	f14 = f28 > f14 ? f16 : f15;
	f15 = heapFloat[(fp+-177)];
	f14 = f15*f14;
	f15 = heapFloat[(fp+-182)];
	f15 = f15+f17;
	f17 = f13*f22;
	f18 = heapFloat[(fp+-181)];
	f11 = f18+f11;
	f18 = f13*f21;
	f21 = heapFloat[(fp+-180)];
	f12 = f21+f12;
	f13 = f13*f23;
	f15 = f15+f17;
	f17 = f14*f25;
	f11 = f11+f18;
	f18 = f14*f24;
	f12 = f12+f13;
	f14 = f14*f26;
	f13 = f15+f17;
	f11 = f11+f18;
	f14 = f12+f14;
	f12 = f20-f13;
	f11 = f27-f11;
	f14 = f2-f14;
	f3 = f3*f12;
	f5 = f5*f11;
	f3 = f3+f5;
	f5 = f7*f14;
	f7 = f4*f12;
	f11 = f6*f11;
	f3 = f3+f5;
	f5 = f7+f11;
	f14 = f8*f14;
	f3 = f9*f3;
	f14 = f5+f14;
	f14 = f3-f14;
	f3 = f16/f10;
	f14 = f14*f3;
}
	f3 = f4*f14;
	f20 = f20+f3;
	f3 = f6*f14;
	f4 = f8*f14;
	f27 = f27+f3;
	heapFloat[(fp+-128)] = f20;
	f20 = f2+f4;
	heapFloat[(r12+1)] = f27;
	r0 = r5 >> 2;
	heapFloat[(r12+2)] = f20;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+4)];
	r2 = sp + -224;
	f0 = -f0;
	r3 = r2 >> 2;
	f1 = -f1;
	heapFloat[(fp+-56)] = f0;
	f0 = -f19;
	heapFloat[(r3+1)] = f1;
	heapFloat[(r3+2)] = f0;
	heap32[(r3+3)] = 0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r10;
	f0 = heapFloat[(fp+-183)];
	heapFloat[(g0+3)] = f0;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
} while(0);
	return;
}