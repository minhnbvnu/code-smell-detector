function _ZN4__rw11__rw_locale11_C_get_bodyEPS0_S1_PKciPKNS_10__rw_facetE(sp)
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
var __label__ = 0;
	i7 = sp + -304;var g0 = i7>>2; // save stack
	r0 = sp + -264;
	r1 = (r0 + 8)|0;
	r2 = r0 >> 2;
	heap32[(fp+-66)] = 0;
	r3 = 0;
	heap32[(r2+1)] = r1;
	heap8[sp+-256] = r3;
	r4 = _2E_str538;
	r5 = _2E_str292167;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 3;
	strncmp(i7);
	r5 = r_g0;
_1: do {
	if(r5 ==0) //_LBB708_2
{
	r4 = sp + -288;
	r5 = r4 >> 2;
	heap32[(fp+-72)] = 0;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
	r6 = 4;
	heap32[(r5+4)] = 0;
	heap32[(r5+5)] = 0;
_3: while(true){
	r6 = (r6 + -4)|0;
if(!(r6 !=0)) //_LBB708_3
{
break _3;
}
}
	r5 = _2E_str538;
_6: while(true){
	r6 = heapU8[r5];
	if(r6 ==0) //_LBB708_48
{
__label__ = 44;
break _6;
}
else{
	r6 = r3;
	r7 = r3;
_9: while(true){
	r8 = (r5 + r6)|0;
	r9 = heapU8[r5+r6];
	if(r9 ==59) //_LBB708_17
{
__label__ = 16;
break _9;
}
else{
	if(r9 !=0) //_LBB708_8
{
	r9 = heapU8[r8+1];
	if(r9 ==0) //_LBB708_7
{
__label__ = 6;
break _9;
}
else{
	if(r9 ==59) //_LBB708_21
{
__label__ = 18;
break _9;
}
else{
	r9 = heapU8[r8+2];
	if(r9 ==0) //_LBB708_7
{
__label__ = 6;
break _9;
}
else{
	r10 = r7 << 2;
	if(r9 !=59) //_LBB708_13
{
	r8 = heapU8[r8+3];
	if(r8 ==0) //_LBB708_7
{
__label__ = 6;
break _9;
}
else{
	if(r8 !=59) //_LBB708_16
{
	r7 = (r7 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 14;
break _9;
}
}
}
else{
__label__ = 11;
break _9;
}
}
}
}
}
else{
__label__ = 6;
break _9;
}
}
}
_19: do {
switch(__label__ ){//multiple entries
case 16:
	if(r8 ==0) //_LBB708_7
{
__label__ = 6;
break _19;
}
else{
__label__ = 19;
break _19;
}
break;
case 18:
	r8 = (r8 + 1)|0;
__label__ = 19;
break _19;
break;
case 14:
	r6 = r10 | 3;
	r8 = (r5 + r6)|0;
__label__ = 19;
break _19;
break;
case 11:
	r6 = r10 | 2;
	r8 = (r5 + r6)|0;
__label__ = 19;
break;
}
} while(0);
_24: do {
if (__label__ == 6){
	r6 = r5;
_26: while(true){
	r8 = (r6 + 1)|0;
	r7 = heapU8[r6+1];
	r6 = r8;
if(!(r7 !=0)) //_LBB708_19
{
break _24;
}
}
}
} while(0);
	r6 = 0;
	r7 = r6;
_29: while(true){
	r9 = (r5 + r6)|0;
	r10 = heapU8[r5+r6];
	if(r10 ==61) //_LBB708_35
{
__label__ = 32;
break _29;
}
else{
	if(r10 !=0) //_LBB708_26
{
	r10 = heapU8[r9+1];
	if(r10 ==0) //_LBB708_25
{
__label__ = 22;
break _6;
}
else{
	if(r10 ==61) //_LBB708_37
{
__label__ = 33;
break _29;
}
else{
	r10 = heapU8[r9+2];
	if(r10 ==0) //_LBB708_25
{
__label__ = 22;
break _6;
}
else{
	r11 = r7 << 2;
	if(r10 !=61) //_LBB708_31
{
	r9 = heapU8[r9+3];
	if(r9 ==0) //_LBB708_25
{
__label__ = 22;
break _6;
}
else{
	if(r9 !=61) //_LBB708_34
{
	r7 = (r7 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 30;
break _29;
}
}
}
else{
__label__ = 27;
break _29;
}
}
}
}
}
else{
__label__ = 22;
break _6;
}
}
}
switch(__label__ ){//multiple entries
case 32:
	if(r9 ==0) //_LBB708_25
{
__label__ = 22;
break _6;
}
break;
case 33:
	r9 = (r9 + 1)|0;
break;
case 30:
	r6 = r11 | 3;
	r9 = (r5 + r6)|0;
break;
case 27:
	r6 = r11 | 2;
	r9 = (r5 + r6)|0;
break;
}
	r6 = (r9 - r5)|0;
	r7 = 0;
_45: while(true){
	if(r7 !=-6) //_LBB708_39
{
	r10 = (r7 * -3)|0;
	r11 = _ZN4__rw9__rw_catsE;
	r10 = r10 << 2;
	r10 = (r11 + r10)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10+1)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	strncmp(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB708_42
{
	r7 = (r7 + -1)|0;
}
else{
__label__ = 36;
break _45;
}
}
else{
__label__ = 40;
break _45;
}
}
if (__label__ == 36){
	r6 = r7 << 2;
	r6 = (r4 - r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	if(r6 !=0) //_LBB708_25
{
__label__ = 22;
break _6;
}
else{
	r6 = 0;
	r6 = (r6 - r7)|0;
	r6 = r6 << 2;
	r6 = (r4 + r6)|0;
	r6 = r6 >> 2;
	r7 = (r9 + 1)|0;
	heap32[(r6)] = r7;
}
}
	r6 = heapU8[r8];
	r5 = r8;
	if(r6 ==0) //_LBB708_46
{
__label__ = 42;
}
else{
	r5 = (r8 + 1)|0;
}
}
}
switch(__label__ ){//multiple entries
case 44:
	r3 = 0;
	r5 = r3;
_56: while(true){
	if(r5 !=-6) //_LBB708_49
{
	r6 = (r3 - r5)|0;
	r6 = r6 << 2;
	r6 = (r4 + r6)|0;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	if(r7 ==0) //_LBB708_51
{
	r7 = _2E_str538;
	heap32[(r6)] = r7;
}
	r6 = 0;
	r8 = r6;
_62: while(true){
	r9 = heapU8[r7+r6];
	if(r9 ==0) //_LBB708_66
{
__label__ = 60;
break _62;
}
else{
	r10 = (r7 + r6)|0;
	if(r9 ==59) //_LBB708_64
{
__label__ = 59;
break _62;
}
else{
	r9 = heapU8[r10+1];
	if(r9 ==0) //_LBB708_66
{
__label__ = 60;
break _62;
}
else{
	if(r9 ==59) //_LBB708_71
{
__label__ = 65;
break _62;
}
else{
	r9 = heapU8[r10+2];
	if(r9 ==0) //_LBB708_66
{
__label__ = 60;
break _62;
}
else{
	r11 = r8 << 2;
	if(r9 !=59) //_LBB708_60
{
	r10 = heapU8[r10+3];
	if(r10 ==0) //_LBB708_66
{
__label__ = 60;
break _62;
}
else{
	if(r10 !=59) //_LBB708_63
{
	r8 = (r8 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 57;
break _62;
}
}
}
else{
__label__ = 54;
break _62;
}
}
}
}
}
}
}
_72: do {
switch(__label__ ){//multiple entries
case 59:
	if(r10 ==0) //_LBB708_66
{
__label__ = 60;
break _72;
}
else{
__label__ = 66;
break _72;
}
break;
case 65:
	r10 = (r10 + 1)|0;
__label__ = 66;
break _72;
break;
case 57:
	r6 = r11 | 3;
	r10 = (r7 + r6)|0;
__label__ = 66;
break _72;
break;
case 54:
	r6 = r11 | 2;
	r10 = (r7 + r6)|0;
__label__ = 66;
break;
}
} while(0);
if (__label__ == 60){
	r10 = heapU8[r7];
_79: do {
	if(r10 !=0) //_LBB708_68
{
	r6 = (r7 + 1)|0;
	r8 = 0;
_81: while(true){
	r10 = (r8 + 1)|0;
	r9 = heapU8[r6+r8];
	r8 = r10;
if(!(r9 !=0)) //_LBB708_69
{
break _79;
}
}
}
else{
	r10 = 0;
}
} while(0);
	r10 = (r7 + r10)|0;
}
	r6 = (r10 - r7)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r6;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
	r6 = _2E_str785;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 1;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
	r5 = (r5 + -1)|0;
}
else{
break _56;
}
}
	r4 = heap32[(r2+1)];
	if(r4 ==0) //_LBB708_78
{
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 0;
	_ZN4__rw11__rw_locale9_C_manageEPS0_PKc(i7);
	r4 = r_g0;
__label__ = 73;
break _1;
}
else{
__label__ = 72;
break _1;
}
break;
case 22:
	r4 = 0;
__label__ = 73;
break;
}
}
else{
__label__ = 72;
}
} while(0);
if (__label__ == 72){
	heap32[(g0)] = 0;
	heap32[(g0+1)] = r4;
	_ZN4__rw11__rw_locale9_C_manageEPS0_PKc(i7);
	r4 = r_g0;
}
	r0 = heap32[(r2+1)];
if(!(r0 ==r1)) //_LBB708_83
{
if(!(r0 ==0)) //_LBB708_83
{
	heap32[(g0)] = r0;
	_ZdaPv(i7);
}
}
	r_g0 = r4;
	return;
}