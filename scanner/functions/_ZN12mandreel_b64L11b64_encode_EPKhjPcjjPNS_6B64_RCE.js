function _ZN12mandreel_b64L11b64_encode_EPKhjPcjjPNS_6B64_RCE(sp)
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
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = (r0 + 2)|0;
	r2 = heap32[(fp+4)];
	r1 = Math.floor(uint(r1) / uint(3));
	r3 = heap32[(fp+2)];
	r1 = r1 << 2;
	r4 = r2 >> 2;
	heap32[(r4)] = 0;
_1: do {
if(!(r3 ==0)) //_LBB805_20
{
	r5 = heap32[(fp+3)];
	if(uint(r1) <=uint(r5)) //_LBB805_3
{
	r4 = heap32[(fp)];
	if(uint(r0) >uint(2)) //_LBB805_5
{
	r5 = (r3 + r5)|0;
	r6 = 0;
	r12 = _ZN12mandreel_b64L9b64_charsE;
_7: while(true){
	r7 = heapU8[r4];
	r8 = heapU8[r4+1];
	r9 = r7 << 4;
	r10 = heapU8[r4+2];
	r11 = r8 << 2;
	r9 = r9 & 48;
	r8 = r8 >>> 4;
	r7 = r7 >>> 2;
	r8 = r9 | r8;
	r9 = r11 & 60;
	r11 = r10 >>> 6;
	r7 = heapU8[r12+r7];
	r9 = r9 | r11;
	r8 = heapU8[r12+r8];
	heap8[r3] = r7;
	r7 = r10 & 63;
	r9 = heapU8[r12+r9];
	heap8[r3+1] = r8;
	r8 = (r3 + 4)|0;
	r6 = (r6 + 4)|0;
	r7 = heapU8[r12+r7];
	heap8[r3+2] = r9;
	heap8[r3+3] = r7;
	if(r8 ==r5) //_LBB805_8
{
__label__ = 7;
}
else{
	if(r6 ==0) //_LBB805_9
{
	r7 = 13;
	r8 = (r3 + 6)|0;
	r6 = 0;
	r9 = 10;
	heap8[r3+4] = r7;
	heap8[r3+5] = r9;
	r3 = r8;
__label__ = 9;
}
else{
__label__ = 7;
}
}
if (__label__ == 7){
	r3 = r8;
}
	r0 = (r0 + -3)|0;
	r4 = (r4 + 3)|0;
if(!(uint(r0) >uint(2))) //_LBB805_6
{
break _7;
}
}
}
if(!(r0 ==0)) //_LBB805_20
{
	r5 = 0;
_17: while(true){
	r6 = sp + -3;
	r7 = (r4 - r5)|0;
	r8 = (r5 + -1)|0;
	r5 = (r6 - r5)|0;
	r7 = heapU8[r7];
	heap8[r5] = r7;
	r7 = (r0 + r8)|0;
	r5 = r8;
if(!(r7 !=0)) //_LBB805_13
{
break _17;
}
}
	if(r0 !=3) //_LBB805_16
{
	r4 = 3;
	r5 = (r4 - r0)|0;
	r8 = 0;
_22: while(true){
	r7 = (r5 + -1)|0;
	r5 = (r6 - r5)|0;
	heap8[r5+3] = r8;
	r5 = r7;
if(!(r7 !=0)) //_LBB805_17
{
break _22;
}
}
	heap32[(g0)] = r6;
	heap32[(g0+1)] = 3;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = 12;
	heap32[(g0+4)] = r2;
	r0 = (r4 - r0)|0;
	_ZN12mandreel_b64L11b64_encode_EPKhjPcjjPNS_6B64_RCE(i7);
	r4 = 61;
_25: while(true){
	r2 = (r0 + -1)|0;
	r0 = (r3 - r0)|0;
	heap8[r0+4] = r4;
	r0 = r2;
	if(r2 !=0) //_LBB805_19
{
continue _25;
}
else{
break _1;
}
}
}
else{
	heap32[(g0)] = r6;
	heap32[(g0+1)] = 3;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = 12;
	heap32[(g0+4)] = r2;
	_ZN12mandreel_b64L11b64_encode_EPKhjPcjjPNS_6B64_RCE(i7);
	r_g0 = r1;
	return;
}
}
}
else{
	heap32[(r4)] = 1;
	r0 = 0;
	r_g0 = r0;
	return;
}
}
} while(0);
	r_g0 = r1;
	return;
}