function _ZN21btConvexInternalShape15setLocalScalingERK9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	f0 = heapFloat[(r0+2)];
	r1 = heap32[(fp)];
	f1 =                         0;
	if(f0 <f1) //_LBB456_2
{
	f0 = -f0;
}
	f2 = heapFloat[(r0+1)];
	if(f2 <f1) //_LBB456_5
{
	f2 = -f2;
}
	f3 = heapFloat[(r0)];
	if(f3 <f1) //_LBB456_8
{
	f3 = -f3;
}
	r0 = r1 >> 2;
	heapFloat[(r0+3)] = f3;
	heapFloat[(r0+4)] = f2;
	heapFloat[(r0+5)] = f0;
	heap32[(r0+6)] = 0;
	return;
}