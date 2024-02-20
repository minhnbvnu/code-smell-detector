function _ZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_E(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _ZZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_EE12n_std_facets;
	r1 = _ZZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_EE10std_facets;
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r2 = heap32[(fp)];
	r3 = heap32[(r0)];
	r4 = heap32[(r1)];
_1: do {
	if(r2 ==0) //_LBB701_24
{
	r5 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r6 = heap32[(fp+3)];
	r7 = _2E_str538;
	r8 = r2 == 0 ? r7 : r2;
	r9 = r3;
_3: while(true){
	r10 = r9;
	if(r10 ==0) //_LBB701_34
{
__label__ = 34;
break _3;
}
else{
	r9 = r10 << 1;
	r11 = r9 & -4;
	r12 = (r4 + r11)|0;
	r9 = r12 >> 2;
	r13 = heap32[(r9)];
	r14 = r13 >> 2;
	r15 = heap32[(r14+5)];
	r9 = r10 >>> 1;
	if(r15 !=r5) //_LBB701_27
{
	r15 = (r15 - r5)|0;
}
else{
	r15 = heap32[(r14+1)];
	r15 = r15 == 0 ? r7 : r15;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r15;
	strcmp(i7);
	r15 = r_g0;
}
	if(r15 <0) //_LBB701_31
{
__label__ = 31;
}
else{
	if(r15 <1) //_LBB701_32
{
__label__ = 32;
break _3;
}
else{
	r4 = (r11 + r4)|0;
	r10 = (r10 + -1)|0;
	r4 = (r4 + 4)|0;
	r9 = (r10 - r9)|0;
}
}
}
}
if (__label__ == 32){
if(!(r12 ==0)) //_LBB701_34
{
	r2 = heap32[(r14+6)];
	r2 = (r2 + 1)|0;
	heap32[(r14+6)] = r2;
	r_g0 = r13;
	return;
}
}
	r4 = _ZZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_EE17std_facet_bufsize;
	r4 = r4 >> 2;
	r7 = heap32[(r4)];
if(!(r3 !=r7)) //_LBB701_39
{
	r3 = r3 << 3;
	heap32[(g0)] = r3;
	_Znaj(i7);
	r3 = r_g0;
	r7 = heap32[(r1)];
	r8 = heap32[(r0)];
	r8 = r8 << 2;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	memcpy(i7);
	r8 = _ZZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_EE13std_facet_buf;
if(!(r7 ==r8)) //_LBB701_38
{
if(!(r7 ==0)) //_LBB701_38
{
	heap32[(g0)] = r7;
	_ZdaPv(i7);
}
}
	heap32[(r1)] = r3;
	r3 = heap32[(r4)];
	r3 = r3 << 1;
	heap32[(r4)] = r3;
}
	r3 = r5 & 1;
	r4 = 0;
	r2 = r3 == 0 ? r2 : r4;
	heap32[(g0)] = 1;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r2 = r_g0;
	r3 = (r5 + 1)|0;
	r4 = r3 >>> 31;
	r6 = r2 >> 2;
	r3 = (r3 + r4)|0;
	r4 = heap32[(r6+7)];
	r4 = r4 >> 2;
	r3 = r3 >> 1;
	heap32[(r4)] = r3;
	r3 = heap32[(r6+5)];
if(!(r3 ==r5)) //_LBB701_41
{
	r3 = r2 >> 2;
	heap32[(r3+5)] = r5;
}
	r3 = r2 >> 2;
	r4 = heap32[(r3+6)];
if(!(r4 ==1)) //_LBB701_43
{
	heap32[(r3+6)] = 1;
}
	r3 = heap32[(r0)];
	r1 = heap32[(r1)];
	r4 = r3 << 2;
	r4 = (r1 + r4)|0;
	r4 = r4 >> 2;
	r5 = (r3 + 1)|0;
	heap32[(r4)] = r2;
	heap32[(r0)] = r5;
	r0 = (r3 + -1)|0;
	if(uint(r0) <uint(2147483645)) //_LBB701_45
{
	r0 = cmpfacets__index__;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r0;
	quicksort(i7);
}
}
else{
	r5 = r3;
	r6 = r4;
_31: while(true){
	r7 = r5;
	if(r7 ==0) //_LBB701_23
{
__label__ = 23;
break _31;
}
else{
	r5 = r7 << 1;
	r8 = r5 & -4;
	r9 = (r6 + r8)|0;
	r5 = r9 >> 2;
	r5 = heap32[(r5)];
	r10 = r2 >> 2;
	r11 = r5 >> 2;
	r12 = heap32[(r10+5)];
	r13 = heap32[(r11+5)];
	r5 = r7 >>> 1;
	if(r12 !=r13) //_LBB701_4
{
	r12 = (r13 - r12)|0;
}
else{
	r12 = heap32[(r11+1)];
	r13 = heap32[(r10+1)];
	r10 = _2E_str538;
	r13 = r13 == 0 ? r10 : r13;
	r12 = r12 == 0 ? r10 : r12;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r12;
	strcmp(i7);
	r12 = r_g0;
}
	if(r12 <0) //_LBB701_8
{
__label__ = 8;
}
else{
	if(r12 <1) //_LBB701_9
{
__label__ = 9;
break _31;
}
else{
	r6 = (r8 + r6)|0;
	r7 = (r7 + -1)|0;
	r6 = (r6 + 4)|0;
	r5 = (r7 - r5)|0;
}
}
}
}
if (__label__ == 9){
if(!(r9 ==0)) //_LBB701_23
{
	r2 = (r9 - r4)|0;
	r5 = r2 & -4;
	r6 = (r4 + r5)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	r7 = r6 >> 2;
	r8 = heap32[(r7+6)];
	r8 = (r8 + -1)|0;
	heap32[(r7+6)] = r8;
	if(r8 ==0) //_LBB701_12
{
	r2 = r2 >> 2;
	r8 = (r3 + -1)|0;
	heap32[(r0)] = r8;
	if(uint(r8) >uint(207)) //_LBB701_17
{
__label__ = 17;
}
else{
	r0 = _ZZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_EE13std_facet_buf;
	if(r4 ==r0) //_LBB701_17
{
__label__ = 17;
}
else{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	r3 = r2 << 2;
	r5 = (r3 + r4)|0;
	r2 = (r8 - r2)|0;
	memcpy(i7);
	r3 = (r0 + r3)|0;
	r8 = (r5 + 4)|0;
	r2 = r2 << 2;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r2;
	memcpy(i7);
if(!(r4 ==0)) //_LBB701_16
{
	heap32[(g0)] = r4;
	_ZdaPv(i7);
}
	heap32[(r1)] = r0;
__label__ = 20;
}
}
_51: do {
if (__label__ == 17){
	r0 = (r8 - r2)|0;
	r0 = r0 << 2;
if(!(r0 ==0)) //_LBB701_20
{
	r0 = r3 << 2;
	r2 = r2 << 2;
	r0 = (r0 + -4)|0;
	r1 = (r2 + r4)|0;
	r2 = (r0 - r2)|0;
	r0 = (r1 + 4)|0;
_54: while(true){
	r1 = heapU8[r0];
	r2 = (r2 + -1)|0;
	r3 = (r0 + 1)|0;
	heap8[r0+-4] = r1;
	r0 = r3;
if(!(r2 !=0)) //_LBB701_19
{
break _51;
}
}
}
}
} while(0);
	r2 = heap32[(r7+1)];
if(!(r2 ==0)) //_LBB701_11
{
if(!(r6 ==0)) //_LBB701_11
{
	r2 = heap32[(r7)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = 0;
	r_g0 = r2;
	return;
}
}
}
	r2 = 0;
break _1;
}
}
	r0 = r2 >> 2;
	r1 = heap32[(r0+6)];
	r1 = (r1 + -1)|0;
	heap32[(r0+6)] = r1;
	r0 = 0;
	r_g0 = r0;
	return;
}
} while(0);
	r_g0 = r2;
	return;
}