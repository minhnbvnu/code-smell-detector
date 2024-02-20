function _ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(sp)
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
var __label__ = 0;
	i7 = sp + -288;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+13)];
	r3 = heap32[(r1+12)];
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp+2)];
	r6 = heap32[(fp+3)];
	r7 = heap32[(fp+4)];
	r8 = heap32[(fp+5)];
	r9 = heap32[(fp+6)];
	r10 = heap32[(fp+7)];
	f0 = heapFloat[(fp+8)];
	f1 = heapFloat[(fp+9)];
	f2 = heapFloat[(fp+10)];
	if(r2 ==r3) //_LBB614_2
{
	r11 = 1;
	r12 = r3 << 1;
	r12 = r3 == 0 ? r11 : r12;
	if(r2 >=r12) //_LBB614_1
{
__label__ = 1;
}
else{
	if(r12 !=0) //_LBB614_5
{
	r2 = gNumAlignedAllocs;
	r2 = r2 >> 2;
	r13 = heap32[(r2)];
	r14 = (r12 * 136)|0;
	r13 = (r13 + 1)|0;
	r14 = r14 | 3;
	heap32[(r2)] = r13;
	r2 = (r14 + 16)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r13 = r_g0;
	if(r13 !=0) //_LBB614_7
{
	r2 = 0;
	r14 = (r13 + 4)|0;
	r2 = (r2 - r14)|0;
	r2 = r2 & 15;
	r2 = (r13 + r2)|0;
	r14 = (r2 + 4)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r13;
	r13 = r14;
}
}
else{
	r13 = 0;
}
	r14 = (r0 + 56)|0;
	if(r3 <1) //_LBB614_10
{
	r2 = r14 >> 2;
	r16 = heap32[(r2)];
}
else{
	r2 = 0;
	r15 = r3;
_12: while(true){
	r16 = r14 >> 2;
	r16 = heap32[(r16)];
	r17 = (r13 + r2)|0;
	r18 = (r16 + r2)|0;
	heap32[(g0)] = r17;
	heap32[(g0+1)] = r18;
	heap32[(g0+2)] = 136;
	r15 = (r15 + -1)|0;
	r2 = (r2 + 136)|0;
	memcpy(i7);
if(!(r15 !=0)) //_LBB614_11
{
break _12;
}
}
	r14 = (r0 + 56)|0;
}
	if(r16 !=0) //_LBB614_15
{
	r2 = heapU8[r0+60];
	if(r2 !=0) //_LBB614_17
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r15 = heap32[(r2)];
	r15 = (r15 + 1)|0;
	r16 = r16 >> 2;
	heap32[(r2)] = r15;
	r2 = heap32[(r16+-1)];
	heap32[(g0)] = r2;
	free(i7);
	r2 = heap32[(r1+12)];
}
else{
	r2 = r3;
}
	r15 = r14 >> 2;
	heap32[(r15)] = 0;
}
else{
	r2 = r3;
}
	r14 = r14 >> 2;
	heap8[r0+60] = r11;
	heap32[(r14)] = r13;
	heap32[(r1+13)] = r12;
__label__ = 19;
}
}
else{
__label__ = 1;
}
if (__label__ == 1){
	r2 = r3;
}
	r0 = (r2 + 1)|0;
	heap32[(r1+12)] = r0;
	r0 = heap32[(r1+14)];
	r1 = (r3 * 136)|0;
	r0 = (r0 + r1)|0;
	r0 = r0 >> 2;
	heap32[(r0+25)] = r5;
	r1 = heapU8[r9+232];
	r1 = r1 & 2;
if(!(r1 !=0)) //_LBB614_22
{
	r9 = 0;
}
	r1 = heapU8[r10+232];
	r1 = r1 & 2;
if(!(r1 !=0)) //_LBB614_24
{
	r10 = 0;
}
	r1 = r4 >> 2;
	heap32[(r0+4)] = heap32[(r1)];
	heap32[(r0+5)] = heap32[(r1+1)];
	heap32[(r0+6)] = heap32[(r1+2)];
	heap32[(r0+7)] = heap32[(r1+3)];
	if(r9 ==0) //_LBB614_26
{
	r2 = _ZGVZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r3 = heapU8[r2];
if(!(r3 !=0)) //_LBB614_28
{
	r3 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r4 = r3 >> 2;
	heap32[(r4+41)] = 1065353216;
	heap32[(r4+42)] = 1065353216;
	heap32[(r4+43)] = 1065353216;
	heap32[(r4+44)] = 0;
	heap32[(r4+45)] = 0;
	heap32[(r4+46)] = 1566444395;
	heap32[(r4+47)] = 0;
	heap32[(r4+48)] = 0;
	heap32[(r4+49)] = 0;
	heap32[(r4+50)] = 0;
	heap32[(r4+51)] = 1;
	heap32[(r4+52)] = -1;
	heap32[(r4+53)] = -1;
	heap32[(r4+54)] = 1;
	heap32[(r4+55)] = 0;
	heap32[(r4+56)] = 1056964608;
	heap32[(r4+57)] = 0;
	heap32[(r4+58)] = 1;
	heap32[(r4+59)] = 0;
	heap32[(r4+60)] = 1065353216;
	heap32[(r4+61)] = 0;
	heap32[(r4+62)] = 0;
	heap32[(r4+63)] = 0;
	heap32[(r4+1)] = 1065353216;
	heap32[(r4+2)] = 0;
	heap32[(r4+3)] = 0;
	heap32[(r4+4)] = 0;
	heap32[(r4+5)] = 0;
	heap32[(r4+6)] = 1065353216;
	heap32[(r4+7)] = 0;
	heap32[(r4+8)] = 0;
	heap32[(r4+9)] = 0;
	heap32[(r4+10)] = 0;
	heap32[(r4+11)] = 1065353216;
	heap32[(r4+12)] = 0;
	heap32[(r4+13)] = 0;
	heap32[(r4+14)] = 0;
	r5 = _ZTV11btRigidBody;
	heap32[(r4+15)] = 0;
	r5 = (r5 + 8)|0;
	heap32[(r4+16)] = 0;
	r11 = 1;
	heap32[(r4)] = r5;
	heap8[r3+492] = r11;
	heap32[(r4+122)] = 0;
	heap32[(r4+120)] = 0;
	r5 = sp + -272;
	heap32[(r4+121)] = 0;
	r4 = r5 >> 2;
	heap32[(fp+-68)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+18)] = 0;
	heap32[(r4+19)] = 0;
	heap32[(r4+20)] = 0;
	heap32[(r4+21)] = 0;
	heap32[(r4+22)] = 0;
	heap32[(r4+23)] = 0;
	heap32[(r4+24)] = 0;
	heap32[(r4+25)] = 1056964608;
	heap32[(r4+26)] = 0;
	heap32[(r4+27)] = 1061997773;
	r12 = 0;
	heap32[(r4+28)] = 1065353216;
	heap8[sp+-156] = r12;
	heap32[(r4+30)] = 1000593162;
	heap32[(r4+31)] = 1008981770;
	heap32[(r4+32)] = 1008981770;
	heap32[(r4+33)] = 1008981770;
	heap32[(r4+2)] = 1065353216;
	heap32[(r4+3)] = 0;
	heap32[(r4+4)] = 0;
	heap32[(r4+5)] = 0;
	heap32[(r4+6)] = 0;
	heap32[(r4+7)] = 1065353216;
	heap32[(r4+8)] = 0;
	heap32[(r4+9)] = 0;
	heap32[(r4+10)] = 0;
	heap32[(r4+11)] = 0;
	heap32[(r4+12)] = 1065353216;
	heap32[(r4+13)] = 0;
	heap32[(r4+14)] = 0;
	heap32[(r4+15)] = 0;
	heap32[(r4+16)] = 0;
	heap32[(r4+17)] = 0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	_ZN11btRigidBody14setupRigidBodyERKNS_27btRigidBodyConstructionInfoE(i7);
	heap8[r2] = r11;
}
	r2 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r3 = r2 >> 2;
	r4 = heap32[(r3+51)];
	r4 = r4 | 1;
	heap32[(r3+51)] = r4;
	heap32[(r3+84)] = 0;
	f3 =                         0;
	f4 = heapFloat[(r3+95)];
	f5 = heapFloat[(r3+94)];
	f6 = heapFloat[(r3+93)];
	f6 = f6*f3;
	f5 = f5*f3;
	heapFloat[(r3+89)] = f6;
	f4 = f4*f3;
	heapFloat[(r3+90)] = f5;
	heapFloat[(r3+91)] = f4;
	heap32[(r3+92)] = 0;
	heap32[(r3+97)] = 0;
	heap32[(r3+98)] = 0;
	heap32[(r3+99)] = 0;
	heap32[(r3+100)] = 0;
	f4 = heapFloat[(r3+87)];
	f5 = heapFloat[(r3+86)];
	f6 = heapFloat[(r3+85)];
	f6 = f6*f3;
	f5 = f5*f3;
	heapFloat[(r3+138)] = f6;
	f3 = f4*f3;
	heapFloat[(r3+139)] = f5;
	heapFloat[(r3+140)] = f3;
	heap32[(r3+141)] = 0;
}
else{
	r2 = r9;
}
	heap32[(r0+26)] = r2;
	if(r10 ==0) //_LBB614_31
{
	r2 = _ZGVZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r3 = heapU8[r2];
if(!(r3 !=0)) //_LBB614_33
{
	r3 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r4 = r3 >> 2;
	heap32[(r4+41)] = 1065353216;
	heap32[(r4+42)] = 1065353216;
	heap32[(r4+43)] = 1065353216;
	heap32[(r4+44)] = 0;
	heap32[(r4+45)] = 0;
	heap32[(r4+46)] = 1566444395;
	heap32[(r4+47)] = 0;
	heap32[(r4+48)] = 0;
	heap32[(r4+49)] = 0;
	heap32[(r4+50)] = 0;
	heap32[(r4+51)] = 1;
	heap32[(r4+52)] = -1;
	heap32[(r4+53)] = -1;
	heap32[(r4+54)] = 1;
	heap32[(r4+55)] = 0;
	heap32[(r4+56)] = 1056964608;
	heap32[(r4+57)] = 0;
	heap32[(r4+58)] = 1;
	heap32[(r4+59)] = 0;
	heap32[(r4+60)] = 1065353216;
	heap32[(r4+61)] = 0;
	heap32[(r4+62)] = 0;
	heap32[(r4+63)] = 0;
	heap32[(r4+1)] = 1065353216;
	heap32[(r4+2)] = 0;
	heap32[(r4+3)] = 0;
	heap32[(r4+4)] = 0;
	heap32[(r4+5)] = 0;
	heap32[(r4+6)] = 1065353216;
	heap32[(r4+7)] = 0;
	heap32[(r4+8)] = 0;
	heap32[(r4+9)] = 0;
	heap32[(r4+10)] = 0;
	heap32[(r4+11)] = 1065353216;
	heap32[(r4+12)] = 0;
	heap32[(r4+13)] = 0;
	heap32[(r4+14)] = 0;
	r5 = _ZTV11btRigidBody;
	heap32[(r4+15)] = 0;
	r5 = (r5 + 8)|0;
	heap32[(r4+16)] = 0;
	r11 = 1;
	heap32[(r4)] = r5;
	heap8[r3+492] = r11;
	heap32[(r4+122)] = 0;
	heap32[(r4+120)] = 0;
	r5 = sp + -136;
	heap32[(r4+121)] = 0;
	r4 = r5 >> 2;
	heap32[(fp+-34)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+18)] = 0;
	heap32[(r4+19)] = 0;
	heap32[(r4+20)] = 0;
	heap32[(r4+21)] = 0;
	heap32[(r4+22)] = 0;
	heap32[(r4+23)] = 0;
	heap32[(r4+24)] = 0;
	heap32[(r4+25)] = 1056964608;
	heap32[(r4+26)] = 0;
	heap32[(r4+27)] = 1061997773;
	r12 = 0;
	heap32[(r4+28)] = 1065353216;
	heap8[sp+-20] = r12;
	heap32[(r4+30)] = 1000593162;
	heap32[(r4+31)] = 1008981770;
	heap32[(r4+32)] = 1008981770;
	heap32[(r4+33)] = 1008981770;
	heap32[(r4+2)] = 1065353216;
	heap32[(r4+3)] = 0;
	heap32[(r4+4)] = 0;
	heap32[(r4+5)] = 0;
	heap32[(r4+6)] = 0;
	heap32[(r4+7)] = 1065353216;
	heap32[(r4+8)] = 0;
	heap32[(r4+9)] = 0;
	heap32[(r4+10)] = 0;
	heap32[(r4+11)] = 0;
	heap32[(r4+12)] = 1065353216;
	heap32[(r4+13)] = 0;
	heap32[(r4+14)] = 0;
	heap32[(r4+15)] = 0;
	heap32[(r4+16)] = 0;
	heap32[(r4+17)] = 0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	_ZN11btRigidBody14setupRigidBodyERKNS_27btRigidBodyConstructionInfoE(i7);
	heap8[r2] = r11;
}
	r2 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r3 = r2 >> 2;
	r4 = heap32[(r3+51)];
	r4 = r4 | 1;
	heap32[(r3+51)] = r4;
	heap32[(r3+84)] = 0;
	f3 =                         0;
	f4 = heapFloat[(r3+95)];
	f5 = heapFloat[(r3+94)];
	f6 = heapFloat[(r3+93)];
	f6 = f6*f3;
	f5 = f5*f3;
	heapFloat[(r3+89)] = f6;
	f4 = f4*f3;
	heapFloat[(r3+90)] = f5;
	heapFloat[(r3+91)] = f4;
	heap32[(r3+92)] = 0;
	heap32[(r3+97)] = 0;
	heap32[(r3+98)] = 0;
	heap32[(r3+99)] = 0;
	heap32[(r3+100)] = 0;
	f4 = heapFloat[(r3+87)];
	f5 = heapFloat[(r3+86)];
	f6 = heapFloat[(r3+85)];
	f6 = f6*f3;
	f5 = f5*f3;
	heapFloat[(r3+138)] = f6;
	f3 = f4*f3;
	heapFloat[(r3+139)] = f5;
	heapFloat[(r3+140)] = f3;
	heap32[(r3+141)] = 0;
}
else{
	r2 = r10;
}
	r3 = r6 >> 2;
	heap32[(r0+27)] = r2;
	heap32[(r0+22)] = heap32[(r3+21)];
	heap32[(r0+28)] = 0;
	heap32[(r0+21)] = 0;
	heap32[(r0+20)] = 0;
	r2 = r7 >> 2;
	f3 = heapFloat[(r0+5)];
	f4 = heapFloat[(r2+2)];
	f5 = heapFloat[(r0+6)];
	f6 = heapFloat[(r2+1)];
	f7 = heapFloat[(r0+4)];
	f8 = heapFloat[(r2)];
	f9 = f6*f5;
	f10 = f4*f3;
	f9 = f9-f10;
	f4 = f4*f7;
	f10 = f8*f5;
	f4 = f4-f10;
	heapFloat[(r0)] = f9;
	f8 = f8*f3;
	f6 = f6*f7;
	f6 = f8-f6;
	heapFloat[(r0+1)] = f4;
	heapFloat[(r0+2)] = f6;
	heap32[(r0+3)] = 0;
	if(r9 ==0) //_LBB614_36
{
	heap32[(r0+12)] = 0;
	heap32[(r0+13)] = 0;
	f10 =                         0;
	heap32[(r0+14)] = 0;
	heap32[(r0+15)] = 0;
	f11 = f10;
	f8 = f10;
}
else{
	r3 = r9 >> 2;
	f8 = heapFloat[(r3+64)];
	f10 = heapFloat[(r3+65)];
	f11 = heapFloat[(r3+68)];
	f12 = heapFloat[(r3+69)];
	f8 = f8*f9;
	f10 = f10*f4;
	f13 = heapFloat[(r3+66)];
	f14 = heapFloat[(r3+72)];
	f15 = heapFloat[(r3+73)];
	f16 = heapFloat[(r3+70)];
	f11 = f11*f9;
	f12 = f12*f4;
	f8 = f8+f10;
	f10 = f13*f6;
	f13 = heapFloat[(r3+74)];
	f14 = f14*f9;
	f15 = f15*f4;
	f11 = f11+f12;
	f12 = f16*f6;
	f8 = f8+f10;
	f10 = heapFloat[(r3+134)];
	f16 = heapFloat[(r3+136)];
	f17 = heapFloat[(r3+135)];
	f11 = f11+f12;
	f8 = f8*f10;
	f10 = f14+f15;
	f12 = f13*f6;
	f10 = f10+f12;
	f11 = f11*f17;
	heapFloat[(r0+12)] = f8;
	f10 = f10*f16;
	heapFloat[(r0+13)] = f11;
	heapFloat[(r0+14)] = f10;
	heap32[(r0+15)] = 0;
}
	r3 = r8 >> 2;
	f12 = heapFloat[(r3+2)];
	f13 = heapFloat[(r3+1)];
	f14 = heapFloat[(r3)];
	f15 = f12*f3;
	f16 = f13*f5;
	f15 = f15-f16;
	f16 = f14*f5;
	f12 = f12*f7;
	f12 = f16-f12;
	heapFloat[(r0+8)] = f15;
	f13 = f13*f7;
	f14 = f14*f3;
	f13 = f13-f14;
	heapFloat[(r0+9)] = f12;
	heapFloat[(r0+10)] = f13;
	heap32[(r0+11)] = 0;
	if(r10 ==0) //_LBB614_39
{
	heap32[(r0+16)] = 0;
	heap32[(r0+17)] = 0;
	f14 =                         0;
	heap32[(r0+18)] = 0;
	heap32[(r0+19)] = 0;
	f17 = f14;
	f16 = f14;
}
else{
	r4 = r10 >> 2;
	f14 = heapFloat[(r4+64)];
	f16 = heapFloat[(r4+65)];
	f17 = heapFloat[(r4+68)];
	f18 = heapFloat[(r4+69)];
	f14 = f14*f15;
	f16 = f16*f12;
	f19 = heapFloat[(r4+66)];
	f20 = heapFloat[(r4+72)];
	f21 = heapFloat[(r4+73)];
	f22 = heapFloat[(r4+70)];
	f17 = f17*f15;
	f18 = f18*f12;
	f14 = f14+f16;
	f16 = f19*f13;
	f19 = heapFloat[(r4+74)];
	f20 = f20*f15;
	f21 = f21*f12;
	f17 = f17+f18;
	f18 = f22*f13;
	f14 = f14+f16;
	f16 = heapFloat[(r4+134)];
	f22 = heapFloat[(r4+136)];
	f23 = heapFloat[(r4+135)];
	f17 = f17+f18;
	f14 = f14*f16;
	f16 = f20+f21;
	f18 = f19*f13;
	f16 = f16+f18;
	f17 = f17*f23;
	heapFloat[(r0+16)] = f14;
	f16 = f16*f22;
	heapFloat[(r0+17)] = f17;
	heapFloat[(r0+18)] = f16;
	heap32[(r0+19)] = 0;
}
	if(r9 !=0) //_LBB614_42
{
	f18 = heapFloat[(r2+1)];
	f19 = heapFloat[(r2+2)];
	f20 = heapFloat[(r2)];
	f21 = f11*f19;
	f22 = f10*f18;
	f10 = f10*f20;
	f19 = f8*f19;
	f23 = heapFloat[(r1)];
	f21 = f21-f22;
	f22 = heapFloat[(r1+1)];
	f10 = f10-f19;
	f8 = f8*f18;
	f11 = f11*f20;
	f18 = f23*f21;
	f10 = f22*f10;
	f19 = heapFloat[(r1+2)];
	f8 = f8-f11;
	r2 = r9 >> 2;
	f10 = f18+f10;
	f8 = f19*f8;
	f11 = heapFloat[(r2+84)];
	f8 = f10+f8;
	f8 = f11+f8;
}
else{
	f8 =                         0;
}
	if(r10 !=0) //_LBB614_45
{
	f10 = heapFloat[(r3+2)];
	f11 = heapFloat[(r3)];
	f18 = heapFloat[(r3+1)];
	f19 = f18*f16;
	f20 = f10*f17;
	f10 = f10*f14;
	f16 = f11*f16;
	f21 = heapFloat[(r1)];
	f19 = f19-f20;
	f20 = heapFloat[(r1+1)];
	f10 = f10-f16;
	f11 = f11*f17;
	f14 = f18*f14;
	f16 = f21*f19;
	f10 = f20*f10;
	f17 = heapFloat[(r1+2)];
	f14 = f11-f14;
	r1 = r10 >> 2;
	f10 = f16+f10;
	f14 = f17*f14;
	f11 = heapFloat[(r1+84)];
	f14 = f10+f14;
	f14 = f11+f14;
}
else{
	f14 =                         0;
}
	f8 = f8+f14;
	f0 = f0/f8;
	heapFloat[(r0+23)] = f0;
	if(r9 !=0) //_LBB614_48
{
	r1 = r9 >> 2;
	f8 = heapFloat[(r1+76)];
	f10 = heapFloat[(r1+77)];
	f8 = f7*f8;
	f10 = f3*f10;
	f11 = heapFloat[(r1+78)];
	f8 = f8+f10;
	f10 = f5*f11;
	f10 = f8+f10;
	f14 = heapFloat[(r1+80)];
	f11 = heapFloat[(r1+81)];
	f8 = heapFloat[(r1+82)];
}
else{
	f8 =                         0;
	f10 = f7*f8;
	f11 = f3*f8;
	f10 = f10+f11;
	f11 = f5*f8;
	f10 = f10+f11;
	f11 = f8;
	f14 = f8;
}
	f9 = f9*f14;
	f4 = f4*f11;
	f4 = f9+f4;
	f6 = f6*f8;
	f4 = f4+f6;
	f4 = f10+f4;
	if(r10 !=0) //_LBB614_51
{
	r1 = r10 >> 2;
	f6 = heapFloat[(r1+80)];
	f8 = heapFloat[(r1+81)];
	f6 = f15*f6;
	f12 = f12*f8;
	f15 = heapFloat[(r1+82)];
	f6 = f6+f12;
	f12 = f13*f15;
	f12 = f6+f12;
	f15 = heapFloat[(r1+76)];
	f13 = heapFloat[(r1+77)];
	f6 = heapFloat[(r1+78)];
}
else{
	f6 =                         0;
	f15 = f15*f6;
	f12 = f12*f6;
	f12 = f15+f12;
	f13 = f13*f6;
	f12 = f12+f13;
	f13 = f6;
	f15 = f6;
}
	f7 = f7*f15;
	f3 = f3*f13;
	f3 = f7+f3;
	f5 = f5*f6;
	f3 = f3+f5;
	f3 = f12-f3;
	f3 = f4+f3;
	f1 = f1-f3;
	f0 = f0*f1;
	heapFloat[(r0+29)] = f0;
	heapFloat[(r0+30)] = f2;
	heap32[(r0+31)] = 0;
	heap32[(r0+32)] = 1343554297;
	return;
}