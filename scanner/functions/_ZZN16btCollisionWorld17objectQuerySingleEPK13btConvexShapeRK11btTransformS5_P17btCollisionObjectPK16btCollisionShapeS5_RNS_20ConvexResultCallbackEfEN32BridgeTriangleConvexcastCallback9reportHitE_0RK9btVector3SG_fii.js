function _ZZN16btCollisionWorld17objectQuerySingleEPK13btConvexShapeRK11btTransformS5_P17btCollisionObjectPK16btCollisionShapeS5_RNS_20ConvexResultCallbackEfEN32BridgeTriangleConvexcastCallback9reportHitE_0RK9btVector3SG_fii(sp)
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
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -72;var g0 = i7>>2; // save stack
	r0 = sp + -8;
	r1 = heap32[(fp+4)];
	r2 = heap32[(fp)];
	r3 = r0 >> 2;
	r4 = heap32[(fp+5)];
	heap32[(fp+-2)] = r1;
	r1 = r2 >> 2;
	heap32[(r3+1)] = r4;
	r2 = heap32[(r1+52)];
	f0 = heapFloat[(fp+3)];
	r3 = r2 >> 2;
	f1 = heapFloat[(r3+1)];
	if(f1 <f0) //_LBB207_2
{
	f_g0 = f0;
	return;
}
else{
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp+2)];
	r1 = heap32[(r1+53)];
	r6 = sp + -56;
	r7 = r6 >> 2;
	heap32[(fp+-14)] = r1;
	r1 = r4 >> 2;
	heap32[(r7+1)] = r0;
	heap32[(r7+2)] = heap32[(r1)];
	heap32[(r7+3)] = heap32[(r1+1)];
	heap32[(r7+4)] = heap32[(r1+2)];
	r0 = r5 >> 2;
	heap32[(r7+5)] = heap32[(r1+3)];
	heap32[(r7+6)] = heap32[(r0)];
	heap32[(r7+7)] = heap32[(r0+1)];
	heap32[(r7+8)] = heap32[(r0+2)];
	heap32[(r7+9)] = heap32[(r0+3)];
	heapFloat[(r7+10)] = f0;
	r0 = heap32[(r3)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 0;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
}
}