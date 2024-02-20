function _ZN23btDiscreteDynamicsWorld19integrateTransformsEf(sp)
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
	var r14;
	var r15;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + -264;var g0 = i7>>2; // save stack
	r0 = _2E_str794;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	r0 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+52)];
if(!(r2 <1)) //_LBB653_19
{
	f0 = heapFloat[(fp+1)];
	r2 = 0;
	r15 = -1;
_3: while(true){
	r3 = heap32[(r0+54)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = r3 >> 2;
	heap32[(r4+60)] = 1065353216;
	r5 = heap32[(r4+54)];
if(!(r5 ==2)) //_LBB653_18
{
if(!(r5 ==5)) //_LBB653_18
{
	r5 = heapU8[r3+204];
	r5 = r5 & 3;
if(!(r5 !=0)) //_LBB653_18
{
	f1 = heapFloat[(r4+76)];
	f2 = heapFloat[(r4+77)];
	f3 = heapFloat[(r4+78)];
	r5 = (r3 + 320)|0;
	r6 = (r3 + 4)|0;
	r7 = sp + -80;
	heap32[(g0)] = r6;
	heapFloat[(g0+1)] = f1;
	heapFloat[(g0+2)] = f2;
	heapFloat[(g0+3)] = f3;
	heap32[(g0+4)] = r5;
	heapFloat[(g0+5)] = f0;
	heap32[(g0+6)] = r7;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	f1 = heapFloat[(r4+62)];
	f1 = f1*f1;
	f2 =                         0;
_9: do {
if(!(f1 ==f2)) //_LBB653_17
{
	r8 = r7 >> 2;
	f2 = heapFloat[(r8+14)];
	f3 = heapFloat[(r4+15)];
	f4 = heapFloat[(r8+13)];
	f5 = heapFloat[(r4+14)];
	f6 = heapFloat[(r8+12)];
	f7 = heapFloat[(r4+13)];
	f2 = f2-f3;
	f3 = f4-f5;
	f4 = f6-f7;
	f4 = f4*f4;
	f3 = f3*f3;
	f3 = f4+f3;
	f2 = f2*f2;
	f2 = f3+f2;
if(!(f1 >=f2)) //_LBB653_17
{
	r9 = _2E_str895;
	heap32[(g0)] = r9;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r9 = heap32[(r4+48)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+1)];
if(!(r9 >19)) //_LBB653_11
{
	r9 = gNumClampedCcdMotions;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r10 = (r10 + 1)|0;
	heap32[(r9)] = r10;
	r9 = heap32[(r0+20)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+9)];
	r11 = heap32[(r0+6)];
	r12 = sp + -176;
	heap32[(g0)] = r9;
	r9 = r12 >> 2;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r13 = 1;
	heap32[(r9+1)] = 1065353216;
	r14 = _ZTVN16btCollisionWorld27ClosestConvexResultCallbackE;
	heap16[(sp+-168)>>1] = r13;
	r13 = (r14 + 8)|0;
	heap16[(sp+-166)>>1] = r15;
	heap32[(fp+-44)] = r13;
	heap32[(r9+3)] = heap32[(r4+13)];
	heap32[(r9+4)] = heap32[(r4+14)];
	heap32[(r9+5)] = heap32[(r4+15)];
	heap32[(r9+6)] = heap32[(r4+16)];
	heap32[(r9+7)] = heap32[(r8+12)];
	heap32[(r9+8)] = heap32[(r8+13)];
	heap32[(r9+9)] = heap32[(r8+14)];
	r14 = _ZTV34btClosestNotMeConvexResultCallback;
	heap32[(r9+10)] = heap32[(r8+15)];
	r8 = (r14 + 8)|0;
	heap32[(r9+19)] = 0;
	heap32[(fp+-44)] = r8;
	heap32[(r9+20)] = r3;
	heap32[(r9+21)] = 0;
	heap32[(r9+22)] = r_g0;
	r8 = sp + -232;
	heap32[(r9+23)] = r11;
	r10 = r8 >> 2;
	f1 = heapFloat[(r4+61)];
	heap32[(r10+2)] = 0;
	heap32[(r10+3)] = 1065353216;
	heap32[(r10+4)] = 1065353216;
	r11 = _ZTV13btSphereShape;
	heap32[(r10+5)] = 1065353216;
	r11 = (r11 + 8)|0;
	heap32[(r10+6)] = 0;
	heap32[(fp+-58)] = r11;
	heap32[(r10+1)] = 8;
	heapFloat[(r10+7)] = f1;
	heapFloat[(r10+11)] = f1;
	r10 = heap32[(r4+47)];
	r10 = heapU16[(r10+4)>>1];
	heap16[(sp+-168)>>1] = r10;
	r10 = heap32[(r4+47)];
	r10 = heapU16[(r10+6)>>1];
	heap16[(sp+-166)>>1] = r10;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r12;
	heap32[(g0+5)] = 0;
	_ZNK16btCollisionWorld15convexSweepTestEPK13btConvexShapeRK11btTransformS5_RNS_20ConvexResultCallbackEf(i7);
	f1 = heapFloat[(r9+1)];
	f2 =                         1;
if(!(f1 >=f2)) //_LBB653_10
{
	heapFloat[(r4+60)] = f1;
	f2 = heapFloat[(r4+76)];
	f3 = heapFloat[(r4+77)];
	f4 = heapFloat[(r4+78)];
	f1 = f1*f0;
	heap32[(g0)] = r6;
	heapFloat[(g0+1)] = f2;
	heapFloat[(g0+2)] = f3;
	heapFloat[(g0+3)] = f4;
	heap32[(g0+4)] = r5;
	heapFloat[(g0+5)] = f1;
	heap32[(g0+6)] = r7;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	heap32[(r4+60)] = 0;
}
	r4 = _ZTV13btConvexShape;
	r4 = (r4 + 8)|0;
	heap32[(fp+-58)] = r4;
	heap32[(fp+-44)] = r13;
}
	r4 = _ZN15CProfileManager11CurrentNodeE;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r6 = r5 >> 2;
	r8 = heap32[(r6+4)];
	r8 = (r8 + -1)|0;
	heap32[(r6+4)] = r8;
if(!(r8 !=0)) //_LBB653_17
{
	r8 = heap32[(r6+1)];
	if(r8 !=0) //_LBB653_14
{
	r5 = sp + -8;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 0;
	r8 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r5 = r5 >> 2;
	r9 = heap32[(fp+-2)];
	r10 = heap32[(r8)];
	r9 = (r9 - r10)|0;
	r5 = heap32[(r5+1)];
	r8 = heap32[(r8+1)];
	r5 = (r5 - r8)|0;
	r8 = (r9 * 1000000)|0;
	r5 = (r5 + r8)|0;
	r8 = heap32[(r6+3)];
	r5 = (r5 - r8)|0;
	f1 = uint(r5); //fuitos r5, f1
	f2 =                      1000;
	f3 = heapFloat[(r6+2)];
	f1 = f1/f2;
	f1 = f3+f1;
	heapFloat[(r6+2)] = f1;
	r5 = heap32[(r6+4)];
	if(r5 !=0) //_LBB653_17
{
break _9;
}
else{
	r5 = heap32[(r4)];
}
}
	r5 = r5 >> 2;
	r5 = heap32[(r5+5)];
	heap32[(r4)] = r5;
}
}
}
} while(0);
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r7;
	_ZN11btRigidBody18proceedToTransformERK11btTransform(i7);
}
}
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r0+52)];
	if(r3 >r2) //_LBB653_2
{
continue _3;
}
else{
break _3;
}
}
}
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_26: do {
if(!(r3 !=0)) //_LBB653_25
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB653_22
{
	r1 = sp + -16;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-4)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r1 = (r1 + r3)|0;
	r3 = heap32[(r2+3)];
	r1 = (r1 - r3)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r2+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r2+2)] = f0;
	r1 = heap32[(r2+4)];
	if(r1 !=0) //_LBB653_25
{
break _26;
}
else{
	r1 = heap32[(r0)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r0)] = r1;
}
} while(0);
	return;
}