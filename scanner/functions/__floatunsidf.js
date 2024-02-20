function __floatunsidf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	if(r0 !=0) //_LBB845_2
{
	r1 = r0 >>> 1;
	r1 = r0 | r1;
	r2 = r1 >>> 2;
	r1 = r1 | r2;
	r2 = r1 >>> 4;
	r1 = r1 | r2;
	r2 = r1 >>> 8;
	r1 = r1 | r2;
	r2 = r1 >>> 16;
	r1 = r1 | r2;
	r2 = r1 ^ -1;
	r3 = 1431655765;
	r2 = r2 >>> 1;
	r1 = r3 & (~r1);
	r2 = r2 & 1431655765;
	r1 = (r1 + r2)|0;
	r2 = r1 >>> 2;
	r1 = r1 & 858993459;
	r2 = r2 & 858993459;
	r1 = (r1 + r2)|0;
	r2 = r1 >>> 4;
	r1 = r1 & 252645135;
	r2 = r2 & 252645135;
	r1 = (r1 + r2)|0;
	r2 = r1 >>> 8;
	r1 = r1 & 16711935;
	r2 = r2 & 16711935;
	r1 = (r1 + r2)|0;
	r2 = r1 & 65535;
	r1 = r1 >>> 16;
	r3 = 31;
	r1 = (r2 + r1)|0;
	r2 = 52;
	r3 = (r3 - r1)|0;
	r2 = (r2 - r3)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r2;
	r0 = 1054;
	__ashldi3(i7);
	r0 = (r0 - r1)|0;
	r1 = sp + -8;
	r3 = r_g1 ^ 1048576;
	r0 = r0 << 20;
	r1 = r1 >> 2;
	r0 = (r3 + r0)|0;
	heap32[(fp+-2)] = r_g0;
	heap32[(r1+1)] = r0;
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