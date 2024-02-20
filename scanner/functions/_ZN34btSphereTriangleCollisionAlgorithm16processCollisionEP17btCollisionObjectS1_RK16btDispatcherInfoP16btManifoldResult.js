function _ZN34btSphereTriangleCollisionAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
	var r7;
	var r8;
	var r9;
	var r10;
	var f0;
var __label__ = 0;
	i7 = sp + -176;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+3)];
if(!(r2 ==0)) //_LBB365_8
{
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	r6 = heap32[(fp+4)];
	r7 = heapU8[r0+16];
	r8 = r7 == 0 ? r4 : r3;
	r3 = r7 == 0 ? r3 : r4;
	r4 = r8 >> 2;
	r3 = r3 >> 2;
	r7 = heap32[(r4+48)];
	r8 = heap32[(r3+48)];
	r9 = r6 >> 2;
	heap32[(r9+1)] = r2;
	r1 = heap32[(r1+3)];
	r1 = r1 >> 2;
	f0 = heapFloat[(r1+280)];
	r1 = _ZTV22SphereTriangleDetector;
	r2 = sp + -16;
	r1 = (r1 + 8)|0;
	r10 = r2 >> 2;
	heap32[(fp+-4)] = r1;
	heap32[(r10+1)] = r8;
	r1 = sp + -152;
	heap32[(r10+2)] = r7;
	r7 = r1 >> 2;
	heapFloat[(r10+3)] = f0;
	heap32[(r7+33)] = 0;
	heap32[(r7+32)] = 1566444395;
	heap32[(fp+-38)] = heap32[(r3+1)];
	heap32[(r7+1)] = heap32[(r3+2)];
	heap32[(r7+2)] = heap32[(r3+3)];
	heap32[(r7+3)] = heap32[(r3+4)];
	heap32[(r7+4)] = heap32[(r3+5)];
	heap32[(r7+5)] = heap32[(r3+6)];
	heap32[(r7+6)] = heap32[(r3+7)];
	heap32[(r7+7)] = heap32[(r3+8)];
	heap32[(r7+8)] = heap32[(r3+9)];
	heap32[(r7+9)] = heap32[(r3+10)];
	heap32[(r7+10)] = heap32[(r3+11)];
	heap32[(r7+11)] = heap32[(r3+12)];
	heap32[(r7+12)] = heap32[(r3+13)];
	heap32[(r7+13)] = heap32[(r3+14)];
	heap32[(r7+14)] = heap32[(r3+15)];
	heap32[(r7+15)] = heap32[(r3+16)];
	heap32[(r7+16)] = heap32[(r4+1)];
	heap32[(r7+17)] = heap32[(r4+2)];
	heap32[(r7+18)] = heap32[(r4+3)];
	heap32[(r7+19)] = heap32[(r4+4)];
	heap32[(r7+20)] = heap32[(r4+5)];
	heap32[(r7+21)] = heap32[(r4+6)];
	heap32[(r7+22)] = heap32[(r4+7)];
	heap32[(r7+23)] = heap32[(r4+8)];
	heap32[(r7+24)] = heap32[(r4+9)];
	heap32[(r7+25)] = heap32[(r4+10)];
	heap32[(r7+26)] = heap32[(r4+11)];
	heap32[(r7+27)] = heap32[(r4+12)];
	heap32[(r7+28)] = heap32[(r4+13)];
	heap32[(r7+29)] = heap32[(r4+14)];
	heap32[(r7+30)] = heap32[(r4+15)];
	heap32[(r7+31)] = heap32[(r4+16)];
	r3 = r5 >> 2;
	r4 = heapU8[r0+16];
	r3 = heap32[(r3+5)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	_ZN22SphereTriangleDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r0 = heapU8[r0+8];
if(!(r0 ==0)) //_LBB365_8
{
	r0 = heap32[(r9+1)];
	if(r0 !=0) //_LBB365_4
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
if(!(r2 ==0)) //_LBB365_8
{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r9+34)];
	if(r1 ==r2) //_LBB365_7
{
	r1 = (r6 + 8)|0;
	r2 = (r6 + 72)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
}
else{
	r1 = (r6 + 72)|0;
	r6 = (r6 + 8)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}
}
}
else{
	r0 = _2E_str59;
	r6 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
}
	return;
}