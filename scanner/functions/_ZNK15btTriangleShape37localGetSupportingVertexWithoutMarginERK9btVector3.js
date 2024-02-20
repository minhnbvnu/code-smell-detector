function _ZNK15btTriangleShape37localGetSupportingVertexWithoutMarginERK9btVector3(sp)
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
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
	r2 = r0 >> 2;
	r1 = r1 >> 2;
	f0 = heapFloat[(r2+13)];
	f1 = heapFloat[(r1)];
	f2 = heapFloat[(r2+17)];
	f3 = heapFloat[(r2+21)];
	f4 = heapFloat[(r2+14)];
	f5 = heapFloat[(r1+1)];
	f6 = heapFloat[(r2+18)];
	f7 = heapFloat[(r2+22)];
	f0 = f1*f0;
	f4 = f5*f4;
	f8 = heapFloat[(r2+15)];
	f9 = heapFloat[(r1+2)];
	f10 = heapFloat[(r2+19)];
	f11 = heapFloat[(r2+23)];
	f2 = f1*f2;
	f6 = f5*f6;
	f1 = f1*f3;
	f3 = f5*f7;
	f0 = f0+f4;
	f4 = f9*f8;
	f2 = f2+f6;
	f5 = f9*f10;
	f1 = f1+f3;
	f3 = f9*f11;
	f0 = f0+f4;
	f2 = f2+f5;
	r1 = heap32[(fp)];
	f1 = f1+f3;
	if(f0 >=f2) //_LBB269_2
{
	r2 = 2;
	r3 = 0;
	r2 = f0 < f1 ? r2 : r3;
}
else{
	r2 = 2;
	r3 = 1;
	r2 = f2 < f1 ? r2 : r3;
}
	r2 = r2 << 4;
	r0 = (r0 + r2)|0;
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	heap32[(r1)] = heap32[(r0+13)];
	heap32[(r1+1)] = heap32[(r0+14)];
	heap32[(r1+2)] = heap32[(r0+15)];
	heap32[(r1+3)] = heap32[(r0+16)];
	return;
}