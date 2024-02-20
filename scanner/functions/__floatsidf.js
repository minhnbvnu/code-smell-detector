function __floatsidf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	if(r0 !=0) //_LBB844_2
{
	r1 = r0 >> 31;
	r2 = (r0 + r1)|0;
	r1 = r2 ^ r1;
	r2 = r1 >>> 1;
	r2 = r1 | r2;
	r3 = r2 >>> 2;
	r2 = r2 | r3;
	r3 = r2 >>> 4;
	r2 = r2 | r3;
	r3 = r2 >>> 8;
	r2 = r2 | r3;
	r3 = r2 >>> 16;
	r2 = r2 | r3;
	r3 = r2 ^ -1;
	r4 = 1431655765;
	r3 = r3 >>> 1;
	r2 = r4 & (~r2);
	r3 = r3 & 1431655765;
	r2 = (r2 + r3)|0;
	r3 = r2 >>> 2;
	r2 = r2 & 858993459;
	r3 = r3 & 858993459;
	r2 = (r2 + r3)|0;
	r3 = r2 >>> 4;
	r2 = r2 & 252645135;
	r3 = r3 & 252645135;
	r2 = (r2 + r3)|0;
	r3 = r2 >>> 8;
	r2 = r2 & 16711935;
	r3 = r3 & 16711935;
	r2 = (r2 + r3)|0;
	r3 = r2 & 65535;
	r2 = r2 >>> 16;
	r4 = 31;
	r2 = (r3 + r2)|0;
	r3 = 52;
	r4 = (r4 - r2)|0;
	r3 = (r3 - r4)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r3;
	r1 = 1054;
	__ashldi3(i7);
	r1 = (r1 - r2)|0;
	r2 = r_g1 ^ 1048576;
	r1 = r1 << 20;
	r4 = sp + -8;
	r1 = (r2 + r1)|0;
	r0 = r0 & -2147483648;
	r2 = r4 >> 2;
	r0 = r1 | r0;
	heap32[(fp+-2)] = r_g0;
	heap32[(r2+1)] = r0;
	f0 = llvm_readDouble((sp+-8));
	f_g0 = f0;
	return;
}
else{
	f0 =                         0;
	f_g0 = f0;
	return;
}
}