function _ZNK14btQuantizedBvh42walkRecursiveQuantizedTreeAgainstQueryAabbEPK18btQuantizedBvhNodeP21btNodeOverlapCallbackPtS5_(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+4)];
_1: while(true){
	r5 = heapU8[r0+60];
	if(r5 !=0) //_LBB152_3
{
	r5 = heapU16[(r3)>>1];
	r6 = heapU16[(r1+6)>>1];
	if(uint(r5) >uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = heapU16[(r4)>>1];
	r6 = heapU16[(r1)>>1];
	r5 = r5 & 65535;
	r6 = r6 & 65535;
	if(uint(r5) <uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = heapU16[(r3+4)>>1];
	r6 = heapU16[(r1+10)>>1];
	r5 = r5 & 65535;
	r6 = r6 & 65535;
	if(uint(r5) >uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = heapU16[(r4+4)>>1];
	r6 = heapU16[(r1+4)>>1];
	r5 = r5 & 65535;
	r6 = r6 & 65535;
	if(uint(r5) <uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = heapU16[(r3+2)>>1];
	r6 = heapU16[(r1+8)>>1];
	r5 = r5 & 65535;
	r6 = r6 & 65535;
	if(uint(r5) >uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = heapU16[(r4+2)>>1];
	r6 = heapU16[(r1+2)>>1];
	r5 = r5 & 65535;
	r6 = r6 & 65535;
	if(uint(r5) <uint(r6)) //_LBB152_14
{
__label__ = 14;
break _1;
}
else{
	r5 = r1 >> 2;
	r6 = heap32[(r5+3)];
	if(r6 <0) //_LBB152_11
{
	r6 = (r1 + 16)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	_ZNK14btQuantizedBvh42walkRecursiveQuantizedTreeAgainstQueryAabbEPK18btQuantizedBvhNodeP21btNodeOverlapCallbackPtS5_(i7);
	r5 = heap32[(r5+7)];
	if(r5 <0) //_LBB152_13
{
	r6 = 1;
	r5 = (r6 - r5)|0;
	r5 = r5 << 4;
	r1 = (r1 + r5)|0;
continue _1;
}
else{
	r1 = (r1 + 32)|0;
continue _1;
}
}
else{
__label__ = 10;
break _1;
}
}
}
}
}
}
}
}
else{
__label__ = 2;
break _1;
}
}
switch(__label__ ){//multiple entries
case 14:
	return;
break;
case 2:
	r0 = _2E_str212;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 419;
	_assert(i7);
break;
case 10:
	r0 = r2 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+2)];
	r1 = r6 >> 21;
	r3 = r6 & 2097151;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
break;
}
}