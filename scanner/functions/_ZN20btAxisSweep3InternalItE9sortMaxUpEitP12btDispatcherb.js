function _ZN20btAxisSweep3InternalItE9sortMaxUpEitP12btDispatcherb(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 << 2;
	r2 = (r1 + r2)|0;
	r2 = r2 >> 2;
	r3 = heap32[(fp+2)];
	r4 = 1;
	r2 = heap32[(r2+17)];
	r3 = r3 << 2;
	r2 = (r2 + r3)|0;
	r3 = r4 << r0;
	r3 = r3 & 3;
	r1 = r1 >> 2;
	r5 = heapU16[(r2+2)>>1];
	r4 = r4 << r3;
	r6 = heap32[(r1+15)];
	r5 = r5 << 6;
	r4 = r4 & 3;
	r5 = (r6 + r5)|0;
	r3 = r3 << 1;
	r6 = (r5 + 48)|0;
	r4 = r4 << 1;
	r5 = (r5 + 54)|0;
	r0 = r0 << 1;
	r7 = heap32[(fp+3)];
	r8 = (r5 + r3)|0;
	r9 = (r6 + r3)|0;
	r10 = (r5 + r4)|0;
	r6 = (r6 + r4)|0;
	r5 = (r5 + r0)|0;
	r2 = (r2 + 4)|0;
_1: while(true){
	r11 = heapU16[(r2+2)>>1];
	if(r11 ==0) //_LBB61_14
{
break _1;
}
else{
	r12 = heapU16[(r2)>>1];
	r13 = heapU16[(r2+-4)>>1];
	if(uint(r13) >=uint(r12)) //_LBB61_1
{
	r13 = heap32[(r1+15)];
	r11 = r11 & 65535;
	r12 = r12 & 1;
	if(r12 != 0) //_LBB61_10
{
	r11 = r11 << 6;
	r11 = (r13 + r11)|0;
	r11 = (r11 + r0)|0;
	r12 = heapU16[(r11+54)>>1];
	r12 = (r12 + -1)|0;
	heap16[(r11+54)>>1] = r12;
}
else{
if(!(r7 ==0)) //_LBB61_9
{
	r12 = r11 << 6;
	r12 = (r13 + r12)|0;
	r14 = (r12 + r3)|0;
	r15 = heapU16[(r8)>>1];
	r16 = heapU16[(r14+48)>>1];
if(!(uint(r15) <uint(r16))) //_LBB61_9
{
	r14 = heapU16[(r14+54)>>1];
	r15 = heapU16[(r9)>>1];
if(!(uint(r14) <uint(r15))) //_LBB61_9
{
	r14 = (r12 + r4)|0;
	r15 = heapU16[(r10)>>1];
	r16 = heapU16[(r14+48)>>1];
if(!(uint(r15) <uint(r16))) //_LBB61_9
{
	r14 = heapU16[(r14+54)>>1];
	r15 = heapU16[(r6)>>1];
if(!(uint(r14) <uint(r15))) //_LBB61_9
{
	r14 = heap32[(r1+23)];
	r15 = r14 >> 2;
	r15 = heap32[(r15)];
	r15 = r15 >> 2;
	r16 = heapU16[(r2+-2)>>1];
	r15 = heap32[(r15+2)];
	r16 = r16 << 6;
	r16 = (r13 + r16)|0;
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r16;
	heap32[(g0+2)] = r12;
	__FUNCTION_TABLE__[(r15)>>2](i7);
	r14 = heap32[(r1+24)];
if(!(r14 ==0)) //_LBB61_9
{
	r15 = r14 >> 2;
	r15 = heap32[(r15)];
	r15 = r15 >> 2;
	r15 = heap32[(r15+2)];
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r16;
	heap32[(g0+2)] = r12;
	__FUNCTION_TABLE__[(r15)>>2](i7);
}
}
}
}
}
}
	r11 = r11 << 6;
	r11 = (r13 + r11)|0;
	r11 = (r11 + r0)|0;
	r12 = heapU16[(r11+48)>>1];
	r12 = (r12 + -1)|0;
	heap16[(r11+48)>>1] = r12;
}
	r11 = heapU16[(r5)>>1];
	r11 = (r11 + 1)|0;
	heap16[(r5)>>1] = r11;
	r11 = heapU16[(r2+-2)>>1];
	r12 = heapU16[(r2+-4)>>1];
	r13 = heapU16[(r2+2)>>1];
	r14 = heapU16[(r2)>>1];
	heap16[(r2+-4)>>1] = r14;
	heap16[(r2+-2)>>1] = r13;
	r13 = (r2 + 4)|0;
	heap16[(r2)>>1] = r12;
	heap16[(r2+2)>>1] = r11;
	r2 = r13;
continue _1;
}
else{
break _1;
}
}
}
	return;
}