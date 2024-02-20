function _ZNK10btBoxShape7getEdgeEiR9btVector3S1_(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
_1: do {
	if(r0 >5) //_LBB388_8
{
	if(r0 >8) //_LBB388_12
{
	if(r0 ==9) //_LBB388_24
{
	r0 = 4;
	r4 = 6;
__label__ = 28;
break _1;
}
else{
	if(r0 ==10) //_LBB388_25
{
	r0 = 5;
	r4 = 7;
__label__ = 28;
break _1;
}
else{
	if(r0 ==11) //_LBB388_26
{
	r0 = 6;
	r4 = 7;
__label__ = 28;
break _1;
}
else{
__label__ = 27;
break _1;
}
}
}
}
else{
	if(r0 ==6) //_LBB388_21
{
	r0 = 2;
	r4 = 6;
__label__ = 28;
break _1;
}
else{
	if(r0 ==7) //_LBB388_22
{
	r0 = 3;
	r4 = 7;
__label__ = 28;
break _1;
}
else{
	if(r0 ==8) //_LBB388_23
{
	r0 = 4;
	r4 = 5;
__label__ = 28;
break _1;
}
else{
__label__ = 27;
break _1;
}
}
}
}
}
else{
	if(r0 >2) //_LBB388_5
{
	if(r0 ==3) //_LBB388_18
{
	r0 = 2;
	r4 = 3;
__label__ = 28;
break _1;
}
else{
	if(r0 ==4) //_LBB388_19
{
	r0 = 0;
	r4 = 4;
__label__ = 28;
break _1;
}
else{
	if(r0 ==5) //_LBB388_20
{
	r0 = 1;
	r4 = 5;
__label__ = 28;
break _1;
}
else{
__label__ = 27;
break _1;
}
}
}
}
else{
	if(r0 ==0) //_LBB388_15
{
	r0 = 0;
	r4 = 1;
__label__ = 28;
break _1;
}
else{
	if(r0 ==1) //_LBB388_16
{
	r0 = 0;
	r4 = 2;
__label__ = 28;
}
else{
	if(r0 ==2) //_LBB388_17
{
	r0 = 1;
	r4 = 3;
__label__ = 28;
}
else{
__label__ = 27;
}
}
}
}
}
} while(0);
switch(__label__ ){//multiple entries
case 28:
	r5 = r1 >> 2;
	r6 = heap32[(r5)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+24)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r0 = heap32[(r5)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+24)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
break;
case 27:
	r0 = _2E_str10;
	r1 = _2E_str2175;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 246;
	_assert(i7);
break;
}
}