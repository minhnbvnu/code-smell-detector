function _ZN16btCollisionWorld27ClosestConvexResultCallback15addSingleResultERNS_17LocalConvexResultEb(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(fp)];
	f0 = heapFloat[(r0+10)];
	r1 = r1 >> 2;
	f1 = heapFloat[(r1+1)];
	if(f0 <=f1) //_LBB574_2
{
	r2 = heap32[(fp+2)];
	heapFloat[(r1+1)] = f0;
	r3 = heap32[(r0)];
	heap32[(r1+19)] = r3;
	if(r2 ==0) //_LBB574_4
{
	r2 = r3 >> 2;
	f0 = heapFloat[(r0+2)];
	f1 = heapFloat[(r2+1)];
	f2 = heapFloat[(r0+3)];
	f3 = heapFloat[(r2+2)];
	f4 = heapFloat[(r2+5)];
	f5 = heapFloat[(r2+6)];
	f1 = f1*f0;
	f3 = f3*f2;
	f6 = heapFloat[(r0+4)];
	f7 = heapFloat[(r2+3)];
	f8 = heapFloat[(r2+9)];
	f9 = heapFloat[(r2+10)];
	f10 = heapFloat[(r2+11)];
	f11 = heapFloat[(r2+7)];
	f4 = f4*f0;
	f5 = f5*f2;
	f1 = f1+f3;
	f3 = f7*f6;
	f0 = f8*f0;
	f2 = f9*f2;
	f4 = f4+f5;
	f5 = f11*f6;
	f1 = f1+f3;
	f0 = f0+f2;
	f2 = f10*f6;
	f3 = f4+f5;
	heapFloat[(r1+11)] = f1;
	f0 = f0+f2;
	heapFloat[(r1+12)] = f3;
	heapFloat[(r1+13)] = f0;
	heap32[(r1+14)] = 0;
}
else{
	heap32[(r1+11)] = heap32[(r0+2)];
	heap32[(r1+12)] = heap32[(r0+3)];
	heap32[(r1+13)] = heap32[(r0+4)];
	heap32[(r1+14)] = heap32[(r0+5)];
}
	heap32[(r1+15)] = heap32[(r0+6)];
	heap32[(r1+16)] = heap32[(r0+7)];
	heap32[(r1+17)] = heap32[(r0+8)];
	heap32[(r1+18)] = heap32[(r0+9)];
	f0 = heapFloat[(r0+10)];
	f_g0 = f0;
	return;
}
else{
	r0 = _2E_str36;
	r1 = _2E_str4;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 384;
	_assert(i7);
}
}