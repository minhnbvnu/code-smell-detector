function _ZN21btCollisionDispatcher13clearManifoldEP20btPersistentManifold(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+279)];
if(!(r1 <1)) //_LBB181_3
{
	r2 = 0;
_3: while(true){
	r2 = (r2 + 1)|0;
	if(r1 >r2) //_LBB181_2
{
continue _3;
}
else{
break _3;
}
}
}
	heap32[(r0+279)] = 0;
	return;
}