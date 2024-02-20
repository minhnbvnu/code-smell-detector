function __truncdfsf2(sp)
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
	var f0;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = sp + 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = r0 & 2147483647;
	r2 = heap32[(fp)];
	r3 = (r1 + -940572672)|0;
	r4 = (r1 + -1206910976)|0;
_1: do {
	if(uint(r3) >=uint(r4)) //_LBB846_6
{
	r3 = 0;
	r4 = 2146435072;
	r5 = r2 == r3;
	r4 = uint(r1) < uint(r4);
	r4 = r1 == 2146435072 ? r5 : r4;
	if(r4 != 0) //_LBB846_8
{
	r4 = 1206910976;
	r4 = uint(r1) < uint(r4);
	r4 = r1 == 1206910976 ? r5 : r4;
	if(r4 != 0) //_LBB846_10
{
	r4 = 897;
	r1 = r1 >>> 20;
	r1 = (r4 - r1)|0;
	if(r1 <53) //_LBB846_12
{
	r4 = r0 & 1048575;
	r4 = r4 | 1048576;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	__lshrdi3(i7);
	r5 = r_g0;
	r6 = r_g1;
	r7 = 64;
	r1 = (r7 - r1)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	__ashldi3(i7);
	r1 = r_g0 | r_g1;
	r1 = r1 != r3;
	r1 = r1 & 1;
	r2 = r5 & 536870911;
	r4 = r5 >>> 29;
	r5 = r6 << 3;
	r1 = r1 | r2;
	r2 = r4 | r5;
	if(uint(r1) <uint(268435457)) //_LBB846_14
{
	r1 = r1 ^ 268435456;
	r3 = r1 | r3;
	if(r3 ==0) //_LBB846_16
{
	r3 = r2 & 1;
	r3 = (r3 + r2)|0;
}
else{
	r3 = r2;
}
}
else{
	r3 = (r2 + 1)|0;
}
}
else{
break _1;
}
}
else{
	r3 = 2139095040;
}
}
else{
	r1 = r2 & 4194303;
	r3 = r1 | 2143289344;
}
}
else{
	r1 = r2 >>> 29;
	r3 = r0 << 3;
	r1 = r1 | r3;
	r2 = r2 & 536870911;
	if(uint(r2) <uint(268435457)) //_LBB846_3
{
	r3 = (r1 + 1073741824)|0;
	r1 = 0;
	r2 = r2 ^ 268435456;
	r1 = r2 | r1;
	if(r1 ==0) //_LBB846_5
{
	r1 = r3 & 1;
	r3 = (r1 + r3)|0;
}
}
else{
	r3 = (r1 + 1073741825)|0;
}
}
} while(0);
	r0 = r0 & -2147483648;
	r0 = r3 | r0;
	heap32[(fp+-1)] = r0;
	f0 = heapFloat[(fp+-1)];
	f_g0 = f0;
	return;
}