function _ZNK14btQuantizedBvh26reportAabbOverlappingNodexEP21btNodeOverlapCallbackRK9btVector3S4_(sp)
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
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heapU8[r0+60];
_1: do {
	if(r4 ==0) //_LBB153_20
{
	r0 = r0 >> 2;
	r4 = heap32[(r0+24)];
	r5 = 0;
	r6 = r5;
_3: while(true){
	r7 = heap32[(r0+14)];
	if(r7 >r5) //_LBB153_21
{
	if(r7 >r6) //_LBB153_23
{
	r7 = r2 >> 2;
	r8 = r4 >> 2;
	r6 = (r6 + 1)|0;
	f0 = heapFloat[(r7)];
	f1 = heapFloat[(r8+4)];
	if(f0 >f1) //_LBB153_26
{
__label__ = 26;
}
else{
	r9 = r3 >> 2;
	f0 = heapFloat[(r9)];
	f1 = heapFloat[(r8)];
	if(f0 <f1) //_LBB153_26
{
__label__ = 26;
}
else{
	r9 = 1;
__label__ = 27;
}
}
if (__label__ == 26){
	r9 = 0;
}
	f0 = heapFloat[(r7+2)];
	f1 = heapFloat[(r8+6)];
	if(f0 >f1) //_LBB153_30
{
__label__ = 29;
}
else{
	r10 = r3 >> 2;
	f0 = heapFloat[(r10+2)];
	f1 = heapFloat[(r8+2)];
	if(f0 <f1) //_LBB153_30
{
__label__ = 29;
}
else{
__label__ = 30;
}
}
if (__label__ == 29){
	r9 = 0;
}
	f0 = heapFloat[(r7+1)];
	f1 = heapFloat[(r8+5)];
	if(f0 <=f1) //_LBB153_33
{
	r7 = r3 >> 2;
	f0 = heapFloat[(r7+1)];
	f1 = heapFloat[(r8+1)];
	r7 = 0;
	r10 = heap32[(r8+8)];
	r11 = -1;
	r9 = f0 < f1 ? r7 : r9;
	r7 = r10 == r11;
	r12 = r9 & 255;
if(!(r12 ==0)) //_LBB153_35
{
	r10 = r10 != r11;
	r10 = r10 & 1;
	if(r10 ==0) //_LBB153_36
{
	r10 = r1 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+2)];
	r11 = heap32[(r8+10)];
	r12 = heap32[(r8+9)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r11;
	__FUNCTION_TABLE__[(r10)>>2](i7);
}
}
}
else{
	r7 = heap32[(r8+8)];
	r9 = -1;
	r7 = r7 == r9;
	r9 = 0;
}
	r9 = r9 & 255;
if(!(r9 !=0)) //_LBB153_39
{
	r7 = r7 & 1;
	if(r7 ==0) //_LBB153_40
{
	r7 = heap32[(r8+8)];
	r8 = r7 << 6;
	r4 = (r4 + r8)|0;
	r5 = (r7 + r5)|0;
continue _3;
}
}
	r4 = (r4 + 64)|0;
	r5 = (r5 + 1)|0;
}
else{
__label__ = 22;
break _3;
}
}
else{
__label__ = 40;
break _3;
}
}
switch(__label__ ){//multiple entries
case 40:
	r0 = maxIterations;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	if(r1 >=r6) //_LBB153_17
{
break _1;
}
else{
	heap32[(r0)] = r6;
	return;
}
break;
case 22:
	r0 = _2E_str1921;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 367;
	_assert(i7);
break;
}
}
else{
	r4 = sp + -6;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = 0;
	_ZNK14btQuantizedBvh17quantizeWithClampEPtRK9btVector3i(i7);
	r2 = sp + -12;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = 1;
	r3 = r0 >> 2;
	_ZNK14btQuantizedBvh17quantizeWithClampEPtRK9btVector3i(i7);
	r5 = heap32[(r3+36)];
	if(r5 ==2) //_LBB153_18
{
	r3 = heap32[(r3+34)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r2;
	_ZNK14btQuantizedBvh42walkRecursiveQuantizedTreeAgainstQueryAabbEPK18btQuantizedBvhNodeP21btNodeOverlapCallbackPtS5_(i7);
	return;
}
else{
	if(r5 ==1) //_LBB153_5
{
	r5 = heapU8[r0+60];
	if(r5 ==0) //_LBB153_7
{
	r2 = _2E_str212;
	r3 = _2E_str537;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 735;
	_assert(i7);
}
else{
	r5 = heap32[(r3+38)];
	if(r5 >0) //_LBB153_8
{
	r5 = 0;
_42: while(true){
	r6 = heap32[(r3+40)];
	r7 = r5 << 5;
	r8 = (r6 + r7)|0;
	r9 = heapU16[(sp+-6)>>1];
	r10 = heapU16[(r8+6)>>1];
if(!(uint(r9) >uint(r10))) //_LBB153_16
{
	r9 = heapU16[(sp+-12)>>1];
	r6 = heapU16[(r6+r7)>>1];
	r7 = r9 & 65535;
	r6 = r6 & 65535;
if(!(uint(r7) <uint(r6))) //_LBB153_16
{
	r6 = heapU16[(sp+-2)>>1];
	r7 = heapU16[(r8+10)>>1];
	r6 = r6 & 65535;
	r7 = r7 & 65535;
if(!(uint(r6) >uint(r7))) //_LBB153_16
{
	r6 = heapU16[(sp+-8)>>1];
	r7 = heapU16[(r8+4)>>1];
	r6 = r6 & 65535;
	r7 = r7 & 65535;
if(!(uint(r6) <uint(r7))) //_LBB153_16
{
	r6 = heapU16[(sp+-4)>>1];
	r7 = heapU16[(r8+8)>>1];
	r6 = r6 & 65535;
	r7 = r7 & 65535;
if(!(uint(r6) >uint(r7))) //_LBB153_16
{
	r6 = heapU16[(sp+-10)>>1];
	r7 = heapU16[(r8+2)>>1];
	r6 = r6 & 65535;
	r7 = r7 & 65535;
if(!(uint(r6) <uint(r7))) //_LBB153_16
{
	r6 = r8 >> 2;
	r7 = heap32[(r6+3)];
	r6 = heap32[(r6+4)];
	r6 = (r6 + r7)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r6;
	_ZNK14btQuantizedBvh26walkStacklessQuantizedTreeEP21btNodeOverlapCallbackPtS2_ii(i7);
}
}
}
}
}
}
	r5 = (r5 + 1)|0;
	r6 = heap32[(r3+38)];
	if(r6 >r5) //_LBB153_9
{
continue _42;
}
else{
break _1;
}
}
}
else{
break _1;
}
}
}
else{
	if(r5 !=0) //_LBB153_19
{
	r0 = _2E_str10;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 341;
	_assert(i7);
}
else{
	r3 = heap32[(r3+14)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = 0;
	heap32[(g0+5)] = r3;
	_ZNK14btQuantizedBvh26walkStacklessQuantizedTreeEP21btNodeOverlapCallbackPtS2_ii(i7);
	return;
}
}
}
}
} while(0);
	return;
}