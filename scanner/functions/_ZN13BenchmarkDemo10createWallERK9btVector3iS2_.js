function _ZN13BenchmarkDemo10createWallERK9btVector3iS2_(sp)
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
	var f8;
	var f9;
var __label__ = 0;
	i7 = sp + -96;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	f0 = heapFloat[(r0+2)];
	f1 = heapFloat[(r0+1)];
	f2 = heapFloat[(r0)];
	r2 = (r2 + 1)|0;
	heap32[(r1)] = r2;
	heap32[(g0)] = 71;
	malloc(i7);
	r1 = r_g0;
	r2 = heap32[(fp)];
	if(r1 !=0) //_LBB22_2
{
	r3 = 0;
	r4 = (r1 + 4)|0;
	r3 = (r3 - r4)|0;
	r3 = r3 & 15;
	r3 = (r1 + r3)|0;
	r4 = (r3 + 4)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = r1;
	r1 = r4;
}
	r3 = r1 >> 2;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = 1065353216;
	heap32[(r3+4)] = 1065353216;
	heap32[(r3+5)] = 1065353216;
	r4 = _ZTV10btBoxShape;
	heap32[(r3+6)] = 0;
	r4 = (r4 + 8)|0;
	heap32[(r3+11)] = 1025758986;
	heap32[(r3)] = r4;
	f3 =     -0.039999999105930328;
	f2 = f2+f3;
	heap32[(r3+1)] = 0;
	f1 = f1+f3;
	heapFloat[(r3+7)] = f2;
	f0 = f0+f3;
	heapFloat[(r3+8)] = f1;
	heapFloat[(r3+9)] = f0;
	r4 = sp + -16;
	heap32[(r3+10)] = 0;
	r3 = r4 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r3+1)] = 0;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = 0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 1065353216;
	heap32[(g0+2)] = r4;
	_ZNK10btBoxShape21calculateLocalInertiaEfR9btVector3(i7);
	f4 = heapFloat[(r0+1)];
	f0 = heapFloat[(r0+2)];
	r0 = sp + -80;
	r3 = r0 >> 2;
	heap32[(fp+-20)] = 1065353216;
	heap32[(r3+1)] = 0;
	heap32[(r3+2)] = 0;
	heap32[(r3+3)] = 0;
	heap32[(r3+4)] = 0;
	heap32[(r3+5)] = 1065353216;
	heap32[(r3+6)] = 0;
	heap32[(r3+7)] = 0;
	heap32[(r3+8)] = 0;
	heap32[(r3+9)] = 0;
	heap32[(r3+10)] = 1065353216;
	heap32[(r3+11)] = 0;
	f1 = f0+f0;
	f2 =                       -12;
	heap32[(r3+12)] = 0;
	heap32[(r3+13)] = 0;
	f2 = f1*f2;
	f3 =                       0.5;
	f3 = f2*f3;
	f2 = f4+f4;
	r5 = 12;
	heap32[(r3+14)] = 0;
	heap32[(r3+15)] = 0;
_4: while(true){
if(!(r5 <1)) //_LBB22_4
{
	r4 = 0;
_8: while(true){
	r6 = r2 >> 2;
	f5 = r4; //fitos r4, f5
	f6 =                         0;
	f7 = heapFloat[(r6)];
	f8 = heapFloat[(r6+2)];
	f9 = heapFloat[(r6+1)];
	f5 = f5*f1;
	f6 = f7+f6;
	f5 = f5+f3;
	f7 = f9+f4;
	heapFloat[(r3+12)] = f6;
	f5 = f8+f5;
	heapFloat[(r3+13)] = f7;
	r6 = _ZL14benchmarkDemo4;
	heapFloat[(r3+14)] = f5;
	r7 = r6 >> 2;
	heap32[(r3+15)] = 0;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+2)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = 1065353216;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r1;
	r4 = (r4 + 1)|0;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	if(r5 !=r4) //_LBB22_3
{
continue _8;
}
else{
break _8;
}
}
}
	r5 = (r5 + -1)|0;
	f4 = f4+f2;
	f3 = f3+f0;
	if(r5 ==0) //_LBB22_8
{
break _4;
}
else{
continue _4;
}
}
	return;
}