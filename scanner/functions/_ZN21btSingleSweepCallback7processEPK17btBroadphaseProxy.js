function _ZN21btSingleSweepCallback7processEPK17btBroadphaseProxy(sp)
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
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+46)];
	r3 = r2 >> 2;
	f0 = heapFloat[(r3+1)];
	f1 =                         0;
	if(f0 !=f1) //_LBB230_2
{
	r4 = heap32[(fp+1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r5 = r4 >> 2;
	r3 = heap32[(r3+2)];
	r6 = heap32[(r5+47)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r_g0;
	if(r2 !=0) //_LBB230_4
{
	f0 = heapFloat[(r1+47)];
	r2 = heap32[(r1+46)];
	r3 = heap32[(r5+48)];
	r1 = heap32[(r1+48)];
	r5 = (r0 + 36)|0;
	r0 = (r0 + 100)|0;
	r6 = (r4 + 4)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r3;
	heap32[(g0+5)] = r6;
	heap32[(g0+6)] = r2;
	heapFloat[(g0+7)] = f0;
	_ZN16btCollisionWorld17objectQuerySingleEPK13btConvexShapeRK11btTransformS5_P17btCollisionObjectPK16btCollisionShapeS5_RNS_20ConvexResultCallbackEf(i7);
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	r0 = 1;
}
}
else{
	r0 = 0;
}
	r0 = r0 & 255;
	r_g0 = r0;
	return;
}