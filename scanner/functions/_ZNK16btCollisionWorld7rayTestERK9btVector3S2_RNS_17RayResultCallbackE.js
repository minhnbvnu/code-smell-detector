function _ZNK16btCollisionWorld7rayTestERK9btVector3S2_RNS_17RayResultCallbackE(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + -280;var g0 = i7>>2; // save stack
	r0 = _ZTV19btSingleRayCallback;
	r1 = heap32[(fp+1)];
	r0 = (r0 + 8)|0;
	r2 = sp + -256;
	r3 = r1 >> 2;
	heap32[(fp+-64)] = r0;
	r0 = r2 >> 2;
	f0 = heapFloat[(r3)];
	heapFloat[(r0+9)] = f0;
	f1 = heapFloat[(r3+1)];
	heapFloat[(r0+10)] = f1;
	f2 = heapFloat[(r3+2)];
	heapFloat[(r0+11)] = f2;
	r4 = heap32[(fp+2)];
	f3 = heapFloat[(r3+3)];
	r3 = r4 >> 2;
	heapFloat[(r0+12)] = f3;
	f4 = heapFloat[(r3)];
	heapFloat[(r0+13)] = f4;
	f5 = heapFloat[(r3+1)];
	heapFloat[(r0+14)] = f5;
	f6 = heapFloat[(r3+2)];
	heapFloat[(r0+15)] = f6;
	f7 = heapFloat[(r3+3)];
	r3 = heap32[(fp)];
	heapFloat[(r0+16)] = f7;
	r5 = heap32[(fp+3)];
	heap32[(r0+53)] = r3;
	heap32[(r0+54)] = r5;
	heap32[(r0+17)] = 1065353216;
	heap32[(r0+18)] = 0;
	heap32[(r0+19)] = 0;
	heap32[(r0+20)] = 0;
	heap32[(r0+21)] = 0;
	heap32[(r0+22)] = 1065353216;
	heap32[(r0+23)] = 0;
	heap32[(r0+24)] = 0;
	heap32[(r0+25)] = 0;
	heap32[(r0+26)] = 0;
	heap32[(r0+27)] = 1065353216;
	heap32[(r0+28)] = 0;
	heapFloat[(r0+29)] = f0;
	heapFloat[(r0+30)] = f1;
	heapFloat[(r0+31)] = f2;
	heapFloat[(r0+32)] = f3;
	heap32[(r0+33)] = 1065353216;
	heap32[(r0+34)] = 0;
	heap32[(r0+35)] = 0;
	heap32[(r0+36)] = 0;
	heap32[(r0+37)] = 0;
	heap32[(r0+38)] = 1065353216;
	heap32[(r0+39)] = 0;
	heap32[(r0+40)] = 0;
	heap32[(r0+41)] = 0;
	heap32[(r0+42)] = 0;
	heap32[(r0+43)] = 1065353216;
	heap32[(r0+44)] = 0;
	heapFloat[(r0+45)] = f4;
	f0 = f4-f0;
	heapFloat[(r0+46)] = f5;
	f1 = f5-f1;
	heapFloat[(r0+47)] = f6;
	f2 = f6-f2;
	f3 = f0*f0;
	f4 = f1*f1;
	heapFloat[(r0+48)] = f7;
	f3 = f3+f4;
	f4 = f2*f2;
	f3 = f3+f4;
	heapFloat[(g0)] = f3;
	f3 =                         1;
	sqrtf(i7);
	f4 = f3/f_g0;
	f0 = f0*f4;
	f1 = f1*f4;
	f2 = f2*f4;
	f4 =                         0;
	if(f0 !=f4) //_LBB223_2
{
	f5 = f3/f0;
}
else{
	f5 =        999999984306749440;
}
	heapFloat[(r0+1)] = f5;
	if(f1 !=f4) //_LBB223_5
{
	f6 = f3/f1;
}
else{
	f6 =        999999984306749440;
}
	heapFloat[(r0+2)] = f6;
	if(f2 !=f4) //_LBB223_8
{
	f3 = f3/f2;
}
else{
	f3 =        999999984306749440;
}
	r5 = f5 < f4;
	r6 = f6 < f4;
	r5 = r5 & 1;
	heapFloat[(r0+3)] = f3;
	r7 = f3 < f4;
	r6 = r6 & 1;
	heap32[(r0+5)] = r5;
	r5 = r7 & 1;
	heap32[(r0+6)] = r6;
	heap32[(r0+7)] = r5;
	f3 = heapFloat[(r0+14)];
	f4 = heapFloat[(r0+10)];
	f5 = heapFloat[(r0+13)];
	f6 = heapFloat[(r0+9)];
	f5 = f5-f6;
	f3 = f3-f4;
	f4 = heapFloat[(r0+15)];
	f6 = heapFloat[(r0+11)];
	f0 = f0*f5;
	f1 = f1*f3;
	f3 = f4-f6;
	f0 = f0+f1;
	f1 = f2*f3;
	f0 = f0+f1;
	r3 = r3 >> 2;
	heapFloat[(r0+8)] = f0;
	r0 = heap32[(r3+20)];
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+6)];
	r5 = sp + -32;
	r6 = r5 >> 2;
	heap32[(fp+-8)] = 0;
	heap32[(r6+1)] = 0;
	heap32[(r6+2)] = 0;
	r7 = sp + -16;
	heap32[(r6+3)] = 0;
	r6 = r7 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r6+1)] = 0;
	heap32[(r6+2)] = 0;
	heap32[(r6+3)] = 0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	return;
}