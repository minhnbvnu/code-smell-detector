function _ZN13BenchmarkDemo19createLargeMeshBodyEv(sp)
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
	var r11;
	var r12;
	var r13;
	var r14;
var __label__ = 0;
	i7 = sp + -80;var g0 = i7>>2; // save stack
	r0 = sp + -64;
	r1 = r0 >> 2;
	heap32[(fp+-16)] = 1065353216;
	heap32[(r1+1)] = 0;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 0;
	heap32[(r1+4)] = 0;
	heap32[(r1+5)] = 1065353216;
	heap32[(r1+6)] = 0;
	heap32[(r1+7)] = 0;
	heap32[(r1+8)] = 0;
	heap32[(r1+9)] = 0;
	heap32[(r1+10)] = 1065353216;
	heap32[(r1+11)] = 0;
	heap32[(r1+12)] = 0;
	heap32[(r1+13)] = 0;
	r2 = 0;
	heap32[(r1+14)] = 0;
	heap32[(r1+15)] = 0;
_1: while(true){
	r3 = gNumAlignedAllocs;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r5 = (r4 + 1)|0;
	heap32[(r3)] = r5;
	heap32[(g0)] = 103;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB23_3
{
	r6 = 0;
	r7 = (r5 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r5 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r5;
	r5 = r7;
}
	r6 = r5 >> 2;
	heap32[(r6+1)] = 1065353216;
	heap32[(r6+2)] = 1065353216;
	r7 = _ZTV26btTriangleIndexVertexArray;
	heap32[(r6+3)] = 1065353216;
	r7 = (r7 + 8)|0;
	heap32[(r6+4)] = 0;
	r8 = 1;
	heap32[(r6)] = r7;
	heap8[r5+36] = r8;
	heap32[(r6+8)] = 0;
	heap32[(r6+6)] = 0;
	r7 = LandscapeVtx;
	r9 = r2 << 2;
	r10 = LandscapeVtxCount;
	r11 = LandscapeIdx;
	r12 = LandscapeIdxCount;
	r7 = (r7 + r9)|0;
	r10 = (r10 + r9)|0;
	r11 = (r11 + r9)|0;
	r9 = (r12 + r9)|0;
	heap32[(r6+7)] = 0;
	r7 = r7 >> 2;
	heap32[(r6+12)] = 0;
	r10 = r10 >> 2;
	r11 = r11 >> 2;
	r9 = r9 >> 2;
	r7 = heap32[(r7)];
	r10 = heap32[(r10)];
	r11 = heap32[(r11)];
	r9 = heap32[(r9)];
	r12 = (r4 + 2)|0;
	heap32[(r3)] = r12;
	heap32[(g0)] = 51;
	malloc(i7);
	r12 = r_g0;
	r9 = (r9 / 3)|0;
	if(r12 !=0) //_LBB23_6
{
	r13 = 0;
	r14 = (r12 + 4)|0;
	r13 = (r13 - r14)|0;
	r13 = r13 & 15;
	r13 = (r12 + r13)|0;
	r14 = (r13 + 4)|0;
	r13 = r13 >> 2;
	heap32[(r13)] = r12;
	r12 = r14;
}
	heap8[r5+36] = r8;
	heap32[(r6+8)] = r12;
	heap32[(r6+7)] = 1;
	r13 = heap32[(r6+6)];
	r13 = r13 << 5;
	r12 = (r12 + r13)|0;
	r12 = r12 >> 2;
	heap32[(r12)] = r9;
	heap32[(r12+1)] = r11;
	heap32[(r12+2)] = 6;
	heap32[(r12+3)] = r10;
	heap32[(r12+4)] = r7;
	heap32[(r12+5)] = 12;
	heap32[(r12+6)] = 3;
	heap32[(r12+7)] = 0;
	r7 = heap32[(r6+6)];
	r9 = (r7 + 1)|0;
	heap32[(r6+6)] = r9;
	r7 = r7 << 5;
	r9 = heap32[(r6+8)];
	r7 = (r9 + r7)|0;
	r7 = r7 >> 2;
	r4 = (r4 + 3)|0;
	heap32[(r7+6)] = 3;
	heap32[(r3)] = r4;
	heap32[(g0)] = 95;
	malloc(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB23_9
{
	r4 = 0;
	r7 = (r3 + 4)|0;
	r4 = (r4 - r7)|0;
	r4 = r4 & 15;
	r4 = (r3 + r4)|0;
	r7 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r3;
	r3 = r7;
}
	r4 = r3 >> 2;
	r7 = _ZTV19btTriangleMeshShape;
	heap32[(r4+2)] = 0;
	r7 = (r7 + 8)|0;
	heap32[(r4+3)] = 0;
	heap32[(r4)] = r7;
	heap32[(r4+12)] = r5;
	heap32[(r4+1)] = 21;
	r7 = heap32[(r6)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+10)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r7 = r_g0;
	if(r7 ==0) //_LBB23_12
{
	heap32[(g0)] = r3;
	_ZN19btTriangleMeshShape15recalcLocalAabbEv(i7);
}
else{
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+12)];
	r7 = (r3 + 16)|0;
	r9 = (r3 + 32)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r9;
	__FUNCTION_TABLE__[(r6)>>2](i7);
}
	r5 = _ZTV22btBvhTriangleMeshShape;
	r5 = (r5 + 8)|0;
	heap32[(r4)] = r5;
	heap32[(r4+13)] = 0;
	heap32[(r4+14)] = 0;
	r5 = 0;
	heap8[r3+60] = r8;
	heap8[r3+61] = r5;
	heap32[(r4+1)] = 21;
	heap32[(g0)] = r3;
	_ZN22btBvhTriangleMeshShape17buildOptimizedBvhEv(i7);
	heap32[(r1+12)] = 0;
	heap32[(r1+13)] = -1043857408;
	r4 = _ZL14benchmarkDemo4;
	heap32[(r1+14)] = 0;
	r5 = r4 >> 2;
	heap32[(r1+15)] = 0;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r2 = (r2 + 1)|0;
	r3 = r_g0 >> 2;
	heap32[(r3+56)] = 1063675494;
	if(r2 !=8) //_LBB23_1
{
continue _1;
}
else{
break _1;
}
}
	return;
}