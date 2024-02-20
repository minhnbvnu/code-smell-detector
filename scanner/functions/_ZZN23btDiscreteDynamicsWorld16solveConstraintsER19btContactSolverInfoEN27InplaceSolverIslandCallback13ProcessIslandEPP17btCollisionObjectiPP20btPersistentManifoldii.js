function _ZZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoEN27InplaceSolverIslandCallback13ProcessIslandEPP17btCollisionObjectiPP20btPersistentManifoldii(sp)
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
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+5)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	r6 = heap32[(fp+4)];
	r7 = heap32[(r1+4)];
_1: do {
	if(r2 <0) //_LBB645_2
{
	r0 = 0;
	r0 = (r0 - r6)|0;
	if(r7 ==r0) //_LBB645_87
{
break _1;
}
else{
	r0 = heap32[(r1+2)];
	r2 = r0 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+3)];
	r8 = heap32[(r1+7)];
	r9 = heap32[(r1+6)];
	r10 = heap32[(r1+5)];
	r11 = heap32[(r1+1)];
	r1 = heap32[(r1+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r6;
	heap32[(g0+5)] = r1;
	heap32[(g0+6)] = r7;
	heap32[(g0+7)] = r11;
	heap32[(g0+8)] = r10;
	heap32[(g0+9)] = r9;
	heap32[(g0+10)] = r8;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	return;
}
}
else{
	r8 = 1;
	r9 = 4;
	r10 = 0;
_5: while(true){
	if(r7 >r10) //_LBB645_4
{
	r11 = heap32[(r1+3)];
	r12 = r10 << 2;
	r12 = (r11 + r12)|0;
	r12 = r12 >> 2;
	r12 = heap32[(r12)];
	r12 = r12 >> 2;
	r13 = heap32[(r12+5)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+52)];
	if(r13 <0) //_LBB645_6
{
	r13 = heap32[(r12+6)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+52)];
}
	r10 = (r10 + 1)|0;
	r9 = (r9 + -4)|0;
	r8 = (r8 + -1)|0;
	if(r13 ==r2) //_LBB645_10
{
__label__ = 9;
break _5;
}
else{
__label__ = 7;
}
}
else{
__label__ = 8;
break _5;
}
}
_11: do {
switch(__label__ ){//multiple entries
case 9:
	r10 = r7 > r10 ? r7 : r10;
	r7 = (r11 - r9)|0;
	r9 = (r10 + r8)|0;
	r8 = 0;
	r10 = r7;
_13: while(true){
	r11 = r10 >> 2;
	r11 = heap32[(r11)];
	r11 = r11 >> 2;
	r12 = heap32[(r11+5)];
	r12 = r12 >> 2;
	r12 = heap32[(r12+52)];
	if(r12 <0) //_LBB645_13
{
	r12 = heap32[(r11+6)];
	r12 = r12 >> 2;
	r12 = heap32[(r12+52)];
}
	r11 = r12 == r2;
	r11 = r11 & 1;
	r9 = (r9 + -1)|0;
	r8 = (r11 + r8)|0;
	r10 = (r10 + 4)|0;
if(!(r9 !=0)) //_LBB645_11
{
break _11;
}
}
break;
case 8:
	r7 = 0;
	r8 = r7;
break;
}
} while(0);
	r2 = heap32[(r1+1)];
	r9 = r2 >> 2;
	r9 = heap32[(r9+17)];
	if(r9 <2) //_LBB645_17
{
	r0 = 0;
	r0 = (r0 - r6)|0;
	if(r8 ==r0) //_LBB645_87
{
break _1;
}
else{
	r0 = heap32[(r1+2)];
	r9 = r0 >> 2;
	r9 = heap32[(r9)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+3)];
	r10 = heap32[(r1+7)];
	r11 = heap32[(r1+6)];
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r6;
	heap32[(g0+5)] = r7;
	heap32[(g0+6)] = r8;
	heap32[(g0+7)] = r2;
	heap32[(g0+8)] = r1;
	heap32[(g0+9)] = r11;
	heap32[(g0+10)] = r10;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	return;
}
}
else{
_24: do {
	if(r4 >0) //_LBB645_19
{
	r2 = heap32[(r1+9)];
_26: while(true){
	r9 = heap32[(r1+10)];
	if(r9 ==r2) //_LBB645_22
{
	r10 = 1;
	r11 = r2 << 1;
	r11 = r2 == 0 ? r10 : r11;
if(!(r9 >=r11)) //_LBB645_21
{
	if(r11 !=0) //_LBB645_25
{
	r9 = gNumAlignedAllocs;
	r9 = r9 >> 2;
	r12 = heap32[(r9)];
	r13 = r11 << 2;
	r12 = (r12 + 1)|0;
	r13 = r13 | 3;
	heap32[(r9)] = r12;
	r9 = (r13 + 16)|0;
	heap32[(g0)] = r9;
	malloc(i7);
	r9 = r_g0;
	if(r9 !=0) //_LBB645_27
{
	r12 = 0;
	r13 = (r9 + 4)|0;
	r12 = (r12 - r13)|0;
	r12 = r12 & 15;
	r12 = (r9 + r12)|0;
	r13 = (r12 + 4)|0;
	r12 = r12 >> 2;
	heap32[(r12)] = r9;
	r9 = r13;
}
}
else{
	r9 = 0;
}
	if(r2 <1) //_LBB645_30
{
	r13 = heap32[(r1+11)];
}
else{
	r12 = 0;
_39: while(true){
	r13 = heap32[(r1+11)];
	r14 = r12 << 2;
	r15 = (r13 + r14)|0;
	r15 = r15 >> 2;
	r14 = (r9 + r14)|0;
	r15 = heap32[(r15)];
	r12 = (r12 + 1)|0;
	r14 = r14 >> 2;
	heap32[(r14)] = r15;
if(!(r2 !=r12)) //_LBB645_31
{
break _39;
}
}
}
	if(r13 !=0) //_LBB645_34
{
	r12 = heapU8[r0+48];
	if(r12 !=0) //_LBB645_36
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r12 = heap32[(r2)];
	r12 = (r12 + 1)|0;
	r13 = r13 >> 2;
	heap32[(r2)] = r12;
	r2 = heap32[(r13+-1)];
	heap32[(g0)] = r2;
	free(i7);
	r2 = heap32[(r1+9)];
}
	heap32[(r1+11)] = 0;
}
	heap8[r0+48] = r10;
	heap32[(r1+11)] = r9;
	heap32[(r1+10)] = r11;
}
}
	r9 = r3 >> 2;
	r2 = r2 << 2;
	r10 = heap32[(r1+11)];
	r2 = (r10 + r2)|0;
	r9 = heap32[(r9)];
	r2 = r2 >> 2;
	heap32[(r2)] = r9;
	r2 = heap32[(r1+9)];
	r2 = (r2 + 1)|0;
	r4 = (r4 + -1)|0;
	r3 = (r3 + 4)|0;
	heap32[(r1+9)] = r2;
if(!(r4 !=0)) //_LBB645_20
{
break _24;
}
}
}
} while(0);
_50: do {
if(!(r6 <1)) //_LBB645_62
{
	r2 = heap32[(r1+14)];
_52: while(true){
	r3 = heap32[(r1+15)];
	if(r3 ==r2) //_LBB645_44
{
	r4 = 1;
	r9 = r2 << 1;
	r9 = r2 == 0 ? r4 : r9;
if(!(r3 >=r9)) //_LBB645_43
{
	if(r9 !=0) //_LBB645_47
{
	r3 = gNumAlignedAllocs;
	r3 = r3 >> 2;
	r10 = heap32[(r3)];
	r11 = r9 << 2;
	r10 = (r10 + 1)|0;
	r11 = r11 | 3;
	heap32[(r3)] = r10;
	r3 = (r11 + 16)|0;
	heap32[(g0)] = r3;
	malloc(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB645_49
{
	r10 = 0;
	r11 = (r3 + 4)|0;
	r10 = (r10 - r11)|0;
	r10 = r10 & 15;
	r10 = (r3 + r10)|0;
	r11 = (r10 + 4)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r3;
	r3 = r11;
}
}
else{
	r3 = 0;
}
	if(r2 <1) //_LBB645_52
{
	r11 = heap32[(r1+16)];
}
else{
	r10 = 0;
_65: while(true){
	r11 = heap32[(r1+16)];
	r12 = r10 << 2;
	r13 = (r11 + r12)|0;
	r13 = r13 >> 2;
	r12 = (r3 + r12)|0;
	r13 = heap32[(r13)];
	r10 = (r10 + 1)|0;
	r12 = r12 >> 2;
	heap32[(r12)] = r13;
if(!(r2 !=r10)) //_LBB645_53
{
break _65;
}
}
}
	if(r11 !=0) //_LBB645_56
{
	r10 = heapU8[r0+68];
	if(r10 !=0) //_LBB645_58
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r10 = heap32[(r2)];
	r10 = (r10 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r2)] = r10;
	r2 = heap32[(r11+-1)];
	heap32[(g0)] = r2;
	free(i7);
	r2 = heap32[(r1+14)];
}
	heap32[(r1+16)] = 0;
}
	heap8[r0+68] = r4;
	heap32[(r1+16)] = r3;
	heap32[(r1+15)] = r9;
}
}
	r3 = r5 >> 2;
	r2 = r2 << 2;
	r4 = heap32[(r1+16)];
	r2 = (r4 + r2)|0;
	r3 = heap32[(r3)];
	r2 = r2 >> 2;
	heap32[(r2)] = r3;
	r2 = heap32[(r1+14)];
	r2 = (r2 + 1)|0;
	r6 = (r6 + -1)|0;
	r5 = (r5 + 4)|0;
	heap32[(r1+14)] = r2;
if(!(r6 !=0)) //_LBB645_42
{
break _50;
}
}
}
} while(0);
_76: do {
	if(r8 >0) //_LBB645_64
{
	r2 = heap32[(r1+19)];
_78: while(true){
	r3 = heap32[(r1+20)];
	if(r3 ==r2) //_LBB645_67
{
	r4 = 1;
	r5 = r2 << 1;
	r5 = r2 == 0 ? r4 : r5;
if(!(r3 >=r5)) //_LBB645_66
{
	if(r5 !=0) //_LBB645_70
{
	r3 = gNumAlignedAllocs;
	r3 = r3 >> 2;
	r6 = heap32[(r3)];
	r9 = r5 << 2;
	r6 = (r6 + 1)|0;
	r9 = r9 | 3;
	heap32[(r3)] = r6;
	r3 = (r9 + 16)|0;
	heap32[(g0)] = r3;
	malloc(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB645_72
{
	r6 = 0;
	r9 = (r3 + 4)|0;
	r6 = (r6 - r9)|0;
	r6 = r6 & 15;
	r6 = (r3 + r6)|0;
	r9 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r3;
	r3 = r9;
}
}
else{
	r3 = 0;
}
	if(r2 <1) //_LBB645_75
{
	r9 = heap32[(r1+21)];
}
else{
	r6 = 0;
_91: while(true){
	r9 = heap32[(r1+21)];
	r10 = r6 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r3 + r10)|0;
	r11 = heap32[(r11)];
	r6 = (r6 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r11;
if(!(r2 !=r6)) //_LBB645_76
{
break _91;
}
}
}
	if(r9 !=0) //_LBB645_79
{
	r6 = heapU8[r0+88];
	if(r6 !=0) //_LBB645_81
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r6 = heap32[(r2)];
	r6 = (r6 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r2)] = r6;
	r2 = heap32[(r9+-1)];
	heap32[(g0)] = r2;
	free(i7);
	r2 = heap32[(r1+19)];
}
	heap32[(r1+21)] = 0;
}
	heap8[r0+88] = r4;
	heap32[(r1+21)] = r3;
	heap32[(r1+20)] = r5;
}
}
	r3 = r7 >> 2;
	r2 = r2 << 2;
	r4 = heap32[(r1+21)];
	r2 = (r4 + r2)|0;
	r3 = heap32[(r3)];
	r2 = r2 >> 2;
	heap32[(r2)] = r3;
	r2 = heap32[(r1+19)];
	r2 = (r2 + 1)|0;
	r8 = (r8 + -1)|0;
	r7 = (r7 + 4)|0;
	heap32[(r1+19)] = r2;
if(!(r8 !=0)) //_LBB645_65
{
break _76;
}
}
}
else{
	r2 = heap32[(r1+19)];
}
} while(0);
	r3 = heap32[(r1+1)];
	r3 = r3 >> 2;
	r1 = heap32[(r1+14)];
	r1 = (r1 + r2)|0;
	r2 = heap32[(r3+17)];
if(!(r1 <=r2)) //_LBB645_87
{
	heap32[(g0)] = r0;
	_ZZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoEN27InplaceSolverIslandCallback18processConstraintsEv(i7);
}
}
}
} while(0);
	return;
}