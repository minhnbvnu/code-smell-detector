function _ZNK15btTriangleShape49batchedUnitVectorGetSupportingVertexWithoutMarginEPK9btVector3PS0_i(sp)
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
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
if(!(r0 <1)) //_LBB270_6
{
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r2 = (r2 + 8)|0;
	r3 = (r3 + 12)|0;
_3: while(true){
	r4 = r1 >> 2;
	r5 = r2 >> 2;
	f0 = heapFloat[(r4+13)];
	f1 = heapFloat[(r5+-2)];
	f2 = heapFloat[(r4+17)];
	f3 = heapFloat[(r4+21)];
	f4 = heapFloat[(r4+14)];
	f5 = heapFloat[(r5+-1)];
	f6 = heapFloat[(r4+18)];
	f7 = heapFloat[(r4+22)];
	f0 = f1*f0;
	f4 = f5*f4;
	f8 = heapFloat[(r4+15)];
	f9 = heapFloat[(r5)];
	f10 = heapFloat[(r4+19)];
	f11 = heapFloat[(r4+23)];
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
	f1 = f1+f3;
	if(f0 >=f2) //_LBB270_4
{
	r4 = 2;
	r5 = 0;
	r4 = f0 < f1 ? r4 : r5;
}
else{
	r4 = 2;
	r5 = 1;
	r4 = f2 < f1 ? r4 : r5;
}
	r4 = r4 << 4;
	r4 = (r1 + r4)|0;
	r5 = r3 >> 2;
	r4 = r4 >> 2;
	heap32[(r5+-3)] = heap32[(r4+13)];
	heap32[(r5+-2)] = heap32[(r4+14)];
	r0 = (r0 + -1)|0;
	r2 = (r2 + 16)|0;
	r3 = (r3 + 16)|0;
	heap32[(r5+-1)] = heap32[(r4+15)];
	heap32[(r5)] = heap32[(r4+16)];
	if(r0 !=0) //_LBB270_2
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