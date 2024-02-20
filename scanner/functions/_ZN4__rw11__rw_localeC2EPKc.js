function _ZN4__rw11__rw_localeC2EPKc(sp)
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
var __label__ = 0;
	i7 = sp + -280;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	heap32[(r1+26)] = 0;
	heap32[(r1+27)] = 0;
	heap32[(r1+39)] = 1;
	r2 = heap32[(fp+1)];
	heap32[(r1+40)] = 0;
	heap32[(r1+41)] = 0;
	r3 = heapU8[r2];
	if(r3 ==0) //_LBB706_2
{
	r3 = sp + -264;
	r4 = 0;
	r5 = r3 >> 2;
	r6 = (r0 + 112)|0;
	heap8[sp+-256] = r4;
	heap32[(r5+1)] = r6;
	heap32[(fp+-66)] = 0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	r2 = (r3 + 8)|0;
	_ZN4__rwL16__rw_expand_nameERNS_14__rw_pod_arrayIcLj256EEEPKc(i7);
	r3 = r_g0;
	heap32[(r1+38)] = r3;
	heap32[(r5+1)] = r2;
}
else{
	r3 = 1;
_5: while(true){
	r4 = (r3 + 1)|0;
	r5 = heapU8[r2+r3];
	r3 = r4;
if(!(r5 !=0)) //_LBB706_4
{
break _5;
}
}
	if(uint(r4) >uint(39)) //_LBB706_7
{
	heap32[(g0)] = r4;
	_Znaj(i7);
	r3 = r_g0;
}
else{
	r3 = (r0 + 112)|0;
}
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	memcpy(i7);
	heap32[(r1+38)] = r3;
}
	r2 = 0;
	heap32[(r1+40)] = 67108863;
	heap32[(r1+41)] = 0;
_13: while(true){
	r4 = (r3 - r2)|0;
	r5 = heapU8[r4];
	if(r5 ==0) //_LBB706_43
{
__label__ = 41;
break _13;
}
else{
	if(r5 ==59) //_LBB706_20
{
__label__ = 20;
break _13;
}
else{
	r5 = heapU8[r4+1];
	if(r5 ==0) //_LBB706_43
{
__label__ = 41;
break _13;
}
else{
	if(r5 !=59) //_LBB706_15
{
	r5 = heapU8[r4+2];
	if(r5 ==0) //_LBB706_43
{
__label__ = 41;
break _13;
}
else{
	if(r5 ==59) //_LBB706_14
{
__label__ = 14;
break _13;
}
else{
	r4 = heapU8[r4+3];
	if(r4 ==0) //_LBB706_43
{
__label__ = 41;
break _13;
}
else{
	if(r4 ==59) //_LBB706_14
{
__label__ = 14;
break _13;
}
else{
	r2 = (r2 + -4)|0;
continue _13;
}
}
}
}
}
else{
__label__ = 14;
break _13;
}
}
}
}
}
if (__label__ == 20){
	if(r3 ==r2) //_LBB706_43
{
__label__ = 41;
}
else{
__label__ = 14;
}
}
_25: do {
switch(__label__ ){//multiple entries
case 41:
	r2 = heapU8[r3];
if(!(r2 !=67)) //_LBB706_45
{
	r2 = heapU8[r3+1];
	if(r2 ==0) //_LBB706_46
{
break _25;
}
}
	heap32[(r1+41)] = 67108863;
break;
case 14:
	r2 = 0;
	r4 = r2;
_31: while(true){
	r5 = heapU8[r3];
	if(r5 ==0) //_LBB706_46
{
break _25;
}
else{
	if(r2 !=-6) //_LBB706_21
{
	r5 = r5 & 255;
	if(r5 !=67) //_LBB706_24
{
__label__ = 23;
}
else{
	r5 = heapU8[r3+1];
	if(r5 !=59) //_LBB706_24
{
__label__ = 23;
}
else{
__label__ = 24;
}
}
if (__label__ == 23){
	r5 = (r2 * -3)|0;
	r6 = _ZN4__rw9__rw_catsE;
	r5 = r5 << 2;
	r5 = (r6 + r5)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	r4 = r5 | r4;
	heap32[(r1+41)] = r4;
}
	r5 = 0;
	r6 = r3;
_40: while(true){
	r7 = heapU8[r6];
	if(r7 ==0) //_LBB706_46
{
break _25;
}
else{
	if(r7 ==59) //_LBB706_37
{
__label__ = 36;
break _40;
}
else{
	r7 = heapU8[r6+1];
	if(r7 ==0) //_LBB706_46
{
break _25;
}
else{
	if(r7 ==59) //_LBB706_39
{
__label__ = 37;
break _40;
}
else{
	r7 = heapU8[r6+2];
	if(r7 ==0) //_LBB706_46
{
break _25;
}
else{
	r8 = r5 << 2;
	if(r7 !=59) //_LBB706_33
{
	r7 = heapU8[r6+3];
	if(r7 ==0) //_LBB706_46
{
break _25;
}
else{
	if(r7 !=59) //_LBB706_36
{
	r5 = (r5 + 1)|0;
	r6 = (r6 + 4)|0;
}
else{
__label__ = 34;
break _40;
}
}
}
else{
__label__ = 31;
break _40;
}
}
}
}
}
}
}
switch(__label__ ){//multiple entries
case 36:
	if(r6 ==0) //_LBB706_46
{
break _25;
}
break;
case 37:
	r6 = (r6 + 1)|0;
break;
case 34:
	r5 = r8 | 3;
	r6 = (r3 + r5)|0;
break;
case 31:
	r5 = r8 | 2;
	r6 = (r3 + r5)|0;
break;
}
	r3 = (r6 + 1)|0;
	r2 = (r2 + -1)|0;
continue _31;
}
else{
break _25;
}
}
}
break;
}
} while(0);
	r1 = 104;
	r3 = 0;
_57: while(true){
	r2 = (r1 + -1)|0;
	r1 = (r0 - r1)|0;
	heap8[r1+104] = r3;
	r1 = r2;
	if(r2 !=0) //_LBB706_47
{
continue _57;
}
else{
break _57;
}
}
	return;
}