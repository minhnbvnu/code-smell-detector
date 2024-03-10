function _ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
if(!(r0 ==0)) //_LBB102_46
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = gNumAlignedAllocs;
	r1 = r1 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r1+1)];
	f2 = heapFloat[(r1+2)];
	f3 = heapFloat[(r1+4)];
	f4 = heapFloat[(r1+5)];
	f5 = heapFloat[(r1+6)];
	r1 = (r4 + 1)|0;
	heap32[(r3)] = r1;
	heap32[(g0)] = 275;
	malloc(i7);
	r1 = r_g0;
	if(r1 !=0) //_LBB102_3
{
	r4 = 0;
	r5 = (r1 + 4)|0;
	r4 = (r4 - r5)|0;
	r4 = r4 & 15;
	r4 = (r1 + r4)|0;
	r5 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r1;
	r1 = r5;
}
	r4 = 1;
	r5 = 64;
	r6 = r1 >> 2;
	heap32[(r6)] = r0;
_6: while(true){
	r0 = r4;
	r4 = (r0 + -1)|0;
	r6 = r4 << 2;
	r6 = (r1 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	r7 = r6 >> 2;
	f6 = heapFloat[(r7)];
	if(f6 <=f3) //_LBB102_7
{
	f6 = heapFloat[(r7+4)];
if(!(f6 <f0)) //_LBB102_6
{
	f6 = heapFloat[(r7+1)];
if(!(f6 >f4)) //_LBB102_6
{
	f6 = heapFloat[(r7+5)];
if(!(f6 <f1)) //_LBB102_6
{
	f6 = heapFloat[(r7+2)];
if(!(f6 >f5)) //_LBB102_6
{
	f6 = heapFloat[(r7+6)];
if(!(f6 <f2)) //_LBB102_6
{
	r8 = heap32[(r7+10)];
	if(r8 ==0) //_LBB102_42
{
	r0 = r2 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
else{
	r6 = heap32[(r7+9)];
	if(r5 ==r4) //_LBB102_15
{
	r8 = 1;
	r9 = r4 << 1;
	r8 = r4 == 0 ? r8 : r9;
if(!(r5 >=r8)) //_LBB102_14
{
	if(r8 !=0) //_LBB102_18
{
	r5 = heap32[(r3)];
	r9 = r8 << 2;
	r5 = (r5 + 1)|0;
	r9 = r9 | 3;
	heap32[(r3)] = r5;
	r5 = (r9 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r9 = r_g0;
	if(r9 !=0) //_LBB102_20
{
	r5 = 0;
	r10 = (r9 + 4)|0;
	r5 = (r5 - r10)|0;
	r5 = r5 & 15;
	r5 = (r9 + r5)|0;
	r10 = (r5 + 4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r9;
	r9 = r10;
}
}
else{
	r9 = 0;
}
if(!(r4 <1)) //_LBB102_24
{
	r4 = (r0 + -1)|0;
	r5 = r1;
	r10 = r9;
_28: while(true){
	r11 = r5 >> 2;
	r4 = (r4 + -1)|0;
	r12 = (r10 + 4)|0;
	r5 = (r5 + 4)|0;
	r10 = r10 >> 2;
	r11 = heap32[(r11)];
	heap32[(r10)] = r11;
	r10 = r12;
if(!(r4 !=0)) //_LBB102_23
{
break _28;
}
}
}
	if(r1 !=0) //_LBB102_26
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r4)] = r5;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
	r5 = r8;
	r1 = r9;
}
else{
	r5 = r8;
	r1 = r9;
}
}
}
	r4 = r0 << 2;
	r8 = (r1 + r4)|0;
	r8 = r8 >> 2;
	heap32[(r8+-1)] = r6;
	r6 = heap32[(r7+10)];
	if(r5 ==r0) //_LBB102_29
{
	r7 = 1;
	r8 = r0 << 1;
	r7 = r0 == 0 ? r7 : r8;
if(!(r5 >=r7)) //_LBB102_28
{
	if(r7 !=0) //_LBB102_32
{
	r5 = heap32[(r3)];
	r8 = r7 << 2;
	r5 = (r5 + 1)|0;
	r8 = r8 | 3;
	heap32[(r3)] = r5;
	r5 = (r8 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB102_34
{
	r5 = 0;
	r9 = (r8 + 4)|0;
	r5 = (r5 - r9)|0;
	r5 = r5 & 15;
	r5 = (r8 + r5)|0;
	r9 = (r5 + 4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r8;
	r8 = r9;
}
}
else{
	r8 = 0;
}
_43: do {
if(!(r0 <1)) //_LBB102_38
{
	r5 = r1;
	r9 = r8;
	r10 = r0;
_45: while(true){
	r11 = r5 >> 2;
	r10 = (r10 + -1)|0;
	r12 = (r9 + 4)|0;
	r5 = (r5 + 4)|0;
	r9 = r9 >> 2;
	r11 = heap32[(r11)];
	heap32[(r9)] = r11;
	r9 = r12;
if(!(r10 !=0)) //_LBB102_37
{
break _43;
}
}
}
} while(0);
	if(r1 !=0) //_LBB102_40
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r9 = heap32[(r5)];
	r9 = (r9 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r5)] = r9;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
	r5 = r7;
	r1 = r8;
}
else{
	r5 = r7;
	r1 = r8;
}
}
}
	r7 = (r1 + r4)|0;
	r4 = (r0 + 1)|0;
	r0 = r7 >> 2;
	heap32[(r0)] = r6;
}
}
}
}
}
}
}
if(!(r4 >0)) //_LBB102_5
{
break _6;
}
}
if(!(r1 ==0)) //_LBB102_46
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
	r2 = (r2 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r0)] = r2;
	r0 = heap32[(r1+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	return;
}