function _GLOBAL__I__ZN7btClockC2Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = _ZL13gProfileClock_2E_0;
	heap32[(g0)] = 8;
	r0 = r0 >> 2;
	_Znwj(i7);
	heap32[(r0)] = r_g0;
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = 0;
	r0 = _ZN15CProfileManager4RootE;
	r1 = r0 >> 2;
	r2 = _2E_str729;
	gettimeofday(i7);
	heap32[(r1)] = r2;
	heap32[(r1+1)] = 0;
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = 0;
	heap32[(r1+4)] = 0;
	heap32[(r1+5)] = 0;
	heap32[(r1+6)] = 0;
	heap32[(r1+7)] = 0;
	heap32[(g0)] = r0;
	_ZN12CProfileNode5ResetEv(i7);
	return;
}