function _ZNSt5dequeIjSaIjEE5eraseESt15__rw_deque_iterIjiPjRjS0_ES5_(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+4)];
	r0 = r0 >> 2;
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(r0)];
	r5 = heap32[(fp+3)];
	r6 = heap32[(r0+1)];
	r7 = r4 | r3;
	if(r7 !=0) //_LBB855_2
{
	r7 = r6 >> 2;
	r8 = (r6 - r5)|0;
	r9 = r5 >> 2;
	r8 = r8 << 3;
	r9 = heap32[(r9)];
	r7 = heap32[(r7)];
	r7 = (r4 - r7)|0;
	r8 = (r8 + -32)|0;
	r9 = (r9 + 128)|0;
	r9 = (r9 - r3)|0;
	r7 = r7 >> 2;
	r8 = r8 & -32;
	r7 = (r7 + r8)|0;
	r8 = r9 >> 2;
	r7 = (r7 + r8)|0;
}
else{
	r7 = (r4 - r3)|0;
	r7 = r7 >> 2;
}
	r8 = r2 >> 2;
	r9 = heap32[(r8)];
	r10 = heap32[(r8+1)];
	r11 = r3 | r9;
	if(r11 !=0) //_LBB855_5
{
	r11 = (r5 - r10)|0;
	r12 = r5 >> 2;
	r13 = r10 >> 2;
	r11 = r11 << 3;
	r13 = heap32[(r13)];
	r12 = heap32[(r12)];
	r11 = (r11 + -32)|0;
	r12 = (r3 - r12)|0;
	r13 = (r13 + 128)|0;
	r13 = (r13 - r9)|0;
	r11 = r11 & -32;
	r12 = r12 >> 2;
	r11 = (r11 + r12)|0;
	r12 = r13 >> 2;
	r11 = (r11 + r12)|0;
}
else{
	r11 = (r3 - r9)|0;
	r11 = r11 >> 2;
}
	r2 = (r2 + 8)|0;
	r12 = heap32[(r8+2)];
	r13 = heap32[(r8+3)];
	r14 = r12 | r4;
	if(r14 !=0) //_LBB855_8
{
	r14 = (r13 - r6)|0;
	r15 = r13 >> 2;
	r16 = r6 >> 2;
	r14 = r14 << 3;
	r16 = heap32[(r16)];
	r15 = heap32[(r15)];
	r14 = (r14 + -32)|0;
	r15 = (r12 - r15)|0;
	r16 = (r16 + 128)|0;
	r16 = (r16 - r4)|0;
	r14 = r14 & -32;
	r15 = r15 >> 2;
	r14 = (r14 + r15)|0;
	r15 = r16 >> 2;
	r14 = (r14 + r15)|0;
}
else{
	r14 = (r12 - r4)|0;
	r14 = r14 >> 2;
}
	if(r11 >=r14) //_LBB855_36
{
	r0 = (r5 + 4)|0;
	r9 = r3;
_15: while(true){
	r10 = r4 | r12;
	if(r10 !=0) //_LBB855_44
{
	r10 = r6 >> 2;
	r11 = (r6 - r13)|0;
	r14 = r13 >> 2;
	r11 = r11 << 3;
	r14 = heap32[(r14)];
	r10 = heap32[(r10)];
	r10 = (r4 - r10)|0;
	r11 = (r11 + -32)|0;
	r14 = (r14 + 128)|0;
	r14 = (r14 - r12)|0;
	r10 = r10 >> 2;
	r11 = r11 & -32;
	r10 = (r10 + r11)|0;
	r11 = r14 >> 2;
	r10 = (r10 + r11)|0;
}
else{
	r10 = (r4 - r12)|0;
	r10 = r10 >> 2;
}
	if(r10 !=0) //_LBB855_37
{
	r10 = r4 >> 2;
	r11 = r9 >> 2;
	r10 = heap32[(r10)];
	r4 = (r4 + 4)|0;
	r14 = r6 >> 2;
	heap32[(r11)] = r10;
	r10 = heap32[(r14)];
	r10 = (r10 + 128)|0;
	if(r4 ==r10) //_LBB855_39
{
	r6 = (r6 + 4)|0;
	r4 = heap32[(r14+1)];
}
	r10 = r0 >> 2;
	r9 = (r9 + 4)|0;
	r11 = heap32[(r10+-1)];
	r11 = (r11 + 128)|0;
if(!(r9 !=r11)) //_LBB855_42
{
	r9 = heap32[(r10)];
	r0 = (r0 + 4)|0;
}
}
else{
break _15;
}
}
_27: do {
if(!(r7 ==0)) //_LBB855_59
{
	r0 = heap32[(r8+2)];
_29: while(true){
	r0 = (r0 + -4)|0;
	heap32[(r8+2)] = r0;
	r4 = heap32[(r8+3)];
	r6 = heap32[(r8+1)];
	if(r6 !=r4) //_LBB855_51
{
__label__ = 45;
}
else{
	r6 = heap32[(r8)];
	if(r6 !=r0) //_LBB855_51
{
__label__ = 45;
}
else{
	r0 = r4 >> 2;
	r4 = heap32[(r0)];
__label__ = 47;
}
}
if (__label__ == 45){
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r0 ==r4) //_LBB855_53
{
__label__ = 47;
}
else{
__label__ = 46;
}
}
_36: do {
if (__label__ == 47){
	heap32[(g0)] = r4;
	_ZdlPv(i7);
	r0 = heap32[(r8+3)];
	r4 = heap32[(r8+1)];
if(!(r4 !=r0)) //_LBB855_58
{
	r4 = heap32[(r8)];
	r6 = heap32[(r8+2)];
if(!(r4 !=r6)) //_LBB855_58
{
	r0 = heap32[(r8+4)];
	r0 = (r0 + -4)|0;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	heap32[(r8+2)] = 0;
	heap32[(r8+3)] = r2;
	heap32[(r8)] = 0;
	heap32[(r8+1)] = r2;
	r0 = 0;
	heap32[(r8+4)] = 0;
	heap32[(r8+5)] = 0;
break _36;
}
}
	r4 = r0 >> 2;
	r6 = (r0 + -4)|0;
	heap32[(r4)] = 0;
	heap32[(r8+3)] = r6;
	r0 = heap32[(r4+-1)];
	r0 = (r0 + 128)|0;
	heap32[(r8+2)] = r0;
	heap32[(r8+3)] = r6;
}
} while(0);
	r7 = (r7 + -1)|0;
	if(r7 ==0) //_LBB855_59
{
break _27;
}
}
}
} while(0);
	r0 = r1 >> 2;
	heap32[(r0)] = r3;
	heap32[(r0+1)] = r5;
	return;
}
else{
_44: while(true){
	r12 = r9 | r3;
	if(r12 !=0) //_LBB855_20
{
	r12 = r10 >> 2;
	r13 = (r10 - r5)|0;
	r11 = r5 >> 2;
	r13 = r13 << 3;
	r11 = heap32[(r11)];
	r12 = heap32[(r12)];
	r12 = (r9 - r12)|0;
	r13 = (r13 + -32)|0;
	r11 = (r11 + 128)|0;
	r11 = (r11 - r3)|0;
	r12 = r12 >> 2;
	r13 = r13 & -32;
	r12 = (r12 + r13)|0;
	r13 = r11 >> 2;
	r12 = (r12 + r13)|0;
}
else{
	r12 = (r9 - r3)|0;
	r12 = r12 >> 2;
}
	if(r12 !=0) //_LBB855_11
{
	r12 = r6 >> 2;
	r13 = heap32[(r12)];
	if(r4 ==r13) //_LBB855_13
{
	r4 = heap32[(r12+-1)];
	r6 = (r6 + -4)|0;
	r4 = (r4 + 128)|0;
}
	r12 = r5 >> 2;
	r4 = (r4 + -4)|0;
	r13 = heap32[(r12)];
	if(r3 ==r13) //_LBB855_16
{
	r3 = heap32[(r12+-1)];
	r5 = (r5 + -4)|0;
	r3 = (r3 + 128)|0;
}
	r12 = r3 >> 2;
	r3 = (r3 + -4)|0;
	r13 = r4 >> 2;
	r12 = heap32[(r12+-1)];
	heap32[(r13)] = r12;
}
else{
break _44;
}
}
_58: do {
if(!(r7 ==0)) //_LBB855_35
{
	r3 = heap32[(r8)];
_60: while(true){
	r3 = (r3 + 4)|0;
	heap32[(r8)] = r3;
	r4 = heap32[(r8+1)];
	r5 = heap32[(r8+3)];
	if(r4 !=r5) //_LBB855_27
{
__label__ = 24;
}
else{
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	if(r3 !=r5) //_LBB855_27
{
__label__ = 24;
}
else{
	r3 = r4 >> 2;
	r4 = heap32[(r3)];
__label__ = 26;
}
}
if (__label__ == 24){
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r5 = (r4 + 128)|0;
	if(r3 ==r5) //_LBB855_29
{
__label__ = 26;
}
else{
__label__ = 25;
}
}
_67: do {
if (__label__ == 26){
	heap32[(g0)] = r4;
	_ZdlPv(i7);
	r3 = heap32[(r8+1)];
	r4 = heap32[(r8+3)];
if(!(r3 !=r4)) //_LBB855_34
{
	r4 = heap32[(r8)];
	r5 = heap32[(r8+2)];
if(!(r4 !=r5)) //_LBB855_34
{
	r3 = heap32[(r8+4)];
	r3 = (r3 + -4)|0;
	heap32[(g0)] = r3;
	_ZdlPv(i7);
	heap32[(r8+2)] = 0;
	heap32[(r8+3)] = r2;
	heap32[(r8)] = 0;
	heap32[(r8+1)] = r2;
	r3 = 0;
	heap32[(r8+4)] = 0;
	heap32[(r8+5)] = 0;
break _67;
}
}
	r4 = r3 >> 2;
	r5 = (r3 + 4)|0;
	heap32[(r4)] = 0;
	heap32[(r8+1)] = r5;
	r3 = heap32[(r4+1)];
	heap32[(r8)] = r3;
	heap32[(r8+1)] = r5;
}
} while(0);
	r7 = (r7 + -1)|0;
	if(r7 ==0) //_LBB855_35
{
break _58;
}
}
}
} while(0);
	r1 = r1 >> 2;
	r2 = heap32[(r0)];
	heap32[(r1)] = r2;
	r2 = heap32[(r0+1)];
	heap32[(r1+1)] = r2;
	return;
}
}