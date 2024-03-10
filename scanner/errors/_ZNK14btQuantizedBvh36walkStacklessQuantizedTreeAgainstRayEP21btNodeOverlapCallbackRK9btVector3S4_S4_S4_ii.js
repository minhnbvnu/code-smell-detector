function _ZNK14btQuantizedBvh36walkStacklessQuantizedTreeAgainstRayEP21btNodeOverlapCallbackRK9btVector3S4_S4_S4_ii(sp)
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
var __label__ = 0;
	i7 = sp + -96;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+60];
	if(r1 !=0) //_LBB155_2
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r6 = heap32[(fp+6)];
	r3 = r3 >> 2;
	r2 = r2 >> 2;
	f0 = heapFloat[(r3)];
	f1 = heapFloat[(r2)];
	f2 = heapFloat[(r3+1)];
	f3 = heapFloat[(r2+1)];
	f0 = f0-f1;
	r7 = r0 >> 2;
	f1 = f2-f3;
	f2 = heapFloat[(r3+2)];
	f3 = heapFloat[(r2+2)];
	r8 = heap32[(r7+34)];
	f2 = f2-f3;
	f3 = f0*f0;
	f4 = f1*f1;
	f3 = f3+f4;
	f4 = f2*f2;
	f3 = f3+f4;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	f4 =                         1;
	f3 = f4/f_g0;
	f5 = heapFloat[(r3)];
	f6 = heapFloat[(r2)];
	f7 = heapFloat[(r3+1)];
	f8 = heapFloat[(r2+1)];
	f0 = f0*f3;
	f9 = f5-f6;
	f1 = f1*f3;
	f10 = f7-f8;
	f11 = heapFloat[(r3+2)];
	f12 = heapFloat[(r2+2)];
	f2 = f2*f3;
	f3 = f11-f12;
	f9 = f0*f9;
	f10 = f1*f10;
	f9 = f9+f10;
	f3 = f2*f3;
	f3 = f9+f3;
	f9 =                         0;
	if(f0 !=f9) //_LBB155_4
{
	f0 = f4/f0;
}
else{
	f0 =        999999984306749440;
}
	if(f1 !=f9) //_LBB155_7
{
	f1 = f4/f1;
}
else{
	f1 =        999999984306749440;
}
	if(f2 !=f9) //_LBB155_10
{
	f2 = f4/f2;
}
else{
	f2 =        999999984306749440;
}
	r9 = heapU8[r0+60];
	if(r9 !=0) //_LBB155_13
{
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r9 = f0 < f9;
	r10 = f1 < f9;
	r11 = f2 < f9;
	f4 = heapFloat[(r2+3)];
	f10 = heapFloat[(r3+3)];
	f13 = f5 < f6 ? f5 : f6;
	f14 = heapFloat[(r4)];
	f15 = f7 < f8 ? f7 : f8;
	f16 = heapFloat[(r4+1)];
	f17 = f11 < f12 ? f11 : f12;
	f18 = heapFloat[(r4+2)];
	f5 = f6 < f5 ? f5 : f6;
	f6 = heapFloat[(r5)];
	f7 = f8 < f7 ? f7 : f8;
	f8 = heapFloat[(r5+1)];
	f11 = f12 < f11 ? f11 : f12;
	f12 = heapFloat[(r5+2)];
	r3 = r9 & 1;
	r9 = r10 & 1;
	r10 = r11 & 1;
	f19 = f10 < f4 ? f10 : f4;
	f4 = f4 < f10 ? f10 : f4;
	f10 = f13+f14;
	f13 = f15+f16;
	f14 = f17+f18;
	f5 = f5+f6;
	f6 = f7+f8;
	f7 = f11+f12;
	r11 = sp + -16;
	r12 = r11 >> 2;
	heapFloat[(fp+-4)] = f10;
	heapFloat[(r12+1)] = f13;
	heapFloat[(r12+2)] = f14;
	heapFloat[(r12+3)] = f19;
	f8 = heapFloat[(r7+1)];
	if(f10 <f8) //_LBB155_15
{
	heapFloat[(fp+-4)] = f8;
	f10 = f8;
}
	f8 = heapFloat[(r7+2)];
	if(f13 <f8) //_LBB155_18
{
	heapFloat[(r12+1)] = f8;
	f13 = f8;
}
	f8 = heapFloat[(r7+3)];
	if(f14 <f8) //_LBB155_21
{
	heapFloat[(r12+2)] = f8;
	f14 = f8;
}
	f8 = heapFloat[(r7+4)];
	if(f19 <f8) //_LBB155_24
{
	heapFloat[(r12+3)] = f8;
	f19 = f8;
}
	f8 = heapFloat[(r7+5)];
if(!(f8 >=f10)) //_LBB155_27
{
	heapFloat[(fp+-4)] = f8;
}
	f8 = heapFloat[(r7+6)];
if(!(f8 >=f13)) //_LBB155_29
{
	heapFloat[(r12+1)] = f8;
}
	f8 = heapFloat[(r7+7)];
if(!(f8 >=f14)) //_LBB155_31
{
	heapFloat[(r12+2)] = f8;
}
	f8 = heapFloat[(r7+8)];
if(!(f8 >=f19)) //_LBB155_33
{
	heapFloat[(r12+3)] = f8;
}
	r12 = sp + -38;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = 0;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r11 = heapU8[r0+60];
	if(r11 !=0) //_LBB155_35
{
	r11 = sp + -32;
	r12 = r11 >> 2;
	heapFloat[(fp+-8)] = f5;
	heapFloat[(r12+1)] = f6;
	heapFloat[(r12+2)] = f7;
	heapFloat[(r12+3)] = f4;
	f8 = heapFloat[(r7+1)];
	if(f5 <f8) //_LBB155_37
{
	heapFloat[(fp+-8)] = f8;
	f5 = f8;
}
	f8 = heapFloat[(r7+2)];
	if(f6 <f8) //_LBB155_40
{
	heapFloat[(r12+1)] = f8;
	f6 = f8;
}
	f8 = heapFloat[(r7+3)];
	if(f7 <f8) //_LBB155_43
{
	heapFloat[(r12+2)] = f8;
	f7 = f8;
}
	f8 = heapFloat[(r7+4)];
	if(f4 <f8) //_LBB155_46
{
	heapFloat[(r12+3)] = f8;
	f4 = f8;
}
	f8 = heapFloat[(r7+5)];
if(!(f8 >=f5)) //_LBB155_49
{
	heapFloat[(fp+-8)] = f8;
}
	f5 = heapFloat[(r7+6)];
if(!(f5 >=f6)) //_LBB155_51
{
	heapFloat[(r12+1)] = f5;
}
	f5 = heapFloat[(r7+7)];
if(!(f5 >=f7)) //_LBB155_53
{
	heapFloat[(r12+2)] = f5;
}
	f5 = heapFloat[(r7+8)];
if(!(f5 >=f4)) //_LBB155_55
{
	heapFloat[(r12+3)] = f5;
}
	r12 = sp + -44;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = 1;
	r0 = r3 ^ 1;
	r11 = r9 ^ 1;
	r12 = r10 ^ 1;
	r13 = 0;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r14 = r13;
_66: while(true){
	if(r13 <r6) //_LBB155_56
{
	if(r14 <r6) //_LBB155_58
{
	r15 = r8 >> 2;
	r16 = heap32[(r15+3)];
	r14 = (r14 + 1)|0;
	r16 = r16 >>> 31;
	r17 = heapU16[(sp+-38)>>1];
	r18 = heapU16[(r8+6)>>1];
	if(uint(r17) >uint(r18)) //_LBB155_64
{
__label__ = 55;
}
else{
	r17 = heapU16[(r8)>>1];
	r18 = heapU16[(sp+-44)>>1];
	r18 = r18 & 65535;
	r17 = r17 & 65535;
	if(uint(r18) <uint(r17)) //_LBB155_64
{
__label__ = 55;
}
else{
	r18 = heapU16[(sp+-34)>>1];
	r19 = heapU16[(r8+10)>>1];
	r18 = r18 & 65535;
	r19 = r19 & 65535;
	if(uint(r18) >uint(r19)) //_LBB155_64
{
__label__ = 55;
}
else{
	r18 = heapU16[(r8+4)>>1];
	r19 = heapU16[(sp+-40)>>1];
	r19 = r19 & 65535;
	r18 = r18 & 65535;
	if(uint(r19) <uint(r18)) //_LBB155_64
{
__label__ = 55;
}
else{
	r19 = heapU16[(sp+-36)>>1];
	r20 = heapU16[(r8+8)>>1];
	r19 = r19 & 65535;
	r20 = r20 & 65535;
	if(uint(r19) >uint(r20)) //_LBB155_64
{
__label__ = 55;
}
else{
	r19 = heapU16[(r8+2)>>1];
	r20 = heapU16[(sp+-42)>>1];
	r20 = r20 & 65535;
	r19 = r19 & 65535;
	if(uint(r20) >=uint(r19)) //_LBB155_65
{
	f4 = uint(r17); //fuitos r17, f4
	f5 = heapFloat[(r7+9)];
	f6 = uint(r19); //fuitos r19, f6
	f7 = heapFloat[(r7+10)];
	f4 = f4/f5;
	f8 = heapFloat[(r7+1)];
	f10 = heapFloat[(r7+11)];
	f11 = heapFloat[(r7+2)];
	f12 = heapFloat[(r7+3)];
	r17 = sp + -80;
	f13 = uint(r18); //fuitos r18, f13
	f6 = f6/f7;
	f4 = f4+f8;
	f13 = f13/f10;
	r18 = r17 >> 2;
	f6 = f6+f11;
	heapFloat[(fp+-20)] = f4;
	f13 = f13+f12;
	heapFloat[(r18+1)] = f6;
	heapFloat[(r18+2)] = f13;
	heap32[(r18+3)] = 0;
	r19 = heapU16[(r8+10)>>1];
	r20 = heapU16[(r8+8)>>1];
	r21 = heapU16[(r8+6)>>1];
	heap32[(r18+7)] = 0;
	f14 = heapFloat[(r5)];
	f4 = f4-f14;
	heapFloat[(fp+-20)] = f4;
	f4 = heapFloat[(r5+1)];
	f4 = f6-f4;
	heapFloat[(r18+1)] = f4;
	f4 = heapFloat[(r5+2)];
	f6 = uint(r21); //fuitos r21, f6
	f4 = f13-f4;
	f5 = f6/f5;
	heapFloat[(r18+2)] = f4;
	f4 = f5+f8;
	f5 = heapFloat[(r4)];
	f6 = uint(r20); //fuitos r20, f6
	f4 = f4-f5;
	f5 = f6/f7;
	heapFloat[(r18+4)] = f4;
	f4 = f5+f11;
	f5 = heapFloat[(r4+1)];
	f6 = uint(r19); //fuitos r19, f6
	f4 = f4-f5;
	f5 = f6/f10;
	heapFloat[(r18+5)] = f4;
	r19 = r3 << 4;
	r20 = r11 << 4;
	f4 = f5+f12;
	f5 = heapFloat[(r4+2)];
	r19 = (r17 + r19)|0;
	r20 = (r17 + r20)|0;
	f4 = f4-f5;
	r19 = r19 >> 2;
	heapFloat[(r18+6)] = f4;
	r18 = r20 >> 2;
	f4 = heapFloat[(r19)];
	f5 = heapFloat[(r2)];
	f6 = heapFloat[(r18+1)];
	f7 = heapFloat[(r2+1)];
	f4 = f4-f5;
	f6 = f6-f7;
	f4 = f4*f0;
	f6 = f6*f1;
	if(f4 >f6) //_LBB155_64
{
__label__ = 55;
}
else{
	r18 = r0 << 4;
	r19 = r9 << 4;
	r18 = (r17 + r18)|0;
	r19 = (r17 + r19)|0;
	r18 = r18 >> 2;
	r19 = r19 >> 2;
	f8 = heapFloat[(r18)];
	f10 = heapFloat[(r19+1)];
	f5 = f8-f5;
	f7 = f10-f7;
	f5 = f5*f0;
	f7 = f7*f1;
	if(f7 >f5) //_LBB155_64
{
__label__ = 55;
}
else{
	r18 = r12 << 4;
	r18 = (r17 + r18)|0;
	r18 = r18 >> 2;
	f8 = heapFloat[(r18+2)];
	f10 = heapFloat[(r2+2)];
	f8 = f8-f10;
	f4 = f4 < f7 ? f7 : f4;
	f7 = f8*f2;
	if(f4 >f7) //_LBB155_64
{
__label__ = 55;
}
else{
	r18 = r10 << 4;
	r17 = (r17 + r18)|0;
	r17 = r17 >> 2;
	f8 = heapFloat[(r17+2)];
	f8 = f8-f10;
	f5 = f6 < f5 ? f6 : f5;
	f6 = f8*f2;
	if(f6 >f5) //_LBB155_64
{
__label__ = 55;
}
else{
	f4 = f4 < f6 ? f6 : f4;
	f5 = f7 < f5 ? f7 : f5;
	r17 = f4 >= f3;
	r18 = f5 <= f9;
	r17 = r17 | r18;
	r18 = r17 & 1;
	r17 = r18 ^ 1;
	if(r16 != 0) //_LBB155_71
{
__label__ = 65;
}
else{
	if(r18 ==0) //_LBB155_72
{
	r18 = heap32[(r15+3)];
	if(r18 >-1) //_LBB155_74
{
	r19 = r1 >> 2;
	r19 = heap32[(r19)];
	r19 = r19 >> 2;
	r19 = heap32[(r19+2)];
	r20 = r18 >> 21;
	r18 = r18 & 2097151;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r20;
	heap32[(g0+2)] = r18;
	__FUNCTION_TABLE__[(r19)>>2](i7);
__label__ = 65;
}
else{
__label__ = 63;
break _66;
}
}
else{
__label__ = 65;
}
}
}
}
}
}
}
else{
__label__ = 55;
}
}
}
}
}
}
if (__label__ == 55){
	r17 = 0;
}
if(!(r17 !=0)) //_LBB155_77
{
	if(r16 != 0) //_LBB155_78
{
	r15 = heap32[(r15+3)];
	if(r15 <0) //_LBB155_80
{
	r16 = r15 << 4;
	r8 = (r8 - r16)|0;
	r13 = (r13 - r15)|0;
continue _66;
}
else{
__label__ = 69;
break _66;
}
}
}
	r8 = (r8 + 16)|0;
	r13 = (r13 + 1)|0;
}
else{
__label__ = 48;
break _66;
}
}
else{
__label__ = 72;
break _66;
}
}
switch(__label__ ){//multiple entries
case 72:
	r0 = maxIterations;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
if(!(r1 >=r14)) //_LBB155_84
{
	heap32[(r0)] = r14;
}
	return;
break;
case 69:
	r0 = _2E_str941;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 75;
	_assert(i7);
break;
case 63:
	r0 = _2E_str739;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 80;
	_assert(i7);
break;
case 48:
	r0 = _2E_str1143;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 606;
	_assert(i7);
break;
}
}
}
	r0 = _2E_str212;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 420;
	_assert(i7);
}
else{
	r0 = _2E_str212;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 543;
	_assert(i7);
}
}