function _ZN12gjkepa2_impl3EPA6expandEjPNS_3GJK3sSVEPNS0_5sFaceEjRNS0_8sHorizonE(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
	r1 = heap32[(fp+1)];
	r2 = heapU8[r0+59];
_1: do {
if(!(r2 ==r1)) //_LBB548_10
{
	r2 = heap32[(fp)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r6 = r0 >> 2;
	r7 = r3 >> 2;
	f0 = heapFloat[(r6)];
	f1 = heapFloat[(r7+4)];
	f2 = heapFloat[(r6+1)];
	f3 = heapFloat[(r7+5)];
	r8 = _ZZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRjE4imd3;
	r9 = r4 << 2;
	r8 = (r8 + r9)|0;
	f0 = f0*f1;
	f1 = f2*f3;
	f2 = heapFloat[(r6+2)];
	f3 = heapFloat[(r7+6)];
	r7 = r8 >> 2;
	f0 = f0+f1;
	f1 = f2*f3;
	r7 = heap32[(r7)];
	f0 = f0+f1;
	f1 = heapFloat[(r6+4)];
	f0 = f0-f1;
	f1 =  -9.9999997473787516e-006;
	if(f0 >=f1) //_LBB548_8
{
	r4 = r7 << 2;
	r4 = (r0 + r4)|0;
	r7 = (r0 + r7)|0;
	heap8[r0+59] = r1;
	r4 = r4 >> 2;
	r7 = heapU8[r7+56];
	r4 = heap32[(r4+9)];
	r8 = _ZZN12gjkepa2_impl3EPA6expandEjPNS_3GJK3sSVEPNS0_5sFaceEjRNS0_8sHorizonEE4i2m3;
	r8 = (r8 + r9)|0;
	r8 = r8 >> 2;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r5;
	r4 = heap32[(r8)];
	_ZN12gjkepa2_impl3EPA6expandEjPNS_3GJK3sSVEPNS0_5sFaceEjRNS0_8sHorizonE(i7);
	r7 = r_g0;
	if(r7 ==0) //_LBB548_10
{
break _1;
}
else{
	r7 = r4 << 2;
	r7 = (r0 + r7)|0;
	r4 = (r0 + r4)|0;
	r7 = r7 >> 2;
	r4 = heapU8[r4+56];
	r7 = heap32[(r7+9)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r5;
	_ZN12gjkepa2_impl3EPA6expandEjPNS_3GJK3sSVEPNS0_5sFaceEjRNS0_8sHorizonE(i7);
	r1 = r_g0;
	if(r1 !=0) //_LBB548_11
{
	r1 = heap32[(r6+13)];
if(!(r1 ==0)) //_LBB548_13
{
	r1 = r1 >> 2;
	r3 = heap32[(r6+12)];
	heap32[(r1+12)] = r3;
}
	r1 = heap32[(r6+12)];
if(!(r1 ==0)) //_LBB548_15
{
	r1 = r1 >> 2;
	r3 = heap32[(r6+13)];
	heap32[(r1+13)] = r3;
}
	r1 = r2 >> 2;
	r2 = heap32[(r1+2448)];
if(!(r2 !=r0)) //_LBB548_17
{
	r2 = heap32[(r6+13)];
	heap32[(r1+2448)] = r2;
}
	r2 = heap32[(r1+2449)];
	r2 = (r2 + -1)|0;
	heap32[(r1+2449)] = r2;
	heap32[(r6+12)] = 0;
	r2 = heap32[(r1+2450)];
	heap32[(r6+13)] = r2;
	r2 = heap32[(r1+2450)];
if(!(r2 ==0)) //_LBB548_19
{
	r2 = r2 >> 2;
	heap32[(r2+12)] = r0;
}
	heap32[(r1+2450)] = r0;
	r0 = heap32[(r1+2451)];
	r0 = (r0 + 1)|0;
	heap32[(r1+2451)] = r0;
}
else{
break _1;
}
}
}
else{
	r1 = (r0 + 24)|0;
	r6 = r7 << 2;
	r7 = (r1 + r9)|0;
	r1 = (r1 + r6)|0;
	r6 = r7 >> 2;
	r1 = r1 >> 2;
	r6 = heap32[(r6)];
	r1 = heap32[(r1)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = 0;
	_ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(i7);
	r1 = r_g0;
	if(r1 ==0) //_LBB548_10
{
break _1;
}
else{
	r2 = r1 >> 2;
	heap8[r1+56] = r4;
	r3 = (r0 + r9)|0;
	r6 = (r0 + r4)|0;
	r7 = 0;
	heap32[(r2+9)] = r0;
	r0 = r3 >> 2;
	heap8[r6+56] = r7;
	r3 = r5 >> 2;
	heap32[(r0+9)] = r1;
	r0 = heap32[(r3)];
	if(r0 ==0) //_LBB548_5
{
	heap32[(r3+1)] = r1;
}
else{
	r5 = 2;
	r6 = r0 >> 2;
	heap8[r0+57] = r5;
	r5 = 1;
	heap32[(r6+10)] = r1;
	heap8[r1+58] = r5;
	heap32[(r2+11)] = r0;
}
	heap32[(r3)] = r1;
	r0 = heap32[(r3+2)];
	r0 = (r0 + 1)|0;
	heap32[(r3+2)] = r0;
}
}
	r0 = 1;
	r_g0 = r0;
	return;
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}