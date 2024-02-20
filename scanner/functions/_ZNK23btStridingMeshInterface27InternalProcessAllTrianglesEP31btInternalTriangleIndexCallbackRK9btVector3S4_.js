function _ZNK23btStridingMeshInterface27InternalProcessAllTrianglesEP31btInternalTriangleIndexCallbackRK9btVector3S4_(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -120;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+7)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
	r3 = heap32[(fp+1)];
	f0 = heapFloat[(r1+1)];
	f1 = heapFloat[(r1+2)];
	f2 = heapFloat[(r1+3)];
	r4 = 0;
_1: while(true){
	if(r4 <r2) //_LBB491_1
{
	r5 = heap32[(r1)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+4)];
	r6 = sp + -4;
	r7 = sp + -28;
	r8 = sp + -16;
	r9 = sp + -24;
	r10 = sp + -8;
	r11 = sp + -12;
	r12 = sp + -32;
	r13 = sp + -20;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r8;
	heap32[(g0+4)] = r9;
	heap32[(g0+5)] = r10;
	heap32[(g0+6)] = r11;
	heap32[(g0+7)] = r12;
	heap32[(g0+8)] = r13;
	heap32[(g0+9)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r5 = heap32[(fp+-4)];
_4: do {
	if(r5 ==1) //_LBB491_13
{
	r5 = heap32[(fp+-5)];
	if(r5 ==3) //_LBB491_17
{
	r5 = heap32[(fp+-8)];
	if(r5 <1) //_LBB491_25
{
break _4;
}
else{
	r5 = 0;
_9: while(true){
	r6 = heap32[(fp+-3)];
	r7 = heap32[(fp+-2)];
	r6 = (r6 * r5)|0;
	r8 = heapU16[(r7+r6)>>1];
	r9 = heap32[(fp+-6)];
	r10 = heap32[(fp+-1)];
	r8 = (r8 * r9)|0;
	r11 = (r10 + r8)|0;
	f3 = llvm_readDouble((r10+r8));
	f4 = llvm_readDouble((r11+16));
	f5 = llvm_readDouble((r11+8));
	f3 = f3; //fdtos f3, f3
	r8 = sp + -80;
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	r11 = r8 >> 2;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(fp+-20)] = f3;
	f3 = f4*f2;
	heapFloat[(r11+1)] = f5;
	heapFloat[(r11+2)] = f3;
	r6 = (r7 + r6)|0;
	heap32[(r11+3)] = 0;
	r7 = heapU16[(r6+2)>>1];
	r7 = (r7 * r9)|0;
	r12 = (r10 + r7)|0;
	f3 = llvm_readDouble((r10+r7));
	f3 = f3; //fdtos f3, f3
	f4 = llvm_readDouble((r12+16));
	f5 = llvm_readDouble((r12+8));
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(r11+4)] = f3;
	f3 = f4*f2;
	heapFloat[(r11+5)] = f5;
	heapFloat[(r11+6)] = f3;
	heap32[(r11+7)] = 0;
	r6 = heapU16[(r6+4)>>1];
	r6 = (r6 * r9)|0;
	r7 = (r10 + r6)|0;
	f3 = llvm_readDouble((r10+r6));
	f3 = f3; //fdtos f3, f3
	f4 = llvm_readDouble((r7+16));
	f5 = llvm_readDouble((r7+8));
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(r11+8)] = f3;
	f3 = f4*f2;
	heapFloat[(r11+9)] = f5;
	heapFloat[(r11+10)] = f3;
	r6 = r3 >> 2;
	heap32[(r11+11)] = 0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	r5 = (r5 + 1)|0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(fp+-8)];
	if(r5 <r6) //_LBB491_20
{
continue _9;
}
else{
break _4;
}
}
}
}
else{
	if(r5 !=2) //_LBB491_21
{
	r5 = (r5 + -2)|0;
if(!(uint(r5) <uint(2))) //_LBB491_25
{
__label__ = 22;
break _1;
}
}
else{
	r5 = heap32[(fp+-8)];
	if(r5 <1) //_LBB491_25
{
break _4;
}
else{
	r5 = 0;
_16: while(true){
	r6 = heap32[(fp+-3)];
	r7 = heap32[(fp+-2)];
	r6 = (r6 * r5)|0;
	r6 = (r7 + r6)|0;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r8 = heap32[(fp+-6)];
	r9 = heap32[(fp+-1)];
	r7 = (r8 * r7)|0;
	r10 = (r9 + r7)|0;
	f3 = llvm_readDouble((r9+r7));
	f4 = llvm_readDouble((r10+16));
	f5 = llvm_readDouble((r10+8));
	f3 = f3; //fdtos f3, f3
	r7 = sp + -80;
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	r10 = r7 >> 2;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(fp+-20)] = f3;
	f3 = f4*f2;
	heapFloat[(r10+1)] = f5;
	heapFloat[(r10+2)] = f3;
	heap32[(r10+3)] = 0;
	r11 = heap32[(r6+1)];
	r11 = (r8 * r11)|0;
	r12 = (r9 + r11)|0;
	f3 = llvm_readDouble((r9+r11));
	f3 = f3; //fdtos f3, f3
	f4 = llvm_readDouble((r12+16));
	f5 = llvm_readDouble((r12+8));
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(r10+4)] = f3;
	f3 = f4*f2;
	heapFloat[(r10+5)] = f5;
	heapFloat[(r10+6)] = f3;
	heap32[(r10+7)] = 0;
	r6 = heap32[(r6+2)];
	r6 = (r8 * r6)|0;
	r8 = (r9 + r6)|0;
	f3 = llvm_readDouble((r9+r6));
	f3 = f3; //fdtos f3, f3
	f4 = llvm_readDouble((r8+16));
	f5 = llvm_readDouble((r8+8));
	f5 = f5; //fdtos f5, f5
	f3 = f3*f0;
	f4 = f4; //fdtos f4, f4
	f5 = f5*f1;
	heapFloat[(r10+8)] = f3;
	f3 = f4*f2;
	heapFloat[(r10+9)] = f5;
	heapFloat[(r10+10)] = f3;
	r6 = r3 >> 2;
	heap32[(r10+11)] = 0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	r5 = (r5 + 1)|0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(fp+-8)];
	if(r5 <r6) //_LBB491_19
{
continue _16;
}
else{
break _4;
}
}
}
}
}
}
else{
	if(r5 !=0) //_LBB491_23
{
if(!(uint(r5) <uint(2))) //_LBB491_25
{
__label__ = 24;
break _1;
}
}
else{
	r5 = heap32[(fp+-5)];
	if(r5 ==3) //_LBB491_7
{
	r5 = heap32[(fp+-8)];
	if(r5 <1) //_LBB491_25
{
break _4;
}
else{
	r5 = 0;
_25: while(true){
	r6 = heap32[(fp+-3)];
	r7 = heap32[(fp+-2)];
	r6 = (r6 * r5)|0;
	r8 = heapU16[(r7+r6)>>1];
	r9 = heap32[(fp+-6)];
	r10 = heap32[(fp+-1)];
	r8 = (r8 * r9)|0;
	r8 = (r10 + r8)|0;
	r8 = r8 >> 2;
	f3 = heapFloat[(r8)];
	f4 = heapFloat[(r8+2)];
	f5 = heapFloat[(r8+1)];
	r8 = sp + -80;
	f3 = f3*f0;
	r11 = r8 >> 2;
	f5 = f5*f1;
	heapFloat[(fp+-20)] = f3;
	f3 = f4*f2;
	heapFloat[(r11+1)] = f5;
	heapFloat[(r11+2)] = f3;
	r6 = (r7 + r6)|0;
	heap32[(r11+3)] = 0;
	r7 = heapU16[(r6+2)>>1];
	r7 = (r7 * r9)|0;
	r7 = (r10 + r7)|0;
	r7 = r7 >> 2;
	f3 = heapFloat[(r7+2)];
	f4 = heapFloat[(r7+1)];
	f5 = heapFloat[(r7)];
	f5 = f5*f0;
	f4 = f4*f1;
	heapFloat[(r11+4)] = f5;
	f3 = f3*f2;
	heapFloat[(r11+5)] = f4;
	heapFloat[(r11+6)] = f3;
	heap32[(r11+7)] = 0;
	r6 = heapU16[(r6+4)>>1];
	r6 = (r6 * r9)|0;
	r6 = (r10 + r6)|0;
	r6 = r6 >> 2;
	f3 = heapFloat[(r6+2)];
	f4 = heapFloat[(r6+1)];
	f5 = heapFloat[(r6)];
	f5 = f5*f0;
	f4 = f4*f1;
	heapFloat[(r11+8)] = f5;
	f3 = f3*f2;
	heapFloat[(r11+9)] = f4;
	heapFloat[(r11+10)] = f3;
	r6 = r3 >> 2;
	heap32[(r11+11)] = 0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	r5 = (r5 + 1)|0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(fp+-8)];
	if(r5 <r6) //_LBB491_10
{
continue _25;
}
else{
break _4;
}
}
}
}
else{
	if(r5 !=2) //_LBB491_11
{
	r5 = (r5 + -2)|0;
if(!(uint(r5) <uint(2))) //_LBB491_25
{
__label__ = 12;
break _1;
}
}
else{
	r5 = heap32[(fp+-8)];
if(!(r5 <1)) //_LBB491_25
{
	r5 = 0;
_32: while(true){
	r6 = heap32[(fp+-3)];
	r7 = heap32[(fp+-2)];
	r6 = (r6 * r5)|0;
	r6 = (r7 + r6)|0;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r8 = heap32[(fp+-6)];
	r9 = heap32[(fp+-1)];
	r7 = (r8 * r7)|0;
	r7 = (r9 + r7)|0;
	r7 = r7 >> 2;
	f3 = heapFloat[(r7)];
	f4 = heapFloat[(r7+2)];
	f5 = heapFloat[(r7+1)];
	r7 = sp + -80;
	f3 = f3*f0;
	r10 = r7 >> 2;
	f5 = f5*f1;
	heapFloat[(fp+-20)] = f3;
	f3 = f4*f2;
	heapFloat[(r10+1)] = f5;
	heapFloat[(r10+2)] = f3;
	heap32[(r10+3)] = 0;
	r11 = heap32[(r6+1)];
	r11 = (r8 * r11)|0;
	r11 = (r9 + r11)|0;
	r11 = r11 >> 2;
	f3 = heapFloat[(r11+2)];
	f4 = heapFloat[(r11+1)];
	f5 = heapFloat[(r11)];
	f5 = f5*f0;
	f4 = f4*f1;
	heapFloat[(r10+4)] = f5;
	f3 = f3*f2;
	heapFloat[(r10+5)] = f4;
	heapFloat[(r10+6)] = f3;
	heap32[(r10+7)] = 0;
	r6 = heap32[(r6+2)];
	r6 = (r8 * r6)|0;
	r6 = (r9 + r6)|0;
	r6 = r6 >> 2;
	f3 = heapFloat[(r6+2)];
	f4 = heapFloat[(r6+1)];
	f5 = heapFloat[(r6)];
	f5 = f5*f0;
	f4 = f4*f1;
	heapFloat[(r10+8)] = f5;
	f3 = f3*f2;
	heapFloat[(r10+9)] = f4;
	heapFloat[(r10+10)] = f3;
	r6 = r3 >> 2;
	heap32[(r10+11)] = 0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	r5 = (r5 + 1)|0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(fp+-8)];
if(!(r5 <r6)) //_LBB491_9
{
break _4;
}
}
}
}
}
}
}
} while(0);
	r5 = heap32[(r1)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	r4 = (r4 + 1)|0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
continue _1;
}
else{
__label__ = 27;
break _1;
}
}
switch(__label__ ){//multiple entries
case 27:
	return;
break;
case 22:
	r0 = _2E_str9358;
	r1 = _2E_str3352;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 134;
	_assert(i7);
break;
case 24:
	r0 = _2E_str6355;
	r1 = _2E_str3352;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 139;
	_assert(i7);
break;
case 12:
	r0 = _2E_str9358;
	r1 = _2E_str3352;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 92;
	_assert(i7);
break;
}
}