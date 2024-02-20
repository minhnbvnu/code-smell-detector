function _ZN28btHashedOverlappingPairCache20sortOverlappingPairsEP12btDispatcher(sp)
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
	var r15;
	var r16;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = sp + -24;
	r1 = 1;
	r2 = r0 >> 2;
	heap8[sp+-8] = r1;
	heap32[(r2+3)] = 0;
	r3 = heap32[(fp)];
	heap32[(r2+1)] = 0;
	r4 = r3 >> 2;
	heap32[(r2+2)] = 0;
	r5 = heap32[(r4+2)];
_1: do {
	if(r5 >0) //_LBB138_2
{
	r6 = heap32[(fp+1)];
	r7 = 0;
	r5 = r7;
_3: while(true){
	r8 = heap32[(r4+4)];
	if(r7 ==r5) //_LBB138_5
{
	r9 = 1;
	r10 = r5 << 1;
	r10 = r5 == 0 ? r9 : r10;
if(!(r7 >=r10)) //_LBB138_4
{
	if(r10 !=0) //_LBB138_8
{
	r7 = gNumAlignedAllocs;
	r7 = r7 >> 2;
	r11 = heap32[(r7)];
	r12 = r10 << 4;
	r11 = (r11 + 1)|0;
	r12 = r12 | 3;
	heap32[(r7)] = r11;
	r7 = (r12 + 16)|0;
	heap32[(g0)] = r7;
	malloc(i7);
	r7 = r_g0;
	if(r7 !=0) //_LBB138_10
{
	r11 = 0;
	r12 = (r7 + 4)|0;
	r11 = (r11 - r12)|0;
	r11 = r11 & 15;
	r11 = (r7 + r11)|0;
	r12 = (r11 + 4)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r7;
	r7 = r12;
}
}
else{
	r7 = 0;
}
	if(r5 <1) //_LBB138_13
{
	r13 = heap32[(r2+3)];
}
else{
	r11 = 0;
	r12 = (r11 - r5)|0;
_16: while(true){
	r13 = heap32[(r2+3)];
	r14 = r11 << 4;
	r15 = (r13 - r14)|0;
	r15 = r15 >> 2;
	r14 = (r7 - r14)|0;
	r16 = heap32[(r15)];
	r14 = r14 >> 2;
	heap32[(r14)] = r16;
	r16 = heap32[(r15+1)];
	heap32[(r14+1)] = r16;
	r16 = heap32[(r15+2)];
	heap32[(r14+2)] = r16;
	r15 = heap32[(r15+3)];
	r11 = (r11 + -1)|0;
	heap32[(r14+3)] = r15;
if(!(r12 !=r11)) //_LBB138_14
{
break _16;
}
}
}
	if(r13 !=0) //_LBB138_17
{
	r11 = heapU8[sp+-8];
	if(r11 !=0) //_LBB138_19
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r11 = heap32[(r5)];
	r11 = (r11 + 1)|0;
	r12 = r13 >> 2;
	heap32[(r5)] = r11;
	r5 = heap32[(r12+-1)];
	heap32[(g0)] = r5;
	free(i7);
	r5 = heap32[(r2+1)];
}
	heap32[(r2+3)] = 0;
}
	heap8[sp+-8] = r9;
	heap32[(r2+3)] = r7;
	heap32[(r2+2)] = r10;
}
}
	r7 = r1 << 4;
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r5 = r5 << 4;
	r8 = heap32[(r2+3)];
	r5 = (r8 + r5)|0;
	r8 = heap32[(r7+-4)];
	r5 = r5 >> 2;
	heap32[(r5)] = r8;
	r8 = heap32[(r7+-3)];
	heap32[(r5+1)] = r8;
	r8 = heap32[(r7+-2)];
	heap32[(r5+2)] = r8;
	r7 = heap32[(r7+-1)];
	heap32[(r5+3)] = r7;
	r5 = heap32[(r2+1)];
	r5 = (r5 + 1)|0;
	heap32[(r2+1)] = r5;
	r7 = heap32[(r4+2)];
	if(r7 <=r1) //_LBB138_24
{
break _3;
}
else{
	r7 = heap32[(r2+2)];
	r1 = (r1 + 1)|0;
}
}
	if(r5 >0) //_LBB138_26
{
	r1 = 0;
_29: while(true){
	r5 = heap32[(r2+3)];
	r7 = r1 << 4;
	r8 = heap32[(r4)];
	r5 = (r5 + r7)|0;
	r5 = r5 >> 2;
	r7 = r8 >> 2;
	r7 = heap32[(r7+3)];
	r8 = heap32[(r5+1)];
	r5 = heap32[(r5)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r6;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r5 = heap32[(r2+1)];
	r1 = (r1 + 1)|0;
	if(r5 >r1) //_LBB138_27
{
continue _29;
}
else{
break _1;
}
}
}
}
else{
	r5 = 0;
}
} while(0);
	r1 = heap32[(r4+14)];
	if(r1 >0) //_LBB138_30
{
	r5 = 0;
_35: while(true){
	r1 = r5 << 2;
	r6 = heap32[(r4+16)];
	r1 = (r6 + r1)|0;
	r5 = (r5 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = -1;
	r1 = heap32[(r4+14)];
if(!(r1 >r5)) //_LBB138_31
{
break _35;
}
}
	r5 = heap32[(r2+1)];
}
	if(r5 >1) //_LBB138_35
{
	r5 = (r5 + -1)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r5;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
	r5 = heap32[(r2+1)];
}
_42: do {
if(!(r5 <1)) //_LBB138_39
{
	r0 = 0;
_44: while(true){
	r1 = heap32[(r2+3)];
	r5 = r0 << 4;
	r6 = heap32[(r4)];
	r1 = (r1 + r5)|0;
	r1 = r1 >> 2;
	r5 = r6 >> 2;
	r5 = heap32[(r5+2)];
	r6 = heap32[(r1+1)];
	r1 = heap32[(r1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	r0 = (r0 + 1)|0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r1 = heap32[(r2+1)];
	if(r1 >r0) //_LBB138_38
{
continue _44;
}
else{
break _42;
}
}
}
} while(0);
	r0 = heap32[(r2+3)];
if(!(r0 ==0)) //_LBB138_42
{
	r1 = heapU8[sp+-8];
if(!(r1 ==0)) //_LBB138_42
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	return;
}