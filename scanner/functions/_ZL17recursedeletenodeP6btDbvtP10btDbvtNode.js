function _ZL17recursedeletenodeP6btDbvtP10btDbvtNode(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 >> 2;
	r3 = heap32[(r2+10)];
if(!(r3 ==0)) //_LBB83_2
{
	r3 = heap32[(r2+9)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	_ZL17recursedeletenodeP6btDbvtP10btDbvtNode(i7);
	r2 = heap32[(r2+10)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	_ZL17recursedeletenodeP6btDbvtP10btDbvtNode(i7);
}
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
if(!(r2 !=r0)) //_LBB83_4
{
	heap32[(r1)] = 0;
}
	r2 = heap32[(r1+1)];
if(!(r2 ==0)) //_LBB83_6
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r2 = r2 >> 2;
	heap32[(r3)] = r4;
	r2 = heap32[(r2+-1)];
	heap32[(g0)] = r2;
	free(i7);
}
	heap32[(r1+1)] = r0;
	return;
}