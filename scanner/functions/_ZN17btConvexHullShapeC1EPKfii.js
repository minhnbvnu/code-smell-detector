function _ZN17btConvexHullShapeC1EPKfii(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
	var r7;
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 1065353216;
	heap32[(r1+4)] = 1065353216;
	heap32[(r1+5)] = 1065353216;
	heap32[(r1+6)] = 0;
	heap32[(r1+11)] = 1025758986;
	heap32[(r1+13)] = 1065353216;
	heap32[(r1+14)] = 1065353216;
	heap32[(r1+15)] = 1065353216;
	heap32[(r1+16)] = 0;
	heap32[(r1+17)] = -1082130432;
	heap32[(r1+18)] = -1082130432;
	heap32[(r1+19)] = -1082130432;
	r2 = _ZTV17btConvexHullShape;
	r3 = 0;
	heap32[(r1+20)] = 0;
	r2 = (r2 + 8)|0;
	heap8[r0+84] = r3;
	r4 = 1;
	heap32[(r1)] = r2;
	heap8[r0+104] = r4;
	heap32[(r1+25)] = 0;
	heap32[(r1+23)] = 0;
	heap32[(r1+24)] = 0;
	heap32[(r1+1)] = 4;
	r2 = heap32[(fp+2)];
	r4 = (r0 + 88)|0;
	r5 = sp + -16;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r5;
	_ZN20btAlignedObjectArrayI9btVector3E6resizeEiRKS0_(i7);
if(!(r2 <1)) //_LBB455_3
{
	r4 = heap32[(fp+1)];
_3: while(true){
	r5 = r3 << 4;
	r6 = (r4 + r5)|0;
	r6 = r6 >> 2;
	r7 = heap32[(r1+25)];
	r5 = (r7 + r5)|0;
	f0 = heapFloat[(r6+2)];
	f1 = heapFloat[(r6+1)];
	r5 = r5 >> 2;
	heap32[(r5)] = heap32[(r6)];
	heapFloat[(r5+1)] = f1;
	r3 = (r3 + 1)|0;
	heapFloat[(r5+2)] = f0;
	heap32[(r5+3)] = 0;
	if(r2 !=r3) //_LBB455_2
{
continue _3;
}
else{
break _3;
}
}
}
	heap32[(g0)] = r0;
	_ZN34btPolyhedralConvexAabbCachingShape15recalcLocalAabbEv(i7);
	return;
}