function _GLOBAL__D__ZN4__rw9__catfindEPNS_8__rw_catE(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = _ZN4__rwL12__rw_catlistE_2E_0;
	r1 = _ZN4__rwL12__rw_catlistE_2E_1;
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r0 = heap32[(r0)];
	r2 = heap32[(r1)];
	r3 = (r2 - r0)|0;
	r3 = r3 >> 2;
if(!(r3 ==0)) //_LBB696_2
{
	r3 = r3 << 2;
	r2 = (r2 - r3)|0;
	heap32[(r1)] = r2;
}
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}