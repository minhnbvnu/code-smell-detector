function _ZNK14btQuantizedBvh17quantizeWithClampEPtRK9btVector3i(sp)
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
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+60];
	if(r1 !=0) //_LBB151_2
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r2 = r2 >> 2;
	f0 = heapFloat[(r2)];
	r4 = sp + -16;
	heapFloat[(fp+-4)] = f0;
	f1 = heapFloat[(r2+1)];
	r5 = r4 >> 2;
	heapFloat[(r5+1)] = f1;
	f2 = heapFloat[(r2+2)];
	heapFloat[(r5+2)] = f2;
	f3 = heapFloat[(r2+3)];
	r2 = r0 >> 2;
	heapFloat[(r5+3)] = f3;
	f4 = heapFloat[(r2+1)];
	if(f0 <f4) //_LBB151_4
{
	heapFloat[(fp+-4)] = f4;
	f0 = f4;
}
	f4 = heapFloat[(r2+2)];
	if(f1 <f4) //_LBB151_7
{
	heapFloat[(r5+1)] = f4;
	f1 = f4;
}
	f4 = heapFloat[(r2+3)];
	if(f2 <f4) //_LBB151_10
{
	heapFloat[(r5+2)] = f4;
	f2 = f4;
}
	f4 = heapFloat[(r2+4)];
	if(f3 <f4) //_LBB151_13
{
	heapFloat[(r5+3)] = f4;
	f3 = f4;
}
	f4 = heapFloat[(r2+5)];
if(!(f4 >=f0)) //_LBB151_16
{
	heapFloat[(fp+-4)] = f4;
}
	f0 = heapFloat[(r2+6)];
if(!(f0 >=f1)) //_LBB151_18
{
	heapFloat[(r5+1)] = f0;
}
	f0 = heapFloat[(r2+7)];
if(!(f0 >=f2)) //_LBB151_20
{
	heapFloat[(r5+2)] = f0;
}
	f0 = heapFloat[(r2+8)];
if(!(f0 >=f3)) //_LBB151_22
{
	heapFloat[(r5+3)] = f0;
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r3;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	return;
}
else{
	r0 = _2E_str212;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 420;
	_assert(i7);
}
}