function _ZN21btCollisionDispatcher15releaseManifoldEP20btPersistentManifold(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = gNumManifold;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp)];
	r1 = (r1 + -1)|0;
	r3 = r2 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r3)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
	r1 = heap32[(fp+1)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	r0 = r1 >> 2;
	r2 = heap32[(r3+3)];
	r4 = heap32[(r0+284)];
	if(r2 >r4) //_LBB177_2
{
	r2 = (r2 + -1)|0;
	r5 = r4 << 2;
	r6 = heap32[(r3+5)];
	r2 = r2 << 2;
	r7 = (r6 + r5)|0;
	r6 = (r6 + r2)|0;
	r7 = r7 >> 2;
	r6 = r6 >> 2;
	r8 = heap32[(r7)];
	r6 = heap32[(r6)];
	heap32[(r7)] = r6;
	r6 = heap32[(r3+5)];
	r2 = (r6 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r8;
	r2 = heap32[(r3+5)];
	r2 = (r2 + r5)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	heap32[(r2+284)] = r4;
	r2 = heap32[(r3+3)];
	r2 = (r2 + -1)|0;
	heap32[(r3+3)] = r2;
if(!(r1 ==0)) //_LBB177_7
{
	r2 = heap32[(r3+49)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+4)];
if(!(uint(r3) >uint(r1))) //_LBB177_6
{
	r4 = heap32[(r2)];
	r5 = heap32[(r2+1)];
	r4 = (r4 * r5)|0;
	r3 = (r3 + r4)|0;
if(!(uint(r3) <=uint(r1))) //_LBB177_6
{
	r3 = heap32[(r2+3)];
	heap32[(r0)] = r3;
	heap32[(r2+3)] = r1;
	r0 = heap32[(r2+2)];
	r0 = (r0 + 1)|0;
	heap32[(r2+2)] = r0;
	return;
}
}
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	return;
}
else{
	r0 = _2E_str472;
	r1 = _2E_str573;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 120;
	_assert(i7);
}
}