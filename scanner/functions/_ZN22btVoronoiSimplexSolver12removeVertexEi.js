function _ZN22btVoronoiSimplexSolver12removeVertexEi(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	if(r2 >0) //_LBB567_2
{
	r3 = heap32[(fp+1)];
	r2 = (r2 + -1)|0;
	r3 = r3 << 4;
	r4 = (r0 + 4)|0;
	r5 = r2 << 4;
	r6 = (r4 + r3)|0;
	r4 = (r4 + r5)|0;
	r5 = r6 >> 2;
	r4 = r4 >> 2;
	heap32[(r1)] = r2;
	heap32[(r5)] = heap32[(r4)];
	heap32[(r5+1)] = heap32[(r4+1)];
	heap32[(r5+2)] = heap32[(r4+2)];
	heap32[(r5+3)] = heap32[(r4+3)];
	r2 = heap32[(r1)];
	r4 = (r0 + 84)|0;
	r2 = r2 << 4;
	r5 = (r4 + r3)|0;
	r2 = (r4 + r2)|0;
	r4 = r5 >> 2;
	r2 = r2 >> 2;
	heap32[(r4)] = heap32[(r2)];
	heap32[(r4+1)] = heap32[(r2+1)];
	heap32[(r4+2)] = heap32[(r2+2)];
	heap32[(r4+3)] = heap32[(r2+3)];
	r1 = heap32[(r1)];
	r0 = (r0 + 164)|0;
	r1 = r1 << 4;
	r2 = (r0 + r3)|0;
	r0 = (r0 + r1)|0;
	r1 = r2 >> 2;
	r0 = r0 >> 2;
	heap32[(r1)] = heap32[(r0)];
	heap32[(r1+1)] = heap32[(r0+1)];
	heap32[(r1+2)] = heap32[(r0+2)];
	heap32[(r1+3)] = heap32[(r0+3)];
	return;
}
else{
	r0 = _2E_str457;
	r1 = _2E_str1458;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 38;
	_assert(i7);
}
}