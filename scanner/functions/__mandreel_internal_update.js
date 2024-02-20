function __mandreel_internal_update(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = -32788;
_1: while(true){
	r1 = _ZL10s_aSockets;
	r1 = (r1 - r0)|0;
	r2 = heapU8[r1];
if(!(r2 ==0)) //_LBB821_3
{
	r1 = r1 >> 2;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 2048;
	js_mandreel_flash_tcp_update(i7);
}
	r0 = (r0 + -32792)|0;
	if(r0 !=-295124) //_LBB821_1
{
continue _1;
}
else{
break _1;
}
}
	r0 = _ZL7g_bInit_2E_b;
	r1 = heapU8[r0];
	if(r1 != 0) //_LBB821_6
{
	mandreel_audio_update(i7);
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	gettimeofday(i7);
	r2 = heap32[(fp+-2)];
	r3 = r2 >> 31;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 1000000;
	heap32[(g0+3)] = 0;
	r1 = r1 >> 2;
	r1 = heap32[(r1+1)];
	__muldi3(i7);
	r4 = (r_g0 + r1)|0;
	r5 = 1;
	r6 = 0;
	r7 = r1 >> 31;
	r2 = uint(r4) < uint(r_g0) ? r5 : r6;
	r3 = (r_g1 + r7)|0;
	r1 = uint(r4) < uint(r1) ? r5 : r2;
	r1 = (r3 + r1)|0;
	r2 = _ZGVZ21Mandreel_GetTickCountE7s_first;
	r3 = heapU8[r2];
if(!(r3 !=0)) //_LBB821_8
{
	r3 = _ZZ21Mandreel_GetTickCountE7s_first;
	r3 = r3 >> 2;
	heap32[(r3)] = r4;
	heap32[(r3+1)] = r1;
	heap8[r2] = r5;
}
	r2 = _ZZ21Mandreel_GetTickCountE7s_first;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r2 = heap32[(r2+1)];
	r1 = (r1 - r2)|0;
	r2 = uint(r4) < uint(r3) ? r5 : r6;
	r3 = (r4 - r3)|0;
	r1 = (r1 - r2)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 1000;
	heap32[(g0+3)] = 0;
	__udivdi3(i7);
	r1 = r_g0;
	r2 = _ZL11g_aChannels;
_12: while(true){
	if(r6 <32) //_LBB821_9
{
	r3 = r2 >> 2;
	r4 = heap32[(r3+72)];
if(!(r4 !=1)) //_LBB821_33
{
	r4 = _ZL11g_aChannels;
	r7 = (r6 * 292)|0;
	r4 = (r4 + r7)|0;
	r7 = heapU8[r4+268];
if(!(r7 !=0)) //_LBB821_33
{
	r7 = heap32[(r3+71)];
	if(r7 ==-1) //_LBB821_13
{
	r7 = heapU8[r0];
	if(r7 !=1) //_LBB821_15
{
__label__ = 14;
break _12;
}
else{
	r7 = _ZL21g_pFirstSoundDuration;
_21: while(true){
	r7 = r7 >> 2;
	r7 = heap32[(r7)];
	if(r7 !=0) //_LBB821_16
{
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r2;
	strcmp(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB821_18
{
	r7 = (r7 + 260)|0;
}
else{
__label__ = 16;
break _21;
}
}
else{
__label__ = 19;
break _21;
}
}
switch(__label__ ){//multiple entries
case 19:
	r7 = _2E_str3224;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r2;
	r7 = 0;
	_printf_warning(i7);
break;
case 16:
	r7 = r7 >> 2;
	r7 = heap32[(r7+64)];
break;
}
	heap32[(r3+71)] = r7;
}
}
	r8 = heap32[(r3+70)];
	r7 = (r8 + r7)|0;
if(!(uint(r7) >uint(r1))) //_LBB821_33
{
	r7 = heapU8[r0];
	if(r7 != 0) //_LBB821_25
{
	r7 = (r6 + -1)|0;
if(!(uint(r7) >uint(30))) //_LBB821_33
{
	r7 = heapU8[r4+269];
if(!(r7 !=0)) //_LBB821_33
{
if(!(uint(r6) >uint(31))) //_LBB821_29
{
	r7 = heap32[(r3+68)];
	r8 = heap32[(r3+69)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r7;
	mandreel_audio_stopChannel(i7);
	heap32[(r3+72)] = 0;
	heap32[(r3+68)] = -1;
}
	r3 = _ZL15g_iFreeChannels;
	r3 = r3 >> 2;
	heap8[r4+269] = r5;
	r4 = heap32[(r3)];
	r7 = (r4 + -1)|0;
_37: do {
if(!(r7 <0)) //_LBB821_32
{
	r7 = r4;
_39: while(true){
	r8 = _ZL15g_aFreeChannels;
	r9 = r7 << 2;
	r8 = (r8 + r9)|0;
	r8 = r8 >> 2;
	r9 = heap32[(r8+-1)];
	r7 = (r7 + -1)|0;
	heap32[(r8)] = r9;
if(!(r7 !=0)) //_LBB821_31
{
break _37;
}
}
}
} while(0);
	r7 = _ZL15g_aFreeChannels;
	r7 = r7 >> 2;
	r4 = (r4 + 1)|0;
	heap32[(r7)] = r6;
	heap32[(r3)] = r4;
}
}
}
else{
__label__ = 23;
break _12;
}
}
}
}
	r6 = (r6 + 1)|0;
	r2 = (r2 + 292)|0;
}
else{
__label__ = 34;
break _12;
}
}
switch(__label__ ){//multiple entries
case 34:
	return;
break;
case 14:
	r7 = _2E_str221;
	r0 = _2E_str1222;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 341;
	_assert(i7);
break;
case 23:
	r0 = _2E_str221;
	r1 = _2E_str1222;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 621;
	_assert(i7);
break;
}
}
else{
	r0 = _2E_str221;
	r1 = _2E_str1222;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 361;
	_assert(i7);
}
}