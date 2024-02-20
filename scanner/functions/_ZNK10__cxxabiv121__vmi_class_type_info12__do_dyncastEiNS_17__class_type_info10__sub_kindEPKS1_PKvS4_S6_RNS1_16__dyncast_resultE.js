function _ZNK10__cxxabiv121__vmi_class_type_info12__do_dyncastEiNS_17__class_type_info10__sub_kindEPKS1_PKvS4_S6_RNS1_16__dyncast_resultE(sp)
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
var __label__ = 0;
	i7 = sp + -56;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+7)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+4)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	r6 = heap32[(fp+4)];
	r7 = heap32[(fp+5)];
	r8 = heap32[(fp+6)];
	r9 = r1 & 16;
	if(r9 !=0) //_LBB838_2
{
	r1 = r2 >> 2;
	r1 = heap32[(r1+2)];
	heap32[(r0+4)] = r1;
}
	r9 = r2 >> 2;
	r10 = heap32[(r9+1)];
	if(r6 !=r8) //_LBB838_6
{
__label__ = 5;
}
else{
	r11 = r7 >> 2;
	r11 = heap32[(r11+1)];
	r12 = _2E_str26;
	r11 = r11 == 0 ? r12 : r11;
	r12 = r10 == 0 ? r12 : r10;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r11;
	strcmp(i7);
	r13 = r_g0;
	if(r13 <0) //_LBB838_6
{
__label__ = 5;
}
else{
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r12;
	strcmp(i7);
	r11 = r_g0;
	if(r11 >-1) //_LBB838_8
{
	heap32[(r0+2)] = r4;
__label__ = 8;
}
else{
__label__ = 5;
}
}
}
_8: do {
if (__label__ == 5){
	r11 = r5 >> 2;
	r12 = heap32[(r11+1)];
	r13 = _2E_str26;
	r12 = r12 == 0 ? r13 : r12;
	r10 = r10 == 0 ? r13 : r10;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r12;
	strcmp(i7);
	r13 = r_g0;
	if(r13 <0) //_LBB838_15
{
__label__ = 14;
}
else{
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r10;
	strcmp(i7);
	r10 = r_g0;
	if(r10 <0) //_LBB838_15
{
__label__ = 14;
}
else{
	heap32[(r0)] = r6;
	heap32[(r0+1)] = r4;
	if(r3 <0) //_LBB838_12
{
	if(r3 ==-2) //_LBB838_14
{
	heap32[(r0+3)] = 1;
	r9 = 0;
	r_g0 = r9;
	return;
}
else{
__label__ = 12;
}
}
else{
	r1 = (r6 + r3)|0;
	r2 = 6;
	r3 = 1;
	r1 = r1 == r8 ? r2 : r3;
	heap32[(r0+3)] = r1;
break _8;
}
}
}
_17: do {
if (__label__ == 14){
	r10 = heap32[(r9+3)];
	r12 = r1 & 2;
	r9 = 0;
	r13 = r1;
_19: while(true){
	r14 = r13 & 3;
_21: while(true){
	r15 = r9;
	r9 = r10 << 3;
	r9 = (r2 + r9)|0;
	r20 = 0;
_23: while(true){
	r16 = r20;
	if(r10 !=r16) //_LBB838_16
{
	r17 = sp + -24;
	r18 = r17 >> 2;
	heap32[(fp+-6)] = 0;
	heap32[(r18+1)] = 0;
	heap32[(r18+2)] = 0;
	r19 = r16 << 3;
	r19 = (r9 - r19)|0;
	heap32[(r18+3)] = 0;
	r19 = r19 >> 2;
	heap32[(r18+4)] = r13;
	r20 = heap32[(r19+3)];
	r21 = r20 & 1;
	r22 = r20 >> 8;
	if(r21 != 0) //_LBB838_18
{
	r23 = r6 >> 2;
	r23 = heap32[(r23)];
	r22 = (r23 + r22)|0;
	r22 = r22 >> 2;
	r22 = heap32[(r22)];
}
	r20 = r20 & 2;
	if(r20 ==0) //_LBB838_21
{
	if(r3 !=-2) //_LBB838_23
{
__label__ = 21;
break _23;
}
else{
	r20 = (r16 + 1)|0;
	if(r14 ==0) //_LBB838_88
{
continue _23;
}
else{
__label__ = 21;
break _23;
}
}
}
else{
__label__ = 18;
break _23;
}
}
else{
__label__ = 77;
break _19;
}
}
switch(__label__ ){//multiple entries
case 21:
	r9 = r4 & -3;
break;
case 18:
	r9 = r4;
break;
}
	r20 = heap32[(r19+2)];
	r19 = r20 >> 2;
	r19 = heap32[(r19)];
	r19 = r19 >> 2;
	r19 = heap32[(r19+6)];
	r9 = r21 | r9;
	r21 = (r6 + r22)|0;
	heap32[(g0)] = r20;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r21;
	heap32[(g0+5)] = r7;
	heap32[(g0+6)] = r8;
	heap32[(g0+7)] = r17;
	__FUNCTION_TABLE__[(r19)>>2](i7);
	r9 = r_g0;
	r20 = heap32[(r0+2)];
	r17 = heap32[(r18+2)];
	r20 = r17 | r20;
	heap32[(r0+2)] = r20;
	r17 = heap32[(r18+3)];
	if(r17 ==2) //_LBB838_26
{
__label__ = 24;
break _19;
}
else{
	if(r17 !=6) //_LBB838_27
{
	r19 = (r10 + -1)|0;
	r10 = heap32[(r0)];
	r21 = r15 & 255;
	if(r21 !=0) //_LBB838_34
{
__label__ = 30;
break _21;
}
else{
	if(r10 !=0) //_LBB838_35
{
__label__ = 31;
break _21;
}
else{
	r10 = heap32[(fp+-6)];
	heap32[(r0)] = r10;
	r15 = heap32[(r18+1)];
	heap32[(r0+1)] = r15;
	if(r10 !=0) //_LBB838_31
{
	r10 = (r19 - r16)|0;
	if(r20 ==0) //_LBB838_87
{
continue _21;
}
else{
__label__ = 29;
break _21;
}
}
else{
__label__ = 73;
break _21;
}
}
}
}
else{
__label__ = 24;
break _19;
}
}
}
_40: do {
switch(__label__ ){//multiple entries
case 30:
	if(r10 ==0) //_LBB838_37
{
	r14 = heap32[(fp+-6)];
	r10 = 0;
__label__ = 36;
break _40;
}
else{
__label__ = 31;
break _40;
}
break;
case 29:
	r10 = heapU8[r2+8];
	r10 = r10 & 1;
	if(r10 != 0) //_LBB838_30
{
__label__ = 73;
}
else{
__label__ = 78;
break _17;
}
break;
}
} while(0);
if (__label__ == 31){
	r14 = heap32[(fp+-6)];
	if(r10 !=r14) //_LBB838_38
{
	if(r14 !=0) //_LBB838_40
{
__label__ = 39;
}
else{
	if(r9 ==0) //_LBB838_41
{
__label__ = 36;
}
else{
__label__ = 39;
}
}
}
else{
	r9 = heap32[(r0+1)];
	r10 = heap32[(r18+1)];
	r9 = r10 | r9;
	heap32[(r0+1)] = r9;
	r9 = r15;
__label__ = 73;
}
}
_50: do {
if (__label__ == 36){
if(!(r14 ==0)) //_LBB838_44
{
if(!(r21 ==0)) //_LBB838_44
{
__label__ = 39;
break _50;
}
}
	r9 = r15;
__label__ = 73;
}
} while(0);
if (__label__ == 39){
	r9 = heap32[(r0+3)];
_57: do {
	if(r20 >3) //_LBB838_47
{
	r14 = r20 & 1;
if(!(r14 ==0)) //_LBB838_52
{
if(!(r12 ==0)) //_LBB838_52
{
	r13 = r1;
__label__ = 43;
break _57;
}
}
	r13 = r14 == 0 ? r13 : r1;
	r10 = 1;
	r9 = r9 == 0 ? r10 : r9;
	if(r17 ==0) //_LBB838_54
{
	r17 = r10;
__label__ = 64;
}
else{
__label__ = 64;
}
}
else{
__label__ = 43;
}
} while(0);
_64: do {
if (__label__ == 43){
	if(r9 <1) //_LBB838_55
{
_68: do {
if(!(r17 <4)) //_LBB838_59
{
	r9 = r17 & 1;
	if(r9 != 0) //_LBB838_58
{
	r9 = heapU8[r2+8];
	r9 = r9 & 2;
if(!(r9 ==0)) //_LBB838_57
{
break _68;
}
}
	r9 = 1;
break _64;
}
} while(0);
	if(r3 <0) //_LBB838_61
{
	if(r3 !=-2) //_LBB838_63
{
	r9 = heap32[(r11)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+7)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r8;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	r9 = r_g0;
}
else{
	r9 = 1;
}
}
else{
	r9 = (r10 + r3)|0;
	r10 = 6;
	r14 = 1;
	r9 = r9 == r8 ? r10 : r14;
}
}
	if(r17 <1) //_LBB838_66
{
	if(r9 <4) //_LBB838_70
{
__label__ = 60;
}
else{
	r10 = r9 & 1;
	if(r10 != 0) //_LBB838_69
{
	r10 = heapU8[r2+8];
	r10 = r10 & 2;
	if(r10 ==0) //_LBB838_68
{
__label__ = 58;
}
else{
__label__ = 60;
}
}
else{
__label__ = 58;
}
}
if (__label__ == 60){
	r10 = heap32[(fp+-6)];
	if(r3 <0) //_LBB838_72
{
if(!(r3 ==-2)) //_LBB838_68
{
	r14 = heap32[(r11)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+7)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r8;
	__FUNCTION_TABLE__[(r14)>>2](i7);
	r17 = r_g0;
break _64;
}
}
else{
	r10 = (r10 + r3)|0;
	r14 = 6;
	r17 = 1;
	r17 = r10 == r8 ? r14 : r17;
break _64;
}
}
	r17 = 1;
}
}
} while(0);
	r10 = r9 ^ r17;
	if(r10 <4) //_LBB838_81
{
	r9 = r9 & r17;
	heap32[(r0)] = 0;
	if(r9 <4) //_LBB838_83
{
	r9 = 1;
	heap32[(r0+3)] = 1;
}
else{
__label__ = 71;
break _19;
}
}
else{
	if(r17 >3) //_LBB838_77
{
	r9 = heap32[(fp+-6)];
	heap32[(r0)] = r9;
	r9 = heap32[(r18+1)];
	r15 = 0;
	heap32[(r0+1)] = r9;
	r9 = r17;
}
	heap32[(r0+3)] = r9;
	r10 = r9 & 2;
	if(r10 !=0) //_LBB838_13
{
__label__ = 12;
break _17;
}
else{
	r9 = r9 & 1;
	if(r9 ==0) //_LBB838_13
{
__label__ = 12;
break _17;
}
else{
	r9 = r15;
}
}
}
}
	r10 = (r19 - r16)|0;
	if(r20 !=4) //_LBB838_86
{
continue _19;
}
else{
__label__ = 78;
break _17;
}
}
switch(__label__ ){//multiple entries
case 24:
	r20 = heap32[(fp+-6)];
	heap32[(r0)] = r20;
	r20 = heap32[(r18+1)];
	heap32[(r0+1)] = r20;
	heap32[(r0+3)] = r17;
	r_g0 = r9;
	return;
break;
case 71:
	heap32[(r0+3)] = 2;
	r9 = 1;
	r_g0 = r9;
	return;
break;
case 77:
	r9 = r15;
__label__ = 78;
break;
}
}
} while(0);
if (__label__ == 12){
	r9 = 0;
}
	r0 = r9 & 255;
	r_g0 = r0;
	return;
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}