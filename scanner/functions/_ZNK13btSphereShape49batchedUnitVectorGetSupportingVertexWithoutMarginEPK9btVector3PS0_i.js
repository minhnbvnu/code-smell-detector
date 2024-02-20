function _ZNK13btSphereShape49batchedUnitVectorGetSupportingVertexWithoutMarginEPK9btVector3PS0_i(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
if(!(r0 <1)) //_LBB480_3
{
	r1 = heap32[(fp+2)];
	r1 = (r1 + 8)|0;
_3: while(true){
	r2 = r1 >> 2;
	heap32[(r2+-2)] = 0;
	heap32[(r2+-1)] = 0;
	r0 = (r0 + -1)|0;
	r1 = (r1 + 16)|0;
	heap32[(r2)] = 0;
	heap32[(r2+1)] = 0;
	if(r0 !=0) //_LBB480_2
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