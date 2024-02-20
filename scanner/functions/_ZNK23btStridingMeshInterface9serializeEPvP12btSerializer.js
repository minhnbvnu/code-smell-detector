function _ZNK23btStridingMeshInterface9serializeEPvP12btSerializer(sp)
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
	i7 = sp + -72;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+7)];
	r3 = heap32[(fp+1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
	r3 = r3 >> 2;
	heap32[(r3+5)] = r2;
	heap32[(r3)] = 0;
if(!(r2 ==0)) //_LBB490_32
{
	r4 = heap32[(fp+2)];
	r5 = r4 >> 2;
	r6 = heap32[(r5)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 28;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r2 = r_g0;
	r6 = heap32[(r5)];
	r6 = r6 >> 2;
	r7 = r2 >> 2;
	r7 = heap32[(r7+2)];
	r6 = heap32[(r6+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	heap32[(r3)] = r_g0;
	r6 = heap32[(r1)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+7)];
	heap32[(g0)] = r0;
	r8 = 0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0;
_3: while(true){
	if(r8 <r6) //_LBB490_2
{
	r9 = heap32[(r1)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+4)];
	r10 = sp + -4;
	r11 = sp + -28;
	r12 = sp + -16;
	r13 = sp + -24;
	r14 = sp + -8;
	r15 = sp + -12;
	r16 = sp + -32;
	r17 = sp + -20;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r12;
	heap32[(g0+4)] = r13;
	heap32[(g0+5)] = r14;
	heap32[(g0+6)] = r15;
	heap32[(g0+7)] = r16;
	heap32[(g0+8)] = r17;
	heap32[(g0+9)] = r8;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	r9 = r7 >> 2;
	r10 = heap32[(fp+-8)];
	heap32[(r9+5)] = r10;
	r10 = heap32[(fp+-7)];
	heap32[(r9+6)] = r10;
	heap32[(r9+4)] = 0;
	heap32[(r9+2)] = 0;
	heap32[(r9+3)] = 0;
	heap32[(r9)] = 0;
	heap32[(r9+1)] = 0;
	r10 = heap32[(fp+-5)];
	if(r10 ==3) //_LBB490_9
{
	r10 = heap32[(fp+-8)];
if(!(r10 ==0)) //_LBB490_15
{
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 8;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r10 = r_g0;
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r12 = heap32[(r12+2)];
	r11 = heap32[(r11+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	heap32[(r9+3)] = r_g0;
	r11 = heap32[(fp+-8)];
if(!(r11 <1)) //_LBB490_13
{
	r11 = 0;
_11: while(true){
	r13 = heap32[(fp+-3)];
	r13 = (r13 * r11)|0;
	r14 = heap32[(fp+-2)];
	r15 = heapU16[(r14+r13)>>1];
	r16 = r11 << 3;
	r13 = (r14 + r13)|0;
	heap16[(r12+r16)>>1] = r15;
	r14 = (r12 + r16)|0;
	r15 = heapU16[(r13+2)>>1];
	heap16[(r14+2)>>1] = r15;
	r13 = heapU16[(r13+4)>>1];
	r11 = (r11 + 1)|0;
	heap16[(r14+4)>>1] = r13;
	r13 = heap32[(fp+-8)];
if(!(r11 <r13)) //_LBB490_12
{
break _11;
}
}
}
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r11 = heap32[(r11+5)];
	r12 = heap32[(r12+2)];
	r13 = _2E_str1350;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
}
}
else{
	if(r10 !=2) //_LBB490_14
{
__label__ = 14;
break _3;
}
else{
	r10 = heap32[(fp+-8)];
	r10 = (r10 * 3)|0;
if(!(r10 ==0)) //_LBB490_15
{
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 4;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r10 = r_g0;
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r12 = heap32[(r12+2)];
	r11 = heap32[(r11+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	heap32[(r9+2)] = r_g0;
	r11 = heap32[(fp+-8)];
_17: do {
if(!(r11 <1)) //_LBB490_8
{
	r11 = 0;
_19: while(true){
	r13 = heap32[(fp+-3)];
	r13 = (r13 * r11)|0;
	r14 = heap32[(fp+-2)];
	r15 = (r11 * 3)|0;
	r13 = (r14 + r13)|0;
	r13 = r13 >> 2;
	r14 = r15 << 2;
	r14 = (r12 + r14)|0;
	r15 = heap32[(r13)];
	r14 = r14 >> 2;
	heap32[(r14)] = r15;
	r15 = heap32[(r13+1)];
	heap32[(r14+1)] = r15;
	r13 = heap32[(r13+2)];
	r11 = (r11 + 1)|0;
	heap32[(r14+2)] = r13;
	r13 = heap32[(fp+-8)];
if(!(r11 <r13)) //_LBB490_7
{
break _17;
}
}
}
} while(0);
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r11 = heap32[(r11+5)];
	r12 = heap32[(r12+2)];
	r13 = _2E_str349;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
}
}
}
	r10 = heap32[(fp+-4)];
_23: do {
	if(r10 ==1) //_LBB490_22
{
	r10 = heap32[(fp+-7)];
	if(r10 ==0) //_LBB490_29
{
break _23;
}
else{
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 32;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r10 = r_g0;
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r12 = heap32[(r12+2)];
	r11 = heap32[(r11+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	heap32[(r9+1)] = r_g0;
	r9 = heap32[(fp+-7)];
_26: do {
if(!(r9 <1)) //_LBB490_26
{
	r11 = heap32[(fp+-1)];
	r13 = heap32[(fp+-6)];
	r11 = (r11 + 16)|0;
	r14 = 0;
_28: while(true){
	r15 = r14 << 5;
	r15 = (r12 + r15)|0;
	llvm_move_double(r15,r11+-16);
	r14 = (r14 + 1)|0;
	r16 = (r11 + r13)|0;
	llvm_move_double(r15+8,r11+-8);
	llvm_move_double(r15+16,r11);
	r11 = r16;
if(!(r14 <r9)) //_LBB490_25
{
break _26;
}
}
}
} while(0);
	r9 = heap32[(r5)];
	r9 = r9 >> 2;
	r11 = r10 >> 2;
	r9 = heap32[(r9+5)];
	r11 = heap32[(r11+2)];
	r12 = _2E_str5354;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r11;
	__FUNCTION_TABLE__[(r9)>>2](i7);
}
}
else{
	if(r10 !=0) //_LBB490_27
{
if(!(uint(r10) <uint(2))) //_LBB490_29
{
__label__ = 28;
break _3;
}
}
else{
	r10 = heap32[(fp+-7)];
if(!(r10 ==0)) //_LBB490_29
{
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 16;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r10 = r_g0;
	r11 = heap32[(r5)];
	r11 = r11 >> 2;
	r12 = r10 >> 2;
	r12 = heap32[(r12+2)];
	r11 = heap32[(r11+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r12;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	heap32[(r9)] = r_g0;
	r9 = heap32[(fp+-7)];
_36: do {
if(!(r9 <1)) //_LBB490_21
{
	r9 = 0;
_38: while(true){
	r11 = heap32[(fp+-6)];
	r13 = heap32[(fp+-1)];
	r11 = (r11 * r9)|0;
	r14 = r9 << 4;
	r14 = (r12 + r14)|0;
	r11 = (r13 + r11)|0;
	r13 = r14 >> 2;
	r11 = r11 >> 2;
	heap32[(r13)] = heap32[(r11)];
	r9 = (r9 + 1)|0;
	heap32[(r13+1)] = heap32[(r11+1)];
	heap32[(r13+2)] = heap32[(r11+2)];
	r11 = heap32[(fp+-7)];
if(!(r9 <r11)) //_LBB490_20
{
break _36;
}
}
}
} while(0);
	r9 = heap32[(r5)];
	r9 = r9 >> 2;
	r11 = r10 >> 2;
	r9 = heap32[(r9+5)];
	r11 = heap32[(r11+2)];
	r12 = _2E_str5223;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r11;
	__FUNCTION_TABLE__[(r9)>>2](i7);
}
}
}
} while(0);
	r9 = heap32[(r1)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r8;
	r8 = (r8 + 1)|0;
	r7 = (r7 + 28)|0;
	__FUNCTION_TABLE__[(r9)>>2](i7);
}
else{
__label__ = 31;
break _3;
}
}
switch(__label__ ){//multiple entries
case 31:
	r0 = heap32[(r5)];
	r0 = r0 >> 2;
	r5 = r2 >> 2;
	r0 = heap32[(r0+5)];
	r5 = heap32[(r5+2)];
	r6 = _2E_str7356;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = 1497453121;
	heap32[(g0+4)] = r5;
	__FUNCTION_TABLE__[(r0)>>2](i7);
break;
case 28:
	r0 = _2E_str6355;
	r1 = _2E_str3352;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 319;
	_assert(i7);
break;
case 14:
	r0 = _2E_str10;
	r1 = _2E_str3352;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 271;
	_assert(i7);
break;
}
}
	heap32[(r3+1)] = heap32[(r1+1)];
	heap32[(r3+2)] = heap32[(r1+2)];
	heap32[(r3+3)] = heap32[(r1+3)];
	heap32[(r3+4)] = heap32[(r1+4)];
	r0 = _2E_str8357;
	r_g0 = r0;
	return;
}