function _ZN22btVoronoiSimplexSolver28updateClosestVectorAndPointsEv(sp)
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
var __label__ = 0;
	i7 = sp + -136;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+356];
	if(r1 !=0) //_LBB571_2
{
	r1 = 0;
	r2 = r0 >> 2;
	heap8[r0+352] = r1;
	heap32[(r2+84)] = 0;
	heap32[(r2+85)] = 0;
	heap32[(r2+86)] = 0;
	heap32[(r2+87)] = 0;
	r3 = heapU8[r0+332];
	r4 = r3 & -16;
	heap8[r0+332] = r4;
	heap8[r0+356] = r1;
	r5 = heap32[(r2)];
_3: do {
	if(r5 >1) //_LBB571_5
{
_5: do {
	if(r5 ==2) //_LBB571_11
{
	f0 =                         0;
	f1 = heapFloat[(r2+2)];
	f2 = heapFloat[(r2+6)];
	f3 = heapFloat[(r2+1)];
	f4 = heapFloat[(r2+5)];
	f5 = heapFloat[(r2+3)];
	f6 = heapFloat[(r2+7)];
	f2 = f2-f1;
	f1 = f0-f1;
	f4 = f4-f3;
	f3 = f0-f3;
	f6 = f6-f5;
	f5 = f0-f5;
	f3 = f4*f3;
	f1 = f2*f1;
	f1 = f3+f1;
	f3 = f6*f5;
	f1 = f1+f3;
	if(f1 <=f0) //_LBB571_15
{
	r1 = r4 | 1;
	heap8[r0+332] = r1;
	f1 = f0;
}
else{
	f3 = f4*f4;
	f2 = f2*f2;
	f2 = f3+f2;
	f3 = f6*f6;
	f2 = f2+f3;
	if(f1 >=f2) //_LBB571_14
{
	f1 =                         1;
	r1 = r4 | 2;
	heap8[r0+332] = r1;
}
else{
	f1 = f1/f2;
	r1 = r4 | 3;
	heap8[r0+332] = r1;
}
}
	f2 =                         1;
	f2 = f2-f1;
	heapFloat[(r2+84)] = f2;
	heapFloat[(r2+85)] = f1;
	heap32[(r2+86)] = 0;
	heap32[(r2+87)] = 0;
	f2 = heapFloat[(r2+25)];
	f3 = heapFloat[(r2+21)];
	f2 = f2-f3;
	f4 = heapFloat[(r2+26)];
	f5 = heapFloat[(r2+22)];
	f4 = f4-f5;
	f2 = f2*f1;
	f6 = heapFloat[(r2+27)];
	f7 = heapFloat[(r2+23)];
	f6 = f6-f7;
	f4 = f4*f1;
	f2 = f3+f2;
	f3 = f6*f1;
	f4 = f5+f4;
	heapFloat[(r2+61)] = f2;
	f3 = f7+f3;
	heapFloat[(r2+62)] = f4;
	heapFloat[(r2+63)] = f3;
	heap32[(r2+64)] = 0;
	f5 = heapFloat[(r2+45)];
	f6 = heapFloat[(r2+41)];
	f5 = f5-f6;
	f7 = heapFloat[(r2+46)];
	f8 = heapFloat[(r2+42)];
	f7 = f7-f8;
	f5 = f5*f1;
	f9 = heapFloat[(r2+47)];
	f10 = heapFloat[(r2+43)];
	f9 = f9-f10;
	f7 = f7*f1;
	f5 = f6+f5;
	f1 = f9*f1;
	f6 = f8+f7;
	heapFloat[(r2+65)] = f5;
	f1 = f10+f1;
	heapFloat[(r2+66)] = f6;
	heapFloat[(r2+67)] = f1;
	f2 = f2-f5;
	heap32[(r2+68)] = 0;
	f4 = f4-f6;
	heapFloat[(r2+69)] = f2;
	f1 = f3-f1;
	heapFloat[(r2+70)] = f4;
	heapFloat[(r2+71)] = f1;
	heap32[(r2+72)] = 0;
	r1 = (r0 + 332)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	_ZN22btVoronoiSimplexSolver14reduceVerticesERK15btUsageBitfield(i7);
	f1 = heapFloat[(r2+84)];
	if(f1 >=f0) //_LBB571_18
{
	f0 = heapFloat[(r2+85)];
	f1 =                         0;
if(!(f0 <f1)) //_LBB571_17
{
	f0 = heapFloat[(r2+86)];
if(!(f0 <f1)) //_LBB571_17
{
	f0 = heapFloat[(r2+87)];
	r1 = f0 >= f1;
	r1 = r1 & 1;
break _5;
}
}
}
	r1 = 0;
}
else{
	if(r5 ==3) //_LBB571_22
{
	r1 = sp + -56;
	r3 = r1 >> 2;
	heap32[(fp+-14)] = 0;
	heap32[(r3+1)] = 0;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = 0;
	r3 = (r0 + 4)|0;
	r4 = (r0 + 20)|0;
	r5 = (r0 + 36)|0;
	r6 = (r0 + 316)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r6;
	_ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(i7);
	f0 = heapFloat[(r2+85)];
	f1 = heapFloat[(r2+25)];
	f2 = heapFloat[(r2+84)];
	f3 = heapFloat[(r2+21)];
	f4 = heapFloat[(r2+26)];
	f5 = heapFloat[(r2+22)];
	f3 = f3*f2;
	f1 = f1*f0;
	f6 = heapFloat[(r2+86)];
	f7 = heapFloat[(r2+29)];
	f8 = heapFloat[(r2+31)];
	f9 = heapFloat[(r2+30)];
	f10 = heapFloat[(r2+27)];
	f11 = heapFloat[(r2+23)];
	f5 = f5*f2;
	f4 = f4*f0;
	f1 = f3+f1;
	f3 = f7*f6;
	f7 = f11*f2;
	f10 = f10*f0;
	f4 = f5+f4;
	f5 = f9*f6;
	f1 = f1+f3;
	f3 = f7+f10;
	f7 = f8*f6;
	f4 = f4+f5;
	heapFloat[(r2+61)] = f1;
	f3 = f3+f7;
	heapFloat[(r2+62)] = f4;
	heapFloat[(r2+63)] = f3;
	heap32[(r2+64)] = 0;
	f5 = heapFloat[(r2+45)];
	f7 = heapFloat[(r2+41)];
	f8 = heapFloat[(r2+49)];
	f9 = heapFloat[(r2+46)];
	f10 = heapFloat[(r2+42)];
	f7 = f7*f2;
	f5 = f5*f0;
	f11 = heapFloat[(r2+51)];
	f12 = heapFloat[(r2+50)];
	f13 = heapFloat[(r2+47)];
	f14 = heapFloat[(r2+43)];
	f10 = f10*f2;
	f9 = f9*f0;
	f5 = f7+f5;
	f7 = f8*f6;
	f5 = f5+f7;
	f2 = f14*f2;
	f0 = f13*f0;
	f7 = f10+f9;
	f8 = f12*f6;
	f7 = f7+f8;
	heapFloat[(r2+65)] = f5;
	f0 = f2+f0;
	f2 = f11*f6;
	f0 = f0+f2;
	heapFloat[(r2+66)] = f7;
	heapFloat[(r2+67)] = f0;
	f1 = f1-f5;
	heap32[(r2+68)] = 0;
	f2 = f4-f7;
	heapFloat[(r2+69)] = f1;
	f0 = f3-f0;
	heapFloat[(r2+70)] = f2;
	heapFloat[(r2+71)] = f0;
	heap32[(r2+72)] = 0;
	r1 = (r0 + 332)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	_ZN22btVoronoiSimplexSolver14reduceVerticesERK15btUsageBitfield(i7);
	f0 = heapFloat[(r2+84)];
	f1 =                         0;
	if(f0 >=f1) //_LBB571_24
{
	f0 = heapFloat[(r2+85)];
if(!(f0 <f1)) //_LBB571_23
{
	f0 = heapFloat[(r2+86)];
if(!(f0 <f1)) //_LBB571_23
{
	f0 = heapFloat[(r2+87)];
	r1 = f0 >= f1;
	r1 = r1 & 1;
break _5;
}
}
}
	r1 = 0;
}
else{
	if(r5 ==4) //_LBB571_28
{
	r4 = sp + -72;
	r5 = r4 >> 2;
	heap32[(fp+-18)] = 0;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
	heap8[sp+-24] = r1;
	heap32[(r2+79)] = 0;
	heap32[(r2+80)] = 0;
	heap32[(r2+81)] = 0;
	r3 = r3 | 15;
	heap32[(r2+82)] = 0;
	heap8[r0+332] = r3;
	f0 = heapFloat[(r2+11)];
	f1 = heapFloat[(r2+7)];
	f2 = heapFloat[(r2+15)];
	f3 = heapFloat[(r2+1)];
	f4 = heapFloat[(r2+2)];
	f5 = heapFloat[(r2+3)];
	f6 = heapFloat[(r2+5)];
	f7 = heapFloat[(r2+6)];
	f8 = heapFloat[(r2+9)];
	f9 = heapFloat[(r2+10)];
	f10 = heapFloat[(r2+13)];
	f11 = heapFloat[(r2+14)];
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	heapFloat[(g0+3)] = f3;
	heapFloat[(g0+4)] = f4;
	heapFloat[(g0+5)] = f5;
	heapFloat[(g0+6)] = f6;
	heapFloat[(g0+7)] = f7;
	heapFloat[(g0+8)] = f1;
	heapFloat[(g0+9)] = f8;
	heapFloat[(g0+10)] = f9;
	heapFloat[(g0+11)] = f0;
	heapFloat[(g0+12)] = f10;
	heapFloat[(g0+13)] = f11;
	heapFloat[(g0+14)] = f2;
	_ZN22btVoronoiSimplexSolver19pointOutsideOfPlaneERK9btVector3S2_S2_S2_S2_(i7);
	r3 = r_g0;
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	heapFloat[(g0+3)] = f3;
	heapFloat[(g0+4)] = f4;
	heapFloat[(g0+5)] = f5;
	heapFloat[(g0+6)] = f8;
	heapFloat[(g0+7)] = f9;
	heapFloat[(g0+8)] = f0;
	heapFloat[(g0+9)] = f10;
	heapFloat[(g0+10)] = f11;
	heapFloat[(g0+11)] = f2;
	heapFloat[(g0+12)] = f6;
	heapFloat[(g0+13)] = f7;
	heapFloat[(g0+14)] = f1;
	_ZN22btVoronoiSimplexSolver19pointOutsideOfPlaneERK9btVector3S2_S2_S2_S2_(i7);
	r6 = r_g0;
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	heapFloat[(g0+3)] = f3;
	heapFloat[(g0+4)] = f4;
	heapFloat[(g0+5)] = f5;
	heapFloat[(g0+6)] = f10;
	heapFloat[(g0+7)] = f11;
	heapFloat[(g0+8)] = f2;
	heapFloat[(g0+9)] = f6;
	heapFloat[(g0+10)] = f7;
	heapFloat[(g0+11)] = f1;
	heapFloat[(g0+12)] = f8;
	heapFloat[(g0+13)] = f9;
	heapFloat[(g0+14)] = f0;
	_ZN22btVoronoiSimplexSolver19pointOutsideOfPlaneERK9btVector3S2_S2_S2_S2_(i7);
	r7 = r_g0;
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	heapFloat[(g0+3)] = f6;
	heapFloat[(g0+4)] = f7;
	heapFloat[(g0+5)] = f1;
	heapFloat[(g0+6)] = f10;
	heapFloat[(g0+7)] = f11;
	heapFloat[(g0+8)] = f2;
	heapFloat[(g0+9)] = f8;
	heapFloat[(g0+10)] = f9;
	heapFloat[(g0+11)] = f0;
	heapFloat[(g0+12)] = f3;
	heapFloat[(g0+13)] = f4;
	heapFloat[(g0+14)] = f5;
	r8 = r6 | r3;
	_ZN22btVoronoiSimplexSolver19pointOutsideOfPlaneERK9btVector3S2_S2_S2_S2_(i7);
	r9 = r_g0;
if(!(r8 <0)) //_LBB571_52
{
	r10 = r9 | r7;
if(!(r10 <0)) //_LBB571_52
{
	r8 = r8 | r7;
	r8 = r8 | r9;
	if(r8 ==0) //_LBB571_53
{
	r1 = 1;
	heap8[r0+312] = r1;
	heap32[(r2+69)] = 0;
	heap32[(r2+70)] = 0;
	heap32[(r2+71)] = 0;
	heap32[(r2+72)] = 0;
	r_g0 = r1;
	return;
}
else{
	r8 = (r0 + 4)|0;
	r10 = (r0 + 20)|0;
	r11 = (r0 + 36)|0;
	r12 = (r0 + 52)|0;
	if(r3 !=0) //_LBB571_33
{
	r3 = sp + -40;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r11;
	heap32[(g0+4)] = r3;
	_ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(i7);
	r3 = r3 >> 2;
	f1 = heapFloat[(fp+-10)];
	f0 = heapFloat[(fp+-18)];
	f2 = heapFloat[(r3+1)];
	f3 = heapFloat[(r5+1)];
	f0 = f1-f0;
	f3 = f2-f3;
	f4 = heapFloat[(r3+2)];
	f5 = heapFloat[(r5+2)];
	f5 = f4-f5;
	f0 = f0*f0;
	f3 = f3*f3;
	f0 = f0+f3;
	f3 = f5*f5;
	f0 = f0+f3;
	f3 =   3.4028234663852886e+038;
	if(f0 >=f3) //_LBB571_32
{
__label__ = 31;
}
else{
	f3 = heapFloat[(r3+3)];
	heapFloat[(r2+79)] = f1;
	heapFloat[(r2+80)] = f2;
	heapFloat[(r2+81)] = f4;
	heapFloat[(r2+82)] = f3;
	r13 = heapU8[sp+-24];
	r14 = heapU8[r0+332];
	r15 = r13 & 1;
	r14 = r14 & 240;
	r14 = r15 | r14;
	r15 = r13 & 2;
	r14 = r14 | r15;
	r13 = r13 & 4;
	r13 = r14 | r13;
	heap8[r0+332] = r13;
	f1 = heapFloat[(r3+7)];
	f2 = heapFloat[(r3+6)];
	heap32[(r2+84)] = heap32[(r3+5)];
	heapFloat[(r2+85)] = f2;
	heapFloat[(r2+86)] = f1;
	heap32[(r2+87)] = 0;
__label__ = 34;
}
}
else{
__label__ = 31;
}
if (__label__ == 31){
	f0 =   3.4028234663852886e+038;
}
	if(r6 !=0) //_LBB571_37
{
	r3 = sp + -40;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = r3;
	_ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(i7);
	r3 = r3 >> 2;
	f1 = heapFloat[(fp+-10)];
	f2 = heapFloat[(fp+-18)];
	f3 = heapFloat[(r3+1)];
	f4 = heapFloat[(r5+1)];
	f2 = f1-f2;
	f4 = f3-f4;
	f5 = heapFloat[(r3+2)];
	f6 = heapFloat[(r5+2)];
	f6 = f5-f6;
	f2 = f2*f2;
	f4 = f4*f4;
	f2 = f2+f4;
	f4 = f6*f6;
	f2 = f2+f4;
if(!(f2 >=f0)) //_LBB571_36
{
	f0 = heapFloat[(r3+3)];
	heapFloat[(r2+79)] = f1;
	heapFloat[(r2+80)] = f3;
	heapFloat[(r2+81)] = f5;
	heapFloat[(r2+82)] = f0;
	r6 = heapU8[sp+-24];
	r13 = heapU8[r0+332];
	r14 = r6 << 1;
	r6 = r6 & 1;
	r13 = r13 & 240;
	r6 = r6 | r13;
	r13 = r14 & 4;
	r6 = r6 | r13;
	r13 = r14 & 8;
	r6 = r6 | r13;
	heap8[r0+332] = r6;
	f0 = heapFloat[(r3+7)];
	f1 = heapFloat[(r3+6)];
	heap32[(r2+84)] = heap32[(r3+5)];
	heap32[(r2+85)] = 0;
	heapFloat[(r2+86)] = f1;
	heapFloat[(r2+87)] = f0;
	f0 = f2;
}
}
	if(r7 !=0) //_LBB571_41
{
	r3 = sp + -40;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r10;
	heap32[(g0+4)] = r3;
	_ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(i7);
	r3 = r3 >> 2;
	f1 = heapFloat[(fp+-10)];
	f2 = heapFloat[(fp+-18)];
	f3 = heapFloat[(r3+1)];
	f4 = heapFloat[(r5+1)];
	f2 = f1-f2;
	f4 = f3-f4;
	f5 = heapFloat[(r3+2)];
	f6 = heapFloat[(r5+2)];
	f6 = f5-f6;
	f2 = f2*f2;
	f4 = f4*f4;
	f2 = f2+f4;
	f4 = f6*f6;
	f2 = f2+f4;
if(!(f2 >=f0)) //_LBB571_40
{
	f0 = heapFloat[(r3+3)];
	heapFloat[(r2+79)] = f1;
	heapFloat[(r2+80)] = f3;
	heapFloat[(r2+81)] = f5;
	heapFloat[(r2+82)] = f0;
	r6 = heapU8[sp+-24];
	r7 = heapU8[r0+332];
	r8 = r6 >>> 1;
	r13 = r6 & 1;
	r7 = r7 & 240;
	r6 = r6 << 2;
	r7 = r13 | r7;
	r8 = r8 & 2;
	r7 = r7 | r8;
	r6 = r6 & 8;
	r6 = r7 | r6;
	heap8[r0+332] = r6;
	f0 = heapFloat[(r3+6)];
	f1 = heapFloat[(r3+7)];
	heap32[(r2+84)] = heap32[(r3+5)];
	heapFloat[(r2+85)] = f1;
	heap32[(r2+86)] = 0;
	heapFloat[(r2+87)] = f0;
	f0 = f2;
}
}
if(!(r9 ==0)) //_LBB571_46
{
	r3 = sp + -40;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r11;
	heap32[(g0+4)] = r3;
	_ZN22btVoronoiSimplexSolver22closestPtPointTriangleERK9btVector3S2_S2_S2_R25btSubSimplexClosestResult(i7);
	r3 = r3 >> 2;
	f1 = heapFloat[(fp+-10)];
	f2 = heapFloat[(fp+-18)];
	f3 = heapFloat[(r3+1)];
	f4 = heapFloat[(r5+1)];
	f2 = f1-f2;
	f4 = f3-f4;
	f5 = heapFloat[(r3+2)];
	f6 = heapFloat[(r5+2)];
	f6 = f5-f6;
	f2 = f2*f2;
	f4 = f4*f4;
	f2 = f2+f4;
	f4 = f6*f6;
	f2 = f2+f4;
if(!(f2 >=f0)) //_LBB571_46
{
	f0 = heapFloat[(r3+3)];
	heapFloat[(r2+79)] = f1;
	heapFloat[(r2+80)] = f3;
	heapFloat[(r2+81)] = f5;
	heapFloat[(r2+82)] = f0;
	r4 = heapU8[sp+-24];
	r5 = heapU8[r0+332];
	r6 = r4 << 1;
	r6 = r6 & 2;
	r5 = r5 & 240;
	r7 = r4 << 2;
	r5 = r6 | r5;
	r4 = r4 & 4;
	r4 = r5 | r4;
	r5 = r7 & 8;
	r4 = r4 | r5;
	heap8[r0+332] = r4;
	f0 = heapFloat[(r3+6)];
	f1 = heapFloat[(r3+7)];
	f2 = heapFloat[(r3+5)];
	heap32[(r2+84)] = 0;
	heapFloat[(r2+85)] = f2;
	heapFloat[(r2+86)] = f1;
	heapFloat[(r2+87)] = f0;
}
}
	f0 = heapFloat[(r2+85)];
	f1 = heapFloat[(r2+25)];
	f2 = heapFloat[(r2+84)];
	f3 = heapFloat[(r2+21)];
	f4 = heapFloat[(r2+26)];
	f5 = heapFloat[(r2+22)];
	f3 = f3*f2;
	f1 = f1*f0;
	f6 = heapFloat[(r2+86)];
	f7 = heapFloat[(r2+29)];
	f8 = heapFloat[(r2+30)];
	f9 = heapFloat[(r2+27)];
	f10 = heapFloat[(r2+23)];
	f5 = f5*f2;
	f4 = f4*f0;
	f1 = f3+f1;
	f3 = f7*f6;
	f7 = heapFloat[(r2+87)];
	f11 = heapFloat[(r2+33)];
	f12 = heapFloat[(r2+35)];
	f13 = heapFloat[(r2+34)];
	f14 = heapFloat[(r2+31)];
	f10 = f10*f2;
	f9 = f9*f0;
	f4 = f5+f4;
	f5 = f8*f6;
	f1 = f1+f3;
	f3 = f11*f7;
	f8 = f10+f9;
	f9 = f14*f6;
	f4 = f4+f5;
	f5 = f13*f7;
	f1 = f1+f3;
	f3 = f8+f9;
	f8 = f12*f7;
	f4 = f4+f5;
	heapFloat[(r2+61)] = f1;
	f3 = f3+f8;
	heapFloat[(r2+62)] = f4;
	heapFloat[(r2+63)] = f3;
	heap32[(r2+64)] = 0;
	f5 = heapFloat[(r2+45)];
	f8 = heapFloat[(r2+41)];
	f9 = heapFloat[(r2+49)];
	f10 = heapFloat[(r2+46)];
	f11 = heapFloat[(r2+42)];
	f8 = f8*f2;
	f5 = f5*f0;
	f12 = heapFloat[(r2+53)];
	f13 = heapFloat[(r2+50)];
	f14 = heapFloat[(r2+47)];
	f15 = heapFloat[(r2+43)];
	f11 = f11*f2;
	f10 = f10*f0;
	f5 = f8+f5;
	f8 = f9*f6;
	f9 = heapFloat[(r2+55)];
	f16 = heapFloat[(r2+54)];
	f17 = heapFloat[(r2+51)];
	f2 = f15*f2;
	f0 = f14*f0;
	f10 = f11+f10;
	f11 = f13*f6;
	f5 = f5+f8;
	f8 = f12*f7;
	f5 = f5+f8;
	f0 = f2+f0;
	f2 = f17*f6;
	f6 = f10+f11;
	f8 = f16*f7;
	f6 = f6+f8;
	heapFloat[(r2+65)] = f5;
	f0 = f0+f2;
	f2 = f9*f7;
	f0 = f0+f2;
	heapFloat[(r2+66)] = f6;
	heapFloat[(r2+67)] = f0;
	f1 = f1-f5;
	heap32[(r2+68)] = 0;
	f2 = f4-f6;
	heapFloat[(r2+69)] = f1;
	f0 = f3-f0;
	heapFloat[(r2+70)] = f2;
	heapFloat[(r2+71)] = f0;
	heap32[(r2+72)] = 0;
	r3 = (r0 + 332)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	_ZN22btVoronoiSimplexSolver14reduceVerticesERK15btUsageBitfield(i7);
	f0 = heapFloat[(r2+84)];
	f1 =                         0;
	if(f0 >=f1) //_LBB571_48
{
	f0 = heapFloat[(r2+85)];
	if(f0 <f1) //_LBB571_47
{
break _5;
}
else{
	f0 = heapFloat[(r2+86)];
	if(f0 <f1) //_LBB571_47
{
break _5;
}
else{
	f0 = heapFloat[(r2+87)];
	r1 = f0 >= f1;
	r1 = r1 & 1;
break _5;
}
}
}
else{
break _5;
}
}
}
}
	r2 = 1;
	heap8[r0+352] = r2;
	r2 = 0;
	heap8[r0+312] = r2;
	r_g0 = r2;
	return;
}
else{
__label__ = 8;
break _3;
}
}
}
} while(0);
	heap8[r0+312] = r1;
	r0 = r1 & 255;
	r_g0 = r0;
	return;
}
else{
	if(r5 ==0) //_LBB571_8
{
__label__ = 8;
}
else{
	if(r5 ==1) //_LBB571_10
{
	f0 = heapFloat[(r2+21)];
	heapFloat[(r2+61)] = f0;
	f1 = heapFloat[(r2+22)];
	heapFloat[(r2+62)] = f1;
	f2 = heapFloat[(r2+23)];
	heapFloat[(r2+63)] = f2;
	heap32[(r2+64)] = heap32[(r2+24)];
	f3 = heapFloat[(r2+41)];
	heapFloat[(r2+65)] = f3;
	f4 = heapFloat[(r2+42)];
	heapFloat[(r2+66)] = f4;
	f5 = heapFloat[(r2+43)];
	heapFloat[(r2+67)] = f5;
	f0 = f0-f3;
	heap32[(r2+68)] = heap32[(r2+44)];
	f1 = f1-f4;
	heapFloat[(r2+69)] = f0;
	f0 = f2-f5;
	heapFloat[(r2+70)] = f1;
	heapFloat[(r2+71)] = f0;
	r1 = 0;
	heap32[(r2+72)] = 0;
	heap8[r0+352] = r1;
	heap8[r0+332] = r4;
	heap32[(r2+84)] = 1065353216;
	heap32[(r2+85)] = 0;
	heap32[(r2+86)] = 0;
	heap32[(r2+87)] = 0;
	r1 = 1;
__label__ = 9;
}
else{
__label__ = 8;
}
}
}
} while(0);
if (__label__ == 8){
	r1 = 0;
}
	heap8[r0+312] = r1;
	r_g0 = r1;
	return;
}
else{
	r0 = heapU8[r0+312];
	r_g0 = r0;
	return;
}
}