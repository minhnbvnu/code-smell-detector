function _ZN13BenchmarkDemo11exitPhysicsEv(sp)
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
	r1 = heap32[(r0+9)];
if(!(r1 <1)) //_LBB15_5
{
	r1 = 0;
_3: while(true){
	r2 = heap32[(r0+11)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
if(!(r2 ==0)) //_LBB15_4
{
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+1)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	r1 = (r1 + 1)|0;
	r2 = heap32[(r0+9)];
	if(r2 >r1) //_LBB15_2
{
continue _3;
}
else{
break _3;
}
}
}
	r1 = heap32[(r0+1)];
	r2 = r1 >> 2;
	r2 = heap32[(r2+2)];
	r3 = (r2 + -1)|0;
_9: do {
if(!(r3 <0)) //_LBB15_16
{
	r3 = 1;
	r2 = (r3 - r2)|0;
_11: while(true){
	r3 = r1 >> 2;
	r3 = heap32[(r3+4)];
	r4 = r2 << 2;
	r3 = (r3 - r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = heapU8[r3+232];
	r4 = r4 & 2;
if(!(r4 ==0)) //_LBB15_9
{
	if(r3 !=0) //_LBB15_10
{
	r4 = r3 >> 2;
	r4 = heap32[(r4+118)];
if(!(r4 ==0)) //_LBB15_9
{
	r1 = r4 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+1)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r1 = heap32[(r0+1)];
}
}
}
	r4 = r1 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+9)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	if(r3 !=0) //_LBB15_15
{
	r1 = r3 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+2)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	if(r2 ==0) //_LBB15_16
{
break _9;
}
else{
	r2 = (r2 + 1)|0;
	r1 = heap32[(r0+1)];
continue _11;
}
}
}
} while(0);
	r1 = heap32[(r0+4)];
_23: do {
if(!(r1 <1)) //_LBB15_21
{
	r1 = 0;
_25: while(true){
	r2 = heap32[(r0+6)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
if(!(r2 ==0)) //_LBB15_20
{
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+1)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	r1 = (r1 + 1)|0;
	r2 = heap32[(r0+4)];
	if(r2 >r1) //_LBB15_18
{
continue _25;
}
else{
break _23;
}
}
}
} while(0);
	r1 = heap32[(r0+1)];
if(!(r1 ==0)) //_LBB15_23
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r1 = heap32[(r0+15)];
if(!(r1 ==0)) //_LBB15_25
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r1 = heap32[(r0+13)];
if(!(r1 ==0)) //_LBB15_27
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r1 = heap32[(r0+14)];
if(!(r1 ==0)) //_LBB15_29
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r0 = heap32[(r0+16)];
if(!(r0 ==0)) //_LBB15_31
{
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	return;
}