function _ZZN22btBvhTriangleMeshShape17performConvexcastEP18btTriangleCallbackRK9btVector3S4_S4_S4_EN21MyNodeOverlapCallback11processNodeEii(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -120;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	r3 = heap32[(fp+1)];
	r4 = sp + -52;
	r5 = sp + -56;
	r6 = sp + -60;
	r7 = sp + -64;
	r8 = sp + -68;
	r9 = sp + -72;
	r10 = sp + -76;
	r11 = sp + -80;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r6;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r8;
	heap32[(g0+6)] = r9;
	heap32[(g0+7)] = r10;
	heap32[(g0+8)] = r11;
	heap32[(g0+9)] = r3;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = heap32[(fp+-20)];
	r2 = (r1 + -2)|0;
	if(uint(r2) <uint(2)) //_LBB402_2
{
	r2 = heap32[(fp+2)];
	r4 = heap32[(fp+-17)];
	r5 = heap32[(fp+-18)];
	r5 = (r5 * r2)|0;
	r6 = heap32[(r0+1)];
	r4 = (r4 + r5)|0;
	r5 = -6;
_3: while(true){
	r7 = 0;
	r8 = r5 << 1;
	r7 = (r7 - r8)|0;
	if(r1 !=3) //_LBB402_5
{
	r8 = (r4 - r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8+-1)];
}
else{
	r8 = (r4 - r5)|0;
	r8 = heapU16[(r8+-2)>>1];
}
	r9 = heap32[(fp+-16)];
	r10 = heap32[(fp+-13)];
	r8 = (r9 * r8)|0;
	r9 = heap32[(fp+-15)];
	if(r9 !=0) //_LBB402_8
{
	r9 = (r10 + r8)|0;
	r11 = r6 >> 2;
	f0 = llvm_readDouble((r9+16));
	f1 = llvm_readDouble((r9+8));
	f2 = llvm_readDouble((r10+r8));
	f0 = f0; //fdtos f0, f0
	f3 = heapFloat[(r11+3)];
	f1 = f1; //fdtos f1, f1
	f4 = heapFloat[(r11+2)];
	f2 = f2; //fdtos f2, f2
	f5 = heapFloat[(r11+1)];
	f0 = f0*f3;
	f1 = f1*f4;
	f2 = f2*f5;
}
else{
	r8 = (r10 + r8)|0;
	r8 = r8 >> 2;
	r10 = r6 >> 2;
	f0 = heapFloat[(r8+2)];
	f1 = heapFloat[(r10+3)];
	f2 = heapFloat[(r8+1)];
	f3 = heapFloat[(r10+2)];
	f4 = heapFloat[(r8)];
	f5 = heapFloat[(r10+1)];
	f0 = f0*f1;
	f1 = f2*f3;
	f2 = f4*f5;
}
	r8 = sp + -48;
	r9 = r7 << 2;
	r10 = r7 << 2;
	r9 = (r8 + r9)|0;
	r11 = r7 << 2;
	r10 = (r8 + r10)|0;
	r9 = r9 >> 2;
	r7 = r7 << 2;
	r11 = (r8 + r11)|0;
	r10 = r10 >> 2;
	heapFloat[(r9+-4)] = f2;
	r7 = (r8 + r7)|0;
	r9 = r11 >> 2;
	heapFloat[(r10+-3)] = f1;
	r5 = (r5 + 2)|0;
	r7 = r7 >> 2;
	heapFloat[(r9+-2)] = f0;
	heap32[(r7+-1)] = 0;
if(!(r5 !=0)) //_LBB402_3
{
break _3;
}
}
	r1 = heap32[(r0+2)];
	r4 = r1 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r0 = heap32[(r0+1)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}
else{
	r0 = _2E_str6187;
	r1 = _2E_str7188;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 199;
	_assert(i7);
}
}