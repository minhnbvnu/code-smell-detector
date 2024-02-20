function _ZN25btTriangleRaycastCallback15processTriangleEP9btVector3ii(sp)
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
var __label__ = 0;
	i7 = sp + -56;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	f0 = heapFloat[(r0+6)];
	f1 = heapFloat[(r0+2)];
	f2 = heapFloat[(r0+10)];
	f3 = heapFloat[(r0+5)];
	f4 = heapFloat[(r0+1)];
	f5 = heapFloat[(r0+9)];
	f6 = heapFloat[(r0+4)];
	f7 = heapFloat[(r0)];
	f8 = heapFloat[(r0+8)];
	f9 = f3-f4;
	f10 = f2-f1;
	f11 = f0-f1;
	f12 = f5-f4;
	f13 = f8-f7;
	f14 = f6-f7;
	f15 = f9*f10;
	f16 = f11*f12;
	f15 = f15-f16;
	r0 = sp + -32;
	f11 = f11*f13;
	f10 = f14*f10;
	f10 = f11-f10;
	r1 = r0 >> 2;
	heapFloat[(fp+-8)] = f15;
	f11 = f14*f12;
	f9 = f9*f13;
	f9 = f11-f9;
	heapFloat[(r1+1)] = f10;
	r2 = heap32[(fp)];
	heapFloat[(r1+2)] = f9;
	r3 = r2 >> 2;
	heap32[(r1+3)] = 0;
	f11 = heapFloat[(r3+1)];
	f12 = heapFloat[(r3+2)];
	f13 = heapFloat[(r3+5)];
	f14 = heapFloat[(r3+6)];
	f16 = heapFloat[(r3+3)];
	f17 = heapFloat[(r3+7)];
	f18 = f15*f11;
	f19 = f10*f12;
	f20 = f15*f13;
	f21 = f10*f14;
	f22 = f7*f15;
	f23 = f4*f10;
	f18 = f18+f19;
	f19 = f9*f16;
	f20 = f20+f21;
	f21 = f9*f17;
	f22 = f22+f23;
	f23 = f1*f9;
	f18 = f18+f19;
	f19 = f22+f23;
	f20 = f20+f21;
	f18 = f18-f19;
	f19 = f20-f19;
	f20 = f18*f19;
	f21 =                         0;
_1: do {
if(!(f20 >=f21)) //_LBB559_11
{
	r4 = heap32[(r3+9)];
	r4 = r4 & 1;
if(!(r4 ==0)) //_LBB559_3
{
	if(f18 >f21) //_LBB559_11
{
break _1;
}
}
	f19 = f18-f19;
	f19 = f18/f19;
	f20 = heapFloat[(r3+10)];
if(!(f20 <=f19)) //_LBB559_11
{
	f20 =                         1;
	f22 = f20-f19;
	f16 = f16*f22;
	f17 = f17*f19;
	f12 = f12*f22;
	f14 = f14*f19;
	f11 = f11*f22;
	f13 = f13*f19;
	f16 = f16+f17;
	f12 = f12+f14;
	f11 = f11+f13;
	f1 = f1-f16;
	f3 = f3-f12;
	f7 = f7-f11;
	f0 = f0-f16;
	f4 = f4-f12;
	f6 = f6-f11;
	f13 = f15*f15;
	f14 = f10*f10;
	f17 = f4*f0;
	f22 = f1*f3;
	f23 = f1*f6;
	f24 = f7*f0;
	f13 = f13+f14;
	f14 = f9*f9;
	f17 = f17-f22;
	f22 = f23-f24;
	f13 = f13+f14;
	f14 =  -9.9999997473787516e-005;
	f23 = f7*f3;
	f24 = f4*f6;
	f23 = f23-f24;
	f14 = f13*f14;
	f17 = f17*f15;
	f22 = f22*f10;
	f17 = f17+f22;
	f22 = f23*f9;
	f17 = f17+f22;
if(!(f17 <f14)) //_LBB559_11
{
	f2 = f2-f16;
	f5 = f5-f12;
	f8 = f8-f11;
	f11 = f3*f2;
	f12 = f0*f5;
	f0 = f0*f8;
	f16 = f6*f2;
	f11 = f11-f12;
	f0 = f0-f16;
	f6 = f6*f5;
	f3 = f3*f8;
	f11 = f11*f15;
	f0 = f0*f10;
	f3 = f6-f3;
	f0 = f11+f0;
	f3 = f3*f9;
	f0 = f0+f3;
if(!(f0 <f14)) //_LBB559_11
{
	f0 = f5*f1;
	f3 = f2*f4;
	f2 = f2*f7;
	f1 = f8*f1;
	f0 = f0-f3;
	f1 = f2-f1;
	f2 = f8*f4;
	f3 = f5*f7;
	f0 = f0*f15;
	f1 = f1*f10;
	f2 = f2-f3;
	f0 = f0+f1;
	f1 = f2*f9;
	f0 = f0+f1;
if(!(f0 <f14)) //_LBB559_11
{
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	heapFloat[(g0)] = f13;
	sqrtf(i7);
	f0 = f20/f_g0;
	f1 = heapFloat[(fp+-8)];
	f1 = f1*f0;
	heapFloat[(fp+-8)] = f1;
	f2 = heapFloat[(r1+1)];
	f2 = f2*f0;
	heapFloat[(r1+1)] = f2;
	f3 = heapFloat[(r1+2)];
	f0 = f3*f0;
	heapFloat[(r1+2)] = f0;
	r1 = heap32[(r3)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+3)];
	r6 = heap32[(r3+9)];
	r6 = r6 & 2;
	if(r6 !=0) //_LBB559_9
{
__label__ = 9;
}
else{
	if(f18 >f21) //_LBB559_10
{
__label__ = 10;
}
else{
__label__ = 9;
}
}
if (__label__ == 9){
	r0 = sp + -16;
	f1 = -f1;
	r6 = r0 >> 2;
	f2 = -f2;
	heapFloat[(fp+-4)] = f1;
	f0 = -f0;
	heapFloat[(r6+1)] = f2;
	heapFloat[(r6+2)] = f0;
	heap32[(r6+3)] = 0;
}
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heapFloat[(g0+2)] = f19;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	heapFloat[(r3+10)] = f_g0;
}
}
}
}
}
} while(0);
	return;
}