function _ZN28btTriangleConvexcastCallback15processTriangleEP9btVector3ii(sp)
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
	var f2;
var __label__ = 0;
	i7 = sp + -696;var g0 = i7>>2; // save stack
	r0 = sp + -104;
	r1 = r0 >> 2;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 1065353216;
	heap32[(r1+4)] = 1065353216;
	r2 = _ZTV15btTriangleShape;
	heap32[(r1+5)] = 1065353216;
	r2 = (r2 + 8)|0;
	heap32[(r1+6)] = 0;
	r3 = heap32[(fp+1)];
	heap32[(fp+-26)] = r2;
	r2 = r3 >> 2;
	heap32[(r1+1)] = 1;
	heap32[(r1+13)] = heap32[(r2)];
	heap32[(r1+14)] = heap32[(r2+1)];
	heap32[(r1+15)] = heap32[(r2+2)];
	heap32[(r1+16)] = heap32[(r2+3)];
	heap32[(r1+17)] = heap32[(r2+4)];
	heap32[(r1+18)] = heap32[(r2+5)];
	heap32[(r1+19)] = heap32[(r2+6)];
	heap32[(r1+20)] = heap32[(r2+7)];
	heap32[(r1+21)] = heap32[(r2+8)];
	heap32[(r1+22)] = heap32[(r2+9)];
	r3 = heap32[(fp)];
	heap32[(r1+23)] = heap32[(r2+10)];
	r4 = sp + -464;
	r5 = r3 >> 2;
	heap32[(r1+24)] = heap32[(r2+11)];
	r2 = r4 >> 2;
	heap32[(r1+11)] = heap32[(r5+51)];
	r1 = _ZTV30btGjkEpaPenetrationDepthSolver;
	r6 = 0;
	heap32[(r2+77)] = 953267991;
	r1 = (r1 + 8)|0;
	heap8[sp+-132] = r6;
	heap32[(fp+-118)] = r1;
	r1 = _ZTV27btContinuousConvexCollision;
	r2 = sp + -496;
	r6 = heap32[(r5+1)];
	r1 = (r1 + 8)|0;
	r7 = r2 >> 2;
	heap32[(fp+-124)] = r1;
	r1 = sp + -472;
	heap32[(r7+1)] = r4;
	heap32[(r7+2)] = r1;
	r1 = _ZTVN12btConvexCast10CastResultE;
	heap32[(r7+3)] = r6;
	r4 = sp + -672;
	r1 = (r1 + 8)|0;
	heap32[(r7+4)] = r0;
	r0 = r4 >> 2;
	heap32[(fp+-168)] = r1;
	heap32[(r0+42)] = 0;
	heap32[(r0+43)] = 0;
	heap32[(r0+41)] = 1065353216;
	r1 = (r3 + 136)|0;
	r6 = (r3 + 8)|0;
	r7 = (r3 + 72)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r1;
	heap32[(g0+5)] = r4;
	_ZN27btContinuousConvexCollision16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(i7);
	r1 = r_g0;
if(!(r1 ==0)) //_LBB563_4
{
	f0 = heapFloat[(r0+33)];
	f1 = heapFloat[(r0+34)];
	f2 = heapFloat[(r0+35)];
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	f1 =   9.9999997473787516e-005;
if(!(f0 <=f1)) //_LBB563_4
{
	f1 = heapFloat[(r0+41)];
	f2 = heapFloat[(r5+50)];
if(!(f1 >=f2)) //_LBB563_4
{
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	f0 = f1/f_g0;
	f1 = heapFloat[(r0+33)];
	f1 = f1*f0;
	heapFloat[(r0+33)] = f1;
	f1 = heapFloat[(r0+34)];
	f1 = f1*f0;
	heapFloat[(r0+34)] = f1;
	f1 = heapFloat[(r0+35)];
	f0 = f1*f0;
	heapFloat[(r0+35)] = f0;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+3)];
	f0 = heapFloat[(r0+41)];
	r0 = (r4 + 132)|0;
	r4 = (r4 + 148)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heapFloat[(g0+3)] = f0;
	heap32[(g0+4)] = r1;
	heap32[(g0+5)] = r2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
}
}
	return;
}