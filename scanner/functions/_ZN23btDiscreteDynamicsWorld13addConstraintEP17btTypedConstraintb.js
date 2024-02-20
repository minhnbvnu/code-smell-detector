function _ZN23btDiscreteDynamicsWorld13addConstraintEP17btTypedConstraintb(sp)
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
	r2 = heap32[(r1+48)];
	r3 = heap32[(r1+47)];
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp+2)];
	if(r2 ==r3) //_LBB656_2
{
	r6 = 1;
	r7 = r3 << 1;
	r7 = r3 == 0 ? r6 : r7;
if(!(r2 >=r7)) //_LBB656_1
{
	if(r7 !=0) //_LBB656_5
{
	r2 = gNumAlignedAllocs;
	r2 = r2 >> 2;
	r8 = heap32[(r2)];
	r9 = r7 << 2;
	r8 = (r8 + 1)|0;
	r9 = r9 | 3;
	heap32[(r2)] = r8;
	r2 = (r9 + 16)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r2 = r_g0;
	if(r2 !=0) //_LBB656_7
{
	r8 = 0;
	r9 = (r2 + 4)|0;
	r8 = (r8 - r9)|0;
	r8 = r8 & 15;
	r8 = (r2 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r2;
	r2 = r9;
}
}
else{
	r2 = 0;
}
	r8 = (r0 + 196)|0;
	if(r3 <1) //_LBB656_10
{
	r9 = r8 >> 2;
	r10 = heap32[(r9)];
}
else{
	r9 = 0;
_12: while(true){
	r10 = r8 >> 2;
	r10 = heap32[(r10)];
	r11 = r9 << 2;
	r12 = (r10 + r11)|0;
	r12 = r12 >> 2;
	r11 = (r2 + r11)|0;
	r12 = heap32[(r12)];
	r9 = (r9 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r12;
if(!(r3 !=r9)) //_LBB656_11
{
break _12;
}
}
	r8 = (r0 + 196)|0;
}
	if(r10 !=0) //_LBB656_15
{
	r9 = heapU8[r0+200];
	if(r9 !=0) //_LBB656_17
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r9 = heap32[(r3)];
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r3)] = r9;
	r3 = heap32[(r10+-1)];
	heap32[(g0)] = r3;
	free(i7);
	r3 = heap32[(r1+47)];
}
	r9 = r8 >> 2;
	heap32[(r9)] = 0;
}
	r8 = r8 >> 2;
	heap8[r0+200] = r6;
	heap32[(r8)] = r2;
	heap32[(r1+48)] = r7;
}
}
	r0 = r3 << 2;
	r2 = heap32[(r1+49)];
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r4;
	r0 = heap32[(r1+47)];
	r0 = (r0 + 1)|0;
	heap32[(r1+47)] = r0;
if(!(r5 ==0)) //_LBB656_22
{
	r0 = r4 >> 2;
	r1 = heap32[(r0+5)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	_ZN11btRigidBody16addConstraintRefEP17btTypedConstraint(i7);
	r0 = heap32[(r0+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	_ZN11btRigidBody16addConstraintRefEP17btTypedConstraint(i7);
}
	return;
}