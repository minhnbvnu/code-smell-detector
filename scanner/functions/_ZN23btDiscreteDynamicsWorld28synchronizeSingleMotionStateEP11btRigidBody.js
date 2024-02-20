function _ZN23btDiscreteDynamicsWorld28synchronizeSingleMotionStateEP11btRigidBody(sp)
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
	i7 = sp + -96;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	if(r0 !=0) //_LBB666_2
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+118)];
if(!(r2 ==0)) //_LBB666_4
{
	r2 = heapU8[r0+204];
	r2 = r2 & 3;
	if(r2 ==0) //_LBB666_5
{
	r2 = heap32[(fp)];
	r2 = r2 >> 2;
	f0 = heapFloat[(r2+60)];
	f1 = heapFloat[(r1+60)];
	f2 = heapFloat[(r1+33)];
	f3 = heapFloat[(r1+34)];
	f4 = heapFloat[(r1+35)];
	r2 = sp + -64;
	r3 = (r0 + 68)|0;
	r0 = (r0 + 148)|0;
	f0 = f0*f1;
	heap32[(g0)] = r3;
	heapFloat[(g0+1)] = f2;
	heapFloat[(g0+2)] = f3;
	heapFloat[(g0+3)] = f4;
	heap32[(g0+4)] = r0;
	heapFloat[(g0+5)] = f0;
	heap32[(g0+6)] = r2;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	r0 = heap32[(r1+118)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}
}
	return;
}
else{
	r0 = _2E_str13100;
	r1 = _2E_str1461;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 184;
	_assert(i7);
}
}