function block_merge_next(sp)
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
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r2 = (r2 + -4)|0;
	r2 = r2 & -4;
	r3 = (r0 + 8)|0;
	r4 = (r2 + 4)|0;
	r4 = (r3 + r4)|0;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r6 = r5 & 1;
if(!(r6 ==0)) //_LBB723_9
{
	r6 = heap32[(fp)];
	r7 = (r3 + r2)|0;
	r8 = r5 & -4;
	if(uint(r8) >uint(255)) //_LBB723_3
{
	r5 = r8 >>> 1;
	r5 = r8 | r5;
	r9 = r5 >>> 2;
	r5 = r5 | r9;
	r9 = r5 >>> 4;
	r5 = r5 | r9;
	r9 = r5 >>> 8;
	r5 = r5 | r9;
	r9 = r5 >>> 16;
	r5 = r5 | r9;
	r9 = r5 ^ -1;
	r10 = 1431655765;
	r9 = r9 >>> 1;
	r5 = r10 & (~r5);
	r9 = r9 & 1431655765;
	r5 = (r5 + r9)|0;
	r9 = r5 >>> 2;
	r5 = r5 & 858993459;
	r9 = r9 & 858993459;
	r5 = (r5 + r9)|0;
	r9 = r5 >>> 4;
	r5 = r5 & 252645135;
	r9 = r9 & 252645135;
	r5 = (r5 + r9)|0;
	r9 = r5 >>> 8;
	r5 = r5 & 16711935;
	r9 = r9 & 16711935;
	r5 = (r5 + r9)|0;
	r9 = r5 & 65535;
	r5 = r5 >>> 16;
	r10 = 26;
	r5 = (r9 + r5)|0;
	r9 = (r10 - r5)|0;
	r8 = r8 >>> r9;
	r9 = 24;
	r8 = r8 ^ 32;
	r5 = (r9 - r5)|0;
}
else{
	r8 = r5 >>> 3;
	r5 = 0;
}
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r9 = r5 << 7;
	r10 = heap32[(r2+2)];
	r2 = heap32[(r2+3)];
	r9 = (r6 + r9)|0;
	r11 = r8 << 2;
	r9 = (r9 + r11)|0;
	r11 = r10 >> 2;
	r12 = r2 >> 2;
	heap32[(r11+3)] = r2;
	r2 = r9 >> 2;
	heap32[(r12+2)] = r10;
	r2 = heap32[(r2+24)];
if(!(r2 !=r7)) //_LBB723_8
{
	r2 = (r9 + 96)|0;
	r2 = r2 >> 2;
	r7 = block_null;
	heap32[(r2)] = r10;
if(!(r10 !=r7)) //_LBB723_8
{
	r2 = r5 << 2;
	r2 = (r6 + r2)|0;
	r2 = r2 >> 2;
	r7 = 1;
	r8 = r7 << r8;
	r9 = heap32[(r2+1)];
	r8 = r9 & (~r8);
	heap32[(r2+1)] = r8;
if(!(r8 !=0)) //_LBB723_8
{
	r2 = r6 >> 2;
	r5 = r7 << r5;
	r6 = heap32[(r2)];
	r5 = r6 & (~r5);
	heap32[(r2)] = r5;
}
}
}
	r2 = heap32[(r4)];
	r4 = heap32[(r1+1)];
	r2 = r2 & -4;
	r2 = (r2 + r4)|0;
	r4 = r2 & -4;
	r3 = (r3 + r4)|0;
	r2 = (r2 + 4)|0;
	r3 = r3 >> 2;
	heap32[(r1+1)] = r2;
	heap32[(r3)] = r0;
}
	r_g0 = r0;
	return;
}