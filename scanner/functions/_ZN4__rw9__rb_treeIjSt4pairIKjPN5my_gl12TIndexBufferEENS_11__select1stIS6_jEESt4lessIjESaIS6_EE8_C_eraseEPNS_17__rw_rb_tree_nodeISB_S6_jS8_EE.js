function _ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE8_C_eraseEPNS_17__rw_rb_tree_nodeISB_S6_jS8_EE(sp)
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
	r0 = heap32[(fp)];
if(!(r0 ==0)) //_LBB861_2
{
_2: while(true){
	r1 = r0 >> 2;
	r2 = heap32[(r1+3)];
	heap32[(g0)] = r2;
	r2 = _ZN5my_glL9m_contextE;
	_ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE8_C_eraseEPNS_17__rw_rb_tree_nodeISB_S6_jS8_EE(i7);
	r2 = r2 >> 2;
	r3 = heap32[(r1+2)];
	r4 = heap32[(r2+75)];
	heap32[(r1+3)] = r4;
	heap32[(r2+75)] = r0;
	r0 = r3;
	if(r3 !=0) //_LBB861_1
{
continue _2;
}
else{
break _2;
}
}
}
	return;
}