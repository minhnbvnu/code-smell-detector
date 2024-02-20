function _ZN23btDiscreteDynamicsWorld26calculateSimulationIslandsEv(sp)
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
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = _2E_str188;
	r1 = heap32[(fp)];
	heap32[(g0)] = r0;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r0 = r1 >> 2;
	r2 = heap32[(r0+45)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+2)];
	r4 = heap32[(r0+6)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = heap32[(r0+47)];
if(!(r2 <1)) //_LBB650_21
{
	r3 = 0;
_3: while(true){
	r4 = heap32[(r0+49)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r5 = heap32[(r4+5)];
_5: do {
if(!(r5 ==0)) //_LBB650_20
{
	r6 = heapU8[r5+204];
	r6 = r6 & 3;
if(!(r6 !=0)) //_LBB650_20
{
	r4 = heap32[(r4+6)];
if(!(r4 ==0)) //_LBB650_20
{
	r6 = heapU8[r4+204];
	r6 = r6 & 3;
if(!(r6 !=0)) //_LBB650_20
{
	r5 = r5 >> 2;
	r6 = heap32[(r5+54)];
	if(r6 ==2) //_LBB650_8
{
__label__ = 8;
}
else{
	if(r6 !=5) //_LBB650_10
{
__label__ = 10;
}
else{
__label__ = 8;
}
}
if (__label__ == 8){
	r6 = r4 >> 2;
	r6 = heap32[(r6+54)];
	if(r6 ==2) //_LBB650_20
{
break _5;
}
else{
	if(r6 ==5) //_LBB650_20
{
break _5;
}
}
}
	r6 = heap32[(r0+45)];
	r5 = heap32[(r5+52)];
	r6 = r6 >> 2;
	r7 = heap32[(r6+4)];
	r8 = r5 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r4 = r4 >> 2;
	r8 = heap32[(r8)];
	r4 = heap32[(r4+52)];
if(!(r8 ==r5)) //_LBB650_12
{
_17: while(true){
	r8 = r8 << 3;
	r5 = r5 << 3;
	r8 = (r7 + r8)|0;
	r5 = (r7 + r5)|0;
	r7 = r8 >> 2;
	r5 = r5 >> 2;
	r8 = heap32[(r7)];
	heap32[(r5)] = r8;
	r5 = heap32[(r7)];
	r7 = heap32[(r6+4)];
	r8 = r5 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
if(!(r8 !=r5)) //_LBB650_13
{
break _17;
}
}
}
	r8 = r4 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
_20: do {
if(!(r8 ==r4)) //_LBB650_16
{
_21: while(true){
	r8 = r8 << 3;
	r4 = r4 << 3;
	r8 = (r7 + r8)|0;
	r4 = (r7 + r4)|0;
	r7 = r8 >> 2;
	r4 = r4 >> 2;
	r8 = heap32[(r7)];
	heap32[(r4)] = r8;
	r4 = heap32[(r7)];
	r7 = heap32[(r6+4)];
	r8 = r4 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
if(!(r8 !=r4)) //_LBB650_17
{
break _20;
}
}
}
} while(0);
if(!(r5 ==r4)) //_LBB650_20
{
	r5 = r5 << 3;
	r7 = (r7 + r5)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r4;
	r6 = heap32[(r6+4)];
	r4 = r4 << 3;
	r4 = (r6 + r4)|0;
	r5 = (r6 + r5)|0;
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r4+1)];
	r5 = heap32[(r5+1)];
	r5 = (r5 + r6)|0;
	heap32[(r4+1)] = r5;
}
}
}
}
}
} while(0);
	r3 = (r3 + 1)|0;
	if(r2 !=r3) //_LBB650_2
{
continue _3;
}
else{
break _3;
}
}
}
	r0 = heap32[(r0+45)];
	r2 = r0 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	r0 = _ZN15CProfileManager11CurrentNodeE;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_27: do {
if(!(r3 !=0)) //_LBB650_27
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB650_24
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
	if(r1 !=0) //_LBB650_27
{
break _27;
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