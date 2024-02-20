function _ZNK10btBoxShape49batchedUnitVectorGetSupportingVertexWithoutMarginEPK9btVector3PS0_i(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
if(!(r0 <1)) //_LBB376_3
{
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r3 = (r3 + 8)|0;
	r2 = (r2 + 8)|0;
	f3 =                         0;
_3: while(true){
	r4 = r1 >> 2;
	r5 = r2 >> 2;
	f0 = heapFloat[(r4+7)];
	f1 = heapFloat[(r4+9)];
	f2 = heapFloat[(r4+8)];
	f4 = -f0;
	f5 = heapFloat[(r5+-2)];
	f6 = heapFloat[(r5)];
	f7 = heapFloat[(r5+-1)];
	f8 = -f2;
	r4 = r3 >> 2;
	f0 = f5 < f3 ? f4 : f0;
	f4 = -f1;
	f2 = f7 < f3 ? f8 : f2;
	heapFloat[(r4+-2)] = f0;
	f0 = f6 < f3 ? f4 : f1;
	heapFloat[(r4+-1)] = f2;
	r0 = (r0 + -1)|0;
	r3 = (r3 + 16)|0;
	r2 = (r2 + 16)|0;
	heapFloat[(r4)] = f0;
	heap32[(r4+1)] = 0;
	if(r0 !=0) //_LBB376_2
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