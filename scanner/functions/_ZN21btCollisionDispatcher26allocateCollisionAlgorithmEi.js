function _ZN21btCollisionDispatcher26allocateCollisionAlgorithmEi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+48)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
	r2 = heap32[(fp+1)];
	if(r1 ==0) //_LBB183_7
{
	r0 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	heap32[(r0)] = r1;
	r0 = (r2 + 19)|0;
	heap32[(g0)] = r0;
	malloc(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB183_9
{
	r1 = 0;
	r2 = (r0 + 4)|0;
	r1 = (r1 - r2)|0;
	r1 = r1 & 15;
	r1 = (r0 + r1)|0;
	r2 = r1 >> 2;
	heap32[(r2)] = r0;
	r0 = (r1 + 4)|0;
}
	r_g0 = r0;
	return;
}
else{
if(!(r2 ==0)) //_LBB183_4
{
	r3 = heap32[(r0)];
if(!(r3 >=r2)) //_LBB183_4
{
	r0 = _2E_str270;
	r1 = _2E_str169;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 69;
	_assert(i7);
}
}
	if(r1 >0) //_LBB183_6
{
	r2 = heap32[(r0+3)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r1 = (r1 + -1)|0;
	heap32[(r0+3)] = r3;
	heap32[(r0+2)] = r1;
	r_g0 = r2;
	return;
}
else{
	r0 = _2E_str371;
	r1 = _2E_str169;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 70;
	_assert(i7);
}
}
}