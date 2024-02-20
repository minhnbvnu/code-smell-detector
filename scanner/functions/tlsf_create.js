function tlsf_create(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = (r0 + -3048)|0;
	r1 = r0 & -8;
	r2 = (r1 + -12)|0;
	if(uint(r2) <uint(1073741813)) //_LBB729_2
{
	r2 = heap32[(fp)];
	r3 = block_null;
	r4 = r3 >> 2;
	heap32[(r4+2)] = r3;
	r5 = -1;
	r6 = r2 >> 2;
	heap32[(r4+3)] = r3;
	heap32[(r6)] = 0;
_3: while(true){
	r4 = r5 << 2;
	r7 = r5 << 7;
	r4 = (r2 - r4)|0;
	r7 = (r2 - r7)|0;
	r4 = r4 >> 2;
	r7 = r7 >> 2;
	heap32[(r4)] = 0;
	heap32[(r7+-8)] = r3;
	heap32[(r7+-7)] = r3;
	heap32[(r7+-6)] = r3;
	heap32[(r7+-5)] = r3;
	heap32[(r7+-4)] = r3;
	heap32[(r7+-3)] = r3;
	heap32[(r7+-2)] = r3;
	heap32[(r7+-1)] = r3;
	heap32[(r7)] = r3;
	heap32[(r7+1)] = r3;
	heap32[(r7+2)] = r3;
	heap32[(r7+3)] = r3;
	heap32[(r7+4)] = r3;
	heap32[(r7+5)] = r3;
	heap32[(r7+6)] = r3;
	heap32[(r7+7)] = r3;
	heap32[(r7+8)] = r3;
	heap32[(r7+9)] = r3;
	heap32[(r7+10)] = r3;
	heap32[(r7+11)] = r3;
	heap32[(r7+12)] = r3;
	heap32[(r7+13)] = r3;
	heap32[(r7+14)] = r3;
	heap32[(r7+15)] = r3;
	heap32[(r7+16)] = r3;
	heap32[(r7+17)] = r3;
	heap32[(r7+18)] = r3;
	heap32[(r7+19)] = r3;
	heap32[(r7+20)] = r3;
	heap32[(r7+21)] = r3;
	r5 = (r5 + -1)|0;
	heap32[(r7+22)] = r3;
	heap32[(r7+23)] = r3;
if(!(r5 !=-24)) //_LBB729_3
{
break _3;
}
}
	r4 = r0 | 1;
	r5 = (r2 + 3036)|0;
	r4 = r4 & -7;
	heap32[(r6+760)] = r4;
	if(uint(r1) >uint(255)) //_LBB729_6
{
	r0 = r1 >>> 1;
	r0 = r1 | r0;
	r4 = r0 >>> 2;
	r0 = r0 | r4;
	r4 = r0 >>> 4;
	r0 = r0 | r4;
	r4 = r0 >>> 8;
	r0 = r0 | r4;
	r4 = r0 >>> 16;
	r0 = r0 | r4;
	r4 = r0 ^ -1;
	r7 = 1431655765;
	r4 = r4 >>> 1;
	r0 = r7 & (~r0);
	r4 = r4 & 1431655765;
	r0 = (r0 + r4)|0;
	r4 = r0 >>> 2;
	r0 = r0 & 858993459;
	r4 = r4 & 858993459;
	r0 = (r0 + r4)|0;
	r4 = r0 >>> 4;
	r0 = r0 & 252645135;
	r4 = r4 & 252645135;
	r0 = (r0 + r4)|0;
	r4 = r0 >>> 8;
	r0 = r0 & 16711935;
	r4 = r4 & 16711935;
	r0 = (r0 + r4)|0;
	r4 = r0 & 65535;
	r0 = r0 >>> 16;
	r7 = 26;
	r0 = (r4 + r0)|0;
	r4 = (r7 - r0)|0;
	r1 = r1 >>> r4;
	r4 = 24;
	r1 = r1 ^ 32;
	r0 = (r4 - r0)|0;
}
else{
	r1 = r0 >>> 3;
	r0 = 0;
}
	r4 = r0 << 7;
	r4 = (r2 + r4)|0;
	r7 = r1 << 2;
	r4 = (r4 + r7)|0;
	r4 = r4 >> 2;
	r7 = heap32[(r4+24)];
	heap32[(r6+761)] = r7;
	r7 = r7 >> 2;
	heap32[(r6+762)] = r3;
	heap32[(r7+3)] = r5;
	r3 = 1;
	heap32[(r4+24)] = r5;
	r4 = r0 << 2;
	r0 = r3 << r0;
	r7 = heap32[(r6)];
	r4 = (r2 + r4)|0;
	r0 = r7 | r0;
	r4 = r4 >> 2;
	heap32[(r6)] = r0;
	r0 = r3 << r1;
	r1 = heap32[(r4+1)];
	r0 = r1 | r0;
	heap32[(r4+1)] = r0;
	r0 = heap32[(r6+760)];
	r0 = (r0 + 3040)|0;
	r0 = r0 & -4;
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r5;
	heap32[(r0+1)] = 2;
	r_g0 = r2;
	return;
}
else{
	r0 = _2E_str643;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 3060;
	heap32[(g0+2)] = 1073744872;
	printf(i7);
	r0 = 0;
	r_g0 = r0;
	return;
}
}