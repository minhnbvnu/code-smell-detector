function _ZN20btAxisSweep3InternalItE11sortMinDownEitP12btDispatcherb(sp)
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
	var r16;
	var r17;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 << 2;
	r2 = (r1 + r2)|0;
	r3 = heap32[(fp+2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+17)];
	r3 = r3 << 2;
	r4 = (r2 + r3)|0;
	r2 = heapU16[(r2+r3)>>1];
	r3 = heapU16[(r4+-4)>>1];
if(!(uint(r2) >=uint(r3))) //_LBB60_14
{
	r1 = r1 >> 2;
	r2 = heap32[(fp+3)];
	r3 = heap32[(r1+15)];
	r5 = heapU16[(r4+2)>>1];
	r6 = 1;
	r7 = r6 << r0;
	r7 = r7 & 3;
	r6 = r6 << r7;
	r5 = r5 << 6;
	r5 = (r3 + r5)|0;
	r6 = r6 & 3;
	r0 = r0 << 1;
	r8 = (r5 + 48)|0;
	r7 = r7 << 1;
	r9 = (r5 + 54)|0;
	r6 = r6 << 1;
	r10 = (r8 + r0)|0;
	r11 = (r9 + r7)|0;
	r12 = (r8 + r7)|0;
	r9 = (r9 + r6)|0;
	r8 = (r8 + r6)|0;
	r4 = (r4 + 2)|0;
_3: while(true){
	r13 = heapU8[r4+-6];
	r14 = heapU16[(r4+-4)>>1];
	r13 = r13 & 1;
	if(r13 ==0) //_LBB60_11
{
	r13 = r14 << 6;
	r3 = (r3 + r13)|0;
	r3 = (r3 + r0)|0;
	r13 = heapU16[(r3+48)>>1];
	r13 = (r13 + 1)|0;
	heap16[(r3+48)>>1] = r13;
}
else{
if(!(r2 ==0)) //_LBB60_10
{
	r13 = r14 << 6;
	r13 = (r3 + r13)|0;
	r15 = (r13 + r7)|0;
	r16 = heapU16[(r11)>>1];
	r17 = heapU16[(r15+48)>>1];
if(!(uint(r16) <uint(r17))) //_LBB60_10
{
	r15 = heapU16[(r15+54)>>1];
	r16 = heapU16[(r12)>>1];
if(!(uint(r15) <uint(r16))) //_LBB60_10
{
	r15 = (r13 + r6)|0;
	r16 = heapU16[(r9)>>1];
	r17 = heapU16[(r15+48)>>1];
if(!(uint(r16) <uint(r17))) //_LBB60_10
{
	r15 = heapU16[(r15+54)>>1];
	r16 = heapU16[(r8)>>1];
if(!(uint(r15) <uint(r16))) //_LBB60_10
{
	r15 = heap32[(r1+23)];
	r16 = r15 >> 2;
	r16 = heap32[(r16)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+2)];
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r13;
	__FUNCTION_TABLE__[(r16)>>2](i7);
	r15 = heap32[(r1+24)];
if(!(r15 ==0)) //_LBB60_10
{
	r16 = r15 >> 2;
	r16 = heap32[(r16)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+2)];
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r13;
	__FUNCTION_TABLE__[(r16)>>2](i7);
}
}
}
}
}
}
	r14 = r14 << 6;
	r3 = (r3 + r14)|0;
	r3 = (r3 + r0)|0;
	r14 = heapU16[(r3+54)>>1];
	r14 = (r14 + 1)|0;
	heap16[(r3+54)>>1] = r14;
}
	r3 = heapU16[(r10)>>1];
	r3 = (r3 + -1)|0;
	heap16[(r10)>>1] = r3;
	r3 = heapU16[(r4+-2)>>1];
	r13 = heapU16[(r4)>>1];
	r14 = heapU16[(r4+-4)>>1];
	r15 = heapU16[(r4+-6)>>1];
	heap16[(r4+-2)>>1] = r15;
	heap16[(r4)>>1] = r14;
	heap16[(r4+-6)>>1] = r3;
	heap16[(r4+-4)>>1] = r13;
	r13 = heapU16[(r4+-10)>>1];
	if(uint(r3) >=uint(r13)) //_LBB60_14
{
break _3;
}
else{
	r3 = heap32[(r1+15)];
	r4 = (r4 + -4)|0;
continue _3;
}
}
}
	return;
}