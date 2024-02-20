function _ZNK17btConvexHullShape37localGetSupportingVertexWithoutMarginERK9btVector3(sp)
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
	var f8;
	var f9;
	var f10;
	var f11;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	r1 = heap32[(fp+1)];
	heap32[(r0+2)] = 0;
	r1 = r1 >> 2;
	heap32[(r0+3)] = 0;
	r2 = heap32[(r1+23)];
if(!(r2 <1)) //_LBB445_6
{
	r3 = heap32[(fp+2)];
	r3 = r3 >> 2;
	r4 = heap32[(r1+25)];
	f0 = heapFloat[(r1+5)];
	f1 = heapFloat[(r1+4)];
	f2 = heapFloat[(r1+3)];
	f3 = heapFloat[(r3)];
	f4 = heapFloat[(r3+1)];
	f5 = heapFloat[(r3+2)];
	r1 = 0;
	f6 =       -999999984306749440;
_3: while(true){
	r3 = r1 << 4;
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	f7 = heapFloat[(r3+1)];
	f8 = heapFloat[(r3)];
	f7 = f7*f1;
	f8 = f8*f2;
	f9 = heapFloat[(r3+2)];
	f9 = f9*f0;
	f10 = f3*f8;
	f11 = f4*f7;
	f10 = f10+f11;
	f11 = f5*f9;
	f10 = f10+f11;
	if(f10 >f6) //_LBB445_4
{
	heapFloat[(r0)] = f8;
	heapFloat[(r0+1)] = f7;
	heapFloat[(r0+2)] = f9;
	heap32[(r0+3)] = 0;
	f6 = f10;
}
	r1 = (r1 + 1)|0;
	if(r1 <r2) //_LBB445_2
{
continue _3;
}
else{
break _3;
}
}
}
	return;
}