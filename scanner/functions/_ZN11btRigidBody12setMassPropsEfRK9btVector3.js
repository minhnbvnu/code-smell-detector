function _ZN11btRigidBody12setMassPropsEfRK9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	f0 = heapFloat[(fp+1)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(r0+51)];
	f1 =                         0;
	if(f0 !=f1) //_LBB676_2
{
	r2 = r2 & -2;
	f2 =                         1;
	f2 = f2/f0;
	heap32[(r0+51)] = r2;
	heapFloat[(r0+84)] = f2;
}
else{
	r2 = r2 | 1;
	f2 =                         0;
	heap32[(r0+51)] = r2;
	heap32[(r0+84)] = 0;
}
	f3 = heapFloat[(r0+95)];
	f4 = heapFloat[(r0+94)];
	f5 = heapFloat[(r0+93)];
	f5 = f5*f0;
	f4 = f4*f0;
	heapFloat[(r0+89)] = f5;
	f0 = f3*f0;
	heapFloat[(r0+90)] = f4;
	heapFloat[(r0+91)] = f0;
	r1 = r1 >> 2;
	heap32[(r0+92)] = 0;
	f0 = heapFloat[(r1+2)];
	if(f0 !=f1) //_LBB676_5
{
	f3 =                         1;
	f0 = f3/f0;
}
else{
	f0 = f1;
}
	f3 = heapFloat[(r1+1)];
	if(f3 !=f1) //_LBB676_8
{
	f1 =                         1;
	f3 = f1/f3;
}
else{
	f3 =                         0;
}
	f1 = heapFloat[(r1)];
	f4 =                         0;
	if(f1 !=f4) //_LBB676_11
{
	f4 =                         1;
	f4 = f4/f1;
}
	heapFloat[(r0+97)] = f4;
	heapFloat[(r0+98)] = f3;
	heapFloat[(r0+99)] = f0;
	heap32[(r0+100)] = 0;
	f0 = heapFloat[(r0+87)];
	f1 = heapFloat[(r0+86)];
	f3 = heapFloat[(r0+85)];
	f3 = f3*f2;
	f1 = f1*f2;
	heapFloat[(r0+138)] = f3;
	f0 = f0*f2;
	heapFloat[(r0+139)] = f1;
	heapFloat[(r0+140)] = f0;
	heap32[(r0+141)] = 0;
	return;
}