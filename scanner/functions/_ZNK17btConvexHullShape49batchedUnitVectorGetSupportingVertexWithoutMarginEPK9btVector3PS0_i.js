function _ZNK17btConvexHullShape49batchedUnitVectorGetSupportingVertexWithoutMarginEPK9btVector3PS0_i(sp)
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
	var r8;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
	r1 = heap32[(fp+2)];
if(!(r0 <1)) //_LBB444_3
{
	r2 = (r1 + 12)|0;
	r3 = r0;
_3: while(true){
	r3 = (r3 + -1)|0;
	r4 = (r2 + 16)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = -581039253;
	r2 = r4;
	if(r3 !=0) //_LBB444_2
{
continue _3;
}
else{
break _3;
}
}
}
	r2 = heap32[(fp)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+23)];
_6: do {
if(!(r3 <1)) //_LBB444_11
{
	r3 = heap32[(fp+1)];
	r1 = (r1 + 8)|0;
	r3 = (r3 + 8)|0;
	r4 = 0;
_8: while(true){
if(!(r0 <1)) //_LBB444_10
{
	r5 = heap32[(r2+25)];
	r6 = r4 << 4;
	r5 = (r5 + r6)|0;
	r5 = r5 >> 2;
	f0 = heapFloat[(r5+2)];
	f1 = heapFloat[(r2+5)];
	f2 = heapFloat[(r5+1)];
	f3 = heapFloat[(r2+4)];
	f4 = heapFloat[(r5)];
	f5 = heapFloat[(r2+3)];
	f0 = f0*f1;
	f1 = f2*f3;
	f2 = f4*f5;
	r5 = r3;
	r6 = r1;
	r7 = r0;
_12: while(true){
	r8 = r5 >> 2;
	f3 = heapFloat[(r8+-2)];
	f4 = heapFloat[(r8+-1)];
	f3 = f3*f2;
	f4 = f4*f1;
	f5 = heapFloat[(r8)];
	f3 = f3+f4;
	f4 = f5*f0;
	r8 = r6 >> 2;
	f3 = f3+f4;
	f4 = heapFloat[(r8+1)];
if(!(f4 >=f3)) //_LBB444_9
{
	heapFloat[(r8+-2)] = f2;
	heapFloat[(r8+-1)] = f1;
	heapFloat[(r8)] = f0;
	heapFloat[(r8+1)] = f3;
}
	r7 = (r7 + -1)|0;
	r6 = (r6 + 16)|0;
	r5 = (r5 + 16)|0;
if(!(r7 !=0)) //_LBB444_7
{
break _12;
}
}
}
	r4 = (r4 + 1)|0;
	r5 = heap32[(r2+23)];
	if(r5 >r4) //_LBB444_5
{
continue _8;
}
else{
break _6;
}
}
}
} while(0);
	return;
}