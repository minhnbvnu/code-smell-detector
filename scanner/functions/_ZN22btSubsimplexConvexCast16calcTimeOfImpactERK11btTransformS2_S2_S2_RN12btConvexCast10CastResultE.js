function _ZN22btSubsimplexConvexCast16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(sp)
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
	i7 = sp + -240;var g0 = i7>>2; // save stack
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
	r7 = heap32[(fp+4)];
	r8 = heap32[(fp+3)];
	r3 = r3 & 240;
	heap8[r1+332] = r3;
	r1 = r5 >> 2;
	r3 = r8 >> 2;
	r5 = r6 >> 2;
	r6 = r7 >> 2;
	f0 = heapFloat[(r1+12)];
	f1 = heapFloat[(r5+12)];
	f2 = heapFloat[(r3+12)];
	f3 = heapFloat[(r6+12)];
	f4 = heapFloat[(r1+13)];
	f5 = heapFloat[(r5+13)];
	f6 = heapFloat[(r3+13)];
	f7 = heapFloat[(r6+13)];
	r7 = heap32[(r0+2)];
	f1 = f1-f0;
	f3 = f3-f2;
	f1 = f1-f3;
	heapFloat[(fp+-50)] = f1;
	f3 = heapFloat[(r1+14)];
	f8 = heapFloat[(r5+14)];
	f9 = heapFloat[(r3+14)];
	f10 = heapFloat[(r6+14)];
	r8 = r7 >> 2;
	f5 = f5-f4;
	f7 = f7-f6;
	f5 = f5-f7;
	heapFloat[(fp+-51)] = f5;
	f7 = heapFloat[(r1+4)];
	heapFloat[(fp+-42)] = f7;
	f11 = heapFloat[(r1)];
	heapFloat[(fp+-43)] = f11;
	f12 = -f1;
	r8 = heap32[(r8)];
	f8 = f8-f3;
	f10 = f10-f9;
	f13 = heapFloat[(r1+1)];
	heapFloat[(fp+-44)] = f13;
	f14 = heapFloat[(r1+5)];
	heapFloat[(fp+-45)] = f14;
	r8 = r8 >> 2;
	f8 = f8-f10;
	heapFloat[(fp+-52)] = f8;
	f10 = heapFloat[(r1+8)];
	heapFloat[(fp+-46)] = f10;
	f11 = f11*f12;
	f7 = f7*f5;
	f15 = heapFloat[(r1+2)];
	heapFloat[(fp+-47)] = f15;
	f16 = heapFloat[(r1+6)];
	f17 = heapFloat[(r1+9)];
	f18 = heapFloat[(r1+10)];
	f19 = heapFloat[(r3)];
	heapFloat[(fp+-33)] = f19;
	f19 = heapFloat[(r3+1)];
	heapFloat[(fp+-34)] = f19;
	f19 = heapFloat[(r3+2)];
	heapFloat[(fp+-35)] = f19;
	f19 = heapFloat[(r3+4)];
	heapFloat[(fp+-36)] = f19;
	f19 = heapFloat[(r3+5)];
	heapFloat[(fp+-37)] = f19;
	f19 = heapFloat[(r3+6)];
	heapFloat[(fp+-38)] = f19;
	f19 = heapFloat[(r3+8)];
	heapFloat[(fp+-39)] = f19;
	f19 = heapFloat[(r3+9)];
	heapFloat[(fp+-40)] = f19;
	f19 = heapFloat[(r3+10)];
	heapFloat[(fp+-41)] = f19;
	r8 = heap32[(r8+15)];
	f13 = f13*f12;
	f14 = f14*f5;
	f7 = f11-f7;
	f10 = f10*f8;
	r9 = sp + -112;
	f11 = f15*f12;
	f12 = f16*f5;
	f13 = f13-f14;
	f14 = f17*f8;
	f7 = f7-f10;
	r10 = r9 >> 2;
	f10 = f11-f12;
	f11 = f18*f8;
	f12 = f13-f14;
	heapFloat[(fp+-28)] = f7;
	f7 = f10-f11;
	heapFloat[(r10+1)] = f12;
	heapFloat[(r10+2)] = f7;
	heap32[(r10+3)] = 0;
	r10 = sp + -128;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r9;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r7 = heap32[(r0+3)];
	r8 = r7 >> 2;
	r8 = heap32[(r8)];
	f7 = heapFloat[(r3)];
	f10 = heapFloat[(r3+4)];
	r9 = r10 >> 2;
	r8 = r8 >> 2;
	f11 = heapFloat[(r3+1)];
	f12 = heapFloat[(r3+5)];
	f13 = heapFloat[(r3+8)];
	f7 = f7*f1;
	f10 = f10*f5;
	f14 = heapFloat[(r3+2)];
	f15 = heapFloat[(r3+6)];
	f19 = heapFloat[(r3+10)];
	f20 = heapFloat[(r3+9)];
	r8 = heap32[(r8+15)];
	f11 = f11*f1;
	f12 = f12*f5;
	f7 = f7+f10;
	f10 = f13*f8;
	f13 = heapFloat[(r1)];
	heapFloat[(fp+-48)] = f13;
	f21 = heapFloat[(fp+-32)];
	f22 = heapFloat[(r1+4)];
	f23 = heapFloat[(r1+8)];
	heapFloat[(fp+-49)] = f23;
	f24 = heapFloat[(r1+1)];
	f25 = heapFloat[(r9+1)];
	f26 = heapFloat[(r1+5)];
	f27 = heapFloat[(r1+9)];
	f28 = heapFloat[(r1+2)];
	f29 = heapFloat[(r9+2)];
	f30 = heapFloat[(r1+6)];
	f13 = heapFloat[(r1+10)];
	heapFloat[(fp+-54)] = f13;
	f13 = heapFloat[(r1+12)];
	heapFloat[(fp+-53)] = f13;
	f13 = heapFloat[(r1+13)];
	heapFloat[(fp+-56)] = f13;
	f13 = heapFloat[(r1+14)];
	heapFloat[(fp+-55)] = f13;
	r9 = sp + -80;
	f1 = f14*f1;
	f5 = f15*f5;
	f11 = f11+f12;
	f12 = f20*f8;
	f7 = f7+f10;
	r10 = r9 >> 2;
	f1 = f1+f5;
	f5 = f19*f8;
	f8 = f11+f12;
	heapFloat[(fp+-20)] = f7;
	f1 = f1+f5;
	heapFloat[(r10+1)] = f8;
	heapFloat[(r10+2)] = f1;
	heap32[(r10+3)] = 0;
	r10 = sp + -96;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r9;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r7 = r10 >> 2;
	f1 = heapFloat[(r3)];
	f5 = heapFloat[(fp+-24)];
	f7 = heapFloat[(r3+4)];
	f8 = heapFloat[(r3+1)];
	f10 = heapFloat[(r7+1)];
	f11 = heapFloat[(r3+5)];
	f12 = heapFloat[(r3+8)];
	f14 = heapFloat[(r3+9)];
	f13 = heapFloat[(fp+-48)];
	f13 = f13*f21;
	f15 = f24*f25;
	f1 = f1*f5;
	f8 = f8*f10;
	f19 = heapFloat[(r3+2)];
	f20 = heapFloat[(r7+2)];
	f24 = heapFloat[(r3+6)];
	f22 = f22*f21;
	f26 = f26*f25;
	f7 = f7*f5;
	f11 = f11*f10;
	f23 = heapFloat[(r3+10)];
	f13 = f13+f15;
	f15 = f28*f29;
	f1 = f1+f8;
	f8 = f19*f20;
	f19 = f22+f26;
	f22 = f30*f29;
	f7 = f7+f11;
	f11 = f24*f20;
	f24 = heapFloat[(fp+-49)];
	f21 = f24*f21;
	f24 = f27*f25;
	f5 = f12*f5;
	f10 = f14*f10;
	f12 = f13+f15;
	f13 = f19+f22;
	f1 = f1+f8;
	f8 = heapFloat[(r3+12)];
	f7 = f7+f11;
	f11 = heapFloat[(r3+13)];
	f14 = f21+f24;
	f15 = heapFloat[(fp+-54)];
	f15 = f15*f29;
	f5 = f5+f10;
	f10 = f23*f20;
	f14 = f14+f15;
	f15 = heapFloat[(fp+-53)];
	f12 = f12+f15;
	f1 = f1+f8;
	f8 = heapFloat[(fp+-56)];
	f8 = f13+f8;
	f7 = f7+f11;
	f5 = f5+f10;
	f10 = heapFloat[(r3+14)];
	f1 = f12-f1;
	f7 = f8-f7;
	f13 = heapFloat[(fp+-55)];
	f8 = f14+f13;
	f5 = f5+f10;
	f5 = f8-f5;
	f8 = f1*f1;
	f10 = f7*f7;
	f8 = f8+f10;
	f10 = f5*f5;
	r7 = heap32[(fp+5)];
	f8 = f8+f10;
	r8 = -33;
	f10 =                         0;
	heapFloat[(fp+-48)] = f10;
	heapFloat[(fp+-49)] = f10;
	f11 = f10;
_1: while(true){
	f12 =   9.9999997473787516e-005;
	if(f8 <=f12) //_LBB566_22
{
__label__ = 19;
break _1;
}
else{
	r8 = (r8 + 1)|0;
	if(r8 !=0) //_LBB566_1
{
	r9 = heap32[(r0+2)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	f8 = -f1;
	r10 = r10 >> 2;
	f12 = heapFloat[(fp+-43)];
	f12 = f12*f8;
	f13 = heapFloat[(fp+-42)];
	f13 = f13*f7;
	r10 = heap32[(r10+15)];
	f14 = heapFloat[(fp+-44)];
	f14 = f14*f8;
	f15 = heapFloat[(fp+-45)];
	f15 = f15*f7;
	f12 = f12-f13;
	f13 = heapFloat[(fp+-46)];
	f13 = f13*f5;
	r11 = sp + -48;
	f19 = heapFloat[(fp+-47)];
	f8 = f19*f8;
	f19 = f16*f7;
	f14 = f14-f15;
	f15 = f17*f5;
	f12 = f12-f13;
	r12 = r11 >> 2;
	f8 = f8-f19;
	f13 = f18*f5;
	f14 = f14-f15;
	heapFloat[(fp+-12)] = f12;
	f8 = f8-f13;
	heapFloat[(r12+1)] = f14;
	heapFloat[(r12+2)] = f8;
	heap32[(r12+3)] = 0;
	r12 = sp + -64;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r11;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r9 = heap32[(r0+3)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r11 = r12 >> 2;
	r10 = r10 >> 2;
	f8 = heapFloat[(fp+-33)];
	f8 = f8*f1;
	f12 = heapFloat[(fp+-36)];
	f12 = f12*f7;
	f13 = heapFloat[(fp+-16)];
	f14 = heapFloat[(r11+1)];
	f15 = heapFloat[(r11+2)];
	r10 = heap32[(r10+15)];
	f19 = heapFloat[(fp+-34)];
	f19 = f19*f1;
	f20 = heapFloat[(fp+-37)];
	f20 = f20*f7;
	f8 = f8+f12;
	f12 = heapFloat[(fp+-39)];
	f12 = f12*f5;
	r11 = sp + -16;
	f21 = heapFloat[(fp+-35)];
	f21 = f21*f1;
	f22 = heapFloat[(fp+-38)];
	f22 = f22*f7;
	f19 = f19+f20;
	f20 = heapFloat[(fp+-40)];
	f20 = f20*f5;
	f8 = f8+f12;
	r12 = r11 >> 2;
	f12 = f21+f22;
	f21 = heapFloat[(fp+-41)];
	f21 = f21*f5;
	f19 = f19+f20;
	heapFloat[(fp+-4)] = f8;
	f8 = f12+f21;
	heapFloat[(r12+1)] = f19;
	heapFloat[(r12+2)] = f8;
	heap32[(r12+3)] = 0;
	r12 = sp + -32;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r11;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	f12 =                         1;
	if(f11 >f12) //_LBB566_27
{
__label__ = 24;
break _1;
}
else{
	r9 = r12 >> 2;
	f8 = heapFloat[(fp+-8)];
	f19 = heapFloat[(r9+1)];
	f20 = heapFloat[(r9+2)];
	f21 = heapFloat[(fp+-43)];
	f21 = f21*f13;
	f22 = heapFloat[(fp+-44)];
	f22 = f22*f14;
	f23 = heapFloat[(fp+-33)];
	f23 = f23*f8;
	f24 = heapFloat[(fp+-34)];
	f24 = f24*f19;
	f25 = heapFloat[(fp+-42)];
	f25 = f25*f13;
	f26 = heapFloat[(fp+-45)];
	f26 = f26*f14;
	f27 = heapFloat[(fp+-36)];
	f27 = f27*f8;
	f28 = heapFloat[(fp+-37)];
	f28 = f28*f19;
	f21 = f21+f22;
	f22 = heapFloat[(fp+-47)];
	f22 = f22*f15;
	f23 = f23+f24;
	f24 = heapFloat[(fp+-35)];
	f24 = f24*f20;
	f25 = f25+f26;
	f26 = f16*f15;
	f27 = f27+f28;
	f28 = heapFloat[(fp+-38)];
	f28 = f28*f20;
	f29 = heapFloat[(fp+-46)];
	f13 = f29*f13;
	f14 = f17*f14;
	f29 = heapFloat[(fp+-39)];
	f8 = f29*f8;
	f29 = heapFloat[(fp+-40)];
	f19 = f29*f19;
	f21 = f21+f22;
	f22 = f23+f24;
	f23 = f25+f26;
	f24 = f27+f28;
	f13 = f13+f14;
	f14 = f18*f15;
	f8 = f8+f19;
	f15 = heapFloat[(fp+-41)];
	f15 = f15*f20;
	f19 = f21+f0;
	f20 = f22+f2;
	f21 = f23+f4;
	f22 = f24+f6;
	f13 = f13+f14;
	f8 = f8+f15;
	f14 = f19-f20;
	f15 = f21-f22;
	f13 = f13+f3;
	f23 = f8+f9;
	f24 = f13-f23;
	f8 = f1*f14;
	f25 = f7*f15;
	f8 = f8+f25;
	f25 = f5*f24;
	f25 = f8+f25;
	f8 =                         0;
	if(f25 >f8) //_LBB566_4
{
	f0 = heapFloat[(fp+-50)];
	f0 = f1*f0;
	f2 = heapFloat[(fp+-51)];
	f2 = f7*f2;
	f0 = f0+f2;
	f2 = heapFloat[(fp+-52)];
	f2 = f5*f2;
	f0 = f0+f2;
	f2 =  -1.4210854715202004e-014;
	if(f0 >=f2) //_LBB566_27
{
__label__ = 24;
break _1;
}
else{
	f0 = f25/f0;
	f11 = f11-f0;
	f0 = heapFloat[(r5+12)];
	f2 = heapFloat[(r5+13)];
	f3 = heapFloat[(r5+14)];
	f4 = heapFloat[(r6+12)];
	f6 = heapFloat[(r6+13)];
	f9 = heapFloat[(r6+14)];
	f10 = heapFloat[(r1+12)];
	f12 = f12-f11;
	f25 = heapFloat[(r1+13)];
	f26 = heapFloat[(r1+14)];
	f27 = heapFloat[(r3+12)];
	f28 = heapFloat[(r3+13)];
	f29 = heapFloat[(r3+14)];
	f10 = f10*f12;
	f0 = f0*f11;
	f25 = f25*f12;
	f2 = f2*f11;
	f26 = f26*f12;
	f3 = f3*f11;
	f27 = f27*f12;
	f30 = f4*f11;
	f28 = f28*f12;
	f6 = f6*f11;
	f12 = f29*f12;
	f9 = f9*f11;
	f0 = f10+f0;
	f4 = f25+f2;
	f3 = f26+f3;
	f2 = f27+f30;
	f6 = f28+f6;
	f9 = f12+f9;
	f10 = f1;
	heapFloat[(fp+-48)] = f7;
	heapFloat[(fp+-49)] = f5;
}
}
	r9 = heap32[(r0+1)];
	r10 = r9 >> 2;
	r11 = heap32[(r10)];
_10: do {
	if(r11 >0) //_LBB566_8
{
	r12 = -12;
	f1 = heapFloat[(r10+77)];
	r13 = (r12 - r9)|0;
	r14 = 0;
	r15 = r11;
	r12 = r14;
_12: while(true){
	r16 = -8;
	r17 = -4;
	r16 = (r16 - r13)|0;
	r17 = (r17 - r13)|0;
	r16 = r16 >> 2;
	r17 = r17 >> 2;
	r18 = (r14 - r13)|0;
	r18 = r18 >> 2;
	f5 = heapFloat[(r16)];
	f7 = heapFloat[(r17)];
	f5 = f14-f5;
	f7 = f15-f7;
	f12 = heapFloat[(r18)];
	f12 = f24-f12;
	f5 = f5*f5;
	f7 = f7*f7;
	f5 = f5+f7;
	f7 = f12*f12;
	f5 = f5+f7;
	r15 = (r15 + -1)|0;
	r12 = f5 > f1 ? r12 : r4;
	r13 = (r13 + -16)|0;
if(!(r15 !=0)) //_LBB566_9
{
break _10;
}
}
}
else{
	r12 = r2;
}
} while(0);
	f1 = heapFloat[(r10+76)];
	if(f1 ==f8) //_LBB566_12
{
	f1 = heapFloat[(r10+75)];
if(!(f24 !=f1)) //_LBB566_11
{
	f1 = heapFloat[(r10+74)];
if(!(f15 !=f1)) //_LBB566_11
{
	f1 = heapFloat[(r10+73)];
	r12 = f14 != f1 ? r12 : r4;
}
}
}
	r12 = r12 & 255;
	if(r12 ==0) //_LBB566_17
{
	heapFloat[(r10+73)] = f14;
	heapFloat[(r10+74)] = f15;
	r11 = r11 << 4;
	heapFloat[(r10+75)] = f24;
	r11 = (r9 + r11)|0;
	heap32[(r10+76)] = 0;
	r11 = r11 >> 2;
	heap8[r9+356] = r4;
	heapFloat[(r11+1)] = f14;
	heapFloat[(r11+2)] = f15;
	heapFloat[(r11+3)] = f24;
	heap32[(r11+4)] = 0;
	r11 = heap32[(r10)];
	r11 = r11 << 4;
	r11 = (r9 + r11)|0;
	r11 = r11 >> 2;
	heapFloat[(r11+21)] = f19;
	heapFloat[(r11+22)] = f21;
	heapFloat[(r11+23)] = f13;
	heap32[(r11+24)] = 0;
	r11 = heap32[(r10)];
	r11 = r11 << 4;
	r9 = (r9 + r11)|0;
	r9 = r9 >> 2;
	heapFloat[(r9+41)] = f20;
	heapFloat[(r9+42)] = f22;
	heapFloat[(r9+43)] = f23;
	heap32[(r9+44)] = 0;
	r9 = heap32[(r10)];
	r9 = (r9 + 1)|0;
	heap32[(r10)] = r9;
	r9 = heap32[(r0+1)];
}
	heap32[(g0)] = r9;
	_ZN22btVoronoiSimplexSolver28updateClosestVectorAndPointsEv(i7);
	r10 = r_g0;
	r9 = r9 >> 2;
	f1 = heapFloat[(r9+69)];
	f7 = heapFloat[(r9+70)];
	f5 = heapFloat[(r9+71)];
	if(r10 ==0) //_LBB566_20
{
continue _1;
}
else{
	f8 = f1*f1;
	f12 = f7*f7;
	f8 = f8+f12;
	f12 = f5*f5;
	f8 = f8+f12;
continue _1;
}
}
}
else{
__label__ = 19;
break _1;
}
}
}
if (__label__ == 19){
	f0 = f10*f10;
	f7 = heapFloat[(fp+-48)];
	f1 = f7*f7;
	f0 = f0+f1;
	f1 = heapFloat[(fp+-49)];
	f1 = f1*f1;
	f0 = f0+f1;
	r1 = r7 >> 2;
	heapFloat[(r1+41)] = f11;
	f1 =   1.4210854715202004e-014;
	if(f0 <f1) //_LBB566_24
{
	heap32[(r1+33)] = 0;
	heap32[(r1+34)] = 0;
	f0 =                         0;
	heap32[(r1+35)] = 0;
	heap32[(r1+36)] = 0;
	f2 = f0;
	f1 = f0;
}
else{
	heapFloat[(g0)] = f0;
	f0 =                         1;
	sqrtf(i7);
	f0 = f0/f_g0;
	f1 = f10*f0;
	f7 = heapFloat[(fp+-48)];
	f2 = f7*f0;
	heapFloat[(r1+33)] = f1;
	f11 = heapFloat[(fp+-49)];
	f0 = f11*f0;
	heapFloat[(r1+34)] = f2;
	heapFloat[(r1+35)] = f0;
	heap32[(r1+36)] = 0;
}
	f3 = heapFloat[(fp+-50)];
	f1 = f1*f3;
	f3 = heapFloat[(fp+-51)];
	f2 = f2*f3;
	f3 = heapFloat[(r1+43)];
	f1 = f1+f2;
	f2 = heapFloat[(fp+-52)];
	f0 = f0*f2;
	f0 = f1+f0;
	f1 = -f3;
if(!(f0 >=f1)) //_LBB566_27
{
	r0 = heap32[(r0+1)];
	heap32[(g0)] = r0;
	r0 = r0 >> 2;
	_ZN22btVoronoiSimplexSolver28updateClosestVectorAndPointsEv(i7);
	f0 = heapFloat[(r0+68)];
	f1 = heapFloat[(r0+67)];
	f2 = heapFloat[(r0+66)];
	heap32[(r1+37)] = heap32[(r0+65)];
	heapFloat[(r1+38)] = f2;
	heapFloat[(r1+39)] = f1;
	heapFloat[(r1+40)] = f0;
	r0 = 1;
	r_g0 = r0;
	return;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}