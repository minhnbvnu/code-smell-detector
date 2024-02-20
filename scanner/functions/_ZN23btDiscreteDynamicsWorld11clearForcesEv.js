function _ZN23btDiscreteDynamicsWorld11clearForcesEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+52)];
if(!(r1 <1)) //_LBB640_3
{
	r1 = 0;
_3: while(true){
	r2 = heap32[(r0+54)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r1 = (r1 + 1)|0;
	heap32[(r2+101)] = 0;
	heap32[(r2+102)] = 0;
	heap32[(r2+103)] = 0;
	heap32[(r2+104)] = 0;
	heap32[(r2+105)] = 0;
	heap32[(r2+106)] = 0;
	heap32[(r2+107)] = 0;
	heap32[(r2+108)] = 0;
	r2 = heap32[(r0+52)];
	if(r2 >r1) //_LBB640_2
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