function _ZN22btCompoundLeafCallback7ProcessEPK10btDbvtNode(sp)
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
var __label__ = 0;
	i7 = sp + -136;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r3 = heap32[(fp+1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+48)];
	r4 = r3 >> 2;
	r4 = heap32[(r4+9)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+6)];
	r5 = (r4 * 80)|0;
	r6 = heap32[(r1+4)];
	r2 = (r2 + r5)|0;
	r5 = r6 >> 2;
	r2 = r2 >> 2;
	r5 = heap32[(r5+5)];
	r2 = heap32[(r2+16)];
if(!(r5 ==0)) //_LBB251_3
{
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+12)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r5 = r_g0 & 2;
if(!(r5 ==0)) //_LBB251_3
{
	r5 = heap32[(r1+1)];
	r6 = sp + -112;
	r5 = r5 >> 2;
	r7 = r6 >> 2;
	heap32[(fp+-28)] = heap32[(r5+1)];
	heap32[(r7+1)] = heap32[(r5+2)];
	heap32[(r7+2)] = heap32[(r5+3)];
	heap32[(r7+3)] = heap32[(r5+4)];
	heap32[(r7+4)] = heap32[(r5+5)];
	heap32[(r7+5)] = heap32[(r5+6)];
	heap32[(r7+6)] = heap32[(r5+7)];
	heap32[(r7+7)] = heap32[(r5+8)];
	heap32[(r7+8)] = heap32[(r5+9)];
	heap32[(r7+9)] = heap32[(r5+10)];
	heap32[(r7+10)] = heap32[(r5+11)];
	heap32[(r7+11)] = heap32[(r5+12)];
	heap32[(r7+12)] = heap32[(r5+13)];
	heap32[(r7+13)] = heap32[(r5+14)];
	heap32[(r7+14)] = heap32[(r5+15)];
	heap32[(r7+15)] = heap32[(r5+16)];
	r5 = (r3 + 16)|0;
	r7 = sp + -32;
	r8 = sp + -48;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 0;
	heap32[(g0+3)] = r6;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r8;
	_Z15btTransformAabbRK9btVector3S1_fRK11btTransformRS_S5_(i7);
	r1 = heap32[(r1+4)];
	r1 = r1 >> 2;
	r3 = heap32[(r1+5)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+13)];
	r5 = sp + -16;
	r6 = r5 >> 2;
	heap32[(fp+-4)] = 1065353216;
	heap32[(r6+1)] = 0;
	heap32[(r6+2)] = 0;
	heap32[(r6+3)] = 0;
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	_ZN22btCompoundLeafCallback17ProcessChildShapeEP16btCollisionShapei(i7);
	return;
}