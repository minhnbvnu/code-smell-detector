function _ZNK21btConeTwistConstraint16GetPointForAngleEff(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	f0 = heapFloat[(fp+2)];
	heapFloat[(g0)] = f0;
	cosf(i7);
	f1 = f_g0;
	r0 = heap32[(fp+1)];
	heapFloat[(g0)] = f0;
	sinf(i7);
	f0 = f_g0;
	r0 = r0 >> 2;
	r1 = heap32[(fp)];
	f2 = heapFloat[(fp+3)];
	f3 = f1; //fstod f1, f3
	f3 = Math.abs(f3);
	f4 =   1.1920928955078125e-007;
	if(f3 >f4) //_LBB586_2
{
	f3 = heapFloat[(r0+109)];
	f4 = heapFloat[(r0+108)];
	f5 = f0*f0;
	f6 = f1*f1;
	f5 = f5/f6;
	f4 = f4*f4;
	f6 =                         1;
	f3 = f3*f3;
	f4 = f5/f4;
	f3 = f6/f3;
	f5 = f5+f6;
	f3 = f4+f3;
	f3 = f5/f3;
	heapFloat[(g0)] = f3;
	sqrtf(i7);
	f3 = f_g0;
}
else{
	f3 = heapFloat[(r0+108)];
}
	f4 =                         0;
	f5 = f1*f1;
	f5 = f5+f4;
	f6 = f0*f0;
	f5 = f5+f6;
	heapFloat[(g0)] = f5;
	sqrtf(i7);
	f5 = f_g0;
	if(f5 !=f4) //_LBB586_5
{
	f6 =                       0.5;
	f3 = f3*f6;
	heapFloat[(g0)] = f3;
	sinf(i7);
	f5 = f_g0/f5;
	f6 = f5*f4;
	heapFloat[(g0)] = f3;
	f0 = -f0;
	f1 = f1*f5;
	cosf(i7);
	f7 = -f6;
	f0 = f5*f0;
	f5 = f_g0*f2;
	f8 = f1*f4;
	f7 = f2*f7;
	f5 = f5+f8;
	f9 = f0*f4;
	f7 = f7-f8;
	f8 = f0*f2;
	f10 = f_g0*f4;
	f5 = f5-f9;
	f7 = f7-f9;
	f4 = f6*f4;
	f8 = f10+f8;
	f8 = f8-f4;
	f9 = f5*f_g0;
	f11 = f7*f6;
	f4 = f10+f4;
	f2 = f1*f2;
	f2 = f4-f2;
	f4 = f8*f_g0;
	f10 = f7*f1;
	f9 = f9-f11;
	f11 = f8*f0;
	f3 = f2*f_g0;
	f7 = f7*f0;
	f4 = f4-f10;
	f10 = f2*f6;
	f9 = f9-f11;
	f2 = f2*f1;
	r0 = r1 >> 2;
	f2 = f9+f2;
	f3 = f3-f7;
	f1 = f5*f1;
	f4 = f4-f10;
	f0 = f5*f0;
	f1 = f3-f1;
	f3 = f8*f6;
	f0 = f4+f0;
	heapFloat[(r0)] = f2;
	f1 = f1+f3;
	heapFloat[(r0+1)] = f0;
	heapFloat[(r0+2)] = f1;
	heap32[(r0+3)] = 0;
	return;
}
else{
	r1 = _2E_str115;
	r0 = _2E_str685;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 61;
	_assert(i7);
}
}