function mandreel_flash_tcp_receive_callbak(sp)
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
var __label__ = 0;
	i7 = sp + -32784;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heapU8[r0];
_1: do {
	if(r2 !=0) //_LBB853_2
{
	r3 = (r0 + 1)|0;
	r4 = 0;
_3: while(true){
	r2 = (r4 + 1)|0;
	r5 = heapU8[r3+r4];
	r4 = r2;
	if(r5 !=0) //_LBB853_3
{
continue _3;
}
else{
break _1;
}
}
}
else{
	r2 = 0;
}
} while(0);
	r3 = sp + -32768;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = 32768;
	r0 = _ZL10s_aSockets;
	r2 = 0;
	_ZN12mandreel_b6410b64_decodeEPKcjPvj(i7);
	r4 = r_g0;
	r6 = _ZL10s_aSockets;
_7: while(true){
	if(uint(r2) <uint(8)) //_LBB853_5
{
	r5 = (r2 * 8198)|0;
	r5 = r5 << 2;
	r5 = (r6 + r5)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5+8196)];
	if(r5 !=r1) //_LBB853_7
{
	r2 = (r2 + 1)|0;
	r0 = (r0 + 32792)|0;
continue _7;
}
else{
__label__ = 9;
break _7;
}
}
else{
__label__ = 8;
break _7;
}
}
if (__label__ == 8){
	r0 = 0;
}
	r1 = r0 >> 2;
	r2 = heap32[(r1+8194)];
	if(r4 >0) //_LBB853_12
{
	r5 = r4;
_16: while(true){
	r6 = (r2 + 1)|0;
	r5 = (r5 + -1)|0;
	r6 = r6 & 32767;
	r7 = (r3 + 1)|0;
	r3 = heapU8[r3];
	heap8[r0+r2] = r3;
	r3 = r7;
	r2 = r6;
if(!(r5 !=0)) //_LBB853_13
{
break _16;
}
}
	r2 = r6;
}
	heap32[(r1+8194)] = r2;
	r0 = heap32[(r1+8192)];
	r0 = (r0 + r4)|0;
	heap32[(r1+8192)] = r0;
	return;
}