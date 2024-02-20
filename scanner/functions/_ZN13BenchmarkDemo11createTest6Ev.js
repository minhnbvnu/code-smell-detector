function _ZN13BenchmarkDemo11createTest6Ev(sp)
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
	i7 = sp + -112;var g0 = i7>>2; // save stack
	r0 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	heap32[(r0)] = r1;
	heap32[(g0)] = 127;
	malloc(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB24_2
{
	r1 = 0;
	r2 = (r0 + 4)|0;
	r1 = (r1 - r2)|0;
	r1 = r1 & 15;
	r1 = (r0 + r1)|0;
	r2 = (r1 + 4)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	r0 = r2;
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	r1 = 0;
	_ZN17btConvexHullShapeC1EPKfii(i7);
_4: while(true){
	r2 = (r1 * -3)|0;
	r3 = _ZL7TaruVtx;
	r2 = r2 << 2;
	r2 = (r3 + r2)|0;
	r3 = sp + -96;
	r2 = r2 >> 2;
	r4 = r3 >> 2;
	heap32[(fp+-24)] = heap32[(r2)];
	heap32[(r4+1)] = heap32[(r2+1)];
	heap32[(r4+2)] = heap32[(r2+2)];
	heap32[(r4+3)] = 0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	r1 = (r1 + -1)|0;
	_ZN17btConvexHullShape8addPointERK9btVector3(i7);
	if(r1 ==-43) //_LBB24_10
{
break _4;
}
else{
continue _4;
}
}
	r1 = sp + -64;
	r2 = r1 >> 2;
	heap32[(fp+-16)] = 1065353216;
	heap32[(r2+1)] = 0;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
	heap32[(r2+4)] = 0;
	heap32[(r2+5)] = 1065353216;
	heap32[(r2+6)] = 0;
	heap32[(r2+7)] = 0;
	heap32[(r2+8)] = 0;
	heap32[(r2+9)] = 0;
	heap32[(r2+10)] = 1065353216;
	heap32[(r2+11)] = 0;
	heap32[(r2+12)] = 0;
	heap32[(r2+13)] = 0;
	heap32[(r2+14)] = 0;
	r3 = sp + -80;
	heap32[(r2+15)] = 0;
	r4 = r3 >> 2;
	heap32[(fp+-20)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
	r5 = r0 >> 2;
	heap32[(r4+3)] = 0;
	r4 = heap32[(r5)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+8)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 1065353216;
	heap32[(g0+2)] = r3;
	r3 = 10;
	f0 =                        20;
	f1 =                         2;
	f2 =                       -25;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r7 = _ZL14benchmarkDemo4;
_7: while(true){
	f3 =                         3;
	f4 =                        25;
	f5 = f1+f3;
	f4 = f0+f4;
	r4 = 0;
	r5 = r4;
_9: while(true){
	f6 = r5; //fitos r5, f6
	f6 = f6*f5;
	f6 = f6+f2;
	f7 =                         5;
	f6 = f6*f7;
	f8 =                         0;
	f6 = f6+f8;
	r6 = r4;
_11: while(true){
	f9 = r6; //fitos r6, f9
	f9 = f9*f5;
	f9 = f9+f2;
	f9 = f9*f7;
	f9 = f9+f8;
	heapFloat[(r2+12)] = f9;
	heapFloat[(r2+13)] = f4;
	heapFloat[(r2+14)] = f6;
	r8 = r7 >> 2;
	heap32[(r2+15)] = 0;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = 1065353216;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r0;
	r6 = (r6 + 1)|0;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	if(r6 !=10) //_LBB24_7
{
continue _11;
}
else{
break _11;
}
}
	r5 = (r5 + 1)|0;
	if(r5 !=10) //_LBB24_6
{
continue _9;
}
else{
break _9;
}
}
	f4 =        1.1000000238418579;
	f5 =      -0.05000000074505806;
	f4 = f1*f4;
	f1 = f1*f5;
	f5 =                         9;
	f3 = f4+f3;
	f1 = f1*f5;
	r3 = (r3 + -1)|0;
	f0 = f0+f3;
	f2 = f1+f2;
	f1 = f4;
	if(r3 ==0) //_LBB24_11
{
break _7;
}
else{
continue _7;
}
}
	_ZN13BenchmarkDemo19createLargeMeshBodyEv(i7);
	return;
}