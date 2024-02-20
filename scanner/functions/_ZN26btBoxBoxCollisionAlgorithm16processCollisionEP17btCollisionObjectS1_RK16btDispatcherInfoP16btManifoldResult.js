function _ZN26btBoxBoxCollisionAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
var __label__ = 0;
	i7 = sp + -176;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r1 = heap32[(r1+3)];
if(!(r1 ==0)) //_LBB161_8
{
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	r5 = heap32[(fp+4)];
	r3 = r3 >> 2;
	r2 = r2 >> 2;
	r6 = heap32[(r3+48)];
	r7 = heap32[(r2+48)];
	r8 = sp + -136;
	r9 = r5 >> 2;
	r10 = r8 >> 2;
	heap32[(r9+1)] = r1;
	heap32[(r10+33)] = 0;
	heap32[(r10+32)] = 1566444395;
	heap32[(fp+-34)] = heap32[(r2+1)];
	heap32[(r10+1)] = heap32[(r2+2)];
	heap32[(r10+2)] = heap32[(r2+3)];
	heap32[(r10+3)] = heap32[(r2+4)];
	heap32[(r10+4)] = heap32[(r2+5)];
	heap32[(r10+5)] = heap32[(r2+6)];
	heap32[(r10+6)] = heap32[(r2+7)];
	heap32[(r10+7)] = heap32[(r2+8)];
	heap32[(r10+8)] = heap32[(r2+9)];
	heap32[(r10+9)] = heap32[(r2+10)];
	heap32[(r10+10)] = heap32[(r2+11)];
	heap32[(r10+11)] = heap32[(r2+12)];
	heap32[(r10+12)] = heap32[(r2+13)];
	heap32[(r10+13)] = heap32[(r2+14)];
	heap32[(r10+14)] = heap32[(r2+15)];
	heap32[(r10+15)] = heap32[(r2+16)];
	heap32[(r10+16)] = heap32[(r3+1)];
	heap32[(r10+17)] = heap32[(r3+2)];
	heap32[(r10+18)] = heap32[(r3+3)];
	heap32[(r10+19)] = heap32[(r3+4)];
	heap32[(r10+20)] = heap32[(r3+5)];
	heap32[(r10+21)] = heap32[(r3+6)];
	heap32[(r10+22)] = heap32[(r3+7)];
	heap32[(r10+23)] = heap32[(r3+8)];
	heap32[(r10+24)] = heap32[(r3+9)];
	heap32[(r10+25)] = heap32[(r3+10)];
	heap32[(r10+26)] = heap32[(r3+11)];
	heap32[(r10+27)] = heap32[(r3+12)];
	heap32[(r10+28)] = heap32[(r3+13)];
	heap32[(r10+29)] = heap32[(r3+14)];
	r1 = _ZTV16btBoxBoxDetector;
	heap32[(r10+30)] = heap32[(r3+15)];
	r2 = sp + -152;
	r1 = (r1 + 8)|0;
	heap32[(r10+31)] = heap32[(r3+16)];
	r3 = r2 >> 2;
	heap32[(fp+-38)] = r1;
	heap32[(r3+1)] = r7;
	r1 = r4 >> 2;
	heap32[(r3+2)] = r6;
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = 0;
	_ZN16btBoxBoxDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r0 = heapU8[r0+8];
if(!(r0 ==0)) //_LBB161_8
{
	r0 = heap32[(r9+1)];
	if(r0 !=0) //_LBB161_4
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
if(!(r2 ==0)) //_LBB161_8
{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r9+34)];
	if(r1 ==r2) //_LBB161_7
{
	r1 = (r5 + 8)|0;
	r2 = (r5 + 72)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
}
else{
	r1 = (r5 + 72)|0;
	r5 = (r5 + 8)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r5;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}
}
}
else{
	r0 = _2E_str59;
	r5 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
}
	return;
}