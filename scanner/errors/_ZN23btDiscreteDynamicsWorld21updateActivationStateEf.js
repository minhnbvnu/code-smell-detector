function _ZN23btDiscreteDynamicsWorld21updateActivationStateEf(sp)
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
	var f3;
	var f4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _2E_str1097;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	r0 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r1 = heap32[(r0+52)];
if(!(r1 <1)) //_LBB657_25
{
	f0 = heapFloat[(fp+1)];
	r1 = gDisableDeactivation;
	r1 = heapU8[r1];
	r2 = 0;
_3: while(true){
	r3 = heap32[(r0+54)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
_5: do {
if(!(r3 ==0)) //_LBB657_24
{
	r4 = r3 >> 2;
	r5 = heap32[(r4+54)];
if(!(r5 ==4)) //_LBB657_24
{
_8: do {
	if(r5 !=2) //_LBB657_6
{
	f1 = heapFloat[(r4+76)];
	f2 = heapFloat[(r4+77)];
	f3 = heapFloat[(r4+78)];
	f1 = f1*f1;
	f2 = f2*f2;
	f4 = heapFloat[(r4+116)];
	f1 = f1+f2;
	f2 = f3*f3;
	f1 = f1+f2;
	f2 = f4*f4;
	if(f1 >=f2) //_LBB657_9
{
__label__ = 8;
}
else{
	f1 = heapFloat[(r4+80)];
	f2 = heapFloat[(r4+81)];
	f3 = heapFloat[(r4+82)];
	f1 = f1*f1;
	f2 = f2*f2;
	f4 = heapFloat[(r4+117)];
	f1 = f1+f2;
	f2 = f3*f3;
	f1 = f1+f2;
	f2 = f4*f4;
	if(f1 >=f2) //_LBB657_9
{
__label__ = 8;
}
else{
	f1 = heapFloat[(r4+55)];
	f1 = f1+f0;
	heapFloat[(r4+55)] = f1;
__label__ = 10;
}
}
if (__label__ == 8){
	r6 = (r5 + -4)|0;
	heap32[(r4+55)] = 0;
if(!(uint(r6) <uint(2))) //_LBB657_11
{
	r5 = 0;
	heap32[(r4+54)] = 0;
break _8;
}
}
	if(r5 ==4) //_LBB657_24
{
break _5;
}
}
} while(0);
	r6 = r1 & 255;
_18: do {
if(!(r6 !=0)) //_LBB657_22
{
	r6 = (r5 + -2)|0;
if(!(uint(r6) <uint(2))) //_LBB657_15
{
	f1 = heapFloat[(r4+55)];
	f2 =                         2;
	if(f1 <=f2) //_LBB657_22
{
break _18;
}
}
	r3 = heapU8[r3+204];
	r3 = r3 & 3;
	if(r3 ==0) //_LBB657_18
{
	if(r5 ==2) //_LBB657_21
{
	heap32[(r4+76)] = 0;
	heap32[(r4+77)] = 0;
	heap32[(r4+78)] = 0;
	heap32[(r4+79)] = 0;
	heap32[(r4+80)] = 0;
	heap32[(r4+81)] = 0;
	heap32[(r4+82)] = 0;
	heap32[(r4+83)] = 0;
break _5;
}
else{
	if(r5 !=1) //_LBB657_24
{
break _5;
}
else{
	heap32[(r4+54)] = 3;
break _5;
}
}
}
else{
	r5 = (r5 + -4)|0;
	if(uint(r5) <uint(2)) //_LBB657_24
{
break _5;
}
else{
	heap32[(r4+54)] = 2;
break _5;
}
}
}
} while(0);
	r3 = (r5 + -4)|0;
if(!(uint(r3) <uint(2))) //_LBB657_24
{
	heap32[(r4+54)] = 1;
}
}
}
} while(0);
	r2 = (r2 + 1)|0;
	r3 = heap32[(r0+52)];
	if(r3 >r2) //_LBB657_2
{
continue _3;
}
else{
break _3;
}
}
}
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_35: do {
if(!(r3 !=0)) //_LBB657_31
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB657_28
{
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r1 = (r1 + r3)|0;
	r3 = heap32[(r2+3)];
	r1 = (r1 - r3)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r2+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r2+2)] = f0;
	r1 = heap32[(r2+4)];
	if(r1 !=0) //_LBB657_31
{
break _35;
}
else{
	r1 = heap32[(r0)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r0)] = r1;
}
} while(0);
	return;
}