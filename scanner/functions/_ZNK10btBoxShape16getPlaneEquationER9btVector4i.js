function _ZNK10btBoxShape16getPlaneEquationER9btVector4i(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+1)];
	f0 = heapFloat[(r0+8)];
_1: do {
	if(r1 >2) //_LBB387_4
{
	if(r1 ==3) //_LBB387_13
{
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
	heap32[(r2+1)] = -1082130432;
__label__ = 11;
break _1;
}
else{
	f0 = heapFloat[(r0+9)];
	if(r1 ==4) //_LBB387_14
{
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
	heap32[(r2+1)] = 0;
	f0 = -f0;
	heap32[(r2+2)] = 1065353216;
	heapFloat[(r2+3)] = f0;
	return;
}
else{
	if(r1 ==5) //_LBB387_15
{
	r0 = r2 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	f0 = -f0;
	heap32[(r0+2)] = -1082130432;
	heapFloat[(r0+3)] = f0;
	return;
}
else{
__label__ = 16;
break _1;
}
}
}
}
else{
	f1 = heapFloat[(r0+7)];
	if(r1 ==0) //_LBB387_7
{
	r2 = r2 >> 2;
	heap32[(r2)] = 1065353216;
}
else{
	if(r1 ==1) //_LBB387_9
{
	r2 = r2 >> 2;
	heap32[(r2)] = -1082130432;
}
else{
	if(r1 ==2) //_LBB387_10
{
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
	heap32[(r2+1)] = 1065353216;
__label__ = 11;
break _1;
}
else{
__label__ = 16;
break _1;
}
}
}
	heap32[(r2+1)] = 0;
	f0 = -f1;
__label__ = 12;
}
} while(0);
switch(__label__ ){//multiple entries
case 11:
	f0 = -f0;
break;
case 16:
	r0 = _2E_str10;
	r1 = _2E_str2175;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 182;
	_assert(i7);
break;
}
	heap32[(r2+2)] = 0;
	heapFloat[(r2+3)] = f0;
	return;
}