function _ZN34btClosestNotMeConvexResultCallback15addSingleResultERN16btCollisionWorld17LocalConvexResultEb(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(fp)];
	r3 = heap32[(r1)];
	r4 = r2 >> 2;
	r5 = heap32[(r4+20)];
if(!(r3 ==r5)) //_LBB636_4
{
	r3 = heapU8[r3+204];
	r3 = r3 & 4;
if(!(r3 !=0)) //_LBB636_4
{
	f0 = heapFloat[(r4+7)];
	f1 = heapFloat[(r4+3)];
	f2 = heapFloat[(r4+8)];
	f3 = heapFloat[(r4+4)];
	f4 = heapFloat[(r1+2)];
	f0 = f0-f1;
	f1 = heapFloat[(r1+3)];
	f2 = f2-f3;
	f3 = heapFloat[(r4+9)];
	f5 = heapFloat[(r4+5)];
	f0 = f4*f0;
	f1 = f1*f2;
	f2 = heapFloat[(r1+4)];
	f3 = f3-f5;
	f4 = heapFloat[(r4+21)];
	f0 = f0+f1;
	f1 = f2*f3;
	f0 = f0+f1;
	f1 = -f4;
if(!(f0 >=f1)) //_LBB636_4
{
	r1 = heap32[(fp+2)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	_ZN16btCollisionWorld27ClosestConvexResultCallback15addSingleResultERNS_17LocalConvexResultEb(i7);
	return;
}
}
}
	f0 =                         1;
	f_g0 = f0;
	return;
}