function _ZN15CProfileManager13Start_ProfileEPKc(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp)];
	r3 = r1 >> 2;
	r4 = heap32[(r3)];
	if(r4 !=r2) //_LBB693_2
{
	r4 = (r1 + 24)|0;
_3: while(true){
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	if(r4 !=0) //_LBB693_3
{
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	if(r5 !=r2) //_LBB693_5
{
	r4 = (r4 + 28)|0;
}
else{
__label__ = 3;
break _3;
}
}
else{
__label__ = 6;
break _3;
}
}
switch(__label__ ){//multiple entries
case 6:
	heap32[(g0)] = 32;
	_Znwj(i7);
	r4 = r_g0;
	r5 = r4 >> 2;
	heap32[(r5)] = r2;
	heap32[(r5+1)] = 0;
	heap32[(r5+2)] = 0;
	heap32[(r5+3)] = 0;
	heap32[(r5+4)] = 0;
	heap32[(r5+5)] = r1;
	heap32[(r5+6)] = 0;
	heap32[(r5+7)] = 0;
	heap32[(g0)] = r4;
	_ZN12CProfileNode5ResetEv(i7);
	r1 = heap32[(r3+6)];
	heap32[(r5+7)] = r1;
	heap32[(r3+6)] = r4;
	r1 = r4;
break;
case 3:
	r1 = r4;
break;
}
	heap32[(r0)] = r1;
}
	r0 = r1 >> 2;
	r1 = heap32[(r0+1)];
	r1 = (r1 + 1)|0;
	heap32[(r0+1)] = r1;
	r1 = heap32[(r0+4)];
	r2 = (r1 + 1)|0;
	heap32[(r0+4)] = r2;
if(!(r1 !=0)) //_LBB693_11
{
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r2 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r1 = r1 >> 2;
	r3 = heap32[(fp+-2)];
	r4 = heap32[(r2)];
	r3 = (r3 - r4)|0;
	r1 = heap32[(r1+1)];
	r2 = heap32[(r2+1)];
	r1 = (r1 - r2)|0;
	r2 = (r3 * 1000000)|0;
	r1 = (r1 + r2)|0;
	heap32[(r0+3)] = r1;
}
	return;
}