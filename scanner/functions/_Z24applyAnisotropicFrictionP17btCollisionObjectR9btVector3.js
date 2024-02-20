function _Z24applyAnisotropicFrictionP17btCollisionObjectR9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
if(!(r0 ==0)) //_LBB605_2
{
	r0 = r0 >> 2;
	r1 = heap32[(r0+45)];
	if(r1 !=0) //_LBB605_3
{
	r1 = heap32[(fp+1)];
	r1 = r1 >> 2;
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r0+2)];
	f2 = heapFloat[(r0+1)];
	f3 = heapFloat[(r1+1)];
	f4 = heapFloat[(r0+6)];
	f5 = heapFloat[(r0+5)];
	f6 = heapFloat[(r0+3)];
	f7 = heapFloat[(r0+7)];
	f8 = f2*f0;
	f9 = f5*f3;
	f10 = f1*f0;
	f11 = f4*f3;
	f12 = heapFloat[(r1+2)];
	f13 = heapFloat[(r0+10)];
	f14 = heapFloat[(r0+9)];
	f15 = heapFloat[(r0+11)];
	f8 = f8+f9;
	f9 = f14*f12;
	f10 = f10+f11;
	f11 = f13*f12;
	f0 = f6*f0;
	f3 = f7*f3;
	f8 = f8+f9;
	f9 = heapFloat[(r0+41)];
	f10 = f10+f11;
	f11 = heapFloat[(r0+42)];
	f0 = f0+f3;
	f3 = f15*f12;
	f8 = f8*f9;
	f9 = f10*f11;
	f10 = heapFloat[(r0+43)];
	f0 = f0+f3;
	f0 = f0*f10;
	f2 = f2*f8;
	f1 = f1*f9;
	f3 = f5*f8;
	f4 = f4*f9;
	f1 = f2+f1;
	f2 = f6*f0;
	f5 = f14*f8;
	f6 = f13*f9;
	f3 = f3+f4;
	f4 = f7*f0;
	f1 = f1+f2;
	f2 = f5+f6;
	f0 = f15*f0;
	f3 = f3+f4;
	heapFloat[(r1)] = f1;
	f0 = f2+f0;
	heapFloat[(r1+1)] = f3;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}
}
	return;
}