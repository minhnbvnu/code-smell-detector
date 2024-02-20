function _ZN20btAxisSweep3InternalItE11sortMaxDownEitP12btDispatcherb(sp)
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
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 << 2;
	r2 = (r1 + r2)|0;
	r3 = heap32[(fp+2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+17)];
	r4 = r3 << 2;
	r5 = (r2 + r4)|0;
	r4 = heapU16[(r2+r4)>>1];
	r6 = heapU16[(r5+-4)>>1];
if(!(uint(r4) >=uint(r6))) //_LBB63_14
{
	r1 = r1 >> 2;
	r4 = heap32[(fp+3)];
	r6 = heap32[(fp+4)];
	r7 = heap32[(r1+15)];
	r3 = r3 << 2;
	r2 = (r2 + r3)|0;
	r2 = heapU16[(r2+2)>>1];
	r3 = 1;
	r8 = r3 << r0;
	r2 = r2 << 6;
	r8 = r8 & 3;
	r2 = (r7 + r2)|0;
	r0 = r0 << 1;
	r3 = r3 << r8;
	r2 = (r2 + r0)|0;
	r3 = r3 & 3;
	r2 = (r2 + 54)|0;
	r5 = (r5 + 2)|0;
_3: while(true){
	r9 = heapU8[r5+-6];
	r10 = heapU16[(r5+-4)>>1];
	r9 = r9 & 1;
	if(r9 != 0) //_LBB63_11
{
	r9 = r10 << 6;
	r7 = (r7 + r9)|0;
	r7 = (r7 + r0)|0;
	r9 = heapU16[(r7+54)>>1];
	r9 = (r9 + 1)|0;
	heap16[(r7+54)>>1] = r9;
}
else{
if(!(r6 ==0)) //_LBB63_10
{
	r9 = heapU16[(r5)>>1];
	r9 = r9 << 6;
	r11 = r10 << 6;
	r9 = (r7 + r9)|0;
	r12 = r8 << 1;
	r11 = (r7 + r11)|0;
	r13 = (r9 + r12)|0;
	r12 = (r11 + r12)|0;
	r14 = heapU16[(r13+54)>>1];
	r15 = heapU16[(r12+48)>>1];
if(!(uint(r14) <uint(r15))) //_LBB63_10
{
	r12 = heapU16[(r12+54)>>1];
	r13 = heapU16[(r13+48)>>1];
if(!(uint(r12) <uint(r13))) //_LBB63_10
{
	r12 = r3 << 1;
	r13 = (r9 + r12)|0;
	r12 = (r11 + r12)|0;
	r14 = heapU16[(r13+54)>>1];
	r15 = heapU16[(r12+48)>>1];
if(!(uint(r14) <uint(r15))) //_LBB63_10
{
	r12 = heapU16[(r12+54)>>1];
	r13 = heapU16[(r13+48)>>1];
if(!(uint(r12) <uint(r13))) //_LBB63_10
{
	r12 = heap32[(r1+23)];
	r13 = r12 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+3)];
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r13)>>2](i7);
	r12 = heap32[(r1+24)];
if(!(r12 ==0)) //_LBB63_10
{
	r13 = r12 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+3)];
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r13)>>2](i7);
}
}
}
}
}
}
	r10 = r10 << 6;
	r7 = (r7 + r10)|0;
	r7 = (r7 + r0)|0;
	r10 = heapU16[(r7+48)>>1];
	r10 = (r10 + 1)|0;
	heap16[(r7+48)>>1] = r10;
}
	r7 = heapU16[(r2)>>1];
	r7 = (r7 + -1)|0;
	heap16[(r2)>>1] = r7;
	r7 = heapU16[(r5+-2)>>1];
	r9 = heapU16[(r5)>>1];
	r10 = heapU16[(r5+-4)>>1];
	r11 = heapU16[(r5+-6)>>1];
	heap16[(r5+-2)>>1] = r11;
	heap16[(r5)>>1] = r10;
	heap16[(r5+-6)>>1] = r7;
	heap16[(r5+-4)>>1] = r9;
	r9 = heapU16[(r5+-10)>>1];
	if(uint(r7) >=uint(r9)) //_LBB63_14
{
break _3;
}
else{
	r7 = heap32[(r1+15)];
	r5 = (r5 + -4)|0;
continue _3;
}
}
}
	return;
}