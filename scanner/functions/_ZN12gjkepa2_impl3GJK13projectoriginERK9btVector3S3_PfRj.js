function _ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_PfRj(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	f0 = heapFloat[(r1+1)];
	f1 = heapFloat[(r0+1)];
	f2 = heapFloat[(r1)];
	f3 = heapFloat[(r0)];
	f1 = f1-f0;
	f3 = f3-f2;
	f4 = heapFloat[(r1+2)];
	f5 = heapFloat[(r0+2)];
	f5 = f5-f4;
	f6 = f3*f3;
	f7 = f1*f1;
	f6 = f6+f7;
	f7 = f5*f5;
	f6 = f6+f7;
	f7 =                         0;
	if(f6 <=f7) //_LBB541_7
{
	f0 =                        -1;
	f_g0 = f0;
	return;
}
else{
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	f2 = f2*f3;
	f0 = f0*f1;
	f0 = f2+f0;
	f2 = f4*f5;
	f0 = f0+f2;
	f0 = -f0;
	f0 = f0/f6;
	f2 =                         1;
	if(f0 <f2) //_LBB541_4
{
	if(f0 >f7) //_LBB541_6
{
	r0 = r2 >> 2;
	f2 = f2-f0;
	heapFloat[(r0+1)] = f0;
	r2 = r3 >> 2;
	heapFloat[(r0)] = f2;
	heap32[(r2)] = 3;
	f2 = heapFloat[(r1)];
	f3 = f3*f0;
	f4 = heapFloat[(r1+1)];
	f1 = f1*f0;
	f2 = f2+f3;
	f1 = f4+f1;
	f3 = heapFloat[(r1+2)];
	f0 = f5*f0;
	f0 = f3+f0;
	f2 = f2*f2;
	f1 = f1*f1;
	f1 = f2+f1;
	f0 = f0*f0;
	f0 = f1+f0;
	f_g0 = f0;
	return;
}
else{
	r2 = r2 >> 2;
	heap32[(r2)] = 1065353216;
	r3 = r3 >> 2;
	heap32[(r2+1)] = 0;
	heap32[(r3)] = 1;
	f0 = heapFloat[(r1)];
	f1 = heapFloat[(r1+1)];
	f2 = heapFloat[(r1+2)];
}
}
else{
	r1 = r2 >> 2;
	heap32[(r1)] = 0;
	r2 = r3 >> 2;
	heap32[(r1+1)] = 1065353216;
	heap32[(r2)] = 2;
	f0 = heapFloat[(r0)];
	f1 = heapFloat[(r0+1)];
	f2 = heapFloat[(r0+2)];
}
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	f_g0 = f0;
	return;
}
}