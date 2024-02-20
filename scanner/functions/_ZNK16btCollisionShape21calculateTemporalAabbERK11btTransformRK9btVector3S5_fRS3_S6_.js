function _ZNK16btCollisionShape21calculateTemporalAabbERK11btTransformRK9btVector3S5_fRS3_S6_(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+2)];
	r3 = heap32[(fp+5)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+1)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r3;
	r5 = heap32[(fp+2)];
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r3 >> 2;
	r3 = r4 >> 2;
	r4 = r5 >> 2;
	f0 = heapFloat[(r4)];
	r5 = heap32[(fp+3)];
	f1 = heapFloat[(r2)];
	f2 = heapFloat[(r2+1)];
	f3 = heapFloat[(r2+2)];
	f4 = heapFloat[(r3)];
	f5 = heapFloat[(r3+1)];
	f6 = heapFloat[(r3+2)];
	f7 = heapFloat[(r4+2)];
	f8 = heapFloat[(r4+1)];
	f9 =                         0;
	if(f0 <=f9) //_LBB434_2
{
	f4 = f0+f4;
}
else{
	f1 = f0+f1;
}
	if(f8 <=f9) //_LBB434_5
{
	f5 = f8+f5;
}
else{
	f2 = f8+f2;
}
	if(f7 <=f9) //_LBB434_8
{
	f6 = f7+f6;
}
else{
	f3 = f7+f3;
}
	r4 = r5 >> 2;
	f0 = heapFloat[(r4)];
	f7 = heapFloat[(r4+1)];
	f8 = heapFloat[(r4+2)];
	f0 = f0*f0;
	f7 = f7*f7;
	f0 = f0+f7;
	f7 = f8*f8;
	f0 = f0+f7;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f0 = f_g0;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	heapFloat[(r3)] = f4;
	heapFloat[(r3+1)] = f5;
	heapFloat[(r3+2)] = f6;
	heap32[(r3+3)] = 0;
	heapFloat[(r2)] = f1;
	heapFloat[(r2+1)] = f2;
	heapFloat[(r2+2)] = f3;
	heap32[(r2+3)] = 0;
	f0 = f0*f_g0;
	f1 = heapFloat[(r3)];
	f1 = f1-f0;
	heapFloat[(r3)] = f1;
	f1 = heapFloat[(r3+1)];
	f1 = f1-f0;
	heapFloat[(r3+1)] = f1;
	f1 = heapFloat[(r3+2)];
	f1 = f1-f0;
	heapFloat[(r3+2)] = f1;
	f1 = heapFloat[(r2)];
	f1 = f1+f0;
	heapFloat[(r2)] = f1;
	f1 = heapFloat[(r2+1)];
	f1 = f1+f0;
	heapFloat[(r2+1)] = f1;
	f1 = heapFloat[(r2+2)];
	f0 = f1+f0;
	heapFloat[(r2+2)] = f0;
	return;
}