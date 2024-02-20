function _ZN27btContinuousConvexCollision16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(sp)
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
var __label__ = 0;
	i7 = sp + -816;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	r2 = 0;
	r3 = r1 >> 2;
	heap8[r1+312] = r2;
	r4 = 1;
	heap32[(r3)] = 0;
	heap8[r1+356] = r4;
	heap32[(r3+73)] = 1566444395;
	heap32[(r3+74)] = 1566444395;
	heap32[(r3+75)] = 1566444395;
	heap32[(r3+76)] = 0;
	heap8[r1+352] = r2;
	heap32[(r3+84)] = 0;
	heap32[(r3+85)] = 0;
	heap32[(r3+86)] = 0;
	heap32[(r3+87)] = 0;
	r3 = heapU8[r1+332];
	r5 = heap32[(fp+1)];
	r6 = heap32[(fp+2)];
	r3 = r3 & 240;
	r7 = r6 >> 2;
	heap8[r1+332] = r3;
	r1 = r5 >> 2;
	f0 = heapFloat[(r7+14)];
	f1 = heapFloat[(r1+14)];
	f2 = heapFloat[(r7+13)];
	f3 = heapFloat[(r1+13)];
	f4 = heapFloat[(r7+12)];
	f5 = heapFloat[(r1+12)];
	r3 = sp + -40;
	r7 = sp + -44;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r7;
	_ZN15btTransformUtil22calculateDiffAxisAngleERK11btTransformS2_R9btVector3Rf(i7);
	r3 = r3 >> 2;
	f6 = heapFloat[(r3+2)];
	f7 = heapFloat[(fp+-11)];
	f8 = heapFloat[(r3+1)];
	f9 = heapFloat[(fp+-10)];
	r3 = sp + -96;
	f9 = f9*f7;
	f8 = f8*f7;
	r6 = r3 >> 2;
	heapFloat[(fp+-24)] = f9;
	f6 = f6*f7;
	heapFloat[(r6+1)] = f8;
	r7 = heap32[(fp+3)];
	r8 = heap32[(fp+4)];
	heapFloat[(r6+2)] = f6;
	r9 = r8 >> 2;
	heap32[(r6+3)] = 0;
	r6 = r7 >> 2;
	f7 = heapFloat[(r9+14)];
	f10 = heapFloat[(r6+14)];
	f11 = heapFloat[(r9+13)];
	f12 = heapFloat[(r6+13)];
	f13 = heapFloat[(r9+12)];
	f14 = heapFloat[(r6+12)];
	r9 = sp + -16;
	r10 = sp + -20;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r10;
	_ZN15btTransformUtil22calculateDiffAxisAngleERK11btTransformS2_R9btVector3Rf(i7);
	r8 = r9 >> 2;
	f15 = heapFloat[(r8+2)];
	f16 = heapFloat[(fp+-5)];
	f17 = heapFloat[(r8+1)];
	f18 = heapFloat[(fp+-4)];
	r8 = sp + -112;
	f18 = f18*f16;
	f17 = f17*f16;
	r9 = r8 >> 2;
	heapFloat[(fp+-28)] = f18;
	f15 = f15*f16;
	heapFloat[(r9+1)] = f17;
	heapFloat[(r9+2)] = f15;
	heap32[(r9+3)] = 0;
	r9 = heap32[(r0+3)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+4)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	f16 = f_g0;
	r9 = heap32[(r0+4)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+4)];
	heap32[(g0)] = r9;
	f9 = f9*f9;
	f8 = f8*f8;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	f19 = f_g0;
	f8 = f9+f8;
	f6 = f6*f6;
	f6 = f8+f6;
	heapFloat[(g0)] = f6;
	f6 = f18*f18;
	f8 = f17*f17;
	sqrtf(i7);
	f9 = f_g0;
	f11 = f11-f12;
	f2 = f2-f3;
	f3 = f13-f14;
	f4 = f4-f5;
	f5 = f6+f8;
	f6 = f15*f15;
	f8 = f11-f2;
	f12 = f3-f4;
	f7 = f7-f10;
	f0 = f0-f1;
	f1 = f5+f6;
	f5 = f7-f0;
	heapFloat[(g0)] = f1;
	f1 = f12*f12;
	f6 = f8*f8;
	sqrtf(i7);
	f1 = f1+f6;
	f6 = f5*f5;
	f1 = f1+f6;
	f6 = f9*f16;
	f9 = f_g0*f19;
	heapFloat[(g0)] = f1;
	f1 = f6+f9;
	sqrtf(i7);
	f6 = f_g0+f1;
	f9 =                         0;
_1: do {
if(!(f6 ==f9)) //_LBB534_21
{
	r9 = _ZTV16btPointCollector;
	r9 = (r9 + 8)|0;
	r10 = sp + -176;
	heap32[(fp+-44)] = r9;
	r11 = r10 >> 2;
	heap32[(r11+9)] = 1566444395;
	heap8[sp+-136] = r2;
	r12 = heap32[(r0+4)];
	r13 = r12 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+11)];
	r14 = heap32[(r0+2)];
	r15 = heap32[(r0+1)];
	heap32[(g0)] = r12;
	__FUNCTION_TABLE__[(r13)>>2](i7);
	f6 = f_g0;
	r12 = heap32[(r0+3)];
	r13 = r12 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+11)];
	heap32[(g0)] = r12;
	__FUNCTION_TABLE__[(r13)>>2](i7);
	r12 = heap32[(r0+4)];
	r13 = heap32[(r0+3)];
	r16 = r12 >> 2;
	r17 = r13 >> 2;
	r18 = _ZTV17btGjkPairDetector;
	r16 = heap32[(r16+1)];
	r17 = heap32[(r17+1)];
	r19 = sp + -256;
	r18 = (r18 + 8)|0;
	r20 = r19 >> 2;
	heap32[(fp+-64)] = r18;
	heap32[(r20+1)] = 0;
	heap32[(r20+2)] = 1065353216;
	heap32[(r20+3)] = 0;
	heap32[(r20+4)] = 0;
	heap32[(r20+5)] = r14;
	heap32[(r20+6)] = r15;
	heap32[(r20+7)] = r13;
	heap32[(r20+8)] = r12;
	heap32[(r20+9)] = r17;
	heap32[(r20+10)] = r16;
	heapFloat[(r20+11)] = f_g0;
	heapFloat[(r20+12)] = f6;
	heap8[sp+-204] = r2;
	r12 = sp + -392;
	heap32[(r20+15)] = -1;
	r13 = r12 >> 2;
	heap32[(r20+18)] = 1;
	heap32[(r13+32)] = 1566444395;
	heap32[(r13+33)] = 0;
	heap32[(fp+-98)] = heap32[(r1)];
	heap32[(r13+1)] = heap32[(r1+1)];
	heap32[(r13+2)] = heap32[(r1+2)];
	heap32[(r13+3)] = heap32[(r1+3)];
	heap32[(r13+4)] = heap32[(r1+4)];
	heap32[(r13+5)] = heap32[(r1+5)];
	heap32[(r13+6)] = heap32[(r1+6)];
	heap32[(r13+7)] = heap32[(r1+7)];
	heap32[(r13+8)] = heap32[(r1+8)];
	heap32[(r13+9)] = heap32[(r1+9)];
	heap32[(r13+10)] = heap32[(r1+10)];
	heap32[(r13+11)] = heap32[(r1+11)];
	heap32[(r13+12)] = heap32[(r1+12)];
	heap32[(r13+13)] = heap32[(r1+13)];
	heap32[(r13+14)] = heap32[(r1+14)];
	heap32[(r13+15)] = heap32[(r1+15)];
	heap32[(r13+16)] = heap32[(r6)];
	heap32[(r13+17)] = heap32[(r6+1)];
	heap32[(r13+18)] = heap32[(r6+2)];
	heap32[(r13+19)] = heap32[(r6+3)];
	heap32[(r13+20)] = heap32[(r6+4)];
	heap32[(r13+21)] = heap32[(r6+5)];
	heap32[(r13+22)] = heap32[(r6+6)];
	heap32[(r13+23)] = heap32[(r6+7)];
	heap32[(r13+24)] = heap32[(r6+8)];
	heap32[(r13+25)] = heap32[(r6+9)];
	heap32[(r13+26)] = heap32[(r6+10)];
	heap32[(r13+27)] = heap32[(r6+11)];
	heap32[(r13+28)] = heap32[(r6+12)];
	heap32[(r13+29)] = heap32[(r6+13)];
	heap32[(r13+30)] = heap32[(r6+14)];
	heap32[(r13+31)] = heap32[(r6+15)];
	heap32[(g0)] = r19;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = 0;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	f6 = heapFloat[(r11+5)];
	r1 = heapU8[sp+-136];
	r6 = sp + -128;
	heapFloat[(fp+-32)] = f6;
	f10 = heapFloat[(r11+6)];
	r10 = r6 >> 2;
	heapFloat[(r10+1)] = f10;
	f13 = heapFloat[(r11+7)];
	heapFloat[(r10+2)] = f13;
	f14 = heapFloat[(r11+8)];
	heapFloat[(r10+3)] = f14;
if(!(r1 ==0)) //_LBB534_21
{
	r1 = heap32[(fp+5)];
	f15 = heapFloat[(r11+1)];
	f16 = heapFloat[(r11+2)];
	f17 = heapFloat[(r11+3)];
	f18 = f12*f15;
	f19 = f8*f16;
	r12 = sp + -456;
	f18 = f18+f19;
	f19 = f5*f17;
	f20 = heapFloat[(r11+9)];
	f21 = heapFloat[(r11+4)];
	f18 = f18+f19;
	r11 = (r12 + 48)|0;
_4: while(true){
	f19 =     0.0010000000474974513;
	if(f20 >f19) //_LBB534_3
{
	r13 = r1 >> 2;
	r14 = heap32[(r13+42)];
if(!(r14 ==0)) //_LBB534_5
{
	r15 = r14 >> 2;
	r15 = heap32[(r15)];
	r15 = r15 >> 2;
	r15 = heap32[(r15+5)];
	r16 = sp + -80;
	r17 = r16 >> 2;
	heap32[(fp+-20)] = 1065353216;
	heap32[(r17+1)] = 1065353216;
	heap32[(r17+2)] = 1065353216;
	heap32[(r17+3)] = 0;
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 1045220557;
	heap32[(g0+3)] = r16;
	__FUNCTION_TABLE__[(r15)>>2](i7);
}
	r2 = (r2 + 1)|0;
	if(r2 >64) //_LBB534_21
{
break _1;
}
else{
	f6 = f12*f15;
	f10 = f8*f16;
	f6 = f6+f10;
	f10 = f5*f17;
	f18 = f6+f10;
	f6 = f18+f1;
	f10 =   1.1920928955078125e-007;
	if(f6 <=f10) //_LBB534_21
{
break _1;
}
else{
	f6 = f20/f6;
	f19 = f9+f6;
	f6 =                         0;
	if(f19 <f6) //_LBB534_21
{
break _1;
}
else{
	f10 =                         1;
	if(f19 >f10) //_LBB534_21
{
break _1;
}
else{
	if(f19 <=f9) //_LBB534_21
{
break _1;
}
else{
	heap32[(g0)] = r5;
	heapFloat[(g0+1)] = f4;
	heapFloat[(g0+2)] = f2;
	heapFloat[(g0+3)] = f0;
	heap32[(g0+4)] = r3;
	heapFloat[(g0+5)] = f19;
	heap32[(g0+6)] = r12;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	r14 = sp + -520;
	heap32[(g0)] = r7;
	heapFloat[(g0+1)] = f3;
	heapFloat[(g0+2)] = f11;
	heapFloat[(g0+3)] = f7;
	heap32[(g0+4)] = r8;
	heapFloat[(g0+5)] = f19;
	heap32[(g0+6)] = r14;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	r15 = heap32[(r13+42)];
if(!(r15 ==0)) //_LBB534_12
{
	r16 = r15 >> 2;
	r16 = heap32[(r16)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+5)];
	r17 = sp + -64;
	r19 = r17 >> 2;
	heap32[(fp+-16)] = 1065353216;
	heap32[(r19+1)] = 0;
	heap32[(r19+2)] = 0;
	heap32[(r19+3)] = 0;
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = 1045220557;
	heap32[(g0+3)] = r17;
	__FUNCTION_TABLE__[(r16)>>2](i7);
}
	r15 = heap32[(r13)];
	r15 = r15 >> 2;
	r15 = heap32[(r15)];
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f19;
	r16 = sp + -568;
	__FUNCTION_TABLE__[(r15)>>2](i7);
	r15 = r16 >> 2;
	heap32[(fp+-142)] = r9;
	r17 = 0;
	heap32[(r15+9)] = 1566444395;
	heap8[sp+-528] = r17;
	r19 = heap32[(r0+4)];
	r20 = heap32[(r0+3)];
	r21 = heap32[(r0+1)];
	r22 = heap32[(r0+2)];
	r23 = sp + -648;
	heap32[(fp+-162)] = r18;
	r24 = r23 >> 2;
	heap32[(r24+1)] = 0;
	heap32[(r24+2)] = 1065353216;
	heap32[(r24+3)] = 0;
	heap32[(r24+4)] = 0;
	heap32[(r24+5)] = r22;
	heap32[(r24+6)] = r21;
	heap32[(r24+7)] = r20;
	r21 = r20 >> 2;
	heap32[(r24+8)] = r19;
	r22 = heap32[(r21+1)];
	heap32[(r24+9)] = r22;
	r22 = r19 >> 2;
	r25 = heap32[(r22+1)];
	heap32[(r24+10)] = r25;
	r21 = heap32[(r21)];
	r21 = r21 >> 2;
	r21 = heap32[(r21+11)];
	heap32[(g0)] = r20;
	__FUNCTION_TABLE__[(r21)>>2](i7);
	heapFloat[(r24+11)] = f_g0;
	r20 = heap32[(r22)];
	r20 = r20 >> 2;
	r20 = heap32[(r20+11)];
	heap32[(g0)] = r19;
	__FUNCTION_TABLE__[(r20)>>2](i7);
	heapFloat[(r24+12)] = f_g0;
	heap8[sp+-596] = r17;
	r19 = sp + -784;
	heap32[(r24+15)] = -1;
	r20 = r19 >> 2;
	heap32[(r24+18)] = 1;
	heap32[(r20+32)] = 1566444395;
	heap32[(r20+33)] = 0;
	r21 = r12 >> 2;
	heap32[(fp+-196)] = heap32[(fp+-114)];
	heap32[(r20+1)] = heap32[(r21+1)];
	heap32[(r20+2)] = heap32[(r21+2)];
	heap32[(r20+3)] = heap32[(r21+3)];
	heap32[(r20+4)] = heap32[(r21+4)];
	heap32[(r20+5)] = heap32[(r21+5)];
	heap32[(r20+6)] = heap32[(r21+6)];
	heap32[(r20+7)] = heap32[(r21+7)];
	heap32[(r20+8)] = heap32[(r21+8)];
	heap32[(r20+9)] = heap32[(r21+9)];
	heap32[(r20+10)] = heap32[(r21+10)];
	heap32[(r20+11)] = heap32[(r21+11)];
	heap32[(r20+12)] = heap32[(r21+12)];
	heap32[(r20+13)] = heap32[(r21+13)];
	heap32[(r20+14)] = heap32[(r21+14)];
	heap32[(r20+15)] = heap32[(r21+15)];
	r14 = r14 >> 2;
	heap32[(r20+16)] = heap32[(fp+-130)];
	heap32[(r20+17)] = heap32[(r14+1)];
	heap32[(r20+18)] = heap32[(r14+2)];
	heap32[(r20+19)] = heap32[(r14+3)];
	heap32[(r20+20)] = heap32[(r14+4)];
	heap32[(r20+21)] = heap32[(r14+5)];
	heap32[(r20+22)] = heap32[(r14+6)];
	heap32[(r20+23)] = heap32[(r14+7)];
	heap32[(r20+24)] = heap32[(r14+8)];
	heap32[(r20+25)] = heap32[(r14+9)];
	heap32[(r20+26)] = heap32[(r14+10)];
	heap32[(r20+27)] = heap32[(r14+11)];
	heap32[(r20+28)] = heap32[(r14+12)];
	heap32[(r20+29)] = heap32[(r14+13)];
	heap32[(r20+30)] = heap32[(r14+14)];
	heap32[(r20+31)] = heap32[(r14+15)];
	heap32[(g0)] = r23;
	heap32[(g0+1)] = r19;
	heap32[(g0+2)] = r16;
	heap32[(g0+3)] = 0;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r14 = heapU8[sp+-528];
	if(r14 !=0) //_LBB534_14
{
	f20 = heapFloat[(r15+9)];
	if(f20 >=f6) //_LBB534_17
{
	f6 = heapFloat[(r15+5)];
	heapFloat[(fp+-32)] = f6;
	f10 = heapFloat[(r15+6)];
	heapFloat[(r10+1)] = f10;
	f13 = heapFloat[(r15+7)];
	heapFloat[(r10+2)] = f13;
	f14 = heapFloat[(r15+8)];
	heapFloat[(r10+3)] = f14;
	f15 = heapFloat[(r15+1)];
	f16 = heapFloat[(r15+2)];
	f17 = heapFloat[(r15+3)];
	f21 = heapFloat[(r15+4)];
	heap32[(fp+-142)] = r9;
	f9 = f19;
}
else{
__label__ = 14;
break _4;
}
}
else{
__label__ = 15;
break _4;
}
}
}
}
}
}
}
else{
__label__ = 18;
break _4;
}
}
switch(__label__ ){//multiple entries
case 18:
	r0 = r1 >> 2;
	f0 = f18+f1;
	f1 = heapFloat[(r0+43)];
	if(f0 <=f1) //_LBB534_21
{
break _1;
}
else{
	heapFloat[(r0+41)] = f9;
	heapFloat[(r0+33)] = f15;
	heapFloat[(r0+34)] = f16;
	heapFloat[(r0+35)] = f17;
	heapFloat[(r0+36)] = f21;
	heapFloat[(r0+37)] = f6;
	heapFloat[(r0+38)] = f10;
	heapFloat[(r0+39)] = f13;
	heapFloat[(r0+40)] = f14;
	r0 = 1;
	r_g0 = r0;
	return;
}
break;
case 14:
	heapFloat[(r13+41)] = f19;
	f0 = heapFloat[(r15+4)];
	f1 = heapFloat[(r15+3)];
	f2 = heapFloat[(r15+2)];
	heap32[(r13+33)] = heap32[(r15+1)];
	heapFloat[(r13+34)] = f2;
	heapFloat[(r13+35)] = f1;
	heapFloat[(r13+36)] = f0;
	heap32[(r13+37)] = heap32[(r15+5)];
	heap32[(r13+38)] = heap32[(r15+6)];
	heap32[(r13+39)] = heap32[(r15+7)];
	heap32[(r13+40)] = heap32[(r15+8)];
	r17 = r4;
break;
}
	heap32[(fp+-142)] = r9;
	r0 = r17 & 255;
	r_g0 = r0;
	return;
}
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}