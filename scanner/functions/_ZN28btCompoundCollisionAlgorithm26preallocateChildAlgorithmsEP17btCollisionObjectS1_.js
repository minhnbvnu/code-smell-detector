function _ZN28btCompoundCollisionAlgorithm26preallocateChildAlgorithmsEP17btCollisionObjectS1_(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+28];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = r1 == 0 ? r2 : r3;
	r5 = r4 >> 2;
	r6 = heap32[(r5+48)];
	r6 = r6 >> 2;
	r7 = heap32[(r6+1)];
	if(r7 ==31) //_LBB256_2
{
	r7 = r0 >> 2;
	r8 = heap32[(r7+3)];
	r9 = heap32[(r6+4)];
_3: do {
if(!(r8 >r9)) //_LBB256_21
{
if(!(r8 >=r9)) //_LBB256_21
{
	r10 = heap32[(r7+4)];
if(!(r10 >=r9)) //_LBB256_20
{
	if(r9 !=0) //_LBB256_7
{
	r10 = gNumAlignedAllocs;
	r10 = r10 >> 2;
	r11 = heap32[(r10)];
	r12 = r9 << 2;
	r11 = (r11 + 1)|0;
	r12 = r12 | 3;
	heap32[(r10)] = r11;
	r10 = (r12 + 16)|0;
	heap32[(g0)] = r10;
	malloc(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB256_9
{
	r11 = 0;
	r12 = (r10 + 4)|0;
	r11 = (r11 - r12)|0;
	r11 = r11 & 15;
	r11 = (r10 + r11)|0;
	r12 = (r11 + 4)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r10;
	r10 = r12;
}
}
else{
	r10 = 0;
}
	r11 = (r0 + 20)|0;
	if(r8 <1) //_LBB256_12
{
	r12 = r11 >> 2;
	r13 = heap32[(r12)];
}
else{
	r12 = 0;
_16: while(true){
	r13 = r11 >> 2;
	r13 = heap32[(r13)];
	r14 = r12 << 2;
	r15 = (r13 + r14)|0;
	r15 = r15 >> 2;
	r14 = (r10 + r14)|0;
	r15 = heap32[(r15)];
	r12 = (r12 + 1)|0;
	r14 = r14 >> 2;
	heap32[(r14)] = r15;
if(!(r8 !=r12)) //_LBB256_13
{
break _16;
}
}
	r11 = (r0 + 20)|0;
}
if(!(r13 ==0)) //_LBB256_19
{
	r12 = heapU8[r0+24];
if(!(r12 ==0)) //_LBB256_18
{
	r12 = gNumAlignedFree;
	r12 = r12 >> 2;
	r14 = heap32[(r12)];
	r14 = (r14 + 1)|0;
	r13 = r13 >> 2;
	heap32[(r12)] = r14;
	r12 = heap32[(r13+-1)];
	heap32[(g0)] = r12;
	free(i7);
}
	r12 = r11 >> 2;
	heap32[(r12)] = 0;
}
	r12 = 1;
	r11 = r11 >> 2;
	heap8[r0+24] = r12;
	heap32[(r11)] = r10;
	heap32[(r7+4)] = r9;
	if(r8 >=r9) //_LBB256_21
{
break _3;
}
}
_26: while(true){
	r0 = r8 << 2;
	r10 = heap32[(r7+5)];
	r0 = (r10 + r0)|0;
	r8 = (r8 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
if(!(r9 !=r8)) //_LBB256_20
{
break _3;
}
}
}
}
} while(0);
	heap32[(r7+3)] = r9;
_29: do {
if(!(r9 <1)) //_LBB256_27
{
	r0 = r1 == 0 ? r3 : r2;
	r1 = 0;
_31: while(true){
	r2 = heap32[(r6+16)];
	if(r2 ==0) //_LBB256_25
{
	r2 = (r1 * 20)|0;
	r2 = r2 << 2;
	r3 = heap32[(r6+6)];
	r2 = (r3 + r2)|0;
	r2 = r2 >> 2;
	r3 = heap32[(r5+48)];
	r2 = heap32[(r2+16)];
	heap32[(r5+48)] = r2;
	r2 = heap32[(r7+1)];
	r8 = r2 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r10 = heap32[(r7+8)];
	r11 = heap32[(r7+5)];
	r12 = r1 << 2;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r10;
	r2 = (r11 + r12)|0;
	r2 = r2 >> 2;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	heap32[(r2)] = r_g0;
	heap32[(r5+48)] = r3;
}
else{
	r2 = r1 << 2;
	r3 = heap32[(r7+5)];
	r2 = (r3 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
}
	r1 = (r1 + 1)|0;
if(!(r9 !=r1)) //_LBB256_23
{
break _29;
}
}
}
} while(0);
	return;
}
else{
	r0 = _2E_str99;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 44;
	_assert(i7);
}
}