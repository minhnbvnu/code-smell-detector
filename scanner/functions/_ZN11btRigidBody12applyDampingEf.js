function _ZN11btRigidBody12applyDampingEf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	f0 = heapFloat[(r1+109)];
	f1 =                         1;
	f2 = heapFloat[(fp+1)];
	f0 = f1-f0;
	heapFloat[(g0)] = f0;
	heapFloat[(g0+1)] = f2;
	powf(i7);
	f3 = heapFloat[(r1+76)];
	f3 = f3*f_g0;
	heapFloat[(r1+76)] = f3;
	f3 = heapFloat[(r1+77)];
	f3 = f3*f_g0;
	heapFloat[(r1+77)] = f3;
	f3 = heapFloat[(r1+78)];
	f0 = f3*f_g0;
	heapFloat[(r1+78)] = f0;
	f0 = heapFloat[(r1+110)];
	f0 = f1-f0;
	heapFloat[(g0)] = f0;
	heapFloat[(g0+1)] = f2;
	powf(i7);
	f2 = heapFloat[(r1+80)];
	f2 = f2*f_g0;
	heapFloat[(r1+80)] = f2;
	f3 = heapFloat[(r1+81)];
	f3 = f3*f_g0;
	heapFloat[(r1+81)] = f3;
	f4 = heapFloat[(r1+82)];
	f0 = f4*f_g0;
	heapFloat[(r1+82)] = f0;
	r0 = heapU8[r0+444];
if(!(r0 ==0)) //_LBB688_14
{
	f4 = f2*f2;
	f5 = f3*f3;
	f6 = heapFloat[(r1+76)];
	f4 = f4+f5;
	f5 = f0*f0;
	f4 = f4+f5;
	f5 = heapFloat[(r1+114)];
	if(f4 <f5) //_LBB688_3
{
	f4 = heapFloat[(r1+77)];
	f5 = heapFloat[(r1+78)];
	f7 = f6*f6;
	f8 = f4*f4;
	f7 = f7+f8;
	f8 = f5*f5;
	f7 = f7+f8;
	f8 = heapFloat[(r1+113)];
	if(f7 <f8) //_LBB688_5
{
	f7 = heapFloat[(r1+112)];
	f2 = f2*f7;
	f3 = f3*f7;
	heapFloat[(r1+80)] = f2;
	f0 = f0*f7;
	heapFloat[(r1+81)] = f3;
	f6 = f6*f7;
	heapFloat[(r1+82)] = f0;
	f4 = f4*f7;
	heapFloat[(r1+76)] = f6;
	f5 = f5*f7;
	heapFloat[(r1+77)] = f4;
	heapFloat[(r1+78)] = f5;
}
}
else{
	f4 = heapFloat[(r1+77)];
	f5 = heapFloat[(r1+78)];
}
	f0 = f6*f6;
	f2 = f4*f4;
	f0 = f0+f2;
	f2 = f5*f5;
	f0 = f0+f2;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f2 = heapFloat[(r1+109)];
if(!(f2 <=f0)) //_LBB688_10
{
	f2 =      0.004999999888241291;
	if(f0 <=f2) //_LBB688_9
{
	heap32[(r1+76)] = 0;
	heap32[(r1+77)] = 0;
	heap32[(r1+78)] = 0;
	heap32[(r1+79)] = 0;
}
else{
	f0 = heapFloat[(r1+76)];
	f3 = heapFloat[(r1+77)];
	f4 = heapFloat[(r1+78)];
	f0 = f0*f0;
	f3 = f3*f3;
	f0 = f0+f3;
	f3 = f4*f4;
	f0 = f0+f3;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f1/f_g0;
	f3 = heapFloat[(r1+76)];
	f4 = heapFloat[(r1+77)];
	f5 = f3*f0;
	f6 = heapFloat[(r1+78)];
	f7 = f4*f0;
	f5 = f5*f2;
	f0 = f6*f0;
	f7 = f7*f2;
	f3 = f3-f5;
	f0 = f0*f2;
	f2 = f4-f7;
	heapFloat[(r1+76)] = f3;
	f0 = f6-f0;
	heapFloat[(r1+77)] = f2;
	heapFloat[(r1+78)] = f0;
}
}
	f0 = heapFloat[(r1+80)];
	f2 = heapFloat[(r1+81)];
	f3 = heapFloat[(r1+82)];
	f0 = f0*f0;
	f2 = f2*f2;
	f0 = f0+f2;
	f2 = f3*f3;
	f0 = f0+f2;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	f2 = heapFloat[(r1+110)];
if(!(f2 <=f0)) //_LBB688_14
{
	f2 =      0.004999999888241291;
	if(f0 <=f2) //_LBB688_13
{
	heap32[(r1+80)] = 0;
	heap32[(r1+81)] = 0;
	heap32[(r1+82)] = 0;
	heap32[(r1+83)] = 0;
}
else{
	f0 = heapFloat[(r1+80)];
	f3 = heapFloat[(r1+81)];
	f4 = heapFloat[(r1+82)];
	f0 = f0*f0;
	f3 = f3*f3;
	f0 = f0+f3;
	f3 = f4*f4;
	f0 = f0+f3;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f1/f_g0;
	f1 = heapFloat[(r1+80)];
	f3 = heapFloat[(r1+81)];
	f4 = f1*f0;
	f5 = heapFloat[(r1+82)];
	f6 = f3*f0;
	f4 = f4*f2;
	f0 = f5*f0;
	f6 = f6*f2;
	f1 = f1-f4;
	f0 = f0*f2;
	f2 = f3-f6;
	heapFloat[(r1+80)] = f1;
	f0 = f5-f0;
	heapFloat[(r1+81)] = f2;
	heapFloat[(r1+82)] = f0;
	return;
}
}
}
	return;
}