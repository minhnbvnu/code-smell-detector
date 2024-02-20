function _ZN10btBoxShape15setLocalScalingERK9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
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
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+11)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	f2 = f_g0;
	r0 = heap32[(fp+1)];
	f3 = heapFloat[(r1+9)];
	f4 = heapFloat[(r1+8)];
	f5 = heapFloat[(r1+7)];
	r0 = r0 >> 2;
	f3 = f3+f0;
	f6 = heapFloat[(r1+5)];
	f4 = f4+f1;
	f7 = heapFloat[(r1+4)];
	f5 = f5+f2;
	f8 = heapFloat[(r1+3)];
	f9 = heapFloat[(r0+2)];
	f3 = f3/f6;
	f4 = f4/f7;
	f5 = f5/f8;
	f6 =                         0;
	if(f9 <f6) //_LBB390_2
{
	f9 = -f9;
}
	f7 = heapFloat[(r0+1)];
	if(f7 <f6) //_LBB390_5
{
	f7 = -f7;
}
	f8 = heapFloat[(r0)];
	if(f8 <f6) //_LBB390_8
{
	f8 = -f8;
}
	heapFloat[(r1+3)] = f8;
	heapFloat[(r1+4)] = f7;
	heapFloat[(r1+5)] = f9;
	f5 = f5*f8;
	f4 = f4*f7;
	f2 = f5-f2;
	heap32[(r1+6)] = 0;
	f3 = f3*f9;
	f1 = f4-f1;
	heapFloat[(r1+7)] = f2;
	f0 = f3-f0;
	heapFloat[(r1+8)] = f1;
	heapFloat[(r1+9)] = f0;
	heap32[(r1+10)] = 0;
	return;
}