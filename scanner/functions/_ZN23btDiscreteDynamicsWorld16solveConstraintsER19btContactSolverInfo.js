function _ZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfo(sp)
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
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -168;var g0 = i7>>2; // save stack
	r0 = _2E_str996;
	heap32[(g0)] = r0;
	r0 = sp + -48;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r1 = 1;
	r2 = r0 >> 2;
	heap8[sp+-32] = r1;
	heap32[(r2+3)] = 0;
	r3 = heap32[(fp)];
	heap32[(r2+1)] = 0;
	r4 = r3 >> 2;
	heap32[(r2+2)] = 0;
	r5 = heap32[(r4+47)];
if(!(r5 <1)) //_LBB654_7
{
	r6 = gNumAlignedAllocs;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r8 = r5 << 2;
	r7 = (r7 + 1)|0;
	r8 = r8 | 3;
	heap32[(r6)] = r7;
	r6 = (r8 + 16)|0;
	heap32[(g0)] = r6;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB654_3
{
	r7 = 0;
	r8 = (r6 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r6 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r6;
	r6 = r8;
}
	r7 = 1;
	heap8[sp+-32] = r7;
	r7 = (r7 - r5)|0;
	r8 = 0;
	heap32[(r2+3)] = r6;
	heap32[(r2+2)] = r5;
_6: while(true){
	r9 = r8 << 2;
	r6 = (r6 - r9)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = 0;
	if(r7 ==r8) //_LBB654_7
{
break _6;
}
else{
	r6 = heap32[(r2+3)];
	r8 = (r8 + -1)|0;
continue _6;
}
}
}
	heap32[(r2+1)] = r5;
	r5 = heap32[(r4)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+24)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r5 = r_g0;
_10: do {
if(!(r5 <1)) //_LBB654_10
{
	r5 = 0;
_12: while(true){
	r6 = r5 << 2;
	r7 = heap32[(r4+49)];
	r7 = (r7 + r6)|0;
	r7 = r7 >> 2;
	r8 = heap32[(r2+3)];
	r6 = (r8 + r6)|0;
	r7 = heap32[(r7)];
	r6 = r6 >> 2;
	heap32[(r6)] = r7;
	r6 = heap32[(r4)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+24)];
	r5 = (r5 + 1)|0;
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0;
	if(r6 >r5) //_LBB654_9
{
continue _12;
}
else{
break _10;
}
}
}
} while(0);
	r5 = heap32[(r2+1)];
if(!(r5 <2)) //_LBB654_12
{
	r5 = (r5 + -1)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r5;
	_ZN20btAlignedObjectArrayIP17btTypedConstraintE17quickSortInternalI33btSortConstraintOnIslandPredicateEEvT_ii(i7);
}
	r0 = heap32[(fp+1)];
	r5 = heap32[(r4)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+24)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB654_14
{
	r3 = heap32[(r2+3)];
}
else{
	r3 = 0;
}
	r5 = heap32[(r4+6)];
	r6 = heap32[(r4+44)];
	r7 = _ZTVZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoE27InplaceSolverIslandCallback;
	r8 = heap32[(r4+19)];
	r9 = heap32[(r4+21)];
	r10 = heap32[(r2+1)];
	r11 = sp + -144;
	r7 = (r7 + 8)|0;
	r12 = r11 >> 2;
	heap32[(fp+-36)] = r7;
	heap32[(r12+1)] = r0;
	heap32[(r12+2)] = r6;
	heap32[(r12+3)] = r3;
	heap32[(r12+4)] = r10;
	heap32[(r12+5)] = r9;
	heap32[(r12+6)] = r8;
	heap32[(r12+7)] = r5;
	heap8[sp+-96] = r1;
	heap32[(r12+11)] = 0;
	heap32[(r12+9)] = 0;
	heap32[(r12+10)] = 0;
	heap8[sp+-76] = r1;
	heap32[(r12+16)] = 0;
	heap32[(r12+14)] = 0;
	heap32[(r12+15)] = 0;
	heap8[sp+-56] = r1;
	heap32[(r12+21)] = 0;
	heap32[(r12+19)] = 0;
	r3 = r6 >> 2;
	heap32[(r12+20)] = 0;
	r6 = r5 >> 2;
	r3 = heap32[(r3)];
	r6 = heap32[(r6)];
	r3 = r3 >> 2;
	r6 = r6 >> 2;
	r3 = heap32[(r3+2)];
	r6 = heap32[(r6+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(r4+2)];
	r8 = heap32[(r4+44)];
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r_g0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = heap32[(r4+45)];
	r5 = heap32[(r4+6)];
	r6 = _2E_str155;
	heap32[(g0)] = r6;
	r6 = r3 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r8 = heap32[(r6+7)];
_22: do {
if(!(r8 >-1)) //_LBB654_23
{
	r9 = heap32[(r6+8)];
if(!(r9 >-1)) //_LBB654_22
{
	r9 = heap32[(r6+9)];
if(!(r9 ==0)) //_LBB654_21
{
	r10 = heapU8[r3+40];
if(!(r10 ==0)) //_LBB654_20
{
	r10 = gNumAlignedFree;
	r10 = r10 >> 2;
	r13 = heap32[(r10)];
	r13 = (r13 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r10)] = r13;
	r9 = heap32[(r9+-1)];
	heap32[(g0)] = r9;
	free(i7);
}
	heap32[(r6+9)] = 0;
}
	r9 = 1;
	heap8[r3+40] = r9;
	heap32[(r6+9)] = 0;
	heap32[(r6+8)] = 0;
}
_32: while(true){
	r9 = r8 << 2;
	r10 = heap32[(r6+9)];
	r9 = (r10 + r9)|0;
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = 0;
	if(r8 !=0) //_LBB654_22
{
continue _32;
}
else{
break _22;
}
}
}
} while(0);
	heap32[(r6+7)] = 0;
	r8 = heap32[(r6+2)];
	if(r8 >0) //_LBB654_25
{
	r9 = 0;
_37: while(true){
	r10 = heap32[(r6+4)];
	r13 = r9 << 3;
	r13 = (r10 + r13)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	r14 = r9 << 1;
	if(r9 ==r13) //_LBB654_28
{
	r16 = r9;
}
else{
	r15 = r10;
	r16 = r9;
_42: while(true){
	r13 = r13 << 3;
	r16 = r16 << 3;
	r13 = (r15 + r13)|0;
	r15 = (r15 + r16)|0;
	r13 = r13 >> 2;
	r15 = r15 >> 2;
	r16 = heap32[(r13)];
	heap32[(r15)] = r16;
	r16 = heap32[(r13)];
	r15 = heap32[(r6+4)];
	r13 = r16 << 3;
	r13 = (r15 + r13)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
if(!(r13 !=r16)) //_LBB654_29
{
break _42;
}
}
}
	r13 = r14 << 2;
	r10 = (r10 + r13)|0;
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r16;
if(!(r8 !=r9)) //_LBB654_26
{
break _37;
}
}
	r8 = heap32[(r6+2)];
	if(r8 >1) //_LBB654_33
{
	r9 = (r3 + 4)|0;
	r8 = (r8 + -1)|0;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r8;
	_ZN20btAlignedObjectArrayI9btElementE17quickSortInternalI31btUnionFindElementSortPredicateEEvT_ii(i7);
	r8 = heap32[(r6+2)];
}
}
	r9 = 0;
_48: while(true){
	r10 = r9;
	if(r10 <r8) //_LBB654_35
{
	r13 = heap32[(r6+4)];
	r9 = r10 << 3;
	r9 = (r13 + r9)|0;
	r9 = r9 >> 2;
	r14 = heap32[(r9)];
	r15 = (r10 + 1)|0;
_51: while(true){
	r9 = r15;
	if(r9 >=r8) //_LBB654_46
{
break _51;
}
else{
	r15 = r9 << 3;
	r15 = (r13 + r15)|0;
	r16 = r15 >> 2;
	r15 = (r9 + 1)|0;
	r16 = heap32[(r16)];
if(!(r16 ==r14)) //_LBB654_36
{
break _51;
}
}
}
	r16 = 1;
	r15 = r10;
_55: while(true){
	if(r15 <r9) //_LBB654_38
{
	r17 = r15 << 3;
	r17 = (r13 + r17)|0;
	r17 = r17 >> 2;
	r17 = heap32[(r17+1)];
	r18 = heap32[(r4+4)];
	r17 = r17 << 2;
	r17 = (r18 + r17)|0;
	r17 = r17 >> 2;
	r17 = heap32[(r17)];
	r17 = r17 >> 2;
	r18 = heap32[(r17+52)];
	if(r18 ==r14) //_LBB654_42
{
	r17 = heap32[(r17+54)];
	r18 = 0;
	if(r17 ==4) //_LBB654_44
{
	r16 = r18;
}
else{
	r16 = r17 == 1 ? r18 : r16;
}
}
else{
	if(r18 !=-1) //_LBB654_41
{
__label__ = 37;
break _48;
}
}
	r15 = (r15 + 1)|0;
}
else{
break _55;
}
}
	r13 = r16 & 255;
	if(r13 ==0) //_LBB654_50
{
_67: while(true){
	if(r10 <r9) //_LBB654_58
{
	r13 = heap32[(r6+4)];
	r15 = r10 << 3;
	r13 = (r13 + r15)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13+1)];
	r15 = heap32[(r4+4)];
	r13 = r13 << 2;
	r13 = (r15 + r13)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r15 = heap32[(r13+52)];
	if(r15 ==r14) //_LBB654_61
{
	r15 = heap32[(r13+54)];
if(!(r15 !=2)) //_LBB654_63
{
	heap32[(r13+54)] = 3;
	heap32[(r13+55)] = 0;
}
}
else{
if(!(r15 ==-1)) //_LBB654_63
{
__label__ = 54;
break _48;
}
}
	r10 = (r10 + 1)|0;
continue _67;
}
else{
continue _48;
}
}
}
else{
_75: while(true){
	if(r10 <r9) //_LBB654_51
{
	r13 = heap32[(r6+4)];
	r15 = r10 << 3;
	r13 = (r13 + r15)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13+1)];
	r15 = heap32[(r4+4)];
	r13 = r13 << 2;
	r13 = (r15 + r13)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r15 = heap32[(r13+52)];
	if(r15 ==r14) //_LBB654_54
{
	r15 = heap32[(r13+54)];
	r15 = (r15 + -4)|0;
if(!(uint(r15) <uint(2))) //_LBB654_56
{
	heap32[(r13+54)] = 2;
}
}
else{
if(!(r15 ==-1)) //_LBB654_56
{
__label__ = 47;
break _48;
}
}
	r10 = (r10 + 1)|0;
continue _75;
}
else{
continue _48;
}
}
}
}
else{
__label__ = 60;
break _48;
}
}
switch(__label__ ){//multiple entries
case 37:
	r0 = _2E_str1156;
	r1 = _2E_str2157;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 242;
	_assert(i7);
break;
case 54:
	r0 = _2E_str1156;
	r1 = _2E_str2157;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 290;
	_assert(i7);
break;
case 60:
	r8 = r5 >> 2;
	r9 = heap32[(r8)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	r9 = r_g0;
_87: do {
if(!(r9 <1)) //_LBB654_104
{
	r10 = 0;
_89: while(true){
	r13 = heap32[(r8)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+10)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r10;
	__FUNCTION_TABLE__[(r13)>>2](i7);
	r13 = r_g0;
	r14 = r13 >> 2;
	r15 = heap32[(r14+277)];
	r14 = heap32[(r14+278)];
	if(r15 ==0) //_LBB654_70
{
__label__ = 64;
}
else{
	r16 = r15 >> 2;
	r16 = heap32[(r16+54)];
	if(r16 !=2) //_LBB654_72
{
__label__ = 66;
}
else{
__label__ = 64;
}
}
if (__label__ == 64){
	if(r14 ==0) //_LBB654_103
{
__label__ = 95;
}
else{
	r16 = r14 >> 2;
	r16 = heap32[(r16+54)];
	if(r16 ==2) //_LBB654_103
{
__label__ = 95;
}
else{
__label__ = 66;
}
}
}
if (__label__ == 66){
	r16 = heapU8[r15+204];
	r16 = r16 & 2;
if(!(r16 ==0)) //_LBB654_78
{
	r16 = r15 >> 2;
	r16 = heap32[(r16+54)];
if(!(r16 ==2)) //_LBB654_78
{
	r16 = heapU8[r14+204];
	r16 = r16 & 3;
if(!(r16 !=0)) //_LBB654_78
{
	r16 = r14 >> 2;
	r17 = heap32[(r16+54)];
	r17 = (r17 + -4)|0;
if(!(uint(r17) <uint(2))) //_LBB654_77
{
	heap32[(r16+54)] = 1;
}
	heap32[(r16+55)] = 0;
}
}
}
	r16 = heapU8[r14+204];
	r16 = r16 & 2;
if(!(r16 ==0)) //_LBB654_84
{
	r16 = r14 >> 2;
	r16 = heap32[(r16+54)];
if(!(r16 ==2)) //_LBB654_84
{
	r16 = heapU8[r15+204];
	r16 = r16 & 3;
if(!(r16 !=0)) //_LBB654_84
{
	r16 = r15 >> 2;
	r17 = heap32[(r16+54)];
	r17 = (r17 + -4)|0;
if(!(uint(r17) <uint(2))) //_LBB654_83
{
	heap32[(r16+54)] = 1;
}
	heap32[(r16+55)] = 0;
}
}
}
	r16 = heapU8[r3+64];
if(!(r16 ==0)) //_LBB654_103
{
	r16 = heap32[(r8)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+7)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r15;
	heap32[(g0+2)] = r14;
	__FUNCTION_TABLE__[(r16)>>2](i7);
	r14 = r_g0;
if(!(r14 ==0)) //_LBB654_103
{
	r14 = heap32[(r6+8)];
	r15 = heap32[(r6+7)];
	if(r14 ==r15) //_LBB654_88
{
	r16 = 1;
	r17 = r15 << 1;
	r17 = r15 == 0 ? r16 : r17;
if(!(r14 >=r17)) //_LBB654_87
{
	if(r17 !=0) //_LBB654_91
{
	r14 = gNumAlignedAllocs;
	r14 = r14 >> 2;
	r18 = heap32[(r14)];
	r19 = r17 << 2;
	r18 = (r18 + 1)|0;
	r19 = r19 | 3;
	heap32[(r14)] = r18;
	r14 = (r19 + 16)|0;
	heap32[(g0)] = r14;
	malloc(i7);
	r14 = r_g0;
	if(r14 !=0) //_LBB654_93
{
	r15 = 0;
	r18 = (r14 + 4)|0;
	r15 = (r15 - r18)|0;
	r15 = r15 & 15;
	r15 = (r14 + r15)|0;
	r18 = r15 >> 2;
	heap32[(r18)] = r14;
	r14 = (r15 + 4)|0;
	r15 = heap32[(r6+7)];
}
}
else{
	r14 = 0;
}
if(!(r15 <1)) //_LBB654_97
{
	r18 = 0;
_126: while(true){
	r19 = r18 << 2;
	r20 = heap32[(r6+9)];
	r20 = (r20 + r19)|0;
	r20 = r20 >> 2;
	r19 = (r14 + r19)|0;
	r20 = heap32[(r20)];
	r18 = (r18 + 1)|0;
	r19 = r19 >> 2;
	heap32[(r19)] = r20;
if(!(r15 !=r18)) //_LBB654_96
{
break _126;
}
}
}
	r15 = heap32[(r6+9)];
if(!(r15 ==0)) //_LBB654_101
{
	r18 = heapU8[r3+40];
if(!(r18 ==0)) //_LBB654_100
{
	r18 = gNumAlignedFree;
	r18 = r18 >> 2;
	r19 = heap32[(r18)];
	r19 = (r19 + 1)|0;
	r15 = r15 >> 2;
	heap32[(r18)] = r19;
	r15 = heap32[(r15+-1)];
	heap32[(g0)] = r15;
	free(i7);
}
	heap32[(r6+9)] = 0;
}
	heap8[r3+40] = r16;
	heap32[(r6+9)] = r14;
	heap32[(r6+8)] = r17;
	r15 = heap32[(r6+7)];
}
}
	r14 = r15 << 2;
	r15 = heap32[(r6+9)];
	r14 = (r15 + r14)|0;
	r14 = r14 >> 2;
	heap32[(r14)] = r13;
	r13 = heap32[(r6+7)];
	r13 = (r13 + 1)|0;
	heap32[(r6+7)] = r13;
}
}
}
	r10 = (r10 + 1)|0;
	if(r9 !=r10) //_LBB654_68
{
continue _89;
}
else{
break _87;
}
}
}
} while(0);
	r9 = _ZN15CProfileManager11CurrentNodeE;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r13 = r10 >> 2;
	r14 = heap32[(r13+4)];
	r14 = (r14 + -1)|0;
	heap32[(r13+4)] = r14;
_138: do {
if(!(r14 !=0)) //_LBB654_110
{
	r14 = heap32[(r13+1)];
	if(r14 !=0) //_LBB654_107
{
	r10 = sp + -24;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = 0;
	r14 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r14 = r14 >> 2;
	r14 = heap32[(r14)];
	r14 = r14 >> 2;
	r10 = r10 >> 2;
	r15 = heap32[(fp+-6)];
	r16 = heap32[(r14)];
	r15 = (r15 - r16)|0;
	r10 = heap32[(r10+1)];
	r14 = heap32[(r14+1)];
	r10 = (r10 - r14)|0;
	r14 = (r15 * 1000000)|0;
	r10 = (r10 + r14)|0;
	r14 = heap32[(r13+3)];
	r10 = (r10 - r14)|0;
	f0 = uint(r10); //fuitos r10, f0
	f1 =                      1000;
	f2 = heapFloat[(r13+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r13+2)] = f0;
	r10 = heap32[(r13+4)];
	if(r10 !=0) //_LBB654_110
{
break _138;
}
else{
	r10 = heap32[(r9)];
}
}
	r10 = r10 >> 2;
	r10 = heap32[(r10+5)];
	heap32[(r9)] = r10;
}
} while(0);
	r10 = heap32[(r6+2)];
	r13 = _2E_str3158;
	heap32[(g0)] = r13;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r13 = heapU8[r3+64];
_145: do {
	if(r13 !=0) //_LBB654_112
{
	r5 = heap32[(r6+7)];
if(!(r5 <2)) //_LBB654_114
{
	r8 = (r3 + 24)|0;
	r13 = (r5 + -1)|0;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r13;
	_ZN20btAlignedObjectArrayIP20btPersistentManifoldE17quickSortInternalI33btPersistentManifoldSortPredicateEEvT_ii(i7);
}
if(!(r10 <1)) //_LBB654_163
{
	r8 = 0;
	r13 = r8;
	r14 = r8;
_151: while(true){
	r15 = heap32[(r6+4)];
	r16 = r14 << 3;
	r15 = (r15 + r16)|0;
	r15 = r15 >> 2;
	r15 = heap32[(r15)];
	r16 = r8;
_153: while(true){
	if(r14 >=r10) //_LBB654_139
{
break _153;
}
else{
	r17 = heap32[(r6+4)];
	r18 = r14 << 3;
	r17 = (r17 + r18)|0;
	r17 = r17 >> 2;
	r18 = heap32[(r17)];
	if(r18 ==r15) //_LBB654_117
{
	r17 = heap32[(r17+1)];
	r18 = heap32[(r4+4)];
	r17 = r17 << 2;
	r17 = (r18 + r17)|0;
	r17 = r17 >> 2;
	r18 = heap32[(r6+13)];
	r19 = heap32[(r6+12)];
	r17 = heap32[(r17)];
	if(r18 ==r19) //_LBB654_119
{
	r20 = 1;
	r21 = r19 << 1;
	r21 = r19 == 0 ? r20 : r21;
if(!(r18 >=r21)) //_LBB654_118
{
	if(r21 !=0) //_LBB654_122
{
	r18 = gNumAlignedAllocs;
	r18 = r18 >> 2;
	r22 = heap32[(r18)];
	r23 = r21 << 2;
	r22 = (r22 + 1)|0;
	r23 = r23 | 3;
	heap32[(r18)] = r22;
	r18 = (r23 + 16)|0;
	heap32[(g0)] = r18;
	malloc(i7);
	r18 = r_g0;
	if(r18 !=0) //_LBB654_124
{
	r19 = 0;
	r22 = (r18 + 4)|0;
	r19 = (r19 - r22)|0;
	r19 = r19 & 15;
	r19 = (r18 + r19)|0;
	r22 = r19 >> 2;
	heap32[(r22)] = r18;
	r18 = (r19 + 4)|0;
	r19 = heap32[(r6+12)];
}
}
else{
	r18 = 0;
}
if(!(r19 <1)) //_LBB654_128
{
	r22 = 0;
_167: while(true){
	r23 = r22 << 2;
	r24 = heap32[(r6+14)];
	r24 = (r24 + r23)|0;
	r24 = r24 >> 2;
	r23 = (r18 + r23)|0;
	r24 = heap32[(r24)];
	r22 = (r22 + 1)|0;
	r23 = r23 >> 2;
	heap32[(r23)] = r24;
if(!(r19 !=r22)) //_LBB654_127
{
break _167;
}
}
}
	r19 = heap32[(r6+14)];
if(!(r19 ==0)) //_LBB654_132
{
	r22 = heapU8[r3+60];
if(!(r22 ==0)) //_LBB654_131
{
	r22 = gNumAlignedFree;
	r22 = r22 >> 2;
	r23 = heap32[(r22)];
	r23 = (r23 + 1)|0;
	r19 = r19 >> 2;
	heap32[(r22)] = r23;
	r19 = heap32[(r19+-1)];
	heap32[(g0)] = r19;
	free(i7);
}
	heap32[(r6+14)] = 0;
}
	heap8[r3+60] = r20;
	heap32[(r6+14)] = r18;
	heap32[(r6+13)] = r21;
	r19 = heap32[(r6+12)];
}
}
	r18 = r19 << 2;
	r19 = heap32[(r6+14)];
	r18 = (r19 + r18)|0;
	r18 = r18 >> 2;
	heap32[(r18)] = r17;
	r18 = heap32[(r6+12)];
	r18 = (r18 + 1)|0;
	r17 = r17 >> 2;
	heap32[(r6+12)] = r18;
	r17 = heap32[(r17+54)];
	if(r17 !=2) //_LBB654_135
{
	r18 = 1;
	r16 = r17 == 5 ? r18 : r16;
}
else{
	r16 = 1;
}
	r14 = (r14 + 1)|0;
}
else{
break _153;
}
}
}
_182: do {
	if(r13 <r5) //_LBB654_141
{
	r17 = heap32[(r6+9)];
	r19 = r13 << 2;
	r18 = (r17 + r19)|0;
	r20 = r18 >> 2;
	r20 = heap32[(r20)];
	r20 = r20 >> 2;
	r21 = heap32[(r20+277)];
	r21 = r21 >> 2;
	r21 = heap32[(r21+52)];
	if(r21 <0) //_LBB654_143
{
	r21 = heap32[(r20+278)];
	r21 = r21 >> 2;
	r21 = heap32[(r21+52)];
}
	if(r21 !=r15) //_LBB654_140
{
__label__ = 129;
}
else{
	r19 = (r17 + r19)|0;
	r20 = 1;
_188: while(true){
	r17 = r20;
	r1 = (r13 + r17)|0;
	if(r1 >=r5) //_LBB654_151
{
__label__ = 138;
break _182;
}
else{
	r20 = r17 << 2;
	r20 = (r19 + r20)|0;
	r20 = r20 >> 2;
	r20 = heap32[(r20)];
	r20 = r20 >> 2;
	r21 = heap32[(r20+277)];
	r21 = r21 >> 2;
	r21 = heap32[(r21+52)];
	if(r21 <0) //_LBB654_149
{
	r20 = heap32[(r20+278)];
	r20 = r20 >> 2;
	r21 = heap32[(r20+52)];
}
	r20 = (r17 + 1)|0;
if(!(r21 ==r15)) //_LBB654_146
{
__label__ = 138;
break _182;
}
}
}
}
}
else{
__label__ = 129;
}
} while(0);
if (__label__ == 129){
	r17 = 0;
	r18 = r17;
}
	r16 = r16 & 255;
if(!(r16 !=0)) //_LBB654_153
{
	r16 = heap32[(fp+-36)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+2)];
	r19 = heap32[(r6+12)];
	r20 = heap32[(r6+14)];
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r20;
	heap32[(g0+2)] = r19;
	heap32[(g0+3)] = r18;
	heap32[(g0+4)] = r17;
	heap32[(g0+5)] = r15;
	__FUNCTION_TABLE__[(r16)>>2](i7);
}
	r15 = heap32[(r6+12)];
_200: do {
if(!(r15 >-1)) //_LBB654_162
{
	r16 = heap32[(r6+13)];
	if(r16 <0) //_LBB654_156
{
	r16 = heap32[(r6+14)];
if(!(r16 ==0)) //_LBB654_160
{
	r18 = heapU8[r3+60];
if(!(r18 ==0)) //_LBB654_159
{
	r18 = gNumAlignedFree;
	r18 = r18 >> 2;
	r19 = heap32[(r18)];
	r19 = (r19 + 1)|0;
	r16 = r16 >> 2;
	heap32[(r18)] = r19;
	r16 = heap32[(r16+-1)];
	heap32[(g0)] = r16;
	free(i7);
}
	heap32[(r6+14)] = 0;
}
	r16 = 1;
	heap8[r3+60] = r16;
	heap32[(r6+14)] = 0;
	heap32[(r6+13)] = 0;
}
_210: while(true){
	r16 = r15 << 2;
	r18 = heap32[(r6+14)];
	r16 = (r18 + r16)|0;
	r15 = (r15 + 1)|0;
	r16 = r16 >> 2;
	heap32[(r16)] = 0;
if(!(r15 !=0)) //_LBB654_161
{
break _200;
}
}
}
} while(0);
	r13 = r17 == 0 ? r13 : r1;
	heap32[(r6+12)] = 0;
	if(r14 <r10) //_LBB654_116
{
continue _151;
}
else{
break _145;
}
}
}
}
else{
	r1 = heap32[(r8)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+11)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r1 = r_g0;
	r3 = heap32[(r8)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r6 = heap32[(fp+-36)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	r10 = heap32[(r4+2)];
	r5 = heap32[(r4+4)];
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r_g0;
	heap32[(g0+5)] = -1;
	__FUNCTION_TABLE__[(r6)>>2](i7);
}
} while(0);
	r1 = heap32[(r9)];
	r3 = r1 >> 2;
	r5 = heap32[(r3+4)];
	r5 = (r5 + -1)|0;
	heap32[(r3+4)] = r5;
_215: do {
if(!(r5 !=0)) //_LBB654_169
{
	r5 = heap32[(r3+1)];
	if(r5 !=0) //_LBB654_166
{
	r1 = sp + -16;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r5 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r1 = r1 >> 2;
	r6 = heap32[(fp+-4)];
	r8 = heap32[(r5)];
	r6 = (r6 - r8)|0;
	r1 = heap32[(r1+1)];
	r5 = heap32[(r5+1)];
	r1 = (r1 - r5)|0;
	r5 = (r6 * 1000000)|0;
	r1 = (r1 + r5)|0;
	r5 = heap32[(r3+3)];
	r1 = (r1 - r5)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r3+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r3+2)] = f0;
	r1 = heap32[(r3+4)];
	if(r1 !=0) //_LBB654_169
{
break _215;
}
else{
	r1 = heap32[(r9)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r9)] = r1;
}
} while(0);
	heap32[(g0)] = r11;
	_ZZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoEN27InplaceSolverIslandCallback18processConstraintsEv(i7);
	r1 = heap32[(r4+44)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+4)];
	r5 = heap32[(r4+19)];
	r4 = heap32[(r4+21)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	heap32[(fp+-36)] = r7;
	r0 = heap32[(r12+21)];
if(!(r0 ==0)) //_LBB654_173
{
	r1 = heapU8[sp+-56];
if(!(r1 ==0)) //_LBB654_172
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	heap32[(r12+21)] = 0;
}
	r0 = 1;
	heap8[sp+-56] = r0;
	heap32[(r12+21)] = 0;
	heap32[(r12+19)] = 0;
	heap32[(r12+20)] = 0;
	r1 = heap32[(r12+16)];
if(!(r1 ==0)) //_LBB654_177
{
	r3 = heapU8[sp+-76];
if(!(r3 ==0)) //_LBB654_176
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r12+16)] = 0;
}
	heap8[sp+-76] = r0;
	heap32[(r12+16)] = 0;
	heap32[(r12+14)] = 0;
	heap32[(r12+15)] = 0;
	r1 = heap32[(r12+11)];
if(!(r1 ==0)) //_LBB654_181
{
	r3 = heapU8[sp+-96];
if(!(r3 ==0)) //_LBB654_180
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r12+11)] = 0;
}
	heap8[sp+-96] = r0;
	heap32[(r12+11)] = 0;
	heap32[(r12+9)] = 0;
	heap32[(r12+10)] = 0;
	r1 = heap32[(r2+3)];
if(!(r1 ==0)) //_LBB654_185
{
	r3 = heapU8[sp+-32];
if(!(r3 ==0)) //_LBB654_184
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r2+3)] = 0;
}
	heap8[sp+-32] = r0;
	heap32[(r2+3)] = 0;
	heap32[(r2+1)] = 0;
	heap32[(r2+2)] = 0;
	r0 = heap32[(r9)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+4)];
	r2 = (r2 + -1)|0;
	heap32[(r1+4)] = r2;
_246: do {
if(!(r2 !=0)) //_LBB654_191
{
	r2 = heap32[(r1+1)];
	if(r2 !=0) //_LBB654_188
{
	r0 = sp + -8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r2 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r0 = r0 >> 2;
	r3 = heap32[(fp+-2)];
	r4 = heap32[(r2)];
	r3 = (r3 - r4)|0;
	r0 = heap32[(r0+1)];
	r2 = heap32[(r2+1)];
	r0 = (r0 - r2)|0;
	r2 = (r3 * 1000000)|0;
	r0 = (r0 + r2)|0;
	r2 = heap32[(r1+3)];
	r0 = (r0 - r2)|0;
	f0 = uint(r0); //fuitos r0, f0
	f1 =                      1000;
	f2 = heapFloat[(r1+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r1+2)] = f0;
	r0 = heap32[(r1+4)];
	if(r0 !=0) //_LBB654_191
{
break _246;
}
else{
	r0 = heap32[(r9)];
}
}
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
	heap32[(r9)] = r0;
}
} while(0);
	return;
break;
case 47:
	r0 = _2E_str1156;
	r1 = _2E_str2157;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 269;
	_assert(i7);
break;
}
}