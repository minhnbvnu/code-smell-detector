function _ZN11btRigidBody16addConstraintRefEP17btTypedConstraint(sp)
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
	r2 = heap32[(fp+1)];
	r3 = heap32[(r1+120)];
	r4 = 0;
_1: while(true){
	if(r3 >r4) //_LBB686_1
{
	r5 = heap32[(r1+122)];
	r6 = r4 << 2;
	r5 = (r5 + r6)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	if(r5 !=r2) //_LBB686_3
{
	r4 = (r4 + 1)|0;
continue _1;
}
else{
__label__ = 5;
break _1;
}
}
else{
__label__ = 4;
break _1;
}
}
if (__label__ == 4){
	r4 = r3;
}
if(!(r3 !=r4)) //_LBB686_27
{
	r4 = heap32[(r1+121)];
	if(r4 ==r3) //_LBB686_9
{
	r5 = 1;
	r6 = r3 << 1;
	r6 = r3 == 0 ? r5 : r6;
if(!(r4 >=r6)) //_LBB686_8
{
	if(r6 !=0) //_LBB686_12
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r7 = heap32[(r4)];
	r8 = r6 << 2;
	r7 = (r7 + 1)|0;
	r8 = r8 | 3;
	heap32[(r4)] = r7;
	r4 = (r8 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB686_14
{
	r7 = 0;
	r8 = (r4 + 4)|0;
	r7 = (r7 - r8)|0;
	r7 = r7 & 15;
	r7 = (r4 + r7)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r4;
	r4 = r8;
}
}
else{
	r4 = 0;
}
_18: do {
	if(r3 <1) //_LBB686_17
{
	r8 = heap32[(r1+122)];
}
else{
	r7 = 0;
_21: while(true){
	r8 = heap32[(r1+122)];
	r9 = r7 << 2;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r4 + r9)|0;
	r10 = heap32[(r10)];
	r7 = (r7 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r10;
if(!(r3 !=r7)) //_LBB686_18
{
break _18;
}
}
}
} while(0);
	if(r8 !=0) //_LBB686_21
{
	r7 = heapU8[r0+492];
	if(r7 !=0) //_LBB686_23
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r7 = heap32[(r3)];
	r7 = (r7 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r3)] = r7;
	r3 = heap32[(r8+-1)];
	heap32[(g0)] = r3;
	free(i7);
	r3 = heap32[(r1+120)];
}
	heap32[(r1+122)] = 0;
}
	heap8[r0+492] = r5;
	heap32[(r1+122)] = r4;
	heap32[(r1+121)] = r6;
}
}
	r0 = r3 << 2;
	r3 = heap32[(r1+122)];
	r0 = (r3 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r2;
	r0 = heap32[(r1+120)];
	r0 = (r0 + 1)|0;
	heap32[(r1+120)] = r0;
}
	heap32[(r1+63)] = 1;
	return;
}