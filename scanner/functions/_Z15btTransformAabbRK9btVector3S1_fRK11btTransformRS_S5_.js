function _Z15btTransformAabbRK9btVector3S1_fRK11btTransformRS_S5_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	f0 = heapFloat[(r0)];
	f1 = heapFloat[(r1)];
	if(f0 <=f1) //_LBB254_2
{
	f2 = heapFloat[(r0+1)];
	f3 = heapFloat[(r1+1)];
	if(f2 <=f3) //_LBB254_4
{
	f4 = heapFloat[(r0+2)];
	f5 = heapFloat[(r1+2)];
	if(f4 <=f5) //_LBB254_6
{
	f6 = heapFloat[(fp+2)];
	r0 = heap32[(fp+3)];
	r1 = heap32[(fp+4)];
	r2 = heap32[(fp+5)];
	f7 = f1-f0;
	f8 =                       0.5;
	f9 = f3-f2;
	f10 = f5-f4;
	r0 = r0 >> 2;
	f4 = f5+f4;
	f2 = f3+f2;
	f0 = f1+f0;
	f1 = f7*f8;
	f3 = f9*f8;
	f5 = f10*f8;
	f7 = heapFloat[(r0+10)];
	f1 = f1+f6;
	f3 = f3+f6;
	f5 = f5+f6;
	f4 = f4*f8;
	f2 = f2*f8;
	f0 = f0*f8;
	f6 =                         0;
	if(f7 <f6) //_LBB254_8
{
	f8 = -f7;
}
else{
	f8 = f7;
}
	f9 = heapFloat[(r0+9)];
	if(f9 <f6) //_LBB254_11
{
	f10 = -f9;
}
else{
	f10 = f9;
}
	f11 = heapFloat[(r0+8)];
	if(f11 <f6) //_LBB254_14
{
	f12 = -f11;
}
else{
	f12 = f11;
}
	f13 = heapFloat[(r0+6)];
	if(f13 <f6) //_LBB254_17
{
	f14 = -f13;
}
else{
	f14 = f13;
}
	f15 = heapFloat[(r0+5)];
	if(f15 <f6) //_LBB254_20
{
	f16 = -f15;
}
else{
	f16 = f15;
}
	f17 = heapFloat[(r0+4)];
	if(f17 <f6) //_LBB254_23
{
	f18 = -f17;
}
else{
	f18 = f17;
}
	f19 = heapFloat[(r0+2)];
	if(f19 <f6) //_LBB254_26
{
	f20 = -f19;
}
else{
	f20 = f19;
}
	f21 = heapFloat[(r0+1)];
	if(f21 <f6) //_LBB254_29
{
	f22 = -f21;
}
else{
	f22 = f21;
}
	f23 = heapFloat[(r0)];
	if(f23 <f6) //_LBB254_32
{
	f6 = -f23;
}
else{
	f6 = f23;
}
	f23 = f23*f0;
	f21 = f21*f2;
	f17 = f17*f0;
	f15 = f15*f2;
	f21 = f23+f21;
	f19 = f19*f4;
	f6 = f6*f1;
	f22 = f22*f3;
	f0 = f11*f0;
	f2 = f9*f2;
	f9 = f17+f15;
	f11 = f13*f4;
	f13 = f18*f1;
	f15 = f16*f3;
	f16 = f21+f19;
	f17 = heapFloat[(r0+12)];
	f6 = f6+f22;
	f18 = f20*f5;
	f0 = f0+f2;
	f2 = f7*f4;
	f1 = f12*f1;
	f3 = f10*f3;
	f4 = f9+f11;
	f7 = heapFloat[(r0+13)];
	f9 = heapFloat[(r0+14)];
	f10 = f13+f15;
	f11 = f14*f5;
	f12 = f16+f17;
	f6 = f6+f18;
	f0 = f0+f2;
	r0 = r1 >> 2;
	f1 = f1+f3;
	f2 = f8*f5;
	f3 = f4+f7;
	f4 = f10+f11;
	f5 = f12-f6;
	f0 = f0+f9;
	f1 = f1+f2;
	f2 = f3-f4;
	heapFloat[(r0)] = f5;
	f5 = f0-f1;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f5;
	r1 = r2 >> 2;
	f2 = f12+f6;
	heap32[(r0+3)] = 0;
	f3 = f3+f4;
	heapFloat[(r1)] = f2;
	f0 = f0+f1;
	heapFloat[(r1+1)] = f3;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}
else{
	r0 = _2E_str5104;
	r1 = _2E_str3102;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 199;
	_assert(i7);
}
}
else{
	r0 = _2E_str4103;
	r1 = _2E_str3102;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 198;
	_assert(i7);
}
}
else{
	r0 = _2E_str2101;
	r1 = _2E_str3102;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 197;
	_assert(i7);
}
}