function _ZN23btConvexConvexAlgorithm21calculateTimeOfImpactEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
	var r11;
	var r12;
	var r13;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -1240;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+2)];
	r3 = r2 >> 2;
	f0 = heapFloat[(r1+29)];
	f1 = heapFloat[(r1+13)];
	f2 = heapFloat[(r1+30)];
	f3 = heapFloat[(r1+14)];
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = heapFloat[(r1+31)];
	f3 = heapFloat[(r1+15)];
	f2 = f2-f3;
	f0 = f0*f0;
	f1 = f1*f1;
	f3 = heapFloat[(r1+62)];
	f0 = f0+f1;
	f1 = f2*f2;
	f2 = f3*f3;
	f0 = f0+f1;
if(!(f2 <=f0)) //_LBB300_2
{
	f0 = heapFloat[(r3+31)];
	f1 = heapFloat[(r3+15)];
	f2 = heapFloat[(r3+30)];
	f3 = heapFloat[(r3+14)];
	f4 = heapFloat[(r3+29)];
	f5 = heapFloat[(r3+13)];
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = f4-f5;
	f2 = f2*f2;
	f1 = f1*f1;
	f3 = heapFloat[(r3+62)];
	f1 = f2+f1;
	f0 = f0*f0;
	f2 = f3*f3;
	f0 = f1+f0;
	if(f2 >f0) //_LBB300_16
{
	f0 =                         1;
	f_g0 = f0;
	return;
}
}
	r4 = sp + -56;
	r5 = heap32[(r1+48)];
	f0 = heapFloat[(r3+61)];
	r6 = r4 >> 2;
	heap32[(r6+2)] = 0;
	heap32[(r6+3)] = 1065353216;
	heap32[(r6+4)] = 1065353216;
	r7 = _ZTV13btSphereShape;
	heap32[(r6+5)] = 1065353216;
	r7 = (r7 + 8)|0;
	heap32[(r6+6)] = 0;
	heap32[(fp+-14)] = r7;
	heap32[(r6+1)] = 8;
	r8 = _ZTVN12btConvexCast10CastResultE;
	heapFloat[(r6+7)] = f0;
	r9 = sp + -232;
	r8 = (r8 + 8)|0;
	heapFloat[(r6+11)] = f0;
	r6 = r9 >> 2;
	heap32[(fp+-58)] = r8;
	heap32[(r6+41)] = 1566444395;
	r10 = sp + -592;
	heap32[(r6+42)] = 0;
	r11 = r10 >> 2;
	heap32[(r6+43)] = 0;
	r12 = _ZTV15btGjkConvexCast;
	r13 = 0;
	heap32[(r11+77)] = 953267991;
	r11 = sp + -608;
	r12 = (r12 + 8)|0;
	heap8[sp+-260] = r13;
	r13 = r11 >> 2;
	heap32[(fp+-152)] = r12;
	heap32[(r13+1)] = r10;
	heap32[(r13+2)] = r5;
	heap32[(r13+3)] = r4;
	r4 = (r2 + 68)|0;
	r2 = (r2 + 4)|0;
	r5 = (r0 + 68)|0;
	r0 = (r0 + 4)|0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r9;
	_ZN15btGjkConvexCast16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(i7);
	r9 = r_g0;
	if(r9 !=0) //_LBB300_4
{
	f0 = heapFloat[(r6+41)];
	f1 = heapFloat[(r1+60)];
if(!(f1 <=f0)) //_LBB300_6
{
	heapFloat[(r1+60)] = f0;
}
	f1 = heapFloat[(r3+60)];
if(!(f1 <=f0)) //_LBB300_8
{
	heapFloat[(r3+60)] = f0;
}
	f1 =                         1;
	if(f0 >=f1) //_LBB300_3
{
__label__ = 3;
}
else{
__label__ = 9;
}
}
else{
__label__ = 3;
}
if (__label__ == 3){
	f0 =                         1;
}
	r6 = _ZTV12btConvexCast;
	r9 = _ZTV13btConvexShape;
	r6 = (r6 + 8)|0;
	r9 = (r9 + 8)|0;
	heap32[(fp+-152)] = r6;
	heap32[(fp+-14)] = r9;
	r6 = sp + -664;
	r9 = heap32[(r3+48)];
	f1 = heapFloat[(r1+61)];
	r10 = r6 >> 2;
	heap32[(r10+2)] = 0;
	heap32[(r10+3)] = 1065353216;
	heap32[(r10+4)] = 1065353216;
	heap32[(r10+5)] = 1065353216;
	heap32[(r10+6)] = 0;
	heap32[(fp+-166)] = r7;
	heap32[(r10+1)] = 8;
	heapFloat[(r10+7)] = f1;
	r7 = sp + -840;
	heapFloat[(r10+11)] = f1;
	r10 = r7 >> 2;
	heap32[(fp+-210)] = r8;
	heap32[(r10+41)] = 1566444395;
	r8 = sp + -1200;
	heap32[(r10+42)] = 0;
	r11 = r8 >> 2;
	heap32[(r10+43)] = 0;
	heap32[(r11+77)] = 953267991;
	r11 = heapU8[sp+-868];
	r11 = r11 & 240;
	r13 = sp + -1216;
	heap8[sp+-868] = r11;
	r11 = r13 >> 2;
	heap32[(fp+-304)] = r12;
	heap32[(r11+1)] = r8;
	heap32[(r11+2)] = r6;
	heap32[(r11+3)] = r9;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r7;
	_ZN15btGjkConvexCast16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB300_15
{
	f1 = heapFloat[(r10+41)];
	f2 = heapFloat[(r1+60)];
if(!(f2 <=f1)) //_LBB300_12
{
	heapFloat[(r1+60)] = f1;
}
	f2 = heapFloat[(r3+60)];
if(!(f2 <=f1)) //_LBB300_14
{
	heapFloat[(r3+60)] = f1;
}
	f0 = f1 < f0 ? f1 : f0;
}
	f_g0 = f0;
	return;
}