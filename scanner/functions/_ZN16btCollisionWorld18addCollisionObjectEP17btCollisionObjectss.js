function _ZN16btCollisionWorld18addCollisionObjectEP17btCollisionObjectss(sp)
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
	i7 = sp + -136;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	if(r0 !=0) //_LBB224_2
{
	r1 = heap32[(fp)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = r1 >> 2;
	r5 = heap32[(r4+2)];
	r6 = 0;
_3: while(true){
	if(r5 >r6) //_LBB224_3
{
	r7 = heap32[(r4+4)];
	r8 = r6 << 2;
	r7 = (r7 + r8)|0;
	r7 = r7 >> 2;
	r7 = heap32[(r7)];
	if(r7 ==r0) //_LBB224_6
{
__label__ = 6;
break _3;
}
else{
	r6 = (r6 + 1)|0;
}
}
else{
__label__ = 8;
break _3;
}
}
if (__label__ == 6){
if(!(r5 ==r6)) //_LBB224_8
{
	r0 = _2E_str988;
	r1 = _2E_str887;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 114;
	_assert(i7);
}
}
	r6 = heap32[(r4+3)];
	if(r6 ==r5) //_LBB224_10
{
	r7 = 1;
	r8 = r5 << 1;
	r8 = r5 == 0 ? r7 : r8;
if(!(r6 >=r8)) //_LBB224_9
{
	if(r8 !=0) //_LBB224_13
{
	r6 = gNumAlignedAllocs;
	r6 = r6 >> 2;
	r9 = heap32[(r6)];
	r10 = r8 << 2;
	r9 = (r9 + 1)|0;
	r10 = r10 | 3;
	heap32[(r6)] = r9;
	r6 = (r10 + 16)|0;
	heap32[(g0)] = r6;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB224_15
{
	r9 = 0;
	r10 = (r6 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r6 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r6;
	r6 = r10;
}
}
else{
	r6 = 0;
}
_19: do {
	if(r5 <1) //_LBB224_18
{
	r10 = heap32[(r4+4)];
}
else{
	r9 = 0;
_22: while(true){
	r10 = heap32[(r4+4)];
	r11 = r9 << 2;
	r12 = (r10 + r11)|0;
	r12 = r12 >> 2;
	r11 = (r6 + r11)|0;
	r12 = heap32[(r12)];
	r9 = (r9 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r12;
if(!(r5 !=r9)) //_LBB224_19
{
break _19;
}
}
}
} while(0);
	if(r10 !=0) //_LBB224_22
{
	r9 = heapU8[r1+20];
	if(r9 !=0) //_LBB224_24
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r9 = heap32[(r5)];
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r5)] = r9;
	r5 = heap32[(r10+-1)];
	heap32[(g0)] = r5;
	free(i7);
	r5 = heap32[(r4+2)];
}
	heap32[(r4+4)] = 0;
}
	heap8[r1+20] = r7;
	heap32[(r4+4)] = r6;
	heap32[(r4+3)] = r8;
}
}
	r1 = r5 << 2;
	r5 = heap32[(r4+4)];
	r1 = (r5 + r1)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	r1 = heap32[(r4+2)];
	r1 = (r1 + 1)|0;
	r5 = sp + -64;
	r6 = r0 >> 2;
	heap32[(r4+2)] = r1;
	r1 = r5 >> 2;
	heap32[(fp+-16)] = heap32[(r6+1)];
	heap32[(r1+1)] = heap32[(r6+2)];
	heap32[(r1+2)] = heap32[(r6+3)];
	heap32[(r1+3)] = heap32[(r6+4)];
	heap32[(r1+4)] = heap32[(r6+5)];
	heap32[(r1+5)] = heap32[(r6+6)];
	heap32[(r1+6)] = heap32[(r6+7)];
	heap32[(r1+7)] = heap32[(r6+8)];
	heap32[(r1+8)] = heap32[(r6+9)];
	heap32[(r1+9)] = heap32[(r6+10)];
	heap32[(r1+10)] = heap32[(r6+11)];
	heap32[(r1+11)] = heap32[(r6+12)];
	heap32[(r1+12)] = heap32[(r6+13)];
	heap32[(r1+13)] = heap32[(r6+14)];
	heap32[(r1+14)] = heap32[(r6+15)];
	heap32[(r1+15)] = heap32[(r6+16)];
	r1 = heap32[(r6+48)];
	r7 = r1 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+2)];
	r8 = sp + -80;
	r9 = sp + -96;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r9;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r1 = heap32[(r4+20)];
	r5 = r1 >> 2;
	r7 = heap32[(r6+48)];
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r7 = r7 >> 2;
	r5 = heap32[(r5+2)];
	r7 = heap32[(r7+1)];
	r4 = heap32[(r4+6)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r0;
	heap32[(g0+5)] = r2;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r4;
	heap32[(g0+8)] = 0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	heap32[(r6+47)] = r_g0;
	return;
}
else{
	r0 = _2E_str786;
	r1 = _2E_str887;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 111;
	_assert(i7);
}
}