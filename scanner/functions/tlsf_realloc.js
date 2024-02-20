function tlsf_realloc(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+2)];
if(!(r0 ==0)) //_LBB728_3
{
if(!(r2 !=0)) //_LBB728_3
{
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	tlsf_free(i7);
	r0 = 0;
	r_g0 = r0;
	return;
}
}
	if(r0 !=0) //_LBB728_10
{
	r3 = r0 >> 2;
	r4 = heap32[(r3+-1)];
	r5 = r4 & -4;
	r6 = (r0 + r5)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	r7 = r6 & -4;
	r7 = (r5 + r7)|0;
	r8 = (r2 + -1)|0;
	r9 = (r0 + -8)|0;
	r7 = (r7 + 4)|0;
	if(uint(r8) <uint(1073741823)) //_LBB728_12
{
	r10 = (r2 + 7)|0;
	r10 = r10 & -8;
	r11 = 12;
	r10 = uint(r10) < uint(r11) ? r11 : r10;
}
else{
	r10 = 0;
}
_11: do {
	if(uint(r10) >uint(r5)) //_LBB728_15
{
	r4 = r6 & 1;
if(!(r4 ==0)) //_LBB728_17
{
	if(uint(r10) <=uint(r7)) //_LBB728_24
{
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r9;
	block_merge_next(i7);
	r4 = heap32[(r3+-1)];
	r4 = r4 & -4;
	r4 = (r0 + r4)|0;
	r4 = r4 >> 2;
	r9 = heap32[(r4)];
	r9 = r9 & -3;
	heap32[(r4)] = r9;
	r4 = heap32[(r3+-1)];
	r4 = r4 & -2;
	heap32[(r3+-1)] = r4;
break _11;
}
}
	if(uint(r8) <uint(1073741823)) //_LBB728_19
{
	r3 = (r2 + 7)|0;
	r3 = r3 & -8;
	r4 = 12;
	r3 = uint(r3) < uint(r4) ? r4 : r3;
}
else{
	r3 = 0;
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	block_locate_free(i7);
	r4 = r_g0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r3;
	r3 = s_current_memory;
	block_prepare_used(i7);
	r9 = r_g0;
	r4 = r4 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r4+1)];
	r10 = heap32[(r3)];
	r4 = r4 & -4;
	r4 = (r10 + r4)|0;
	r10 = s_max_memory;
	r10 = r10 >> 2;
	heap32[(r3)] = r4;
	r3 = heap32[(r10)];
if(!(uint(r4) <=uint(r3))) //_LBB728_22
{
	heap32[(r10)] = r4;
}
	if(r9 ==0) //_LBB728_34
{
	r_g0 = r9;
	return;
}
else{
	r3 = uint(r5) >= uint(r2) ? r2 : r5;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r3;
	memcpy(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	tlsf_free(i7);
	r_g0 = r9;
	return;
}
}
} while(0);
	r9 = s_current_memory;
	r9 = r9 >> 2;
	r2 = heap32[(r9)];
	r2 = (r2 - r5)|0;
	r5 = r4 & -4;
	heap32[(r9)] = r2;
	r6 = (r10 + 16)|0;
	if(uint(r5) >=uint(r6)) //_LBB728_27
{
	r4 = (r0 + r10)|0;
	r6 = r4 >> 2;
	r7 = -4;
	r8 = heap32[(r6)];
	r7 = (r7 - r10)|0;
	r8 = r8 & 3;
	r5 = (r7 + r5)|0;
	r5 = r8 | r5;
	heap32[(r6)] = r5;
	r5 = heap32[(r3+-1)];
	r5 = r5 & 3;
	r5 = r5 | r10;
	heap32[(r3+-1)] = r5;
	r5 = heap32[(r6)];
	r5 = (r5 + -4)|0;
	r5 = r5 & -4;
	r5 = (r10 + r5)|0;
	r5 = (r5 + r0)|0;
	r4 = (r4 + -4)|0;
	r5 = r5 >> 2;
	heap32[(r5+1)] = r4;
	r7 = heap32[(r5+2)];
	r7 = r7 | 2;
	heap32[(r5+2)] = r7;
	r5 = heap32[(r6)];
	r5 = r5 | 1;
	r5 = r5 & -3;
	heap32[(r6)] = r5;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	block_merge_next(i7);
	r4 = r_g0;
	r5 = r4 >> 2;
	r5 = heap32[(r5+1)];
	r6 = r5 & -4;
	if(uint(r6) >uint(255)) //_LBB728_29
{
	r5 = r6 >>> 1;
	r5 = r6 | r5;
	r7 = r5 >>> 2;
	r5 = r5 | r7;
	r7 = r5 >>> 4;
	r5 = r5 | r7;
	r7 = r5 >>> 8;
	r5 = r5 | r7;
	r7 = r5 >>> 16;
	r5 = r5 | r7;
	r7 = r5 ^ -1;
	r8 = 1431655765;
	r7 = r7 >>> 1;
	r5 = r8 & (~r5);
	r7 = r7 & 1431655765;
	r5 = (r5 + r7)|0;
	r7 = r5 >>> 2;
	r5 = r5 & 858993459;
	r7 = r7 & 858993459;
	r5 = (r5 + r7)|0;
	r7 = r5 >>> 4;
	r5 = r5 & 252645135;
	r7 = r7 & 252645135;
	r5 = (r5 + r7)|0;
	r7 = r5 >>> 8;
	r5 = r5 & 16711935;
	r7 = r7 & 16711935;
	r5 = (r5 + r7)|0;
	r7 = r5 & 65535;
	r5 = r5 >>> 16;
	r8 = 26;
	r5 = (r7 + r5)|0;
	r7 = (r8 - r5)|0;
	r6 = r6 >>> r7;
	r7 = 24;
	r6 = r6 ^ 32;
	r5 = (r7 - r5)|0;
}
else{
	r6 = r5 >>> 3;
	r5 = 0;
}
	r7 = r5 << 7;
	r7 = (r1 + r7)|0;
	r8 = r6 << 2;
	r7 = (r7 + r8)|0;
	r7 = r7 >> 2;
	r8 = heap32[(r7+24)];
	r10 = r4 >> 2;
	r11 = block_null;
	heap32[(r10+2)] = r8;
	r8 = r8 >> 2;
	heap32[(r10+3)] = r11;
	heap32[(r8+3)] = r4;
	r8 = 1;
	r10 = r1 >> 2;
	heap32[(r7+24)] = r4;
	r4 = r5 << 2;
	r5 = r8 << r5;
	r7 = heap32[(r10)];
	r4 = (r1 + r4)|0;
	r1 = r7 | r5;
	r4 = r4 >> 2;
	heap32[(r10)] = r1;
	r1 = r8 << r6;
	r5 = heap32[(r4+1)];
	r1 = r5 | r1;
	heap32[(r4+1)] = r1;
	r4 = heap32[(r3+-1)];
}
	r1 = r4 & -4;
	r1 = (r2 + r1)|0;
	r2 = s_max_memory;
	r2 = r2 >> 2;
	heap32[(r9)] = r1;
	r9 = heap32[(r2)];
if(!(uint(r1) <=uint(r9))) //_LBB728_33
{
	heap32[(r2)] = r1;
}
	r_g0 = r0;
	return;
}
else{
	r0 = (r2 + -1)|0;
	if(uint(r0) <uint(1073741823)) //_LBB728_6
{
	r0 = (r2 + 7)|0;
	r0 = r0 & -8;
	r2 = 12;
	r0 = uint(r0) < uint(r2) ? r2 : r0;
}
else{
	r0 = 0;
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	block_locate_free(i7);
	r2 = r_g0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r0;
	r0 = s_current_memory;
	block_prepare_used(i7);
	r1 = r_g0;
	r2 = r2 >> 2;
	r0 = r0 >> 2;
	r2 = heap32[(r2+1)];
	r3 = heap32[(r0)];
	r2 = r2 & -4;
	r2 = (r3 + r2)|0;
	r3 = s_max_memory;
	r3 = r3 >> 2;
	heap32[(r0)] = r2;
	r0 = heap32[(r3)];
if(!(uint(r2) <=uint(r0))) //_LBB728_9
{
	heap32[(r3)] = r2;
}
	r_g0 = r1;
	return;
}
}