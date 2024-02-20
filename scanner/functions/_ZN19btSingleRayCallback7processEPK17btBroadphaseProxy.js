function _ZN19btSingleRayCallback7processEPK17btBroadphaseProxy(sp)
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
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+54)];
	r3 = r2 >> 2;
	f0 = heapFloat[(r3+1)];
	f1 =                         0;
	if(f0 !=f1) //_LBB233_2
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
	if(r2 !=0) //_LBB233_4
{
	r1 = heap32[(r1+54)];
	r2 = heap32[(r5+48)];
	r3 = (r0 + 68)|0;
	r0 = (r0 + 132)|0;
	r5 = (r4 + 4)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r5;
	heap32[(g0+5)] = r1;
	_ZN16btCollisionWorld13rayTestSingleERK11btTransformS2_P17btCollisionObjectPK16btCollisionShapeS2_RNS_17RayResultCallbackE(i7);
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