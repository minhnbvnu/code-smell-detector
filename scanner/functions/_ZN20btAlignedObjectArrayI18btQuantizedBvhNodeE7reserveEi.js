function _ZN20btAlignedObjectArrayI18btQuantizedBvhNodeE7reserveEi(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = r0 >> 2;
	r3 = heap32[(r2+2)];
if(!(r3 >=r1)) //_LBB115_16
{
	if(r1 !=0) //_LBB115_3
{
	r3 = gNumAlignedAllocs;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r5 = r1 << 4;
	r4 = (r4 + 1)|0;
	r5 = r5 | 3;
	heap32[(r3)] = r4;
	r3 = (r5 + 16)|0;
	heap32[(g0)] = r3;
	malloc(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB115_5
{
	r4 = 0;
	r5 = (r3 + 4)|0;
	r4 = (r4 - r5)|0;
	r4 = r4 & 15;
	r4 = (r3 + r4)|0;
	r5 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r3;
	r3 = r5;
}
}
else{
	r3 = 0;
}
	r4 = heap32[(r2+1)];
	r5 = (r0 + 12)|0;
	if(r4 <1) //_LBB115_8
{
	r4 = r5 >> 2;
	r7 = heap32[(r4)];
}
else{
	r6 = 0;
_11: while(true){
	r7 = r5 >> 2;
	r7 = heap32[(r7)];
	r8 = r6 << 4;
	r9 = heapU16[(r7+r8)>>1];
	r10 = (r7 + r8)|0;
	heap16[(r3+r8)>>1] = r9;
	r8 = (r3 + r8)|0;
	r9 = heapU16[(r10+2)>>1];
	heap16[(r8+2)>>1] = r9;
	r9 = heapU16[(r10+4)>>1];
	heap16[(r8+4)>>1] = r9;
	r9 = heapU16[(r10+6)>>1];
	heap16[(r8+6)>>1] = r9;
	r9 = heapU16[(r10+8)>>1];
	heap16[(r8+8)>>1] = r9;
	r9 = heapU16[(r10+10)>>1];
	r10 = r10 >> 2;
	heap16[(r8+10)>>1] = r9;
	r6 = (r6 + 1)|0;
	r8 = r8 >> 2;
	r9 = heap32[(r10+3)];
	heap32[(r8+3)] = r9;
if(!(r4 !=r6)) //_LBB115_9
{
break _11;
}
}
	r5 = (r0 + 12)|0;
}
if(!(r7 ==0)) //_LBB115_15
{
	r4 = heapU8[r0+16];
if(!(r4 ==0)) //_LBB115_14
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r6 = heap32[(r4)];
	r6 = (r6 + 1)|0;
	r7 = r7 >> 2;
	heap32[(r4)] = r6;
	r4 = heap32[(r7+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	r4 = r5 >> 2;
	heap32[(r4)] = 0;
}
	r4 = 1;
	r5 = r5 >> 2;
	heap8[r0+16] = r4;
	heap32[(r5)] = r3;
	heap32[(r2+2)] = r1;
}
	return;
}