function _ZN22btVoronoiSimplexSolver19pointOutsideOfPlaneERK9btVector3S2_S2_S2_S2_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
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
	i7 = sp + 0;var g0 = i7>>2; // save stack
	f0 = heapFloat[(fp+5)];
	f1 = heapFloat[(fp+8)];
	f2 = heapFloat[(fp+11)];
	f3 = heapFloat[(fp+4)];
	f4 = heapFloat[(fp+10)];
	f5 = heapFloat[(fp+7)];
	f6 = heapFloat[(fp+3)];
	f7 = heapFloat[(fp+6)];
	f8 = heapFloat[(fp+9)];
	f1 = f1-f0;
	f4 = f4-f3;
	f7 = f7-f6;
	f2 = f2-f0;
	f5 = f5-f3;
	f8 = f8-f6;
	f9 = heapFloat[(fp+12)];
	f10 = heapFloat[(fp+13)];
	f11 = f5*f2;
	f12 = f1*f4;
	f1 = f1*f8;
	f2 = f7*f2;
	f11 = f11-f12;
	f9 = f9-f6;
	f1 = f1-f2;
	f2 = f10-f3;
	f10 = heapFloat[(fp+14)];
	f4 = f7*f4;
	f5 = f5*f8;
	f4 = f4-f5;
	f5 = f10-f0;
	f7 = f9*f11;
	f2 = f2*f1;
	f2 = f7+f2;
	f5 = f5*f4;
	f2 = f2+f5;
	f5 = f2*f2;
	f7 =   9.9999990510468706e-009;
	if(f5 <f7) //_LBB569_2
{
	r0 = -1;
	r_g0 = r0;
	return;
}
else{
	f5 = heapFloat[(fp)];
	f7 = heapFloat[(fp+1)];
	f8 = heapFloat[(fp+2)];
	f5 = f5-f6;
	f3 = f7-f3;
	f5 = f5*f11;
	f1 = f3*f1;
	f0 = f8-f0;
	f1 = f5+f1;
	f0 = f0*f4;
	f0 = f1+f0;
	f0 = f0*f2;
	f1 =                         0;
	r0 = f0 < f1;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
}