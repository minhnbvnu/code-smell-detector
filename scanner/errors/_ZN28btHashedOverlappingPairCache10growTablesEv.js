function _ZN28btHashedOverlappingPairCache10growTablesEv(sp)
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
	r1 = r0 >> 2;
	r2 = heap32[(r1+9)];
	r3 = heap32[(r1+3)];
_1: do {
if(!(r2 >=r3)) //_LBB140_48
{
_3: do {
if(!(r2 >r3)) //_LBB140_20
{
	r4 = heap32[(r1+10)];
if(!(r4 >=r3)) //_LBB140_18
{
	if(r3 !=0) //_LBB140_5
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r6 = r3 << 2;
	r5 = (r5 + 1)|0;
	r6 = r6 | 3;
	heap32[(r4)] = r5;
	r4 = (r6 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB140_7
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
	r5 = (r0 + 44)|0;
	if(r2 <1) //_LBB140_10
{
	r6 = r5 >> 2;
	r7 = heap32[(r6)];
}
else{
	r6 = 0;
_15: while(true){
	r7 = r5 >> 2;
	r7 = heap32[(r7)];
	r8 = r6 << 2;
	r9 = (r7 + r8)|0;
	r9 = r9 >> 2;
	r8 = (r4 + r8)|0;
	r9 = heap32[(r9)];
	r6 = (r6 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r9;
if(!(r2 !=r6)) //_LBB140_11
{
break _15;
}
}
	r5 = (r0 + 44)|0;
}
if(!(r7 ==0)) //_LBB140_17
{
	r6 = heapU8[r0+48];
if(!(r6 ==0)) //_LBB140_16
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
	heap8[r0+48] = r6;
	heap32[(r5)] = r4;
	heap32[(r1+10)] = r3;
}
	r4 = r2;
_26: while(true){
	r5 = r4 << 2;
	r6 = heap32[(r1+11)];
	r5 = (r6 + r5)|0;
	r4 = (r4 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = 0;
if(!(r3 !=r4)) //_LBB140_19
{
break _3;
}
}
}
} while(0);
	heap32[(r1+9)] = r3;
	r4 = heap32[(r1+14)];
_29: do {
if(!(r4 >r3)) //_LBB140_39
{
if(!(r4 >=r3)) //_LBB140_39
{
	r5 = heap32[(r1+15)];
if(!(r5 >=r3)) //_LBB140_38
{
	if(r3 !=0) //_LBB140_25
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r7 = r3 << 2;
	r6 = (r6 + 1)|0;
	r7 = r7 | 3;
	heap32[(r5)] = r6;
	r5 = (r7 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB140_27
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
}
else{
	r5 = 0;
}
	r6 = (r0 + 64)|0;
	if(r4 <1) //_LBB140_30
{
	r7 = r6 >> 2;
	r8 = heap32[(r7)];
}
else{
	r7 = 0;
_42: while(true){
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r9 = r7 << 2;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r5 + r9)|0;
	r10 = heap32[(r10)];
	r7 = (r7 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r10;
if(!(r4 !=r7)) //_LBB140_31
{
break _42;
}
}
	r6 = (r0 + 64)|0;
}
if(!(r8 ==0)) //_LBB140_37
{
	r7 = heapU8[r0+68];
if(!(r7 ==0)) //_LBB140_36
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r9 = heap32[(r7)];
	r9 = (r9 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r7)] = r9;
	r7 = heap32[(r8+-1)];
	heap32[(g0)] = r7;
	free(i7);
}
	r7 = r6 >> 2;
	heap32[(r7)] = 0;
}
	r7 = 1;
	r6 = r6 >> 2;
	heap8[r0+68] = r7;
	heap32[(r6)] = r5;
	heap32[(r1+15)] = r3;
	if(r4 >=r3) //_LBB140_39
{
break _29;
}
}
_52: while(true){
	r0 = r4 << 2;
	r5 = heap32[(r1+16)];
	r0 = (r5 + r0)|0;
	r4 = (r4 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
if(!(r3 !=r4)) //_LBB140_38
{
break _29;
}
}
}
}
} while(0);
	heap32[(r1+14)] = r3;
_55: do {
if(!(r3 <1)) //_LBB140_45
{
	r0 = 0;
_57: while(true){
	r4 = r0 << 2;
	r5 = heap32[(r1+11)];
	r4 = (r5 + r4)|0;
	r0 = (r0 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = -1;
if(!(r3 !=r0)) //_LBB140_41
{
break _57;
}
}
if(!(r3 <1)) //_LBB140_45
{
	r0 = 0;
_61: while(true){
	r4 = r0 << 2;
	r5 = heap32[(r1+16)];
	r4 = (r5 + r4)|0;
	r0 = (r0 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = -1;
if(!(r3 !=r0)) //_LBB140_44
{
break _55;
}
}
}
}
} while(0);
if(!(r2 <1)) //_LBB140_48
{
	r0 = 0;
_65: while(true){
	r3 = heap32[(r1+4)];
	r4 = r0 << 4;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r4 = heap32[(r3+1)];
	r3 = heap32[(r3)];
	r4 = r4 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r4+3)];
	r4 = r4 << 16;
	r3 = heap32[(r3+3)];
	r3 = r4 | r3;
	r4 = r3 << 15;
	r4 = r4 ^ -1;
	r3 = (r3 + r4)|0;
	r4 = r3 >> 10;
	r3 = r4 ^ r3;
	r3 = (r3 * 9)|0;
	r4 = r3 >> 6;
	r3 = r4 ^ r3;
	r4 = r3 << 11;
	r4 = r4 ^ -1;
	r3 = (r3 + r4)|0;
	r4 = r3 >> 16;
	r5 = heap32[(r1+3)];
	r3 = r4 ^ r3;
	r4 = (r5 + -1)|0;
	r3 = r3 & r4;
	r3 = r3 << 2;
	r4 = heap32[(r1+11)];
	r4 = (r4 + r3)|0;
	r4 = r4 >> 2;
	r5 = r0 << 2;
	r6 = heap32[(r1+16)];
	r5 = (r6 + r5)|0;
	r4 = heap32[(r4)];
	r5 = r5 >> 2;
	heap32[(r5)] = r4;
	r4 = heap32[(r1+11)];
	r3 = (r4 + r3)|0;
	r4 = (r0 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = r0;
	r0 = r4;
	if(r2 !=r4) //_LBB140_47
{
continue _65;
}
else{
break _1;
}
}
}
}
} while(0);
	return;
}