function _ZN12CProfileNodeD1Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+6)];
if(!(r1 ==0)) //_LBB692_2
{
	heap32[(g0)] = r1;
	_ZN12CProfileNodeD1Ev(i7);
	heap32[(g0)] = r1;
	_ZdlPv(i7);
}
	r0 = heap32[(r0+7)];
if(!(r0 ==0)) //_LBB692_4
{
	heap32[(g0)] = r0;
	_ZN12CProfileNodeD1Ev(i7);
	heap32[(g0)] = r0;
	_ZdlPv(i7);
}
	return;
}