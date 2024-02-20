function _ZN16btCollisionWorld11updateAabbsEv(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
var __label__ = 0;
	i7 = sp + -64;var g0 = i7>>2; // save stack
	r0 = _2E_str1998;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	r0 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r2 = heap32[(r0+2)];
if(!(r2 <1)) //_LBB220_14
{
	r2 = 0;
_3: while(true){
	r3 = heap32[(r0+4)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r2 = (r2 + 1)|0;
	r3 = heap32[(r3)];
	r4 = heapU8[r1+88];
	if(r4 !=0) //_LBB220_5
{
__label__ = 5;
}
else{
	r4 = r3 >> 2;
	r4 = heap32[(r4+54)];
	if(r4 ==2) //_LBB220_13
{
__label__ = 13;
}
else{
	if(r4 ==5) //_LBB220_13
{
__label__ = 13;
}
else{
__label__ = 5;
}
}
}
_8: do {
if (__label__ == 5){
	r4 = r3 >> 2;
	r5 = heap32[(r4+48)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	r7 = sp + -40;
	r8 = sp + -24;
	r9 = (r3 + 4)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	f0 =     -0.019999999552965164;
	f1 = heapFloat[(fp+-6)];
	f1 = f1+f0;
	r5 = r8 >> 2;
	heapFloat[(fp+-6)] = f1;
	f2 = heapFloat[(r5+1)];
	f2 = f2+f0;
	heapFloat[(r5+1)] = f2;
	f3 = heapFloat[(r5+2)];
	f0 = f3+f0;
	heapFloat[(r5+2)] = f0;
	f3 =      0.019999999552965164;
	f4 = heapFloat[(fp+-10)];
	f4 = f4+f3;
	r5 = r7 >> 2;
	heapFloat[(fp+-10)] = f4;
	f5 = heapFloat[(r5+1)];
	f5 = f5+f3;
	heapFloat[(r5+1)] = f5;
	f6 = heapFloat[(r5+2)];
	f3 = f6+f3;
	heapFloat[(r5+2)] = f3;
	r5 = heap32[(r0+20)];
	r3 = heapU8[r3+204];
	r3 = r3 & 1;
if(!(r3 != 0)) //_LBB220_10
{
	f1 = f4-f1;
	f2 = f5-f2;
	f0 = f3-f0;
	f1 = f1*f1;
	f2 = f2*f2;
	f1 = f1+f2;
	f0 = f0*f0;
	f0 = f1+f0;
	f1 =              999999995904;
if(!(f0 <f1)) //_LBB220_10
{
	r5 = heap32[(r4+54)];
	r5 = (r5 + -4)|0;
if(!(uint(r5) <uint(2))) //_LBB220_9
{
	heap32[(r4+54)] = 5;
}
	r4 = _ZZN16btCollisionWorld16updateSingleAabbEP17btCollisionObjectE8reportMe_2E_b;
	r5 = heapU8[r4];
	if(r5 != 0) //_LBB220_13
{
break _8;
}
else{
	r3 = heap32[(r0+21)];
	if(r3 ==0) //_LBB220_13
{
break _8;
}
else{
	r5 = 1;
	r6 = r3 >> 2;
	heap8[r4] = r5;
	r4 = heap32[(r6)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+9)];
	r5 = _2E_str1594;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = heap32[(r0+21)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+9)];
	r5 = _2E_str1695;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = heap32[(r0+21)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+9)];
	r5 = _2E_str1796;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r3 = heap32[(r0+21)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+9)];
	r5 = _2E_str1897;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
break _8;
}
}
}
}
	r3 = r5 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+4)];
	r6 = heap32[(r0+6)];
	r4 = heap32[(r4+47)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = r6;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
} while(0);
	r3 = heap32[(r0+2)];
	if(r3 >r2) //_LBB220_2
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
_21: do {
if(!(r3 !=0)) //_LBB220_20
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB220_17
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
	if(r1 !=0) //_LBB220_20
{
break _21;
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