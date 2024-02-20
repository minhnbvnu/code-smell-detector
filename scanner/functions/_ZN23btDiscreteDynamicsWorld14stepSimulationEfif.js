function _ZN23btDiscreteDynamicsWorld14stepSimulationEfif(sp)
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
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	_ZN15CProfileManager5ResetEv(i7);
	r0 = _2E_str1299;
	r1 = heap32[(fp+2)];
	heap32[(g0)] = r0;
	r0 = heap32[(fp)];
	f0 = heapFloat[(fp+1)];
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	if(r1 ==0) //_LBB665_4
{
	r1 = r0 >> 2;
	f1 =                         0;
	heapFloat[(r1+60)] = f0;
	if(f0 <f1) //_LBB665_6
{
	f1 = -f0;
}
else{
	f1 = f0;
}
	f2 =   1.1920928955078125e-007;
	if(f1 >=f2) //_LBB665_9
{
	r1 = 1;
	f1 = f0;
	r3 = r1;
}
else{
	r1 = 0;
	f1 = f0;
	r3 = r1;
}
}
else{
	f1 = heapFloat[(fp+3)];
	r2 = r0 >> 2;
	f2 = heapFloat[(r2+60)];
	f0 = f2+f0;
	heapFloat[(r2+60)] = f0;
	if(f0 >=f1) //_LBB665_3
{
	f2 = f0/f1;
	r3 = f2|0;
	f2 = r3; //fitos r3, f2
	f2 = f2*f1;
	f0 = f0-f2;
	heapFloat[(r2+60)] = f0;
}
else{
	r3 = 0;
}
}
	r2 = r0 >> 2;
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r_g0;
if(!(r4 ==0)) //_LBB665_12
{
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r5 = r_g0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+12)];
	heap32[(g0)] = r_g0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r4 = r_g0 >>> 4;
	r5 = gDisableDeactivation;
	r4 = r4 & 1;
	heap8[r5] = r4;
}
	if(r3 ==0) //_LBB665_16
{
	r1 = heap32[(r2)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+19)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
else{
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r5 = r3 > r1 ? r1 : r3;
	r4 = heap32[(r4+38)];
	f0 = r5; //fitos r5, f0
	f0 = f0*f1;
	heap32[(g0)] = r0;
	heapFloat[(g0+1)] = f0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+40)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
if(!(r5 <1)) //_LBB665_17
{
	r4 = r3 ^ -1;
	r1 = r1 ^ -1;
	r1 = r4 > r1 ? r4 : r1;
	r1 = r1 ^ -1;
_22: while(true){
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+37)];
	heap32[(g0)] = r0;
	heapFloat[(g0+1)] = f1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = heap32[(r2)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+19)];
	r1 = (r1 + -1)|0;
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	if(r1 ==0) //_LBB665_17
{
break _22;
}
else{
continue _22;
}
}
}
}
	r1 = heap32[(r2)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+28)];
	heap32[(g0)] = r0;
	r0 = _ZN15CProfileManager12FrameCounterE;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = _ZN15CProfileManager11CurrentNodeE;
	r1 = (r1 + 1)|0;
	r2 = r2 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2)];
	r1 = r0 >> 2;
	r4 = heap32[(r1+4)];
	r4 = (r4 + -1)|0;
	heap32[(r1+4)] = r4;
_25: do {
if(!(r4 !=0)) //_LBB665_23
{
	r4 = heap32[(r1+1)];
	if(r4 !=0) //_LBB665_20
{
	r0 = sp + -8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r4 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r0 = r0 >> 2;
	r5 = heap32[(fp+-2)];
	r6 = heap32[(r4)];
	r5 = (r5 - r6)|0;
	r0 = heap32[(r0+1)];
	r4 = heap32[(r4+1)];
	r0 = (r0 - r4)|0;
	r4 = (r5 * 1000000)|0;
	r0 = (r0 + r4)|0;
	r4 = heap32[(r1+3)];
	r0 = (r0 - r4)|0;
	f0 = uint(r0); //fuitos r0, f0
	f1 =                      1000;
	f2 = heapFloat[(r1+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r1+2)] = f0;
	r0 = heap32[(r1+4)];
	if(r0 !=0) //_LBB665_23
{
break _25;
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
	r_g0 = r3;
	return;
}