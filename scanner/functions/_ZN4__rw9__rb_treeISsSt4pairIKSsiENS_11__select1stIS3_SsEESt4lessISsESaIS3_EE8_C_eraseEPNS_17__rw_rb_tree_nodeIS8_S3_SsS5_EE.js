function _ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EE8_C_eraseEPNS_17__rw_rb_tree_nodeIS8_S3_SsS5_EE(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
if(!(r0 ==0)) //_LBB862_6
{
	r1 = heap32[(fp)];
_3: while(true){
	r2 = r0;
	r3 = r2 >> 2;
	r0 = heap32[(r3+3)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	_ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EE8_C_eraseEPNS_17__rw_rb_tree_nodeIS8_S3_SsS5_EE(i7);
	r4 = r1 >> 2;
	r0 = heap32[(r3+2)];
	r5 = heap32[(r4+1)];
	heap32[(r3+3)] = r5;
	r5 = heap32[(r3+4)];
	r5 = (r5 + -12)|0;
	r6 = _ZNSs11_C_null_refE;
if(!(r5 ==r6)) //_LBB862_5
{
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r7 = (r6 + -1)|0;
	heap32[(r5)] = r7;
if(!(r6 >0)) //_LBB862_5
{
	r5 = heap32[(r3+4)];
	r5 = (r5 + -12)|0;
	heap32[(g0)] = r5;
	_ZdlPv(i7);
}
}
	heap32[(r3+4)] = 0;
	heap32[(r4+1)] = r2;
	if(r0 !=0) //_LBB862_2
{
continue _3;
}
else{
break _3;
}
}
}
	return;
}