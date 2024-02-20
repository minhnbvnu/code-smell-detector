function _ZN23btDiscreteDynamicsWorld12removeActionEP17btActionInterface(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	r2 = heap32[(r0+63)];
	r3 = 0;
_1: while(true){
	if(r2 >r3) //_LBB642_1
{
	r4 = heap32[(r0+65)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r4 !=r1) //_LBB642_3
{
	r3 = (r3 + 1)|0;
continue _1;
}
else{
__label__ = 5;
break _1;
}
}
else{
__label__ = 4;
break _1;
}
}
if (__label__ == 4){
	r3 = r2;
}
if(!(r2 <=r3)) //_LBB642_8
{
	r1 = (r2 + -1)|0;
	r2 = r3 << 2;
	r3 = heap32[(r0+65)];
	r1 = r1 << 2;
	r2 = (r3 + r2)|0;
	r3 = (r3 + r1)|0;
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r2)];
	r3 = heap32[(r3)];
	heap32[(r2)] = r3;
	r2 = heap32[(r0+65)];
	r1 = (r2 + r1)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r4;
	r1 = heap32[(r0+63)];
	r1 = (r1 + -1)|0;
	heap32[(r0+63)] = r1;
}
	return;
}