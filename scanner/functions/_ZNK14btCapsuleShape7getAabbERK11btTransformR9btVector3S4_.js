function _ZNK14btCapsuleShape7getAabbERK11btTransformR9btVector3S4_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
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
	var f12;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+13)];
	r3 = (r2 + 2)|0;
	r3 = (r3 % 3)|0;
	r4 = (r0 + 28)|0;
	r3 = r3 << 2;
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	f0 = heapFloat[(r3)];
	r3 = sp + -16;
	r5 = r3 >> 2;
	heapFloat[(fp+-4)] = f0;
	r2 = r2 << 2;
	heapFloat[(r5+1)] = f0;
	r4 = (r4 + r2)|0;
	heapFloat[(r5+2)] = f0;
	r4 = r4 >> 2;
	heap32[(r5+3)] = 0;
	r2 = (r3 + r2)|0;
	f1 = heapFloat[(r4)];
	r2 = r2 >> 2;
	f0 = f0+f1;
	heapFloat[(r2)] = f0;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f0 = f_g0;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f1 = f_g0;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	f3 = heapFloat[(fp+-4)];
	f2 = f3+f_g0;
	heapFloat[(fp+-4)] = f2;
	f3 = heapFloat[(r5+1)];
	f1 = f3+f1;
	heapFloat[(r5+1)] = f1;
	f3 = heapFloat[(r5+2)];
	r0 = heap32[(fp+1)];
	f0 = f3+f0;
	r0 = r0 >> 2;
	heapFloat[(r5+2)] = f0;
	f3 = heapFloat[(r0+10)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	f4 =                         0;
	if(f3 <f4) //_LBB418_2
{
	f3 = -f3;
}
	f5 = heapFloat[(r0+9)];
	if(f5 <f4) //_LBB418_5
{
	f5 = -f5;
}
	f6 = heapFloat[(r0+8)];
	if(f6 <f4) //_LBB418_8
{
	f6 = -f6;
}
	f7 = heapFloat[(r0+6)];
	if(f7 <f4) //_LBB418_11
{
	f7 = -f7;
}
	f8 = heapFloat[(r0+5)];
	if(f8 <f4) //_LBB418_14
{
	f8 = -f8;
}
	f9 = heapFloat[(r0+4)];
	if(f9 <f4) //_LBB418_17
{
	f9 = -f9;
}
	f10 = heapFloat[(r0+2)];
	if(f10 <f4) //_LBB418_20
{
	f10 = -f10;
}
	f11 = heapFloat[(r0+1)];
	if(f11 <f4) //_LBB418_23
{
	f11 = -f11;
}
	f12 = heapFloat[(r0)];
	if(f12 <f4) //_LBB418_26
{
	f12 = -f12;
}
	f4 = f12*f2;
	f11 = f11*f1;
	f9 = f9*f2;
	f8 = f8*f1;
	f4 = f4+f11;
	f10 = f10*f0;
	f2 = f6*f2;
	f1 = f5*f1;
	f5 = f9+f8;
	f6 = f7*f0;
	f4 = f4+f10;
	f7 = heapFloat[(r0+12)];
	f8 = heapFloat[(r0+13)];
	f9 = heapFloat[(r0+14)];
	f5 = f5+f6;
	r0 = r1 >> 2;
	f1 = f2+f1;
	f0 = f3*f0;
	f2 = f7-f4;
	f0 = f1+f0;
	f1 = f8-f5;
	heapFloat[(r0)] = f2;
	f2 = f9-f0;
	heapFloat[(r0+1)] = f1;
	heapFloat[(r0+2)] = f2;
	r1 = r2 >> 2;
	f1 = f7+f4;
	heap32[(r0+3)] = 0;
	f2 = f8+f5;
	heapFloat[(r1)] = f1;
	f0 = f9+f0;
	heapFloat[(r1+1)] = f2;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}