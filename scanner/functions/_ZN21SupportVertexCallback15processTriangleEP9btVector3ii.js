function _ZN21SupportVertexCallback15processTriangleEP9btVector3ii(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	f0 = heapFloat[(r1+22)];
	f1 = heapFloat[(r0)];
	f2 = heapFloat[(r1+23)];
	f3 = heapFloat[(r0+1)];
	f4 = heapFloat[(r1+24)];
	f5 = heapFloat[(r0+2)];
	f1 = f0*f1;
	f3 = f2*f3;
	f1 = f1+f3;
	f3 = f4*f5;
	f5 = heapFloat[(r1+21)];
	f1 = f1+f3;
	if(f5 <f1) //_LBB515_2
{
	heapFloat[(r1+21)] = f1;
	heap32[(r1+1)] = heap32[(r0)];
	heap32[(r1+2)] = heap32[(r0+1)];
	heap32[(r1+3)] = heap32[(r0+2)];
	heap32[(r1+4)] = heap32[(r0+3)];
	f5 = f1;
}
	f1 = heapFloat[(r0+4)];
	f3 = heapFloat[(r0+5)];
	f1 = f0*f1;
	f3 = f2*f3;
	f6 = heapFloat[(r0+6)];
	f1 = f1+f3;
	f3 = f4*f6;
	f1 = f1+f3;
	if(f5 <f1) //_LBB515_7
{
	heapFloat[(r1+21)] = f1;
	heap32[(r1+1)] = heap32[(r0+4)];
	heap32[(r1+2)] = heap32[(r0+5)];
	heap32[(r1+3)] = heap32[(r0+6)];
	heap32[(r1+4)] = heap32[(r0+7)];
	f5 = f1;
}
	f1 = heapFloat[(r0+8)];
	f3 = heapFloat[(r0+9)];
	f0 = f0*f1;
	f1 = f2*f3;
	f2 = heapFloat[(r0+10)];
	f0 = f0+f1;
	f1 = f4*f2;
	f0 = f0+f1;
	if(f5 <f0) //_LBB515_8
{
	heapFloat[(r1+21)] = f0;
	heap32[(r1+1)] = heap32[(r0+8)];
	heap32[(r1+2)] = heap32[(r0+9)];
	heap32[(r1+3)] = heap32[(r0+10)];
	heap32[(r1+4)] = heap32[(r0+11)];
	return;
}
else{
	return;
}
}