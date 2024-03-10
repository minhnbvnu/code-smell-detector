function _ZN28btCompoundCollisionAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
var __label__ = 0;
	i7 = sp + -328;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heapU8[r0+28];
	r4 = r3 == 0 ? r1 : r2;
	r5 = r4 >> 2;
	r6 = heap32[(r5+48)];
	r6 = r6 >> 2;
	r7 = heap32[(r6+1)];
	if(r7 ==31) //_LBB257_2
{
	r7 = r0 >> 2;
	r8 = heap32[(r6+17)];
	r9 = heap32[(r7+10)];
if(!(r8 ==r9)) //_LBB257_9
{
	r8 = heap32[(r7+3)];
if(!(r8 <1)) //_LBB257_8
{
	r9 = 0;
_7: while(true){
	r10 = heap32[(r7+5)];
	r11 = r9 << 2;
	r10 = (r10 + r11)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
if(!(r10 ==0)) //_LBB257_7
{
	r12 = r10 >> 2;
	r12 = heap32[(r12)];
	r12 = r12 >> 2;
	r12 = heap32[(r12)];
	heap32[(g0)] = r10;
	__FUNCTION_TABLE__[(r12)>>2](i7);
	r10 = heap32[(r7+1)];
	r12 = r10 >> 2;
	r13 = heap32[(r7+5)];
	r11 = (r13 + r11)|0;
	r12 = heap32[(r12)];
	r12 = r12 >> 2;
	r11 = r11 >> 2;
	r12 = heap32[(r12+13)];
	r11 = heap32[(r11)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	__FUNCTION_TABLE__[(r12)>>2](i7);
}
	r9 = (r9 + 1)|0;
if(!(r8 !=r9)) //_LBB257_5
{
break _7;
}
}
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN28btCompoundCollisionAlgorithm26preallocateChildAlgorithmsEP17btCollisionObjectS1_(i7);
}
	r0 = heap32[(fp+3)];
	r8 = heap32[(fp+4)];
	r1 = r3 == 0 ? r2 : r1;
	r2 = _ZTV22btCompoundLeafCallback;
	r3 = heap32[(r6+16)];
	r9 = heap32[(r7+8)];
	r10 = heap32[(r7+5)];
	r11 = heap32[(r7+1)];
	r12 = sp + -32;
	r2 = (r2 + 8)|0;
	r13 = r12 >> 2;
	heap32[(fp+-8)] = r2;
	heap32[(r13+1)] = r4;
	heap32[(r13+2)] = r1;
	heap32[(r13+3)] = r11;
	heap32[(r13+4)] = r0;
	heap32[(r13+5)] = r8;
	heap32[(r13+6)] = r10;
	r0 = sp + -56;
	r2 = 1;
	heap32[(r13+7)] = r9;
	r4 = r0 >> 2;
	heap8[sp+-40] = r2;
	heap32[(r4+3)] = 0;
	r9 = (r8 + 72)|0;
	r10 = (r8 + 8)|0;
	r11 = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
_14: while(true){
	r13 = heap32[(r7+3)];
	if(r13 >r11) //_LBB257_10
{
	r13 = heap32[(r7+5)];
	r14 = r11 << 2;
	r13 = (r13 + r14)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
if(!(r13 ==0)) //_LBB257_27
{
	r14 = r13 >> 2;
	r14 = heap32[(r14)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+4)];
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r0;
	r13 = 0;
	__FUNCTION_TABLE__[(r14)>>2](i7);
_19: while(true){
	r14 = heap32[(r4+3)];
	r15 = heap32[(r4+1)];
	if(r15 >r13) //_LBB257_12
{
	r15 = r13 << 2;
	r14 = (r14 + r15)|0;
	r14 = r14 >> 2;
	r14 = heap32[(r14)];
	r15 = r14 >> 2;
	r16 = heap32[(r15+279)];
if(!(r16 ==0)) //_LBB257_20
{
	r16 = r8 >> 2;
	heap32[(r16+1)] = r14;
	if(r14 !=0) //_LBB257_15
{
	r17 = heap32[(r15+279)];
if(!(r17 ==0)) //_LBB257_19
{
	r15 = heap32[(r15+277)];
	r17 = heap32[(r16+34)];
	if(r15 ==r17) //_LBB257_18
{
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r9;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
}
else{
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r10;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
}
}
	heap32[(r16+1)] = 0;
}
else{
__label__ = 14;
break _14;
}
}
	r13 = (r13 + 1)|0;
}
else{
break _19;
}
}
if(!(r14 ==0)) //_LBB257_26
{
	r13 = heapU8[sp+-40];
if(!(r13 ==0)) //_LBB257_25
{
	r13 = gNumAlignedFree;
	r13 = r13 >> 2;
	r15 = heap32[(r13)];
	r15 = (r15 + 1)|0;
	r14 = r14 >> 2;
	heap32[(r13)] = r15;
	r13 = heap32[(r14+-1)];
	heap32[(g0)] = r13;
	free(i7);
}
	heap32[(r4+3)] = 0;
}
	r13 = 1;
	heap8[sp+-40] = r13;
	heap32[(r4+3)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
}
	r11 = (r11 + 1)|0;
}
else{
__label__ = 29;
break _14;
}
}
switch(__label__ ){//multiple entries
case 29:
	heap8[sp+-40] = r2;
	heap32[(r4+3)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
_42: do {
	if(r3 ==0) //_LBB257_31
{
	if(r13 <1) //_LBB257_50
{
__label__ = 49;
}
else{
	r0 = 0;
_45: while(true){
	r3 = (r0 * 20)|0;
	r4 = heap32[(r6+6)];
	r3 = r3 << 2;
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3+16)];
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r0;
	r0 = (r0 + 1)|0;
	_ZN22btCompoundLeafCallback17ProcessChildShapeEP16btCollisionShapei(i7);
if(!(r13 !=r0)) //_LBB257_33
{
__label__ = 34;
break _42;
}
}
}
}
else{
	r13 = r1 >> 2;
	f0 = heapFloat[(r5+1)];
	f1 = heapFloat[(r13+1)];
	f2 = heapFloat[(r5+5)];
	f3 = heapFloat[(r13+5)];
	f4 = heapFloat[(r13+2)];
	f5 = heapFloat[(r13+6)];
	f6 = f1*f0;
	f7 = f3*f2;
	f8 = heapFloat[(r5+9)];
	f9 = heapFloat[(r13+9)];
	f10 = heapFloat[(r5+2)];
	f11 = heapFloat[(r5+6)];
	f12 = heapFloat[(r5+3)];
	f13 = heapFloat[(r13+13)];
	f14 = heapFloat[(r13+3)];
	f15 = heapFloat[(r5+7)];
	f16 = heapFloat[(r5+14)];
	f17 = heapFloat[(r13+14)];
	f18 = heapFloat[(r13+7)];
	f19 = heapFloat[(r5+10)];
	f20 = heapFloat[(r5+15)];
	f21 = heapFloat[(r5+11)];
	f22 = heapFloat[(r13+15)];
	f23 = heapFloat[(r13+11)];
	f24 = heapFloat[(r13+10)];
	f25 = heapFloat[(r5+13)];
	f26 = f4*f0;
	f27 = f5*f2;
	f6 = f6+f7;
	f7 = f9*f8;
	r0 = sp + -152;
	f28 = f14*f0;
	f29 = f18*f2;
	f26 = f26+f27;
	f27 = f24*f8;
	f6 = f6+f7;
	r4 = r0 >> 2;
	f7 = f28+f29;
	f28 = f23*f8;
	f26 = f26+f27;
	heapFloat[(fp+-38)] = f6;
	f6 = f1*f10;
	f27 = f3*f11;
	f7 = f7+f28;
	heapFloat[(r4+1)] = f26;
	heapFloat[(r4+2)] = f7;
	f7 = f4*f10;
	f26 = f5*f11;
	f6 = f6+f27;
	f27 = f9*f19;
	f28 = f14*f10;
	f29 = f18*f11;
	f7 = f7+f26;
	f26 = f24*f19;
	f6 = f6+f27;
	heap32[(r4+3)] = 0;
	f27 = f28+f29;
	f28 = f23*f19;
	f7 = f7+f26;
	heapFloat[(r4+4)] = f6;
	f1 = f1*f12;
	f3 = f3*f15;
	f6 = f27+f28;
	heapFloat[(r4+5)] = f7;
	heapFloat[(r4+6)] = f6;
	f4 = f4*f12;
	f5 = f5*f15;
	f1 = f1+f3;
	f3 = f9*f21;
	f6 = -f25;
	f7 = f14*f12;
	f9 = f18*f15;
	f4 = f4+f5;
	f5 = f24*f21;
	f1 = f1+f3;
	heap32[(r4+7)] = 0;
	f3 = f0*f13;
	f14 = f2*f17;
	f0 = f0*f6;
	f2 = f2*f16;
	f7 = f7+f9;
	f9 = f23*f21;
	f4 = f4+f5;
	heapFloat[(r4+8)] = f1;
	f1 = f10*f13;
	f5 = f11*f17;
	f10 = f10*f6;
	f11 = f11*f16;
	f3 = f3+f14;
	f14 = f8*f22;
	f0 = f0-f2;
	f2 = f8*f20;
	f7 = f7+f9;
	heapFloat[(r4+9)] = f4;
	heapFloat[(r4+10)] = f7;
	f4 = f12*f13;
	f7 = f15*f17;
	f6 = f12*f6;
	f8 = f15*f16;
	f1 = f1+f5;
	f5 = f19*f22;
	f9 = f10-f11;
	f10 = f19*f20;
	f3 = f3+f14;
	f0 = f0-f2;
	f2 = f4+f7;
	f4 = f21*f22;
	f6 = f6-f8;
	f7 = f21*f20;
	f1 = f1+f5;
	f5 = f9-f10;
	f0 = f3+f0;
	heap32[(r4+11)] = 0;
	f2 = f2+f4;
	f3 = f6-f7;
	f1 = f1+f5;
	heapFloat[(r4+12)] = f0;
	f0 = f2+f3;
	heapFloat[(r4+13)] = f1;
	heapFloat[(r4+14)] = f0;
	heap32[(r4+15)] = 0;
	r13 = heap32[(r13+48)];
	r4 = r13 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	r8 = sp + -72;
	r9 = sp + -88;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r9;
	r13 = sp + -184;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r0 = r13 >> 2;
	r4 = r8 >> 2;
	heap32[(fp+-46)] = heap32[(fp+-18)];
	heap32[(r0+1)] = heap32[(r4+1)];
	heap32[(r0+2)] = heap32[(r4+2)];
	heap32[(r0+3)] = heap32[(r4+3)];
	r4 = r9 >> 2;
	heap32[(r0+4)] = heap32[(fp+-22)];
	heap32[(r0+5)] = heap32[(r4+1)];
	heap32[(r0+6)] = heap32[(r4+2)];
	r3 = r3 >> 2;
	heap32[(r0+7)] = heap32[(r4+3)];
	r0 = heap32[(r3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r13;
	heap32[(g0+2)] = r12;
	_ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(i7);
__label__ = 34;
}
} while(0);
_48: do {
if (__label__ == 34){
	r0 = heap32[(r7+3)];
if(!(r0 <1)) //_LBB257_50
{
	r3 = 0;
	r4 = (r1 + 4)|0;
	r0 = (r3 - r0)|0;
_51: while(true){
	r8 = heap32[(r7+5)];
	r9 = r3 << 2;
	r8 = (r8 - r9)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
_53: do {
if(!(r8 ==0)) //_LBB257_49
{
	r8 = (r3 * -20)|0;
	r10 = heap32[(r6+6)];
	r8 = r8 << 2;
	r8 = (r10 + r8)|0;
	r8 = r8 >> 2;
	f0 = heapFloat[(r5+1)];
	f1 = heapFloat[(r8)];
	f2 = heapFloat[(r5+2)];
	f3 = heapFloat[(r8+4)];
	f4 = heapFloat[(r8+1)];
	f5 = heapFloat[(r8+5)];
	f6 = f1*f0;
	f7 = f3*f2;
	f8 = heapFloat[(r5+3)];
	f9 = heapFloat[(r8+8)];
	f10 = heapFloat[(r5+5)];
	f11 = heapFloat[(r5+6)];
	f12 = heapFloat[(r5+9)];
	f13 = heapFloat[(r8+12)];
	f14 = heapFloat[(r8+2)];
	f15 = heapFloat[(r5+10)];
	f16 = heapFloat[(r8+13)];
	f17 = heapFloat[(r8+6)];
	r10 = heap32[(r8+16)];
	f18 = heapFloat[(r5+7)];
	f19 = heapFloat[(r8+14)];
	f20 = heapFloat[(r5+11)];
	f21 = heapFloat[(r8+10)];
	f22 = heapFloat[(r8+9)];
	f23 = f4*f0;
	f24 = f5*f2;
	f6 = f6+f7;
	f7 = f9*f8;
	f25 = heapFloat[(r5+13)];
	f26 = heapFloat[(r5+14)];
	f27 = heapFloat[(r5+15)];
	r8 = sp + -248;
	f28 = f14*f0;
	f29 = f17*f2;
	f23 = f23+f24;
	f24 = f22*f8;
	f6 = f6+f7;
	r11 = r8 >> 2;
	f7 = f28+f29;
	f28 = f21*f8;
	f23 = f23+f24;
	heapFloat[(fp+-62)] = f6;
	f6 = f1*f10;
	f24 = f3*f11;
	f7 = f7+f28;
	heapFloat[(r11+1)] = f23;
	heapFloat[(r11+2)] = f7;
	f7 = f4*f10;
	f23 = f5*f11;
	f6 = f6+f24;
	f24 = f9*f18;
	f28 = f14*f10;
	f29 = f17*f11;
	f7 = f7+f23;
	f23 = f22*f18;
	f6 = f6+f24;
	heap32[(r11+3)] = 0;
	f24 = f28+f29;
	f28 = f21*f18;
	f7 = f7+f23;
	heapFloat[(r11+4)] = f6;
	f1 = f1*f12;
	f3 = f3*f15;
	f6 = f24+f28;
	heapFloat[(r11+5)] = f7;
	heapFloat[(r11+6)] = f6;
	f4 = f4*f12;
	f5 = f5*f15;
	f1 = f1+f3;
	f3 = f9*f20;
	f6 = f14*f12;
	f7 = f17*f15;
	f4 = f4+f5;
	f5 = f22*f20;
	f1 = f1+f3;
	heap32[(r11+7)] = 0;
	f0 = f0*f13;
	f2 = f2*f16;
	f3 = f6+f7;
	f6 = f21*f20;
	f4 = f4+f5;
	heapFloat[(r11+8)] = f1;
	f1 = f10*f13;
	f5 = f11*f16;
	f0 = f0+f2;
	f2 = f8*f19;
	f3 = f3+f6;
	heapFloat[(r11+9)] = f4;
	f0 = f0+f2;
	heapFloat[(r11+10)] = f3;
	f2 = f12*f13;
	f3 = f15*f16;
	f1 = f1+f5;
	f4 = f18*f19;
	f1 = f1+f4;
	f2 = f2+f3;
	f3 = f20*f19;
	f0 = f0+f25;
	heap32[(r11+11)] = 0;
	f2 = f2+f3;
	f1 = f1+f26;
	heapFloat[(r11+12)] = f0;
	f0 = f2+f27;
	heapFloat[(r11+13)] = f1;
	heapFloat[(r11+14)] = f0;
	r12 = r10 >> 2;
	heap32[(r11+15)] = 0;
	r11 = heap32[(r12)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+2)];
	r12 = sp + -264;
	r13 = sp + -280;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r13;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r8 = r1 >> 2;
	r8 = heap32[(r8+48)];
	r10 = r8 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+2)];
	r11 = sp + -296;
	r14 = sp + -312;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r14;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	f0 = heapFloat[(fp+-66)];
	f1 = heapFloat[(fp+-78)];
	if(f0 >f1) //_LBB257_40
{
__label__ = 40;
}
else{
	f0 = heapFloat[(fp+-70)];
	f1 = heapFloat[(fp+-74)];
	if(f0 <f1) //_LBB257_40
{
__label__ = 40;
}
else{
	r8 = r2;
__label__ = 41;
}
}
if (__label__ == 40){
	r8 = 0;
}
	r10 = r12 >> 2;
	r12 = r14 >> 2;
	f0 = heapFloat[(r10+2)];
	f1 = heapFloat[(r12+2)];
	if(f0 >f1) //_LBB257_44
{
__label__ = 43;
}
else{
	r14 = r13 >> 2;
	r15 = r11 >> 2;
	f0 = heapFloat[(r14+2)];
	f1 = heapFloat[(r15+2)];
	if(f0 <f1) //_LBB257_44
{
__label__ = 43;
}
else{
__label__ = 44;
}
}
if (__label__ == 43){
	r8 = 0;
}
	f0 = heapFloat[(r10+1)];
	f1 = heapFloat[(r12+1)];
if(!(f0 >f1)) //_LBB257_48
{
	r10 = r13 >> 2;
	r11 = r11 >> 2;
	f0 = heapFloat[(r10+1)];
	f1 = heapFloat[(r11+1)];
if(!(f0 <f1)) //_LBB257_48
{
	r8 = r8 & 255;
	if(r8 !=0) //_LBB257_49
{
break _53;
}
}
}
	r8 = heap32[(r7+5)];
	r8 = (r8 - r9)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
	r10 = r8 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
	heap32[(g0)] = r8;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r8 = heap32[(r7+1)];
	r10 = r8 >> 2;
	r11 = heap32[(r7+5)];
	r11 = (r11 - r9)|0;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r11 = r11 >> 2;
	r10 = heap32[(r10+13)];
	r11 = heap32[(r11)];
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r11;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r8 = heap32[(r7+5)];
	r8 = (r8 - r9)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = 0;
}
} while(0);
	r3 = (r3 + -1)|0;
if(!(r0 !=r3)) //_LBB257_36
{
break _48;
}
}
}
}
} while(0);
	return;
break;
case 14:
	r14 = _2E_str59;
	r0 = _2E_str160;
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 101;
	_assert(i7);
break;
}
}
else{
	r0 = _2E_str99;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 199;
	_assert(i7);
}
}