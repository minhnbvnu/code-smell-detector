function _ZN23btConvexConvexAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
	i7 = sp + -816;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+5)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	r6 = heap32[(fp+4)];
	if(r2 ==0) //_LBB301_2
{
	r2 = heap32[(r1+1)];
	r7 = r2 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r2 = r_g0;
	r7 = 1;
	heap32[(r1+5)] = r2;
	heap8[r0+16] = r7;
}
	r7 = r6 >> 2;
	r8 = r3 >> 2;
	heap32[(r7+1)] = r2;
	r2 = r4 >> 2;
	r9 = heap32[(r8+48)];
	r10 = heap32[(r2+48)];
	r11 = r9 >> 2;
	r12 = heap32[(r11+1)];
	if(r12 !=10) //_LBB301_5
{
__label__ = 4;
}
else{
	r12 = r10 >> 2;
	r13 = heap32[(r12+1)];
	if(r13 ==10) //_LBB301_6
{
	r0 = heap32[(r11)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+7)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	r0 = heap32[(r12)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+7)];
	heap32[(g0)] = r10;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	r0 = heap32[(r11+13)];
	r5 = heap32[(r12+13)];
	r11 = r5 << 2;
	r12 = r0 << 2;
	r3 = (r3 + r12)|0;
	r4 = (r4 + r11)|0;
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	r5 = (r5 + 2)|0;
	r0 = (r0 + 2)|0;
	f0 = heapFloat[(r3+1)];
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(r3+5)];
	f3 = heapFloat[(r4+5)];
	r5 = (r5 % 3)|0;
	r0 = (r0 % 3)|0;
	f4 = heapFloat[(r3+9)];
	f5 = heapFloat[(r4+9)];
	f6 = f0*f1;
	f7 = f2*f3;
	f8 = heapFloat[(r2+13)];
	f9 = heapFloat[(r8+13)];
	f10 = heapFloat[(r2+14)];
	f11 = heapFloat[(r8+14)];
	f8 = f8-f9;
	f9 = f10-f11;
	r3 = (r10 + 28)|0;
	r4 = r5 << 2;
	r5 = (r9 + 28)|0;
	r0 = r0 << 2;
	f6 = f6+f7;
	f7 = f4*f5;
	f10 = heapFloat[(r2+15)];
	f11 = heapFloat[(r8+15)];
	f10 = f10-f11;
	f6 = f6+f7;
	r1 = heap32[(r1+5)];
	r4 = (r3 + r4)|0;
	r3 = (r3 + r11)|0;
	r0 = (r5 + r0)|0;
	r5 = (r5 + r12)|0;
	f7 = f0*f8;
	f11 = f2*f9;
	f12 = f1*f8;
	f13 = f3*f9;
	r1 = r1 >> 2;
	r4 = r4 >> 2;
	r3 = r3 >> 2;
	r0 = r0 >> 2;
	r5 = r5 >> 2;
	f14 =                         1;
	f15 = f6*f6;
	f7 = f7+f11;
	f11 = f4*f10;
	f12 = f12+f13;
	f13 = f5*f10;
	f15 = f14-f15;
	f16 = heapFloat[(r1+280)];
	f17 = heapFloat[(r4)];
	f18 = heapFloat[(r3)];
	f19 = heapFloat[(r0)];
	f20 = heapFloat[(r5)];
	f7 = f7+f11;
	f11 = f12+f13;
	f12 =                         0;
	if(f15 !=f12) //_LBB301_8
{
	f13 = f11*f6;
	f13 = f7-f13;
	f13 = f13/f15;
	f15 = -f20;
	if(f13 >=f15) //_LBB301_10
{
	if(f13 >f20) //_LBB301_12
{
	f15 = f20;
}
else{
	f15 = f13;
}
}
}
else{
	f15 =                         0;
}
	f13 = f15*f6;
	f11 = f13-f11;
	f13 = -f18;
	if(f11 >=f13) //_LBB301_19
{
	if(f11 >f18) //_LBB301_21
{
	f13 = f6*f18;
	f6 = f13+f7;
	f15 = -f20;
	if(f6 >=f15) //_LBB301_23
{
	if(f6 >f20) //_LBB301_25
{
	f13 = f18;
	f15 = f20;
}
else{
	f13 = f18;
	f15 = f6;
}
}
else{
	f13 = f18;
}
}
else{
	f13 = f11;
}
}
else{
	f6 = f6*f13;
	f6 = f6+f7;
	f15 = -f20;
	if(f6 >=f15) //_LBB301_16
{
	if(f6 >f20) //_LBB301_18
{
	f15 = f20;
}
else{
	f15 = f6;
}
}
}
	f6 = f0*f15;
	f7 = f2*f15;
	f1 = f1*f13;
	f6 = f8-f6;
	f3 = f3*f13;
	f7 = f9-f7;
	f8 = f4*f15;
	f6 = f6+f1;
	f7 = f7+f3;
	f5 = f5*f13;
	f8 = f10-f8;
	f8 = f8+f5;
	f9 = f6*f6;
	f10 = f7*f7;
	f9 = f9+f10;
	f10 = f8*f8;
	f9 = f9+f10;
	heapFloat[(g0)] = f9;
	sqrtf(i7);
	f10 = f_g0-f19;
	f10 = f10-f17;
if(!(f10 >f16)) //_LBB301_36
{
	f11 =   1.4210854715202004e-014;
	if(f9 >f11) //_LBB301_34
{
	heapFloat[(g0)] = f9;
	f0 =                        -1;
	sqrtf(i7);
	f0 = f0/f_g0;
	f9 = f6*f0;
	r0 = sp + -16;
	f6 = f7*f0;
	r0 = r0 >> 2;
	heapFloat[(fp+-4)] = f9;
	f12 = f8*f0;
	heapFloat[(r0+1)] = f6;
	heapFloat[(r0+2)] = f12;
	heap32[(r0+3)] = 0;
}
else{
	if(f4 <f12) //_LBB301_30
{
	f6 = -f4;
}
else{
	f6 = f4;
}
	f7 =       0.70710676908493042;
	if(f6 <=f7) //_LBB301_33
{
	f6 = f0*f0;
	f9 = f2*f2;
	f6 = f6+f9;
	heapFloat[(g0)] = f6;
	sqrtf(i7);
	f6 = f14/f_g0;
	f9 = -f2;
	f9 = f6*f9;
	r0 = sp + -16;
	f6 = f0*f6;
	r0 = r0 >> 2;
	heapFloat[(fp+-4)] = f9;
	heapFloat[(r0+1)] = f6;
	heap32[(r0+2)] = 0;
}
else{
	f0 = f2*f2;
	f6 = f4*f4;
	f0 = f0+f6;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	r0 = sp + -16;
	f0 = f14/f_g0;
	f6 = -f4;
	f6 = f0*f6;
	r0 = r0 >> 2;
	heap32[(fp+-4)] = 0;
	f9 =                         0;
	f12 = f2*f0;
	heapFloat[(r0+1)] = f6;
	heapFloat[(r0+2)] = f12;
}
}
	f0 = heapFloat[(r2+13)];
	f2 = heapFloat[(r2+14)];
	f4 = heapFloat[(r2+15)];
	f0 = f0+f1;
	f1 = f9*f17;
	r0 = sp + -32;
	f2 = f2+f3;
	f3 = f6*f17;
	f0 = f0+f1;
	r0 = r0 >> 2;
	f1 = f4+f5;
	f4 = f12*f17;
	f2 = f2+f3;
	heapFloat[(fp+-8)] = f0;
	f0 = f1+f4;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
}
if(!(f10 >=f16)) //_LBB301_40
{
	r0 = sp + -16;
	r1 = r0 >> 2;
	f0 = heapFloat[(fp+-4)];
	f1 = heapFloat[(r1+1)];
	f2 = heapFloat[(r1+2)];
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	f1 =   1.4210854715202004e-014;
	if(f0 >=f1) //_LBB301_39
{
	r1 = heap32[(r7)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+4)];
	r2 = sp + -32;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	heapFloat[(g0+3)] = f10;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
else{
	r0 = _2E_str4119;
	r1 = _2E_str5120;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 325;
	_assert(i7);
}
}
	r0 = heap32[(r7+1)];
	if(r0 !=0) //_LBB301_42
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	if(r2 ==0) //_LBB301_47
{
__label__ = 44;
}
else{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r7+34)];
	if(r1 ==r2) //_LBB301_46
{
__label__ = 43;
}
else{
	r1 = (r6 + 72)|0;
	r2 = (r6 + 8)|0;
__label__ = 42;
}
}
}
else{
	r0 = _2E_str59;
	r1 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
else{
__label__ = 4;
}
}
if (__label__ == 4){
	r3 = sp + -168;
	r4 = r3 >> 2;
	heap32[(r4+32)] = 1566444395;
	heap32[(r4+33)] = 0;
	r12 = _ZTV17btGjkPairDetector;
	r13 = heap32[(r1+2)];
	r14 = heap32[(r1+3)];
	r15 = sp + -248;
	r12 = (r12 + 8)|0;
	heap32[(fp+-62)] = r12;
	r12 = r15 >> 2;
	heap32[(r12+1)] = 0;
	heap32[(r12+2)] = 1065353216;
	heap32[(r12+3)] = 0;
	heap32[(r12+4)] = 0;
	heap32[(r12+5)] = r14;
	heap32[(r12+6)] = r13;
	heap32[(r12+7)] = r9;
	heap32[(r12+8)] = r10;
	r13 = heap32[(r11+1)];
	heap32[(r12+9)] = r13;
	r13 = r10 >> 2;
	r14 = heap32[(r13+1)];
	heap32[(r12+10)] = r14;
	r14 = heap32[(r11)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+11)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r14)>>2](i7);
	heapFloat[(r12+11)] = f_g0;
	r14 = heap32[(r13)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+11)];
	heap32[(g0)] = r10;
	__FUNCTION_TABLE__[(r14)>>2](i7);
	r14 = 0;
	heapFloat[(r12+12)] = f_g0;
	heap8[sp+-196] = r14;
	heap32[(r12+15)] = -1;
	heap32[(r12+18)] = 1;
	heap32[(r12+7)] = r9;
	heap32[(r12+8)] = r10;
	r16 = heap32[(r11)];
	r16 = r16 >> 2;
	r17 = heapU8[r5+40];
	r16 = heap32[(r16+11)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r16)>>2](i7);
	f0 = f_g0;
	r16 = heap32[(r13)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+11)];
	heap32[(g0)] = r10;
	__FUNCTION_TABLE__[(r16)>>2](i7);
	f0 = f0+f_g0;
	r16 = heap32[(r1+5)];
	if(r17 ==0) //_LBB301_49
{
	r16 = (r16 + 1120)|0;
}
else{
	r16 = (r16 + 1124)|0;
}
	r16 = r16 >> 2;
	f1 = heapFloat[(r16)];
	f0 = f0+f1;
	f0 = f0*f0;
	r5 = r5 >> 2;
	heapFloat[(r4+32)] = f0;
	r16 = heap32[(r5+11)];
	heap32[(r4+33)] = r16;
	heap32[(fp+-42)] = heap32[(r8+1)];
	heap32[(r4+1)] = heap32[(r8+2)];
	heap32[(r4+2)] = heap32[(r8+3)];
	heap32[(r4+3)] = heap32[(r8+4)];
	heap32[(r4+4)] = heap32[(r8+5)];
	heap32[(r4+5)] = heap32[(r8+6)];
	heap32[(r4+6)] = heap32[(r8+7)];
	heap32[(r4+7)] = heap32[(r8+8)];
	heap32[(r4+8)] = heap32[(r8+9)];
	heap32[(r4+9)] = heap32[(r8+10)];
	heap32[(r4+10)] = heap32[(r8+11)];
	heap32[(r4+11)] = heap32[(r8+12)];
	heap32[(r4+12)] = heap32[(r8+13)];
	heap32[(r4+13)] = heap32[(r8+14)];
	heap32[(r4+14)] = heap32[(r8+15)];
	heap32[(r4+15)] = heap32[(r8+16)];
	heap32[(r4+16)] = heap32[(r2+1)];
	heap32[(r4+17)] = heap32[(r2+2)];
	heap32[(r4+18)] = heap32[(r2+3)];
	heap32[(r4+19)] = heap32[(r2+4)];
	heap32[(r4+20)] = heap32[(r2+5)];
	heap32[(r4+21)] = heap32[(r2+6)];
	heap32[(r4+22)] = heap32[(r2+7)];
	heap32[(r4+23)] = heap32[(r2+8)];
	heap32[(r4+24)] = heap32[(r2+9)];
	heap32[(r4+25)] = heap32[(r2+10)];
	heap32[(r4+26)] = heap32[(r2+11)];
	heap32[(r4+27)] = heap32[(r2+12)];
	heap32[(r4+28)] = heap32[(r2+13)];
	heap32[(r4+29)] = heap32[(r2+14)];
	heap32[(r4+30)] = heap32[(r2+15)];
	heap32[(r4+31)] = heap32[(r2+16)];
	r16 = heap32[(r5+5)];
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r16;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r16 = heap32[(r1+7)];
_63: do {
if(!(r16 ==0)) //_LBB301_73
{
	r16 = heap32[(r7+1)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+279)];
	r17 = heap32[(r1+8)];
if(!(r16 >=r17)) //_LBB301_73
{
	f0 = heapFloat[(r12+1)];
	f1 = heapFloat[(r12+2)];
	f2 = heapFloat[(r12+3)];
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	heapFloat[(fp+-169)] = f1;
	f2 = heapFloat[(r12+3)];
	f0 = f1/f_g0;
	f1 = heapFloat[(r12+2)];
	f3 = heapFloat[(r12+1)];
	f2 = f2*f0;
	heapFloat[(fp+-171)] = f2;
	f1 = f1*f0;
	heapFloat[(fp+-170)] = f1;
	f0 = f3*f0;
	heapFloat[(fp+-174)] = f0;
	f0 =                         0;
	heapFloat[(fp+-175)] = f0;
	if(f2 <f0) //_LBB301_54
{
	f0 = f2;
	f0 = -f0;
}
else{
	f0 = heapFloat[(fp+-171)];
}
	f1 =       0.70710676908493042;
	if(f0 <=f1) //_LBB301_57
{
	f0 = heapFloat[(fp+-174)];
	f1 = f0*f0;
	f2 = heapFloat[(fp+-170)];
	f3 = f2*f2;
	f1 = f1+f3;
	heapFloat[(g0)] = f1;
	sqrtf(i7);
	f3 = heapFloat[(fp+-169)];
	f1 = f3/f_g0;
	f2 = -f2;
	f2 = f1*f2;
	heapFloat[(fp+-173)] = f2;
	f0 = f0*f1;
	heapFloat[(fp+-172)] = f0;
}
else{
	f0 = heapFloat[(fp+-170)];
	f1 = f0*f0;
	f2 = heapFloat[(fp+-171)];
	f3 = f2*f2;
	f1 = f1+f3;
	heapFloat[(g0)] = f1;
	sqrtf(i7);
	f3 = heapFloat[(fp+-169)];
	f1 = f3/f_g0;
	f2 = -f2;
	f2 = f1*f2;
	heapFloat[(fp+-172)] = f2;
	f0 = f0*f1;
	heapFloat[(fp+-175)] = f0;
	f0 =                         0;
	heapFloat[(fp+-173)] = f0;
}
	r11 = heap32[(r11)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+4)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	f0 = f_g0;
	heapFloat[(fp+-194)] = f0;
	r9 = heap32[(r13)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+4)];
	heap32[(g0)] = r10;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	f1 = f_g0;
	heapFloat[(fp+-195)] = f1;
	r9 = f0 < f1;
	f2 =      0.019999999552965164;
	f3 = f0 < f1 ? f0 : f1;
	r9 = r9 & 1;
	f2 = f2/f3;
	if(f0 >=f1) //_LBB301_60
{
	f0 = heapFloat[(r4+16)];
	heapFloat[(fp+-176)] = f0;
	f0 = heapFloat[(r4+17)];
	heapFloat[(fp+-177)] = f0;
	f0 = heapFloat[(r4+18)];
	heapFloat[(fp+-178)] = f0;
	f0 = heapFloat[(r4+19)];
	heapFloat[(fp+-179)] = f0;
	f0 = heapFloat[(r4+20)];
	heapFloat[(fp+-180)] = f0;
	f0 = heapFloat[(r4+21)];
	heapFloat[(fp+-181)] = f0;
	f0 = heapFloat[(r4+22)];
	heapFloat[(fp+-182)] = f0;
	f0 = heapFloat[(r4+23)];
	heapFloat[(fp+-183)] = f0;
	f0 = heapFloat[(r4+24)];
	heapFloat[(fp+-184)] = f0;
	f0 = heapFloat[(r4+25)];
	heapFloat[(fp+-185)] = f0;
	f0 = heapFloat[(r4+26)];
	heapFloat[(fp+-186)] = f0;
	f0 = heapFloat[(r4+27)];
	heapFloat[(fp+-187)] = f0;
	f0 = heapFloat[(r4+28)];
	heapFloat[(fp+-188)] = f0;
	f0 = heapFloat[(r4+29)];
	heapFloat[(fp+-189)] = f0;
	f0 = heapFloat[(r4+30)];
	heapFloat[(fp+-190)] = f0;
	f0 = heapFloat[(r4+31)];
	heapFloat[(fp+-191)] = f0;
}
else{
	f0 = heapFloat[(fp+-42)];
	heapFloat[(fp+-176)] = f0;
	f0 = heapFloat[(r4+1)];
	heapFloat[(fp+-177)] = f0;
	f0 = heapFloat[(r4+2)];
	heapFloat[(fp+-178)] = f0;
	f0 = heapFloat[(r4+3)];
	heapFloat[(fp+-179)] = f0;
	f0 = heapFloat[(r4+4)];
	heapFloat[(fp+-180)] = f0;
	f0 = heapFloat[(r4+5)];
	heapFloat[(fp+-181)] = f0;
	f0 = heapFloat[(r4+6)];
	heapFloat[(fp+-182)] = f0;
	f0 = heapFloat[(r4+7)];
	heapFloat[(fp+-183)] = f0;
	f0 = heapFloat[(r4+8)];
	heapFloat[(fp+-184)] = f0;
	f0 = heapFloat[(r4+9)];
	heapFloat[(fp+-185)] = f0;
	f0 = heapFloat[(r4+10)];
	heapFloat[(fp+-186)] = f0;
	f0 = heapFloat[(r4+11)];
	heapFloat[(fp+-187)] = f0;
	f0 = heapFloat[(r4+12)];
	heapFloat[(fp+-188)] = f0;
	f0 = heapFloat[(r4+13)];
	heapFloat[(fp+-189)] = f0;
	f0 = heapFloat[(r4+14)];
	heapFloat[(fp+-190)] = f0;
	f0 = heapFloat[(r4+15)];
	heapFloat[(fp+-191)] = f0;
}
	f0 = heapFloat[(fp+-173)];
	f0 = f0*f0;
	f1 = heapFloat[(fp+-172)];
	f1 = f1*f1;
	f3 =                       0.5;
	heapFloat[(fp+-193)] = f3;
	f4 = heapFloat[(fp+-174)];
	f4 = f4*f4;
	f5 = heapFloat[(fp+-170)];
	f5 = f5*f5;
	f0 = f0+f1;
	f1 = heapFloat[(fp+-175)];
	f1 = f1*f1;
	f6 =       0.39269909262657166;
	f7 =       0.19634954631328583;
	f3 = f2*f3;
	f4 = f4+f5;
	f5 = heapFloat[(fp+-171)];
	f5 = f5*f5;
	f0 = f0+f1;
	heapFloat[(fp+-196)] = f0;
	f0 = f2 > f6 ? f7 : f3;
	heapFloat[(fp+-197)] = f0;
	f0 = f4+f5;
	heapFloat[(fp+-192)] = f0;
_78: while(true){
	r10 = heap32[(r1+7)];
	if(r10 >r14) //_LBB301_62
{
	f0 =   1.1920928955078125e-007;
	f1 = heapFloat[(fp+-196)];
if(!(f1 <=f0)) //_LBB301_71
{
	f0 = f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f1 =                         0;
	if(f0 !=f1) //_LBB301_65
{
	f2 = heapFloat[(fp+-197)];
	heapFloat[(g0)] = f2;
	sinf(i7);
	f3 = f_g0;
	heapFloat[(g0)] = f2;
	cosf(i7);
	f2 = f_g0;
	r10 = heap32[(r1+7)];
	f4 = heapFloat[(fp+-192)];
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	if(f4 !=f1) //_LBB301_67
{
	f0 = f3/f0;
	f3 = heapFloat[(fp+-175)];
	f3 = f3*f0;
	f5 = heapFloat[(fp+-172)];
	f5 = f5*f0;
	f6 = heapFloat[(fp+-173)];
	f0 = f6*f0;
	f6 =        6.2831854820251465;
	f7 = r10; //fitos r10, f7
	f8 = r14; //fitos r14, f8
	f6 = f6/f7;
	f6 = f8*f6;
	f7 = heapFloat[(fp+-193)];
	f6 = f6*f7;
	heapFloat[(g0)] = f6;
	sinf(i7);
	heapFloat[(g0)] = f6;
	f4 = f_g0/f4;
	f6 = heapFloat[(fp+-171)];
	f6 = f6*f4;
	f7 = heapFloat[(fp+-170)];
	f7 = f7*f4;
	f8 = heapFloat[(fp+-174)];
	f4 = f8*f4;
	cosf(i7);
	f8 = f_g0;
	f10 = heapFloat[(fp+-195)];
	f9 = heapFloat[(fp+-194)];
	if(f9 >=f10) //_LBB301_69
{
	f9 = heapFloat[(r8+1)];
	heapFloat[(fp+-155)] = f9;
	heapFloat[(fp+-42)] = f9;
	f9 = heapFloat[(r8+2)];
	heapFloat[(fp+-156)] = f9;
	heapFloat[(r4+1)] = f9;
	f9 = heapFloat[(r8+3)];
	heapFloat[(fp+-157)] = f9;
	heapFloat[(r4+2)] = f9;
	f9 = heapFloat[(r8+4)];
	heapFloat[(fp+-163)] = f9;
	heapFloat[(r4+3)] = f9;
	f9 = heapFloat[(r8+5)];
	heapFloat[(fp+-158)] = f9;
	heapFloat[(r4+4)] = f9;
	f9 = heapFloat[(r8+6)];
	heapFloat[(fp+-159)] = f9;
	heapFloat[(r4+5)] = f9;
	f9 = heapFloat[(r8+7)];
	heapFloat[(fp+-160)] = f9;
	heapFloat[(r4+6)] = f9;
	f9 = heapFloat[(r8+8)];
	heapFloat[(fp+-162)] = f9;
	heapFloat[(r4+7)] = f9;
	f9 = heapFloat[(r8+9)];
	heapFloat[(fp+-161)] = f9;
	f10 = f8*f2;
	f11 = f0*f4;
	f12 = f8*f0;
	f13 = f2*f4;
	f14 = f8*f5;
	f15 = f2*f7;
	heapFloat[(r4+8)] = f9;
	f9 = f10+f11;
	f10 = f5*f7;
	f11 = f8*f3;
	f2 = f2*f6;
	f12 = f12-f13;
	f13 = f3*f7;
	f14 = f14-f15;
	f15 = f0*f6;
	f16 = heapFloat[(r8+10)];
	heapFloat[(fp+-164)] = f16;
	f9 = f9+f10;
	f10 = f3*f6;
	f2 = f11-f2;
	f11 = f5*f4;
	f12 = f12-f13;
	f5 = f5*f6;
	f13 = f14-f15;
	f3 = f3*f4;
	f9 = f9+f10;
	f5 = f12+f5;
	f3 = f13+f3;
	heapFloat[(r4+9)] = f16;
	f2 = f2-f11;
	f0 = f0*f7;
	f0 = f2+f0;
	f2 = heapFloat[(r8+11)];
	heapFloat[(fp+-166)] = f2;
	f10 = f9*f7;
	f11 = f3*f8;
	f12 = f9*f4;
	f13 = f5*f8;
	heapFloat[(r4+10)] = f2;
	f2 = f10+f11;
	f10 = f0*f4;
	f11 = f12+f13;
	f12 = f3*f6;
	f13 = f9*f6;
	f14 = f0*f8;
	f17 = heapFloat[(r8+12)];
	f8 = f9*f8;
	f9 = f5*f4;
	f2 = f2+f10;
	f10 = f5*f6;
	f11 = f11+f12;
	f12 = f0*f7;
	f13 = f13+f14;
	f5 = f5*f7;
	f10 = f2-f10;
	f2 = f11-f12;
	heapFloat[(r4+11)] = f17;
	f8 = f8-f9;
	f7 = f3*f7;
	f5 = f13+f5;
	f3 = f3*f4;
	f4 = heapFloat[(r8+13)];
	heapFloat[(fp+-165)] = f4;
	f3 = f5-f3;
	f5 = f8-f7;
	f0 = f0*f6;
	f6 = f2*f2;
	f7 = f10*f10;
	f5 = f5-f0;
	heapFloat[(r4+12)] = f4;
	f0 = f6+f7;
	f4 = f3*f3;
	f6 = heapFloat[(r8+14)];
	heapFloat[(fp+-167)] = f6;
	f0 = f0+f4;
	f4 = f5*f5;
	heapFloat[(r4+13)] = f6;
	f6 =                         2;
	f0 = f0+f4;
	f0 = f6/f0;
	f4 = heapFloat[(r8+15)];
	heapFloat[(fp+-168)] = f4;
	f6 = f3*f0;
	f7 = f10*f0;
	heapFloat[(r4+14)] = f4;
	f16 = heapFloat[(r8+16)];
	f4 = f10*f7;
	f3 = f3*f6;
	f8 = f4+f3;
	f9 = f2*f7;
	f11 = f5*f6;
	heapFloat[(r4+15)] = f16;
	f12 = heapFloat[(fp+-169)];
	f8 = f12-f8;
	f13 = heapFloat[(r2+1)];
	f14 = f9-f11;
	f15 = heapFloat[(r2+5)];
	f18 = f2*f6;
	f7 = f5*f7;
	f19 = f2*f0;
	f20 = heapFloat[(r2+2)];
	f21 = heapFloat[(r2+6)];
	f0 = f13*f8;
	f22 = f15*f14;
	f23 = f18+f7;
	f24 = heapFloat[(r2+9)];
	f25 = f2*f19;
	f26 = heapFloat[(r2+3)];
	f27 = heapFloat[(r2+7)];
	f28 = heapFloat[(r2+11)];
	f29 = heapFloat[(r2+10)];
	f2 = f20*f8;
	f30 = f21*f14;
	f0 = f0+f22;
	f22 = f24*f23;
	f3 = f25+f3;
	f0 = f0+f22;
	f8 = f26*f8;
	f14 = f27*f14;
	f2 = f2+f30;
	f22 = f29*f23;
	f9 = f9+f11;
	f11 = f12-f3;
	f2 = f2+f22;
	heapFloat[(r4+16)] = f0;
	f6 = f10*f6;
	f10 = f5*f19;
	f3 = f8+f14;
	f5 = f28*f23;
	f8 = f6-f10;
	f3 = f3+f5;
	heapFloat[(r4+17)] = f2;
	f5 = f13*f9;
	f14 = f15*f11;
	heapFloat[(r4+18)] = f3;
	f19 = f20*f9;
	f22 = f21*f11;
	f5 = f5+f14;
	f14 = f24*f8;
	f5 = f5+f14;
	heap32[(r4+19)] = 0;
	f9 = f26*f9;
	f11 = f27*f11;
	f14 = f19+f22;
	f19 = f29*f8;
	f18 = f18-f7;
	f10 = f6+f10;
	f4 = f25+f4;
	f6 = f14+f19;
	heapFloat[(r4+20)] = f5;
	f7 = f9+f11;
	f8 = f28*f8;
	f4 = f12-f4;
	f7 = f7+f8;
	heapFloat[(r4+21)] = f6;
	f8 = f13*f18;
	f9 = f15*f10;
	heapFloat[(r4+22)] = f7;
	f11 = f20*f18;
	f12 = f21*f10;
	f8 = f8+f9;
	f9 = f24*f4;
	f9 = f8+f9;
	heap32[(r4+23)] = 0;
	f8 = f26*f18;
	f13 = f27*f10;
	f10 = f11+f12;
	f11 = f29*f4;
	f10 = f10+f11;
	heapFloat[(r4+24)] = f9;
	f8 = f8+f13;
	f4 = f28*f4;
	f11 = f8+f4;
	heapFloat[(r4+25)] = f10;
	heapFloat[(r4+26)] = f11;
	heap32[(r4+27)] = 0;
	f12 = heapFloat[(r4+28)];
	f13 = heapFloat[(r4+29)];
	f14 = heapFloat[(r4+30)];
	f15 = heapFloat[(r4+31)];
	f8 = f1;
	f4 = f1;
}
else{
	f1 = f8*f2;
	f9 = f0*f4;
	f10 = f8*f0;
	f11 = f2*f4;
	f12 = f8*f5;
	f13 = f2*f7;
	f1 = f1+f9;
	f9 = f5*f7;
	f14 = f8*f3;
	f2 = f2*f6;
	f10 = f10-f11;
	f11 = f3*f7;
	f12 = f12-f13;
	f13 = f0*f6;
	f1 = f1+f9;
	f9 = f3*f6;
	f2 = f14-f2;
	f14 = f5*f4;
	f10 = f10-f11;
	f5 = f5*f6;
	f11 = f12-f13;
	f3 = f3*f4;
	f1 = f1+f9;
	f5 = f10+f5;
	f3 = f11+f3;
	f2 = f2-f14;
	f0 = f0*f7;
	f0 = f2+f0;
	f2 = f1*f7;
	f9 = f3*f8;
	f10 = f1*f4;
	f11 = f5*f8;
	f2 = f2+f9;
	f9 = f0*f4;
	f10 = f10+f11;
	f11 = f3*f6;
	f12 = f1*f6;
	f13 = f0*f8;
	f1 = f1*f8;
	f8 = f5*f4;
	f2 = f2+f9;
	f9 = f5*f6;
	f10 = f10+f11;
	f11 = f0*f7;
	f12 = f12+f13;
	f5 = f5*f7;
	f2 = f2-f9;
	f9 = f10-f11;
	f1 = f1-f8;
	f7 = f3*f7;
	f5 = f12+f5;
	f3 = f3*f4;
	f3 = f5-f3;
	f1 = f1-f7;
	f0 = f0*f6;
	f4 = f9*f9;
	f5 = f2*f2;
	f0 = f1-f0;
	f1 = f4+f5;
	f4 = f3*f3;
	f1 = f1+f4;
	f4 = f0*f0;
	f5 =                         2;
	f1 = f1+f4;
	f1 = f5/f1;
	f4 = f3*f1;
	f5 = f2*f1;
	f6 = f2*f5;
	f3 = f3*f4;
	f7 = f6+f3;
	f8 = f9*f5;
	f10 = f0*f4;
	f11 = heapFloat[(fp+-169)];
	f7 = f11-f7;
	f12 = heapFloat[(r8+1)];
	f13 = f8-f10;
	f14 = heapFloat[(r8+5)];
	f15 = f9*f4;
	f5 = f0*f5;
	f1 = f9*f1;
	f16 = heapFloat[(r8+2)];
	f17 = heapFloat[(r8+6)];
	f18 = f12*f7;
	f19 = f14*f13;
	f20 = f15+f5;
	f21 = heapFloat[(r8+9)];
	f9 = f9*f1;
	f22 = heapFloat[(r8+3)];
	f23 = heapFloat[(r8+7)];
	f24 = heapFloat[(r8+11)];
	f25 = heapFloat[(r8+10)];
	f26 = f16*f7;
	f27 = f17*f13;
	f18 = f18+f19;
	f19 = f21*f20;
	f3 = f9+f3;
	f18 = f18+f19;
	heapFloat[(fp+-155)] = f18;
	f7 = f22*f7;
	f13 = f23*f13;
	f19 = f26+f27;
	f26 = f25*f20;
	f8 = f8+f10;
	f3 = f11-f3;
	f10 = f19+f26;
	heapFloat[(fp+-156)] = f10;
	heapFloat[(fp+-42)] = f18;
	f2 = f2*f4;
	f0 = f0*f1;
	f1 = f7+f13;
	f4 = f24*f20;
	f7 = f2-f0;
	f1 = f1+f4;
	heapFloat[(fp+-157)] = f1;
	heapFloat[(r4+1)] = f10;
	f4 = f12*f8;
	f10 = f14*f3;
	heapFloat[(r4+2)] = f1;
	f1 = f16*f8;
	f13 = f17*f3;
	f4 = f4+f10;
	f10 = f21*f7;
	f4 = f4+f10;
	heapFloat[(fp+-158)] = f4;
	heap32[(r4+3)] = 0;
	f8 = f22*f8;
	f3 = f23*f3;
	f1 = f1+f13;
	f10 = f25*f7;
	f5 = f15-f5;
	f0 = f2+f0;
	f2 = f9+f6;
	f1 = f1+f10;
	heapFloat[(fp+-159)] = f1;
	heapFloat[(r4+4)] = f4;
	f3 = f8+f3;
	f4 = f24*f7;
	f2 = f11-f2;
	f3 = f3+f4;
	heapFloat[(fp+-160)] = f3;
	heapFloat[(r4+5)] = f1;
	f1 = f12*f5;
	f4 = f14*f0;
	heapFloat[(r4+6)] = f3;
	f3 = f16*f5;
	f6 = f17*f0;
	f1 = f1+f4;
	f4 = f21*f2;
	f1 = f1+f4;
	heapFloat[(fp+-161)] = f1;
	heap32[(r4+7)] = 0;
	f4 = f22*f5;
	f0 = f23*f0;
	f3 = f3+f6;
	f5 = f25*f2;
	f3 = f3+f5;
	heapFloat[(fp+-164)] = f3;
	heapFloat[(r4+8)] = f1;
	f0 = f4+f0;
	f1 = f24*f2;
	f0 = f0+f1;
	heapFloat[(fp+-166)] = f0;
	heapFloat[(r4+9)] = f3;
	heapFloat[(r4+10)] = f0;
	heap32[(r4+11)] = 0;
	f0 = heapFloat[(r2+1)];
	heapFloat[(r4+16)] = f0;
	f2 = heapFloat[(r2+2)];
	heapFloat[(r4+17)] = f2;
	f3 = heapFloat[(r2+3)];
	heapFloat[(r4+18)] = f3;
	f4 = heapFloat[(r2+4)];
	heapFloat[(r4+19)] = f4;
	f5 = heapFloat[(r2+5)];
	heapFloat[(r4+20)] = f5;
	f6 = heapFloat[(r2+6)];
	heapFloat[(r4+21)] = f6;
	f7 = heapFloat[(r2+7)];
	heapFloat[(r4+22)] = f7;
	f8 = heapFloat[(r2+8)];
	heapFloat[(r4+23)] = f8;
	f9 = heapFloat[(r2+9)];
	heapFloat[(r4+24)] = f9;
	f10 = heapFloat[(r2+10)];
	heapFloat[(r4+25)] = f10;
	f11 = heapFloat[(r2+11)];
	heapFloat[(r4+26)] = f11;
	f1 = heapFloat[(r2+12)];
	heapFloat[(r4+27)] = f1;
	f12 = heapFloat[(r2+13)];
	heapFloat[(r4+28)] = f12;
	f13 = heapFloat[(r2+14)];
	heapFloat[(r4+29)] = f13;
	f14 = heapFloat[(r2+15)];
	heapFloat[(r4+30)] = f14;
	f15 = heapFloat[(r2+16)];
	heapFloat[(r4+31)] = f15;
	f16 = heapFloat[(r4+12)];
	heapFloat[(fp+-165)] = f16;
	f16 = heapFloat[(r4+13)];
	heapFloat[(fp+-167)] = f16;
	f16 = heapFloat[(r4+14)];
	heapFloat[(fp+-168)] = f16;
	f16 = heapFloat[(r4+15)];
	f17 =                         0;
	heapFloat[(fp+-162)] = f17;
	heapFloat[(fp+-163)] = f17;
}
	r10 = _ZTV24btPerturbedContactResult;
	r11 = sp + -616;
	r12 = heap32[(r5+5)];
	r10 = (r10 + 8)|0;
	r13 = r11 >> 2;
	heap32[(fp+-154)] = r10;
	heap32[(r13+40)] = r6;
	f18 = heapFloat[(fp+-155)];
	heapFloat[(r13+41)] = f18;
	f18 = heapFloat[(fp+-156)];
	heapFloat[(r13+42)] = f18;
	f18 = heapFloat[(fp+-157)];
	heapFloat[(r13+43)] = f18;
	f22 = heapFloat[(fp+-163)];
	heapFloat[(r13+44)] = f22;
	f18 = heapFloat[(fp+-158)];
	heapFloat[(r13+45)] = f18;
	f18 = heapFloat[(fp+-159)];
	heapFloat[(r13+46)] = f18;
	f18 = heapFloat[(fp+-160)];
	heapFloat[(r13+47)] = f18;
	f22 = heapFloat[(fp+-162)];
	heapFloat[(r13+48)] = f22;
	f18 = heapFloat[(fp+-161)];
	heapFloat[(r13+49)] = f18;
	f18 = heapFloat[(fp+-164)];
	heapFloat[(r13+50)] = f18;
	f18 = heapFloat[(fp+-166)];
	heapFloat[(r13+51)] = f18;
	heapFloat[(r13+52)] = f17;
	f17 = heapFloat[(fp+-165)];
	heapFloat[(r13+53)] = f17;
	f17 = heapFloat[(fp+-167)];
	heapFloat[(r13+54)] = f17;
	f17 = heapFloat[(fp+-168)];
	heapFloat[(r13+55)] = f17;
	heapFloat[(r13+56)] = f16;
	heapFloat[(r13+57)] = f0;
	heapFloat[(r13+58)] = f2;
	heapFloat[(r13+59)] = f3;
	heapFloat[(r13+60)] = f4;
	heapFloat[(r13+61)] = f5;
	heapFloat[(r13+62)] = f6;
	heapFloat[(r13+63)] = f7;
	heapFloat[(r13+64)] = f8;
	heapFloat[(r13+65)] = f9;
	heapFloat[(r13+66)] = f10;
	heapFloat[(r13+67)] = f11;
	heapFloat[(r13+68)] = f1;
	heapFloat[(r13+69)] = f12;
	heapFloat[(r13+70)] = f13;
	heapFloat[(r13+71)] = f14;
	heapFloat[(r13+72)] = f15;
	f0 = heapFloat[(fp+-176)];
	heapFloat[(r13+73)] = f0;
	f0 = heapFloat[(fp+-177)];
	heapFloat[(r13+74)] = f0;
	f0 = heapFloat[(fp+-178)];
	heapFloat[(r13+75)] = f0;
	f0 = heapFloat[(fp+-179)];
	heapFloat[(r13+76)] = f0;
	f0 = heapFloat[(fp+-180)];
	heapFloat[(r13+77)] = f0;
	f0 = heapFloat[(fp+-181)];
	heapFloat[(r13+78)] = f0;
	f0 = heapFloat[(fp+-182)];
	heapFloat[(r13+79)] = f0;
	f0 = heapFloat[(fp+-183)];
	heapFloat[(r13+80)] = f0;
	f0 = heapFloat[(fp+-184)];
	heapFloat[(r13+81)] = f0;
	f0 = heapFloat[(fp+-185)];
	heapFloat[(r13+82)] = f0;
	f0 = heapFloat[(fp+-186)];
	heapFloat[(r13+83)] = f0;
	f0 = heapFloat[(fp+-187)];
	heapFloat[(r13+84)] = f0;
	f0 = heapFloat[(fp+-188)];
	heapFloat[(r13+85)] = f0;
	f0 = heapFloat[(fp+-189)];
	heapFloat[(r13+86)] = f0;
	f0 = heapFloat[(fp+-190)];
	heapFloat[(r13+87)] = f0;
	f0 = heapFloat[(fp+-191)];
	heapFloat[(r13+88)] = f0;
	heap8[sp+-260] = r9;
	heap32[(r13+90)] = r12;
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
}
else{
break _78;
}
}
else{
break _78;
}
}
	r14 = (r14 + 1)|0;
}
else{
break _63;
}
}
	r0 = _2E_str115;
	r1 = _2E_str685;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 61;
	_assert(i7);
}
}
} while(0);
	r0 = heapU8[r0+16];
	if(r0 ==0) //_LBB301_47
{
__label__ = 44;
}
else{
	r0 = heap32[(r7+1)];
	if(r0 !=0) //_LBB301_76
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	if(r2 ==0) //_LBB301_47
{
__label__ = 44;
}
else{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r7+34)];
	if(r1 ==r2) //_LBB301_79
{
__label__ = 43;
}
else{
	r1 = (r6 + 72)|0;
	r6 = (r6 + 8)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}
}
}
else{
	r0 = _2E_str59;
	r6 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
}
switch(__label__ ){//multiple entries
case 44:
	return;
break;
case 43:
	r1 = (r6 + 8)|0;
	r2 = (r6 + 72)|0;
break;
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}