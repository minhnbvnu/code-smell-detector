function _ZN20btAxisSweep3InternalItE12destroyProxyEP17btBroadphaseProxyP12btDispatcher(sp)
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
	var r12;
	var r13;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+27)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
if(!(r2 ==0)) //_LBB65_2
{
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r6 = r3 >> 2;
	r5 = heap32[(r5+3)];
	r6 = heap32[(r6+15)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r2 = heap32[(r1+23)];
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r3 = r3 >> 2;
	r3 = heap32[(r3+3)];
	r6 = heap32[(r1+15)];
	r5 = heap32[(r5+14)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r2 = r_g0;
if(!(r2 !=0)) //_LBB65_4
{
	r2 = heap32[(r1+23)];
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+4)];
	r7 = r3 & 65535;
	r7 = r7 << 6;
	r7 = (r6 + r7)|0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r2 = heap32[(r1+15)];
	r5 = heapU16[(r0+56)>>1];
	r7 = heapU16[(r2+54)>>1];
	r7 = (r7 + -2)|0;
	heap16[(r2+54)>>1] = r7;
	r2 = heap32[(r1+15)];
	r7 = heapU16[(r2+56)>>1];
	r7 = (r7 + -2)|0;
	r8 = r3 & 65535;
	heap16[(r2+56)>>1] = r7;
	r2 = heap32[(r1+15)];
	r7 = r8 << 6;
	r9 = heapU16[(r2+58)>>1];
	r6 = (r6 + r7)|0;
	r5 = r5 << 1;
	r6 = (r6 + 54)|0;
	r10 = 0;
	r9 = (r9 + -2)|0;
	heap16[(r2+58)>>1] = r9;
	r2 = r10;
_7: while(true){
	r9 = r2 << 2;
	r9 = (r0 + r9)|0;
	r9 = r9 >> 2;
	r11 = heapU16[(r6)>>1];
	r12 = heapU16[(r0+6)>>1];
	r9 = heap32[(r9+17)];
	r13 = r11 << 2;
	heap16[(r9+r13)>>1] = r12;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = 0;
	_ZN20btAxisSweep3InternalItE9sortMaxUpEitP12btDispatcherb(i7);
	r11 = heapU16[(r6+-6)>>1];
	r12 = heapU16[(r0+6)>>1];
	r13 = r11 << 2;
	heap16[(r9+r13)>>1] = r12;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r11;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = 0;
	r11 = r5 << 2;
	_ZN20btAxisSweep3InternalItE9sortMinUpEitP12btDispatcherb(i7);
	r9 = (r9 + r11)|0;
	heap16[(r9+-2)>>1] = r10;
	r11 = heapU16[(r0+6)>>1];
	r2 = (r2 + 1)|0;
	r6 = (r6 + 2)|0;
	heap16[(r9+-4)>>1] = r11;
	if(r2 !=3) //_LBB65_5
{
continue _7;
}
else{
break _7;
}
}
if(!(r8 ==0)) //_LBB65_8
{
	r2 = heapU16[(r0+58)>>1];
	if(uint(r2) >uint(r8)) //_LBB65_9
{
	r1 = heap32[(r1+15)];
	r2 = heapU16[(r0+64)>>1];
	r1 = (r1 + r7)|0;
	heap16[(r1+48)>>1] = r2;
	heap16[(r0+64)>>1] = r3;
	r1 = heapU16[(r0+56)>>1];
	r1 = (r1 + -1)|0;
	heap16[(r0+56)>>1] = r1;
	return;
}
}
	r0 = _2E_str11;
	r1 = _2E_str112;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 495;
	_assert(i7);
}