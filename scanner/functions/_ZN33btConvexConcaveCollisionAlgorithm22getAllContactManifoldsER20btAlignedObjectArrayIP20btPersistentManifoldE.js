function _ZN33btConvexConcaveCollisionAlgorithm22getAllContactManifoldsER20btAlignedObjectArrayIP20btPersistentManifoldE(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+19)];
if(!(r1 ==0)) //_LBB290_22
{
	r2 = heap32[(fp+1)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+2)];
	r5 = heap32[(r3+1)];
	if(r4 ==r5) //_LBB290_3
{
	r6 = 1;
	r7 = r5 << 1;
	r7 = r5 == 0 ? r6 : r7;
if(!(r4 >=r7)) //_LBB290_2
{
	if(r7 !=0) //_LBB290_6
{
	r1 = gNumAlignedAllocs;
	r1 = r1 >> 2;
	r4 = heap32[(r1)];
	r8 = r7 << 2;
	r4 = (r4 + 1)|0;
	r8 = r8 | 3;
	heap32[(r1)] = r4;
	r1 = (r8 + 16)|0;
	heap32[(g0)] = r1;
	malloc(i7);
	r1 = r_g0;
	if(r1 !=0) //_LBB290_8
{
	r4 = 0;
	r8 = (r1 + 4)|0;
	r4 = (r4 - r8)|0;
	r4 = r4 & 15;
	r4 = (r1 + r4)|0;
	r8 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r1;
	r1 = r8;
}
}
else{
	r1 = 0;
}
	r4 = (r2 + 12)|0;
	if(r5 <1) //_LBB290_11
{
	r8 = r4 >> 2;
	r9 = heap32[(r8)];
}
else{
	r8 = 0;
_14: while(true){
	r9 = r4 >> 2;
	r9 = heap32[(r9)];
	r10 = r8 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r1 + r10)|0;
	r11 = heap32[(r11)];
	r8 = (r8 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r11;
if(!(r5 !=r8)) //_LBB290_12
{
break _14;
}
}
	r4 = (r2 + 12)|0;
}
	if(r9 !=0) //_LBB290_16
{
	r8 = heapU8[r2+16];
	if(r8 !=0) //_LBB290_18
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r8 = heap32[(r5)];
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r5)] = r8;
	r5 = heap32[(r9+-1)];
	heap32[(g0)] = r5;
	free(i7);
	r5 = heap32[(r3+1)];
}
	r8 = r4 >> 2;
	heap32[(r8)] = 0;
}
	r4 = r4 >> 2;
	heap8[r2+16] = r6;
	heap32[(r4)] = r1;
	heap32[(r3+2)] = r7;
	r1 = heap32[(r0+19)];
}
}
	r0 = r5 << 2;
	r2 = heap32[(r3+3)];
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r3+1)];
	r0 = (r0 + 1)|0;
	heap32[(r3+1)] = r0;
}
	return;
}