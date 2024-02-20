function _ZN15btGjkEpaSolver211PenetrationEPK13btConvexShapeRK11btTransformS2_S5_RK9btVector3RNS_8sResultsEb(sp)
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
var __label__ = 0;
	i7 = sp + -10400;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+5)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	r5 = sp + -176;
	r6 = heap32[(fp+6)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r1;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = r6;
	r2 = sp + -560;
	r3 = r2 >> 2;
	_ZN12gjkepa2_implL10InitializeEPK13btConvexShapeRK11btTransformS2_S5_RN15btGjkEpaSolver28sResultsERNS_13MinkowskiDiffEb(i7);
	heap32[(r3+32)] = 0;
	heap32[(r3+33)] = 0;
	heap32[(r3+34)] = 0;
	heap32[(r3+35)] = 0;
	heap32[(r3+91)] = 0;
	heap32[(r3+94)] = 2;
	r4 = heap32[(fp+4)];
	heap32[(r3+92)] = 0;
	r4 = r4 >> 2;
	heap32[(r3+36)] = 0;
	f0 = heapFloat[(r4+2)];
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(r4)];
	r6 = sp + -48;
	f2 = -f2;
	r7 = r6 >> 2;
	f1 = -f1;
	heapFloat[(fp+-12)] = f2;
	f0 = -f0;
	heapFloat[(r7+1)] = f1;
	heapFloat[(r7+2)] = f0;
	heap32[(r7+3)] = 0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	_ZN12gjkepa2_impl3GJK8EvaluateERKNS_13MinkowskiDiffERK9btVector3(i7);
	r6 = r_g0;
	if(r6 ==2) //_LBB549_71
{
	r0 = r1 >> 2;
	heap32[(r0)] = 2;
}
else{
if(!(r6 !=1)) //_LBB549_72
{
	r6 = sp + -10368;
	r7 = r6 >> 2;
	heap32[(r7+2448)] = 0;
	heap32[(r7+2449)] = 0;
	heap32[(r7+2450)] = 0;
	heap32[(r7+2451)] = 0;
	heap32[(fp+-2592)] = 9;
	heap32[(r7+10)] = 0;
	heap32[(r7+11)] = 0;
	heap32[(r7+12)] = 0;
	heap32[(r7+13)] = 0;
	r8 = 0;
	r9 = (r6 + 9780)|0;
	r10 = (r6 + 9728)|0;
	heap32[(r7+14)] = 0;
	heap32[(r7+2447)] = 0;
	r11 = r8;
	r12 = r8;
	r13 = r8;
_5: while(true){
	r14 = 127;
	r14 = (r14 - r13)|0;
	r15 = (r9 + r8)|0;
	r14 = (r14 * 60)|0;
	r14 = (r6 + r14)|0;
	r15 = r15 >> 2;
	r14 = (r14 + 2108)|0;
	r16 = (r10 + r8)|0;
	heap32[(r15+-1)] = 0;
	heap32[(r15)] = r12;
	if(r12 !=0) //_LBB549_5
{
	r11 = r12 >> 2;
	heap32[(r11+12)] = r16;
	r11 = heap32[(r7+2451)];
}
	r8 = (r8 + -60)|0;
	r13 = (r13 + 1)|0;
	r11 = (r11 + 1)|0;
	heap32[(r7+2450)] = r16;
	heap32[(r7+2451)] = r11;
	r12 = r14;
if(!(r8 !=-7680)) //_LBB549_3
{
break _5;
}
}
	r3 = heap32[(r3+93)];
	f0 = heapFloat[(r4+2)];
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(r4)];
	r3 = r3 >> 2;
	r4 = heap32[(r3+8)];
	if(uint(r4) <uint(2)) //_LBB549_57
{
__label__ = 56;
}
else{
	heap32[(g0)] = r2;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r4 = r_g0;
	if(r4 ==0) //_LBB549_57
{
__label__ = 56;
}
else{
	r4 = heap32[(r7+2448)];
_14: do {
if(!(r4 ==0)) //_LBB549_19
{
_15: while(true){
	r8 = r4 >> 2;
	r9 = heap32[(r8+13)];
if(!(r9 ==0)) //_LBB549_12
{
	r9 = r9 >> 2;
	r10 = heap32[(r8+12)];
	heap32[(r9+12)] = r10;
}
	r9 = heap32[(r8+12)];
if(!(r9 ==0)) //_LBB549_14
{
	r9 = r9 >> 2;
	r10 = heap32[(r8+13)];
	heap32[(r9+13)] = r10;
}
	r9 = heap32[(r7+2448)];
if(!(r9 !=r4)) //_LBB549_16
{
	r9 = heap32[(r8+13)];
	heap32[(r7+2448)] = r9;
}
	r9 = heap32[(r7+2449)];
	r9 = (r9 + -1)|0;
	heap32[(r7+2449)] = r9;
	heap32[(r8+12)] = 0;
	r9 = heap32[(r7+2450)];
	heap32[(r8+13)] = r9;
	r8 = heap32[(r7+2450)];
if(!(r8 ==0)) //_LBB549_18
{
	r8 = r8 >> 2;
	heap32[(r8+12)] = r4;
}
	heap32[(r7+2450)] = r4;
	r4 = heap32[(r7+2451)];
	r4 = (r4 + 1)|0;
	heap32[(r7+2451)] = r4;
	r4 = heap32[(r7+2448)];
if(!(r4 !=0)) //_LBB549_10
{
break _14;
}
}
}
} while(0);
	heap32[(fp+-2592)] = 0;
	heap32[(r7+2447)] = 0;
	r4 = heap32[(r3+1)];
	r8 = heap32[(r3)];
	r9 = heap32[(r3+3)];
	r10 = r8 >> 2;
	r11 = r4 >> 2;
	r9 = r9 >> 2;
	r12 = heap32[(r3+2)];
	r13 = r12 >> 2;
	f3 = heapFloat[(r11+6)];
	f4 = heapFloat[(r9+6)];
	f5 = heapFloat[(r10+6)];
	f6 = heapFloat[(r10+5)];
	f7 = heapFloat[(r9+5)];
	f8 = heapFloat[(r11+4)];
	f9 = heapFloat[(r9+4)];
	f10 = heapFloat[(r13+5)];
	f11 = heapFloat[(r10+4)];
	f12 = heapFloat[(r13+4)];
	f3 = f3-f4;
	f6 = f6-f7;
	f8 = f8-f9;
	f5 = f5-f4;
	f11 = f11-f9;
	f13 = f6*f3;
	f9 = f12-f9;
	f12 = f5*f8;
	f10 = f10-f7;
	f3 = f11*f3;
	f14 = heapFloat[(r13+6)];
	f15 = heapFloat[(r11+5)];
	f13 = f13*f9;
	f12 = f12*f10;
	f7 = f15-f7;
	f12 = f13+f12;
	f3 = f3*f10;
	f6 = f6*f8;
	f4 = f14-f4;
	f8 = f11*f7;
	f3 = f12-f3;
	f6 = f6*f4;
	f5 = f5*f7;
	f3 = f3-f6;
	f4 = f8*f4;
	f3 = f3+f4;
	f4 = f5*f9;
	f3 = f3-f4;
	f4 =                         0;
	if(f3 <f4) //_LBB549_21
{
	heap32[(r3)] = r4;
	heap32[(r3+1)] = r8;
	f3 = heapFloat[(r3+4)];
	heap32[(r3+4)] = heap32[(r3+5)];
	heapFloat[(r3+5)] = f3;
	r9 = r4;
	r4 = r8;
}
else{
	r9 = r8;
}
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = 1;
	_ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(i7);
	r4 = r_g0;
	r8 = heap32[(r3+3)];
	r9 = heap32[(r3)];
	r10 = heap32[(r3+1)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r8;
	heap32[(g0+4)] = 1;
	_ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(i7);
	r8 = r_g0;
	r9 = heap32[(r3+3)];
	r10 = heap32[(r3+1)];
	r11 = heap32[(r3+2)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r9;
	heap32[(g0+4)] = 1;
	_ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(i7);
	r9 = r_g0;
	r10 = heap32[(r3+3)];
	r11 = heap32[(r3+2)];
	r12 = heap32[(r3)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = 1;
	_ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(i7);
	r10 = r_g0;
	r11 = heap32[(r7+2449)];
	if(r11 !=4) //_LBB549_57
{
__label__ = 56;
}
else{
	r3 = heap32[(r7+2448)];
	r11 = r3 >> 2;
	f0 = heapFloat[(r11+4)];
	f0 = f0*f0;
	f1 = heapFloat[(r11+5)];
_35: while(true){
	f2 = f1;
	r11 = r3;
	f3 = f0;
_37: while(true){
	r3 = r3 >> 2;
	r3 = heap32[(r3+13)];
	if(r3 !=0) //_LBB549_24
{
	r12 = r3 >> 2;
	f1 = heapFloat[(r12+5)];
if(!(f1 <f2)) //_LBB549_27
{
	f0 = heapFloat[(r12+4)];
	f0 = f0*f0;
if(!(f0 >=f3)) //_LBB549_27
{
continue _35;
}
}
}
else{
break _35;
}
}
}
	r3 = r11 >> 2;
	f0 = heapFloat[(r3)];
	f1 = heapFloat[(r3+1)];
	f2 = heapFloat[(r3+2)];
	f3 = heapFloat[(r3+3)];
	f4 = heapFloat[(r3+4)];
	f5 = heapFloat[(r3+5)];
	r12 = heap32[(r3+6)];
	r13 = heap32[(r3+7)];
	r3 = heap32[(r3+8)];
	r14 = 0;
	r15 = r4 >> 2;
	heap8[r4+56] = r14;
	heap32[(r15+9)] = r8;
	r16 = r8 >> 2;
	heap8[r8+56] = r14;
	heap32[(r16+9)] = r4;
	heap8[r4+57] = r14;
	r17 = 1;
	heap32[(r15+10)] = r9;
	r18 = r9 >> 2;
	heap8[r9+56] = r17;
	heap32[(r18+9)] = r4;
	heap8[r4+58] = r14;
	r19 = 2;
	heap32[(r15+11)] = r10;
	r15 = r10 >> 2;
	heap8[r10+56] = r19;
	heap32[(r15+9)] = r4;
	heap8[r8+57] = r19;
	heap32[(r16+10)] = r10;
	heap8[r10+58] = r17;
	heap32[(r15+11)] = r8;
	heap8[r8+58] = r17;
	heap32[(r16+11)] = r9;
	heap8[r9+57] = r19;
	heap32[(r18+10)] = r8;
	heap8[r9+58] = r17;
	heap32[(r18+11)] = r10;
	heap8[r10+57] = r19;
	heap32[(r15+10)] = r9;
	heap32[(fp+-2592)] = 0;
_42: while(true){
	r4 = (r14 + 1)|0;
_44: while(true){
	if(uint(r14) <uint(255)) //_LBB549_30
{
	r8 = heap32[(r7+2447)];
	if(uint(r8) >uint(63)) //_LBB549_54
{
__label__ = 53;
break _42;
}
else{
	r9 = sp + -16;
	r10 = r9 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r10+1)] = 0;
	r15 = (r8 + 1)|0;
	heap32[(r10+2)] = 0;
	r8 = r8 << 5;
	heap32[(r7+2447)] = r15;
	r8 = (r6 + r8)|0;
	heap8[r11+59] = r4;
	r15 = (r8 + 60)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r15;
	r8 = r8 >> 2;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	r16 = r11 >> 2;
	f6 = heapFloat[(r16)];
	f7 = heapFloat[(r8+19)];
	f8 = heapFloat[(r16+1)];
	f9 = heapFloat[(r8+20)];
	f6 = f6*f7;
	f7 = f8*f9;
	f8 = heapFloat[(r16+2)];
	f9 = heapFloat[(r8+21)];
	f6 = f6+f7;
	f7 = f8*f9;
	f6 = f6+f7;
	f7 = heapFloat[(r16+4)];
	f6 = f6-f7;
	f7 =   9.9999997473787516e-005;
	if(f6 <=f7) //_LBB549_53
{
__label__ = 52;
break _42;
}
else{
	r14 = (r14 + 1)|0;
	r8 = (r11 + 1)|0;
	r18 = 0;
	r20 = r17;
_49: while(true){
	r21 = r18 << 2;
	r21 = (r11 + r21)|0;
	r22 = (r8 + r18)|0;
	r21 = r21 >> 2;
	r22 = heapU8[r22+55];
	r21 = heap32[(r21+9)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r14;
	heap32[(g0+2)] = r15;
	heap32[(g0+3)] = r21;
	heap32[(g0+4)] = r22;
	heap32[(g0+5)] = r9;
	_ZN12gjkepa2_impl3EPA6expandEjPNS_3GJK3sSVEPNS0_5sFaceEjRNS0_8sHorizonE(i7);
	r18 = (r18 + 1)|0;
	r20 = r_g0 & r20;
	if(uint(r18) >uint(2)) //_LBB549_35
{
break _49;
}
else{
if(!(r20 !=0)) //_LBB549_33
{
break _49;
}
}
}
	if(r20 !=1) //_LBB549_52
{
__label__ = 51;
break _42;
}
else{
	r8 = heap32[(r10+2)];
	if(uint(r8) <uint(3)) //_LBB549_52
{
__label__ = 51;
break _42;
}
else{
	r8 = heap32[(fp+-4)];
	r9 = heap32[(r10+1)];
	r10 = r8 >> 2;
	heap8[r8+57] = r19;
	r15 = 1;
	heap32[(r10+10)] = r9;
	r10 = r9 >> 2;
	heap8[r9+58] = r15;
	heap32[(r10+11)] = r8;
	r8 = heap32[(r16+13)];
if(!(r8 ==0)) //_LBB549_39
{
	r8 = r8 >> 2;
	r9 = heap32[(r16+12)];
	heap32[(r8+12)] = r9;
}
	r8 = heap32[(r16+12)];
if(!(r8 ==0)) //_LBB549_41
{
	r8 = r8 >> 2;
	r9 = heap32[(r16+13)];
	heap32[(r8+13)] = r9;
}
	r8 = heap32[(r7+2448)];
if(!(r8 !=r11)) //_LBB549_43
{
	r8 = heap32[(r16+13)];
	heap32[(r7+2448)] = r8;
}
	r8 = heap32[(r7+2449)];
	r8 = (r8 + -1)|0;
	heap32[(r7+2449)] = r8;
	heap32[(r16+12)] = 0;
	r8 = heap32[(r7+2450)];
	heap32[(r16+13)] = r8;
	r8 = heap32[(r7+2450)];
if(!(r8 ==0)) //_LBB549_45
{
	r8 = r8 >> 2;
	heap32[(r8+12)] = r11;
}
	heap32[(r7+2450)] = r11;
	r11 = heap32[(r7+2451)];
	r11 = (r11 + 1)|0;
	heap32[(r7+2451)] = r11;
	r8 = heap32[(r7+2448)];
	r11 = r8 >> 2;
	f6 = heapFloat[(r11+4)];
	f6 = f6*f6;
	f7 = heapFloat[(r11+5)];
_67: while(true){
	f8 = f7;
	r11 = r8;
	f9 = f6;
_69: while(true){
	r8 = r8 >> 2;
	r8 = heap32[(r8+13)];
	if(r8 !=0) //_LBB549_46
{
	r9 = r8 >> 2;
	f7 = heapFloat[(r9+5)];
if(!(f7 <f8)) //_LBB549_49
{
	f6 = heapFloat[(r9+4)];
	f6 = f6*f6;
if(!(f6 >=f9)) //_LBB549_49
{
continue _67;
}
}
}
else{
break _67;
}
}
}
	r8 = r11 >> 2;
	f6 = heapFloat[(r8+5)];
	r4 = (r4 + 1)|0;
if(!(f6 <f5)) //_LBB549_55
{
break _44;
}
}
}
}
}
}
else{
__label__ = 55;
break _42;
}
}
	f0 = heapFloat[(r8)];
	f1 = heapFloat[(r8+1)];
	f2 = heapFloat[(r8+2)];
	f3 = heapFloat[(r8+3)];
	f4 = heapFloat[(r8+4)];
	r12 = heap32[(r8+6)];
	r13 = heap32[(r8+7)];
	r3 = heap32[(r8+8)];
	f5 = f6;
}
switch(__label__ ){//multiple entries
case 53:
	heap32[(fp+-2592)] = 6;
break;
case 52:
	heap32[(fp+-2592)] = 7;
break;
case 51:
	heap32[(fp+-2592)] = 4;
break;
}
	heapFloat[(r7+10)] = f0;
	heapFloat[(r7+11)] = f1;
	heapFloat[(r7+12)] = f2;
	heapFloat[(r7+13)] = f3;
	heapFloat[(r7+14)] = f4;
	heap32[(r7+9)] = 3;
	heap32[(r7+1)] = r12;
	heap32[(r7+2)] = r13;
	heap32[(r7+3)] = r3;
	r3 = r3 >> 2;
	r2 = r13 >> 2;
	f2 = f2*f4;
	f3 = heapFloat[(r3+6)];
	f5 = heapFloat[(r2+6)];
	f1 = f1*f4;
	f6 = heapFloat[(r3+5)];
	f7 = heapFloat[(r2+5)];
	f0 = f0*f4;
	f4 = heapFloat[(r3+4)];
	f8 = heapFloat[(r2+4)];
	f5 = f5-f2;
	f6 = f6-f1;
	f8 = f8-f0;
	f3 = f3-f2;
	f7 = f7-f1;
	f4 = f4-f0;
	f9 = f7*f3;
	f10 = f5*f6;
	f5 = f5*f4;
	f3 = f8*f3;
	f9 = f9-f10;
	f3 = f5-f3;
	f5 = f8*f6;
	f4 = f7*f4;
	f4 = f5-f4;
	f5 = f9*f9;
	f3 = f3*f3;
	f3 = f5+f3;
	f4 = f4*f4;
	f3 = f3+f4;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	heapFloat[(r7+5)] = f_g0;
	r4 = r12 >> 2;
	f3 = heapFloat[(r4+6)];
	f4 = heapFloat[(r4+5)];
	f5 = heapFloat[(r4+4)];
	f6 = heapFloat[(r3+6)];
	f7 = heapFloat[(r3+5)];
	f8 = heapFloat[(r3+4)];
	f6 = f6-f2;
	f4 = f4-f1;
	f8 = f8-f0;
	f3 = f3-f2;
	f7 = f7-f1;
	f5 = f5-f0;
	f9 = f7*f3;
	f10 = f6*f4;
	f6 = f6*f5;
	f3 = f8*f3;
	f9 = f9-f10;
	f3 = f6-f3;
	f4 = f8*f4;
	f5 = f7*f5;
	f4 = f4-f5;
	f5 = f9*f9;
	f3 = f3*f3;
	f3 = f5+f3;
	f4 = f4*f4;
	f3 = f3+f4;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	heapFloat[(r7+6)] = f_g0;
	f3 = heapFloat[(r2+6)];
	f4 = heapFloat[(r2+5)];
	f5 = heapFloat[(r2+4)];
	f6 = heapFloat[(r4+6)];
	f7 = heapFloat[(r4+5)];
	f8 = heapFloat[(r4+4)];
	f6 = f6-f2;
	f4 = f4-f1;
	f8 = f8-f0;
	f2 = f3-f2;
	f1 = f7-f1;
	f0 = f5-f0;
	f3 = f1*f2;
	f5 = f6*f4;
	f6 = f6*f0;
	f2 = f8*f2;
	f3 = f3-f5;
	f2 = f6-f2;
	f4 = f8*f4;
	f0 = f1*f0;
	f0 = f4-f0;
	f1 = f3*f3;
	f2 = f2*f2;
	f1 = f1+f2;
	f0 = f0*f0;
	f0 = f1+f0;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 = heapFloat[(r7+5)];
	f2 = heapFloat[(r7+6)];
	f3 = f1+f2;
	f3 = f3+f_g0;
	f1 = f1/f3;
	f2 = f2/f3;
	heapFloat[(r7+5)] = f1;
	f0 = f_g0/f3;
	heapFloat[(r7+6)] = f2;
	heapFloat[(r7+7)] = f0;
__label__ = 60;
}
}
}
if (__label__ == 56){
	heap32[(fp+-2592)] = 8;
	heapFloat[(r7+10)] = f2;
	heapFloat[(r7+11)] = f1;
	heapFloat[(r7+12)] = f0;
	f2 = f2*f2;
	f1 = f1*f1;
	heap32[(r7+13)] = 0;
	f1 = f2+f1;
	f0 = f0*f0;
	f0 = f1+f0;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f1 =                         0;
	if(f0 >f1) //_LBB549_59
{
	f1 =                         1;
	f2 = heapFloat[(r7+12)];
	f0 = f1/f0;
	f1 = heapFloat[(r7+11)];
	f3 = heapFloat[(r7+10)];
	f2 = f2*f0;
	f1 = f1*f0;
	f0 = f3*f0;
}
else{
	f0 =                         1;
	f2 = f1;
}
	heapFloat[(r7+10)] = f0;
	heapFloat[(r7+11)] = f1;
	heapFloat[(r7+12)] = f2;
	heap32[(r7+13)] = 0;
	heap32[(r7+14)] = 0;
	heap32[(r7+9)] = 1;
	r2 = heap32[(r3)];
	heap32[(r7+1)] = r2;
	heap32[(r7+5)] = 1065353216;
}
	r2 = heap32[(fp+-2592)];
	if(r2 ==9) //_LBB549_70
{
	r1 = r1 >> 2;
	heap32[(r1)] = 3;
	r1 = 0;
	r_g0 = r1;
	return;
}
else{
	r2 = heap32[(r7+9)];
_90: do {
	if(r2 !=0) //_LBB549_64
{
	r2 = 0;
	f0 =                         0;
	f1 = f0;
	f2 = f0;
_92: while(true){
	r3 = r2 << 2;
	r3 = (r6 + r3)|0;
	r4 = r5 >> 2;
	r3 = r3 >> 2;
	r8 = heap32[(r4+30)];
	r2 = (r2 + 1)|0;
	r9 = heap32[(r3+1)];
	r10 = heap32[(fp+-44)];
	r4 = heap32[(r4+31)];
	r11 = r8 & 1;
	if(r11 != 0) //_LBB549_67
{
	r11 = (r10 + r4)|0;
	r11 = r11 >> 2;
	r11 = heap32[(r11)];
	r8 = (r8 + r11)|0;
	r8 = (r8 + -1)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
}
	r11 = sp + -32;
	r4 = (r10 + r4)|0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r9;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r4 = r11 >> 2;
	f3 = heapFloat[(fp+-8)];
	f4 = heapFloat[(r3+5)];
	f5 = heapFloat[(r4+1)];
	f6 = heapFloat[(r4+2)];
	f3 = f3*f4;
	f5 = f5*f4;
	f4 = f6*f4;
	f2 = f2+f3;
	f1 = f1+f5;
	f0 = f0+f4;
	r3 = heap32[(r7+9)];
if(!(uint(r3) >uint(r2))) //_LBB549_65
{
break _90;
}
}
}
else{
	f0 =                         0;
	f1 = f0;
	f2 = f0;
}
} while(0);
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	heap32[(r1)] = 1;
	f3 = heapFloat[(r0)];
	f4 = heapFloat[(r0+1)];
	f5 = heapFloat[(r0+4)];
	f6 = heapFloat[(r0+5)];
	f3 = f3*f2;
	f4 = f4*f1;
	f7 = heapFloat[(r0+2)];
	f8 = heapFloat[(r0+8)];
	f9 = heapFloat[(r0+9)];
	f10 = heapFloat[(r0+6)];
	f5 = f5*f2;
	f6 = f6*f1;
	f3 = f3+f4;
	f4 = f7*f0;
	f7 = heapFloat[(r0+10)];
	f8 = f8*f2;
	f9 = f9*f1;
	f5 = f5+f6;
	f6 = f10*f0;
	f3 = f3+f4;
	f4 = heapFloat[(r0+12)];
	f10 = heapFloat[(r0+14)];
	f11 = heapFloat[(r0+13)];
	f5 = f5+f6;
	f6 = f8+f9;
	f7 = f7*f0;
	f3 = f3+f4;
	f4 = f6+f7;
	f5 = f5+f11;
	heapFloat[(r1+1)] = f3;
	f3 = f4+f10;
	heapFloat[(r1+2)] = f5;
	heapFloat[(r1+3)] = f3;
	heap32[(r1+4)] = 0;
	f3 = heapFloat[(r7+14)];
	f4 = heapFloat[(r7+11)];
	f5 = heapFloat[(r7+10)];
	f6 = heapFloat[(r7+12)];
	f7 = f5*f3;
	f8 = f4*f3;
	f9 = f6*f3;
	f2 = f2-f7;
	f7 = heapFloat[(r0)];
	f1 = f1-f8;
	f8 = heapFloat[(r0+1)];
	f10 = heapFloat[(r0+4)];
	f11 = heapFloat[(r0+5)];
	f7 = f7*f2;
	f8 = f8*f1;
	f0 = f0-f9;
	f9 = heapFloat[(r0+2)];
	f12 = heapFloat[(r0+8)];
	f13 = heapFloat[(r0+9)];
	f14 = heapFloat[(r0+6)];
	f10 = f10*f2;
	f11 = f11*f1;
	f7 = f7+f8;
	f8 = f9*f0;
	f9 = heapFloat[(r0+10)];
	f2 = f12*f2;
	f1 = f13*f1;
	f10 = f10+f11;
	f11 = f14*f0;
	f7 = f7+f8;
	f8 = heapFloat[(r0+12)];
	f12 = heapFloat[(r0+14)];
	f13 = heapFloat[(r0+13)];
	f10 = f10+f11;
	f1 = f2+f1;
	f0 = f9*f0;
	f2 = f7+f8;
	f0 = f1+f0;
	f1 = f10+f13;
	heapFloat[(r1+5)] = f2;
	f0 = f0+f12;
	heapFloat[(r1+6)] = f1;
	heapFloat[(r1+7)] = f0;
	f0 = -f5;
	heap32[(r1+8)] = 0;
	f1 = -f4;
	heapFloat[(r1+9)] = f0;
	f0 = -f6;
	heapFloat[(r1+10)] = f1;
	heapFloat[(r1+11)] = f0;
	f0 = -f3;
	heap32[(r1+12)] = 0;
	heapFloat[(r1+13)] = f0;
	r1 = 1;
	r_g0 = r1;
	return;
}
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}