function _ZN15CProfileManager5ResetEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = _ZL13gProfileClock_2E_0;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	gettimeofday(i7);
	r1 = _ZN15CProfileManager4RootE;
	heap32[(g0)] = r1;
	r1 = r1 >> 2;
	_ZN12CProfileNode5ResetEv(i7);
	r2 = heap32[(r1+1)];
	r2 = (r2 + 1)|0;
	heap32[(r1+1)] = r2;
	r2 = heap32[(r1+4)];
	r3 = (r2 + 1)|0;
	heap32[(r1+4)] = r3;
if(!(r2 !=0)) //_LBB694_2
{
	r2 = sp + -16;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	gettimeofday(i7);
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r2 = r2 >> 2;
	r3 = heap32[(fp+-4)];
	r4 = heap32[(r0)];
	r3 = (r3 - r4)|0;
	r2 = heap32[(r2+1)];
	r0 = heap32[(r0+1)];
	r0 = (r2 - r0)|0;
	r2 = (r3 * 1000000)|0;
	r0 = (r0 + r2)|0;
	heap32[(r1+3)] = r0;
}
	r0 = _ZN15CProfileManager12FrameCounterE;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	r0 = sp + -8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	gettimeofday(i7);
	return;
}