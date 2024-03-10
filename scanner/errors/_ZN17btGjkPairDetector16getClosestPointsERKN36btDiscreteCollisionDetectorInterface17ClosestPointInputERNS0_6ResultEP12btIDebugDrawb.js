function _ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(sp)
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
	i7 = sp + -304;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = sp + -32;
	heap32[(r1+14)] = 0;
	r3 = r2 >> 2;
	heap32[(fp+-8)] = 0;
	heap32[(r3+1)] = 0;
	r4 = heap32[(fp+1)];
	heap32[(r3+2)] = 0;
	r5 = sp + -96;
	r4 = r4 >> 2;
	heap32[(r3+3)] = 0;
	r6 = r5 >> 2;
	heap32[(fp+-24)] = heap32[(r4)];
	heap32[(r6+1)] = heap32[(r4+1)];
	heap32[(r6+2)] = heap32[(r4+2)];
	heap32[(r6+3)] = heap32[(r4+3)];
	heap32[(r6+4)] = heap32[(r4+4)];
	heap32[(r6+5)] = heap32[(r4+5)];
	heap32[(r6+6)] = heap32[(r4+6)];
	heap32[(r6+7)] = heap32[(r4+7)];
	heap32[(r6+8)] = heap32[(r4+8)];
	heap32[(r6+9)] = heap32[(r4+9)];
	heap32[(r6+10)] = heap32[(r4+10)];
	heap32[(r6+11)] = heap32[(r4+11)];
	f0 = heapFloat[(r4+12)];
	f1 = heapFloat[(r4+13)];
	f2 = heapFloat[(r4+14)];
	r7 = sp + -160;
	heap32[(r6+15)] = heap32[(r4+15)];
	r8 = r7 >> 2;
	heap32[(fp+-40)] = heap32[(r4+16)];
	heap32[(r8+1)] = heap32[(r4+17)];
	heap32[(r8+2)] = heap32[(r4+18)];
	heap32[(r8+3)] = heap32[(r4+19)];
	heap32[(r8+4)] = heap32[(r4+20)];
	heap32[(r8+5)] = heap32[(r4+21)];
	heap32[(r8+6)] = heap32[(r4+22)];
	heap32[(r8+7)] = heap32[(r4+23)];
	heap32[(r8+8)] = heap32[(r4+24)];
	heap32[(r8+9)] = heap32[(r4+25)];
	heap32[(r8+10)] = heap32[(r4+26)];
	heap32[(r8+11)] = heap32[(r4+27)];
	f3 = heapFloat[(r4+28)];
	f4 = heapFloat[(r4+29)];
	f5 = heapFloat[(r4+30)];
	f6 = f0+f3;
	f7 =                       0.5;
	f6 = f6*f7;
	f8 = f1+f4;
	f8 = f8*f7;
	f9 = f2+f5;
	f0 = f0-f6;
	heap32[(r8+15)] = heap32[(r4+31)];
	f7 = f9*f7;
	f1 = f1-f8;
	heapFloat[(r6+12)] = f0;
	f0 = f2-f7;
	heapFloat[(r6+13)] = f1;
	f1 = f3-f6;
	heapFloat[(r6+14)] = f0;
	f0 = f4-f8;
	heapFloat[(r8+12)] = f1;
	f1 = f5-f7;
	heapFloat[(r8+13)] = f0;
	heapFloat[(r8+14)] = f1;
	r9 = heap32[(r1+7)];
	r9 = r9 >> 2;
	r10 = heap32[(fp+2)];
	r11 = heap32[(fp+3)];
	r9 = heap32[(r9+1)];
	r9 = (r9 + -17)|0;
	if(uint(r9) >uint(1)) //_LBB556_3
{
__label__ = 3;
}
else{
	r9 = heap32[(r1+8)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+1)];
	r9 = (r9 + -17)|0;
	if(uint(r9) >uint(1)) //_LBB556_3
{
__label__ = 3;
}
else{
	r9 = (r0 + 32)|0;
	r12 = 0;
__label__ = 4;
}
}
if (__label__ == 3){
	r9 = (r0 + 32)|0;
	r12 = 1;
}
	r13 = gNumGjkChecks;
	r13 = r13 >> 2;
	r14 = heap32[(r13)];
	f0 = heapFloat[(r1+11)];
	f1 = heapFloat[(r1+12)];
	r14 = (r14 + 1)|0;
	heap32[(r13)] = r14;
	r13 = heapU8[r0+52];
	heap32[(r1+16)] = 0;
	heap32[(r1+1)] = 0;
	heap32[(r1+2)] = 1065353216;
	heap32[(r1+3)] = 0;
	heap32[(r1+4)] = 0;
	heap32[(r1+17)] = 0;
	heap32[(r1+15)] = -1;
	r14 = heap32[(r1+6)];
	r15 = 0;
	r16 = r14 >> 2;
	heap8[r14+312] = r15;
	r17 = 1;
	heap32[(r16)] = 0;
	heap8[r14+356] = r17;
	heap32[(r16+73)] = 1566444395;
	heap32[(r16+74)] = 1566444395;
	heap32[(r16+75)] = 1566444395;
	heap32[(r16+76)] = 0;
	heap8[r14+352] = r15;
	heap32[(r16+84)] = 0;
	heap32[(r16+85)] = 0;
	heap32[(r16+86)] = 0;
	heap32[(r16+87)] = 0;
	r16 = heapU8[r14+332];
	f2 =                         0;
	r16 = r16 & 240;
	heap8[r14+332] = r16;
	f1 = r13 == r15 ? f1 : f2;
	f0 = r13 == r15 ? f0 : f2;
	f0 = f0+f1;
	f3 = heapFloat[(r1+3)];
	f4 = heapFloat[(r1+2)];
	f5 = heapFloat[(r1+1)];
	f9 =        999999984306749440;
_7: while(true){
	f10 = -f5;
	f11 = heapFloat[(r4)];
	f12 = heapFloat[(r4+4)];
	f13 = heapFloat[(r4+1)];
	f14 = heapFloat[(r4+5)];
	f11 = f11*f10;
	f12 = f12*f4;
	f15 = heapFloat[(r4+8)];
	f16 = heapFloat[(r4+2)];
	f17 = heapFloat[(r4+6)];
	f18 = heapFloat[(r4+10)];
	f19 = heapFloat[(r4+9)];
	f13 = f13*f10;
	f14 = f14*f4;
	f11 = f11-f12;
	f12 = f15*f3;
	r13 = sp + -176;
	f10 = f16*f10;
	f15 = f17*f4;
	f13 = f13-f14;
	f14 = f19*f3;
	f11 = f11-f12;
	r14 = r13 >> 2;
	f10 = f10-f15;
	f12 = f18*f3;
	f13 = f13-f14;
	heapFloat[(fp+-44)] = f11;
	f10 = f10-f12;
	heapFloat[(r14+1)] = f13;
	heapFloat[(r14+2)] = f10;
	heap32[(r14+3)] = 0;
	f10 = heapFloat[(r4+16)];
	f11 = heapFloat[(r4+20)];
	f12 = heapFloat[(r4+17)];
	f13 = heapFloat[(r4+21)];
	f14 = heapFloat[(r4+24)];
	f10 = f10*f5;
	f11 = f11*f4;
	f15 = heapFloat[(r4+18)];
	f16 = heapFloat[(r4+22)];
	f17 = heapFloat[(r4+26)];
	f18 = heapFloat[(r4+25)];
	f12 = f12*f5;
	f13 = f13*f4;
	f10 = f10+f11;
	f11 = f14*f3;
	r14 = sp + -192;
	f5 = f15*f5;
	f4 = f16*f4;
	f12 = f12+f13;
	f13 = f18*f3;
	f10 = f10+f11;
	r16 = r14 >> 2;
	f4 = f5+f4;
	f3 = f17*f3;
	f5 = f12+f13;
	heapFloat[(fp+-48)] = f10;
	f3 = f4+f3;
	heapFloat[(r16+1)] = f5;
	heapFloat[(r16+2)] = f3;
	heap32[(r16+3)] = 0;
	r16 = heap32[(r1+7)];
	r18 = sp + -208;
	heap32[(g0)] = r18;
	heap32[(g0+1)] = r16;
	heap32[(g0+2)] = r13;
	r13 = r9 >> 2;
	_ZNK13btConvexShape44localGetSupportVertexWithoutMarginNonVirtualERK9btVector3(i7);
	r16 = heap32[(r13)];
	r19 = sp + -224;
	heap32[(g0)] = r19;
	heap32[(g0+1)] = r16;
	heap32[(g0+2)] = r14;
	_ZNK13btConvexShape44localGetSupportVertexWithoutMarginNonVirtualERK9btVector3(i7);
	r14 = r18 >> 2;
	r16 = r19 >> 2;
	f3 = heapFloat[(r6+8)];
	f4 = heapFloat[(fp+-52)];
	f5 = heapFloat[(r6+4)];
	f10 = heapFloat[(fp+-24)];
	f11 = heapFloat[(r6+9)];
	f12 = heapFloat[(r14+1)];
	f13 = heapFloat[(r6+5)];
	f14 = heapFloat[(r6+1)];
	f15 = heapFloat[(r8+8)];
	f16 = heapFloat[(fp+-56)];
	f17 = heapFloat[(r8+4)];
	f18 = heapFloat[(fp+-40)];
	f19 = heapFloat[(r8+9)];
	f20 = heapFloat[(r16+1)];
	f21 = heapFloat[(r8+5)];
	f22 = heapFloat[(r8+1)];
	f3 = f3*f4;
	f11 = f11*f12;
	f23 = heapFloat[(r6+10)];
	f24 = heapFloat[(r14+2)];
	f25 = heapFloat[(r6+6)];
	f26 = heapFloat[(r6+2)];
	f15 = f15*f16;
	f19 = f19*f20;
	f27 = heapFloat[(r8+10)];
	f28 = heapFloat[(r16+2)];
	f29 = heapFloat[(r8+6)];
	f30 = heapFloat[(r8+2)];
	f5 = f5*f4;
	f13 = f13*f12;
	f17 = f17*f16;
	f21 = f21*f20;
	f4 = f10*f4;
	f10 = f14*f12;
	f12 = f18*f16;
	f14 = f22*f20;
	f3 = f3+f11;
	f11 = f23*f24;
	f15 = f15+f19;
	f16 = f27*f28;
	f5 = f5+f13;
	f13 = f25*f24;
	f17 = f17+f21;
	f18 = f29*f28;
	f4 = f4+f10;
	f10 = f26*f24;
	f12 = f12+f14;
	f14 = f30*f28;
	f3 = f3+f11;
	f11 = heapFloat[(r6+14)];
	f15 = f15+f16;
	f16 = heapFloat[(r8+14)];
	f5 = f5+f13;
	f13 = heapFloat[(r6+13)];
	f17 = f17+f18;
	f18 = heapFloat[(r8+13)];
	f4 = f4+f10;
	f10 = heapFloat[(r6+12)];
	f12 = f12+f14;
	f14 = heapFloat[(r8+12)];
	f5 = f5+f13;
	f13 = f17+f18;
	f4 = f4+f10;
	f10 = f12+f14;
	f3 = f3+f11;
	f11 = f15+f16;
	f3 = r12 != r15 ? f3 : f2;
	f11 = r12 != r15 ? f11 : f2;
	f12 = f5-f13;
	f14 = heapFloat[(r1+2)];
	f15 = f4-f10;
	f16 = heapFloat[(r1+1)];
	f17 = f3-f11;
	f18 = heapFloat[(r1+3)];
	f16 = f16*f15;
	f14 = f14*f12;
	f14 = f16+f14;
	f16 = f18*f17;
	f14 = f14+f16;
if(!(f14 <=f2)) //_LBB556_8
{
	f16 = heapFloat[(r4+32)];
	f18 = f14*f14;
	f16 = f16*f9;
if(!(f18 <=f16)) //_LBB556_8
{
__label__ = 7;
break _7;
}
}
	r14 = heap32[(r1+6)];
	r16 = r14 >> 2;
	r18 = heap32[(r16)];
_12: do {
	if(r18 >0) //_LBB556_10
{
	r19 = -12;
	f16 = heapFloat[(r16+77)];
	r20 = (r19 - r14)|0;
	r21 = 0;
	r22 = r18;
	r19 = r21;
_14: while(true){
	r23 = -8;
	r24 = -4;
	r23 = (r23 - r20)|0;
	r24 = (r24 - r20)|0;
	r23 = r23 >> 2;
	r24 = r24 >> 2;
	r25 = (r21 - r20)|0;
	r25 = r25 >> 2;
	f18 = heapFloat[(r23)];
	f19 = heapFloat[(r24)];
	f18 = f15-f18;
	f19 = f12-f19;
	f20 = heapFloat[(r25)];
	f20 = f17-f20;
	f18 = f18*f18;
	f19 = f19*f19;
	f18 = f18+f19;
	f19 = f20*f20;
	f18 = f18+f19;
	r22 = (r22 + -1)|0;
	r19 = f18 > f16 ? r19 : r17;
	r20 = (r20 + -16)|0;
	if(r22 !=0) //_LBB556_11
{
continue _14;
}
else{
break _12;
}
}
}
else{
	r19 = r15;
}
} while(0);
	f16 = heapFloat[(r16+76)];
	if(f16 ==f2) //_LBB556_14
{
	f16 = heapFloat[(r16+75)];
if(!(f17 !=f16)) //_LBB556_13
{
	f16 = heapFloat[(r16+74)];
if(!(f12 !=f16)) //_LBB556_13
{
	f16 = heapFloat[(r16+73)];
	r19 = f15 != f16 ? r19 : r17;
}
}
}
	r19 = r19 & 255;
	if(r19 ==0) //_LBB556_19
{
	f14 = f9-f14;
	f16 =   9.9999999747524271e-007;
	f18 = f9*f16;
	if(f14 >f18) //_LBB556_21
{
	heapFloat[(r16+73)] = f15;
	heapFloat[(r16+74)] = f12;
	r18 = r18 << 4;
	heapFloat[(r16+75)] = f17;
	r18 = (r14 + r18)|0;
	heap32[(r16+76)] = 0;
	r18 = r18 >> 2;
	heap8[r14+356] = r17;
	heapFloat[(r18+1)] = f15;
	heapFloat[(r18+2)] = f12;
	heapFloat[(r18+3)] = f17;
	heap32[(r18+4)] = 0;
	r18 = heap32[(r16)];
	r18 = r18 << 4;
	r18 = (r14 + r18)|0;
	r18 = r18 >> 2;
	heapFloat[(r18+21)] = f4;
	heapFloat[(r18+22)] = f5;
	heapFloat[(r18+23)] = f3;
	heap32[(r18+24)] = 0;
	r18 = heap32[(r16)];
	r18 = r18 << 4;
	r14 = (r14 + r18)|0;
	r14 = r14 >> 2;
	heapFloat[(r14+41)] = f10;
	heapFloat[(r14+42)] = f13;
	heapFloat[(r14+43)] = f11;
	heap32[(r14+44)] = 0;
	r14 = heap32[(r16)];
	r14 = (r14 + 1)|0;
	heap32[(r16)] = r14;
	r14 = heap32[(r1+6)];
	heap32[(g0)] = r14;
	_ZN22btVoronoiSimplexSolver28updateClosestVectorAndPointsEv(i7);
	r16 = r_g0;
	if(r16 !=0) //_LBB556_23
{
	r14 = r14 >> 2;
	f5 = heapFloat[(r14+69)];
	f4 = heapFloat[(r14+70)];
	f3 = heapFloat[(r14+71)];
	f10 = heapFloat[(r14+72)];
	heapFloat[(r1+1)] = f5;
	f11 = f5*f5;
	f12 = f4*f4;
	heapFloat[(r1+2)] = f4;
	f11 = f11+f12;
	f12 = f3*f3;
	f11 = f11+f12;
	heapFloat[(r1+3)] = f3;
	heapFloat[(r1+4)] = f10;
	if(f11 >=f16) //_LBB556_25
{
	f10 =   1.1920928955078125e-007;
	f12 = f9-f11;
	f9 = f9*f10;
	if(f12 >f9) //_LBB556_27
{
	r14 = heap32[(r1+16)];
	r16 = (r14 + 1)|0;
	heap32[(r1+16)] = r16;
	if(r14 <1001) //_LBB556_29
{
	r14 = heap32[(r1+6)];
	r14 = r14 >> 2;
	r16 = heap32[(r14)];
	f9 = f11;
	if(r16 !=4) //_LBB556_5
{
continue _7;
}
else{
__label__ = 29;
break _7;
}
}
else{
__label__ = 27;
break _7;
}
}
else{
__label__ = 25;
break _7;
}
}
else{
__label__ = 23;
break _7;
}
}
else{
__label__ = 21;
break _7;
}
}
else{
__label__ = 19;
break _7;
}
}
else{
__label__ = 17;
break _7;
}
}
_29: do {
switch(__label__ ){//multiple entries
case 7:
	heap32[(r1+17)] = 10;
__label__ = 30;
break _29;
break;
case 29:
	heap32[(r1+1)] = heap32[(r14+69)];
	heap32[(r1+2)] = heap32[(r14+70)];
	heap32[(r1+3)] = heap32[(r14+71)];
	r17 = 0;
	heap32[(r1+4)] = heap32[(r14+72)];
	heap32[(r1+17)] = 13;
__label__ = 37;
break _29;
break;
case 27:
	r6 = _2E_str425;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r16;
	printf(i7);
	r6 = heap32[(r13)];
	r8 = heap32[(r1+7)];
	r6 = r6 >> 2;
	r8 = r8 >> 2;
	f2 = heapFloat[(r1+3)];
	f3 = heapFloat[(r1+2)];
	f4 = heapFloat[(r1+1)];
	r6 = heap32[(r6+1)];
	r8 = heap32[(r8+1)];
	r9 = _2E_str1426;
	f4 = f4; //fstod f4, f4
	f3 = f3; //fstod f3, f3
	f2 = f2; //fstod f2, f2
	f5 = f11; //fstod f11, f5
	heap32[(g0)] = r9;
	llvm_writeDouble((i7+8),f4);
	llvm_writeDouble((i7+16),f3);
	llvm_writeDouble((i7+24),f2);
	llvm_writeDouble((i7+32),f5);
	heap32[(g0+10)] = r8;
	heap32[(g0+11)] = r6;
	f2 =                         0;
	r17 = 0;
	printf(i7);
__label__ = 37;
break _29;
break;
case 25:
	r6 = heap32[(r1+6)];
	r6 = r6 >> 2;
	heap32[(r1+1)] = heap32[(r6+69)];
	heap32[(r1+2)] = heap32[(r6+70)];
	heap32[(r1+3)] = heap32[(r6+71)];
	heap32[(r1+4)] = heap32[(r6+72)];
	heap32[(r1+17)] = 12;
	f9 = f11;
__label__ = 30;
break _29;
break;
case 23:
	heap32[(r1+17)] = 6;
__label__ = 30;
break _29;
break;
case 21:
	heap32[(r1+17)] = 3;
__label__ = 30;
break _29;
break;
case 19:
	r6 = 11;
	r8 = 2;
	r6 = f14 > f2 ? r6 : r8;
	heap32[(r1+17)] = r6;
__label__ = 30;
break _29;
break;
case 17:
	heap32[(r1+17)] = 1;
__label__ = 30;
break;
}
} while(0);
if (__label__ == 30){
	r6 = heap32[(r1+6)];
	heap32[(g0)] = r6;
	r6 = r6 >> 2;
	_ZN22btVoronoiSimplexSolver28updateClosestVectorAndPointsEv(i7);
	f3 = heapFloat[(r6+65)];
	f2 = heapFloat[(r6+61)];
	f4 = heapFloat[(r6+66)];
	f5 = heapFloat[(r6+62)];
	f10 = heapFloat[(r6+67)];
	f11 = heapFloat[(r6+63)];
	f2 = f2-f3;
	f5 = f5-f4;
	heapFloat[(fp+-8)] = f2;
	f2 = f11-f10;
	heapFloat[(r3+1)] = f5;
	heapFloat[(r3+2)] = f2;
	heap32[(r3+3)] = 0;
	f2 = heapFloat[(r1+1)];
	f5 = heapFloat[(r1+2)];
	f11 = heapFloat[(r1+3)];
	f2 = f2*f2;
	f5 = f5*f5;
	f2 = f2+f5;
	f5 = f11*f11;
	f2 = f2+f5;
	f5 = f2; //fstod f2, f5
	f11 =                    0.0001;
if(!(f5 >=f11)) //_LBB556_33
{
	heap32[(r1+17)] = 5;
}
	f5 =   1.4210854715202004e-014;
	if(f2 <=f5) //_LBB556_37
{
	f2 =                         0;
	r17 = 0;
	heap32[(r1+15)] = 2;
}
else{
	heapFloat[(g0)] = f2;
	sqrtf(i7);
	f5 =                         1;
	f2 = f5/f_g0;
	f11 = heapFloat[(fp+-8)];
	f11 = f11*f2;
	heapFloat[(fp+-8)] = f11;
	f11 = heapFloat[(r3+1)];
	f11 = f11*f2;
	heapFloat[(r3+1)] = f11;
	f11 = heapFloat[(r3+2)];
	f11 = f11*f2;
	heapFloat[(r3+2)] = f11;
	heapFloat[(g0)] = f9;
	sqrtf(i7);
	f9 = f_g0;
	f11 =                         0;
	if(f9 >f11) //_LBB556_36
{
	f9 = f1/f9;
	f11 = heapFloat[(r1+3)];
	f12 = heapFloat[(r1+2)];
	f13 = heapFloat[(r1+1)];
	f13 = f13*f9;
	f12 = f12*f9;
	f9 = f11*f9;
	f2 = f5/f2;
	f3 = f3+f13;
	f4 = f4+f12;
	f10 = f10+f9;
	f2 = f2-f0;
	heap32[(r1+15)] = 1;
}
else{
	r0 = _2E_str2427;
	r1 = _2E_str3428;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 320;
	_assert(i7);
}
}
}
	r6 = heap32[(r1+18)];
	if(r6 ==0) //_LBB556_45
{
__label__ = 42;
}
else{
	r6 = heap32[(r1+5)];
	if(r6 ==0) //_LBB556_45
{
__label__ = 42;
}
else{
	r8 = heap32[(r1+17)];
	if(r8 ==0) //_LBB556_45
{
__label__ = 42;
}
else{
	f5 = f2+f0;
	f5 = f5; //fstod f5, f5
	f9 =                      0.01;
	if(f5 <f9) //_LBB556_43
{
__label__ = 44;
}
else{
	r8 = r17 & 255;
	if(r8 ==1) //_LBB556_44
{
__label__ = 60;
}
else{
__label__ = 44;
}
}
}
}
}
if (__label__ == 42){
	r6 = r17 & 255;
	if(r6 ==1) //_LBB556_44
{
__label__ = 60;
}
else{
	r6 = heap32[(r1+5)];
	if(r6 ==0) //_LBB556_62
{
__label__ = 59;
}
else{
__label__ = 44;
}
}
}
_58: do {
if (__label__ == 44){
	r8 = gNumDeepPenetrationChecks;
	r8 = r8 >> 2;
	r9 = heap32[(r8)];
	r9 = (r9 + 1)|0;
	heap32[(r8)] = r9;
	heap32[(r1+1)] = 0;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 0;
	heap32[(r1+4)] = 0;
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r9 = heap32[(r4+33)];
	r12 = heap32[(r13)];
	r13 = heap32[(r1+7)];
	r14 = heap32[(r1+6)];
	r0 = (r0 + 4)|0;
	r15 = sp + -240;
	r16 = sp + -256;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r14;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = r5;
	heap32[(g0+5)] = r7;
	heap32[(g0+6)] = r0;
	heap32[(g0+7)] = r15;
	heap32[(g0+8)] = r16;
	heap32[(g0+9)] = r11;
	heap32[(g0+10)] = r9;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB556_57
{
	f5 = heapFloat[(r1+1)];
	f9 = heapFloat[(r1+2)];
	f11 = heapFloat[(r1+3)];
	f5 = f5*f5;
	f9 = f9*f9;
	f5 = f5+f9;
	f9 = f11*f11;
	f5 = f5+f9;
	f9 =                         0;
	if(f5 <=f9) //_LBB556_62
{
__label__ = 59;
break _58;
}
else{
	r0 = r15 >> 2;
	r5 = r16 >> 2;
	f5 = heapFloat[(r0+1)];
	f9 = heapFloat[(r5+1)];
	f11 = heapFloat[(fp+-60)];
	f12 = heapFloat[(fp+-64)];
	f11 = f11-f12;
	f5 = f5-f9;
	f9 = heapFloat[(r0+2)];
	f12 = heapFloat[(r5+2)];
	f9 = f9-f12;
	f11 = f11*f11;
	f5 = f5*f5;
	f5 = f11+f5;
	f9 = f9*f9;
	f5 = f5+f9;
	heapFloat[(g0)] = f5;
	sqrtf(i7);
	f0 = f_g0-f0;
	r0 = r17 & 255;
if(!(r0 !=1)) //_LBB556_60
{
	if(f0 >=f2) //_LBB556_61
{
	heap32[(r1+15)] = 5;
__label__ = 59;
break _58;
}
}
	f2 = heapFloat[(r1+1)];
	f3 = heapFloat[(r1+2)];
	f4 = heapFloat[(r1+3)];
	f10 = heapFloat[(fp+-64)];
	f5 = heapFloat[(r5+1)];
	f9 = heapFloat[(r5+2)];
	heapFloat[(fp+-8)] = f2;
	heapFloat[(r3+1)] = f3;
	heapFloat[(r3+2)] = f4;
	f11 = f2*f2;
	f12 = f3*f3;
	heap32[(r3+3)] = heap32[(r1+4)];
	f11 = f11+f12;
	f12 = f4*f4;
	f11 = f11+f12;
	heapFloat[(g0)] = f11;
	sqrtf(i7);
	f12 =                         1;
	f11 = f12/f_g0;
	f12 = heapFloat[(fp+-8)];
	f12 = f12*f11;
	heapFloat[(fp+-8)] = f12;
	f12 = heapFloat[(r3+1)];
	f12 = f12*f11;
	heapFloat[(r3+1)] = f12;
	f12 = heapFloat[(r3+2)];
	f2 = f2*f1;
	f13 = f3*f1;
	f1 = f4*f1;
	f11 = f12*f11;
	f3 = f10+f2;
	f4 = f5+f13;
	f10 = f9+f1;
	heapFloat[(r3+2)] = f11;
	heap32[(r1+15)] = 6;
	f2 = f0;
__label__ = 60;
break _58;
}
}
else{
	r16 = r16 >> 2;
	r15 = r15 >> 2;
	f0 = heapFloat[(r16+1)];
	f1 = heapFloat[(r15+1)];
	f5 = heapFloat[(fp+-64)];
	f9 = heapFloat[(fp+-60)];
	f0 = f0-f1;
	f1 = f5-f9;
	f5 = heapFloat[(r16+2)];
	f9 = heapFloat[(r15+2)];
	f5 = f5-f9;
	f9 = f1*f1;
	f11 = f0*f0;
	f9 = f9+f11;
	f11 = f5*f5;
	f9 = f9+f11;
	f11 =   1.4210854715202004e-014;
	if(f9 <=f11) //_LBB556_50
{
	f1 = heapFloat[(r1+1)];
	f0 = heapFloat[(r1+2)];
	f5 = heapFloat[(r1+3)];
	f9 = f1*f1;
	f12 = f0*f0;
	f9 = f9+f12;
	f13 = f5*f5;
	f12 = heapFloat[(r1+4)];
	f9 = f9+f13;
}
else{
	f12 =                         0;
}
	if(f9 <=f11) //_LBB556_56
{
	heap32[(r1+15)] = 9;
__label__ = 59;
break _58;
}
else{
	heapFloat[(g0)] = f9;
	sqrtf(i7);
	f9 = f_g0;
	f11 = heapFloat[(r15+1)];
	f13 = heapFloat[(r16+1)];
	f14 = heapFloat[(fp+-60)];
	f15 = heapFloat[(fp+-64)];
	f14 = f14-f15;
	f11 = f11-f13;
	f13 = heapFloat[(r15+2)];
	f15 = heapFloat[(r16+2)];
	f13 = f13-f15;
	f14 = f14*f14;
	f11 = f11*f11;
	f11 = f14+f11;
	f13 = f13*f13;
	f11 = f11+f13;
	heapFloat[(g0)] = f11;
	sqrtf(i7);
	f11 = -f_g0;
	r15 = r17 & 255;
if(!(r15 !=1)) //_LBB556_54
{
	if(f2 <=f11) //_LBB556_55
{
	heap32[(r1+15)] = 8;
__label__ = 59;
break _58;
}
}
	f2 =                         1;
	f2 = f2/f9;
	f3 = heapFloat[(fp+-64)];
	f4 = heapFloat[(r16+1)];
	f10 = heapFloat[(r16+2)];
	f1 = f1*f2;
	f0 = f0*f2;
	heapFloat[(fp+-8)] = f1;
	f1 = f5*f2;
	heapFloat[(r3+1)] = f0;
	heapFloat[(r3+2)] = f1;
	heapFloat[(r3+3)] = f12;
	heap32[(r1+15)] = 3;
	f2 = f11;
__label__ = 60;
}
}
}
} while(0);
if (__label__ == 59){
	r0 = r17 & 255;
	if(r0 ==0) //_LBB556_66
{
__label__ = 63;
}
else{
__label__ = 60;
}
}
_81: do {
if (__label__ == 60){
	f0 =                         0;
if(!(f2 <f0)) //_LBB556_65
{
	f0 = f2*f2;
	f1 = heapFloat[(r4+32)];
	if(f0 >=f1) //_LBB556_66
{
break _81;
}
}
	heap32[(r1+1)] = heap32[(fp+-8)];
	heap32[(r1+2)] = heap32[(r3+1)];
	heap32[(r1+3)] = heap32[(r3+2)];
	heap32[(r1+4)] = heap32[(r3+3)];
	r0 = r10 >> 2;
	heapFloat[(r1+14)] = f2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+4)];
	r1 = sp + -16;
	f0 = f3+f6;
	r3 = r1 >> 2;
	f1 = f4+f8;
	heapFloat[(fp+-4)] = f0;
	f0 = f10+f7;
	heapFloat[(r3+1)] = f1;
	heapFloat[(r3+2)] = f0;
	heap32[(r3+3)] = 0;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	heapFloat[(g0+3)] = f2;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
} while(0);
	return;
}