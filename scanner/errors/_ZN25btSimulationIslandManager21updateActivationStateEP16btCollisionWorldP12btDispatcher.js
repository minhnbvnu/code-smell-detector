function _ZN25btSimulationIslandManager21updateActivationStateEP16btCollisionWorldP12btDispatcher(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r0 = r0 >> 2;
	r2 = heap32[(r0+2)];
_1: do {
	if(r2 >0) //_LBB355_2
{
	r3 = 0;
	r2 = r3;
_3: while(true){
	r4 = heap32[(r0+4)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r3 = (r3 + 1)|0;
	r5 = heapU8[r4+204];
	r5 = r5 & 3;
	if(r5 ==0) //_LBB355_5
{
	r5 = (r2 + 1)|0;
	r6 = r4 >> 2;
	heap32[(r6+52)] = r2;
	r2 = r5;
}
	r4 = r4 >> 2;
	heap32[(r4+53)] = -1;
	heap32[(r4+60)] = 1065353216;
	r4 = heap32[(r0+2)];
	if(r4 >r3) //_LBB355_3
{
continue _3;
}
else{
break _1;
}
}
}
else{
	r2 = 0;
}
} while(0);
	r3 = r1 >> 2;
	r4 = heap32[(r3+2)];
_10: do {
if(!(r4 >r2)) //_LBB355_26
{
if(!(r4 >=r2)) //_LBB355_26
{
	r5 = heap32[(r3+3)];
if(!(r5 >=r2)) //_LBB355_25
{
	if(r2 !=0) //_LBB355_12
{
	r5 = gNumAlignedAllocs;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r7 = r2 << 3;
	r6 = (r6 + 1)|0;
	r7 = r7 | 3;
	heap32[(r5)] = r6;
	r5 = (r7 + 16)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB355_14
{
	r6 = 0;
	r7 = (r5 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r5 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r5;
	r5 = r7;
}
}
else{
	r5 = 0;
}
	r6 = (r1 + 16)|0;
	if(r4 <1) //_LBB355_17
{
	r7 = r6 >> 2;
	r8 = heap32[(r7)];
}
else{
	r7 = 0;
_23: while(true){
	r8 = r6 >> 2;
	r8 = heap32[(r8)];
	r9 = r7 << 3;
	r10 = (r8 + r9)|0;
	r10 = r10 >> 2;
	r9 = (r5 + r9)|0;
	r11 = heap32[(r10+1)];
	r10 = heap32[(r10)];
	r9 = r9 >> 2;
	r7 = (r7 + 1)|0;
	heap32[(r9)] = r10;
	heap32[(r9+1)] = r11;
if(!(r4 !=r7)) //_LBB355_18
{
break _23;
}
}
	r6 = (r1 + 16)|0;
}
if(!(r8 ==0)) //_LBB355_24
{
	r7 = heapU8[r1+20];
if(!(r7 ==0)) //_LBB355_23
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r9 = heap32[(r7)];
	r9 = (r9 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r7)] = r9;
	r7 = heap32[(r8+-1)];
	heap32[(g0)] = r7;
	free(i7);
}
	r7 = r6 >> 2;
	heap32[(r7)] = 0;
}
	r7 = 1;
	r6 = r6 >> 2;
	heap8[r1+20] = r7;
	heap32[(r6)] = r5;
	heap32[(r3+3)] = r2;
	if(r4 >=r2) //_LBB355_26
{
break _10;
}
}
_33: while(true){
	r1 = r4 << 3;
	r5 = heap32[(r3+4)];
	r1 = (r5 + r1)|0;
	r1 = r1 >> 2;
	r4 = (r4 + 1)|0;
	heap32[(r1)] = 0;
	heap32[(r1+1)] = 0;
	if(r2 !=r4) //_LBB355_25
{
continue _33;
}
else{
break _10;
}
}
}
}
} while(0);
	heap32[(r3+2)] = r2;
_36: do {
if(!(r2 <1)) //_LBB355_29
{
	r1 = 0;
_38: while(true){
	r4 = r1 << 3;
	r5 = heap32[(r3+4)];
	r5 = (r5 + r4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r1;
	r5 = heap32[(r3+4)];
	r4 = (r5 + r4)|0;
	r1 = (r1 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r4+1)] = 1;
	if(r2 !=r1) //_LBB355_28
{
continue _38;
}
else{
break _36;
}
}
}
} while(0);
	r0 = heap32[(r0+20)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+9)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = r_g0;
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+9)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r_g0;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = r_g0;
_41: do {
if(!(r2 <1)) //_LBB355_46
{
	r0 = (r0 + 4)|0;
_43: while(true){
	r1 = r0 >> 2;
	r4 = heap32[(r1+-1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
if(!(r4 ==0)) //_LBB355_45
{
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
if(!(r1 ==0)) //_LBB355_45
{
	r4 = r4 >> 2;
	r5 = heap32[(r4+51)];
	r5 = r5 & 7;
if(!(r5 !=0)) //_LBB355_45
{
	r5 = heapU8[r1+204];
	r5 = r5 & 7;
if(!(r5 !=0)) //_LBB355_45
{
	r4 = heap32[(r4+52)];
	r5 = heap32[(r3+4)];
	r6 = r4 << 3;
	r6 = (r5 + r6)|0;
	r6 = r6 >> 2;
	r1 = r1 >> 2;
	r6 = heap32[(r6)];
	r1 = heap32[(r1+52)];
if(!(r6 ==r4)) //_LBB355_37
{
_51: while(true){
	r6 = r6 << 3;
	r4 = r4 << 3;
	r6 = (r5 + r6)|0;
	r4 = (r5 + r4)|0;
	r5 = r6 >> 2;
	r4 = r4 >> 2;
	r6 = heap32[(r5)];
	heap32[(r4)] = r6;
	r4 = heap32[(r5)];
	r5 = heap32[(r3+4)];
	r6 = r4 << 3;
	r6 = (r5 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
if(!(r6 !=r4)) //_LBB355_38
{
break _51;
}
}
}
	r6 = r1 << 3;
	r6 = (r5 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
_54: do {
if(!(r6 ==r1)) //_LBB355_41
{
_55: while(true){
	r6 = r6 << 3;
	r1 = r1 << 3;
	r6 = (r5 + r6)|0;
	r1 = (r5 + r1)|0;
	r5 = r6 >> 2;
	r1 = r1 >> 2;
	r6 = heap32[(r5)];
	heap32[(r1)] = r6;
	r1 = heap32[(r5)];
	r5 = heap32[(r3+4)];
	r6 = r1 << 3;
	r6 = (r5 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
if(!(r6 !=r1)) //_LBB355_42
{
break _54;
}
}
}
} while(0);
if(!(r4 ==r1)) //_LBB355_45
{
	r4 = r4 << 3;
	r5 = (r5 + r4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r1;
	r5 = heap32[(r3+4)];
	r1 = r1 << 3;
	r1 = (r5 + r1)|0;
	r4 = (r5 + r4)|0;
	r1 = r1 >> 2;
	r4 = r4 >> 2;
	r5 = heap32[(r1+1)];
	r4 = heap32[(r4+1)];
	r4 = (r4 + r5)|0;
	heap32[(r1+1)] = r4;
}
}
}
}
}
	r2 = (r2 + -1)|0;
	r0 = (r0 + 16)|0;
	if(r2 !=0) //_LBB355_31
{
continue _43;
}
else{
break _41;
}
}
}
} while(0);
	return;
}