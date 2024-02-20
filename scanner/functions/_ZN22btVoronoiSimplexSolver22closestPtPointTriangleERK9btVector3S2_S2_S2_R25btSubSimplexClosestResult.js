function _ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+4)];
	r1 = heapU8[r0+16];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+1)];
	r1 = r1 & -16;
	r5 = heap32[(fp)];
	r2 = r2 >> 2;
	heap8[r0+16] = r1;
	r3 = r3 >> 2;
	r5 = r5 >> 2;
	r4 = r4 >> 2;
	f0 = heapFloat[(r2+1)];
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(r3+1)];
	f3 = heapFloat[(r5+1)];
	f4 = heapFloat[(r2)];
	f5 = heapFloat[(r4)];
	f6 = heapFloat[(r3)];
	f7 = heapFloat[(r5)];
	f8 = heapFloat[(r2+2)];
	f9 = heapFloat[(r4+2)];
	f10 = heapFloat[(r3+2)];
	f11 = heapFloat[(r5+2)];
	f12 = f0-f1;
	f13 = f4-f5;
	f14 = f6-f5;
	f15 = f7-f5;
	f16 = f2-f1;
	f17 = f3-f1;
	f18 = f8-f9;
	f19 = f10-f9;
	f20 = f11-f9;
	f21 = f13*f15;
	f22 = f12*f17;
	f15 = f14*f15;
	f17 = f16*f17;
	f21 = f21+f22;
	f22 = f18*f20;
	f15 = f15+f17;
	f17 = f19*f20;
	f20 = f21+f22;
	f15 = f15+f17;
	f17 =                         0;
if(!(f20 >f17)) //_LBB568_3
{
if(!(f15 >f17)) //_LBB568_3
{
	r2 = r0 >> 2;
	heapFloat[(r2)] = f5;
	heap32[(r2+1)] = heap32[(r4+1)];
	heap32[(r2+2)] = heap32[(r4+2)];
	r1 = r1 | 1;
	heap32[(r2+3)] = heap32[(r4+3)];
	heap8[r0+16] = r1;
	heap32[(r2+5)] = 1065353216;
	heap32[(r2+6)] = 0;
	heap32[(r2+7)] = 0;
	heap32[(r2+8)] = 0;
	return;
}
}
	f21 = f7-f4;
	f22 = f3-f0;
	f23 = f13*f21;
	f24 = f12*f22;
	f25 = f11-f8;
	f21 = f14*f21;
	f22 = f16*f22;
	f23 = f23+f24;
	f24 = f18*f25;
	f21 = f21+f22;
	f22 = f19*f25;
	f23 = f23+f24;
	f21 = f21+f22;
	if(f23 <f17) //_LBB568_7
{
__label__ = 7;
}
else{
	if(f21 >f23) //_LBB568_7
{
__label__ = 7;
}
else{
	r3 = r0 >> 2;
	heapFloat[(r3)] = f4;
	heap32[(r3+1)] = heap32[(r2+1)];
	heap32[(r3+2)] = heap32[(r2+2)];
	r1 = r1 | 2;
	heap32[(r3+3)] = heap32[(r2+3)];
	heap8[r0+16] = r1;
	heap32[(r3+5)] = 0;
	heap32[(r3+6)] = 1065353216;
__label__ = 6;
}
}
_8: do {
if (__label__ == 7){
	f22 = f20*f21;
	f24 = f23*f15;
	f22 = f22-f24;
if(!(f22 >f17)) //_LBB568_11
{
if(!(f20 <f17)) //_LBB568_11
{
if(!(f23 >f17)) //_LBB568_11
{
	f0 = f20-f23;
	f0 = f20/f0;
	f2 = f13*f0;
	r3 = r0 >> 2;
	f2 = f5+f2;
	f3 = f12*f0;
	f4 = f18*f0;
	f1 = f1+f3;
	heapFloat[(r3)] = f2;
	f2 = f9+f4;
	heapFloat[(r3+1)] = f1;
	heapFloat[(r3+2)] = f2;
	f1 =                         1;
	r1 = r1 | 3;
	heap32[(r3+3)] = 0;
	f1 = f1-f0;
	heap8[r0+16] = r1;
	heapFloat[(r3+5)] = f1;
	heapFloat[(r3+6)] = f0;
break _8;
}
}
}
	f7 = f7-f6;
	f3 = f3-f2;
	f24 = f14*f7;
	f25 = f16*f3;
	f11 = f11-f10;
	f7 = f13*f7;
	f3 = f12*f3;
	f24 = f24+f25;
	f25 = f19*f11;
	f3 = f7+f3;
	f7 = f18*f11;
	f11 = f24+f25;
	f3 = f3+f7;
if(!(f11 <f17)) //_LBB568_14
{
if(!(f3 >f11)) //_LBB568_14
{
	r2 = r0 >> 2;
	heapFloat[(r2)] = f6;
	heap32[(r2+1)] = heap32[(r3+1)];
	heap32[(r2+2)] = heap32[(r3+2)];
	r1 = r1 | 4;
	heap32[(r2+3)] = heap32[(r3+3)];
	heap8[r0+16] = r1;
	heap32[(r2+5)] = 0;
	heap32[(r2+6)] = 0;
	heap32[(r2+7)] = 1065353216;
	heap32[(r2+8)] = 0;
	return;
}
}
	f7 = f3*f15;
	f20 = f20*f11;
	f7 = f7-f20;
	if(f7 >f17) //_LBB568_19
{
__label__ = 19;
}
else{
	if(f15 <f17) //_LBB568_19
{
__label__ = 19;
}
else{
	if(f11 >f17) //_LBB568_19
{
__label__ = 19;
}
else{
	f0 = f15-f11;
	f0 = f15/f0;
	f2 = f14*f0;
	r2 = r0 >> 2;
	f2 = f5+f2;
	f3 = f16*f0;
	f4 = f19*f0;
	f1 = f1+f3;
	heapFloat[(r2)] = f2;
	f2 = f9+f4;
	heapFloat[(r2+1)] = f1;
	heapFloat[(r2+2)] = f2;
	f1 =                         1;
	r1 = r1 | 5;
	heap32[(r2+3)] = 0;
	f1 = f1-f0;
	heap8[r0+16] = r1;
	heapFloat[(r2+5)] = f1;
	heap32[(r2+6)] = 0;
__label__ = 18;
}
}
}
if (__label__ == 19){
	f15 = f23*f11;
	f20 = f3*f21;
	f15 = f15-f20;
if(!(f15 >f17)) //_LBB568_23
{
	f20 = f21-f23;
if(!(f20 <f17)) //_LBB568_23
{
	f3 = f3-f11;
if(!(f3 <f17)) //_LBB568_23
{
	f1 = f20+f3;
	f1 = f20/f1;
	f5 = f6-f4;
	f7 = f2-f0;
	f5 = f5*f1;
	f9 = f10-f8;
	f7 = f7*f1;
	r2 = r0 >> 2;
	f5 = f4+f5;
	f9 = f9*f1;
	f7 = f0+f7;
	heapFloat[(r2)] = f5;
	f5 = f8+f9;
	heapFloat[(r2+1)] = f7;
	heapFloat[(r2+2)] = f5;
	r1 = r1 | 6;
	heap32[(r2+3)] = 0;
	f5 =                         1;
	heap8[r0+16] = r1;
	f5 = f5-f1;
	heap32[(r2+5)] = 0;
	heapFloat[(r2+6)] = f5;
	heapFloat[(r2+7)] = f1;
	heap32[(r2+8)] = 0;
	return;
}
}
}
	f0 = f15+f7;
	f0 = f0+f22;
	f2 =                         1;
	f0 = f2/f0;
	f3 = f7*f0;
	f0 = f22*f0;
	f4 = f13*f3;
	f6 = f12*f3;
	f4 = f5+f4;
	f5 = f14*f0;
	r2 = r0 >> 2;
	f4 = f4+f5;
	f5 = f18*f3;
	f1 = f1+f6;
	f6 = f16*f0;
	f5 = f9+f5;
	f7 = f19*f0;
	f1 = f1+f6;
	heapFloat[(r2)] = f4;
	f4 = f5+f7;
	heapFloat[(r2+1)] = f1;
	heapFloat[(r2+2)] = f4;
	f1 = f2-f3;
	r1 = r1 | 7;
	heap32[(r2+3)] = 0;
	f1 = f1-f0;
	heap8[r0+16] = r1;
	heapFloat[(r2+5)] = f1;
	heapFloat[(r2+6)] = f3;
}
	heapFloat[(r2+7)] = f0;
	heap32[(r2+8)] = 0;
	return;
}
} while(0);
	heap32[(r3+7)] = 0;
	heap32[(r3+8)] = 0;
	return;
}