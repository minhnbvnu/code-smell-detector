function _ZN20btAxisSweep3InternalItE25calculateOverlappingPairsEP12btDispatcher(sp)
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
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+23)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+14)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = r_g0;
if(!(r1 ==0)) //_LBB68_22
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(r0+23)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+7)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r_g0;
	r3 = r2 >> 2;
	r3 = heap32[(r3+1)];
	if(r3 >1) //_LBB68_3
{
	r3 = (r3 + -1)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r3;
	r3 = r2 >> 2;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
	r3 = heap32[(r3+1)];
}
	r4 = sp + -32;
	r5 = r4 >> 2;
	heap32[(fp+-8)] = 0;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
	r5 = heap32[(r0+26)];
	r3 = (r3 - r5)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	r3 = 0;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE6resizeEiRKS0_(i7);
	heap32[(r0+26)] = 0;
	r4 = r3;
	r5 = r3;
	r6 = r3;
	r7 = r3;
_6: while(true){
	r8 = r2 >> 2;
	r9 = heap32[(r8+1)];
	if(r9 >r7) //_LBB68_5
{
	r8 = heap32[(r8+3)];
	r9 = r7 << 4;
	r9 = (r8 + r9)|0;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r11 = r7 << 2;
	r12 = heap32[(r9+1)];
	if(r10 !=r5) //_LBB68_7
{
__label__ = 6;
}
else{
	if(r12 ==r6) //_LBB68_13
{
	r4 = heap32[(r9+2)];
	if(r4 ==0) //_LBB68_15
{
__label__ = 13;
}
else{
__label__ = 12;
break _6;
}
}
else{
__label__ = 6;
}
}
if (__label__ == 6){
	r5 = (r12 + 54)|0;
	r6 = (r10 + 48)|0;
	r9 = 0;
_14: while(true){
	if(r9 <3) //_LBB68_8
{
	r13 = heapU16[(r6+6)>>1];
	r14 = heapU16[(r5+-6)>>1];
	if(uint(r13) <uint(r14)) //_LBB68_15
{
__label__ = 13;
break _14;
}
else{
	r13 = heapU16[(r5)>>1];
	r14 = heapU16[(r6)>>1];
	if(uint(r13) <uint(r14)) //_LBB68_15
{
__label__ = 13;
break _14;
}
else{
	r9 = (r9 + 1)|0;
	r5 = (r5 + 2)|0;
	r6 = (r6 + 2)|0;
}
}
}
else{
__label__ = 14;
break _14;
}
}
}
if (__label__ == 13){
	r4 = heap32[(r0+23)];
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+8)];
	r6 = (r8 + r3)|0;
	r9 = r11 << 2;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r1;
	r4 = (r8 + r9)|0;
	r4 = r4 >> 2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	heap32[(r4)] = 0;
	heap32[(r4+1)] = 0;
	r4 = heap32[(r0+26)];
	r4 = (r4 + 1)|0;
	r5 = gOverlappingPairs;
	r5 = r5 >> 2;
	heap32[(r0+26)] = r4;
	r6 = heap32[(r5)];
	r6 = (r6 + -1)|0;
	heap32[(r5)] = r6;
}
	r7 = (r7 + 1)|0;
	r3 = (r3 + 16)|0;
	r5 = r10;
	r6 = r12;
}
else{
__label__ = 16;
break _6;
}
}
switch(__label__ ){//multiple entries
case 16:
	if(r9 >1) //_LBB68_20
{
	r4 = (r9 + -1)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r4;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
	r9 = heap32[(r8+1)];
	r4 = heap32[(r0+26)];
}
	r1 = sp + -16;
	r3 = r1 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r3+1)] = 0;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = 0;
	r3 = (r9 - r4)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r1;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE6resizeEiRKS0_(i7);
	heap32[(r0+26)] = 0;
break;
case 12:
	r8 = _2E_str314;
	r0 = _2E_str112;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 687;
	_assert(i7);
break;
}
}
	return;
}