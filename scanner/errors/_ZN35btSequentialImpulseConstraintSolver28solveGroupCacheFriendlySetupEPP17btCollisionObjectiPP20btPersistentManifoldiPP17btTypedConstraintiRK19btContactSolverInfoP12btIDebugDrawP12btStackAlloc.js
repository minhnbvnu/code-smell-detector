function _ZN35btSequentialImpulseConstraintSolver28solveGroupCacheFriendlySetupEPP17btCollisionObjectiPP20btPersistentManifoldiPP17btTypedConstraintiRK19btContactSolverInfoP12btIDebugDrawP12btStackAlloc(sp)
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
var __label__ = 0;
	i7 = sp + -584;var g0 = i7>>2; // save stack
	r0 = _2E_str1056;
	r1 = heap32[(fp+6)];
	heap32[(g0)] = r0;
	r0 = heap32[(fp+4)];
	heap32[(fp+-133)] = r0;
	r2 = 0;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r0 = (r2 - r0)|0;
_1: do {
if(!(r1 ==r0)) //_LBB612_269
{
	r0 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	heap32[(fp+-132)] = r5;
	r5 = heap32[(fp+5)];
	heap32[(fp+-127)] = r5;
	r5 = heap32[(fp+7)];
	r6 = r5 >> 2;
	r7 = heap32[(r6+11)];
_3: do {
	if(r7 !=0) //_LBB612_4
{
if(!(r4 <1)) //_LBB612_14
{
__label__ = 4; //SET chanka
_5: while(true){
	r7 = r3 >> 2;
	r7 = heap32[(r7)];
	r8 = heapU8[r7+232];
	r8 = r8 & 2;
if(!(r8 ==0)) //_LBB612_8
{
if(!(r7 ==0)) //_LBB612_8
{
	r7 = r7 >> 2;
	heap32[(r7+126)] = 0;
	heap32[(r7+127)] = 0;
	heap32[(r7+128)] = 0;
	heap32[(r7+129)] = 0;
	heap32[(r7+130)] = 0;
	heap32[(r7+131)] = 0;
	heap32[(r7+132)] = 0;
	heap32[(r7+133)] = 0;
	heap32[(r7+142)] = 0;
	heap32[(r7+143)] = 0;
	heap32[(r7+144)] = 0;
	heap32[(r7+145)] = 0;
	heap32[(r7+146)] = 0;
	heap32[(r7+147)] = 0;
	heap32[(r7+148)] = 0;
	heap32[(r7+149)] = 0;
}
}
	r4 = (r4 + -1)|0;
	r3 = (r3 + 4)|0;
	if(r4 ==0) //_LBB612_14
{
break _3;
}
else{
continue _5;
}
}
}
}
else{
if(!(r4 <1)) //_LBB612_14
{
__label__ = 8; //SET chanka
_12: while(true){
	r7 = r3 >> 2;
	r7 = heap32[(r7)];
	r8 = heapU8[r7+232];
	r8 = r8 & 2;
if(!(r8 ==0)) //_LBB612_12
{
if(!(r7 ==0)) //_LBB612_12
{
	r7 = r7 >> 2;
	heap32[(r7+126)] = 0;
	heap32[(r7+127)] = 0;
	heap32[(r7+128)] = 0;
	heap32[(r7+129)] = 0;
	heap32[(r7+130)] = 0;
	heap32[(r7+131)] = 0;
	heap32[(r7+132)] = 0;
	heap32[(r7+133)] = 0;
}
}
	r4 = (r4 + -1)|0;
	r3 = (r3 + 4)|0;
	if(r4 ==0) //_LBB612_14
{
break _3;
}
}
}
}
} while(0);
_19: do {
	if(r1 <1) //_LBB612_40
{
	r4 = r0 >> 2;
	r3 = heap32[(r4+27)];
_21: do {
if(!(r3 >r1)) //_LBB612_59
{
if(!(r3 >=r1)) //_LBB612_59
{
	r7 = heap32[(r4+28)];
if(!(r7 >=r1)) //_LBB612_58
{
	if(r1 !=0) //_LBB612_45
{
	r7 = gNumAlignedAllocs;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r9 = r1 << 3;
	r8 = (r8 + 1)|0;
	r9 = r9 | 3;
	heap32[(r7)] = r8;
	r7 = (r9 + 16)|0;
	heap32[(g0)] = r7;
	malloc(i7);
	r7 = r_g0;
	if(r7 !=0) //_LBB612_47
{
	r8 = (r7 + 4)|0;
	r8 = (r2 - r8)|0;
	r8 = r8 & 15;
	r8 = (r7 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r7;
	r7 = r9;
}
}
else{
	r7 = 0;
}
	r8 = (r0 + 116)|0;
	if(r3 <1) //_LBB612_50
{
	r2 = r8 >> 2;
	r9 = heap32[(r2)];
}
else{
_33: while(true){
	r9 = r8 >> 2;
	r9 = heap32[(r9)];
	r10 = r2 << 3;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r7 + r10)|0;
	r12 = heap32[(r11+1)];
	r11 = heap32[(r11)];
	r10 = r10 >> 2;
	r2 = (r2 + 1)|0;
	heap32[(r10)] = r11;
	heap32[(r10+1)] = r12;
if(!(r3 !=r2)) //_LBB612_51
{
break _33;
}
}
	r8 = (r0 + 116)|0;
}
if(!(r9 ==0)) //_LBB612_57
{
	r2 = heapU8[r0+120];
if(!(r2 ==0)) //_LBB612_56
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r10 = heap32[(r2)];
	r10 = (r10 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r2)] = r10;
	r2 = heap32[(r9+-1)];
	heap32[(g0)] = r2;
	free(i7);
}
	r2 = r8 >> 2;
	heap32[(r2)] = 0;
}
	r2 = 1;
	r8 = r8 >> 2;
	heap8[r0+120] = r2;
	heap32[(r8)] = r7;
	heap32[(r4+28)] = r1;
	if(r3 >=r1) //_LBB612_59
{
break _21;
}
}
_43: while(true){
	r2 = r3 << 3;
	r7 = heap32[(r4+29)];
	r2 = (r7 + r2)|0;
	r2 = r2 >> 2;
	r3 = (r3 + 1)|0;
	heap32[(r2)] = 0;
	heap32[(r2+1)] = 0;
if(!(r1 !=r3)) //_LBB612_58
{
break _21;
}
}
}
}
} while(0);
	r3 = 0;
	heap32[(r4+27)] = r1;
}
else{
	r2 = 0;
_47: while(true){
	r3 = r2 << 2;
	r4 = heap32[(fp+-127)];
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	r2 = (r2 + 1)|0;
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	if(r1 ==r2) //_LBB612_16
{
break _47;
}
}
	r2 = r0 >> 2;
	r3 = heap32[(r2+27)];
_50: do {
if(!(r3 >r1)) //_LBB612_35
{
if(!(r3 >=r1)) //_LBB612_35
{
	r4 = heap32[(r2+28)];
if(!(r4 >=r1)) //_LBB612_34
{
	if(r1 !=0) //_LBB612_21
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r7 = heap32[(r4)];
	r8 = r1 << 3;
	r7 = (r7 + 1)|0;
	r8 = r8 | 3;
	heap32[(r4)] = r7;
	r4 = (r8 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB612_23
{
	r7 = 0;
	r8 = (r4 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r4 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r4;
	r4 = r8;
}
}
else{
	r4 = 0;
}
	r7 = (r0 + 116)|0;
	if(r3 <1) //_LBB612_26
{
	r8 = r7 >> 2;
	r9 = heap32[(r8)];
}
else{
	r8 = 0;
_63: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r8 << 3;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r4 + r10)|0;
	r12 = heap32[(r11+1)];
	r11 = heap32[(r11)];
	r10 = r10 >> 2;
	r8 = (r8 + 1)|0;
	heap32[(r10)] = r11;
	heap32[(r10+1)] = r12;
if(!(r3 !=r8)) //_LBB612_27
{
break _63;
}
}
	r7 = (r0 + 116)|0;
}
if(!(r9 ==0)) //_LBB612_33
{
	r8 = heapU8[r0+120];
if(!(r8 ==0)) //_LBB612_32
{
	r8 = gNumAlignedFree;
	r8 = r8 >> 2;
	r10 = heap32[(r8)];
	r10 = (r10 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r8)] = r10;
	r8 = heap32[(r9+-1)];
	heap32[(g0)] = r8;
	free(i7);
}
	r8 = r7 >> 2;
	heap32[(r8)] = 0;
}
	r8 = 1;
	r7 = r7 >> 2;
	heap8[r0+120] = r8;
	heap32[(r7)] = r4;
	heap32[(r2+28)] = r1;
	if(r3 >=r1) //_LBB612_35
{
break _50;
}
}
_73: while(true){
	r4 = r3 << 3;
	r7 = heap32[(r2+29)];
	r4 = (r7 + r4)|0;
	r4 = r4 >> 2;
	r3 = (r3 + 1)|0;
	heap32[(r4)] = 0;
	heap32[(r4+1)] = 0;
if(!(r1 !=r3)) //_LBB612_34
{
break _50;
}
}
}
}
} while(0);
	heap32[(r2+27)] = r1;
	if(r1 >0) //_LBB612_37
{
	r4 = 0;
	r7 = heap32[(fp+-127)];
	r8 = r1;
	r3 = r4;
_78: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+4)];
	r11 = heap32[(r2+29)];
	r11 = (r11 + r4)|0;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r11;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r9 = r11 >> 2;
	r9 = heap32[(r9)];
	r8 = (r8 + -1)|0;
	r3 = (r9 + r3)|0;
	r4 = (r4 + 8)|0;
	r7 = (r7 + 4)|0;
if(!(r8 !=0)) //_LBB612_38
{
break _19;
}
}
}
else{
	r3 = 0;
}
}
} while(0);
	r2 = r0 >> 2;
	r4 = heap32[(r2+7)];
_82: do {
if(!(r4 >r3)) //_LBB612_80
{
if(!(r4 >=r3)) //_LBB612_80
{
	r7 = heap32[(r2+8)];
if(!(r7 >=r3)) //_LBB612_78
{
	if(r3 !=0) //_LBB612_65
{
	r7 = gNumAlignedAllocs;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r9 = (r3 * 136)|0;
	r8 = (r8 + 1)|0;
	r9 = r9 | 3;
	heap32[(r7)] = r8;
	r7 = (r9 + 16)|0;
	heap32[(g0)] = r7;
	malloc(i7);
	r7 = r_g0;
	if(r7 !=0) //_LBB612_67
{
	r8 = 0;
	r9 = (r7 + 4)|0;
	r8 = (r8 - r9)|0;
	r8 = r8 & 15;
	r8 = (r7 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r7;
	r7 = r9;
}
}
else{
	r7 = 0;
}
	r8 = (r0 + 36)|0;
	if(r4 <1) //_LBB612_70
{
	r9 = r8 >> 2;
	r11 = heap32[(r9)];
}
else{
	r9 = 0;
	r10 = r4;
_95: while(true){
	r11 = r8 >> 2;
	r11 = heap32[(r11)];
	r12 = (r7 + r9)|0;
	r13 = (r11 + r9)|0;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r13;
	heap32[(g0+2)] = 136;
	r10 = (r10 + -1)|0;
	r9 = (r9 + 136)|0;
	memcpy(i7);
if(!(r10 !=0)) //_LBB612_71
{
break _95;
}
}
	r8 = (r0 + 36)|0;
}
if(!(r11 ==0)) //_LBB612_77
{
	r9 = heapU8[r0+40];
if(!(r9 ==0)) //_LBB612_76
{
	r9 = gNumAlignedFree;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r10 = (r10 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r9)] = r10;
	r9 = heap32[(r11+-1)];
	heap32[(g0)] = r9;
	free(i7);
}
	r9 = r8 >> 2;
	heap32[(r9)] = 0;
}
	r9 = 1;
	r8 = r8 >> 2;
	heap8[r0+40] = r9;
	heap32[(r8)] = r7;
	heap32[(r2+8)] = r3;
	if(r4 >=r3) //_LBB612_80
{
break _82;
}
}
	r7 = (r3 - r4)|0;
	r4 = (r4 * 136)|0;
_106: while(true){
	r8 = heap32[(r2+9)];
	r8 = (r8 + r4)|0;
	r9 = sp + -448;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = 136;
	r7 = (r7 + -1)|0;
	r4 = (r4 + 136)|0;
	memcpy(i7);
if(!(r7 !=0)) //_LBB612_79
{
break _82;
}
}
}
}
} while(0);
	r4 = 0;
	heap32[(r2+7)] = r3;
	r7 = r4;
_109: while(true){
	if(r4 <r1) //_LBB612_81
{
	r8 = heap32[(r2+29)];
	r9 = r4 << 3;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
	if(r10 !=0) //_LBB612_83
{
	if(r7 <r3) //_LBB612_85
{
	r11 = r4 << 1;
	r12 = r4 << 2;
	r13 = heap32[(fp+-127)];
	r12 = (r13 + r12)|0;
	r12 = r12 >> 2;
	r13 = heap32[(r12)];
	r14 = r13 >> 2;
	r15 = heap32[(r2+9)];
	r16 = heap32[(r14+5)];
	r17 = heap32[(r14+6)];
if(!(r10 <1)) //_LBB612_90
{
	r10 = (r7 * 136)|0;
	r10 = (r15 + r10)|0;
	r18 = 0;
	r19 = r18;
_117: while(true){
	r20 = (r19 * 34)|0;
	r21 = 136;
	r22 = r18;
_119: while(true){
	r21 = (r21 + -1)|0;
	r23 = (r22 + 1)|0;
	r22 = (r10 + r22)|0;
	r24 = (r19 * 136)|0;
	heap8[r22+r24] = r18;
	r22 = r23;
if(!(r21 !=0)) //_LBB612_88
{
break _119;
}
}
	r21 = r20 << 2;
	r22 = r20 << 2;
	r21 = (r10 + r21)|0;
	r23 = r20 << 2;
	r22 = (r10 + r22)|0;
	r21 = r21 >> 2;
	r24 = r20 << 2;
	r23 = (r10 + r23)|0;
	r22 = r22 >> 2;
	heap32[(r21+31)] = -8388609;
	r21 = r20 << 2;
	r24 = (r10 + r24)|0;
	r23 = r23 >> 2;
	heap32[(r22+32)] = 2139095039;
	r20 = r20 << 2;
	r21 = (r10 + r21)|0;
	r22 = r24 >> 2;
	heap32[(r23+21)] = 0;
	r20 = (r10 + r20)|0;
	r23 = r11 << 2;
	r21 = r21 >> 2;
	heap32[(r22+20)] = 0;
	r22 = (r8 + r23)|0;
	r19 = (r19 + 1)|0;
	r20 = r20 >> 2;
	heap32[(r21+26)] = r16;
	r21 = r22 >> 2;
	heap32[(r20+27)] = r17;
	r20 = heap32[(r21)];
if(!(r20 >r19)) //_LBB612_87
{
break _117;
}
}
}
	r10 = r16 >> 2;
	heap32[(r10+126)] = 0;
	heap32[(r10+127)] = 0;
	heap32[(r10+128)] = 0;
	heap32[(r10+129)] = 0;
	heap32[(r10+130)] = 0;
	heap32[(r10+131)] = 0;
	heap32[(r10+132)] = 0;
	heap32[(r10+133)] = 0;
	r16 = r17 >> 2;
	heap32[(r16+126)] = 0;
	heap32[(r16+127)] = 0;
	heap32[(r16+128)] = 0;
	heap32[(r16+129)] = 0;
	heap32[(r16+130)] = 0;
	heap32[(r16+131)] = 0;
	heap32[(r16+132)] = 0;
	heap32[(r16+133)] = 0;
	f0 =                         1;
	f1 = heapFloat[(r6+3)];
	r17 = sp + -504;
	f1 = f0/f1;
	r18 = (r7 * 136)|0;
	r15 = (r15 + r18)|0;
	r18 = r17 >> 2;
	heapFloat[(fp+-126)] = f1;
	r19 = (r15 + 16)|0;
	heap32[(r18+1)] = heap32[(r6+8)];
	heap32[(r18+2)] = r19;
	heap32[(r18+3)] = r15;
	r19 = (r15 + 32)|0;
	heap32[(r18+4)] = 0;
	heap32[(r18+5)] = r19;
	r19 = (r15 + 116)|0;
	heap32[(r18+6)] = 34;
	r20 = r15 >> 2;
	heap32[(r18+7)] = r19;
	heap32[(r20+30)] = heap32[(r6+10)];
	r19 = (r15 + 120)|0;
	heap32[(r18+13)] = heap32[(r6+1)];
	r20 = (r15 + 124)|0;
	heap32[(r18+8)] = r19;
	r19 = (r15 + 128)|0;
	heap32[(r18+9)] = r20;
	heap32[(r18+10)] = r19;
	r19 = heap32[(r6+5)];
	heap32[(r18+12)] = r19;
	r12 = heap32[(r12)];
	r19 = r12 >> 2;
	r19 = heap32[(r19)];
	r19 = r19 >> 2;
	r19 = heap32[(r19+5)];
	r11 = r11 << 2;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r17;
	r8 = (r8 + r11)|0;
	r8 = r8 >> 2;
	__FUNCTION_TABLE__[(r19)>>2](i7);
	r11 = heap32[(r8)];
_123: do {
if(!(r11 <1)) //_LBB612_93
{
	r11 = 0;
_125: while(true){
	r12 = (r11 * 34)|0;
	r12 = r12 << 2;
	r12 = (r15 + r12)|0;
	r12 = r12 >> 2;
	heap32[(r12+28)] = r13;
	r17 = heap32[(r14+5)];
	r17 = r17 >> 2;
	f1 = heapFloat[(r12)];
	f2 = heapFloat[(r17+64)];
	f3 = heapFloat[(r12+1)];
	f4 = heapFloat[(r17+65)];
	f5 = heapFloat[(r17+68)];
	f6 = heapFloat[(r17+69)];
	f2 = f2*f1;
	f4 = f4*f3;
	f7 = heapFloat[(r12+2)];
	f8 = heapFloat[(r17+66)];
	f9 = heapFloat[(r17+72)];
	f10 = heapFloat[(r17+73)];
	f11 = heapFloat[(r17+70)];
	f5 = f5*f1;
	f6 = f6*f3;
	f2 = f2+f4;
	f4 = f8*f7;
	f8 = heapFloat[(r17+74)];
	f9 = f9*f1;
	f10 = f10*f3;
	f5 = f5+f6;
	f6 = f11*f7;
	f2 = f2+f4;
	f4 = heapFloat[(r17+134)];
	f11 = heapFloat[(r17+136)];
	f12 = heapFloat[(r17+135)];
	f5 = f5+f6;
	f6 = f9+f10;
	f8 = f8*f7;
	f2 = f2*f4;
	f4 = f6+f8;
	f5 = f5*f12;
	heapFloat[(r12+12)] = f2;
	f2 = f4*f11;
	heapFloat[(r12+13)] = f5;
	heapFloat[(r12+14)] = f2;
	heap32[(r12+15)] = 0;
	r17 = heap32[(r14+6)];
	r17 = r17 >> 2;
	f2 = heapFloat[(r12+8)];
	f4 = heapFloat[(r17+64)];
	f5 = heapFloat[(r12+9)];
	f6 = heapFloat[(r17+65)];
	f8 = heapFloat[(r17+68)];
	f9 = heapFloat[(r17+69)];
	f4 = f4*f2;
	f6 = f6*f5;
	f10 = heapFloat[(r12+10)];
	f11 = heapFloat[(r17+66)];
	f12 = heapFloat[(r17+72)];
	f13 = heapFloat[(r17+73)];
	f14 = heapFloat[(r17+70)];
	f8 = f8*f2;
	f9 = f9*f5;
	f4 = f4+f6;
	f6 = f11*f10;
	f11 = heapFloat[(r17+74)];
	f12 = f12*f2;
	f13 = f13*f5;
	f8 = f8+f9;
	f9 = f14*f10;
	f4 = f4+f6;
	f6 = heapFloat[(r17+134)];
	f14 = heapFloat[(r17+136)];
	f15 = heapFloat[(r17+135)];
	f8 = f8+f9;
	f9 = f12+f13;
	f11 = f11*f10;
	f4 = f4*f6;
	f6 = f9+f11;
	f8 = f8*f15;
	heapFloat[(r12+16)] = f4;
	f4 = f6*f14;
	heapFloat[(r12+17)] = f8;
	heapFloat[(r12+18)] = f4;
	heap32[(r12+19)] = 0;
	f4 = heapFloat[(r10+68)];
	f6 = heapFloat[(r10+69)];
	f8 = heapFloat[(r10+64)];
	f9 = heapFloat[(r10+65)];
	f11 = heapFloat[(r10+72)];
	f12 = heapFloat[(r10+73)];
	f13 = heapFloat[(r10+70)];
	f14 = heapFloat[(r10+66)];
	f8 = f8*f1;
	f9 = f9*f3;
	f4 = f4*f1;
	f6 = f6*f3;
	f15 = heapFloat[(r10+74)];
	f16 = heapFloat[(r16+68)];
	f17 = heapFloat[(r16+69)];
	f18 = heapFloat[(r16+64)];
	f19 = heapFloat[(r16+65)];
	f8 = f8+f9;
	f9 = f14*f7;
	f4 = f4+f6;
	f6 = f13*f7;
	f11 = f11*f1;
	f12 = f12*f3;
	f13 = heapFloat[(r10+84)];
	f14 = heapFloat[(r12+5)];
	f20 = heapFloat[(r12+4)];
	f21 = heapFloat[(r16+84)];
	f22 = heapFloat[(r12+6)];
	f8 = f8+f9;
	f4 = f4+f6;
	f6 = f20*f13;
	f9 = f14*f13;
	f23 = heapFloat[(r16+72)];
	f24 = heapFloat[(r16+73)];
	f25 = heapFloat[(r16+70)];
	f26 = heapFloat[(r16+66)];
	f18 = f18*f2;
	f19 = f19*f5;
	f16 = f16*f2;
	f17 = f17*f5;
	f11 = f11+f12;
	f12 = f15*f7;
	f15 = heapFloat[(r16+74)];
	f27 = f20*f21;
	f28 = f14*f21;
	f11 = f11+f12;
	f12 = f22*f13;
	f13 = f18+f19;
	f18 = f26*f10;
	f16 = f16+f17;
	f17 = f25*f10;
	f19 = f23*f2;
	f23 = f24*f5;
	f8 = f8*f1;
	f4 = f4*f3;
	f6 = f6*f20;
	f9 = f9*f14;
	f13 = f13+f18;
	f16 = f16+f17;
	f17 = f22*f21;
	f18 = f19+f23;
	f15 = f15*f10;
	f19 = f27*f20;
	f21 = f28*f14;
	f4 = f8+f4;
	f8 = f11*f7;
	f6 = f6+f9;
	f9 = f12*f22;
	f11 = f18+f15;
	f12 = f13*f2;
	f13 = f16*f5;
	f15 = f19+f21;
	f16 = f17*f22;
	f4 = f4+f8;
	f6 = f6+f9;
	f8 = f12+f13;
	f9 = f11*f10;
	f11 = f15+f16;
	f4 = f4+f6;
	f6 = f8+f9;
	f4 = f11+f4;
	f4 = f6+f4;
	f4 = f0/f4;
	heapFloat[(r12+23)] = f4;
	f6 = heapFloat[(r10+76)];
	f8 = heapFloat[(r10+77)];
	f9 = heapFloat[(r10+80)];
	f11 = heapFloat[(r10+81)];
	f12 = heapFloat[(r16+80)];
	f13 = heapFloat[(r16+81)];
	f15 = heapFloat[(r16+76)];
	f16 = heapFloat[(r16+77)];
	f17 = heapFloat[(r10+78)];
	f18 = heapFloat[(r10+82)];
	f19 = heapFloat[(r16+82)];
	f21 = heapFloat[(r16+78)];
	f6 = f20*f6;
	f8 = f14*f8;
	f1 = f1*f9;
	f3 = f3*f11;
	f2 = f2*f12;
	f5 = f5*f13;
	f9 = f20*f15;
	f11 = f14*f16;
	f6 = f6+f8;
	f8 = f22*f17;
	f1 = f1+f3;
	f3 = f7*f18;
	f2 = f2+f5;
	f5 = f10*f19;
	f7 = f9+f11;
	f9 = f22*f21;
	f6 = f6+f8;
	f1 = f1+f3;
	f2 = f2+f5;
	f3 = f7+f9;
	f1 = f6+f1;
	f2 = f2-f3;
	f1 = f1+f2;
	f2 = heapFloat[(r18+13)];
	f3 =                         0;
	f1 = f2*f1;
	f2 = heapFloat[(r12+29)];
	f1 = f3-f1;
	f2 = f4*f2;
	f1 = f4*f1;
	f1 = f2+f1;
	r11 = (r11 + 1)|0;
	heapFloat[(r12+29)] = f1;
	heap32[(r12+21)] = 0;
	r12 = heap32[(r8)];
if(!(r12 >r11)) //_LBB612_92
{
break _123;
}
}
}
} while(0);
	r8 = heap32[(r2+29)];
	r8 = (r8 + r9)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
}
else{
__label__ = 78;
break _109;
}
}
else{
	r8 = 0;
}
	r7 = (r8 + r7)|0;
	r4 = (r4 + 1)|0;
}
else{
__label__ = 90;
break _109;
}
}
switch(__label__ ){//multiple entries
case 90:
	r1 = heap32[(fp+-133)];
_132: do {
if(!(r1 <1)) //_LBB612_225
{
_133: while(true){
	r1 = heap32[(fp+-132)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(fp+-128)] = r1;
	r1 = r1 >> 2;
	heap32[(fp+-127)] = r1;
	r3 = heap32[(r1+277)];
	r1 = heap32[(r1+278)];
	r4 = heapU8[r3+232];
	r4 = r4 & 2;
	if(r4 !=0) //_LBB612_99
{
	r4 = r3;
}
else{
	r4 = 0;
}
	r7 = heapU8[r1+232];
	r7 = r7 & 2;
	if(r7 !=0) //_LBB612_102
{
	r7 = r1;
}
else{
	r7 = 0;
}
	if(r4 ==0) //_LBB612_105
{
__label__ = 99;
}
else{
	r4 = r4 >> 2;
	f0 = heapFloat[(r4+84)];
	f1 =                         0;
	if(f0 !=f1) //_LBB612_107
{
__label__ = 101;
}
else{
__label__ = 99;
}
}
if (__label__ == 99){
	if(r7 ==0) //_LBB612_224
{
__label__ = 216;
}
else{
	r4 = r7 >> 2;
	f0 = heapFloat[(r4+84)];
	f1 =                         0;
	if(f0 ==f1) //_LBB612_224
{
__label__ = 216;
}
else{
__label__ = 101;
}
}
}
if (__label__ == 101){
	r4 = heap32[(fp+-128)];
	r7 = (r4 + 4)|0;
	heap32[(fp+-129)] = r7;
	r7 = (r4 + 152)|0;
	heap32[(fp+-130)] = r7;
	r4 = (r4 + 168)|0;
	heap32[(fp+-131)] = r4;
	r4 = 0;
	r7 = r4;
_150: while(true){
	r8 = heap32[(fp+-127)];
	r8 = heap32[(r8+279)];
	if(r8 >r7) //_LBB612_108
{
	r8 = heap32[(fp+-128)];
	r8 = (r8 + r4)|0;
	r9 = r8 >> 2;
	f0 = heapFloat[(r9+21)];
	r10 = heap32[(fp+-127)];
	f1 = heapFloat[(r10+281)];
_153: do {
if(!(f0 >f1)) //_LBB612_222
{
	r10 = heap32[(fp+-129)];
	r10 = (r10 + r4)|0;
	r11 = heap32[(fp+-131)];
	r11 = (r11 + r4)|0;
	r12 = heap32[(fp+-130)];
	r12 = (r12 + r4)|0;
	r13 = heap32[(r2+3)];
	r14 = heap32[(r2+2)];
	if(r13 ==r14) //_LBB612_111
{
	r15 = 1;
	r16 = r14 << 1;
	r16 = r14 == 0 ? r15 : r16;
	if(r13 >=r16) //_LBB612_110
{
__label__ = 104;
}
else{
	if(r16 !=0) //_LBB612_114
{
	r13 = gNumAlignedAllocs;
	r13 = r13 >> 2;
	r17 = heap32[(r13)];
	r18 = (r16 * 136)|0;
	r17 = (r17 + 1)|0;
	r18 = r18 | 3;
	heap32[(r13)] = r17;
	r13 = (r18 + 16)|0;
	heap32[(g0)] = r13;
	malloc(i7);
	r17 = r_g0;
	if(r17 !=0) //_LBB612_116
{
	r13 = 0;
	r18 = (r17 + 4)|0;
	r13 = (r13 - r18)|0;
	r13 = r13 & 15;
	r13 = (r17 + r13)|0;
	r18 = (r13 + 4)|0;
	r13 = r13 >> 2;
	heap32[(r13)] = r17;
	r17 = r18;
}
}
else{
	r17 = 0;
}
	if(r14 <1) //_LBB612_119
{
	r19 = heap32[(r2+4)];
}
else{
	r13 = 0;
	r18 = r14;
_166: while(true){
	r19 = heap32[(r2+4)];
	r20 = (r17 + r13)|0;
	r21 = (r19 + r13)|0;
	heap32[(g0)] = r20;
	heap32[(g0+1)] = r21;
	heap32[(g0+2)] = 136;
	r18 = (r18 + -1)|0;
	r13 = (r13 + 136)|0;
	memcpy(i7);
if(!(r18 !=0)) //_LBB612_120
{
break _166;
}
}
}
	if(r19 !=0) //_LBB612_123
{
	r13 = heapU8[r0+20];
	if(r13 !=0) //_LBB612_125
{
	r13 = gNumAlignedFree;
	r13 = r13 >> 2;
	r18 = heap32[(r13)];
	r18 = (r18 + 1)|0;
	r19 = r19 >> 2;
	heap32[(r13)] = r18;
	r13 = heap32[(r19+-1)];
	heap32[(g0)] = r13;
	free(i7);
	r13 = heap32[(r2+2)];
}
else{
	r13 = r14;
}
	heap32[(r2+4)] = 0;
}
else{
	r13 = r14;
}
	heap8[r0+20] = r15;
	heap32[(r2+4)] = r17;
	heap32[(r2+3)] = r16;
__label__ = 121;
}
}
else{
__label__ = 104;
}
if (__label__ == 104){
	r13 = r14;
}
	r13 = (r13 + 1)|0;
	heap32[(r2+2)] = r13;
	r13 = heapU8[r3+232];
	r15 = heapU8[r1+232];
	r13 = r13 & 2;
	r16 = 0;
	r15 = r15 & 2;
	r13 = r13 == 0 ? r16 : r3;
	r17 = heap32[(r2+4)];
	r15 = r15 == 0 ? r16 : r1;
	if(r13 ==0) //_LBB612_130
{
	r18 = _ZGVZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r19 = heapU8[r18];
if(!(r19 !=0)) //_LBB612_132
{
	r19 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r20 = r19 >> 2;
	heap32[(r20+41)] = 1065353216;
	heap32[(r20+42)] = 1065353216;
	heap32[(r20+43)] = 1065353216;
	heap32[(r20+44)] = 0;
	heap32[(r20+45)] = 0;
	heap32[(r20+46)] = 1566444395;
	heap32[(r20+47)] = 0;
	heap32[(r20+48)] = 0;
	heap32[(r20+49)] = 0;
	heap32[(r20+50)] = 0;
	heap32[(r20+51)] = 1;
	heap32[(r20+52)] = -1;
	heap32[(r20+53)] = -1;
	heap32[(r20+54)] = 1;
	heap32[(r20+55)] = 0;
	heap32[(r20+56)] = 1056964608;
	heap32[(r20+57)] = 0;
	heap32[(r20+58)] = 1;
	heap32[(r20+59)] = 0;
	heap32[(r20+60)] = 1065353216;
	heap32[(r20+61)] = 0;
	heap32[(r20+62)] = 0;
	heap32[(r20+63)] = 0;
	heap32[(r20+1)] = 1065353216;
	heap32[(r20+2)] = 0;
	heap32[(r20+3)] = 0;
	heap32[(r20+4)] = 0;
	heap32[(r20+5)] = 0;
	heap32[(r20+6)] = 1065353216;
	heap32[(r20+7)] = 0;
	heap32[(r20+8)] = 0;
	heap32[(r20+9)] = 0;
	heap32[(r20+10)] = 0;
	heap32[(r20+11)] = 1065353216;
	heap32[(r20+12)] = 0;
	heap32[(r20+13)] = 0;
	heap32[(r20+14)] = 0;
	r21 = _ZTV11btRigidBody;
	heap32[(r20+15)] = 0;
	r21 = (r21 + 8)|0;
	heap32[(r20+16)] = 0;
	r22 = 1;
	heap32[(r20)] = r21;
	heap8[r19+492] = r22;
	heap32[(r20+122)] = 0;
	heap32[(r20+120)] = 0;
	r21 = sp + -280;
	heap32[(r20+121)] = 0;
	r20 = r21 >> 2;
	heap32[(fp+-70)] = 0;
	heap32[(r20+1)] = 0;
	heap32[(r20+18)] = 0;
	heap32[(r20+19)] = 0;
	heap32[(r20+20)] = 0;
	heap32[(r20+21)] = 0;
	heap32[(r20+22)] = 0;
	heap32[(r20+23)] = 0;
	heap32[(r20+24)] = 0;
	heap32[(r20+25)] = 1056964608;
	heap32[(r20+26)] = 0;
	heap32[(r20+27)] = 1061997773;
	heap32[(r20+28)] = 1065353216;
	heap8[sp+-164] = r16;
	heap32[(r20+30)] = 1000593162;
	heap32[(r20+31)] = 1008981770;
	heap32[(r20+32)] = 1008981770;
	heap32[(r20+33)] = 1008981770;
	heap32[(r20+2)] = 1065353216;
	heap32[(r20+3)] = 0;
	heap32[(r20+4)] = 0;
	heap32[(r20+5)] = 0;
	heap32[(r20+6)] = 0;
	heap32[(r20+7)] = 1065353216;
	heap32[(r20+8)] = 0;
	heap32[(r20+9)] = 0;
	heap32[(r20+10)] = 0;
	heap32[(r20+11)] = 0;
	heap32[(r20+12)] = 1065353216;
	heap32[(r20+13)] = 0;
	heap32[(r20+14)] = 0;
	heap32[(r20+15)] = 0;
	heap32[(r20+16)] = 0;
	heap32[(r20+17)] = 0;
	heap32[(g0)] = r19;
	heap32[(g0+1)] = r21;
	_ZN11btRigidBody14setupRigidBodyERKNS_27btRigidBodyConstructionInfoE(i7);
	heap8[r18] = r22;
}
	r18 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r19 = r18 >> 2;
	r20 = heap32[(r19+51)];
	r20 = r20 | 1;
	heap32[(r19+51)] = r20;
	heap32[(r19+84)] = 0;
	f0 =                         0;
	f1 = heapFloat[(r19+95)];
	f2 = heapFloat[(r19+94)];
	f3 = heapFloat[(r19+93)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r19+89)] = f3;
	f1 = f1*f0;
	heapFloat[(r19+90)] = f2;
	heapFloat[(r19+91)] = f1;
	heap32[(r19+92)] = 0;
	heap32[(r19+97)] = 0;
	heap32[(r19+98)] = 0;
	heap32[(r19+99)] = 0;
	heap32[(r19+100)] = 0;
	f1 = heapFloat[(r19+87)];
	f2 = heapFloat[(r19+86)];
	f3 = heapFloat[(r19+85)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r19+138)] = f3;
	f0 = f1*f0;
	heapFloat[(r19+139)] = f2;
	heapFloat[(r19+140)] = f0;
	heap32[(r19+141)] = 0;
}
else{
	r18 = r13;
}
	r19 = (r14 * 136)|0;
	r17 = (r17 + r19)|0;
	r17 = r17 >> 2;
	heap32[(r17+26)] = r18;
	if(r15 ==0) //_LBB612_135
{
	r18 = _ZGVZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r19 = heapU8[r18];
if(!(r19 !=0)) //_LBB612_137
{
	r19 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r20 = r19 >> 2;
	heap32[(r20+41)] = 1065353216;
	heap32[(r20+42)] = 1065353216;
	heap32[(r20+43)] = 1065353216;
	heap32[(r20+44)] = 0;
	heap32[(r20+45)] = 0;
	heap32[(r20+46)] = 1566444395;
	heap32[(r20+47)] = 0;
	heap32[(r20+48)] = 0;
	heap32[(r20+49)] = 0;
	heap32[(r20+50)] = 0;
	heap32[(r20+51)] = 1;
	heap32[(r20+52)] = -1;
	heap32[(r20+53)] = -1;
	heap32[(r20+54)] = 1;
	heap32[(r20+55)] = 0;
	heap32[(r20+56)] = 1056964608;
	heap32[(r20+57)] = 0;
	heap32[(r20+58)] = 1;
	heap32[(r20+59)] = 0;
	heap32[(r20+60)] = 1065353216;
	heap32[(r20+61)] = 0;
	heap32[(r20+62)] = 0;
	heap32[(r20+63)] = 0;
	heap32[(r20+1)] = 1065353216;
	heap32[(r20+2)] = 0;
	heap32[(r20+3)] = 0;
	heap32[(r20+4)] = 0;
	heap32[(r20+5)] = 0;
	heap32[(r20+6)] = 1065353216;
	heap32[(r20+7)] = 0;
	heap32[(r20+8)] = 0;
	heap32[(r20+9)] = 0;
	heap32[(r20+10)] = 0;
	heap32[(r20+11)] = 1065353216;
	heap32[(r20+12)] = 0;
	heap32[(r20+13)] = 0;
	heap32[(r20+14)] = 0;
	r21 = _ZTV11btRigidBody;
	heap32[(r20+15)] = 0;
	r21 = (r21 + 8)|0;
	heap32[(r20+16)] = 0;
	r22 = 1;
	heap32[(r20)] = r21;
	heap8[r19+492] = r22;
	heap32[(r20+122)] = 0;
	heap32[(r20+120)] = 0;
	r21 = sp + -144;
	heap32[(r20+121)] = 0;
	r20 = r21 >> 2;
	heap32[(fp+-36)] = 0;
	heap32[(r20+1)] = 0;
	heap32[(r20+18)] = 0;
	heap32[(r20+19)] = 0;
	heap32[(r20+20)] = 0;
	heap32[(r20+21)] = 0;
	heap32[(r20+22)] = 0;
	heap32[(r20+23)] = 0;
	heap32[(r20+24)] = 0;
	heap32[(r20+25)] = 1056964608;
	heap32[(r20+26)] = 0;
	heap32[(r20+27)] = 1061997773;
	heap32[(r20+28)] = 1065353216;
	heap8[sp+-28] = r16;
	heap32[(r20+30)] = 1000593162;
	heap32[(r20+31)] = 1008981770;
	heap32[(r20+32)] = 1008981770;
	heap32[(r20+33)] = 1008981770;
	heap32[(r20+2)] = 1065353216;
	heap32[(r20+3)] = 0;
	heap32[(r20+4)] = 0;
	heap32[(r20+5)] = 0;
	heap32[(r20+6)] = 0;
	heap32[(r20+7)] = 1065353216;
	heap32[(r20+8)] = 0;
	heap32[(r20+9)] = 0;
	heap32[(r20+10)] = 0;
	heap32[(r20+11)] = 0;
	heap32[(r20+12)] = 1065353216;
	heap32[(r20+13)] = 0;
	heap32[(r20+14)] = 0;
	heap32[(r20+15)] = 0;
	heap32[(r20+16)] = 0;
	heap32[(r20+17)] = 0;
	heap32[(g0)] = r19;
	heap32[(g0+1)] = r21;
	_ZN11btRigidBody14setupRigidBodyERKNS_27btRigidBodyConstructionInfoE(i7);
	heap8[r18] = r22;
}
	r18 = _ZZN35btSequentialImpulseConstraintSolver12getFixedBodyEvE7s_fixed;
	r19 = r18 >> 2;
	r20 = heap32[(r19+51)];
	r20 = r20 | 1;
	heap32[(r19+51)] = r20;
	heap32[(r19+84)] = 0;
	f0 =                         0;
	f1 = heapFloat[(r19+95)];
	f2 = heapFloat[(r19+94)];
	f3 = heapFloat[(r19+93)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r19+89)] = f3;
	f1 = f1*f0;
	heapFloat[(r19+90)] = f2;
	heapFloat[(r19+91)] = f1;
	heap32[(r19+92)] = 0;
	heap32[(r19+97)] = 0;
	heap32[(r19+98)] = 0;
	heap32[(r19+99)] = 0;
	heap32[(r19+100)] = 0;
	f1 = heapFloat[(r19+87)];
	f2 = heapFloat[(r19+86)];
	f3 = heapFloat[(r19+85)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r19+138)] = f3;
	f0 = f1*f0;
	heapFloat[(r19+139)] = f2;
	heapFloat[(r19+140)] = f0;
	heap32[(r19+141)] = 0;
}
else{
	r18 = r15;
}
	heap32[(r17+27)] = r18;
	r18 = r1 >> 2;
	heap32[(r17+28)] = r10;
	r19 = r3 >> 2;
	r20 = heap32[(r19+58)];
	r21 = heap32[(r18+58)];
	f0 = heapFloat[(r9+15)];
	f1 = heapFloat[(r19+15)];
	f2 = heapFloat[(r9+14)];
	f3 = heapFloat[(r19+14)];
	f4 = heapFloat[(r9+13)];
	f5 = heapFloat[(r19+13)];
	r19 = sp + -296;
	f4 = f4-f5;
	f2 = f2-f3;
	r22 = r19 >> 2;
	heapFloat[(fp+-74)] = f4;
	f0 = f0-f1;
	heapFloat[(r22+1)] = f2;
	heapFloat[(r22+2)] = f0;
	heap32[(r22+3)] = 0;
	f1 = heapFloat[(r9+11)];
	f3 = heapFloat[(r18+15)];
	f5 = heapFloat[(r9+10)];
	f6 = heapFloat[(r18+14)];
	f7 = heapFloat[(r9+9)];
	f8 = heapFloat[(r18+13)];
	r18 = sp + -312;
	f7 = f7-f8;
	f5 = f5-f6;
	r22 = r18 >> 2;
	heapFloat[(fp+-78)] = f7;
	f1 = f1-f3;
	heapFloat[(r22+1)] = f5;
	heapFloat[(r22+2)] = f1;
	r23 = r8 >> 2;
	heap32[(r22+3)] = 0;
	r22 = r8 >> 2;
	r24 = r8 >> 2;
	r20 = r20 & 2;
	r21 = r21 & 2;
	r20 = r20 == 0 ? r16 : r3;
	r16 = r21 == 0 ? r16 : r1;
	if(r20 ==0) //_LBB612_140
{
	heap32[(r17+12)] = 0;
	heap32[(r17+13)] = 0;
	f3 =                         0;
	heap32[(r17+14)] = 0;
	heap32[(r17+15)] = 0;
	f6 = f3;
	f8 = f3;
}
else{
	f3 = heapFloat[(r23+17)];
	f6 = heapFloat[(r22+19)];
	f8 = heapFloat[(r24+18)];
	f9 = f4*f8;
	f10 = f2*f3;
	f3 = f0*f3;
	f11 = f4*f6;
	f6 = f2*f6;
	f8 = f0*f8;
	f9 = f9-f10;
	f3 = f3-f11;
	f6 = f6-f8;
	r21 = r20 >> 2;
	f8 = heapFloat[(r21+64)];
	f10 = heapFloat[(r21+65)];
	f11 = heapFloat[(r21+68)];
	f12 = heapFloat[(r21+69)];
	f8 = f8*f6;
	f10 = f10*f3;
	f13 = heapFloat[(r21+66)];
	f14 = heapFloat[(r21+72)];
	f15 = heapFloat[(r21+73)];
	f16 = heapFloat[(r21+70)];
	f11 = f11*f6;
	f12 = f12*f3;
	f8 = f8+f10;
	f10 = f13*f9;
	f13 = heapFloat[(r21+74)];
	f6 = f14*f6;
	f3 = f15*f3;
	f11 = f11+f12;
	f12 = f16*f9;
	f8 = f8+f10;
	f10 = heapFloat[(r21+134)];
	f14 = heapFloat[(r21+136)];
	f15 = heapFloat[(r21+135)];
	f11 = f11+f12;
	f8 = f8*f10;
	f3 = f6+f3;
	f6 = f13*f9;
	f3 = f3+f6;
	f6 = f11*f15;
	heapFloat[(r17+12)] = f8;
	f3 = f3*f14;
	heapFloat[(r17+13)] = f6;
	heapFloat[(r17+14)] = f3;
	heap32[(r17+15)] = 0;
}
	if(r16 ==0) //_LBB612_143
{
	heap32[(r17+16)] = 0;
	heap32[(r17+17)] = 0;
	f10 =                         0;
	heap32[(r17+18)] = 0;
	heap32[(r17+19)] = 0;
	f11 = f10;
	f9 = f10;
}
else{
	f9 = heapFloat[(r24+18)];
	f10 = heapFloat[(r23+17)];
	f11 = heapFloat[(r22+19)];
	f12 = f5*f11;
	f13 = f1*f9;
	r21 = r16 >> 2;
	f12 = f12-f13;
	f13 = f1*f10;
	f11 = f7*f11;
	f12 = -f12;
	f14 = heapFloat[(r21+64)];
	f11 = f13-f11;
	f13 = heapFloat[(r21+65)];
	f9 = f7*f9;
	f10 = f5*f10;
	f15 = heapFloat[(r21+68)];
	f16 = heapFloat[(r21+69)];
	f14 = f14*f12;
	f13 = f13*f11;
	f9 = f9-f10;
	f10 = heapFloat[(r21+66)];
	f17 = heapFloat[(r21+72)];
	f18 = heapFloat[(r21+73)];
	f19 = heapFloat[(r21+70)];
	f15 = f15*f12;
	f16 = f16*f11;
	f13 = f14-f13;
	f10 = f10*f9;
	f14 = heapFloat[(r21+74)];
	f12 = f17*f12;
	f11 = f18*f11;
	f15 = f15-f16;
	f16 = f19*f9;
	f10 = f13-f10;
	f13 = heapFloat[(r21+134)];
	f17 = heapFloat[(r21+136)];
	f18 = heapFloat[(r21+135)];
	f15 = f15-f16;
	f10 = f10*f13;
	f11 = f12-f11;
	f9 = f14*f9;
	f9 = f11-f9;
	f11 = f15*f18;
	heapFloat[(r17+16)] = f10;
	f9 = f9*f17;
	heapFloat[(r17+17)] = f11;
	heapFloat[(r17+18)] = f9;
	heap32[(r17+19)] = 0;
}
	if(r20 !=0) //_LBB612_146
{
	f12 = f6*f0;
	f13 = f3*f2;
	f3 = f3*f4;
	f14 = f8*f0;
	f15 = heapFloat[(r23+17)];
	f12 = f12-f13;
	f13 = heapFloat[(r24+18)];
	f3 = f3-f14;
	f8 = f8*f2;
	f6 = f6*f4;
	f12 = f15*f12;
	f3 = f13*f3;
	f13 = heapFloat[(r22+19)];
	f6 = f8-f6;
	r21 = r20 >> 2;
	f3 = f12+f3;
	f6 = f13*f6;
	f8 = heapFloat[(r21+84)];
	f3 = f3+f6;
	f3 = f8+f3;
}
else{
	f3 =                         0;
}
	if(r16 !=0) //_LBB612_149
{
	f6 = f5*f9;
	f8 = f1*f11;
	f12 = f1*f10;
	f9 = f7*f9;
	f13 = heapFloat[(r23+17)];
	f6 = f6-f8;
	f8 = heapFloat[(r24+18)];
	f9 = f12-f9;
	f11 = f7*f11;
	f10 = f5*f10;
	f6 = f13*f6;
	f9 = f8*f9;
	f8 = heapFloat[(r22+19)];
	f10 = f11-f10;
	r21 = r16 >> 2;
	f9 = f6+f9;
	f6 = f8*f10;
	f8 = heapFloat[(r21+84)];
	f9 = f9+f6;
	f9 = f8+f9;
}
else{
	f9 =                         0;
}
	f6 =                         1;
	f3 = f3+f9;
	f3 = f6/f3;
	heapFloat[(r17+23)] = f3;
	f3 = heapFloat[(r23+17)];
	heapFloat[(r17+4)] = f3;
	f8 = heapFloat[(r24+18)];
	heapFloat[(r17+5)] = f8;
	f9 = heapFloat[(r22+19)];
	heapFloat[(r17+6)] = f9;
	heap32[(r17+7)] = heap32[(r9+20)];
	f10 = heapFloat[(r22+19)];
	f11 = heapFloat[(r24+18)];
	f12 = heapFloat[(r23+17)];
	f13 = f2*f10;
	f14 = f0*f11;
	f15 = f0*f12;
	f10 = f4*f10;
	f13 = f13-f14;
	f11 = f4*f11;
	f12 = f2*f12;
	f10 = f15-f10;
	heapFloat[(r17)] = f13;
	f11 = f11-f12;
	heapFloat[(r17+1)] = f10;
	heapFloat[(r17+2)] = f11;
	heap32[(r17+3)] = 0;
	f10 = heapFloat[(r24+18)];
	f11 = heapFloat[(r22+19)];
	f12 = heapFloat[(r23+17)];
	f13 = f1*f10;
	f14 = f5*f11;
	f11 = f7*f11;
	f15 = f1*f12;
	f13 = f13-f14;
	f12 = f5*f12;
	f10 = f7*f10;
	f11 = f11-f15;
	heapFloat[(r17+8)] = f13;
	f10 = f12-f10;
	heapFloat[(r17+9)] = f11;
	heapFloat[(r17+10)] = f10;
	heap32[(r17+11)] = 0;
	if(r20 !=0) //_LBB612_152
{
	r21 = r20 >> 2;
	f10 = heapFloat[(r21+81)];
	f11 = heapFloat[(r21+80)];
	f12 = heapFloat[(r21+82)];
	f13 = f11*f2;
	f14 = f10*f4;
	f4 = f12*f4;
	f11 = f11*f0;
	f0 = f10*f0;
	f2 = f12*f2;
	f10 = heapFloat[(r21+78)];
	f12 = f13-f14;
	f13 = heapFloat[(r21+77)];
	f11 = f4-f11;
	f14 = heapFloat[(r21+76)];
	f0 = f0-f2;
	f4 = f10+f12;
	f2 = f13+f11;
	f0 = f14+f0;
}
else{
	f0 =                         0;
	f2 = f0;
	f4 = f0;
}
	if(r16 !=0) //_LBB612_155
{
	r21 = r16 >> 2;
	f10 = heapFloat[(r21+81)];
	f11 = heapFloat[(r21+80)];
	f12 = heapFloat[(r21+82)];
	f13 = f11*f5;
	f14 = f10*f7;
	f7 = f12*f7;
	f11 = f11*f1;
	f1 = f10*f1;
	f5 = f12*f5;
	f10 = heapFloat[(r21+78)];
	f12 = f13-f14;
	f13 = heapFloat[(r21+77)];
	f11 = f7-f11;
	f14 = heapFloat[(r21+76)];
	f1 = f1-f5;
	f7 = f10+f12;
	f5 = f13+f11;
	f1 = f14+f1;
}
else{
	f1 =                         0;
	f5 = f1;
	f7 = f1;
}
	f0 = f0-f1;
	f1 = f2-f5;
	f2 = heapFloat[(r23+17)];
	f5 = heapFloat[(r24+18)];
	f4 = f4-f7;
	f7 = heapFloat[(r22+19)];
	f2 = f2*f0;
	f5 = f5*f1;
	f2 = f2+f5;
	f5 = f7*f4;
	f7 = heapFloat[(r9+21)];
	f10 = heapFloat[(r6+13)];
	f2 = f2+f5;
	f5 = f7+f10;
	heap32[(r17+22)] = heap32[(r9+22)];
	r21 = heap32[(r9+37)];
	r25 = heap32[(r6+16)];
	if(r21 >r25) //_LBB612_159
{
__label__ = 151;
}
else{
	f7 = heapFloat[(r9+23)];
	f10 = -f2;
	f7 = f7*f10;
	f10 =                         0;
	if(f7 <=f10) //_LBB612_159
{
__label__ = 151;
}
else{
__label__ = 152;
}
}
if (__label__ == 151){
	f7 =                         0;
}
	r21 = heapU8[r5+60];
	r21 = r21 & 4;
	if(r21 ==0) //_LBB612_167
{
	heap32[(r17+21)] = 0;
}
else{
	f10 = heapFloat[(r9+29)];
	f11 = heapFloat[(r6+14)];
	f10 = f10*f11;
	heapFloat[(r17+21)] = f10;
if(!(r20 ==0)) //_LBB612_164
{
	r21 = r20 >> 2;
	f11 = heapFloat[(r21+84)];
	f12 =                         0;
if(!(f11 ==f12)) //_LBB612_164
{
	f3 = f3*f11;
	f12 = heapFloat[(r21+85)];
	f3 = f3*f12;
	f3 = f3*f10;
	f12 = heapFloat[(r21+126)];
	f13 = heapFloat[(r21+86)];
	f14 = heapFloat[(r21+87)];
	f8 = f8*f11;
	f3 = f12+f3;
	f8 = f8*f13;
	heapFloat[(r21+126)] = f3;
	f3 = f8*f10;
	f8 = heapFloat[(r21+127)];
	f9 = f9*f11;
	f3 = f8+f3;
	f8 = f9*f14;
	heapFloat[(r21+127)] = f3;
	f3 = f8*f10;
	f8 = heapFloat[(r21+128)];
	f3 = f8+f3;
	heapFloat[(r21+128)] = f3;
	f3 = heapFloat[(r21+134)];
	f3 = f3*f10;
	f8 = heapFloat[(r17+12)];
	f9 = heapFloat[(r21+136)];
	f11 = heapFloat[(r21+135)];
	f3 = f8*f3;
	f8 = heapFloat[(r21+130)];
	f12 = heapFloat[(r17+14)];
	f13 = heapFloat[(r17+13)];
	f3 = f8+f3;
	f8 = f11*f10;
	heapFloat[(r21+130)] = f3;
	f3 = f13*f8;
	f8 = heapFloat[(r21+131)];
	f3 = f8+f3;
	f8 = f9*f10;
	heapFloat[(r21+131)] = f3;
	f3 = f12*f8;
	f8 = heapFloat[(r21+132)];
	f3 = f8+f3;
	heapFloat[(r21+132)] = f3;
}
}
if(!(r16 ==0)) //_LBB612_168
{
	r21 = r16 >> 2;
	f3 = heapFloat[(r21+84)];
	f8 =                         0;
if(!(f3 ==f8)) //_LBB612_168
{
	f8 = heapFloat[(r17+21)];
	f8 = -f8;
	f9 = heapFloat[(r17+4)];
	f9 = f9*f3;
	f10 = heapFloat[(r21+85)];
	f9 = f9*f10;
	f10 = heapFloat[(r17+5)];
	f11 = heapFloat[(r17+6)];
	f9 = f9*f8;
	f12 = heapFloat[(r21+126)];
	f13 = heapFloat[(r21+86)];
	f14 = heapFloat[(r21+87)];
	f15 = heapFloat[(r17+16)];
	f16 = heapFloat[(r17+17)];
	f17 = heapFloat[(r17+18)];
	f10 = f10*f3;
	f9 = f12+f9;
	f10 = f10*f13;
	heapFloat[(r21+126)] = f9;
	f9 = f10*f8;
	f10 = heapFloat[(r21+127)];
	f3 = f11*f3;
	f9 = f10+f9;
	f3 = f3*f14;
	heapFloat[(r21+127)] = f9;
	f3 = f3*f8;
	f9 = heapFloat[(r21+128)];
	f3 = f9+f3;
	heapFloat[(r21+128)] = f3;
	f3 = heapFloat[(r21+134)];
	f3 = f3*f8;
	f9 = heapFloat[(r21+136)];
	f10 = heapFloat[(r21+135)];
	f11 = heapFloat[(r21+130)];
	f3 = f3*f15;
	f3 = f11-f3;
	f10 = f10*f8;
	heapFloat[(r21+130)] = f3;
	f3 = f10*f16;
	f10 = heapFloat[(r21+131)];
	f3 = f10-f3;
	f8 = f9*f8;
	heapFloat[(r21+131)] = f3;
	f3 = f8*f17;
	f8 = heapFloat[(r21+132)];
	f3 = f8-f3;
	heapFloat[(r21+132)] = f3;
}
}
}
	heap32[(r17+20)] = 0;
	if(r20 !=0) //_LBB612_170
{
	r21 = r20 >> 2;
	f9 = heapFloat[(r21+76)];
	f8 = heapFloat[(r21+77)];
	f3 = heapFloat[(r21+78)];
}
else{
	f3 =                         0;
	f8 = f3;
	f9 = f3;
}
	f10 = heapFloat[(r17+4)];
	f11 = heapFloat[(r17+5)];
	f12 = heapFloat[(r17+6)];
	f9 = f10*f9;
	f8 = f11*f8;
	f8 = f9+f8;
	f3 = f12*f3;
	f3 = f8+f3;
	if(r20 !=0) //_LBB612_173
{
	r20 = r20 >> 2;
	f13 = heapFloat[(r20+80)];
	f9 = heapFloat[(r20+81)];
	f8 = heapFloat[(r20+82)];
}
else{
	f8 =                         0;
	f9 = f8;
	f13 = f8;
}
	f14 = heapFloat[(r17)];
	f15 = heapFloat[(r17+1)];
	f13 = f14*f13;
	f9 = f15*f9;
	f14 = heapFloat[(r17+2)];
	f9 = f13+f9;
	f8 = f14*f8;
	f8 = f9+f8;
	f3 = f3+f8;
	if(r16 !=0) //_LBB612_176
{
	r20 = r16 >> 2;
	f13 = heapFloat[(r20+80)];
	f9 = heapFloat[(r20+81)];
	f8 = heapFloat[(r20+82)];
}
else{
	f8 =                         0;
	f9 = f8;
	f13 = f8;
}
	f14 = heapFloat[(r17+8)];
	f15 = heapFloat[(r17+9)];
	f13 = f14*f13;
	f9 = f15*f9;
	f14 = heapFloat[(r17+10)];
	f9 = f13+f9;
	f8 = f14*f8;
	f8 = f9+f8;
	if(r16 !=0) //_LBB612_179
{
	r16 = r16 >> 2;
	f14 = heapFloat[(r16+76)];
	f13 = heapFloat[(r16+77)];
	f9 = heapFloat[(r16+78)];
}
else{
	f9 =                         0;
	f13 = f9;
	f14 = f9;
}
	f10 = f10*f14;
	f11 = f11*f13;
	f10 = f10+f11;
	f9 = f12*f9;
	f9 = f10+f9;
	f10 = heapFloat[(r6+8)];
	f11 = -f5;
	f8 = f8-f9;
	f9 = f10*f11;
	f10 = heapFloat[(r6+3)];
	f3 = f3+f8;
	f8 = f9/f10;
	f9 = heapFloat[(r17+23)];
	f3 = f7-f3;
	f7 = f9*f8;
	f3 = f9*f3;
	r16 = heap32[(r6+11)];
	if(r16 ==0) //_LBB612_182
{
__label__ = 174;
}
else{
	f8 = heapFloat[(r6+12)];
	if(f8 >=f5) //_LBB612_183
{
	heapFloat[(r17+29)] = f3;
	heapFloat[(r17+33)] = f7;
__label__ = 176;
}
else{
__label__ = 174;
}
}
if (__label__ == 174){
	f3 = f7+f3;
	heapFloat[(r17+29)] = f3;
	heap32[(r17+33)] = 0;
}
	heap32[(r17+30)] = 0;
	heap32[(r17+31)] = 0;
	heap32[(r17+32)] = 1343554297;
	r16 = heap32[(r2+12)];
	heap32[(r17+25)] = r16;
	r16 = heapU8[r5+60];
	r16 = r16 & 32;
	if(r16 ==0) //_LBB612_186
{
__label__ = 178;
}
else{
	r16 = heapU8[r8+120];
	if(r16 !=0) //_LBB612_200
{
	r16 = r8 >> 2;
	f0 = heapFloat[(r9+35)];
	f1 = heapFloat[(r16+33)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heapFloat[(g0+9)] = f1;
	heapFloat[(g0+10)] = f0;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
	r12 = heapU8[r5+60];
	r12 = r12 & 16;
	if(r12 ==0) //_LBB612_202
{
__label__ = 194;
}
else{
	r12 = r8 >> 2;
	r8 = r8 >> 2;
	f0 = heapFloat[(r12+36)];
	f1 = heapFloat[(r8+34)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heapFloat[(g0+9)] = f1;
	heapFloat[(g0+10)] = f0;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
__label__ = 194;
}
}
else{
__label__ = 178;
}
}
_259: do {
if (__label__ == 178){
	f3 = heapFloat[(r23+17)];
	f5 = heapFloat[(r22+19)];
	f7 = heapFloat[(r24+18)];
	f8 = f3*f2;
	f0 = f0-f8;
	f8 = f7*f2;
	r16 = r8 >> 2;
	f1 = f1-f8;
	f2 = f5*f2;
	r20 = r8 >> 2;
	heapFloat[(r16+38)] = f0;
	f2 = f4-f2;
	r21 = r8 >> 2;
	heapFloat[(r20+39)] = f1;
	r25 = r8 >> 2;
	heapFloat[(r21+40)] = f2;
	heap32[(r25+41)] = 0;
	r25 = heapU8[r5+60];
	r25 = r25 & 64;
if(!(r25 !=0)) //_LBB612_191
{
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	f1 =   1.1920928955078125e-007;
if(!(f0 <=f1)) //_LBB612_191
{
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f3 = f6/f_g0;
	f5 = heapFloat[(r16+38)];
	f5 = f5*f3;
	heapFloat[(r16+38)] = f5;
	f7 = heapFloat[(r20+39)];
	f7 = f7*f3;
	heapFloat[(r20+39)] = f7;
	f0 = heapFloat[(r21+40)];
	f3 = f0*f3;
	heapFloat[(r21+40)] = f3;
	r16 = heapU8[r5+60];
	r16 = r16 & 16;
if(!(r16 ==0)) //_LBB612_190
{
	f0 = heapFloat[(r22+19)];
	f1 = heapFloat[(r24+18)];
	f2 = heapFloat[(r23+17)];
	f4 = f7*f0;
	f8 = f3*f1;
	f4 = f4-f8;
	f3 = f3*f2;
	f0 = f5*f0;
	r16 = r8 >> 2;
	f3 = f3-f0;
	f5 = f5*f1;
	f7 = f7*f2;
	r20 = r8 >> 2;
	heapFloat[(r16+42)] = f4;
	f5 = f5-f7;
	r21 = r8 >> 2;
	heapFloat[(r20+43)] = f3;
	f7 = f4*f4;
	f3 = f3*f3;
	r22 = r8 >> 2;
	heapFloat[(r21+44)] = f5;
	heap32[(r22+45)] = 0;
	f3 = f7+f3;
	f5 = f5*f5;
	f3 = f3+f5;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	f3 = f6/f_g0;
	f5 = heapFloat[(r16+42)];
	f5 = f5*f3;
	heapFloat[(r16+42)] = f5;
	f5 = heapFloat[(r20+43)];
	f5 = f5*f3;
	heapFloat[(r20+43)] = f5;
	f5 = heapFloat[(r21+44)];
	f3 = f5*f3;
	heapFloat[(r21+44)] = f3;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r11;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r11;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heap32[(g0+9)] = 0;
	heap32[(g0+10)] = 0;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
}
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r12;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r12;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heap32[(g0+9)] = 0;
	heap32[(g0+10)] = 0;
	r10 = 1;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
	heap8[r8+120] = r10;
break _259;
}
}
	f0 =                         0;
	if(f5 <f0) //_LBB612_193
{
	f0 = -f5;
}
else{
	f0 = f5;
}
	f1 =       0.70710676908493042;
	if(f0 <=f1) //_LBB612_196
{
	f3 = f3*f3;
	f0 = f7*f7;
	f3 = f3+f0;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	f1 = heapFloat[(r24+18)];
	f0 = f6/f_g0;
	f1 = -f1;
	f1 = f0*f1;
	heapFloat[(r16+38)] = f1;
	f2 = heapFloat[(r23+17)];
	f2 = f2*f0;
	heapFloat[(r20+39)] = f2;
	heap32[(r21+40)] = 0;
	f4 = heapFloat[(r22+19)];
	f5 = -f4;
	r16 = r8 >> 2;
	f2 = f2*f5;
	f3 = f3*f0;
	r20 = r8 >> 2;
	f0 = f4*f1;
	heapFloat[(r16+42)] = f2;
	heapFloat[(r20+43)] = f0;
}
else{
	f3 = f7*f7;
	f7 = f5*f5;
	f3 = f3+f7;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	heap32[(r16+38)] = 0;
	f0 = heapFloat[(r22+19)];
	f6 = f6/f_g0;
	f7 = -f0;
	f7 = f6*f7;
	heapFloat[(r20+39)] = f7;
	f0 = heapFloat[(r24+18)];
	f0 = f0*f6;
	r16 = r8 >> 2;
	f3 = f3*f6;
	heapFloat[(r21+40)] = f0;
	heapFloat[(r16+42)] = f3;
	f3 = heapFloat[(r23+17)];
	f6 = -f3;
	f3 = f3*f7;
	r16 = r8 >> 2;
	f6 = f0*f6;
	heapFloat[(r16+43)] = f6;
}
	r16 = r8 >> 2;
	heapFloat[(r16+44)] = f3;
	r16 = heapU8[r5+60];
	r16 = r16 & 16;
if(!(r16 ==0)) //_LBB612_199
{
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r11;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r11;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heap32[(g0+9)] = 0;
	heap32[(g0+10)] = 0;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
}
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r12;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r12;
	_Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(i7);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r19;
	heap32[(g0+5)] = r18;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = 1065353216;
	heap32[(g0+9)] = 0;
	heap32[(g0+10)] = 0;
	r10 = 1;
	_ZN35btSequentialImpulseConstraintSolver21addFrictionConstraintERK9btVector3P11btRigidBodyS4_iR15btManifoldPointS2_S2_P17btCollisionObjectS8_fff(i7);
	heap8[r8+120] = r10;
}
} while(0);
	r8 = heap32[(r6+15)];
	r10 = heap32[(r17+25)];
	r11 = heap32[(r2+14)];
	r12 = r8 & 8;
	if(r12 ==0) //_LBB612_220
{
	r8 = (r10 * 136)|0;
	r8 = (r11 + r8)|0;
	r8 = r8 >> 2;
	heap32[(r8+21)] = 0;
	r8 = heapU8[r5+60];
	r8 = r8 & 16;
	if(r8 ==0) //_LBB612_222
{
break _153;
}
else{
	r8 = heap32[(r17+25)];
	r9 = heap32[(r2+14)];
	r8 = (r8 * 136)|0;
	r8 = (r8 + r9)|0;
	r8 = r8 >> 2;
	heap32[(r8+55)] = 0;
}
}
else{
	r8 = r8 & 4;
	if(r8 ==0) //_LBB612_210
{
	r10 = (r10 * 136)|0;
	r10 = (r11 + r10)|0;
	r10 = r10 >> 2;
	heap32[(r10+21)] = 0;
}
else{
	r10 = (r10 * 136)|0;
	r10 = (r11 + r10)|0;
	f0 = heapFloat[(r9+31)];
	f1 = heapFloat[(r6+14)];
	f0 = f0*f1;
	r10 = r10 >> 2;
	heapFloat[(r10+21)] = f0;
if(!(r13 ==0)) //_LBB612_207
{
	r11 = r13 >> 2;
	f1 = heapFloat[(r11+84)];
	f2 =                         0;
if(!(f1 ==f2)) //_LBB612_207
{
	f2 = heapFloat[(r10+4)];
	f2 = f2*f1;
	f3 = heapFloat[(r11+85)];
	f2 = f2*f3;
	f3 = heapFloat[(r10+5)];
	f4 = heapFloat[(r10+6)];
	f2 = f2*f0;
	f5 = heapFloat[(r11+126)];
	f6 = heapFloat[(r11+86)];
	f7 = heapFloat[(r11+87)];
	f3 = f3*f1;
	f2 = f5+f2;
	f3 = f3*f6;
	heapFloat[(r11+126)] = f2;
	f2 = f3*f0;
	f3 = heapFloat[(r11+127)];
	f1 = f4*f1;
	f2 = f3+f2;
	f1 = f1*f7;
	heapFloat[(r11+127)] = f2;
	f1 = f1*f0;
	f2 = heapFloat[(r11+128)];
	f1 = f2+f1;
	heapFloat[(r11+128)] = f1;
	f1 = heapFloat[(r11+134)];
	f1 = f1*f0;
	f2 = heapFloat[(r10+12)];
	f3 = heapFloat[(r11+136)];
	f4 = heapFloat[(r11+135)];
	f1 = f2*f1;
	f2 = heapFloat[(r11+130)];
	f5 = heapFloat[(r10+14)];
	f6 = heapFloat[(r10+13)];
	f1 = f2+f1;
	f2 = f4*f0;
	heapFloat[(r11+130)] = f1;
	f1 = f6*f2;
	f2 = heapFloat[(r11+131)];
	f1 = f2+f1;
	f0 = f3*f0;
	heapFloat[(r11+131)] = f1;
	f0 = f5*f0;
	f1 = heapFloat[(r11+132)];
	f0 = f1+f0;
	heapFloat[(r11+132)] = f0;
}
}
if(!(r15 ==0)) //_LBB612_211
{
	r11 = r15 >> 2;
	f0 = heapFloat[(r11+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB612_211
{
	f1 = heapFloat[(r10+21)];
	f1 = -f1;
	f2 = heapFloat[(r10+4)];
	f2 = f2*f0;
	f3 = heapFloat[(r11+85)];
	f2 = f2*f3;
	f3 = heapFloat[(r10+5)];
	f4 = heapFloat[(r10+6)];
	f2 = f2*f1;
	f5 = heapFloat[(r11+126)];
	f6 = heapFloat[(r11+86)];
	f7 = heapFloat[(r11+87)];
	f8 = heapFloat[(r10+16)];
	f9 = heapFloat[(r10+17)];
	f10 = heapFloat[(r10+18)];
	f3 = f3*f0;
	f2 = f5+f2;
	f3 = f3*f6;
	heapFloat[(r11+126)] = f2;
	f2 = f3*f1;
	f3 = heapFloat[(r11+127)];
	f0 = f4*f0;
	f2 = f3+f2;
	f0 = f0*f7;
	heapFloat[(r11+127)] = f2;
	f0 = f0*f1;
	f2 = heapFloat[(r11+128)];
	f0 = f2+f0;
	heapFloat[(r11+128)] = f0;
	f0 = heapFloat[(r11+134)];
	f0 = f0*f1;
	f2 = heapFloat[(r11+136)];
	f3 = heapFloat[(r11+135)];
	f4 = heapFloat[(r11+130)];
	f0 = f0*f8;
	f0 = f4-f0;
	f3 = f3*f1;
	heapFloat[(r11+130)] = f0;
	f0 = f3*f9;
	f3 = heapFloat[(r11+131)];
	f0 = f3-f0;
	f1 = f2*f1;
	heapFloat[(r11+131)] = f0;
	f0 = f1*f10;
	f1 = heapFloat[(r11+132)];
	f0 = f1-f0;
	heapFloat[(r11+132)] = f0;
}
}
}
	r10 = heap32[(r6+15)];
	r11 = r10 & 16;
if(!(r11 ==0)) //_LBB612_222
{
	r11 = heap32[(r17+25)];
	r17 = heap32[(r2+14)];
	r10 = r10 & 4;
	if(r10 ==0) //_LBB612_219
{
	r10 = (r11 * 136)|0;
	r10 = (r17 + r10)|0;
	r10 = r10 >> 2;
	heap32[(r10+55)] = 0;
}
else{
	r11 = (r11 * 136)|0;
	r11 = (r17 + r11)|0;
	f0 = heapFloat[(r9+32)];
	f1 = heapFloat[(r6+14)];
	f0 = f0*f1;
	r11 = r11 >> 2;
	heapFloat[(r11+55)] = f0;
if(!(r13 ==0)) //_LBB612_216
{
	r17 = r13 >> 2;
	f1 = heapFloat[(r17+84)];
	f2 =                         0;
if(!(f1 ==f2)) //_LBB612_216
{
	f2 = heapFloat[(r11+38)];
	f2 = f2*f1;
	f3 = heapFloat[(r11+39)];
	f4 = heapFloat[(r11+40)];
	f5 = heapFloat[(r17+126)];
	f2 = f2*f0;
	f2 = f5+f2;
	f3 = f3*f1;
	heapFloat[(r17+126)] = f2;
	f2 = f3*f0;
	f3 = heapFloat[(r17+127)];
	f2 = f3+f2;
	f1 = f4*f1;
	heapFloat[(r17+127)] = f2;
	f1 = f1*f0;
	f2 = heapFloat[(r17+128)];
	f1 = f2+f1;
	heapFloat[(r17+128)] = f1;
	f1 = heapFloat[(r17+134)];
	f1 = f1*f0;
	f2 = heapFloat[(r11+46)];
	f3 = heapFloat[(r17+136)];
	f4 = heapFloat[(r17+135)];
	f1 = f2*f1;
	f2 = heapFloat[(r17+130)];
	f5 = heapFloat[(r11+48)];
	f6 = heapFloat[(r11+47)];
	f1 = f2+f1;
	f2 = f4*f0;
	heapFloat[(r17+130)] = f1;
	f1 = f6*f2;
	f2 = heapFloat[(r17+131)];
	f1 = f2+f1;
	f0 = f3*f0;
	heapFloat[(r17+131)] = f1;
	f0 = f5*f0;
	f1 = heapFloat[(r17+132)];
	f0 = f1+f0;
	heapFloat[(r17+132)] = f0;
}
}
if(!(r15 ==0)) //_LBB612_222
{
	r17 = r15 >> 2;
	f0 = heapFloat[(r17+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB612_222
{
	f1 = heapFloat[(r11+55)];
	f1 = -f1;
	f2 = heapFloat[(r11+38)];
	f2 = f2*f0;
	f3 = heapFloat[(r11+39)];
	f4 = heapFloat[(r11+40)];
	f2 = f2*f1;
	f5 = heapFloat[(r17+126)];
	f6 = heapFloat[(r11+50)];
	f7 = heapFloat[(r11+51)];
	f8 = heapFloat[(r11+52)];
	f2 = f5+f2;
	f3 = f3*f0;
	heapFloat[(r17+126)] = f2;
	f2 = f3*f1;
	f3 = heapFloat[(r17+127)];
	f2 = f3+f2;
	f0 = f4*f0;
	heapFloat[(r17+127)] = f2;
	f0 = f0*f1;
	f2 = heapFloat[(r17+128)];
	f0 = f2+f0;
	heapFloat[(r17+128)] = f0;
	f0 = heapFloat[(r17+134)];
	f0 = f0*f1;
	f2 = heapFloat[(r17+136)];
	f3 = heapFloat[(r17+135)];
	f4 = heapFloat[(r17+130)];
	f0 = f0*f6;
	f0 = f4-f0;
	f3 = f3*f1;
	heapFloat[(r17+130)] = f0;
	f0 = f3*f7;
	f3 = heapFloat[(r17+131)];
	f0 = f3-f0;
	f1 = f2*f1;
	heapFloat[(r17+131)] = f0;
	f0 = f1*f8;
	f1 = heapFloat[(r17+132)];
	f0 = f1-f0;
	heapFloat[(r17+132)] = f0;
}
}
}
}
}
}
} while(0);
	r7 = (r7 + 1)|0;
	r4 = (r4 + 276)|0;
}
else{
break _150;
}
}
}
	r1 = heap32[(fp+-133)];
	r1 = (r1 + -1)|0;
	heap32[(fp+-133)] = r1;
	r3 = heap32[(fp+-132)];
	r3 = (r3 + 4)|0;
	heap32[(fp+-132)] = r3;
if(!(r1 !=0)) //_LBB612_97
{
break _132;
}
}
}
} while(0);
	r1 = heap32[(r2+17)];
	r3 = heap32[(r2+2)];
	r4 = heap32[(r2+12)];
_307: do {
if(!(r1 >r3)) //_LBB612_244
{
if(!(r1 >=r3)) //_LBB612_244
{
	r5 = heap32[(r2+18)];
if(!(r5 >=r3)) //_LBB612_243
{
	if(r3 !=0) //_LBB612_230
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r7 = r3 << 2;
	r6 = (r6 + 1)|0;
	r7 = r7 | 3;
	heap32[(r5)] = r6;
	r5 = (r7 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB612_232
{
	r6 = 0;
	r7 = (r5 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r5 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r5;
	r5 = r7;
}
}
else{
	r5 = 0;
}
	r6 = (r0 + 76)|0;
	if(r1 <1) //_LBB612_235
{
	r7 = r6 >> 2;
	r8 = heap32[(r7)];
}
else{
	r7 = 0;
_320: while(true){
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r9 = r7 << 2;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r5 + r9)|0;
	r10 = heap32[(r10)];
	r7 = (r7 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r10;
if(!(r1 !=r7)) //_LBB612_236
{
break _320;
}
}
	r6 = (r0 + 76)|0;
}
if(!(r8 ==0)) //_LBB612_242
{
	r7 = heapU8[r0+80];
if(!(r7 ==0)) //_LBB612_241
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r9 = heap32[(r7)];
	r9 = (r9 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r7)] = r9;
	r7 = heap32[(r8+-1)];
	heap32[(g0)] = r7;
	free(i7);
}
	r7 = r6 >> 2;
	heap32[(r7)] = 0;
}
	r7 = 1;
	r6 = r6 >> 2;
	heap8[r0+80] = r7;
	heap32[(r6)] = r5;
	heap32[(r2+18)] = r3;
	if(r1 >=r3) //_LBB612_244
{
break _307;
}
}
_330: while(true){
	r5 = r1 << 2;
	r6 = heap32[(r2+19)];
	r5 = (r6 + r5)|0;
	r1 = (r1 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = 0;
if(!(r3 !=r1)) //_LBB612_243
{
break _307;
}
}
}
}
} while(0);
	heap32[(r2+17)] = r3;
	r1 = heap32[(r2+22)];
_333: do {
if(!(r1 >r4)) //_LBB612_263
{
if(!(r1 >=r4)) //_LBB612_263
{
	r5 = heap32[(r2+23)];
if(!(r5 >=r4)) //_LBB612_262
{
	if(r4 !=0) //_LBB612_249
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r7 = r4 << 2;
	r6 = (r6 + 1)|0;
	r7 = r7 | 3;
	heap32[(r5)] = r6;
	r5 = (r7 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB612_251
{
	r6 = 0;
	r7 = (r5 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r5 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r5;
	r5 = r7;
}
}
else{
	r5 = 0;
}
	r6 = (r0 + 96)|0;
	if(r1 <1) //_LBB612_254
{
	r7 = r6 >> 2;
	r8 = heap32[(r7)];
}
else{
	r7 = 0;
_346: while(true){
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r9 = r7 << 2;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r5 + r9)|0;
	r10 = heap32[(r10)];
	r7 = (r7 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r10;
if(!(r1 !=r7)) //_LBB612_255
{
break _346;
}
}
	r6 = (r0 + 96)|0;
}
if(!(r8 ==0)) //_LBB612_261
{
	r7 = heapU8[r0+100];
if(!(r7 ==0)) //_LBB612_260
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r9 = heap32[(r7)];
	r9 = (r9 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r7)] = r9;
	r7 = heap32[(r8+-1)];
	heap32[(g0)] = r7;
	free(i7);
}
	r7 = r6 >> 2;
	heap32[(r7)] = 0;
}
	r7 = 1;
	r6 = r6 >> 2;
	heap8[r0+100] = r7;
	heap32[(r6)] = r5;
	heap32[(r2+23)] = r4;
	if(r1 >=r4) //_LBB612_263
{
break _333;
}
}
_356: while(true){
	r0 = r1 << 2;
	r5 = heap32[(r2+24)];
	r0 = (r5 + r0)|0;
	r1 = (r1 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
if(!(r4 !=r1)) //_LBB612_262
{
break _333;
}
}
}
}
} while(0);
	heap32[(r2+22)] = r4;
_359: do {
if(!(r3 <1)) //_LBB612_266
{
	r0 = 0;
_361: while(true){
	r1 = r0 << 2;
	r5 = heap32[(r2+19)];
	r1 = (r5 + r1)|0;
	r5 = (r0 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	r0 = r5;
if(!(r3 !=r5)) //_LBB612_265
{
break _359;
}
}
}
} while(0);
	if(r4 <1) //_LBB612_269
{
break _1;
}
else{
	r0 = 0;
_365: while(true){
	r1 = r0 << 2;
	r3 = heap32[(r2+24)];
	r1 = (r3 + r1)|0;
	r3 = (r0 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	r0 = r3;
if(!(r4 !=r3)) //_LBB612_268
{
break _1;
}
}
}
break;
case 78:
	r8 = _2E_str1157;
	r0 = _2E_str652;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 813;
	_assert(i7);
break;
}
}
} while(0);
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_369: do {
if(!(r3 !=0)) //_LBB612_275
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB612_272
{
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r1 = (r1 + r3)|0;
	r3 = heap32[(r2+3)];
	r1 = (r1 - r3)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r2+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r2+2)] = f0;
	r1 = heap32[(r2+4)];
	if(r1 !=0) //_LBB612_275
{
break _369;
}
else{
	r1 = heap32[(r0)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r0)] = r1;
}
} while(0);
	f0 =                         0;
	f_g0 = f0;
	return;
}