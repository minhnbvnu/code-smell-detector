function _ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE11_C_get_linkEv(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = _ZN5my_glL9m_contextE;
	r0 = r0 >> 2;
	r1 = heap32[(r0+75)];
	if(r1 ==0) //_LBB865_2
{
	r1 = heap32[(r0+76)];
	r2 = heap32[(r0+77)];
	if(r1 !=r2) //_LBB865_11
{
	r2 = (r1 + 24)|0;
	heap32[(r0+76)] = r2;
}
else{
	r1 = heap32[(r0+74)];
	if(r1 !=0) //_LBB865_5
{
	r1 = r1 >> 2;
	r1 = heap32[(r1+1)];
}
else{
	r1 = 0;
}
	heap32[(g0)] = 12;
	_Znwj(i7);
	r2 = r_g0;
if(!(r2 !=0)) //_LBB865_8
{
	heap32[(g0)] = 3;
	_ZN4__rw10__rw_throwEiz(i7);
}
	r3 = r1 & 1023;
	r3 = (r3 * 1656)|0;
	r4 = r1 >>> 10;
	r3 = r3 >>> 10;
	r4 = (r4 * 1656)|0;
	r5 = (r1 + 32)|0;
	r3 = (r3 + r4)|0;
	r3 = uint(r5) > uint(r3) ? r5 : r3;
	r4 = (r1 + 1)|0;
	r3 = uint(r3) > uint(r1) ? r3 : r4;
	r4 = (r3 * 24)|0;
	heap32[(g0)] = r4;
	_Znwj(i7);
	r1 = r_g0;
if(!(r1 !=0)) //_LBB865_10
{
	heap32[(g0)] = 3;
	_ZN4__rw10__rw_throwEiz(i7);
}
	r5 = r2 >> 2;
	heap32[(r5+2)] = r1;
	r6 = heap32[(r0+74)];
	heap32[(r5)] = r6;
	heap32[(r5+1)] = r3;
	r3 = (r1 + r4)|0;
	heap32[(r0+74)] = r2;
	r2 = (r1 + 24)|0;
	heap32[(r0+77)] = r3;
	heap32[(r0+76)] = r2;
}
}
else{
	r2 = r1 >> 2;
	r2 = heap32[(r2+3)];
	heap32[(r0+75)] = r2;
}
	r0 = r1 >> 2;
	heap32[(r0+1)] = 0;
	heap32[(r0+2)] = 0;
	heap32[(r0+3)] = 0;
	heap32[(r0)] = 0;
	r_g0 = r1;
	return;
}