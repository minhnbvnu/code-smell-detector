function _ZNK19btTriangleMeshShape7getAabbERK11btTransformR9btVector3S4_(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	f0 = heapFloat[(r1+10)];
	f1 = heapFloat[(r1+6)];
	f2 = heapFloat[(r1+9)];
	f3 = heapFloat[(r1+5)];
	f4 = heapFloat[(r1+8)];
	f5 = heapFloat[(r1+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f6 = f_g0;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f7 = f_g0;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = heap32[(fp+1)];
	f4 = f4-f5;
	f5 =                       0.5;
	f2 = f2-f3;
	f0 = f0-f1;
	f1 = heapFloat[(r1+10)];
	f3 = heapFloat[(r1+6)];
	f9 = heapFloat[(r1+9)];
	f10 = heapFloat[(r1+5)];
	f11 = heapFloat[(r1+8)];
	f12 = heapFloat[(r1+4)];
	r0 = r0 >> 2;
	f4 = f4*f5;
	f2 = f2*f5;
	f0 = f0*f5;
	f1 = f1+f3;
	f3 = f9+f10;
	f9 = f11+f12;
	f10 = heapFloat[(r0+10)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	f4 = f4+f_g0;
	f2 = f2+f7;
	f0 = f0+f6;
	f1 = f1*f5;
	f3 = f3*f5;
	f5 = f9*f5;
	f6 =                         0;
	if(f10 <f6) //_LBB511_2
{
	f7 = -f10;
}
else{
	f7 = f10;
}
	f8 = heapFloat[(r0+9)];
	if(f8 <f6) //_LBB511_5
{
	f9 = -f8;
}
else{
	f9 = f8;
}
	f11 = heapFloat[(r0+8)];
	if(f11 <f6) //_LBB511_8
{
	f12 = -f11;
}
else{
	f12 = f11;
}
	f13 = heapFloat[(r0+6)];
	if(f13 <f6) //_LBB511_11
{
	f14 = -f13;
}
else{
	f14 = f13;
}
	f15 = heapFloat[(r0+5)];
	if(f15 <f6) //_LBB511_14
{
	f16 = -f15;
}
else{
	f16 = f15;
}
	f17 = heapFloat[(r0+4)];
	if(f17 <f6) //_LBB511_17
{
	f18 = -f17;
}
else{
	f18 = f17;
}
	f19 = heapFloat[(r0+2)];
	if(f19 <f6) //_LBB511_20
{
	f20 = -f19;
}
else{
	f20 = f19;
}
	f21 = heapFloat[(r0+1)];
	if(f21 <f6) //_LBB511_23
{
	f22 = -f21;
}
else{
	f22 = f21;
}
	f23 = heapFloat[(r0)];
	if(f23 <f6) //_LBB511_26
{
	f6 = -f23;
}
else{
	f6 = f23;
}
	f23 = f23*f5;
	f21 = f21*f3;
	f17 = f17*f5;
	f15 = f15*f3;
	f21 = f23+f21;
	f19 = f19*f1;
	f6 = f6*f4;
	f22 = f22*f2;
	f5 = f11*f5;
	f3 = f8*f3;
	f8 = f17+f15;
	f11 = f13*f1;
	f13 = f18*f4;
	f15 = f16*f2;
	f16 = f21+f19;
	f17 = heapFloat[(r0+12)];
	f6 = f6+f22;
	f18 = f20*f0;
	f3 = f5+f3;
	f1 = f10*f1;
	f4 = f12*f4;
	f2 = f9*f2;
	f5 = f8+f11;
	f8 = heapFloat[(r0+13)];
	f9 = heapFloat[(r0+14)];
	f10 = f13+f15;
	f11 = f14*f0;
	f12 = f16+f17;
	f6 = f6+f18;
	f1 = f3+f1;
	r0 = r1 >> 2;
	f2 = f4+f2;
	f0 = f7*f0;
	f3 = f5+f8;
	f4 = f10+f11;
	f5 = f12-f6;
	f1 = f1+f9;
	f0 = f2+f0;
	f2 = f3-f4;
	heapFloat[(r0)] = f5;
	f5 = f1-f0;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f5;
	r1 = r2 >> 2;
	f2 = f12+f6;
	heap32[(r0+3)] = 0;
	f3 = f3+f4;
	heapFloat[(r1)] = f2;
	f0 = f1+f0;
	heapFloat[(r1+1)] = f3;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}