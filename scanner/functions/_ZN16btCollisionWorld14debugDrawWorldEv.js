function _ZN16btCollisionWorld14debugDrawWorldEv(sp)
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
	var f0;
var __label__ = 0;
	i7 = sp + -104;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
_1: do {
if(!(r2 ==0)) //_LBB221_10
{
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r3 = r_g0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+12)];
	heap32[(g0)] = r_g0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r_g0 & 8;
if(!(r2 ==0)) //_LBB221_10
{
	r2 = heap32[(r1+6)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+9)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r_g0;
	r3 = sp + -16;
	r4 = r3 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r4+1)] = 0;
	r5 = 0;
	heap32[(r4+2)] = 0;
	heap32[(r4+3)] = 0;
_4: while(true){
	if(r5 <r2) //_LBB221_3
{
	r4 = heap32[(r1+6)];
	r6 = r4 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+10)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r4 = r_g0;
	r6 = r4 >> 2;
	r6 = heap32[(r6+279)];
	r7 = 36;
	r8 = 68;
	r9 = 0;
_7: while(true){
	if(r9 <r6) //_LBB221_4
{
	r10 = r4 >> 2;
	r10 = heap32[(r10+279)];
	if(r10 >r9) //_LBB221_6
{
	r10 = (r9 * 69)|0;
	r11 = (r4 + r7)|0;
	r12 = (r4 + r8)|0;
	r13 = heap32[(r1)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r13)>>2](i7);
	r14 = r_g0 >> 2;
	r15 = r10 << 2;
	r10 = r10 << 2;
	r14 = heap32[(r14)];
	r15 = (r4 + r15)|0;
	r10 = (r4 + r10)|0;
	r14 = r14 >> 2;
	r15 = r15 >> 2;
	r10 = r10 >> 2;
	r14 = heap32[(r14+8)];
	r15 = heap32[(r15+37)];
	f0 = heapFloat[(r10+21)];
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r12;
	heapFloat[(g0+3)] = f0;
	heap32[(g0+4)] = r15;
	heap32[(g0+5)] = r3;
	r9 = (r9 + 1)|0;
	r8 = (r8 + 276)|0;
	r7 = (r7 + 276)|0;
	__FUNCTION_TABLE__[(r14)>>2](i7);
}
else{
break _4;
}
}
else{
break _7;
}
}
	r5 = (r5 + 1)|0;
}
else{
break _1;
}
}
	r0 = _2E_str382;
	r1 = _2E_str483;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 122;
	_assert(i7);
}
}
} while(0);
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
_14: do {
if(!(r2 ==0)) //_LBB221_13
{
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r3 = r_g0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+12)];
	heap32[(g0)] = r_g0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r_g0 & 3;
if(!(r2 ==0)) //_LBB221_13
{
	r2 = heap32[(r1+2)];
	if(r2 >0) //_LBB221_14
{
	r2 = 0;
_18: while(true){
	r3 = heap32[(r1+4)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = heapU8[r3+204];
	r4 = r4 & 32;
if(!(r4 !=0)) //_LBB221_34
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
if(!(r4 ==0)) //_LBB221_31
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r5 = r_g0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+12)];
	heap32[(g0)] = r_g0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r4 = r_g0 & 1;
if(!(r4 ==0)) //_LBB221_31
{
	r4 = sp + -32;
	r5 = r4 >> 2;
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 1065353216;
	r6 = r3 >> 2;
	heap32[(r5+3)] = 0;
	r7 = heap32[(r6+54)];
_25: do {
	if(r7 >2) //_LBB221_21
{
	if(r7 ==3) //_LBB221_26
{
	heap32[(fp+-8)] = 0;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 1065353216;
	heap32[(r5+3)] = 0;
__label__ = 30;
break _25;
}
else{
	if(r7 ==4) //_LBB221_27
{
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
__label__ = 30;
break _25;
}
else{
	if(r7 ==5) //_LBB221_28
{
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
__label__ = 30;
break _25;
}
else{
__label__ = 29;
break _25;
}
}
}
}
else{
	if(r7 ==1) //_LBB221_24
{
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 1065353216;
	heap32[(r5+3)] = 0;
__label__ = 30;
}
else{
	if(r7 ==2) //_LBB221_25
{
	heap32[(fp+-8)] = 0;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
__label__ = 30;
}
else{
__label__ = 29;
}
}
}
} while(0);
if (__label__ == 29){
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
}
	r5 = heap32[(r1)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+6)];
	r6 = heap32[(r6+48)];
	r7 = (r3 + 4)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
}
	r4 = heap32[(r1+21)];
if(!(r4 ==0)) //_LBB221_34
{
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+12)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r4 = r_g0 & 2;
if(!(r4 ==0)) //_LBB221_34
{
	r4 = sp + -80;
	r5 = r4 >> 2;
	heap32[(fp+-20)] = 1065353216;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	r6 = r3 >> 2;
	heap32[(r5+3)] = 0;
	r5 = heap32[(r6+48)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	r3 = (r3 + 4)|0;
	r7 = sp + -48;
	r8 = sp + -64;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r8;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r3 = heap32[(r1+21)];
	r5 = r3 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+13)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
}
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r1+2)];
	if(r3 >r2) //_LBB221_15
{
continue _18;
}
else{
break _14;
}
}
}
}
}
} while(0);
	return;
}