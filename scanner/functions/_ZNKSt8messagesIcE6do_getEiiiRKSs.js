function _ZNKSt8messagesIcE6do_getEiiiRKSs(sp)
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
	r0 = heap32[(fp+2)];
	heap32[(fp+-1)] = r0;
if(!(r0 <0)) //_LBB714_8
{
	r0 = sp + -4;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	_ZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataE(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB714_8
{
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
if(!(r0 ==-1)) //_LBB714_8
{
	r1 = _ZN4__rwL12__rw_catlistE_2E_1;
	r2 = _ZN4__rwL12__rw_catlistE_2E_0;
	r1 = r1 >> 2;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r1 = heap32[(r1)];
	r1 = (r1 - r2)|0;
	r1 = r1 >> 2;
	r3 = 0;
_5: while(true){
	if(uint(r1) <=uint(r3)) //_LBB714_8
{
break _5;
}
else{
	r4 = r3 << 2;
	r4 = (r2 + r4)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r4 ==0) //_LBB714_8
{
break _5;
}
else{
	if(r4 !=r0) //_LBB714_4
{
	r3 = (r3 + 1)|0;
continue _5;
}
else{
break _5;
}
}
}
}
}
}
}
	r0 = heap32[(fp)];
	r1 = heap32[(fp+5)];
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+-3)];
	if(r4 ==-1) //_LBB714_11
{
	r2 = heap32[(r3+-1)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r2;
	_ZNSs10_C_get_repEjj(i7);
	r0 = r0 >> 2;
	r3 = (r_g0 + 12)|0;
	heap32[(r0)] = r3;
	r0 = heap32[(r1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	memcpy(i7);
}
else{
	r1 = (r2 + -12)|0;
	r0 = r0 >> 2;
	r3 = _ZNSs11_C_null_refE;
	heap32[(r0)] = r2;
if(!(r1 ==r3)) //_LBB714_12
{
	r0 = r1 >> 2;
	r1 = (r4 + 1)|0;
	heap32[(r0)] = r1;
	return;
}
}
	return;
}