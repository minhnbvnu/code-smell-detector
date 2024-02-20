function fopen(sp)
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
var __label__ = 0;
	i7 = sp + -2064;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0];
	r2 = 46;
	r3 = 92;
	r4 = heapU8[r0+1];
	r5 = 47;
	r1 = r1 == r2;
	r2 = r4 == r3;
	r1 = r1 & r2;
	r2 = r4 == r5;
	r1 = r1 | r2;
	r2 = (r0 + 1)|0;
	r1 = r1 != 0 ? r2 : r0;
	r2 = heapU8[r1];
	r3 = heap32[(fp+1)];
_1: do {
	if(r2 !=0) //_LBB791_2
{
	r4 = sp + -2048;
	r1 = (r1 + 1)|0;
	r6 = 0;
	r8 = 26;
_3: while(true){
	r7 = r2 & 255;
	if(r7 ==47) //_LBB791_5
{
__label__ = 5;
}
else{
	if(r7 !=92) //_LBB791_8
{
	r6 = r2 << 24;
	r6 = r6 >> 24;
	r7 = (r6 + -65)|0;
	r9 = (r2 + 32)|0;
	r10 = (r4 + 1)|0;
	r6 = 0;
	r2 = uint(r7) < uint(r8) ? r9 : r2;
	heap8[r4] = r2;
	r4 = r10;
__label__ = 9;
}
else{
__label__ = 5;
}
}
if (__label__ == 5){
	r2 = r6 & 255;
	heap8[r4] = r5;
	if(r2 ==0) //_LBB791_7
{
	r4 = (r4 + 1)|0;
	r6 = 1;
}
else{
	r6 = 1;
}
}
	r2 = heapU8[r1];
	if(r2 !=0) //_LBB791_11
{
	r1 = (r1 + 1)|0;
continue _3;
}
else{
break _1;
}
}
}
else{
	r4 = sp + -2048;
}
} while(0);
	r1 = 0;
	heap8[r4] = r1;
	r2 = sp + -2048;
	r4 = _2E_str33679;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = 4;
	strncmp(i7);
	r4 = r_g0;
_17: do {
	if(r4 !=0) //_LBB791_29
{
	r4 = _2E_str34680;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = 4;
	strncmp(i7);
	r4 = r_g0;
	if(r4 ==0) //_LBB791_31
{
	heap32[(g0)] = 0;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	r0 = _2E_str31677;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
_21: do {
	if(r0 !=0) //_LBB791_33
{
	r0 = _2E_str4651;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB791_32
{
__label__ = 30;
}
else{
	r0 = _2E_str5652;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB791_36
{
	r0 = _2E_str32678;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB791_35
{
	r4 = heapU8[r3];
	r0 = 119;
	r3 = 114;
	r0 = r4 == r0;
	r5 = r4 == r3;
	r3 = r0 & 1;
	r0 = r5 & 1;
	if(r4 ==114) //_LBB791_39
{
__label__ = 36;
break _21;
}
else{
__label__ = 38;
break _21;
}
}
}
	r0 = 1;
	r1 = 0;
	r3 = r0;
__label__ = 38;
}
}
else{
__label__ = 30;
}
} while(0);
if (__label__ == 30){
	r0 = 1;
	r3 = r0;
__label__ = 36;
}
if (__label__ == 36){
	heap32[(g0)] = r2;
	mandreel_opencloud(i7);
	r1 = r_g0;
	if(r1 ==-1) //_LBB791_41
{
	r4 = 0;
break _17;
}
}
	heap32[(g0)] = 284;
	_Znwj(i7);
	r4 = r_g0;
	r5 = _ZTV10CFileCloud;
	r6 = r4 >> 2;
	r5 = (r5 + 8)|0;
	r7 = 1;
	heap32[(r6)] = r5;
	heap8[r4+4] = r7;
	heap32[(r6+4)] = 0;
	heap32[(r6+6)] = 0;
	heap32[(r6+2)] = r1;
	heap8[r4+5] = r3;
	heap8[r4+6] = r0;
	heap32[(r6+5)] = 0;
	r0 = (r4 + 28)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	strcpy(i7);
	if(r1 ==0) //_LBB791_44
{
	r0 = r3 & 255;
	if(r0 ==0) //_LBB791_46
{
break _17;
}
else{
	r0 = r4 >> 2;
	heap32[(r0+3)] = 131072;
	heap32[(g0)] = 131072;
	malloc(i7);
	heap32[(r0+6)] = r_g0;
}
}
else{
	r3 = (r1 + 131072)|0;
	r2 = r4 >> 2;
	heap32[(r2+3)] = r3;
	heap32[(g0)] = r3;
	malloc(i7);
	heap32[(r2+6)] = r_g0;
	r3 = (r1 + 4)|0;
	heap32[(g0)] = r3;
	malloc(i7);
	r3 = r_g0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r1;
	mandreel_readcloud(i7);
	r0 = heap32[(r2+3)];
	r5 = heap32[(r2+6)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r0;
	_ZN12mandreel_b6410b64_decodeEPKcjPvj(i7);
	r0 = r_g0;
	heap32[(g0)] = r3;
	free(i7);
	heap32[(r2+2)] = r0;
	heap32[(r2+5)] = r0;
}
}
else{
	r1 = r3;
_39: while(true){
	r4 = heapU8[r1];
	if(r4 ==0) //_LBB791_51
{
__label__ = 46;
break _39;
}
else{
	if(r4 ==87) //_LBB791_50
{
__label__ = 45;
break _39;
}
else{
	r1 = (r1 + 1)|0;
	if(r4 !=119) //_LBB791_47
{
__label__ = 42;
}
else{
__label__ = 45;
break _39;
}
}
}
}
switch(__label__ ){//multiple entries
case 46:
	r0 = heapU8[sp+-2048];
	if(r0 !=47) //_LBB791_53
{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	mandreel_fopen(i7);
	r2 = r_g0;
}
else{
	r2 = (r2 + 1)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	mandreel_fopen(i7);
	r2 = r_g0;
}
	if(r2 ==0) //_LBB791_56
{
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	heap32[(g0)] = 8;
	r0 = _ZTV11CFileSystem;
	_Znwj(i7);
	r3 = r_g0 >> 2;
	r0 = (r0 + 8)|0;
	heap32[(r3)] = r0;
	heap32[(r3+1)] = r2;
	return;
}
break;
case 45:
	r2 = _2E_str35681;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r3;
	printf(i7);
	r2 = 0;
	r_g0 = r2;
	return;
break;
}
}
}
else{
	heap32[(g0)] = 0;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	r0 = _2E_str31677;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
_54: do {
	if(r0 !=0) //_LBB791_15
{
	r0 = _2E_str4651;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB791_14
{
__label__ = 13;
}
else{
	r0 = _2E_str5652;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB791_18
{
	r0 = _2E_str32678;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB791_17
{
	r3 = heapU8[r3];
	r0 = 119;
	r1 = 114;
	r0 = r3 == r0;
	r4 = r3 == r1;
	r1 = r0 & 1;
	r0 = r4 & 1;
	if(r3 ==114) //_LBB791_21
{
__label__ = 20;
break _54;
}
else{
	r3 = 0;
__label__ = 22;
break _54;
}
}
}
	r0 = 1;
	r3 = 0;
	r1 = r0;
__label__ = 22;
}
}
else{
__label__ = 13;
}
} while(0);
if (__label__ == 13){
	r0 = 1;
	r1 = r0;
__label__ = 20;
}
if (__label__ == 20){
	heap32[(g0)] = r2;
	mandreel_openls(i7);
	r3 = r_g0;
	if(r3 ==-1) //_LBB791_23
{
	r4 = 0;
break _17;
}
}
	heap32[(g0)] = 284;
	_Znwj(i7);
	r4 = r_g0;
	r5 = _ZTV7CFileLS;
	r6 = r4 >> 2;
	r5 = (r5 + 8)|0;
	r7 = 1;
	heap32[(r6)] = r5;
	heap8[r4+4] = r7;
	heap32[(r6+4)] = 0;
	heap32[(r6+6)] = 0;
	heap32[(r6+2)] = r3;
	heap8[r4+5] = r1;
	heap8[r4+6] = r0;
	heap32[(r6+5)] = 0;
	r0 = (r4 + 28)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	strcpy(i7);
	if(r3 ==0) //_LBB791_26
{
	r0 = r1 & 255;
if(!(r0 ==0)) //_LBB791_28
{
	r0 = r4 >> 2;
	heap32[(r0+3)] = 131072;
	heap32[(g0)] = 131072;
	malloc(i7);
	heap32[(r0+6)] = r_g0;
}
}
else{
	r1 = (r3 + 131072)|0;
	r2 = r4 >> 2;
	heap32[(r2+3)] = r1;
	heap32[(g0)] = r1;
	malloc(i7);
	heap32[(r2+6)] = r_g0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = r3;
	mandreel_readls(i7);
	heap32[(r2+5)] = r3;
}
}
} while(0);
	heap32[(g0)] = 1;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	r_g0 = r4;
	return;
}