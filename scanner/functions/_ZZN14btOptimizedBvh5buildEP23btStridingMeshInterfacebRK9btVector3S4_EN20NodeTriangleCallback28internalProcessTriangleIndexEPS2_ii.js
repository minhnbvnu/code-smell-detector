function _ZZN14btOptimizedBvh5buildEP23btStridingMeshInterfacebRK9btVector3S4_EN20NodeTriangleCallback28internalProcessTriangleIndexEPS2_ii(sp)
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
	var r9;
	var r10;
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
	var f12;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	f0 =        999999984306749440;
	f1 = heapFloat[(r0)];
	f2 = heapFloat[(r0+1)];
	f3 =       -999999984306749440;
	f4 = heapFloat[(r0+2)];
	f5 = heapFloat[(r0+3)];
	f6 =                         0;
	r1 = heap32[(r1+1)];
	f7 = f1 < f0 ? f1 : f0;
	f8 = heapFloat[(r0+4)];
	f1 = f1 > f3 ? f1 : f3;
	f9 = f2 < f0 ? f2 : f0;
	f10 = heapFloat[(r0+5)];
	f2 = f2 > f3 ? f2 : f3;
	f0 = f4 < f0 ? f4 : f0;
	f11 = heapFloat[(r0+6)];
	f3 = f4 > f3 ? f4 : f3;
	f4 = f5 < f6 ? f5 : f6;
	f12 = heapFloat[(r0+7)];
	f5 = f5 > f6 ? f5 : f6;
	r2 = r1 >> 2;
	f6 = f8 < f7 ? f8 : f7;
	f7 = heapFloat[(r0+8)];
	f1 = f1 < f8 ? f8 : f1;
	f8 = f10 < f9 ? f10 : f9;
	f9 = heapFloat[(r0+9)];
	f2 = f2 < f10 ? f10 : f2;
	f0 = f11 < f0 ? f11 : f0;
	f10 = heapFloat[(r0+10)];
	f3 = f3 < f11 ? f11 : f3;
	f4 = f12 < f4 ? f12 : f4;
	f11 = heapFloat[(r0+11)];
	f5 = f5 < f12 ? f12 : f5;
	r0 = heap32[(r2+2)];
	r3 = heap32[(r2+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	f6 = f7 < f6 ? f7 : f6;
	f8 = f9 < f8 ? f9 : f8;
	f0 = f10 < f0 ? f10 : f0;
	f4 = f11 < f4 ? f11 : f4;
	f1 = f1 < f7 ? f7 : f1;
	f2 = f2 < f9 ? f9 : f2;
	f3 = f3 < f10 ? f10 : f3;
	f5 = f5 < f11 ? f11 : f5;
	if(r0 ==r3) //_LBB466_2
{
	r6 = 1;
	r7 = r3 << 1;
	r7 = r3 == 0 ? r6 : r7;
if(!(r0 >=r7)) //_LBB466_1
{
	if(r7 !=0) //_LBB466_5
{
	r0 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r8 = heap32[(r0)];
	r8 = (r8 + 1)|0;
	r9 = r7 << 6;
	heap32[(r0)] = r8;
	r0 = r9 | 19;
	heap32[(g0)] = r0;
	malloc(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB466_7
{
	r3 = 0;
	r8 = (r0 + 4)|0;
	r3 = (r3 - r8)|0;
	r3 = r3 & 15;
	r3 = (r0 + r3)|0;
	r8 = r3 >> 2;
	heap32[(r8)] = r0;
	r0 = (r3 + 4)|0;
	r3 = heap32[(r2+1)];
}
}
else{
	r0 = 0;
}
if(!(r3 <1)) //_LBB466_11
{
	r8 = 0;
_11: while(true){
	r9 = heap32[(r2+3)];
	r10 = (r0 + r8)|0;
	r9 = (r9 + r8)|0;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = 64;
	r3 = (r3 + -1)|0;
	r8 = (r8 + 64)|0;
	memcpy(i7);
if(!(r3 !=0)) //_LBB466_10
{
break _11;
}
}
}
	r3 = heap32[(r2+3)];
if(!(r3 ==0)) //_LBB466_15
{
	r8 = heapU8[r1+16];
if(!(r8 ==0)) //_LBB466_14
{
	r8 = gNumAlignedFree;
	r8 = r8 >> 2;
	r9 = heap32[(r8)];
	r9 = (r9 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r8)] = r9;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r2+3)] = 0;
}
	heap8[r1+16] = r6;
	heap32[(r2+3)] = r0;
	heap32[(r2+2)] = r7;
	r3 = heap32[(r2+1)];
}
}
	r0 = r3 << 6;
	r1 = heap32[(r2+3)];
	r0 = (r1 + r0)|0;
	r0 = r0 >> 2;
	heapFloat[(r0)] = f6;
	heapFloat[(r0+1)] = f8;
	heapFloat[(r0+2)] = f0;
	heapFloat[(r0+3)] = f4;
	heapFloat[(r0+4)] = f1;
	heapFloat[(r0+5)] = f2;
	heapFloat[(r0+6)] = f3;
	heapFloat[(r0+7)] = f5;
	heap32[(r0+8)] = -1;
	heap32[(r0+9)] = r4;
	heap32[(r0+10)] = r5;
	r0 = heap32[(r2+1)];
	r0 = (r0 + 1)|0;
	heap32[(r2+1)] = r0;
	return;
}