function tlsf_free(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
if(!(r0 ==0)) //_LBB724_15
{
	r1 = heap32[(fp)];
	r2 = r0 >> 2;
	r3 = heap32[(r2+-1)];
	r4 = s_current_memory;
	r5 = (r3 + -4)|0;
	r4 = r4 >> 2;
	r5 = r5 & -4;
	r6 = heap32[(r4)];
	r3 = r3 & -4;
	r5 = (r0 + r5)|0;
	r3 = (r6 - r3)|0;
	r0 = (r0 + -8)|0;
	r5 = r5 >> 2;
	heap32[(r4)] = r3;
	heap32[(r5)] = r0;
	r3 = heap32[(r5+1)];
	r3 = r3 | 2;
	heap32[(r5+1)] = r3;
	r3 = heap32[(r2+-1)];
	r4 = r3 | 1;
	heap32[(r2+-1)] = r4;
	r3 = r3 & 2;
	if(r3 !=0) //_LBB724_3
{
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	r3 = r0 >> 2;
	r4 = heap32[(r3+1)];
	r5 = r4 & -4;
	if(uint(r5) >uint(255)) //_LBB724_5
{
	r4 = r5 >>> 1;
	r4 = r5 | r4;
	r6 = r4 >>> 2;
	r4 = r4 | r6;
	r6 = r4 >>> 4;
	r4 = r4 | r6;
	r6 = r4 >>> 8;
	r4 = r4 | r6;
	r6 = r4 >>> 16;
	r4 = r4 | r6;
	r6 = r4 ^ -1;
	r7 = 1431655765;
	r6 = r6 >>> 1;
	r4 = r7 & (~r4);
	r6 = r6 & 1431655765;
	r4 = (r4 + r6)|0;
	r6 = r4 >>> 2;
	r4 = r4 & 858993459;
	r6 = r6 & 858993459;
	r4 = (r4 + r6)|0;
	r6 = r4 >>> 4;
	r4 = r4 & 252645135;
	r6 = r6 & 252645135;
	r4 = (r4 + r6)|0;
	r6 = r4 >>> 8;
	r4 = r4 & 16711935;
	r6 = r6 & 16711935;
	r4 = (r4 + r6)|0;
	r6 = r4 & 65535;
	r4 = r4 >>> 16;
	r7 = 26;
	r4 = (r6 + r4)|0;
	r6 = (r7 - r4)|0;
	r5 = r5 >>> r6;
	r6 = 24;
	r5 = r5 ^ 32;
	r4 = (r6 - r4)|0;
}
else{
	r5 = r4 >>> 3;
	r4 = 0;
}
	r6 = r4 << 7;
	r7 = heap32[(r3+2)];
	r8 = heap32[(r3+3)];
	r6 = (r1 + r6)|0;
	r9 = r5 << 2;
	r6 = (r6 + r9)|0;
	r9 = r7 >> 2;
	r10 = r8 >> 2;
	heap32[(r9+3)] = r8;
	r8 = r6 >> 2;
	heap32[(r10+2)] = r7;
	r8 = heap32[(r8+24)];
if(!(r8 !=r0)) //_LBB724_10
{
	r6 = (r6 + 96)|0;
	r6 = r6 >> 2;
	r8 = block_null;
	heap32[(r6)] = r7;
if(!(r7 !=r8)) //_LBB724_10
{
	r6 = r4 << 2;
	r6 = (r1 + r6)|0;
	r6 = r6 >> 2;
	r7 = 1;
	r5 = r7 << r5;
	r8 = heap32[(r6+1)];
	r5 = r8 & (~r5);
	heap32[(r6+1)] = r5;
if(!(r5 !=0)) //_LBB724_10
{
	r5 = r1 >> 2;
	r4 = r7 << r4;
	r6 = heap32[(r5)];
	r4 = r6 & (~r4);
	heap32[(r5)] = r4;
}
}
}
	r4 = (r0 + 8)|0;
	r2 = heap32[(r2+-1)];
	r5 = heap32[(r3+1)];
	r2 = r2 & -4;
	r2 = (r2 + r5)|0;
	r5 = r2 & -4;
	r4 = (r4 + r5)|0;
	r2 = (r2 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r3+1)] = r2;
	heap32[(r4)] = r0;
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	block_merge_next(i7);
	r0 = r_g0;
	r2 = r0 >> 2;
	r2 = heap32[(r2+1)];
	r3 = r2 & -4;
	if(uint(r3) >uint(255)) //_LBB724_13
{
	r2 = r3 >>> 1;
	r2 = r3 | r2;
	r4 = r2 >>> 2;
	r2 = r2 | r4;
	r4 = r2 >>> 4;
	r2 = r2 | r4;
	r4 = r2 >>> 8;
	r2 = r2 | r4;
	r4 = r2 >>> 16;
	r2 = r2 | r4;
	r4 = r2 ^ -1;
	r5 = 1431655765;
	r4 = r4 >>> 1;
	r2 = r5 & (~r2);
	r4 = r4 & 1431655765;
	r2 = (r2 + r4)|0;
	r4 = r2 >>> 2;
	r2 = r2 & 858993459;
	r4 = r4 & 858993459;
	r2 = (r2 + r4)|0;
	r4 = r2 >>> 4;
	r2 = r2 & 252645135;
	r4 = r4 & 252645135;
	r2 = (r2 + r4)|0;
	r4 = r2 >>> 8;
	r2 = r2 & 16711935;
	r4 = r4 & 16711935;
	r2 = (r2 + r4)|0;
	r4 = r2 & 65535;
	r2 = r2 >>> 16;
	r5 = 26;
	r2 = (r4 + r2)|0;
	r4 = (r5 - r2)|0;
	r3 = r3 >>> r4;
	r4 = 24;
	r3 = r3 ^ 32;
	r2 = (r4 - r2)|0;
}
else{
	r3 = r2 >>> 3;
	r2 = 0;
}
	r4 = r2 << 7;
	r4 = (r1 + r4)|0;
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r5 = heap32[(r4+24)];
	r6 = r0 >> 2;
	r7 = block_null;
	heap32[(r6+2)] = r5;
	r5 = r5 >> 2;
	heap32[(r6+3)] = r7;
	heap32[(r5+3)] = r0;
	r5 = 1;
	r6 = r1 >> 2;
	heap32[(r4+24)] = r0;
	r0 = r2 << 2;
	r2 = r5 << r2;
	r4 = heap32[(r6)];
	r0 = (r1 + r0)|0;
	r1 = r4 | r2;
	r0 = r0 >> 2;
	heap32[(r6)] = r1;
	r1 = r5 << r3;
	r2 = heap32[(r0+1)];
	r1 = r2 | r1;
	heap32[(r0+1)] = r1;
}
	return;
}