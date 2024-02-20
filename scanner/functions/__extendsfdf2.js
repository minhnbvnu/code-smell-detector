function __extendsfdf2(sp)
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
	r1 = r0 & 2147483647;
	r2 = r0 & -2147483648;
	r3 = (r1 + -8388608)|0;
	if(uint(r3) >uint(2130706431)) //_LBB842_2
{
	if(uint(r1) <uint(2139095040)) //_LBB842_4
{
	if(r1 !=0) //_LBB842_6
{
	r0 = r1 >>> 1;
	r0 = r1 | r0;
	r3 = r0 >>> 2;
	r0 = r0 | r3;
	r3 = r0 >>> 4;
	r0 = r0 | r3;
	r3 = r0 >>> 8;
	r0 = r0 | r3;
	r3 = r0 >>> 16;
	r0 = r0 | r3;
	r3 = r0 ^ -1;
	r4 = 1431655765;
	r3 = r3 >>> 1;
	r0 = r4 & (~r0);
	r3 = r3 & 1431655765;
	r0 = (r0 + r3)|0;
	r3 = r0 >>> 2;
	r0 = r0 & 858993459;
	r3 = r3 & 858993459;
	r0 = (r0 + r3)|0;
	r3 = r0 >>> 4;
	r0 = r0 & 252645135;
	r3 = r3 & 252645135;
	r0 = (r0 + r3)|0;
	r3 = r0 >>> 8;
	r0 = r0 & 16711935;
	r3 = r3 & 16711935;
	r0 = (r0 + r3)|0;
	r3 = r0 & 65535;
	r0 = r0 >>> 16;
	r0 = (r3 + r0)|0;
	r3 = (r0 + 21)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r3;
	r3 = 905;
	__ashldi3(i7);
	r1 = r_g0;
	r0 = (r3 - r0)|0;
	r3 = r_g1 ^ 1048576;
	r0 = r0 << 20;
	r0 = r3 | r0;
}
else{
	r1 = 0;
	r0 = r1;
}
}
else{
	r1 = r0 >>> 3;
	r3 = r1 & 524288;
	r1 = r0 & 4194303;
	r0 = r3 | 2146435072;
}
}
else{
	r0 = r1 >>> 3;
	r1 = r1 << 29;
	r0 = (r0 + 939524096)|0;
}
	r3 = sp + -8;
	r3 = r3 >> 2;
	r0 = r0 | r2;
	heap32[(fp+-2)] = r1;
	heap32[(r3+1)] = r0;
	f0 = llvm_readDouble((sp+-8));
	f_g0 = f0;
	return;
}