function _Z41__static_initialization_and_destruction_0ii(sp)
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
var __label__ = 0;
	i7 = sp + -80;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	if(r0 ==0) //_LBB856_16
{
	r0 = _ZL13s_fifo_errors;
	r1 = r0 >> 2;
	r2 = heap32[(r1+2)];
	r3 = sp + -24;
	heap32[(fp+-6)] = r2;
	r2 = r3 >> 2;
	r4 = heap32[(r1+3)];
	heap32[(r2+1)] = r4;
	r2 = heap32[(r1)];
	r1 = heap32[(r1+1)];
	r4 = sp + -32;
}
else{
	if(r0 !=1) //_LBB856_17
{
	return;
}
else{
	r0 = sp + -56;
	r1 = r0 >> 2;
	r2 = (r0 + 8)|0;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = r2;
	heap32[(fp+-14)] = 0;
	heap32[(r1+1)] = r2;
	r2 = _ZL13s_fifo_errors;
	heap32[(r1+4)] = 0;
	r3 = r2 >> 2;
	heap32[(r1+5)] = 0;
	r4 = (r2 + 8)|0;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = r4;
	heap32[(r3)] = 0;
	heap32[(r3+1)] = r4;
	r5 = 0;
	heap32[(r3+4)] = 0;
	heap32[(r3+5)] = 0;
	r6 = r4;
	r7 = r5;
_7: while(true){
	if(r7 !=0) //_LBB856_12
{
	r8 = (r2 + 8)|0;
	r8 = (r8 - r6)|0;
	r9 = r6 >> 2;
	r8 = r8 << 3;
	r9 = heap32[(r9)];
	r10 = 0;
	r11 = heap32[(r3+2)];
	r10 = (r10 - r11)|0;
	r8 = (r8 + -32)|0;
	r9 = (r9 + 128)|0;
	r9 = (r9 - r7)|0;
	r10 = r10 >> 2;
	r8 = r8 & -32;
	r8 = (r10 + r8)|0;
	r9 = r9 >> 2;
	r8 = (r8 + r9)|0;
}
else{
	r8 = 0;
	r8 = (r8 - r7)|0;
	r8 = r8 >> 2;
}
	if(r8 !=0) //_LBB856_3
{
	r8 = r4 >> 2;
	r9 = heap32[(r8)];
	if(r5 ==r9) //_LBB856_5
{
	r5 = heap32[(r8+-1)];
	r4 = (r4 + -4)|0;
	r5 = (r5 + 128)|0;
}
	r8 = r6 >> 2;
	r5 = (r5 + -4)|0;
	r9 = heap32[(r8)];
	if(r7 ==r9) //_LBB856_8
{
	r7 = heap32[(r8+-1)];
	r6 = (r6 + -4)|0;
	r7 = (r7 + 128)|0;
}
	r8 = r7 >> 2;
	r7 = (r7 + -4)|0;
	r9 = r5 >> 2;
	r8 = heap32[(r8+-1)];
	heap32[(r9)] = r8;
}
else{
break _7;
}
}
	r2 = heap32[(r1+2)];
	r3 = sp + -8;
	heap32[(fp+-2)] = r2;
	r2 = r3 >> 2;
	r4 = heap32[(r1+3)];
	heap32[(r2+1)] = r4;
	r2 = heap32[(fp+-14)];
	r1 = heap32[(r1+1)];
	r4 = sp + -16;
}
}
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r3;
	_ZNSt5dequeIjSaIjEE5eraseESt15__rw_deque_iterIjiPjRjS0_ES5_(i7);
	return;
}