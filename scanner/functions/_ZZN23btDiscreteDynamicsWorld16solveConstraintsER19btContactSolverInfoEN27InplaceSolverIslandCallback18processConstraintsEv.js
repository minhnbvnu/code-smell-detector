function _ZZN23btDiscreteDynamicsWorld16solveConstraintsER19btContactSolverInfoEN27InplaceSolverIslandCallback18processConstraintsEv(sp)
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
	var r11;
	var r12;
	var r13;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+14)];
	r3 = heap32[(r1+19)];
	r4 = (r3 + r2)|0;
if(!(r4 <1)) //_LBB651_2
{
	r4 = heap32[(r1+2)];
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+3)];
	r6 = heap32[(r1+7)];
	r7 = heap32[(r1+6)];
	r8 = heap32[(r1+5)];
	r9 = heap32[(r1+1)];
	r10 = heap32[(r1+21)];
	r11 = heap32[(r1+16)];
	r12 = heap32[(r1+9)];
	r13 = heap32[(r1+11)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r13;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r11;
	heap32[(g0+4)] = r2;
	heap32[(g0+5)] = r10;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r9;
	heap32[(g0+8)] = r8;
	heap32[(g0+9)] = r7;
	heap32[(g0+10)] = r6;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r2 = heap32[(r1+9)];
if(!(r2 >-1)) //_LBB651_10
{
	r3 = heap32[(r1+10)];
if(!(r3 >-1)) //_LBB651_9
{
	r3 = heap32[(r1+11)];
if(!(r3 ==0)) //_LBB651_8
{
	r4 = heapU8[r0+48];
if(!(r4 ==0)) //_LBB651_7
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+11)] = 0;
}
	r3 = 1;
	heap8[r0+48] = r3;
	heap32[(r1+11)] = 0;
	heap32[(r1+10)] = 0;
}
_14: while(true){
	r3 = r2 << 2;
	r4 = heap32[(r1+11)];
	r3 = (r4 + r3)|0;
	r2 = (r2 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = 0;
	if(r2 !=0) //_LBB651_9
{
continue _14;
}
else{
break _14;
}
}
}
	heap32[(r1+9)] = 0;
	r2 = heap32[(r1+14)];
_17: do {
if(!(r2 >-1)) //_LBB651_18
{
	r3 = heap32[(r1+15)];
if(!(r3 >-1)) //_LBB651_17
{
	r3 = heap32[(r1+16)];
if(!(r3 ==0)) //_LBB651_16
{
	r4 = heapU8[r0+68];
if(!(r4 ==0)) //_LBB651_15
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+16)] = 0;
}
	r3 = 1;
	heap8[r0+68] = r3;
	heap32[(r1+16)] = 0;
	heap32[(r1+15)] = 0;
}
_27: while(true){
	r3 = r2 << 2;
	r4 = heap32[(r1+16)];
	r3 = (r4 + r3)|0;
	r2 = (r2 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = 0;
	if(r2 !=0) //_LBB651_17
{
continue _27;
}
else{
break _17;
}
}
}
} while(0);
	heap32[(r1+14)] = 0;
	r2 = heap32[(r1+19)];
_30: do {
if(!(r2 >-1)) //_LBB651_26
{
	r3 = heap32[(r1+20)];
if(!(r3 >-1)) //_LBB651_25
{
	r3 = heap32[(r1+21)];
if(!(r3 ==0)) //_LBB651_24
{
	r4 = heapU8[r0+88];
if(!(r4 ==0)) //_LBB651_23
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+21)] = 0;
}
	r3 = 1;
	heap8[r0+88] = r3;
	heap32[(r1+21)] = 0;
	heap32[(r1+20)] = 0;
}
_40: while(true){
	r0 = r2 << 2;
	r3 = heap32[(r1+21)];
	r0 = (r3 + r0)|0;
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	if(r2 !=0) //_LBB651_25
{
continue _40;
}
else{
break _30;
}
}
}
} while(0);
	heap32[(r1+19)] = 0;
	return;
}