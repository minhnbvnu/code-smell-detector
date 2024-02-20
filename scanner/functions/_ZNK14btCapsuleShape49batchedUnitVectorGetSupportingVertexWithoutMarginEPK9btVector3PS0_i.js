function _ZNK14btCapsuleShape49batchedUnitVectorGetSupportingVertexWithoutMarginEPK9btVector3PS0_i(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
if(!(r0 <1)) //_LBB420_9
{
	r1 = heap32[(fp)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+13)];
	r4 = (r3 + 2)|0;
	r4 = (r4 % 3)|0;
	r4 = r4 << 2;
	r4 = (r1 + r4)|0;
	r4 = r4 >> 2;
	r5 = heap32[(fp+1)];
	r6 = heap32[(fp+2)];
	f0 = heapFloat[(r4+7)];
	r0 = (r0 + -1)|0;
	r4 = (r5 + 8)|0;
	r5 = (r6 + 8)|0;
_3: while(true){
	r6 = sp + -16;
	heap32[(fp+-4)] = 0;
	r7 = r6 >> 2;
	r3 = r3 << 2;
	heap32[(r7+1)] = 0;
	r6 = (r6 + r3)|0;
	r3 = (r1 + r3)|0;
	heap32[(r7+2)] = 0;
	r6 = r6 >> 2;
	r3 = r3 >> 2;
	heap32[(r7+3)] = 0;
	heap32[(r6)] = heap32[(r3+7)];
	r3 = heap32[(r2)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+11)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = r4 >> 2;
	f2 = heapFloat[(r3+-1)];
	f3 = heapFloat[(r2+4)];
	f4 = heapFloat[(r3+-2)];
	f5 = heapFloat[(r2+3)];
	f6 = heapFloat[(r3)];
	f7 = heapFloat[(r2+5)];
	f3 = f2*f3;
	f5 = f4*f5;
	f7 = f6*f7;
	f8 = heapFloat[(r7+1)];
	f3 = f3*f0;
	f9 = heapFloat[(fp+-4)];
	f5 = f5*f0;
	f10 = heapFloat[(r7+2)];
	f7 = f7*f0;
	f3 = f8+f3;
	f8 = f2*f_g0;
	f5 = f9+f5;
	f9 = f4*f_g0;
	f3 = f3-f8;
	f5 = f5-f9;
	f7 = f10+f7;
	f1 = f6*f_g0;
	f1 = f7-f1;
	f4 = f4*f5;
	f2 = f2*f3;
	f2 = f4+f2;
	f4 = f6*f1;
	f2 = f2+f4;
	f4 =       -999999984306749440;
	if(f2 >f4) //_LBB420_4
{
	r6 = r5 >> 2;
	heapFloat[(r6+-2)] = f5;
	heapFloat[(r6+-1)] = f3;
	heapFloat[(r6)] = f1;
	heap32[(r6+1)] = 0;
	f4 = f2;
}
	r6 = sp + -32;
	heap32[(fp+-8)] = 0;
	r7 = r6 >> 2;
	heap32[(r7+1)] = 0;
	heap32[(r7+2)] = 0;
	heap32[(r7+3)] = 0;
	r8 = heap32[(r2+13)];
	r8 = r8 << 2;
	r9 = (r1 + r8)|0;
	r9 = r9 >> 2;
	f1 = heapFloat[(r9+7)];
	r6 = (r6 + r8)|0;
	r6 = r6 >> 2;
	f1 = -f1;
	heapFloat[(r6)] = f1;
	r6 = heap32[(r2)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+11)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	f2 = heapFloat[(r3+-1)];
	f3 = heapFloat[(r2+4)];
	f5 = heapFloat[(r3+-2)];
	f6 = heapFloat[(r2+3)];
	f7 = heapFloat[(r3)];
	f8 = heapFloat[(r2+5)];
	f3 = f2*f3;
	f6 = f5*f6;
	f8 = f7*f8;
	f9 = heapFloat[(r7+1)];
	f3 = f3*f0;
	f10 = heapFloat[(fp+-8)];
	f6 = f6*f0;
	f11 = heapFloat[(r7+2)];
	f8 = f8*f0;
	f3 = f9+f3;
	f9 = f2*f_g0;
	f6 = f10+f6;
	f10 = f5*f_g0;
	f3 = f3-f9;
	f6 = f6-f10;
	f8 = f11+f8;
	f1 = f7*f_g0;
	f1 = f8-f1;
	f5 = f5*f6;
	f2 = f2*f3;
	f2 = f5+f2;
	f5 = f7*f1;
	f2 = f2+f5;
if(!(f2 <=f4)) //_LBB420_7
{
	r3 = r5 >> 2;
	heapFloat[(r3+-2)] = f6;
	heapFloat[(r3+-1)] = f3;
	heapFloat[(r3)] = f1;
	heap32[(r3+1)] = 0;
}
	if(r0 ==0) //_LBB420_9
{
break _3;
}
else{
	r3 = heap32[(r2+13)];
	r0 = (r0 + -1)|0;
	r4 = (r4 + 16)|0;
	r5 = (r5 + 16)|0;
continue _3;
}
}
}
	return;
}