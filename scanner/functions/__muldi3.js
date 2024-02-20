function __muldi3(sp)
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
	var r13;
	var r14;
	var r15;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	if(r0 <0) //_LBB746_2
{
	r5 = 0;
	r4 = 1;
	r0 = (r5 - r0)|0;
	r6 = r1 != 0 ? r4 : r5;
	r1 = (r5 - r1)|0;
	r0 = (r0 - r6)|0;
}
else{
	r4 = 0;
}
	if(r3 <0) //_LBB746_5
{
	r5 = 0;
	r6 = 1;
	r3 = (r5 - r3)|0;
	r6 = r2 != 0 ? r6 : r5;
	r4 = r4 ^ 1;
	r2 = (r5 - r2)|0;
	r3 = (r3 - r6)|0;
}
	r5 = r2 & 65535;
	r6 = r1 & 65535;
	r7 = r3 | r0;
	r8 = (r5 * r6)|0;
	r9 = r2 | r1;
	r9 = r9 >>> 16;
	if(r9 !=0) //_LBB746_8
{
	r9 = r1 >>> 16;
	r10 = r2 >>> 16;
	r11 = (r10 - r5)|0;
	r12 = (r5 - r10)|0;
	r13 = (r6 - r9)|0;
	r14 = (r9 - r6)|0;
	r15 = (r10 * r9)|0;
	r11 = uint(r5) < uint(r10) ? r11 : r12;
	r12 = uint(r9) < uint(r6) ? r13 : r14;
	r11 = (r11 * r12)|0;
	r12 = r15 >>> 16;
	r12 = (r12 + r15)|0;
	r13 = r15 << 16;
	r14 = r11 << 16;
	r6 = uint(r9) < uint(r6);
	r5 = uint(r5) < uint(r10);
	r5 = r6 ^ r5;
	r5 = r5 & 1;
	if(r5 ==0) //_LBB746_10
{
	r5 = (r14 + r13)|0;
	r6 = uint(r5) < uint(r13);
	r11 = r11 >>> 16;
	r11 = (r11 + r12)|0;
	r6 = r6 & 1;
	r11 = (r11 + r6)|0;
}
else{
	r5 = (r13 - r14)|0;
	r11 = r11 >>> 16;
	r14 = -1;
	r6 = 0;
	r11 = (r12 - r11)|0;
	r12 = uint(r5) > uint(r13) ? r14 : r6;
	r11 = (r11 + r12)|0;
}
	r6 = r8 << 16;
	r6 = (r5 + r6)|0;
	r9 = (r6 + r8)|0;
	r5 = uint(r6) < uint(r5);
	r6 = r8 >>> 16;
	r8 = uint(r9) < uint(r8);
	r6 = (r11 + r6)|0;
	r5 = r5 & 1;
	r5 = (r6 + r5)|0;
	r8 = r8 & 1;
	r5 = (r5 + r8)|0;
	r8 = r9;
}
else{
	r5 = 0;
}
	if(r7 !=0) //_LBB746_14
{
	r6 = (r3 - r2)|0;
	r7 = (r2 - r3)|0;
	r9 = (r1 - r0)|0;
	r10 = (r0 - r1)|0;
	r6 = uint(r2) < uint(r3) ? r6 : r7;
	r7 = uint(r0) < uint(r1) ? r9 : r10;
	r1 = uint(r0) < uint(r1);
	r2 = uint(r2) < uint(r3);
	r9 = 0;
	r6 = (r6 * r7)|0;
	r1 = r1 ^ r2;
	r2 = (r9 - r6)|0;
	r1 = r1 != 0 ? r2 : r6;
	r0 = (r3 * r0)|0;
	r0 = (r1 + r0)|0;
	r0 = (r0 + r8)|0;
	r5 = (r0 + r5)|0;
}
	r0 = 0;
	r1 = 1;
	r2 = (r0 - r5)|0;
	r1 = r8 != 0 ? r1 : r0;
	r0 = (r0 - r8)|0;
	r1 = (r2 - r1)|0;
	r0 = r4 == 0 ? r8 : r0;
	r1 = r4 == 0 ? r5 : r1;
	r_g0 = r0;
	r_g1 = r1;
	return;
}