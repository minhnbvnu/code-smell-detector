function _ZNSs10_C_get_repEjj(sp)
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
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
_1: do {
	if(uint(r0) <uint(-13)) //_LBB719_4
{
	if(uint(r0) <uint(r1)) //_LBB719_6
{
	r2 = _2E_str4362;
	r3 = _2E_str3361;
	heap32[(g0)] = 8;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r0;
	_ZN4__rw10__rw_throwEiz(i7);
__label__ = 6;
break _1;
}
else{
__label__ = 6;
break _1;
}
}
else{
	if(uint(r1) >uint(-14)) //_LBB719_3
{
	r0 = _2E_str2360;
	r2 = _2E_str3361;
	heap32[(g0)] = 8;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = -14;
	_ZN4__rw10__rw_throwEiz(i7);
	r0 = r1;
__label__ = 8;
}
else{
	r0 = r1;
__label__ = 6;
}
}
} while(0);
if (__label__ == 6){
	if(r0 ==0) //_LBB719_9
{
	r0 = _ZNSs11_C_null_refE;
	r_g0 = r0;
	return;
}
}
	r2 = (r0 + 14)|0;
	heap32[(g0)] = r2;
	_Znwj(i7);
	r2 = r_g0;
if(!(r2 !=0)) //_LBB719_12
{
	heap32[(g0)] = 3;
	_ZN4__rw10__rw_throwEiz(i7);
}
	r3 = r2 >> 2;
	heap32[(r3)] = 0;
	heap32[(r3+1)] = r0;
	r0 = (r1 + r2)|0;
	r4 = 0;
	heap32[(r3+2)] = r1;
	heap8[r0+12] = r4;
	r_g0 = r2;
	return;
}