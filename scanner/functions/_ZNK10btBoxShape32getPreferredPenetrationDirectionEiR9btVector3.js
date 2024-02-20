function _ZNK10btBoxShape32getPreferredPenetrationDirectionEiR9btVector3(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
_1: do {
	if(r0 >2) //_LBB389_4
{
	if(r0 ==3) //_LBB389_12
{
	r1 = r1 >> 2;
	heap32[(r1)] = 0;
	heap32[(r1+1)] = -1082130432;
__label__ = 9;
break _1;
}
else{
	if(r0 ==4) //_LBB389_13
{
	r1 = r1 >> 2;
	heap32[(r1)] = 0;
	heap32[(r1+1)] = 0;
	heap32[(r1+2)] = 1065353216;
	heap32[(r1+3)] = 0;
	return;
}
else{
	if(r0 ==5) //_LBB389_14
{
	r0 = r1 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	heap32[(r0+2)] = -1082130432;
	heap32[(r0+3)] = 0;
	return;
}
else{
__label__ = 15;
break _1;
}
}
}
}
else{
	if(r0 ==0) //_LBB389_7
{
	r1 = r1 >> 2;
	heap32[(r1)] = 1065353216;
}
else{
	if(r0 ==1) //_LBB389_10
{
	r1 = r1 >> 2;
	heap32[(r1)] = -1082130432;
}
else{
	if(r0 ==2) //_LBB389_11
{
	r1 = r1 >> 2;
	heap32[(r1)] = 0;
	heap32[(r1+1)] = 1065353216;
__label__ = 9;
break _1;
}
else{
__label__ = 15;
break _1;
}
}
}
	heap32[(r1+1)] = 0;
__label__ = 9;
}
} while(0);
switch(__label__ ){//multiple entries
case 9:
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 0;
	return;
break;
case 15:
	r0 = _2E_str10;
	r1 = _2E_str2175;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 309;
	_assert(i7);
break;
}
}