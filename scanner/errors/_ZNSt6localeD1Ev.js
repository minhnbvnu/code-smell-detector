function _ZNSt6localeD1Ev(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+27)];
_1: do {
if(!(r3 !=0)) //_LBB709_86
{
	r3 = heap32[(r2+40)];
	r3 = r3 & 67108863;
if(!(r3 !=67108863)) //_LBB709_86
{
	r3 = heap32[(r2+41)];
	r4 = r3 & 8193;
if(!(r4 ==0)) //_LBB709_4
{
	if(r4 !=8193) //_LBB709_86
{
break _1;
}
}
	r4 = r3 & 49158;
if(!(r4 ==0)) //_LBB709_6
{
	if(r4 !=49158) //_LBB709_86
{
break _1;
}
}
	r4 = r3 & 983160;
if(!(r4 ==0)) //_LBB709_8
{
	if(r4 !=983160) //_LBB709_86
{
break _1;
}
}
	r4 = r3 & 7340928;
if(!(r4 ==0)) //_LBB709_10
{
	if(r4 !=7340928) //_LBB709_86
{
break _1;
}
}
	r4 = r3 & 25168896;
if(!(r4 ==0)) //_LBB709_12
{
	if(r4 !=25168896) //_LBB709_86
{
break _1;
}
}
	r3 = r3 & 33558528;
if(!(r3 ==0)) //_LBB709_14
{
	if(r3 !=33558528) //_LBB709_86
{
break _1;
}
}
	r3 = heap32[(r2+38)];
	r4 = _2E_str538;
	r5 = r3 == 0 ? r4 : r3;
	r6 = heapU8[r5];
	if(r6 ==59) //_LBB709_16
{
	r5 = (r5 + 1)|0;
}
	r6 = 0;
	r7 = r6;
_25: while(true){
	r8 = heapU8[r5+r6];
	if(r8 ==0) //_LBB709_33
{
__label__ = 31;
break _25;
}
else{
	r9 = (r5 + r6)|0;
	if(r8 ==59) //_LBB709_29
{
__label__ = 28;
break _25;
}
else{
	r8 = heapU8[r9+1];
	if(r8 ==0) //_LBB709_33
{
__label__ = 31;
break _25;
}
else{
	if(r8 ==59) //_LBB709_31
{
__label__ = 29;
break _25;
}
else{
	r8 = heapU8[r9+2];
	if(r8 ==0) //_LBB709_33
{
__label__ = 31;
break _25;
}
else{
	r10 = r7 << 2;
	if(r8 !=59) //_LBB709_25
{
	r9 = heapU8[r9+3];
	if(r9 ==0) //_LBB709_33
{
__label__ = 31;
break _25;
}
else{
	if(r9 !=59) //_LBB709_28
{
	r7 = (r7 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 26;
break _25;
}
}
}
else{
__label__ = 23;
break _25;
}
}
}
}
}
}
}
_35: do {
switch(__label__ ){//multiple entries
case 28:
	if(r9 ==0) //_LBB709_33
{
__label__ = 31;
break _35;
}
else{
__label__ = 30;
break _35;
}
break;
case 29:
	r9 = (r9 + 1)|0;
__label__ = 30;
break _35;
break;
case 26:
	r6 = r10 | 3;
	r9 = (r5 + r6)|0;
__label__ = 30;
break _35;
break;
case 23:
	r6 = r10 | 2;
	r9 = (r5 + r6)|0;
__label__ = 30;
break;
}
} while(0);
switch(__label__ ){//multiple entries
case 31:
	r6 = heapU8[r5];
	if(r6 !=0) //_LBB709_35
{
	r7 = (r5 + 1)|0;
	r8 = 0;
_44: while(true){
	r6 = (r8 + 1)|0;
	r9 = heapU8[r7+r8];
	r8 = r6;
if(!(r9 !=0)) //_LBB709_36
{
break _44;
}
}
	r9 = 0;
	r7 = r9;
	r8 = r9;
}
else{
	r9 = 0;
	r6 = r9;
	r7 = r9;
	r8 = r9;
}
break;
case 30:
	r6 = (r9 - r5)|0;
	r7 = 0;
	r8 = r7;
break;
}
_49: while(true){
	if(r7 !=26) //_LBB709_38
{
	r10 = r7 << 2;
	r10 = (r1 + r10)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
_52: do {
	if(r10 !=0) //_LBB709_40
{
	r10 = r10 >> 2;
	r11 = heap32[(r10+7)];
	r11 = r11 >> 2;
	r10 = heap32[(r10+1)];
	r12 = 0;
	r13 = r10 != r12;
	r11 = heap32[(r11)];
	r13 = r13 & 1;
	r11 = r11 << 1;
	r11 = r13 | r11;
	r11 = (r11 + -1)|0;
	r13 = 53;
	r11 = uint(r11) < uint(r13) ? r11 : r12;
	if(r11 >36) //_LBB709_43
{
	r11 = (r11 + -37)|0;
if(!(uint(r11) >uint(8))) //_LBB709_45
{
	r13 = 1;
	r11 = r13 << r11;
	r11 = r11 & 325;
	if(r11 !=0) //_LBB709_39
{
break _52;
}
}
}
else{
if(!(uint(r11) >uint(19))) //_LBB709_45
{
	r13 = 1;
	r11 = r13 << r11;
	r11 = r11 & 665600;
	if(r11 !=0) //_LBB709_39
{
break _52;
}
}
}
	r11 = 1;
	r11 = r11 << r7;
_60: while(true){
	if(r9 ==0) //_LBB709_75
{
break _60;
}
else{
	r13 = _ZN4__rw9__rw_catsE;
	r14 = (r8 * 12)|0;
	r13 = (r13 + r14)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13+2)];
	r13 = r13 & r11;
	if(r13 ==0) //_LBB709_46
{
	r5 = heapU8[r9];
	if(r5 ==0) //_LBB709_48
{
	if(r3 !=0) //_LBB709_50
{
	r8 = 0;
	r5 = r3;
}
else{
	r8 = 0;
	r5 = r4;
}
}
else{
	r5 = (r9 + 1)|0;
	r8 = (r8 + 1)|0;
}
	r6 = heapU8[r5];
	if(r6 ==59) //_LBB709_53
{
	r5 = (r5 + 1)|0;
}
	r6 = r12;
	r13 = r12;
_74: while(true){
	r14 = heapU8[r5+r6];
	if(r14 ==0) //_LBB709_70
{
__label__ = 65;
break _74;
}
else{
	r9 = (r5 + r6)|0;
	if(r14 ==59) //_LBB709_66
{
__label__ = 62;
break _74;
}
else{
	r14 = heapU8[r9+1];
	if(r14 ==0) //_LBB709_70
{
__label__ = 65;
break _74;
}
else{
	if(r14 ==59) //_LBB709_68
{
__label__ = 63;
break _74;
}
else{
	r14 = heapU8[r9+2];
	if(r14 ==0) //_LBB709_70
{
__label__ = 65;
break _74;
}
else{
	r15 = r13 << 2;
	if(r14 !=59) //_LBB709_62
{
	r9 = heapU8[r9+3];
	if(r9 ==0) //_LBB709_70
{
__label__ = 65;
break _74;
}
else{
	if(r9 !=59) //_LBB709_65
{
	r13 = (r13 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 60;
break _74;
}
}
}
else{
__label__ = 57;
break _74;
}
}
}
}
}
}
}
_84: do {
switch(__label__ ){//multiple entries
case 62:
	if(r9 ==0) //_LBB709_70
{
__label__ = 65;
break _84;
}
else{
__label__ = 64;
break _84;
}
break;
case 63:
	r9 = (r9 + 1)|0;
__label__ = 64;
break _84;
break;
case 60:
	r6 = r15 | 3;
	r9 = (r5 + r6)|0;
__label__ = 64;
break _84;
break;
case 57:
	r6 = r15 | 2;
	r9 = (r5 + r6)|0;
__label__ = 64;
break;
}
} while(0);
switch(__label__ ){//multiple entries
case 65:
	r9 = _2E_str26;
	r6 = 0;
	r13 = heapU8[r5];
	if(r13 ==0) //_LBB709_73
{
continue _60;
}
else{
	r13 = (r5 + 1)|0;
	r14 = 0;
_92: while(true){
	r6 = (r14 + 1)|0;
	r9 = _2E_str26;
	r15 = heapU8[r13+r14];
	r14 = r6;
if(!(r15 !=0)) //_LBB709_72
{
continue _60;
}
}
}
break;
case 64:
	r6 = (r9 - r5)|0;
break;
}
}
else{
break _60;
}
}
}
	r11 = _2E_str538;
	r10 = r10 == 0 ? r11 : r10;
	r11 = heapU8[r10];
_96: do {
	if(r11 !=0) //_LBB709_77
{
	r12 = (r10 + 1)|0;
	r13 = 0;
_98: while(true){
	r11 = (r13 + 1)|0;
	r14 = heapU8[r12+r13];
	r13 = r11;
if(!(r14 !=0)) //_LBB709_78
{
break _96;
}
}
}
else{
	r11 = 0;
}
} while(0);
	if(r11 !=r6) //_LBB709_86
{
break _1;
}
else{
	r11 = 0;
_103: while(true){
	r12 = (r6 + r11)|0;
	if(r12 !=0) //_LBB709_81
{
	r12 = (r5 - r11)|0;
	r13 = (r10 - r11)|0;
	r11 = (r11 + -1)|0;
	r12 = heapU8[r12];
	r13 = heapU8[r13];
	if(r12 !=r13) //_LBB709_86
{
break _1;
}
}
else{
break _52;
}
}
}
}
} while(0);
	r7 = (r7 + 1)|0;
}
else{
break _49;
}
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	_ZN4__rw11__rw_locale9_C_manageEPS0_PKc(i7);
	return;
}
}
} while(0);
	r1 = heap32[(r2+39)];
	r1 = (r1 + -1)|0;
	heap32[(r2+39)] = r1;
if(!(r1 !=0)) //_LBB709_89
{
	r0 = heap32[(r0)];
if(!(r0 ==0)) //_LBB709_89
{
	heap32[(g0)] = r0;
	_ZN4__rw11__rw_localeD2Ev(i7);
	heap32[(g0)] = r0;
	_ZdlPv(i7);
}
}
	return;
}