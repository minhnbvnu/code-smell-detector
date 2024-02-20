function _ZN23btDiscreteDynamicsWorld9addActionEP17btActionInterface(sp)
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
	r1 = r0 >> 2;
	r2 = heap32[(r1+64)];
	r3 = heap32[(r1+63)];
	r4 = heap32[(fp+1)];
	if(r2 ==r3) //_LBB652_2
{
	r5 = 1;
	r6 = r3 << 1;
	r6 = r3 == 0 ? r5 : r6;
if(!(r2 >=r6)) //_LBB652_1
{
	if(r6 !=0) //_LBB652_5
{
	r2 = gNumAlignedAllocs;
	r2 = r2 >> 2;
	r7 = heap32[(r2)];
	r8 = r6 << 2;
	r7 = (r7 + 1)|0;
	r8 = r8 | 3;
	heap32[(r2)] = r7;
	r2 = (r8 + 16)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r2 = r_g0;
	if(r2 !=0) //_LBB652_7
{
	r7 = 0;
	r8 = (r2 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r2 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r2;
	r2 = r8;
}
}
else{
	r2 = 0;
}
	r7 = (r0 + 260)|0;
	if(r3 <1) //_LBB652_10
{
	r8 = r7 >> 2;
	r9 = heap32[(r8)];
}
else{
	r8 = 0;
_12: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r8 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r2 + r10)|0;
	r11 = heap32[(r11)];
	r8 = (r8 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r11;
if(!(r3 !=r8)) //_LBB652_11
{
break _12;
}
}
	r7 = (r0 + 260)|0;
}
	if(r9 !=0) //_LBB652_15
{
	r8 = heapU8[r0+264];
	if(r8 !=0) //_LBB652_17
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r8 = heap32[(r3)];
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r3)] = r8;
	r3 = heap32[(r9+-1)];
	heap32[(g0)] = r3;
	free(i7);
	r3 = heap32[(r1+63)];
}
	r8 = r7 >> 2;
	heap32[(r8)] = 0;
}
	r7 = r7 >> 2;
	heap8[r0+264] = r5;
	heap32[(r7)] = r2;
	heap32[(r1+64)] = r6;
}
}
	r0 = r3 << 2;
	r2 = heap32[(r1+65)];
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r4;
	r0 = heap32[(r1+63)];
	r0 = (r0 + 1)|0;
	heap32[(r1+63)] = r0;
	return;
}