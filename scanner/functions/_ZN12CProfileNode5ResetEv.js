function _ZN12CProfileNode5ResetEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
_1: while(true){
	r0 = r0 >> 2;
	heap32[(r0+1)] = 0;
	heap32[(r0+2)] = 0;
	r1 = heap32[(r0+6)];
if(!(r1 ==0)) //_LBB691_3
{
	heap32[(g0)] = r1;
	_ZN12CProfileNode5ResetEv(i7);
}
	r0 = heap32[(r0+7)];
	if(r0 !=0) //_LBB691_1
{
continue _1;
}
else{
break _1;
}
}
	return;
}