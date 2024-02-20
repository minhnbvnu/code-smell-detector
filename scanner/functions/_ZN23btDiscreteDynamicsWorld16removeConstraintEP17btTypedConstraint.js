function _ZN23btDiscreteDynamicsWorld16removeConstraintEP17btTypedConstraint(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	r2 = heap32[(r0+47)];
	r3 = 0;
_1: while(true){
	if(r2 >r3) //_LBB655_1
{
	r4 = heap32[(r0+49)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r4 !=r1) //_LBB655_3
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
if(!(r2 <=r3)) //_LBB655_8
{
	r2 = (r2 + -1)|0;
	r3 = r3 << 2;
	r4 = heap32[(r0+49)];
	r2 = r2 << 2;
	r3 = (r4 + r3)|0;
	r4 = (r4 + r2)|0;
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	r5 = heap32[(r3)];
	r4 = heap32[(r4)];
	heap32[(r3)] = r4;
	r3 = heap32[(r0+49)];
	r2 = (r3 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r5;
	r2 = heap32[(r0+47)];
	r2 = (r2 + -1)|0;
	heap32[(r0+47)] = r2;
}
	r0 = r1 >> 2;
	r2 = heap32[(r0+5)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+120)];
	r4 = 0;
_11: while(true){
	if(r3 >r4) //_LBB655_9
{
	r5 = heap32[(r2+122)];
	r6 = r4 << 2;
	r5 = (r5 + r6)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	if(r5 !=r1) //_LBB655_11
{
	r4 = (r4 + 1)|0;
continue _11;
}
else{
__label__ = 12;
break _11;
}
}
else{
__label__ = 11;
break _11;
}
}
if (__label__ == 11){
	r4 = r3;
}
	if(r3 >r4) //_LBB655_16
{
	r3 = (r3 + -1)|0;
	r4 = r4 << 2;
	r5 = heap32[(r2+122)];
	r3 = r3 << 2;
	r4 = (r5 + r4)|0;
	r5 = (r5 + r3)|0;
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r4)];
	r5 = heap32[(r5)];
	heap32[(r4)] = r5;
	r4 = heap32[(r2+122)];
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = r6;
	r3 = heap32[(r2+120)];
	r3 = (r3 + -1)|0;
	heap32[(r2+120)] = r3;
}
	r4 = 0;
	r3 = r3 > r4;
	r3 = r3 & 1;
	heap32[(r2+63)] = r3;
	r0 = heap32[(r0+6)];
	r0 = r0 >> 2;
	r2 = heap32[(r0+120)];
_21: while(true){
	if(r2 >r4) //_LBB655_18
{
	r3 = heap32[(r0+122)];
	r5 = r4 << 2;
	r3 = (r3 + r5)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	if(r3 !=r1) //_LBB655_20
{
	r4 = (r4 + 1)|0;
continue _21;
}
else{
__label__ = 19;
break _21;
}
}
else{
__label__ = 18;
break _21;
}
}
if (__label__ == 18){
	r4 = r2;
}
	if(r2 >r4) //_LBB655_25
{
	r2 = (r2 + -1)|0;
	r1 = r4 << 2;
	r3 = heap32[(r0+122)];
	r2 = r2 << 2;
	r1 = (r3 + r1)|0;
	r3 = (r3 + r2)|0;
	r1 = r1 >> 2;
	r3 = r3 >> 2;
	r4 = heap32[(r1)];
	r3 = heap32[(r3)];
	heap32[(r1)] = r3;
	r1 = heap32[(r0+122)];
	r2 = (r1 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r4;
	r2 = heap32[(r0+120)];
	r2 = (r2 + -1)|0;
	heap32[(r0+120)] = r2;
}
	r1 = 0;
	r1 = r2 > r1;
	r1 = r1 & 1;
	heap32[(r0+63)] = r1;
	return;
}