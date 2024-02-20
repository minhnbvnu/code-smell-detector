function _Z15btTransformAabbRK9btVector3fRK11btTransformRS_S5_(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+4)];
	r0 = r0 >> 2;
	f0 = heapFloat[(fp+2)];
	f1 = heapFloat[(fp+3)];
	f2 = heapFloat[(fp+1)];
	f3 = heapFloat[(fp)];
	f4 = heapFloat[(r0+10)];
	r1 = heap32[(fp+5)];
	r2 = heap32[(fp+6)];
	f0 = f0+f1;
	f2 = f2+f1;
	f1 = f3+f1;
	f3 =                         0;
	if(f4 <f3) //_LBB373_2
{
	f4 = -f4;
}
	f5 = heapFloat[(r0+9)];
	if(f5 <f3) //_LBB373_5
{
	f5 = -f5;
}
	f6 = heapFloat[(r0+8)];
	if(f6 <f3) //_LBB373_8
{
	f6 = -f6;
}
	f7 = heapFloat[(r0+6)];
	if(f7 <f3) //_LBB373_11
{
	f7 = -f7;
}
	f8 = heapFloat[(r0+5)];
	if(f8 <f3) //_LBB373_14
{
	f8 = -f8;
}
	f9 = heapFloat[(r0+4)];
	if(f9 <f3) //_LBB373_17
{
	f9 = -f9;
}
	f10 = heapFloat[(r0+2)];
	if(f10 <f3) //_LBB373_20
{
	f10 = -f10;
}
	f11 = heapFloat[(r0+1)];
	if(f11 <f3) //_LBB373_23
{
	f11 = -f11;
}
	f12 = heapFloat[(r0)];
	if(f12 <f3) //_LBB373_26
{
	f12 = -f12;
}
	f3 = f12*f1;
	f11 = f11*f2;
	f9 = f9*f1;
	f8 = f8*f2;
	f3 = f3+f11;
	f10 = f10*f0;
	f1 = f6*f1;
	f2 = f5*f2;
	f5 = f9+f8;
	f6 = f7*f0;
	f3 = f3+f10;
	f7 = heapFloat[(r0+12)];
	f8 = heapFloat[(r0+13)];
	f9 = heapFloat[(r0+14)];
	f5 = f5+f6;
	r0 = r1 >> 2;
	f1 = f1+f2;
	f0 = f4*f0;
	f2 = f7-f3;
	f0 = f1+f0;
	f1 = f8-f5;
	heapFloat[(r0)] = f2;
	f2 = f9-f0;
	heapFloat[(r0+1)] = f1;
	heapFloat[(r0+2)] = f2;
	r1 = r2 >> 2;
	f1 = f7+f3;
	heap32[(r0+3)] = 0;
	f2 = f8+f5;
	heapFloat[(r1)] = f1;
	f0 = f9+f0;
	heapFloat[(r1+1)] = f2;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}