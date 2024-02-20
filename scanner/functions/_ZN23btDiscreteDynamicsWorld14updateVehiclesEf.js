function _ZN23btDiscreteDynamicsWorld14updateVehiclesEf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = _2E_str289;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	r0 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+63)];
if(!(r2 <1)) //_LBB617_3
{
	f0 = heapFloat[(fp+1)];
	r2 = 0;
_3: while(true){
	r3 = heap32[(r0+65)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r1;
	heapFloat[(g0+2)] = f0;
	r2 = (r2 + 1)|0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = heap32[(r0+63)];
	if(r3 >r2) //_LBB617_2
{
continue _3;
}
else{
break _3;
}
}
}
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_6: do {
if(!(r3 !=0)) //_LBB617_9
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB617_6
{
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r1 = (r1 + r3)|0;
	r3 = heap32[(r2+3)];
	r1 = (r1 - r3)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r2+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r2+2)] = f0;
	r1 = heap32[(r2+4)];
	if(r1 !=0) //_LBB617_9
{
break _6;
}
else{
	r1 = heap32[(r0)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r0)] = r1;
}
} while(0);
	return;
}