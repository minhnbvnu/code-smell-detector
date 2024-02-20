function _ZN16btCollisionWorld21removeCollisionObjectEP17btCollisionObject(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+47)];
	r3 = heap32[(fp)];
if(!(r2 ==0)) //_LBB225_2
{
	r4 = r3 >> 2;
	r5 = heap32[(r4+20)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+10)];
	r7 = heap32[(r4+6)];
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r5 = heap32[(r4+20)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+3)];
	r4 = heap32[(r4+6)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	heap32[(r1+47)] = 0;
}
	r1 = r3 >> 2;
	r2 = heap32[(r1+2)];
	r3 = 0;
_4: while(true){
	if(r2 >r3) //_LBB225_3
{
	r4 = heap32[(r1+4)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r4 !=r0) //_LBB225_5
{
	r3 = (r3 + 1)|0;
continue _4;
}
else{
__label__ = 7;
break _4;
}
}
else{
__label__ = 6;
break _4;
}
}
if (__label__ == 6){
	r3 = r2;
}
if(!(r2 <=r3)) //_LBB225_10
{
	r0 = (r2 + -1)|0;
	r2 = r3 << 2;
	r3 = heap32[(r1+4)];
	r0 = r0 << 2;
	r2 = (r3 + r2)|0;
	r3 = (r3 + r0)|0;
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r2)];
	r3 = heap32[(r3)];
	heap32[(r2)] = r3;
	r2 = heap32[(r1+4)];
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r4;
	r0 = heap32[(r1+2)];
	r0 = (r0 + -1)|0;
	heap32[(r1+2)] = r0;
}
	return;
}