function _ZN23btDiscreteDynamicsWorld21removeCollisionObjectEP17btCollisionObject(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heapU8[r0+232];
	r2 = r2 & 2;
if(!(r2 ==0)) //_LBB663_3
{
if(!(r0 ==0)) //_LBB663_3
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+21)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	return;
}
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	_ZN16btCollisionWorld21removeCollisionObjectEP17btCollisionObject(i7);
	return;
}