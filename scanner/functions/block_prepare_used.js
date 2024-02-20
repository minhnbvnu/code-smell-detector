function block_prepare_used(sp)
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
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	if(r0 ==0) //_LBB725_8
{
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	r1 = heap32[(fp+2)];
	r2 = r0 >> 2;
	r3 = heap32[(r2+1)];
	r4 = r3 & -4;
	r5 = (r1 + 16)|0;
	if(uint(r4) >=uint(r5)) //_LBB725_3
{
	r3 = heap32[(fp)];
	r5 = (r0 + 8)|0;
	r6 = (r5 + r1)|0;
	r7 = r6 >> 2;
	r8 = -4;
	r9 = heap32[(r7)];
	r8 = (r8 - r1)|0;
	r9 = r9 & 3;
	r4 = (r8 + r4)|0;
	r4 = r9 | r4;
	heap32[(r7)] = r4;
	r4 = heap32[(r2+1)];
	r4 = r4 & 3;
	r4 = r4 | r1;
	heap32[(r2+1)] = r4;
	r4 = heap32[(r7)];
	r4 = (r4 + -4)|0;
	r8 = (r1 + 4)|0;
	r4 = r4 & -4;
	r1 = (r1 + 8)|0;
	r9 = (r4 + r8)|0;
	r4 = (r4 + r1)|0;
	r9 = (r5 + r9)|0;
	r4 = (r5 + r4)|0;
	r6 = (r6 + -4)|0;
	r9 = r9 >> 2;
	r4 = r4 >> 2;
	heap32[(r9)] = r6;
	r9 = heap32[(r4)];
	r9 = r9 | 2;
	heap32[(r4)] = r9;
	r4 = heap32[(r7)];
	r4 = r4 | 1;
	heap32[(r7)] = r4;
	r4 = heap32[(r2+1)];
	r4 = (r4 + -4)|0;
	r4 = r4 & -4;
	r4 = (r5 + r4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r0;
	r4 = heap32[(r7)];
	r9 = r4 & -4;
	r10 = r4 | 2;
	heap32[(r7)] = r10;
	if(uint(r9) >uint(255)) //_LBB725_5
{
	r4 = r9 >>> 1;
	r4 = r9 | r4;
	r7 = r4 >>> 2;
	r4 = r4 | r7;
	r7 = r4 >>> 4;
	r4 = r4 | r7;
	r7 = r4 >>> 8;
	r4 = r4 | r7;
	r7 = r4 >>> 16;
	r4 = r4 | r7;
	r7 = r4 ^ -1;
	r10 = 1431655765;
	r7 = r7 >>> 1;
	r4 = r10 & (~r4);
	r7 = r7 & 1431655765;
	r4 = (r4 + r7)|0;
	r7 = r4 >>> 2;
	r4 = r4 & 858993459;
	r7 = r7 & 858993459;
	r4 = (r4 + r7)|0;
	r7 = r4 >>> 4;
	r4 = r4 & 252645135;
	r7 = r7 & 252645135;
	r4 = (r4 + r7)|0;
	r7 = r4 >>> 8;
	r4 = r4 & 16711935;
	r7 = r7 & 16711935;
	r4 = (r4 + r7)|0;
	r7 = r4 & 65535;
	r4 = r4 >>> 16;
	r10 = 26;
	r4 = (r7 + r4)|0;
	r7 = (r10 - r4)|0;
	r9 = r9 >>> r7;
	r7 = 24;
	r9 = r9 ^ 32;
	r4 = (r7 - r4)|0;
}
else{
	r9 = r4 >>> 3;
	r4 = 0;
}
	r7 = r4 << 7;
	r7 = (r3 + r7)|0;
	r10 = r9 << 2;
	r7 = (r7 + r10)|0;
	r7 = r7 >> 2;
	r8 = (r5 + r8)|0;
	r1 = (r5 + r1)|0;
	r5 = heap32[(r7+24)];
	r8 = r8 >> 2;
	r1 = r1 >> 2;
	r10 = block_null;
	heap32[(r8)] = r5;
	r5 = r5 >> 2;
	heap32[(r1)] = r10;
	heap32[(r5+3)] = r6;
	r1 = 1;
	r5 = r3 >> 2;
	heap32[(r7+24)] = r6;
	r6 = r4 << 2;
	r4 = r1 << r4;
	r7 = heap32[(r5)];
	r3 = (r3 + r6)|0;
	r4 = r7 | r4;
	r3 = r3 >> 2;
	heap32[(r5)] = r4;
	r1 = r1 << r9;
	r4 = heap32[(r3+1)];
	r1 = r4 | r1;
	heap32[(r3+1)] = r1;
	r3 = heap32[(r2+1)];
}
	r1 = r3 & -4;
	r0 = (r0 + 8)|0;
	r1 = (r0 + r1)|0;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = r3 & -3;
	heap32[(r1)] = r3;
	r1 = heap32[(r2+1)];
	r1 = r1 & -2;
	heap32[(r2+1)] = r1;
	r_g0 = r0;
	return;
}
}