function _GLOBAL__D__ZN5my_gl14glAttachShaderEjj(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _ZN5my_glL9m_contextE;
	r0 = r0 >> 2;
	r1 = heap32[(r0+78)];
_1: do {
if(!(r1 ==0)) //_LBB858_26
{
	r2 = r1 >> 2;
	r3 = heap32[(r0+79)];
	if(r3 !=0) //_LBB858_5
{
	r1 = heap32[(r2+1)];
	heap32[(g0)] = r1;
	_ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE8_C_eraseEPNS_17__rw_rb_tree_nodeISB_S6_jS8_EE(i7);
	r1 = heap32[(r0+78)];
	r2 = r1 >> 2;
	heap32[(r2+1)] = 0;
	heap32[(r2+3)] = r1;
	heap32[(r2+2)] = r1;
	heap32[(r0+79)] = 0;
}
else{
	r2 = heap32[(r2+2)];
if(!(r2 ==r1)) //_LBB858_4
{
_6: while(true){
	r3 = r2;
	r4 = r3 >> 2;
	r2 = heap32[(r4+3)];
_8: do {
	if(r2 !=0) //_LBB858_10
{
	r4 = r2 >> 2;
	r4 = heap32[(r4+2)];
	if(r4 ==0) //_LBB858_12
{
break _8;
}
else{
__label__ = 8; //SET chanka
_10: while(true){
	r2 = r4;
	r4 = r2 >> 2;
	r4 = heap32[(r4+2)];
	if(r4 !=0) //_LBB858_13
{
continue _10;
}
else{
break _8;
}
}
}
}
else{
	r4 = heap32[(r4+1)];
	r2 = r4 >> 2;
	r2 = heap32[(r2+3)];
	if(r3 ==r2) //_LBB858_9
{
_14: while(true){
	r2 = r4;
	r5 = r2 >> 2;
	r4 = heap32[(r5+1)];
	r6 = r4 >> 2;
	r6 = heap32[(r6+3)];
if(!(r2 ==r6)) //_LBB858_15
{
break _14;
}
}
	r5 = heap32[(r5+3)];
}
else{
	r5 = 0;
	r2 = r3;
}
	if(r5 !=r4) //_LBB858_19
{
	r2 = r4;
}
}
} while(0);
	r4 = sp + -8;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	_ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE5eraseENS_14__rw_tree_iterIS6_iPS6_RS6_NS_17__rw_rb_tree_nodeISB_S6_jS8_EEEE(i7);
if(!(r2 !=r1)) //_LBB858_6
{
break _6;
}
}
	r1 = heap32[(r0+78)];
}
}
	r2 = r1 >> 2;
	r3 = heap32[(r0+75)];
	heap32[(r2+3)] = r3;
	heap32[(r0+75)] = r1;
	r1 = heap32[(r0+74)];
if(!(r1 ==0)) //_LBB858_26
{
__label__ = 16; //SET chanka
_23: while(true){
	r2 = r1 >> 2;
	r3 = heap32[(r2)];
	heap32[(r0+74)] = r3;
	r2 = heap32[(r2+2)];
	heap32[(g0)] = r2;
	_ZdlPv(i7);
	heap32[(g0)] = r1;
	_ZdlPv(i7);
	r1 = heap32[(r0+74)];
	if(r1 !=0) //_LBB858_23
{
continue _23;
}
else{
break _1;
}
}
}
}
} while(0);
	r1 = heap32[(r0+65)];
	r2 = heap32[(r0+66)];
	r3 = (r2 - r1)|0;
	r3 = r3 >> 5;
	if(r3 !=0) //_LBB858_28
{
	r1 = (r2 + -32)|0;
	heap32[(r0+66)] = r1;
	r1 = (r2 + -28)|0;
	heap32[(g0)] = r1;
	_ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EED2Ev(i7);
_31: do {
if(!(r3 ==1)) //_LBB858_33
{
	r1 = (r3 + -1)|0;
_33: while(true){
	r2 = heap32[(r0+66)];
	r3 = (r2 + -32)|0;
	heap32[(r0+66)] = r3;
	r2 = (r2 + -28)|0;
	heap32[(g0)] = r2;
	_ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EED2Ev(i7);
	r1 = (r1 + -1)|0;
if(!(r1 !=0)) //_LBB858_31
{
break _31;
}
}
}
} while(0);
	r1 = heap32[(r0+65)];
}
	heap32[(g0)] = r1;
	_ZdlPv(i7);
	r1 = heap32[(r0+63)];
	r2 = heap32[(r0+62)];
	r3 = (r1 - r2)|0;
	r4 = (r3 + 11)|0;
if(!(uint(r4) <uint(23))) //_LBB858_37
{
	r3 = (r3 / -12)|0;
	r3 = (r3 * 12)|0;
	r1 = (r1 + r3)|0;
	heap32[(r0+63)] = r1;
}
	heap32[(g0)] = r2;
	_ZdlPv(i7);
	return;
}