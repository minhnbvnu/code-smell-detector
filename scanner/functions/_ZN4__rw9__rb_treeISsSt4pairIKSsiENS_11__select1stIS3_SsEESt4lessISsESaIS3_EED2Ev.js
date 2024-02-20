function _ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EED2Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+4)];
if(!(r2 ==0)) //_LBB866_3
{
	r3 = r2 >> 2;
	r3 = heap32[(r3+2)];
	heap32[(fp+-2)] = r3;
	r3 = sp + -16;
	r4 = sp + -8;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	_ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EE5eraseENS_14__rw_tree_iterIS3_iPS3_RS3_NS_17__rw_rb_tree_nodeIS8_S3_SsS5_EEEESF_(i7);
	r0 = heap32[(r1+4)];
	r2 = heap32[(r1+1)];
	r3 = r0 >> 2;
	heap32[(r3+3)] = r2;
	heap32[(r1+1)] = r0;
	r0 = heap32[(r1)];
if(!(r0 ==0)) //_LBB866_3
{
__label__ = 2; //SET chanka
_3: while(true){
	r2 = r0 >> 2;
	r3 = heap32[(r2)];
	heap32[(r1)] = r3;
	r2 = heap32[(r2+2)];
	heap32[(g0)] = r2;
	_ZdlPv(i7);
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	r0 = heap32[(r1)];
	if(r0 !=0) //_LBB866_2
{
continue _3;
}
else{
break _3;
}
}
}
}
	return;
}