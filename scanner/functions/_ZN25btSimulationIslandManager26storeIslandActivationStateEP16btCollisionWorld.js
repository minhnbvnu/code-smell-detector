function _ZN25btSimulationIslandManager26storeIslandActivationStateEP16btCollisionWorld(sp)
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
	var r8;
	var r9;
	var r10;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
if(!(r1 <1)) //_LBB353_10
{
	r1 = heap32[(fp)];
	r2 = 0;
	r3 = r2;
_3: while(true){
	r4 = heap32[(r0+4)];
	r5 = r2 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r5 = (r2 + 1)|0;
	r6 = heapU8[r4+204];
	r6 = r6 & 3;
	if(r6 !=0) //_LBB353_8
{
	r2 = r4 >> 2;
	heap32[(r2+52)] = -1;
	heap32[(r2+53)] = -2;
}
else{
	r6 = r1 >> 2;
	r7 = heap32[(r6+4)];
	r8 = r3 << 3;
	r9 = (r7 + r8)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	if(r9 ==r3) //_LBB353_5
{
	r10 = r3;
}
else{
	r10 = r3;
_11: while(true){
	r9 = r9 << 3;
	r10 = r10 << 3;
	r9 = (r7 + r9)|0;
	r7 = (r7 + r10)|0;
	r9 = r9 >> 2;
	r7 = r7 >> 2;
	r10 = heap32[(r9)];
	heap32[(r7)] = r10;
	r10 = heap32[(r9)];
	r7 = heap32[(r6+4)];
	r9 = r10 << 3;
	r9 = (r7 + r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
if(!(r9 !=r10)) //_LBB353_6
{
break _11;
}
}
}
	r4 = r4 >> 2;
	heap32[(r4+52)] = r10;
	r6 = heap32[(r6+4)];
	r6 = (r6 + r8)|0;
	r6 = r6 >> 2;
	r3 = (r3 + 1)|0;
	heap32[(r6+1)] = r2;
	heap32[(r4+53)] = -1;
}
	r4 = heap32[(r0+2)];
	r2 = r5;
	if(r4 >r5) //_LBB353_2
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