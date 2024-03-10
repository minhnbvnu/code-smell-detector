function _ZN16btDbvtBroadphase25calculateOverlappingPairsEP12btDispatcher(sp)
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
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+4)];
	r3 = heap32[(r1+28)];
	r2 = (r3 * r2)|0;
	r2 = (r2 / 100)|0;
	r3 = (r0 + 4)|0;
	r2 = (r2 + 1)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	_ZN6btDbvt19optimizeIncrementalEi(i7);
	r2 = heap32[(r1+31)];
if(!(r2 ==0)) //_LBB108_2
{
	r2 = heap32[(r1+14)];
	r4 = heap32[(r1+27)];
	r2 = (r4 * r2)|0;
	r4 = (r2 / 100)|0;
	r5 = (r0 + 44)|0;
	r4 = (r4 + 1)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	_ZN6btDbvt19optimizeIncrementalEi(i7);
	r2 = (r2 / -100)|0;
	r4 = heap32[(r1+31)];
	r2 = (r2 + r4)|0;
	r2 = (r2 + -1)|0;
	r4 = 0;
	r2 = r2 < 0 ? r4 : r2;
	heap32[(r1+31)] = r2;
}
	r2 = heap32[(r1+26)];
	r2 = (r2 + 1)|0;
	r4 = r2 >>> 31;
	r4 = (r2 + r4)|0;
	r4 = r4 & -2;
	r2 = (r2 - r4)|0;
	r4 = r2 << 2;
	r4 = (r0 + r4)|0;
	r4 = r4 >> 2;
	heap32[(r1+26)] = r2;
	r2 = heap32[(r4+21)];
if(!(r2 ==0)) //_LBB108_20
{
	r4 = (r0 + 44)|0;
_6: while(true){
	r5 = r2 >> 2;
	r6 = heap32[(r5+13)];
	r7 = heap32[(r5+14)];
	if(r6 ==0) //_LBB108_6
{
	r6 = heap32[(r5+15)];
	r6 = r6 << 2;
	r6 = (r0 + r6)|0;
	r6 = r6 >> 2;
	heap32[(r6+21)] = r7;
}
else{
	r6 = r6 >> 2;
	heap32[(r6+14)] = r7;
}
	r6 = heap32[(r5+14)];
if(!(r6 ==0)) //_LBB108_9
{
	r6 = r6 >> 2;
	r8 = heap32[(r5+13)];
	heap32[(r6+13)] = r8;
}
	heap32[(r5+13)] = 0;
	r6 = heap32[(r1+23)];
	heap32[(r5+14)] = r6;
	r6 = heap32[(r1+23)];
if(!(r6 ==0)) //_LBB108_11
{
	r6 = r6 >> 2;
	heap32[(r6+13)] = r2;
}
	heap32[(r1+23)] = r2;
	r6 = heap32[(r5+12)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r6;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r8 = heap32[(r1+2)];
if(!(r8 ==0)) //_LBB108_13
{
	r9 = gNumAlignedFree;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r10 = (r10 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r9)] = r10;
	r8 = heap32[(r8+-1)];
	heap32[(g0)] = r8;
	free(i7);
}
	heap32[(r1+2)] = r6;
	r6 = heap32[(r1+4)];
	r6 = (r6 + -1)|0;
	heap32[(r1+4)] = r6;
	r6 = heap32[(r1+12)];
	f0 = heapFloat[(r5+4)];
	f1 = heapFloat[(r5+5)];
	f2 = heapFloat[(r5+6)];
	f3 = heapFloat[(r5+7)];
	f4 = heapFloat[(r5+8)];
	f5 = heapFloat[(r5+9)];
	f6 = heapFloat[(r5+10)];
	f7 = heapFloat[(r5+11)];
	if(r6 ==0) //_LBB108_15
{
	r6 = gNumAlignedAllocs;
	r6 = r6 >> 2;
	r8 = heap32[(r6)];
	r8 = (r8 + 1)|0;
	heap32[(r6)] = r8;
	heap32[(g0)] = 63;
	malloc(i7);
	r6 = r_g0;
	if(r6 !=0) //_LBB108_17
{
	r8 = 0;
	r9 = (r6 + 4)|0;
	r8 = (r8 - r9)|0;
	r8 = r8 & 15;
	r8 = (r6 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r6;
	r6 = r9;
}
}
else{
	heap32[(r1+12)] = 0;
}
	r8 = r6 >> 2;
	heap32[(r8+8)] = 0;
	heap32[(r8+9)] = r2;
	heap32[(r8+10)] = 0;
	heapFloat[(r8)] = f0;
	heapFloat[(r8+1)] = f1;
	heapFloat[(r8+2)] = f2;
	heapFloat[(r8+3)] = f3;
	heapFloat[(r8+4)] = f4;
	heapFloat[(r8+5)] = f5;
	heapFloat[(r8+6)] = f6;
	heapFloat[(r8+7)] = f7;
	r2 = heap32[(r1+11)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r6;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r2 = heap32[(r1+14)];
	r2 = (r2 + 1)|0;
	heap32[(r1+14)] = r2;
	heap32[(r5+12)] = r6;
	heap32[(r5+15)] = 2;
	r2 = r7;
if(!(r7 !=0)) //_LBB108_4
{
break _6;
}
}
	r2 = heap32[(r1+14)];
	r4 = 1;
	heap32[(r1+31)] = r2;
	heap8[r0+154] = r4;
}
	r2 = _ZTV18btDbvtTreeCollider;
	r4 = sp + -32;
	r2 = (r2 + 8)|0;
	r5 = r4 >> 2;
	heap32[(fp+-8)] = r2;
	heap32[(r5+1)] = r0;
	r5 = heapU8[r0+153];
if(!(r5 ==0)) //_LBB108_23
{
	r5 = heap32[(r1+11)];
	r6 = heap32[(r1+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r4;
	_ZN6btDbvt24collideTTpersistentStackEPK10btDbvtNodeS2_RNS_8ICollideE(i7);
	r5 = heapU8[r0+153];
if(!(r5 ==0)) //_LBB108_23
{
	r5 = heap32[(r1+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r4;
	_ZN6btDbvt24collideTTpersistentStackEPK10btDbvtNodeS2_RNS_8ICollideE(i7);
}
}
	r3 = heap32[(fp+1)];
	heap32[(fp+-8)] = r2;
	r2 = heapU8[r0+154];
_32: do {
if(!(r2 ==0)) //_LBB108_40
{
	r2 = heap32[(r1+24)];
	r4 = r2 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r2 = r_g0;
	r4 = r2 >> 2;
	r4 = heap32[(r4+1)];
if(!(r4 <1)) //_LBB108_40
{
	r5 = heap32[(r1+29)];
	r5 = (r5 * r4)|0;
	r6 = heap32[(r1+30)];
	r5 = (r5 / 100)|0;
	r5 = r6 > r5 ? r6 : r5;
	r5 = r4 < r5 ? r4 : r5;
	if(r5 >0) //_LBB108_27
{
	r4 = 0;
_37: while(true){
	r6 = r2 >> 2;
	r7 = heap32[(r1+36)];
	r7 = (r7 + r4)|0;
	r8 = heap32[(r6+1)];
	r7 = (r7 % r8)|0;
	r8 = heap32[(r6+3)];
	r7 = r7 << 4;
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r8 = heap32[(r7+1)];
	r7 = heap32[(r7)];
	r9 = r8 >> 2;
	r10 = r7 >> 2;
	r9 = heap32[(r9+12)];
	r10 = heap32[(r10+12)];
	r10 = r10 >> 2;
	r9 = r9 >> 2;
	f0 = heapFloat[(r10)];
	f1 = heapFloat[(r9+4)];
	if(f0 >f1) //_LBB108_35
{
__label__ = 32;
}
else{
	f0 = heapFloat[(r10+4)];
	f1 = heapFloat[(r9)];
	if(f0 <f1) //_LBB108_35
{
__label__ = 32;
}
else{
	f0 = heapFloat[(r10+1)];
	f1 = heapFloat[(r9+5)];
	if(f0 >f1) //_LBB108_35
{
__label__ = 32;
}
else{
	f0 = heapFloat[(r10+5)];
	f1 = heapFloat[(r9+1)];
	if(f0 <f1) //_LBB108_35
{
__label__ = 32;
}
else{
	f0 = heapFloat[(r10+2)];
	f1 = heapFloat[(r9+6)];
	if(f0 >f1) //_LBB108_35
{
__label__ = 32;
}
else{
	f0 = heapFloat[(r10+6)];
	f1 = heapFloat[(r9+2)];
	if(f0 <f1) //_LBB108_35
{
__label__ = 32;
}
else{
__label__ = 33;
}
}
}
}
}
}
if (__label__ == 32){
	r9 = heap32[(r1+24)];
	r10 = r9 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+3)];
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r3;
	r5 = (r5 + -1)|0;
	r4 = (r4 + -1)|0;
	__FUNCTION_TABLE__[(r10)>>2](i7);
}
	r4 = (r4 + 1)|0;
if(!(r4 <r5)) //_LBB108_28
{
break _37;
}
}
	r4 = heap32[(r6+1)];
	if(r4 <1) //_LBB108_39
{
	heap32[(r1+36)] = 0;
break _32;
}
}
	r2 = heap32[(r1+36)];
	r2 = (r2 + r5)|0;
	r2 = (r2 % r4)|0;
	heap32[(r1+36)] = r2;
}
}
} while(0);
	r2 = heap32[(r1+35)];
	r2 = (r2 + 1)|0;
	heap32[(r1+35)] = r2;
	r2 = 0;
	heap32[(r1+30)] = 1;
	heap8[r0+154] = r2;
	r0 = heap32[(r1+32)];
	if(r0 ==0) //_LBB108_42
{
	heap32[(r1+34)] = 0;
	r4 = heap32[(r1+33)];
}
else{
	r4 = heap32[(r1+33)];
	f0 = uint(r4); //fuitos r4, f0
	f1 = uint(r0); //fuitos r0, f1
	f0 = f0/f1;
	heapFloat[(r1+34)] = f0;
}
	r4 = r4 >>> 1;
	r0 = r0 >>> 1;
	heap32[(r1+33)] = r4;
	heap32[(r1+32)] = r0;
	r0 = heap32[(r1+24)];
	r4 = r0 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+14)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB108_65
{
	r0 = heap32[(r1+24)];
	r4 = r0 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r0 = r_g0;
	r4 = r0 >> 2;
	r4 = heap32[(r4+1)];
if(!(r4 <2)) //_LBB108_46
{
	r4 = (r4 + -1)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r4;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
}
	r4 = r2;
	r5 = r2;
	r6 = r2;
	r7 = r2;
_61: while(true){
	r8 = r0 >> 2;
	r9 = heap32[(r8+1)];
	if(r9 >r7) //_LBB108_47
{
	r8 = heap32[(r8+3)];
	r9 = r7 << 4;
	r9 = (r8 + r9)|0;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r11 = r7 << 2;
	r12 = heap32[(r9+1)];
	if(r10 !=r4) //_LBB108_49
{
__label__ = 46;
}
else{
	if(r12 ==r5) //_LBB108_56
{
	r4 = heap32[(r9+2)];
	if(r4 ==0) //_LBB108_58
{
__label__ = 54;
}
else{
__label__ = 53;
break _61;
}
}
else{
__label__ = 46;
}
}
if (__label__ == 46){
	r4 = r12 >> 2;
	r5 = r10 >> 2;
	r4 = heap32[(r4+12)];
	r5 = heap32[(r5+12)];
	r5 = r5 >> 2;
	r4 = r4 >> 2;
	f0 = heapFloat[(r5)];
	f1 = heapFloat[(r4+4)];
	if(f0 >f1) //_LBB108_58
{
__label__ = 54;
}
else{
	f0 = heapFloat[(r5+4)];
	f1 = heapFloat[(r4)];
	if(f0 <f1) //_LBB108_58
{
__label__ = 54;
}
else{
	f0 = heapFloat[(r5+1)];
	f1 = heapFloat[(r4+5)];
	if(f0 >f1) //_LBB108_58
{
__label__ = 54;
}
else{
	f0 = heapFloat[(r5+5)];
	f1 = heapFloat[(r4+1)];
	if(f0 <f1) //_LBB108_58
{
__label__ = 54;
}
else{
	f0 = heapFloat[(r5+2)];
	f1 = heapFloat[(r4+6)];
	if(f0 >f1) //_LBB108_58
{
__label__ = 54;
}
else{
	f0 = heapFloat[(r5+6)];
	f1 = heapFloat[(r4+2)];
	if(f0 <f1) //_LBB108_58
{
__label__ = 54;
}
else{
__label__ = 55;
}
}
}
}
}
}
}
if (__label__ == 54){
	r4 = heap32[(r1+24)];
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+8)];
	r9 = (r8 + r2)|0;
	r11 = r11 << 2;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r3;
	r4 = (r8 + r11)|0;
	r4 = r4 >> 2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r6 = (r6 + 1)|0;
	heap32[(r4)] = 0;
	heap32[(r4+1)] = 0;
}
	r7 = (r7 + 1)|0;
	r2 = (r2 + 16)|0;
	r4 = r10;
	r5 = r12;
}
else{
__label__ = 57;
break _61;
}
}
switch(__label__ ){//multiple entries
case 57:
	if(r9 >1) //_LBB108_63
{
	r9 = (r9 + -1)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r9;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
	r9 = heap32[(r8+1)];
}
	r1 = sp + -16;
	r2 = r1 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r2+1)] = 0;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
	r2 = (r9 - r6)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE6resizeEiRKS0_(i7);
break;
case 53:
	r8 = _2E_str314;
	r0 = _2E_str18;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 469;
	_assert(i7);
break;
}
}
	return;
}