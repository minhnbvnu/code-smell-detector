function _ZN23btDiscreteDynamicsWorld28internalSingleStepSimulationEf(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = _2E_str1198;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	r0 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+24)];
	f0 = heapFloat[(fp+1)];
if(!(r2 ==0)) //_LBB658_2
{
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+33)];
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	heapFloat[(r0+7)] = f0;
	heap32[(r0+8)] = 0;
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	heap32[(r0+12)] = r_g0;
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+10)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+35)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	heapFloat[(r0+29)] = f0;
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+36)];
	r3 = (r1 + 104)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+34)];
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = _2E_str289;
	heap32[(g0)] = r2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+63)];
if(!(r2 <1)) //_LBB658_5
{
	r2 = 0;
_6: while(true){
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
	if(r3 >r2) //_LBB658_4
{
continue _6;
}
else{
break _6;
}
}
}
	r2 = _ZN15CProfileManager11CurrentNodeE;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+4)];
	r5 = (r5 + -1)|0;
	heap32[(r4+4)] = r5;
_9: do {
if(!(r5 !=0)) //_LBB658_11
{
	r5 = heap32[(r4+1)];
	if(r5 !=0) //_LBB658_8
{
	r3 = sp + -16;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	r5 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r3 = r3 >> 2;
	r6 = heap32[(fp+-4)];
	r7 = heap32[(r5)];
	r6 = (r6 - r7)|0;
	r3 = heap32[(r3+1)];
	r5 = heap32[(r5+1)];
	r3 = (r3 - r5)|0;
	r5 = (r6 * 1000000)|0;
	r3 = (r3 + r5)|0;
	r5 = heap32[(r4+3)];
	r3 = (r3 - r5)|0;
	f1 = uint(r3); //fuitos r3, f1
	f2 =                      1000;
	f3 = heapFloat[(r4+2)];
	f1 = f1/f2;
	f1 = f3+f1;
	heapFloat[(r4+2)] = f1;
	r3 = heap32[(r4+4)];
	if(r3 !=0) //_LBB658_11
{
break _9;
}
else{
	r3 = heap32[(r2)];
}
}
	r3 = r3 >> 2;
	r3 = heap32[(r3+5)];
	heap32[(r2)] = r3;
}
} while(0);
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f0;
	_ZN23btDiscreteDynamicsWorld21updateActivationStateEf(i7);
	r0 = heap32[(r0+23)];
if(!(r0 ==0)) //_LBB658_13
{
	heap32[(g0)] = r1;
	heapFloat[(g0+1)] = f0;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
	r0 = heap32[(r2)];
	r1 = r0 >> 2;
	r3 = heap32[(r1+4)];
	r3 = (r3 + -1)|0;
	heap32[(r1+4)] = r3;
_19: do {
if(!(r3 !=0)) //_LBB658_19
{
	r3 = heap32[(r1+1)];
	if(r3 !=0) //_LBB658_16
{
	r0 = sp + -8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r0 = r0 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r0 = heap32[(r0+1)];
	r3 = heap32[(r3+1)];
	r0 = (r0 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r0 = (r0 + r3)|0;
	r3 = heap32[(r1+3)];
	r0 = (r0 - r3)|0;
	f0 = uint(r0); //fuitos r0, f0
	f1 =                      1000;
	f2 = heapFloat[(r1+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r1+2)] = f0;
	r0 = heap32[(r1+4)];
	if(r0 !=0) //_LBB658_19
{
break _19;
}
else{
	r0 = heap32[(r2)];
}
}
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
	heap32[(r2)] = r0;
}
} while(0);
	return;
}