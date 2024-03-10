function _ZN4__rw16__rw_locale_nameEiPKcRNS_14__rw_pod_arrayIcLj256EEE(sp)
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
	i7 = sp + -368;var g0 = i7>>2; // save stack
	r0 = _ZZN4__rw16__rw_locale_nameEiPKcRNS_14__rw_pod_arrayIcLj256EEEE11locale_root;
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heapU8[r0];
	r5 = 0;
	heap8[sp+-259] = r5;
	r6 = heapU8[r2];
_1: do {
	if(r6 !=0) //_LBB712_2
{
	r7 = (r2 + 1)|0;
_3: while(true){
	r6 = (r5 + 1)|0;
	r8 = heapU8[r7+r5];
	r5 = r6;
	if(r8 !=0) //_LBB712_3
{
continue _3;
}
else{
break _1;
}
}
}
else{
	r6 = 0;
}
} while(0);
	r4 = r4 & 255;
_7: do {
	if(r4 !=0) //_LBB712_6
{
	r4 = (r6 + 1)|0;
	r5 = (r0 + 1)|0;
_9: while(true){
	r4 = (r4 + 1)|0;
	r7 = (r5 + 1)|0;
	r8 = heapU8[r5];
	r5 = r7;
if(!(r8 !=0)) //_LBB712_7
{
break _9;
}
}
	if(uint(r4) >uint(258)) //_LBB712_5
{
__label__ = 5;
}
else{
	r4 = sp + -259;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	strcpy(i7);
	r0 = heapU8[sp+-259];
_13: do {
	if(r0 !=0) //_LBB712_11
{
	r0 = (r4 + 1)|0;
	r7 = 0;
_15: while(true){
	r5 = (r7 + 1)|0;
	r8 = heapU8[r0+r7];
	r7 = r5;
if(!(r8 !=0)) //_LBB712_12
{
break _13;
}
}
}
else{
	r5 = 0;
}
} while(0);
	r7 = 47;
	r0 = (r5 + 1)|0;
	r8 = 0;
	heap8[r4+r5] = r7;
	heap8[r4+r0] = r8;
	r5 = heapU8[sp+-259];
	if(r5 !=0) //_LBB712_15
{
	r5 = (r4 + 1)|0;
_21: while(true){
	r4 = (r8 + 1)|0;
	r7 = heapU8[r5+r8];
	r8 = r4;
	if(r7 !=0) //_LBB712_16
{
continue _21;
}
else{
__label__ = 17;
break _7;
}
}
}
else{
	r4 = 0;
__label__ = 17;
}
}
}
else{
__label__ = 5;
}
} while(0);
if (__label__ == 5){
	r0 = 0;
	r4 = r0;
}
	r4 = (r4 + r6)|0;
if(!(uint(r4) >uint(258))) //_LBB712_33
{
	r4 = sp + -259;
	r0 = (r4 + r0)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	strcpy(i7);
	r0 = _2E_str37683;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB712_28
{
	r1 = heapU8[r2];
_31: do {
	if(r1 !=0) //_LBB712_30
{
	r0 = (r2 + 1)|0;
	r4 = 0;
_33: while(true){
	r1 = (r4 + 1)|0;
	r5 = heapU8[r0+r4];
	r4 = r1;
if(!(r5 !=0)) //_LBB712_31
{
break _31;
}
}
}
else{
	r1 = 0;
}
} while(0);
	r0 = r3 >> 2;
	heap32[(r0)] = 0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	_ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(i7);
	r1 = heap32[(r0+1)];
	r_g0 = r1;
	return;
}
else{
	r2 = _2E_str1648;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	fopen(i7);
	r2 = r_g0;
if(!(r2 ==0)) //_LBB712_33
{
	if(uint(r2) <uint(10)) //_LBB712_22
{
	r3 = _ZL13s_file_stdout;
	r0 = r3 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+7)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
else{
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = r2;
}
	r0 = r3 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	if(uint(r2) >uint(9)) //_LBB712_25
{
	r3 = r2;
}
else{
	r3 = _ZL13s_file_stdout;
}
	r0 = r3 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+4)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r0)>>2](i7);
if(!(uint(r2) <uint(10))) //_LBB712_33
{
	heap32[(g0)] = r3;
	_ZdlPv(i7);
}
}
}
}
	r0 = sp + -352;
	r0 = r0 >> 2;
	heap32[(r0+20)] = 0;
	heap32[(r0+22)] = r1;
	heap32[(r0+21)] = 0;
	r0 = 0;
	r_g0 = r0;
	return;
}