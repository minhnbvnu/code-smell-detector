function _ZN16btCollisionWorld33performDiscreteCollisionDetectionEv(sp)
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
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = _2E_str1190;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r0 = r1 >> 2;
	r2 = heap32[(r0)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+2)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = _2E_str1291;
	heap32[(g0)] = r2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+20)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+8)];
	r4 = heap32[(r0+6)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	r2 = _ZN15CProfileManager11CurrentNodeE;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+4)];
	r5 = (r5 + -1)|0;
	heap32[(r4+4)] = r5;
_1: do {
if(!(r5 !=0)) //_LBB226_6
{
	r5 = heap32[(r4+1)];
	if(r5 !=0) //_LBB226_3
{
	r3 = sp + -24;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	r5 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r3 = r3 >> 2;
	r6 = heap32[(fp+-6)];
	r7 = heap32[(r5)];
	r6 = (r6 - r7)|0;
	r3 = heap32[(r3+1)];
	r5 = heap32[(r5+1)];
	r3 = (r3 - r5)|0;
	r5 = (r6 * 1000000)|0;
	r3 = (r3 + r5)|0;
	r5 = heap32[(r4+3)];
	r3 = (r3 - r5)|0;
	f0 = uint(r3); //fuitos r3, f0
	f1 =                      1000;
	f2 = heapFloat[(r4+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r4+2)] = f0;
	r3 = heap32[(r4+4)];
	if(r3 !=0) //_LBB226_6
{
break _1;
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
	r3 = heap32[(r0+6)];
	r4 = _2E_str1392;
	heap32[(g0)] = r4;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
if(!(r3 ==0)) //_LBB226_8
{
	r4 = heap32[(r0+20)];
	r5 = r3 >> 2;
	r6 = r4 >> 2;
	r5 = heap32[(r5)];
	r6 = heap32[(r6)];
	r5 = r5 >> 2;
	r6 = r6 >> 2;
	r5 = heap32[(r5+8)];
	r0 = heap32[(r0+6)];
	r6 = heap32[(r6+9)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r1 = (r1 + 28)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r0 = heap32[(r2)];
	r1 = r0 >> 2;
	r3 = heap32[(r1+4)];
	r3 = (r3 + -1)|0;
	heap32[(r1+4)] = r3;
_11: do {
	if(r3 ==0) //_LBB226_10
{
	r3 = heap32[(r1+1)];
	if(r3 !=0) //_LBB226_12
{
	r0 = sp + -16;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r0 = r0 >> 2;
	r4 = heap32[(fp+-4)];
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
	r0 = heap32[(r2)];
	r1 = heap32[(r1+4)];
if(!(r1 ==0)) //_LBB226_14
{
break _11;
}
}
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
	heap32[(r2)] = r0;
}
} while(0);
	r1 = r0 >> 2;
	r3 = heap32[(r1+4)];
	r3 = (r3 + -1)|0;
	heap32[(r1+4)] = r3;
_17: do {
if(!(r3 !=0)) //_LBB226_21
{
	r3 = heap32[(r1+1)];
	if(r3 !=0) //_LBB226_18
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
	if(r0 !=0) //_LBB226_21
{
break _17;
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