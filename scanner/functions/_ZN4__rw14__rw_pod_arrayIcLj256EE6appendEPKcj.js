function _ZN4__rw14__rw_pod_arrayIcLj256EE6appendEPKcj(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+2)];
	r3 = heap32[(r1)];
	r4 = (r3 + r2)|0;
	r5 = heap32[(fp+1)];
	if(uint(r4) >uint(255)) //_LBB718_2
{
	r3 = (r4 + 1)|0;
	heap32[(g0)] = r3;
	_Znaj(i7);
	r7 = r_g0;
	r3 = heap32[(r1)];
	r6 = heap32[(r1+1)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r3;
	memcpy(i7);
	r3 = heap32[(r1+1)];
	r6 = (r0 + 8)|0;
if(!(r3 ==r6)) //_LBB718_5
{
if(!(r3 ==0)) //_LBB718_5
{
	heap32[(g0)] = r3;
	_ZdaPv(i7);
}
}
	r6 = (r0 + 4)|0;
	heap32[(r1+1)] = r7;
	r3 = heap32[(r1)];
}
else{
	r6 = (r0 + 4)|0;
	r7 = heap32[(r1+1)];
}
	r3 = (r7 + r3)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r2;
	memcpy(i7);
	r2 = r6 >> 2;
	heap32[(r1)] = r4;
	r1 = heap32[(r2)];
	r2 = 0;
	heap8[r1+r4] = r2;
	r_g0 = r0;
	return;
}