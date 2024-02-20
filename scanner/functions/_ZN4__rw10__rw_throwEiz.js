function _ZN4__rw10__rw_throwEiz(sp)
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
	i7 = sp + -64;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	if(r0 >4) //_LBB698_9
{
	r1 = (sp + 4)|0;
	heap32[(fp+-7)] = r1;
	r2 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E7__fname;
	heap32[(fp+-9)] = r1;
	r2 = r2 >> 2;
	heap32[(fp+-8)] = r1;
	r3 = heap32[(r2)];
if(!(r3 !=0)) //_LBB698_41
{
	r3 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E6buffer;
	r4 = 0;
_5: while(true){
	r5 = heapU8[r3];
	r4 = r5 == 58 ? r3 : r4;
	if(r5 !=0) //_LBB698_13
{
	r5 = (r3 + 1)|0;
	r6 = heapU8[r3+1];
	r4 = r6 == 58 ? r5 : r4;
	if(r6 !=0) //_LBB698_15
{
	r5 = (r3 + 2)|0;
	r6 = heapU8[r3+2];
	r4 = r6 == 58 ? r5 : r4;
	if(r6 !=0) //_LBB698_17
{
	r5 = (r3 + 3)|0;
	r6 = heapU8[r3+3];
	r4 = r6 == 58 ? r5 : r4;
	if(r6 !=0) //_LBB698_19
{
	r3 = (r3 + 4)|0;
}
else{
break _5;
}
}
else{
break _5;
}
}
else{
break _5;
}
}
else{
break _5;
}
}
_12: do {
if(!(r4 ==0)) //_LBB698_24
{
	r3 = 0;
	heap8[r4] = r3;
	r3 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E8__catset;
	r4 = (r4 + 1)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	sscanf(i7);
	r4 = r_g0;
	r3 = r3 >> 2;
if(!(r4 !=1)) //_LBB698_23
{
	r4 = heap32[(r3)];
	if(r4 >0) //_LBB698_24
{
break _12;
}
}
	heap32[(r3)] = 1;
}
} while(0);
	r3 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E4msgs;
	r4 = r3 >> 2;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
	heap32[(r4+3)] = 0;
	heap32[(r4+4)] = 0;
	heap32[(r4+5)] = 0;
	r5 = _ZTVSt8messagesIcE;
	heap32[(r4+6)] = 0;
	r5 = (r5 + 8)|0;
	heap32[(r4+7)] = 0;
	r6 = _ZN4__rwL22__rw_classic_once_initE_2E_0_2E_b;
	heap32[(r4)] = r5;
	r5 = heapU8[r6];
if(!(r5 != 0)) //_LBB698_29
{
	_ZN4__rw11__rw_locale11_C_get_bodyEPS0_S1_PKciPKNS_10__rw_facetE(i7);
	r5 = r_g0;
	r7 = _ZN4__rwL12__rw_classicE;
	r7 = r7 >> 2;
	heap32[(r7)] = r5;
if(!(r5 !=0)) //_LBB698_28
{
	r5 = _2E_str12102177;
	r7 = _2E_str10100175;
	r8 = _2E_str538;
	heap32[(g0)] = 19;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r8;
	_ZN4__rw10__rw_throwEiz(i7);
}
	r5 = 1;
	heap8[r6] = r5;
}
	r5 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E6buffer;
	r6 = heapU8[r5];
	if(r6 ==0) //_LBB698_31
{
	r6 = _ZNSs11_C_null_refE;
	r7 = 0;
	r6 = (r6 + 12)|0;
}
else{
	r6 = 0;
_28: while(true){
	r7 = (r5 - r6)|0;
	r6 = (r6 + -1)|0;
	r7 = heapU8[r7+1];
if(!(r7 !=0)) //_LBB698_32
{
break _28;
}
}
	r7 = 0;
	r7 = (r7 - r6)|0;
	if(r6 !=0) //_LBB698_35
{
	r6 = 32;
	r6 = uint(r7) > uint(r6) ? r7 : r6;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r7;
	_ZNSs10_C_get_repEjj(i7);
	r6 = (r_g0 + 12)|0;
}
else{
	r6 = _ZNSs11_C_null_refE;
	r6 = (r6 + 12)|0;
}
}
	heap32[(fp+-4)] = r6;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r7;
	memcpy(i7);
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	r6 = sp + -16;
	r7 = _ZN4__rwL12__rw_classicE;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r7;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = r_g0;
	r4 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E5__cat;
	r4 = r4 >> 2;
	heap32[(r4)] = r3;
	r3 = heap32[(fp+-4)];
	r3 = (r3 + -12)|0;
	r4 = _ZNSs11_C_null_refE;
if(!(r3 ==r4)) //_LBB698_40
{
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r6 = (r4 + -1)|0;
	heap32[(r3)] = r6;
if(!(r4 >0)) //_LBB698_40
{
	r3 = heap32[(fp+-4)];
	r3 = (r3 + -12)|0;
	heap32[(g0)] = r3;
	_ZdlPv(i7);
}
}
	heap32[(fp+-4)] = 0;
	heap32[(r2)] = r5;
}
	r2 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E5__cat;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	if(r2 !=-1) //_LBB698_43
{
	r3 = _ZNSs11_C_null_refE;
	r4 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E4msgs;
	r5 = (r3 + 12)|0;
	r6 = r4 >> 2;
	heap32[(fp+-2)] = r5;
	r5 = _ZZN4__rwL13__rw_vfmtwhatEPcjiS0_E8__catset;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r6+3)];
	r5 = heap32[(r5)];
	r7 = sp + -24;
	r8 = sp + -8;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r0;
	heap32[(g0+5)] = r8;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r2 = heap32[(fp+-2)];
	r2 = (r2 + -12)|0;
if(!(r2 ==r3)) //_LBB698_47
{
	r2 = r2 >> 2;
	r4 = heap32[(r2)];
	r5 = (r4 + -1)|0;
	heap32[(r2)] = r5;
if(!(r4 >0)) //_LBB698_47
{
	r2 = heap32[(fp+-2)];
	r2 = (r2 + -12)|0;
	heap32[(g0)] = r2;
	_ZdlPv(i7);
}
}
	heap32[(fp+-2)] = 0;
	r2 = heap32[(fp+-6)];
	r4 = r2 >> 2;
	r4 = heap32[(r4+-1)];
	if(r4 !=0) //_LBB698_49
{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	_ZN4__rwL13__rw_vfmtwhatEPcjPKcS0_(i7);
	r1 = r_g0;
	r2 = heap32[(fp+-6)];
}
else{
	r1 = 0;
}
	r2 = (r2 + -12)|0;
if(!(r2 ==r3)) //_LBB698_54
{
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r4 = (r3 + -1)|0;
	heap32[(r2)] = r4;
if(!(r3 >0)) //_LBB698_54
{
	r2 = heap32[(fp+-6)];
	r2 = (r2 + -12)|0;
	heap32[(g0)] = r2;
	_ZdlPv(i7);
}
}
	heap32[(fp+-6)] = 0;
	if(r1 ==0) //_LBB698_56
{
__label__ = 50;
}
else{
__label__ = 51;
}
}
else{
__label__ = 50;
}
if (__label__ == 50){
	r1 = 24;
	r2 = 0;
	r0 = uint(r0) > uint(r1) ? r2 : r0;
	r1 = _ZZN4__rw10__rw_throwEizE6errors;
	r2 = r0 << 2;
	r1 = (r1 + r2)|0;
	r1 = r1 >> 2;
	r2 = heap32[(fp+-7)];
	r1 = heap32[(r1)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	_ZN4__rwL13__rw_vfmtwhatEPcjPKcS0_(i7);
	r1 = r_g0;
	if(r1 ==0) //_LBB698_60
{
	if(r0 ==2) //_LBB698_65
{
	r0 = _2E_str47;
}
else{
	if(r0 ==1) //_LBB698_64
{
	r0 = _2E_str15132;
}
else{
	if(r0 !=0) //_LBB698_66
{
	r0 = _2E_str5134;
}
else{
	r0 = _2E_str4131;
}
}
}
	heap32[(g0)] = r0;
	fprintf(i7);
__label__ = 62;
}
else{
__label__ = 51;
}
}
if (__label__ == 51){
	heap32[(g0)] = r1;
	r0 = _ZN4__rwL13__rw_what_bufE;
	fprintf(i7);
	if(r1 !=r0) //_LBB698_59
{
	heap32[(g0)] = r1;
	_ZdaPv(i7);
}
else{
	r0 = _ZN4__rwL16__rw_what_refcntE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + -1)|0;
	heap32[(r0)] = r1;
}
}
	abort(i7);
}
else{
	if(r0 ==2) //_LBB698_6
{
	r0 = _2E_str47;
}
else{
	if(r0 ==1) //_LBB698_5
{
	r0 = _2E_str15132;
}
else{
	if(r0 !=0) //_LBB698_7
{
	r0 = _2E_str5134;
}
else{
	r0 = _2E_str4131;
}
}
}
	heap32[(g0)] = r0;
	fprintf(i7);
	abort(i7);
}
}