function _GLOBAL__I__ZN5my_gl14glAttachShaderEjj(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = _ZN5my_glL9m_contextE;
	r1 = r0 >> 2;
	heap32[(r1+62)] = 0;
	heap32[(r1+63)] = 0;
	heap32[(r1+64)] = 0;
	heap32[(r1+65)] = 0;
	heap32[(r1+66)] = 0;
	heap32[(r1+67)] = 0;
	heap32[(r1+78)] = 0;
	heap32[(r1+79)] = 0;
	heap32[(r1+74)] = 0;
	heap32[(r1+77)] = 0;
	heap32[(r1+76)] = 0;
	heap32[(r1+75)] = 0;
	_ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE11_C_get_linkEv(i7);
	r2 = r_g0;
	r3 = r2 >> 2;
	heap32[(r1+78)] = r2;
	heap32[(r3+1)] = 0;
	heap32[(r3+3)] = r2;
	heap32[(r3+2)] = r2;
	heap32[(r1)] = 0;
	heap32[(r1+3)] = 0;
	heap32[(r1+61)] = 0;
	heap32[(r1+4)] = 0;
	heap32[(r1+68)] = 0;
	heap32[(r1+69)] = 0;
	r2 = _ZL26s_mandreel_internal_height;
	r3 = _ZL25s_mandreel_internal_width;
	heap32[(r1+1)] = 0;
	r2 = r2 >> 2;
	heap32[(r1+2)] = 1;
	r3 = r3 >> 2;
	r2 = heap32[(r2)];
	r3 = heap32[(r3)];
	heap32[(r1+70)] = 0;
	heap32[(r1+71)] = 0;
	r4 = 224;
	heap32[(r1+72)] = r3;
	heap32[(r1+73)] = r2;
	r2 = 0;
_2: while(true){
	r1 = (r4 + -1)|0;
	r4 = (r0 - r4)|0;
	heap8[r4+244] = r2;
	r4 = r1;
	if(r1 !=0) //_LBB857_2
{
continue _2;
}
else{
break _2;
}
}
	return;
}