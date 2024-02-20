function _ZN20btAlignedObjectArrayI16btBroadphasePairE21expandNonInitializingEv(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+2)];
	r3 = heap32[(r1+1)];
	if(r2 ==r3) //_LBB139_2
{
	r4 = 1;
	r5 = r3 << 1;
	r5 = r3 == 0 ? r4 : r5;
	if(r2 >=r5) //_LBB139_1
{
__label__ = 1;
}
else{
	if(r5 !=0) //_LBB139_5
{
	r2 = gNumAlignedAllocs;
	r2 = r2 >> 2;
	r6 = heap32[(r2)];
	r7 = r5 << 4;
	r6 = (r6 + 1)|0;
	r7 = r7 | 3;
	heap32[(r2)] = r6;
	r2 = (r7 + 16)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB139_7
{
	r2 = 0;
	r7 = (r6 + 4)|0;
	r2 = (r2 - r7)|0;
	r2 = r2 & 15;
	r2 = (r6 + r2)|0;
	r7 = (r2 + 4)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r6;
	r6 = r7;
}
}
else{
	r6 = 0;
}
	r7 = (r0 + 12)|0;
	if(r3 <1) //_LBB139_10
{
	r2 = r7 >> 2;
	r9 = heap32[(r2)];
}
else{
	r2 = 0;
	r8 = (r2 - r3)|0;
_12: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r2 << 4;
	r11 = (r9 - r10)|0;
	r11 = r11 >> 2;
	r10 = (r6 - r10)|0;
	r12 = heap32[(r11)];
	r10 = r10 >> 2;
	heap32[(r10)] = r12;
	r12 = heap32[(r11+1)];
	heap32[(r10+1)] = r12;
	r12 = heap32[(r11+2)];
	heap32[(r10+2)] = r12;
	r11 = heap32[(r11+3)];
	r2 = (r2 + -1)|0;
	heap32[(r10+3)] = r11;
if(!(r8 !=r2)) //_LBB139_11
{
break _12;
}
}
	r7 = (r0 + 12)|0;
}
	if(r9 !=0) //_LBB139_15
{
	r2 = heapU8[r0+16];
	if(r2 !=0) //_LBB139_17
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r8 = heap32[(r2)];
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r2)] = r8;
	r2 = heap32[(r9+-1)];
	heap32[(g0)] = r2;
	free(i7);
	r2 = heap32[(r1+1)];
}
else{
	r2 = r3;
}
	r8 = r7 >> 2;
	heap32[(r8)] = 0;
}
else{
	r2 = r3;
}
	r7 = r7 >> 2;
	heap8[r0+16] = r4;
	heap32[(r7)] = r6;
	heap32[(r1+2)] = r5;
__label__ = 19;
}
}
else{
__label__ = 1;
}
if (__label__ == 1){
	r2 = r3;
}
	r0 = (r2 + 1)|0;
	heap32[(r1+1)] = r0;
	r0 = heap32[(r1+3)];
	r1 = r3 << 4;
	r0 = (r0 + r1)|0;
	r_g0 = r0;
	return;
}