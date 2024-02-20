function _ZNK16btDbvtBroadphase17getBroadphaseAabbER9btVector3S1_(sp)
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
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r0 = heap32[(r0+11)];
	if(r1 ==0) //_LBB98_4
{
	if(r0 !=0) //_LBB98_6
{
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	f2 = heapFloat[(r0+1)];
	f4 = heapFloat[(r0+2)];
	f6 = heapFloat[(r0+3)];
	f1 = heapFloat[(r0+4)];
	f3 = heapFloat[(r0+5)];
	f5 = heapFloat[(r0+6)];
	f7 = heapFloat[(r0+7)];
}
else{
	f6 =                         0;
	f4 = f6;
	f2 = f6;
	f0 = f6;
	f1 = f6;
	f3 = f6;
	f5 = f6;
	f7 = f6;
}
}
else{
	if(r0 ==0) //_LBB98_3
{
	r0 = r1 >> 2;
	f0 = heapFloat[(r0)];
	f2 = heapFloat[(r0+1)];
	f4 = heapFloat[(r0+2)];
	f6 = heapFloat[(r0+3)];
	f1 = heapFloat[(r0+4)];
	f3 = heapFloat[(r0+5)];
	f5 = heapFloat[(r0+6)];
	f7 = heapFloat[(r0+7)];
}
else{
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r0)];
	f2 = heapFloat[(r1+4)];
	f3 = heapFloat[(r0+4)];
	f4 = heapFloat[(r1+1)];
	f5 = heapFloat[(r0+1)];
	f6 = heapFloat[(r1+5)];
	f7 = heapFloat[(r0+5)];
	f8 = heapFloat[(r1+2)];
	f9 = heapFloat[(r0+2)];
	f10 = heapFloat[(r1+6)];
	f11 = heapFloat[(r0+6)];
	f0 = f0 < f1 ? f0 : f1;
	f1 = f2 > f3 ? f2 : f3;
	f2 = f4 < f5 ? f4 : f5;
	f3 = f6 > f7 ? f6 : f7;
	f4 = f8 < f9 ? f8 : f9;
	f5 = f10 > f11 ? f10 : f11;
}
}
	r0 = r2 >> 2;
	heapFloat[(r0)] = f0;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f4;
	r1 = r3 >> 2;
	heapFloat[(r0+3)] = f6;
	heapFloat[(r1)] = f1;
	heapFloat[(r1+1)] = f3;
	heapFloat[(r1+2)] = f5;
	heapFloat[(r1+3)] = f7;
	return;
}