function _ZN32btSphereSphereCollisionAlgorithm16processCollisionEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
_1: do {
if(!(r0 ==0)) //_LBB360_10
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+4)];
	r4 = r3 >> 2;
	r1 = r1 >> 2;
	heap32[(r4+1)] = r0;
	r0 = r2 >> 2;
	f0 = heapFloat[(r1+14)];
	f1 = heapFloat[(r0+14)];
	f2 = heapFloat[(r1+13)];
	f3 = heapFloat[(r0+13)];
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = heapFloat[(r1+15)];
	f3 = heapFloat[(r0+15)];
	f2 = f2-f3;
	r1 = heap32[(r1+48)];
	r2 = heap32[(r0+48)];
	f3 = f1*f1;
	f4 = f0*f0;
	f3 = f3+f4;
	f4 = f2*f2;
	f3 = f3+f4;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	f3 = f_g0;
	r1 = r1 >> 2;
	r2 = r2 >> 2;
	f4 = heapFloat[(r1+7)];
	f5 = heapFloat[(r1+3)];
	f6 = heapFloat[(r2+7)];
	f7 = heapFloat[(r2+3)];
	f6 = f6*f7;
	f4 = f4*f5;
	f4 = f4+f6;
_3: do {
	if(f4 >=f3) //_LBB360_11
{
	r1 = sp + -16;
	r2 = r1 >> 2;
	heap32[(fp+-4)] = 1065353216;
	heap32[(r2+1)] = 0;
	f4 = f3-f4;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
	f5 =   1.1920928955078125e-007;
	if(f3 >f5) //_LBB360_13
{
	f5 =                         1;
	f3 = f5/f3;
	f1 = f1*f3;
	f0 = f0*f3;
	heapFloat[(fp+-4)] = f1;
	f2 = f2*f3;
	heapFloat[(r2+1)] = f0;
	heapFloat[(r2+2)] = f2;
	heap32[(r2+3)] = 0;
}
else{
	f1 =                         1;
	f0 =                         0;
	f2 = f0;
}
	f1 = f1*f6;
	f3 = heapFloat[(r0+13)];
	f5 = heapFloat[(r0+15)];
	f7 = heapFloat[(r0+14)];
	r0 = sp + -32;
	f0 = f0*f6;
	f1 = f3+f1;
	f2 = f2*f6;
	r2 = r0 >> 2;
	f0 = f7+f0;
	heapFloat[(fp+-8)] = f1;
	f1 = f5+f2;
	heapFloat[(r2+1)] = f0;
	heapFloat[(r2+2)] = f1;
	heap32[(r2+3)] = 0;
	r2 = heap32[(r4)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	heapFloat[(g0+3)] = f4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = heap32[(r4+1)];
	if(r0 !=0) //_LBB360_16
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	if(r2 ==0) //_LBB360_10
{
break _1;
}
else{
	r1 = heap32[(r1+277)];
	r2 = heap32[(r4+34)];
	if(r1 ==r2) //_LBB360_19
{
	r1 = (r3 + 8)|0;
	r2 = (r3 + 72)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
}
else{
	r1 = (r3 + 72)|0;
	r3 = (r3 + 8)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
__label__ = 8;
break _3;
}
}
}
else{
__label__ = 3;
}
}
else{
	r0 = heap32[(r4+1)];
	if(r0 !=0) //_LBB360_4
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	if(r2 ==0) //_LBB360_10
{
break _1;
}
else{
	r1 = heap32[(r1+277)];
	r4 = heap32[(r4+34)];
	if(r1 ==r4) //_LBB360_9
{
	r4 = (r3 + 8)|0;
	r3 = (r3 + 72)|0;
}
else{
	r4 = (r3 + 72)|0;
	r3 = (r3 + 8)|0;
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
__label__ = 8;
}
}
else{
__label__ = 3;
}
}
} while(0);
switch(__label__ ){//multiple entries
case 8:
	heap32[(g0+2)] = r3;
	_ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(i7);
	return;
break;
case 3:
	r0 = _2E_str59;
	r3 = _2E_str160;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 101;
	_assert(i7);
break;
}
}
} while(0);
	return;
}