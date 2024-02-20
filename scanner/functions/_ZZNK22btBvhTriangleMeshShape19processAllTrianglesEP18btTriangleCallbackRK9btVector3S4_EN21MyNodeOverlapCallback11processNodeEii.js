function _ZZNK22btBvhTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_EN21MyNodeOverlapCallback11processNodeEii(sp)
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
	i7 = sp + -72;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+4)];
	r4 = heap32[(fp+1)];
	r5 = sp + -4;
	r6 = sp + -8;
	r7 = sp + -12;
	r8 = sp + -16;
	r9 = sp + -20;
	r10 = sp + -24;
	r11 = sp + -28;
	r12 = sp + -32;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r8;
	heap32[(g0+5)] = r9;
	heap32[(g0+6)] = r10;
	heap32[(g0+7)] = r11;
	heap32[(g0+8)] = r12;
	heap32[(g0+9)] = r4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = heap32[(fp+-8)];
	r3 = (r2 + -2)|0;
	if(uint(r3) <uint(2)) //_LBB405_2
{
	r3 = heap32[(fp+2)];
	r5 = heap32[(fp+-5)];
	r6 = heap32[(fp+-6)];
	r6 = (r6 * r3)|0;
	r5 = (r6 + r5)|0;
	r6 = heap32[(r1+1)];
	r5 = (r5 + 8)|0;
	r7 = 0;
	r8 = r7;
_3: while(true){
	r9 = r8 << 1;
	r10 = (r7 - r9)|0;
	if(r2 !=3) //_LBB405_5
{
	r9 = (r5 - r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
}
else{
	r9 = (r5 - r8)|0;
	r9 = heapU16[(r9+-4)>>1];
}
	r11 = heap32[(fp+-4)];
	r12 = heap32[(fp+-1)];
	r9 = (r11 * r9)|0;
	r11 = heap32[(fp+-3)];
	if(r11 !=0) //_LBB405_8
{
	r11 = (r12 + r9)|0;
	r13 = r6 >> 2;
	f0 = llvm_readDouble((r11+16));
	f1 = llvm_readDouble((r11+8));
	f2 = llvm_readDouble((r12+r9));
	f0 = f0; //fdtos f0, f0
	f3 = heapFloat[(r13+3)];
	f1 = f1; //fdtos f1, f1
	f4 = heapFloat[(r13+2)];
	f2 = f2; //fdtos f2, f2
	f5 = heapFloat[(r13+1)];
	f0 = f0*f3;
	f1 = f1*f4;
	f2 = f2*f5;
}
else{
	r9 = (r12 + r9)|0;
	r9 = r9 >> 2;
	r12 = r6 >> 2;
	f0 = heapFloat[(r9+2)];
	f1 = heapFloat[(r12+3)];
	f2 = heapFloat[(r9+1)];
	f3 = heapFloat[(r12+2)];
	f4 = heapFloat[(r9)];
	f5 = heapFloat[(r12+1)];
	f0 = f0*f1;
	f1 = f2*f3;
	f2 = f4*f5;
}
	r9 = r10 << 2;
	r11 = r10 << 2;
	r9 = (r0 + r9)|0;
	r12 = r10 << 2;
	r11 = (r0 + r11)|0;
	r9 = r9 >> 2;
	r10 = r10 << 2;
	r12 = (r0 + r12)|0;
	r11 = r11 >> 2;
	heapFloat[(r9+11)] = f2;
	r9 = (r0 + r10)|0;
	r10 = r12 >> 2;
	heapFloat[(r11+12)] = f1;
	r8 = (r8 + 2)|0;
	r9 = r9 >> 2;
	heapFloat[(r10+13)] = f0;
	heap32[(r9+14)] = 0;
if(!(r8 !=6)) //_LBB405_3
{
break _3;
}
}
	r2 = heap32[(r1+2)];
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	r0 = (r0 + 12)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r0 = heap32[(r1+1)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}
else{
	r0 = _2E_str6187;
	r1 = _2E_str7188;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 280;
	_assert(i7);
}
}