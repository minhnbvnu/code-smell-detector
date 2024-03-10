function _ZN12gjkepa2_impl3GJK8EvaluateERKNS_13MinkowskiDiffERK9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + -240;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = (r0 + 220)|0;
	r3 = (r0 + 252)|0;
	heap32[(r1+87)] = r2;
	r2 = (r0 + 284)|0;
	heap32[(r1+88)] = r3;
	r3 = (r0 + 316)|0;
	heap32[(r1+89)] = r2;
	heap32[(r1+90)] = r3;
	heap32[(r1+91)] = 4;
	r2 = heap32[(fp+1)];
	heap32[(r1+92)] = 0;
	r2 = r2 >> 2;
	heap32[(r1+94)] = 0;
	r4 = heap32[(r2+1)];
	r5 = heap32[(r2)];
	heap32[(r1)] = r5;
	heap32[(r1+1)] = r4;
	heap32[(r1+2)] = heap32[(r2+2)];
	heap32[(r1+3)] = heap32[(r2+3)];
	heap32[(r1+4)] = heap32[(r2+4)];
	heap32[(r1+5)] = heap32[(r2+5)];
	heap32[(r1+6)] = heap32[(r2+6)];
	heap32[(r1+7)] = heap32[(r2+7)];
	heap32[(r1+8)] = heap32[(r2+8)];
	heap32[(r1+9)] = heap32[(r2+9)];
	heap32[(r1+10)] = heap32[(r2+10)];
	heap32[(r1+11)] = heap32[(r2+11)];
	heap32[(r1+12)] = heap32[(r2+12)];
	heap32[(r1+13)] = heap32[(r2+13)];
	heap32[(r1+14)] = heap32[(r2+14)];
	heap32[(r1+15)] = heap32[(r2+15)];
	heap32[(r1+16)] = heap32[(r2+16)];
	heap32[(r1+17)] = heap32[(r2+17)];
	heap32[(r1+18)] = heap32[(r2+18)];
	heap32[(r1+19)] = heap32[(r2+19)];
	heap32[(r1+20)] = heap32[(r2+20)];
	heap32[(r1+21)] = heap32[(r2+21)];
	heap32[(r1+22)] = heap32[(r2+22)];
	heap32[(r1+23)] = heap32[(r2+23)];
	heap32[(r1+24)] = heap32[(r2+24)];
	heap32[(r1+25)] = heap32[(r2+25)];
	heap32[(r1+26)] = heap32[(r2+26)];
	heap32[(r1+27)] = heap32[(r2+27)];
	heap32[(r1+28)] = heap32[(r2+28)];
	heap32[(r1+29)] = heap32[(r2+29)];
	r4 = heap32[(r2+31)];
	r2 = heap32[(r2+30)];
	heap32[(r1+30)] = r2;
	heap32[(r1+31)] = r4;
	r2 = heap32[(fp+2)];
	heap32[(r1+36)] = 0;
	r2 = r2 >> 2;
	heap32[(r1+45)] = 0;
	f0 = heapFloat[(r2)];
	heapFloat[(r1+32)] = f0;
	f1 = heapFloat[(r2+1)];
	heapFloat[(r1+33)] = f1;
	f2 = heapFloat[(r2+2)];
	f3 = f0*f0;
	f4 = f1*f1;
	f3 = f3+f4;
	f4 = f2*f2;
	f3 = f3+f4;
	heapFloat[(r1+34)] = f2;
	heap32[(r1+35)] = heap32[(r2+3)];
	f4 =                         0;
	if(f3 <=f4) //_LBB546_2
{
	r2 = sp + -112;
	r2 = r2 >> 2;
	heap32[(fp+-28)] = 1065353216;
	heap32[(r2+1)] = 0;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
}
else{
	r2 = sp + -112;
	f0 = -f0;
	r2 = r2 >> 2;
	f1 = -f1;
	heapFloat[(fp+-28)] = f0;
	f0 = -f2;
	heapFloat[(r2+1)] = f1;
	heapFloat[(r2+2)] = f0;
	heap32[(r2+3)] = 0;
}
	heap32[(r1+41)] = 0;
	heap32[(r1+91)] = 3;
	heap32[(r1+37)] = r3;
	heap32[(r1+45)] = 1;
	r2 = sp + -112;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(r1+41)] = 1065353216;
	r2 = heap32[(r1+37)];
	r2 = r2 >> 2;
	f0 = heapFloat[(r2+4)];
	heapFloat[(r1+32)] = f0;
	f1 = heapFloat[(r2+5)];
	heapFloat[(r1+33)] = f1;
	f2 = heapFloat[(r2+6)];
	heapFloat[(r1+34)] = f2;
	f5 = heapFloat[(r2+7)];
	r2 = sp + -176;
	r3 = r2 >> 2;
	heapFloat[(r1+35)] = f5;
	heapFloat[(r3+12)] = f0;
	heapFloat[(r3+13)] = f1;
	heapFloat[(r3+14)] = f2;
	heapFloat[(r3+15)] = f5;
	heapFloat[(r3+8)] = f0;
	heapFloat[(r3+9)] = f1;
	heapFloat[(r3+10)] = f2;
	heapFloat[(r3+11)] = f5;
	heapFloat[(r3+4)] = f0;
	heapFloat[(r3+5)] = f1;
	heapFloat[(r3+6)] = f2;
	heapFloat[(r3+7)] = f5;
	heapFloat[(fp+-44)] = f0;
	heapFloat[(r3+1)] = f1;
	r4 = (r0 + 148)|0;
	heap32[(fp+-52)] = r4;
	r4 = 0;
	r5 = 1;
	heap32[(fp+-53)] = r5;
	heapFloat[(r3+2)] = f2;
	heapFloat[(r3+3)] = f5;
	heap32[(fp+-50)] = r5;
	r24 = 0;
_5: while(true){
	f0 = f0*f0;
	f1 = f1*f1;
	r3 = heap32[(r1+92)];
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f1 =   9.9999997473787516e-005;
	if(f0 >=f1) //_LBB546_6
{
	r5 = heap32[(fp+-53)];
	r5 = (r5 - r3)|0;
	heap32[(fp+-51)] = r5;
	f2 = heapFloat[(r1+34)];
	f5 = heapFloat[(r1+33)];
	f6 = heapFloat[(r1+32)];
	r5 = sp + -96;
	f6 = -f6;
	r6 = r5 >> 2;
	f5 = -f5;
	heapFloat[(fp+-24)] = f6;
	r3 = (r3 * 36)|0;
	f2 = -f2;
	heapFloat[(r6+1)] = f5;
	r7 = (r0 + r3)|0;
	heapFloat[(r6+2)] = f2;
	heap32[(r6+3)] = 0;
	r6 = r7 >> 2;
	r8 = heap32[(r6+45)];
	r8 = r8 << 2;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	heap32[(r8+41)] = 0;
	r8 = heap32[(r1+91)];
	r8 = (r8 + -1)|0;
	r9 = heap32[(r6+45)];
	r10 = r8 << 2;
	r10 = (r0 + r10)|0;
	r9 = r9 << 2;
	r7 = (r7 + 148)|0;
	r9 = (r7 + r9)|0;
	r10 = r10 >> 2;
	heap32[(r1+91)] = r8;
	r8 = r9 >> 2;
	r9 = heap32[(r10+87)];
	heap32[(r8)] = r9;
	r8 = heap32[(r6+45)];
	r9 = r8 << 2;
	r9 = (r7 + r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r8 = (r8 + 1)|0;
	heap32[(r6+45)] = r8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r9;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	r5 = heap32[(r6+45)];
	r8 = r5 << 2;
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7+-1)];
	r8 = 0;
_8: while(true){
	if(uint(r8) <uint(4)) //_LBB546_7
{
	r9 = r8 << 4;
	r9 = (r2 + r9)|0;
	r10 = r7 >> 2;
	r9 = r9 >> 2;
	f2 = heapFloat[(r10+4)];
	f5 = heapFloat[(r9)];
	f6 = heapFloat[(r10+5)];
	f7 = heapFloat[(r9+1)];
	f2 = f2-f5;
	f5 = f6-f7;
	f6 = heapFloat[(r10+6)];
	f7 = heapFloat[(r9+2)];
	f6 = f6-f7;
	f2 = f2*f2;
	f5 = f5*f5;
	f2 = f2+f5;
	f5 = f6*f6;
	f2 = f2+f5;
	if(f2 <f1) //_LBB546_10
{
__label__ = 10;
break _5;
}
else{
	r8 = (r8 + 1)|0;
}
}
else{
break _8;
}
}
	r8 = heap32[(fp+-50)];
	r8 = r8 << 4;
	r8 = (r2 + r8)|0;
	r8 = r8 >> 2;
	r7 = r7 >> 2;
	heap32[(r8)] = heap32[(r7+4)];
	heap32[(r8+1)] = heap32[(r7+5)];
	heap32[(r8+2)] = heap32[(r7+6)];
	heap32[(r8+3)] = heap32[(r7+7)];
	f1 = heapFloat[(r1+32)];
	f2 = heapFloat[(r7+4)];
	f5 = heapFloat[(r1+33)];
	f6 = heapFloat[(r7+5)];
	f1 = f1*f2;
	f2 = f5*f6;
	f5 = heapFloat[(r1+34)];
	f6 = heapFloat[(r7+6)];
	f1 = f1+f2;
	f2 = f5*f6;
	f1 = f1+f2;
	f1 = f1/f0;
	f4 = f1 > f4 ? f1 : f4;
	f1 =  -9.9999997473787516e-005;
	f2 = f0-f4;
	f0 = f0*f1;
	f0 = f2+f0;
	f5 =                         0;
	if(f0 >f5) //_LBB546_13
{
	heap32[(fp+-49)] = 0;
_14: do {
	if(r5 ==2) //_LBB546_17
{
	r5 = heap32[(r6+38)];
	r7 = heap32[(r6+37)];
	r7 = (r7 + 16)|0;
	r5 = (r5 + 16)|0;
	r8 = sp + -192;
	r9 = sp + -196;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r9;
	_ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_PfRj(i7);
	f3 = f_g0;
__label__ = 32;
break _14;
}
else{
	if(r5 ==3) //_LBB546_18
{
	r5 = heap32[(r6+39)];
	r7 = heap32[(r6+38)];
	r8 = heap32[(r6+37)];
	r8 = (r8 + 16)|0;
	r7 = (r7 + 16)|0;
	r5 = (r5 + 16)|0;
	r9 = sp + -192;
	r10 = sp + -196;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r9;
	heap32[(g0+4)] = r10;
	_ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRj(i7);
	f3 = f_g0;
__label__ = 32;
}
else{
	if(r5 ==4) //_LBB546_19
{
	r5 = heap32[(r6+40)];
	r7 = heap32[(r6+39)];
	r8 = heap32[(r6+38)];
	r9 = heap32[(r6+37)];
	r10 = sp + -16;
	r11 = (r9 + 16)|0;
	r12 = r10 >> 2;
	r13 = (r8 + 16)|0;
	heap32[(fp+-4)] = r11;
	r11 = (r7 + 16)|0;
	heap32[(r12+1)] = r13;
	r13 = (r5 + 16)|0;
	heap32[(r12+2)] = r11;
	r9 = r9 >> 2;
	heap32[(r12+3)] = r13;
	r5 = r5 >> 2;
	f0 = heapFloat[(r9+6)];
	f1 = heapFloat[(r5+6)];
	f2 = heapFloat[(r9+5)];
	f3 = heapFloat[(r5+5)];
	f6 = heapFloat[(r9+4)];
	f7 = heapFloat[(r5+4)];
	r11 = sp + -64;
	f8 = f6-f7;
	f9 = f2-f3;
	r12 = r11 >> 2;
	heapFloat[(fp+-16)] = f8;
	f10 = f0-f1;
	heapFloat[(r12+1)] = f9;
	heapFloat[(r12+2)] = f10;
	r8 = r8 >> 2;
	heap32[(r12+3)] = 0;
	f11 = heapFloat[(r8+6)];
	f12 = heapFloat[(r8+5)];
	f13 = heapFloat[(r8+4)];
	f14 = f13-f7;
	f15 = f12-f3;
	heapFloat[(r12+4)] = f14;
	f16 = f11-f1;
	heapFloat[(r12+5)] = f15;
	heapFloat[(r12+6)] = f16;
	r7 = r7 >> 2;
	heap32[(r12+7)] = 0;
	f17 = heapFloat[(r7+5)];
	f18 = heapFloat[(r7+4)];
	f19 = f9*f16;
	f7 = f18-f7;
	f20 = f10*f14;
	f3 = f17-f3;
	f21 = heapFloat[(r7+6)];
	f16 = f8*f16;
	f19 = f19*f7;
	f20 = f20*f3;
	f22 = f11-f21;
	f23 = f2-f12;
	f18 = f13-f18;
	f11 = f0-f11;
	f12 = f12-f17;
	f13 = f6-f13;
	f17 = f19+f20;
	f16 = f16*f3;
	f14 = f9*f14;
	f1 = f21-f1;
	f19 = f8*f15;
	f20 = f12*f11;
	f21 = f22*f23;
	f22 = f22*f13;
	f11 = f18*f11;
	f16 = f17-f16;
	f14 = f14*f1;
	f17 = f20-f21;
	f11 = f22-f11;
	f15 = f10*f15;
	heapFloat[(r12+8)] = f7;
	f18 = f18*f23;
	f12 = f12*f13;
	f13 = f16-f14;
	f14 = f19*f1;
	f12 = f18-f12;
	heapFloat[(r12+9)] = f3;
	f3 = f6*f17;
	f2 = f2*f11;
	f6 = f13+f14;
	f7 = f15*f7;
	f6 = f6-f7;
	heapFloat[(r12+10)] = f1;
	f1 = f3+f2;
	f0 = f0*f12;
	f0 = f1+f0;
	heap32[(r12+11)] = 0;
	f0 = f0*f6;
	if(f0 >f5) //_LBB546_45
{
__label__ = 42;
break _5;
}
else{
	if(f6 <f5) //_LBB546_22
{
	f0 = -f6;
}
else{
	f0 = f6;
}
	if(f0 <=f5) //_LBB546_45
{
__label__ = 42;
break _5;
}
else{
	r12 = sp + -76;
	r14 = r12 >> 2;
	heap32[(fp+-19)] = 0;
	heap32[(r14+1)] = 0;
	r15 = 0;
	f3 =                        -1;
	heap32[(r14+2)] = 0;
	heap32[(fp+-20)] = 0;
_27: while(true){
	r16 = _ZZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRjE4imd3;
	r17 = r15 << 2;
	r18 = (r16 + r17)|0;
	r18 = r18 >> 2;
	r18 = heap32[(r18)];
	r19 = r18 << 4;
	r19 = (r11 + r19)|0;
	r19 = r19 >> 2;
	f0 = heapFloat[(r19+1)];
	f1 = heapFloat[(r19+2)];
	f2 = heapFloat[(r19)];
	f7 = f9*f1;
	f11 = f10*f0;
	f10 = f10*f2;
	f1 = f8*f1;
	f12 = heapFloat[(r5+4)];
	f7 = f7-f11;
	f11 = heapFloat[(r5+5)];
	f1 = f10-f1;
	f0 = f8*f0;
	f2 = f9*f2;
	f8 = f12*f7;
	f1 = f11*f1;
	f9 = heapFloat[(r5+6)];
	f0 = f0-f2;
	f1 = f8+f1;
	f0 = f9*f0;
	f0 = f1+f0;
	f0 = f0*f6;
_29: do {
	if(f0 >f5) //_LBB546_27
{
	r19 = r18 << 2;
	r20 = (r10 + r19)|0;
	r21 = (r10 + r17)|0;
	r20 = r20 >> 2;
	r21 = r21 >> 2;
	r20 = heap32[(r20)];
	r21 = heap32[(r21)];
	r22 = sp + -80;
	heap32[(g0)] = r21;
	heap32[(g0+1)] = r20;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = r22;
	_ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRj(i7);
	f0 = f_g0;
	f1 =                         0;
if(!(f3 <f1)) //_LBB546_29
{
	if(f0 >=f3) //_LBB546_26
{
break _29;
}
}
	r20 = heap32[(fp+-20)];
	r21 = 1;
	r22 = r20 & 1;
	r23 = r21 << r15;
	r25 = r20 & 2;
	r18 = r21 << r18;
	r16 = (r16 + r19)|0;
	r21 = r22 == 0 ? r24 : r23;
	r18 = r25 == 0 ? r24 : r18;
	r20 = r20 & 4;
	r22 = 8;
	r23 = sp + -192;
	r16 = r16 >> 2;
	r18 = (r21 + r18)|0;
	r20 = r20 == 0 ? r24 : r22;
	r16 = heap32[(r16)];
	r17 = (r23 + r17)|0;
	r18 = (r18 + r20)|0;
	r16 = r16 << 2;
	r19 = (r23 + r19)|0;
	r17 = r17 >> 2;
	heap32[(fp+-49)] = r18;
	r16 = (r23 + r16)|0;
	r18 = r19 >> 2;
	heap32[(r17)] = heap32[(fp+-19)];
	r16 = r16 >> 2;
	heap32[(r18)] = heap32[(r14+1)];
	r17 = r23 >> 2;
	heap32[(r16)] = 0;
	heap32[(r17+3)] = heap32[(r14+2)];
	f3 = f0;
}
} while(0);
	if(r15 ==2) //_LBB546_32
{
break _27;
}
else{
	r16 = (r15 + 1)|0;
	r15 = r15 << 4;
	r15 = (r11 + r15)|0;
	r15 = r15 >> 2;
	f8 = heapFloat[(r15+4)];
	f9 = heapFloat[(r15+5)];
	f10 = heapFloat[(r15+6)];
	r15 = r16;
}
}
	if(f3 <f5) //_LBB546_34
{
	heap32[(fp+-49)] = 15;
	f0 = heapFloat[(r7+5)];
	f1 = heapFloat[(r8+6)];
	f2 = heapFloat[(r8+4)];
	f3 = heapFloat[(r7+6)];
	f7 = heapFloat[(r7+4)];
	f8 = f0*f1;
	f9 = heapFloat[(r5+4)];
	f10 = f3*f2;
	f11 = heapFloat[(r5+5)];
	f12 = f7*f1;
	f8 = f8*f9;
	f10 = f10*f11;
	f13 = heapFloat[(r8+5)];
	f14 = heapFloat[(r5+6)];
	f15 = f0*f2;
	f8 = f8+f10;
	f10 = f12*f11;
	f12 = f7*f13;
	f8 = f8-f10;
	f10 = f15*f14;
	f15 = f3*f13;
	f8 = f8-f10;
	f10 = f12*f14;
	f8 = f8+f10;
	f10 = f15*f9;
	f8 = f8-f10;
	f8 = f8/f6;
	heapFloat[(fp+-48)] = f8;
	f10 = heapFloat[(r9+5)];
	f12 = heapFloat[(r9+6)];
	f15 = heapFloat[(r9+4)];
	f16 = f10*f3;
	f17 = f12*f7;
	f18 = f13*f12;
	f19 = f1*f15;
	f3 = f15*f3;
	f16 = f16*f9;
	f17 = f17*f11;
	f20 = f2*f12;
	f7 = f10*f7;
	f18 = f18*f9;
	f19 = f19*f11;
	f16 = f16+f17;
	f3 = f3*f11;
	f13 = f13*f15;
	f15 = f15*f0;
	f17 = f18+f19;
	f11 = f20*f11;
	f3 = f16-f3;
	f7 = f7*f14;
	f2 = f2*f10;
	f0 = f12*f0;
	f11 = f17-f11;
	f12 = f13*f14;
	f3 = f3-f7;
	f7 = f15*f14;
	f1 = f1*f10;
	f10 = f11-f12;
	f2 = f2*f14;
	f3 = f3+f7;
	f0 = f0*f9;
	f0 = f3-f0;
	f2 = f10+f2;
	f1 = f1*f9;
	r5 = sp + -192;
	f1 = f2-f1;
	f0 = f0/f6;
	r5 = r5 >> 2;
	f2 = f8+f0;
	f1 = f1/f6;
	heapFloat[(r5+1)] = f0;
	f0 =                         1;
	f2 = f2+f1;
	r7 = 15;
	f0 = f0-f2;
	heapFloat[(r5+2)] = f1;
	heapFloat[(r5+3)] = f0;
__label__ = 34;
}
else{
__label__ = 32;
}
}
}
}
else{
__label__ = 32;
}
}
}
} while(0);
if (__label__ == 32){
	f0 =                         0;
	if(f3 <f0) //_LBB546_45
{
__label__ = 42;
break _5;
}
else{
	r7 = heap32[(fp+-49)];
	f5 = f3;
}
}
	r5 = heap32[(fp+-51)];
	r8 = (r5 * 36)|0;
	r8 = (r0 + r8)|0;
	r9 = r8 >> 2;
	heap32[(r9+45)] = 0;
	heap32[(r1+32)] = 0;
	heap32[(r1+33)] = 0;
	heap32[(r1+34)] = 0;
	heap32[(r1+35)] = 0;
	heap32[(r1+92)] = r5;
	r5 = heap32[(r6+45)];
_42: do {
if(!(r5 ==0)) //_LBB546_43
{
	r6 = heap32[(fp+-52)];
	r3 = (r6 + r3)|0;
	r6 = 0;
_44: while(true){
	r10 = 1;
	r10 = r10 << r6;
	r10 = r7 & r10;
	if(r10 ==0) //_LBB546_41
{
	r10 = r6 << 2;
	r11 = heap32[(r1+91)];
	r10 = (r3 + r10)|0;
	r12 = r11 << 2;
	r10 = r10 >> 2;
	r12 = (r0 + r12)|0;
	r10 = heap32[(r10)];
	r12 = r12 >> 2;
	r11 = (r11 + 1)|0;
	heap32[(r12+87)] = r10;
	heap32[(r1+91)] = r11;
}
else{
	r10 = r6 << 2;
	r11 = (r3 + r10)|0;
	r12 = heap32[(r9+45)];
	r11 = r11 >> 2;
	r13 = (r8 + 148)|0;
	r12 = r12 << 2;
	r12 = (r13 + r12)|0;
	r14 = heap32[(r11)];
	r12 = r12 >> 2;
	r15 = sp + -192;
	heap32[(r12)] = r14;
	r12 = heap32[(r9+45)];
	r10 = (r15 + r10)|0;
	r14 = r12 << 2;
	r10 = r10 >> 2;
	r13 = (r13 + r14)|0;
	f0 = heapFloat[(r10)];
	r10 = r13 >> 2;
	r12 = (r12 + 1)|0;
	heapFloat[(r10+4)] = f0;
	heap32[(r9+45)] = r12;
	r10 = heap32[(r11)];
	r10 = r10 >> 2;
	f1 = heapFloat[(r10+4)];
	f2 = heapFloat[(r10+6)];
	f3 = heapFloat[(r10+5)];
	f6 = heapFloat[(r1+32)];
	f1 = f1*f0;
	f1 = f6+f1;
	heapFloat[(r1+32)] = f1;
	f1 = f3*f0;
	f3 = heapFloat[(r1+33)];
	f1 = f3+f1;
	heapFloat[(r1+33)] = f1;
	f0 = f2*f0;
	f1 = heapFloat[(r1+34)];
	f0 = f1+f0;
	heapFloat[(r1+34)] = f0;
}
	r6 = (r6 + 1)|0;
if(!(r5 !=r6)) //_LBB546_39
{
break _42;
}
}
}
} while(0);
if(!(r7 !=15)) //_LBB546_46
{
	heap32[(r1+94)] = 1;
}
	r4 = (r4 + 1)|0;
	if(uint(r4) <uint(128)) //_LBB546_48
{
	r3 = heap32[(r1+94)];
	if(r3 !=0) //_LBB546_50
{
__label__ = 47;
break _5;
}
else{
	r5 = heap32[(fp+-50)];
	r3 = (r5 + 1)|0;
	f0 = heapFloat[(r1+32)];
	f1 = heapFloat[(r1+33)];
	f2 = heapFloat[(r1+34)];
	r5 = r3 & 3;
	heap32[(fp+-50)] = r5;
	f3 = f5;
continue _5;
}
}
else{
__label__ = 44;
break _5;
}
}
else{
__label__ = 12;
break _5;
}
}
else{
__label__ = 5;
break _5;
}
}
switch(__label__ ){//multiple entries
case 10:
	r2 = heap32[(r1+92)];
	r2 = (r2 * 36)|0;
	r2 = (r0 + r2)|0;
	r3 = r2 >> 2;
	r4 = heap32[(r3+45)];
	r4 = (r4 + -1)|0;
	r5 = r4 << 2;
	r6 = heap32[(r1+91)];
	r2 = (r2 + r5)|0;
	r5 = r6 << 2;
	r2 = (r2 + 148)|0;
	r5 = (r0 + r5)|0;
	r2 = r2 >> 2;
	heap32[(r3+45)] = r4;
	r3 = r5 >> 2;
	r2 = heap32[(r2)];
	r4 = (r6 + 1)|0;
	heap32[(r3+87)] = r2;
	heap32[(r1+91)] = r4;
break;
case 42:
	r2 = heap32[(r1+92)];
	r2 = (r2 * 36)|0;
	r2 = (r0 + r2)|0;
	r4 = r2 >> 2;
	r3 = heap32[(r4+45)];
	r3 = (r3 + -1)|0;
	r5 = r3 << 2;
	r6 = heap32[(r1+91)];
	r2 = (r2 + r5)|0;
	r5 = r6 << 2;
	r2 = (r2 + 148)|0;
	r5 = (r0 + r5)|0;
	r2 = r2 >> 2;
	heap32[(r4+45)] = r3;
	r4 = r5 >> 2;
	r2 = heap32[(r2)];
	r3 = (r6 + 1)|0;
	heap32[(r4+87)] = r2;
	heap32[(r1+91)] = r3;
break;
case 5:
	heap32[(r1+94)] = 1;
break;
case 44:
	heap32[(r1+94)] = 2;
break;
case 12:
	r2 = heap32[(r1+92)];
	r2 = (r2 * 36)|0;
	r2 = (r0 + r2)|0;
	r3 = r2 >> 2;
	r4 = heap32[(r3+45)];
	r4 = (r4 + -1)|0;
	r5 = r4 << 2;
	r6 = heap32[(r1+91)];
	r2 = (r2 + r5)|0;
	r5 = r6 << 2;
	r2 = (r2 + 148)|0;
	r5 = (r0 + r5)|0;
	r2 = r2 >> 2;
	heap32[(r3+45)] = r4;
	r3 = r5 >> 2;
	r2 = heap32[(r2)];
	r4 = (r6 + 1)|0;
	heap32[(r3+87)] = r2;
	heap32[(r1+91)] = r4;
break;
}
	r2 = heap32[(r1+92)];
	r2 = (r2 * 36)|0;
	r0 = (r0 + r2)|0;
	r0 = (r0 + 148)|0;
	heap32[(r1+93)] = r0;
	r0 = heap32[(r1+94)];
	if(r0 ==1) //_LBB546_53
{
	heap32[(r1+36)] = 0;
	r0 = 1;
}
else{
if(!(r0 !=0)) //_LBB546_54
{
	f0 = heapFloat[(r1+32)];
	f1 = heapFloat[(r1+33)];
	f2 = heapFloat[(r1+34)];
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	heapFloat[(r1+36)] = f_g0;
	r0 = heap32[(r1+94)];
	r_g0 = r0;
	return;
}
}
	r_g0 = r0;
	return;
}