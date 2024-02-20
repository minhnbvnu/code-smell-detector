function _ZN28btCompoundCollisionAlgorithm22getAllContactManifoldsER20btAlignedObjectArrayIP20btPersistentManifoldE(sp)
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
	r0 = r0 >> 2;
	r1 = heap32[(r0+3)];
if(!(r1 <1)) //_LBB252_5
{
	r1 = heap32[(fp+1)];
	r2 = 0;
_3: while(true){
	r3 = heap32[(r0+5)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
if(!(r3 ==0)) //_LBB252_4
{
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r0+3)];
	if(r3 >r2) //_LBB252_2
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