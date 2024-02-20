function _ZN12gjkepa2_impl3EPA7newfaceEPNS_3GJK3sSVES3_S3_b(sp)
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
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
	var f12;
	var f13;
	var f14;
	var f15;
	var f16;
	var f17;
	var f18;
	var f19;
	var f20;
	var f21;
	var f22;
	var f23;
	var f24;
	var f25;
	var f26;
	var f27;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2450)];
_1: do {
	if(r1 ==0) //_LBB547_23
{
	heap32[(r0)] = 5;
	r1 = 0;
}
else{
	r2 = r1 >> 2;
	r3 = heap32[(r2+13)];
if(!(r3 ==0)) //_LBB547_3
{
	r3 = r3 >> 2;
	r4 = heap32[(r2+12)];
	heap32[(r3+12)] = r4;
}
	r3 = heap32[(r2+12)];
if(!(r3 ==0)) //_LBB547_5
{
	r3 = r3 >> 2;
	r4 = heap32[(r2+13)];
	heap32[(r3+13)] = r4;
}
	r3 = heap32[(r0+2450)];
if(!(r3 !=r1)) //_LBB547_7
{
	r3 = heap32[(r2+13)];
	heap32[(r0+2450)] = r3;
}
	r3 = heap32[(r0+2451)];
	r3 = (r3 + -1)|0;
	heap32[(r0+2451)] = r3;
	heap32[(r2+12)] = 0;
	r3 = heap32[(r0+2448)];
	heap32[(r2+13)] = r3;
	r3 = heap32[(r0+2448)];
if(!(r3 ==0)) //_LBB547_9
{
	r3 = r3 >> 2;
	heap32[(r3+12)] = r1;
}
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	heap32[(r0+2448)] = r1;
	r6 = heap32[(r0+2449)];
	r6 = (r6 + 1)|0;
	r7 = 0;
	heap32[(r0+2449)] = r6;
	heap8[r1+59] = r7;
	heap32[(r2+6)] = r3;
	heap32[(r2+7)] = r4;
	heap32[(r2+8)] = r5;
	r5 = r5 >> 2;
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	f0 = heapFloat[(r5+6)];
	f1 = heapFloat[(r3+6)];
	f2 = heapFloat[(r4+6)];
	f3 = heapFloat[(r5+5)];
	f4 = heapFloat[(r3+5)];
	f5 = heapFloat[(r4+5)];
	f5 = f5-f4;
	f0 = f0-f1;
	f1 = f2-f1;
	f2 = f3-f4;
	f3 = heapFloat[(r5+4)];
	f4 = heapFloat[(r3+4)];
	f6 = heapFloat[(r4+4)];
	f3 = f3-f4;
	f4 = f6-f4;
	f6 = f5*f0;
	f7 = f1*f2;
	f6 = f6-f7;
	f1 = f1*f3;
	f0 = f4*f0;
	f0 = f1-f0;
	heapFloat[(r2)] = f6;
	f1 = f4*f2;
	f2 = f5*f3;
	f1 = f1-f2;
	heapFloat[(r2+1)] = f0;
	heapFloat[(r2+2)] = f1;
	f2 = f6*f6;
	f0 = f0*f0;
	heap32[(r2+3)] = 0;
	f0 = f2+f0;
	f1 = f1*f1;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f1 = heapFloat[(r5+6)];
	f2 = heapFloat[(r3+6)];
	f3 = heapFloat[(r4+6)];
	f4 = heapFloat[(r5+5)];
	f5 = heapFloat[(r3+5)];
	f6 = heapFloat[(r4+5)];
	f7 = heapFloat[(r5+4)];
	f8 = heapFloat[(r3+4)];
	f9 = heapFloat[(r4+4)];
	f10 = heapFloat[(r2)];
	f11 = f2-f3;
	f12 = heapFloat[(r2+1)];
	f13 = f3-f1;
	f14 = heapFloat[(r2+2)];
	f15 = f5-f6;
	f16 = f8-f9;
	f17 = f6-f4;
	f18 = f9-f7;
	f19 = f1-f2;
	f20 = f4-f5;
	f21 = f7-f8;
	f22 = f12*f11;
	f23 = f14*f15;
	f24 = f14*f16;
	f11 = f10*f11;
	f25 = f12*f13;
	f26 = f14*f17;
	f27 = f14*f18;
	f13 = f10*f13;
	f22 = f22-f23;
	f11 = f24-f11;
	f23 = f25-f26;
	f13 = f27-f13;
	f15 = f10*f15;
	f16 = f12*f16;
	f17 = f10*f17;
	f18 = f12*f18;
	f24 = f12*f19;
	f25 = f14*f20;
	f26 = f14*f21;
	f19 = f10*f19;
	f15 = f15-f16;
	f16 = f17-f18;
	f17 = f24-f25;
	f18 = f26-f19;
	f8 = f8*f22;
	f5 = f5*f11;
	f9 = f9*f23;
	f6 = f6*f13;
	f11 = f10*f20;
	f13 = f12*f21;
	f11 = f11-f13;
	f5 = f8+f5;
	f2 = f2*f15;
	f6 = f9+f6;
	f3 = f3*f16;
	f7 = f7*f17;
	f4 = f4*f18;
	f2 = f5+f2;
	f3 = f6+f3;
	f4 = f7+f4;
	f1 = f1*f11;
	f5 =   9.9999997473787516e-005;
	f6 =                         1;
	f2 = f2 < f3 ? f2 : f3;
	f1 = f4+f1;
	f1 = f2 < f1 ? f2 : f1;
	f2 = f0 > f5 ? f0 : f6;
	f1 = f1/f2;
	f2 =    -0.0099999997764825821;
	f3 =                         0;
	f1 = f1 < f2 ? f1 : f3;
	heapFloat[(r2+5)] = f1;
	if(f0 <=f5) //_LBB547_13
{
	heap32[(r0)] = 2;
}
else{
	r4 = heap32[(fp+4)];
	f1 = heapFloat[(r3+4)];
	f2 = heapFloat[(r3+5)];
	f3 = heapFloat[(r3+6)];
	f1 = f1*f10;
	f2 = f2*f12;
	f1 = f1+f2;
	f2 = f3*f14;
	f1 = f1+f2;
	f2 = f6/f0;
	f0 = f1/f0;
	f1 = f10*f2;
	heapFloat[(r2+4)] = f0;
	f3 = f12*f2;
	heapFloat[(r2)] = f1;
	f1 = f14*f2;
	heapFloat[(r2+1)] = f3;
	heapFloat[(r2+2)] = f1;
	if(r4 !=0) //_LBB547_24
{
break _1;
}
else{
	f1 =  -9.9999997473787516e-006;
	if(f0 >=f1) //_LBB547_24
{
break _1;
}
else{
	heap32[(r0)] = 3;
}
}
}
	r3 = heap32[(r2+13)];
if(!(r3 ==0)) //_LBB547_16
{
	r3 = r3 >> 2;
	r4 = heap32[(r2+12)];
	heap32[(r3+12)] = r4;
}
	r3 = heap32[(r2+12)];
if(!(r3 ==0)) //_LBB547_18
{
	r3 = r3 >> 2;
	r4 = heap32[(r2+13)];
	heap32[(r3+13)] = r4;
}
	r3 = heap32[(r0+2448)];
if(!(r3 !=r1)) //_LBB547_20
{
	r3 = heap32[(r2+13)];
	heap32[(r0+2448)] = r3;
}
	r3 = heap32[(r0+2449)];
	r3 = (r3 + -1)|0;
	heap32[(r0+2449)] = r3;
	heap32[(r2+12)] = 0;
	r3 = heap32[(r0+2450)];
	heap32[(r2+13)] = r3;
	r2 = heap32[(r0+2450)];
if(!(r2 ==0)) //_LBB547_22
{
	r2 = r2 >> 2;
	heap32[(r2+12)] = r1;
}
	heap32[(r0+2450)] = r1;
	r1 = heap32[(r0+2451)];
	r1 = (r1 + 1)|0;
	heap32[(r0+2451)] = r1;
	r0 = 0;
	r_g0 = r0;
	return;
}
} while(0);
	r_g0 = r1;
	return;
}