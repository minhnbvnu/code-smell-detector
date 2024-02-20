function _ZNK15btTriangleShape32getPreferredPenetrationDirectionEiR9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	f0 = heapFloat[(r0+23)];
	f1 = heapFloat[(r0+15)];
	f2 = heapFloat[(r0+19)];
	f3 = heapFloat[(r0+22)];
	f4 = heapFloat[(r0+14)];
	f5 = heapFloat[(r0+18)];
	f5 = f5-f4;
	f0 = f0-f1;
	f1 = f2-f1;
	f2 = f3-f4;
	f3 = heapFloat[(r0+21)];
	f4 = heapFloat[(r0+13)];
	f6 = heapFloat[(r0+17)];
	f3 = f3-f4;
	f4 = f6-f4;
	r0 = heap32[(fp+2)];
	f6 = f5*f0;
	f7 = f1*f2;
	f6 = f6-f7;
	f1 = f1*f3;
	f0 = f4*f0;
	r0 = r0 >> 2;
	f0 = f1-f0;
	heapFloat[(r0)] = f6;
	f1 = f4*f2;
	f2 = f5*f3;
	f1 = f1-f2;
	heapFloat[(r0+1)] = f0;
	heapFloat[(r0+2)] = f1;
	f2 = f6*f6;
	f0 = f0*f0;
	heap32[(r0+3)] = 0;
	f0 = f2+f0;
	f1 = f1*f1;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	f0 = f1/f_g0;
	f1 = heapFloat[(r0)];
	f1 = f1*f0;
	heapFloat[(r0)] = f1;
	f2 = heapFloat[(r0+1)];
	f2 = f2*f0;
	heapFloat[(r0+1)] = f2;
	f3 = heapFloat[(r0+2)];
	f0 = f3*f0;
	heapFloat[(r0+2)] = f0;
	r1 = heap32[(fp+1)];
if(!(r1 ==0)) //_LBB285_2
{
	f1 = -f1;
	f2 = -f2;
	heapFloat[(r0)] = f1;
	f0 = -f0;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
}
	return;
}