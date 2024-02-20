function _ZN31btConvexPlaneCollisionAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
	var f12;
	var f13;
	var f14;
	var f15;
	var f16;
	var f17;
	var f18;
var __label__ = 0;
	i7 = sp + -56;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+3)];
if(!(r2 ==0)) //_LBB307_23
{
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+4)];
	r5 = heapU8[r0+16];
	r6 = r5 == 0 ? r2 : r3;
	r5 = r5 == 0 ? r3 : r2;
	r6 = r6 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r6+48)];
	r5 = heap32[(r5+48)];
	r7 = sp + -32;
	r8 = r7 >> 2;
	heap32[(fp+-8)] = 0;
	heap32[(r8+1)] = 0;
	heap32[(r8+2)] = 0;
	heap32[(r8+3)] = 1065353216;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	r7 = r4 >> 2;
	_ZN31btConvexPlaneCollisionAlgorithm20collideSingleContactERK12btQuaternionP17btCollisionObjectS4_RK16btDispatcherInfoP16btManifoldResult(i7);
	r8 = heap32[(r7+1)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+279)];
	r9 = heap32[(r1+6)];
_3: do {
if(!(r8 >=r9)) //_LBB307_15
{
	r5 = r5 >> 2;
	f0 = heapFloat[(r5+14)];
	f1 =                         0;
	if(f0 <f1) //_LBB307_4
{
	f2 = -f0;
}
else{
	f2 = f0;
}
	f3 =       0.70710676908493042;
	if(f2 <=f3) //_LBB307_7
{
	f0 = heapFloat[(r5+12)];
	f2 = heapFloat[(r5+13)];
	f0 = f0*f0;
	f2 = f2*f2;
	f0 = f0+f2;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f2 = heapFloat[(r5+13)];
	f3 =                         1;
	f2 = -f2;
	f0 = f3/f_g0;
	f4 = heapFloat[(r5+12)];
	f3 = f0*f2;
	f2 = f4*f0;
	f0 = f1;
}
else{
	f2 = heapFloat[(r5+13)];
	f2 = f2*f2;
	f0 = f0*f0;
	f0 = f2+f0;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f2 = heapFloat[(r5+14)];
	f3 =                         1;
	f2 = -f2;
	f0 = f3/f_g0;
	f3 = heapFloat[(r5+13)];
	f2 = f0*f2;
	f0 = f3*f0;
	f3 =                         0;
}
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+4)];
	heap32[(g0)] = r6;
	f4 = f3*f3;
	f5 = f2*f2;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	f6 = f_g0;
	f4 = f4+f5;
	f5 = f0*f0;
	f4 = f4+f5;
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	if(f4 !=f1) //_LBB307_10
{
	f1 =      0.019999999552965164;
	f1 = f1/f6;
	f5 =                       0.5;
	f6 =       0.39269909262657166;
	f7 =       0.19634954631328583;
	f8 = f1*f5;
	f1 = f1 > f6 ? f7 : f8;
	heapFloat[(g0)] = f1;
	sinf(i7);
	heapFloat[(g0)] = f1;
	f1 = f_g0/f4;
	f0 = f0*f1;
	f2 = f2*f1;
	f1 = f3*f1;
	r6 = 0;
	cosf(i7);
	f3 = f_g0;
_15: while(true){
	r8 = heap32[(r1+5)];
	if(r8 >r6) //_LBB307_11
{
	f4 = heapFloat[(r5+12)];
	f6 = heapFloat[(r5+13)];
	f7 = heapFloat[(r5+14)];
	f4 = f4*f4;
	f6 = f6*f6;
	f4 = f4+f6;
	f6 = f7*f7;
	f4 = f4+f6;
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	f6 =                         0;
	if(f4 !=f6) //_LBB307_13
{
	f6 =        6.2831854820251465;
	f7 = r8; //fitos r8, f7
	f8 = r6; //fitos r6, f8
	f6 = f6/f7;
	f6 = f8*f6;
	f6 = f6*f5;
	heapFloat[(g0)] = f6;
	sinf(i7);
	f7 = f_g0;
	heapFloat[(g0)] = f6;
	cosf(i7);
	f4 = f7/f4;
	f7 = heapFloat[(r5+12)];
	f7 = f7*f4;
	f8 = heapFloat[(r5+13)];
	f8 = f8*f4;
	f9 = heapFloat[(r5+14)];
	f10 = f_g0*f3;
	f11 = f1*f7;
	f12 = f_g0*f1;
	f13 = f3*f7;
	f4 = f9*f4;
	f9 = f10+f11;
	f10 = f2*f8;
	f11 = f12-f13;
	f12 = f0*f8;
	f13 = f_g0*f2;
	f14 = f3*f8;
	f9 = f9+f10;
	f10 = f0*f4;
	f11 = f11-f12;
	f12 = f2*f4;
	f13 = f13-f14;
	f14 = f1*f4;
	f15 = f_g0*f0;
	f16 = f3*f4;
	f9 = f9+f10;
	f10 = f11+f12;
	f11 = f13-f14;
	f12 = f0*f7;
	f13 = f15-f16;
	f14 = f2*f7;
	f11 = f11+f12;
	f12 = f9*f7;
	f15 = f10*f_g0;
	f13 = f13-f14;
	f14 = f1*f8;
	f13 = f13+f14;
	f14 = f9*f8;
	f16 = f11*f_g0;
	f12 = f12+f15;
	f15 = f11*f4;
	f17 = f9*f4;
	f18 = f13*f_g0;
	f14 = f14+f16;
	f16 = f13*f7;
	f12 = f12+f15;
	f15 = f13*f8;
	r8 = sp + -16;
	f6 = f9*f_g0;
	f9 = f10*f7;
	f17 = f17+f18;
	f18 = f10*f8;
	f14 = f14+f16;
	f10 = f10*f4;
	f12 = f12-f15;
	r9 = r8 >> 2;
	f6 = f6-f9;
	f8 = f11*f8;
	f9 = f17+f18;
	f7 = f11*f7;
	f10 = f14-f10;
	heapFloat[(fp+-4)] = f12;
	f6 = f6-f8;
	f4 = f13*f4;
	f7 = f9-f7;
	heapFloat[(r9+1)] = f10;
	f4 = f6-f4;
	heapFloat[(r9+2)] = f7;
	heapFloat[(r9+3)] = f4;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	r6 = (r6 + 1)|0;
	_ZN31btConvexPlaneCollisionAlgorithm20collideSingleContactERK12btQuaternionP17btCollisionObjectS4_RK16btDispatcherInfoP16btManifoldResult(i7);
}
else{
break _15;
}
}
else{
break _3;
}
}
}
	r0 = _2E_str115;
	r1 = _2E_str685;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 61;
	_assert(i7);
}
} while(0);
	r0 = heapU8[r0+8];
if(!(r0 ==0)) //_LBB307_23
{
	r0 = heap32[(r1+3)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+279)];
if(!(r0 ==0)) //_LBB307_23
{
	r0 = heap32[(r7+1)];
	if(r0 !=0) //_LBB307_19
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
if(!(r2 ==0)) //_LBB307_23
{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r7+34)];
	if(r1 ==r2) //_LBB307_22
{
	r1 = (r4 + 8)|0;
	r2 = (r4 + 72)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
}
else{
	r1 = (r4 + 72)|0;
	r4 = (r4 + 8)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}
}
}
else{
	r0 = _2E_str59;
	r4 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
}
}
	return;
}