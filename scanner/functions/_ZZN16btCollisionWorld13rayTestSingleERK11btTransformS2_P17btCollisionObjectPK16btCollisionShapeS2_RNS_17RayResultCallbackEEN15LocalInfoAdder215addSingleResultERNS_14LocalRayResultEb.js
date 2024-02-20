function _ZZN16btCollisionWorld13rayTestSingleERK11btTransformS2_P17btCollisionObjectPK16btCollisionShapeS2_RNS_17RayResultCallbackEEN15LocalInfoAdder215addSingleResultERNS_14LocalRayResultEb(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = sp + -8;
	r0 = r0 >> 2;
	heap32[(fp+-2)] = -1;
	r2 = heap32[(fp+1)];
	r3 = r1 >> 2;
	r4 = heap32[(r0+6)];
	r5 = r2 >> 2;
	heap32[(r3+1)] = r4;
	r3 = heap32[(r5+1)];
if(!(r3 !=0)) //_LBB205_2
{
	heap32[(r5+1)] = r1;
}
	r1 = heap32[(fp+2)];
	r3 = heap32[(r0+5)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+3)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r1 = heap32[(r0+5)];
	r1 = r1 >> 2;
	heap32[(r0+1)] = heap32[(r1+1)];
	return;
}