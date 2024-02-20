function _ZN4__rwL16__rw_expand_nameERNS_14__rw_pod_arrayIcLj256EEEPKc(sp)
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
var __label__ = 0;
	i7 = sp + -640;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = 0;
	r3 = r1;
_1: while(true){
	r4 = r2 << 2;
	r5 = heapU8[r3];
	if(r5 !=59) //_LBB703_3
{
	if(r5 !=0) //_LBB703_5
{
	r5 = heapU8[r3+1];
	if(r5 ==59) //_LBB703_14
{
__label__ = 14;
break _1;
}
else{
	if(r5 ==0) //_LBB703_4
{
__label__ = 4;
break _1;
}
else{
	r5 = heapU8[r3+2];
	if(r5 !=59) //_LBB703_9
{
	if(r5 ==0) //_LBB703_4
{
__label__ = 4;
break _1;
}
else{
	r5 = heapU8[r3+3];
	if(r5 !=59) //_LBB703_12
{
	if(r5 ==0) //_LBB703_4
{
__label__ = 4;
break _1;
}
else{
	r2 = (r2 + 1)|0;
	r3 = (r3 + 4)|0;
continue _1;
}
}
else{
__label__ = 11;
break _1;
}
}
}
else{
__label__ = 8;
break _1;
}
}
}
}
else{
__label__ = 4;
break _1;
}
}
else{
__label__ = 2;
break _1;
}
}
switch(__label__ ){//multiple entries
case 14:
	r2 = (r3 + 1)|0;
break;
case 4:
	r2 = 0;
break;
case 2:
	r2 = (r1 + r4)|0;
break;
case 11:
	r2 = r4 | 3;
	r2 = (r1 + r2)|0;
break;
case 8:
	r2 = r4 | 2;
	r2 = (r1 + r2)|0;
break;
}
_18: do {
	if(r2 ==r1) //_LBB703_17
{
	r3 = (r1 + 1)|0;
	r4 = (r1 + 3)|0;
	r5 = 0;
	r2 = r3;
_20: while(true){
	r6 = heapU8[r4+-2];
	if(r6 ==59) //_LBB703_21
{
__label__ = 19;
break _20;
}
else{
	if(r6 !=0) //_LBB703_22
{
	r6 = heapU8[r4+-1];
	if(r6 ==0) //_LBB703_20
{
__label__ = 90;
break _18;
}
else{
	r7 = r5 << 2;
	if(r6 !=59) //_LBB703_25
{
	r6 = heapU8[r4];
	if(r6 ==0) //_LBB703_20
{
__label__ = 90;
break _18;
}
else{
	if(r6 !=59) //_LBB703_28
{
	r6 = heapU8[r4+1];
	if(r6 ==0) //_LBB703_20
{
__label__ = 90;
break _18;
}
else{
	if(r6 !=59) //_LBB703_31
{
	r5 = (r5 + 1)|0;
	r4 = (r4 + 4)|0;
	r2 = (r2 + 4)|0;
}
else{
__label__ = 27;
break _20;
}
}
}
else{
__label__ = 32;
break _18;
}
}
}
else{
__label__ = 22;
break _20;
}
}
}
else{
__label__ = 90;
break _18;
}
}
}
switch(__label__ ){//multiple entries
case 19:
	r1 = r3;
__label__ = 29;
break _18;
break;
case 27:
	r2 = r7 | 3;
	r1 = (r2 + r1)|0;
	r4 = (r1 + 1)|0;
__label__ = 32;
break _18;
break;
case 22:
	r2 = r7 | 1;
	r1 = (r2 + r1)|0;
	r4 = (r1 + 1)|0;
__label__ = 32;
break;
}
}
else{
__label__ = 29;
}
} while(0);
if (__label__ == 29){
	if(r2 ==0) //_LBB703_34
{
	r3 = r1;
__label__ = 90;
}
else{
	r4 = r2;
	r3 = r1;
__label__ = 32;
}
}
_39: do {
switch(__label__ ){//multiple entries
case 90:
	r7 = heapU8[r3];
	if(r7 ==0) //_LBB703_98
{
	r0 = sp + -624;
	r0 = r0 >> 2;
	heap32[(r0+20)] = 0;
	heap32[(r0+22)] = 0;
	heap32[(r0+21)] = 0;
__label__ = 73;
break _39;
}
else{
	r7 = 1;
__label__ = 93;
break _39;
}
break;
case 32:
	r1 = sp + -264;
	r2 = sp + -528;
	r5 = (r1 + 8)|0;
	r6 = (r2 + 8)|0;
	r7 = 1;
	r8 = 0;
_45: while(true){
	if(r4 ==0) //_LBB703_39
{
	r4 = heapU8[r3];
_49: do {
	if(r4 !=0) //_LBB703_41
{
	r9 = (r3 + 1)|0;
	r10 = 0;
_51: while(true){
	r4 = (r10 + 1)|0;
	r11 = heapU8[r9+r10];
	r10 = r4;
if(!(r11 !=0)) //_LBB703_42
{
break _49;
}
}
}
else{
	r4 = 0;
}
} while(0);
	r4 = (r3 + r4)|0;
}
	r9 = (r4 - r3)|0;
	heap32[(fp+-66)] = r9;
	if(uint(r9) >uint(255)) //_LBB703_46
{
	r10 = (r9 + 1)|0;
	heap32[(g0)] = r10;
	_Znaj(i7);
	r10 = r_g0;
}
else{
	r10 = r5;
}
	r11 = r1 >> 2;
	heap32[(r11+1)] = r10;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r9;
	memcpy(i7);
	r9 = heap32[(r11+1)];
	r10 = heap32[(fp+-66)];
	r12 = 0;
	heap8[r9+r10] = r12;
	r9 = r2 >> 2;
	heap32[(fp+-132)] = 0;
	heap32[(r9+1)] = r6;
	heap8[sp+-520] = r12;
	r10 = _ZN4__rw9__rw_catsE;
	r13 = (r8 * 12)|0;
	r10 = (r10 + r13)|0;
	r13 = heap32[(r11+1)];
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r13;
	heap32[(g0+2)] = r2;
	_ZN4__rw16__rw_locale_nameEiPKcRNS_14__rw_pod_arrayIcLj256EEE(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB703_50
{
	r13 = heapU8[r10];
_63: do {
	if(r13 !=0) //_LBB703_52
{
	r14 = (r10 + 1)|0;
_65: while(true){
	r13 = (r12 + 1)|0;
	r15 = heapU8[r14+r12];
	r12 = r13;
if(!(r15 !=0)) //_LBB703_53
{
break _63;
}
}
}
else{
	r13 = 0;
}
} while(0);
	r12 = r7 & 255;
_69: do {
if(!(r12 ==0)) //_LBB703_56
{
	if(r8 !=0) //_LBB703_57
{
	r7 = r0 >> 2;
	r7 = heap32[(r7+1)];
	r12 = r7;
	r14 = r10;
	r15 = r13;
_72: while(true){
	if(r15 !=0) //_LBB703_58
{
	r15 = (r15 + -1)|0;
	r16 = (r14 + 1)|0;
	r17 = (r12 + 1)|0;
	r18 = heapU8[r12];
	r19 = heapU8[r14];
	r12 = r17;
	r14 = r16;
	if(r18 !=r19) //_LBB703_62
{
__label__ = 57;
break _72;
}
else{
__label__ = 54;
}
}
else{
__label__ = 55;
break _72;
}
}
if (__label__ == 55){
	r7 = heapU8[r7+r13];
if(!(r7 !=59)) //_LBB703_62
{
	r7 = 1;
break _69;
}
}
	r7 = 0;
}
}
} while(0);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r13;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
	r8 = (r8 + 1)|0;
	if(r8 !=6) //_LBB703_66
{
	r10 = heapU8[r4];
	if(r10 !=0) //_LBB703_68
{
	r3 = _2E_str785;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 1;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
	r3 = (r4 + 1)|0;
	r4 = 2;
}
else{
	r4 = 1;
}
}
else{
	r4 = 1;
	r8 = 6;
}
}
else{
	r4 = 0;
}
	r9 = heap32[(r9+1)];
if(!(r9 ==r6)) //_LBB703_73
{
if(!(r9 ==0)) //_LBB703_73
{
	heap32[(g0)] = r9;
	_ZdaPv(i7);
}
}
	if(r4 ==1) //_LBB703_79
{
__label__ = 74;
break _45;
}
else{
	if(r4 !=0) //_LBB703_83
{
	r4 = heap32[(r11+1)];
	if(r4 ==r5) //_LBB703_85
{
__label__ = 79;
}
else{
	if(r4 !=0) //_LBB703_86
{
	r10 = 0;
	heap32[(g0)] = r4;
	_ZdaPv(i7);
	r9 = r3;
__label__ = 81;
}
else{
__label__ = 79;
}
}
if (__label__ == 79){
	r10 = 0;
	r9 = r3;
}
_101: while(true){
	r4 = r10 << 2;
	r11 = r4 | 3;
	r12 = r4 | 2;
	r13 = heapU8[r9];
	r4 = (r3 + r4)|0;
	r11 = (r3 + r11)|0;
	r12 = (r3 + r12)|0;
	if(r13 ==59) //_LBB703_37
{
continue _45;
}
else{
	r4 = 0;
	if(r13 ==0) //_LBB703_37
{
continue _45;
}
else{
	r13 = heapU8[r9+1];
	if(r13 ==59) //_LBB703_36
{
break _101;
}
else{
	r4 = 0;
	if(r13 ==0) //_LBB703_37
{
continue _45;
}
else{
	r13 = heapU8[r9+2];
	r4 = r12;
	if(r13 ==59) //_LBB703_37
{
continue _45;
}
else{
	r4 = 0;
	if(r13 ==0) //_LBB703_37
{
continue _45;
}
else{
	r12 = heapU8[r9+3];
	r4 = r11;
	if(r12 ==59) //_LBB703_37
{
continue _45;
}
else{
	r4 = 0;
	if(r12 ==0) //_LBB703_37
{
continue _45;
}
else{
	r10 = (r10 + 1)|0;
	r9 = (r9 + 4)|0;
}
}
}
}
}
}
}
}
}
	r4 = (r9 + 1)|0;
continue _45;
}
else{
__label__ = 70;
break _45;
}
}
}
switch(__label__ ){//multiple entries
case 74:
	r1 = heap32[(r11+1)];
	if(r1 ==r5) //_LBB703_81
{
__label__ = 93;
break _39;
}
else{
	if(r1 !=0) //_LBB703_82
{
	heap32[(g0)] = r1;
	_ZdaPv(i7);
__label__ = 93;
break _39;
}
else{
__label__ = 93;
break _39;
}
}
break;
case 70:
	r0 = heap32[(r11+1)];
	if(r0 ==r5) //_LBB703_78
{
__label__ = 73;
}
else{
	if(r0 ==0) //_LBB703_78
{
__label__ = 73;
}
else{
	heap32[(g0)] = r0;
	_ZdaPv(i7);
__label__ = 73;
}
}
break;
}
break;
}
} while(0);
_119: do {
if (__label__ == 93){
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r4 = heapU8[r2];
	if(r4 ==0) //_LBB703_117
{
	heap32[(g0)] = 0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r0;
	_ZN4__rw16__rw_locale_nameEiPKcRNS_14__rw_pod_arrayIcLj256EEE(i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB703_78
{
break _119;
}
}
else{
	r3 = r7 & 255;
if(!(r3 ==0)) //_LBB703_118
{
	r3 = 0;
	r4 = r2;
_125: while(true){
	r5 = r3 << 2;
	r6 = heapU8[r4];
	if(r6 !=59) //_LBB703_104
{
	if(r6 !=0) //_LBB703_106
{
	r6 = heapU8[r4+1];
	if(r6 ==59) //_LBB703_115
{
__label__ = 109;
break _125;
}
else{
	if(r6 ==0) //_LBB703_105
{
__label__ = 99;
break _125;
}
else{
	r6 = heapU8[r4+2];
	if(r6 !=59) //_LBB703_110
{
	if(r6 ==0) //_LBB703_105
{
__label__ = 99;
break _125;
}
else{
	r6 = heapU8[r4+3];
	if(r6 !=59) //_LBB703_113
{
	if(r6 ==0) //_LBB703_105
{
__label__ = 99;
break _125;
}
else{
	r3 = (r3 + 1)|0;
	r4 = (r4 + 4)|0;
}
}
else{
__label__ = 106;
break _125;
}
}
}
else{
__label__ = 103;
break _125;
}
}
}
}
else{
__label__ = 99;
break _125;
}
}
else{
__label__ = 97;
break _125;
}
}
switch(__label__ ){//multiple entries
case 109:
	r3 = (r4 + 1)|0;
break;
case 99:
	r3 = 0;
break;
case 97:
	r3 = (r2 + r5)|0;
break;
case 106:
	r3 = r5 | 3;
	r3 = (r2 + r3)|0;
break;
case 103:
	r3 = r5 | 2;
	r3 = (r2 + r3)|0;
break;
}
	r3 = (r3 - r2)|0;
	heap32[(r1+1)] = r2;
	heap32[(r1)] = r3;
	r3 = _2E_str26;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 1;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
}
}
	r0 = heap32[(r1+1)];
	r_g0 = r0;
	return;
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}