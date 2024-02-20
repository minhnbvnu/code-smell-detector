function _ZZNK19btTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_EN16FilteredCallback28internalProcessTriangleIndexEPS2_ii(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(fp)];
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r1+4)];
	f2 = heapFloat[(r1+8)];
	f3 = f0 < f1 ? f0 : f1;
	r2 = r2 >> 2;
	f3 = f3 < f2 ? f3 : f2;
	f4 = heapFloat[(r2+6)];
if(!(f3 >f4)) //_LBB520_7
{
	f0 = f0 > f1 ? f0 : f1;
	f0 = f0 > f2 ? f0 : f2;
	f1 = heapFloat[(r2+2)];
if(!(f0 <f1)) //_LBB520_7
{
	f0 = heapFloat[(r1+2)];
	f1 = heapFloat[(r1+6)];
	f2 = heapFloat[(r1+10)];
	f3 = f0 < f1 ? f0 : f1;
	f3 = f3 < f2 ? f3 : f2;
	f4 = heapFloat[(r2+8)];
if(!(f3 >f4)) //_LBB520_7
{
	f0 = f0 > f1 ? f0 : f1;
	f0 = f0 > f2 ? f0 : f2;
	f1 = heapFloat[(r2+4)];
if(!(f0 <f1)) //_LBB520_7
{
	f0 = heapFloat[(r1+1)];
	f1 = heapFloat[(r1+5)];
	f2 = heapFloat[(r1+9)];
	f3 = f0 < f1 ? f0 : f1;
	f3 = f3 < f2 ? f3 : f2;
	f4 = heapFloat[(r2+7)];
if(!(f3 >f4)) //_LBB520_7
{
	f0 = f0 > f1 ? f0 : f1;
	f0 = f0 > f2 ? f0 : f2;
	f1 = heapFloat[(r2+3)];
if(!(f0 <f1)) //_LBB520_7
{
	r1 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r2 = heap32[(r2+1)];
	r4 = r2 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r3;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
}
}
}
}
}
	return;
}