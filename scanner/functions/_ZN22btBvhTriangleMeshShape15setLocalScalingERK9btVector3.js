function _ZN22btBvhTriangleMeshShape15setLocalScalingERK9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+7)];
	heap32[(g0)] = r0;
	r3 = heap32[(fp+1)];
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r3)];
	f1 = heapFloat[(r2)];
	f2 = heapFloat[(r2+1)];
	f3 = heapFloat[(r3+1)];
	f1 = f1-f0;
	f2 = f2-f3;
	f3 = heapFloat[(r2+2)];
	f4 = heapFloat[(r3+2)];
	f3 = f3-f4;
	f1 = f1*f1;
	f2 = f2*f2;
	f1 = f1+f2;
	f2 = f3*f3;
	f1 = f1+f2;
	f2 =   1.1920928955078125e-007;
if(!(f1 <=f2)) //_LBB411_2
{
	r1 = heap32[(r1+12)];
	r1 = r1 >> 2;
	heapFloat[(r1+1)] = f0;
	heap32[(r1+2)] = heap32[(r3+1)];
	heap32[(r1+3)] = heap32[(r3+2)];
	heap32[(r1+4)] = heap32[(r3+3)];
	heap32[(g0)] = r0;
	_ZN19btTriangleMeshShape15recalcLocalAabbEv(i7);
	heap32[(g0)] = r0;
	_ZN22btBvhTriangleMeshShape17buildOptimizedBvhEv(i7);
}
	return;
}