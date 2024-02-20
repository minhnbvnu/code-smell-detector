function _ZN6btDbvt19optimizeIncrementalEi(sp)
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
	var f7;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	if(r0 <0) //_LBB84_2
{
	r0 = r1 >> 2;
	r0 = heap32[(r0+3)];
}
	r2 = r1 >> 2;
	r3 = heap32[(r2)];
_4: do {
if(!(r3 ==0)) //_LBB84_20
{
if(!(r0 <1)) //_LBB84_20
{
_6: while(true){
	r3 = 0;
	r4 = r1;
_8: while(true){
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r5 = r4 >> 2;
	r6 = heap32[(r5+10)];
	if(r6 !=0) //_LBB84_6
{
	r6 = heap32[(r5+8)];
	if(uint(r6) >uint(r4)) //_LBB84_8
{
	r7 = r6 >> 2;
	r8 = heap32[(r7+10)];
	r8 = r8 == r4;
	r8 = r8 & 1;
	r9 = (r6 + 36)|0;
	r10 = r8 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r11 = heap32[(r11)];
	if(r11 ==r4) //_LBB84_10
{
	r8 = r8 ^ 1;
	r8 = r8 << 2;
	r9 = (r9 + r8)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r11 = heap32[(r7+8)];
	if(r11 ==0) //_LBB84_12
{
	heap32[(r2)] = r4;
}
else{
	r12 = r11 >> 2;
	r12 = heap32[(r12+10)];
	r12 = r12 == r6;
	r12 = r12 & 1;
	r12 = r12 << 2;
	r12 = (r11 + r12)|0;
	r12 = r12 >> 2;
	heap32[(r12+9)] = r4;
}
	r12 = r9 >> 2;
	heap32[(r12+8)] = r4;
	heap32[(r7+8)] = r4;
	heap32[(r5+8)] = r11;
	r11 = heap32[(r5+9)];
	heap32[(r7+9)] = r11;
	r11 = heap32[(r5+10)];
	heap32[(r7+10)] = r11;
	r11 = heap32[(r5+9)];
	r11 = r11 >> 2;
	heap32[(r11+8)] = r6;
	r11 = heap32[(r5+10)];
	r4 = (r4 + 36)|0;
	r10 = (r4 + r10)|0;
	r11 = r11 >> 2;
	r4 = (r4 + r8)|0;
	r8 = r10 >> 2;
	heap32[(r11+8)] = r6;
	r4 = r4 >> 2;
	heap32[(r8)] = r6;
	heap32[(r4)] = r9;
	f0 = heapFloat[(r7+7)];
	f1 = heapFloat[(r7+6)];
	f2 = heapFloat[(r7+5)];
	f3 = heapFloat[(r7+4)];
	f4 = heapFloat[(r7+3)];
	f5 = heapFloat[(r7+2)];
	f6 = heapFloat[(r7+1)];
	f7 = heapFloat[(r7)];
	heap32[(r7)] = heap32[(r5)];
	heap32[(r7+1)] = heap32[(r5+1)];
	heap32[(r7+2)] = heap32[(r5+2)];
	heap32[(r7+3)] = heap32[(r5+3)];
	heap32[(r7+4)] = heap32[(r5+4)];
	heap32[(r7+5)] = heap32[(r5+5)];
	heap32[(r7+6)] = heap32[(r5+6)];
	heap32[(r7+7)] = heap32[(r5+7)];
	heapFloat[(r5)] = f7;
	heapFloat[(r5+1)] = f6;
	heapFloat[(r5+2)] = f5;
	heapFloat[(r5+3)] = f4;
	heapFloat[(r5+4)] = f3;
	heapFloat[(r5+5)] = f2;
	heapFloat[(r5+6)] = f1;
	heapFloat[(r5+7)] = f0;
}
else{
break _6;
}
}
else{
	r6 = r4;
}
	r4 = heap32[(r2+4)];
	r4 = r4 >>> r3;
	r4 = r4 & 1;
	r4 = r4 << 2;
	r4 = (r6 + r4)|0;
	r3 = (r3 + 1)|0;
	r4 = (r4 + 36)|0;
	r3 = r3 & 31;
}
else{
break _8;
}
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB84_18
{
	r3 = heap32[(r2)];
}
else{
	r3 = 0;
}
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r3 = heap32[(r2+4)];
	r0 = (r0 + -1)|0;
	r3 = (r3 + 1)|0;
	heap32[(r2+4)] = r3;
if(!(r0 !=0)) //_LBB84_5
{
break _4;
}
}
	r4 = _2E_str22;
	r0 = _2E_str1118;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 379;
	_assert(i7);
}
}
} while(0);
	return;
}