function _ZNK14btQuantizedBvh26walkStacklessQuantizedTreeEP21btNodeOverlapCallbackPtS2_ii(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+60];
	if(r1 !=0) //_LBB150_2
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+34)];
	r6 = r4 << 4;
	r7 = (r5 - r4)|0;
	r0 = (r0 + r6)|0;
	r6 = 0;
_3: while(true){
	if(r4 <r5) //_LBB150_3
{
	if(r6 <r7) //_LBB150_5
{
	r8 = heapU16[(r2)>>1];
	r9 = heapU16[(r0+6)>>1];
	r10 = heapU16[(r3)>>1];
	r11 = heapU16[(r0)>>1];
	r8 = uint(r8) > uint(r9);
	r9 = uint(r10) < uint(r11);
	r10 = heapU16[(r2+4)>>1];
	r11 = heapU16[(r0+10)>>1];
	r8 = r8 | r9;
	r9 = uint(r10) > uint(r11);
	r10 = heapU16[(r3+4)>>1];
	r11 = heapU16[(r0+4)>>1];
	r8 = r8 | r9;
	r9 = uint(r10) < uint(r11);
	r10 = heapU16[(r2+2)>>1];
	r11 = heapU16[(r0+8)>>1];
	r8 = r8 | r9;
	r9 = uint(r10) > uint(r11);
	r10 = heapU16[(r3+2)>>1];
	r11 = heapU16[(r0+2)>>1];
	r12 = r0 >> 2;
	r8 = r8 | r9;
	r9 = uint(r10) < uint(r11);
	r10 = heap32[(r12+3)];
	r6 = (r6 + 1)|0;
	r8 = r8 | r9;
	if(r10 <0) //_LBB150_10
{
__label__ = 10;
}
else{
	if(r8 != 0) //_LBB150_10
{
__label__ = 10;
}
else{
	if(r10 >-1) //_LBB150_9
{
	r8 = r1 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r12 = r10 >> 21;
	r10 = r10 & 2097151;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r8)>>2](i7);
__label__ = 11;
}
else{
__label__ = 8;
break _3;
}
}
}
if (__label__ == 10){
	r9 = 0;
	r9 = r10 < r9;
	r8 = r9 & r8;
	if(r8 != 0) //_LBB150_12
{
	r8 = heap32[(r12+3)];
	if(r8 <0) //_LBB150_14
{
	r9 = r8 << 4;
	r0 = (r0 - r9)|0;
	r4 = (r4 - r8)|0;
continue _3;
}
else{
__label__ = 13;
break _3;
}
}
}
	r0 = (r0 + 16)|0;
	r4 = (r4 + 1)|0;
}
else{
__label__ = 4;
break _3;
}
}
else{
__label__ = 16;
break _3;
}
}
switch(__label__ ){//multiple entries
case 16:
	r0 = maxIterations;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
if(!(r1 >=r6)) //_LBB150_18
{
	heap32[(r0)] = r6;
}
	return;
break;
case 13:
	r0 = _2E_str941;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 75;
	_assert(i7);
break;
case 8:
	r0 = _2E_str739;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 80;
	_assert(i7);
break;
case 4:
	r0 = _2E_str1143;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 703;
	_assert(i7);
break;
}
}
else{
	r0 = _2E_str212;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 669;
	_assert(i7);
}
}