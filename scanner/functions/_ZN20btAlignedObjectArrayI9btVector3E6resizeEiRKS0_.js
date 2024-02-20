function _ZN20btAlignedObjectArrayI9btVector3E6resizeEiRKS0_(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r3 = heap32[(fp+1)];
_1: do {
if(!(r2 >r3)) //_LBB454_20
{
if(!(r2 >=r3)) //_LBB454_20
{
	r4 = heap32[(r1+2)];
if(!(r4 >=r3)) //_LBB454_18
{
	if(r3 !=0) //_LBB454_5
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r6 = r3 << 4;
	r5 = (r5 + 1)|0;
	r6 = r6 | 3;
	heap32[(r4)] = r5;
	r4 = (r6 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB454_7
{
	r5 = 0;
	r6 = (r4 + 4)|0;
	r5 = (r5 - r6)|0;
	r5 = r5 & 15;
	r5 = (r4 + r5)|0;
	r6 = (r5 + 4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r4;
	r4 = r6;
}
}
else{
	r4 = 0;
}
	r5 = (r0 + 12)|0;
	if(r2 <1) //_LBB454_10
{
	r6 = r5 >> 2;
	r7 = heap32[(r6)];
}
else{
	r6 = 0;
_14: while(true){
	r7 = r5 >> 2;
	r7 = heap32[(r7)];
	r8 = r6 << 4;
	r9 = (r4 + r8)|0;
	r8 = (r7 + r8)|0;
	r9 = r9 >> 2;
	r8 = r8 >> 2;
	heap32[(r9)] = heap32[(r8)];
	heap32[(r9+1)] = heap32[(r8+1)];
	r6 = (r6 + 1)|0;
	heap32[(r9+2)] = heap32[(r8+2)];
	heap32[(r9+3)] = heap32[(r8+3)];
if(!(r2 !=r6)) //_LBB454_11
{
break _14;
}
}
	r5 = (r0 + 12)|0;
}
if(!(r7 ==0)) //_LBB454_17
{
	r6 = heapU8[r0+16];
if(!(r6 ==0)) //_LBB454_16
{
	r6 = gNumAlignedFree;
	r6 = r6 >> 2;
	r8 = heap32[(r6)];
	r8 = (r8 + 1)|0;
	r7 = r7 >> 2;
	heap32[(r6)] = r8;
	r6 = heap32[(r7+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	r6 = r5 >> 2;
	heap32[(r6)] = 0;
}
	r6 = 1;
	r5 = r5 >> 2;
	heap8[r0+16] = r6;
	heap32[(r5)] = r4;
	heap32[(r1+2)] = r3;
	if(r2 >=r3) //_LBB454_20
{
break _1;
}
}
	r0 = heap32[(fp+2)];
_25: while(true){
	r4 = r2 << 4;
	r5 = heap32[(r1+3)];
	r4 = (r5 + r4)|0;
	r4 = r4 >> 2;
	r5 = r0 >> 2;
	heap32[(r4)] = heap32[(r5)];
	heap32[(r4+1)] = heap32[(r5+1)];
	r2 = (r2 + 1)|0;
	heap32[(r4+2)] = heap32[(r5+2)];
	heap32[(r4+3)] = heap32[(r5+3)];
	if(r3 !=r2) //_LBB454_19
{
continue _25;
}
else{
break _1;
}
}
}
}
} while(0);
	heap32[(r1+1)] = r3;
	return;
}