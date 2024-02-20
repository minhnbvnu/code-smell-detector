function _ZN4__rw11__rw_locale9_C_manageEPS0_PKc(sp)
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
var __label__ = 0;
	i7 = sp + -280;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	if(r0 !=0) //_LBB707_9
{
	r2 = heapU8[r0];
	if(r2 ==67) //_LBB707_11
{
	r2 = heapU8[r0+1];
	r3 = 0;
	r2 = r2 != r3;
}
else{
	r2 = 1;
}
	r3 = sp + -264;
	r4 = (r3 + 8)|0;
	r5 = _2E_str538;
	r6 = r3 >> 2;
	heap32[(fp+-66)] = 0;
	r0 = r2 != 0 ? r0 : r5;
	r7 = 0;
	heap32[(r6+1)] = r4;
	heap8[sp+-256] = r7;
	if(r1 !=0) //_LBB707_14
{
__label__ = 19;
}
else{
	if(r2 != 0) //_LBB707_15
{
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	_ZN4__rwL16__rw_expand_nameERNS_14__rw_pod_arrayIcLj256EEEPKc(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB707_18
{
	r2 = heapU8[r0];
	if(r2 ==67) //_LBB707_20
{
	r2 = heapU8[r0+1];
	if(r2 !=0) //_LBB707_19
{
__label__ = 19;
}
else{
	r0 = r5;
__label__ = 19;
}
}
else{
__label__ = 19;
}
}
else{
__label__ = 15;
}
}
else{
__label__ = 19;
}
}
_14: do {
if (__label__ == 19){
	r2 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE9n_locales;
	r3 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE7locales;
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	r5 = heap32[(r2)];
	r8 = heap32[(r3)];
	if(r1 ==0) //_LBB707_24
{
	r7 = r5;
_18: while(true){
	r9 = r7;
	if(r9 ==0) //_LBB707_53
{
__label__ = 49;
break _18;
}
else{
	r1 = r9 << 1;
	r10 = r1 & -4;
	r11 = (r8 + r10)|0;
	r1 = r11 >> 2;
	r1 = heap32[(r1)];
	r12 = r1 >> 2;
	r7 = heap32[(r12+38)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	strcmp(i7);
	r13 = r_g0;
	r7 = r9 >>> 1;
	if(r13 <0) //_LBB707_50
{
__label__ = 46;
}
else{
	if(r13 <1) //_LBB707_51
{
__label__ = 47;
break _18;
}
else{
	r1 = (r10 + r8)|0;
	r9 = (r9 + -1)|0;
	r8 = (r1 + 4)|0;
	r7 = (r9 - r7)|0;
}
}
}
}
if (__label__ == 47){
if(!(r11 ==0)) //_LBB707_53
{
	r0 = heap32[(r12+39)];
	r0 = (r0 + 1)|0;
	heap32[(r12+39)] = r0;
__label__ = 65;
break _14;
}
}
	r1 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE14locale_bufsize;
	r1 = r1 >> 2;
	r7 = heap32[(r1)];
if(!(r5 !=r7)) //_LBB707_59
{
	r5 = r5 << 3;
	heap32[(g0)] = r5;
	_Znaj(i7);
	r5 = r_g0;
	r7 = heap32[(r3)];
	r8 = heap32[(r2)];
	r8 = r8 << 2;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	memcpy(i7);
	r8 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE10locale_buf;
if(!(r7 ==r8)) //_LBB707_58
{
if(!(r7 ==0)) //_LBB707_58
{
	heap32[(g0)] = r7;
	_ZdaPv(i7);
}
}
	heap32[(r3)] = r5;
	r5 = heap32[(r1)];
	r5 = r5 << 1;
	heap32[(r1)] = r5;
}
	r1 = heapU8[r0];
	if(r1 !=67) //_LBB707_65
{
__label__ = 61;
}
else{
	r1 = heapU8[r0+1];
	if(r1 !=0) //_LBB707_65
{
__label__ = 61;
}
else{
	r1 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE7classic;
	r5 = r1 >> 2;
	r1 = heap32[(r5)];
	if(r1 !=0) //_LBB707_64
{
	r0 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE12classic_body;
	r0 = r0 >> 2;
	r5 = heap32[(r0+39)];
	r5 = (r5 + 1)|0;
	heap32[(r0+39)] = r5;
__label__ = 63;
}
else{
	r1 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE12classic_body;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	_ZN4__rw11__rw_localeC2EPKc(i7);
	heap32[(r5)] = r1;
__label__ = 63;
}
}
}
if (__label__ == 61){
	heap32[(g0)] = 172;
	_Znwj(i7);
	r1 = r_g0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	_ZN4__rw11__rw_localeC2EPKc(i7);
}
	r0 = heap32[(r2)];
	r3 = heap32[(r3)];
	r5 = r0 << 2;
	r5 = (r3 + r5)|0;
	r5 = r5 >> 2;
	r7 = (r0 + 1)|0;
	heap32[(r5)] = r1;
	heap32[(r2)] = r7;
	r2 = (r0 + -1)|0;
	if(uint(r2) <uint(2147483645)) //_LBB707_69
{
	r2 = cmplocales__index__;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r2;
	quicksort(i7);
__label__ = 65;
}
else{
__label__ = 65;
}
}
else{
	r9 = r5;
	r10 = r8;
_48: while(true){
	r11 = r9;
	if(r11 ==0) //_LBB707_46
{
__label__ = 42;
break _48;
}
else{
	r9 = r11 << 1;
	r12 = r9 & -4;
	r13 = (r10 + r12)|0;
	r9 = r13 >> 2;
	r9 = heap32[(r9)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+38)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r9;
	strcmp(i7);
	r14 = r_g0;
	r9 = r11 >>> 1;
	if(r14 <0) //_LBB707_28
{
__label__ = 25;
}
else{
	if(r14 <1) //_LBB707_29
{
__label__ = 26;
break _48;
}
else{
	r10 = (r12 + r10)|0;
	r11 = (r11 + -1)|0;
	r10 = (r10 + 4)|0;
	r9 = (r11 - r9)|0;
}
}
}
}
if (__label__ == 26){
if(!(r13 ==0)) //_LBB707_46
{
	r1 = (r13 - r8)|0;
	r0 = r1 & -4;
	r9 = (r8 + r0)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r10 = r9 >> 2;
	r11 = heap32[(r10+39)];
	r11 = (r11 + -1)|0;
	heap32[(r10+39)] = r11;
	if(r11 !=0) //_LBB707_17
{
__label__ = 15;
break _14;
}
else{
	r1 = r1 >> 2;
	r11 = (r5 + -1)|0;
	heap32[(r2)] = r11;
	if(uint(r11) >uint(3)) //_LBB707_36
{
__label__ = 33;
}
else{
	r2 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE10locale_buf;
	if(r8 ==r2) //_LBB707_36
{
__label__ = 33;
}
else{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r0;
	r0 = r1 << 2;
	r5 = (r0 + r8)|0;
	r1 = (r11 - r1)|0;
	memcpy(i7);
	r0 = (r2 + r0)|0;
	r5 = (r5 + 4)|0;
	r1 = r1 << 2;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r1;
	memcpy(i7);
if(!(r8 ==0)) //_LBB707_35
{
	heap32[(g0)] = r8;
	_ZdaPv(i7);
}
	r1 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE14locale_bufsize;
	r1 = r1 >> 2;
	heap32[(r3)] = r2;
	heap32[(r1)] = 8;
__label__ = 36;
}
}
_63: do {
if (__label__ == 33){
	r0 = (r11 - r1)|0;
	r0 = r0 << 2;
if(!(r0 ==0)) //_LBB707_39
{
	r0 = r5 << 2;
	r1 = r1 << 2;
	r0 = (r0 + -4)|0;
	r2 = (r1 + r8)|0;
	r1 = (r0 - r1)|0;
	r0 = (r2 + 4)|0;
_66: while(true){
	r2 = heapU8[r0];
	r1 = (r1 + -1)|0;
	r3 = (r0 + 1)|0;
	heap8[r0+-4] = r2;
	r0 = r3;
if(!(r1 !=0)) //_LBB707_38
{
break _63;
}
}
}
}
} while(0);
	r1 = heap32[(r10+38)];
	r0 = heapU8[r1];
	if(r0 ==67) //_LBB707_41
{
	r1 = heapU8[r1+1];
	r7 = 0;
	r7 = r1 == r7;
}
	if(r7 != 0) //_LBB707_17
{
__label__ = 15;
break _14;
}
else{
	if(r9 ==0) //_LBB707_17
{
__label__ = 15;
break _14;
}
else{
	heap32[(g0)] = r9;
	_ZN4__rw11__rw_localeD2Ev(i7);
	heap32[(g0)] = r9;
	r1 = 0;
	_ZdlPv(i7);
__label__ = 65;
break _14;
}
}
}
}
}
	r0 = r1 >> 2;
	r2 = heap32[(r0+39)];
	r1 = 0;
	r2 = (r2 + -1)|0;
	heap32[(r0+39)] = r2;
__label__ = 65;
}
}
} while(0);
if (__label__ == 15){
	r1 = 0;
}
	r0 = heap32[(r6+1)];
if(!(r0 ==r4)) //_LBB707_73
{
if(!(r0 ==0)) //_LBB707_73
{
	heap32[(g0)] = r0;
	_ZdaPv(i7);
}
}
	r_g0 = r1;
	return;
}
else{
	r0 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE6global;
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
_84: do {
	if(r2 ==0) //_LBB707_3
{
	r3 = _ZZN4__rw11__rw_locale9_C_manageEPS0_PKcE5ginit;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	if(r4 !=0) //_LBB707_5
{
_87: while(true){
	r4 = heap32[(r3)];
if(!(r4 <1000)) //_LBB707_5
{
break _84;
}
}
}
else{
	r2 = (r4 + 1)|0;
	heap32[(r3)] = r2;
	r2 = _2E_str538;
	heap32[(g0)] = 0;
	heap32[(g0+1)] = r2;
	_ZN4__rw11__rw_locale9_C_manageEPS0_PKc(i7);
	r2 = r_g0;
	heap32[(r0)] = r2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1000)|0;
	heap32[(r3)] = r4;
}
}
} while(0);
	if(r1 ==0) //_LBB707_8
{
	r0 = r2 >> 2;
	r1 = heap32[(r0+39)];
	r1 = (r1 + 1)|0;
	heap32[(r0+39)] = r1;
	r_g0 = r2;
	return;
}
else{
	r3 = r1 >> 2;
	r4 = heap32[(r3+39)];
	r4 = (r4 + 1)|0;
	heap32[(r3+39)] = r4;
	heap32[(r0)] = r1;
	r_g0 = r2;
	return;
}
}
}