function _ZN7RagDollD0Ev(sp)
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
	r0 = heap32[(fp)];
	r1 = _ZTV7RagDoll;
	r2 = 0;
	r3 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r3)] = r1;
	r1 = r2;
_1: while(true){
	r4 = heap32[(r3+1)];
	r5 = r1 << 2;
	r6 = r4 >> 2;
	r5 = (r0 - r5)|0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r6+14)];
	r7 = heap32[(r5+24)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r4 = heap32[(r5+24)];
if(!(r4 ==0)) //_LBB16_3
{
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+1)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r4 = (r2 - r1)|0;
	r4 = r4 << 2;
	r4 = (r0 + r4)|0;
	r1 = (r1 + -1)|0;
	r4 = r4 >> 2;
	heap32[(r4+24)] = 0;
	if(r1 !=-10) //_LBB16_1
{
continue _1;
}
else{
break _1;
}
}
	r1 = 2;
_7: while(true){
	r2 = heap32[(r3+1)];
	r4 = r2 >> 2;
	r5 = r1 << 2;
	r4 = heap32[(r4)];
	r5 = (r0 + r5)|0;
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r4 = heap32[(r4+21)];
	r6 = heap32[(r5+11)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r2 = heap32[(r5+11)];
	r4 = r2 >> 2;
	r4 = heap32[(r4+118)];
	if(r4 !=0) //_LBB16_7
{
	r2 = r4 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = heap32[(r5+11)];
}
if(!(r2 ==0)) //_LBB16_10
{
	r4 = r2 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+2)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
	heap32[(r5+11)] = 0;
	r2 = heap32[(r5)];
if(!(r2 ==0)) //_LBB16_12
{
	r4 = r2 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+1)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
}
	r1 = (r1 + 1)|0;
	heap32[(r5)] = 0;
	if(r1 !=13) //_LBB16_5
{
continue _7;
}
else{
break _7;
}
}
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}