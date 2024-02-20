function _ZN20btAxisSweep3InternalItE7setAabbEP17btBroadphaseProxyRK9btVector3S5_P12btDispatcher(sp)
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
	var r14;
	var r15;
	var r16;
	var r17;
	var r18;
	var r19;
	var r20;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r2 = r0 >> 2;
	r3 = r1 >> 2;
	heap32[(r3+4)] = heap32[(r2)];
	heap32[(r3+5)] = heap32[(r2+1)];
	r4 = heap32[(fp+3)];
	heap32[(r3+6)] = heap32[(r2+2)];
	heap32[(r3+7)] = heap32[(r2+3)];
	r5 = r4 >> 2;
	heap32[(r3+8)] = heap32[(r5)];
	heap32[(r3+9)] = heap32[(r5+1)];
	r6 = heap32[(fp)];
	heap32[(r3+10)] = heap32[(r5+2)];
	heap32[(r3+11)] = heap32[(r5+3)];
	r7 = r6 >> 2;
	r1 = heapU16[(r1+12)>>1];
	r8 = heap32[(r7+15)];
	f0 = heapFloat[(r2)];
	f1 = heapFloat[(r2+1)];
	f2 = heapFloat[(r2+2)];
	r2 = sp + -6;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r2;
	heapFloat[(g0+2)] = f0;
	heapFloat[(g0+3)] = f1;
	heapFloat[(g0+4)] = f2;
	heap32[(g0+5)] = 0;
	_ZNK20btAxisSweep3InternalItE8quantizeEPtRK9btVector3i(i7);
	f0 = heapFloat[(r5)];
	f1 = heapFloat[(r5+1)];
	f2 = heapFloat[(r5+2)];
	r1 = r1 << 6;
	r5 = sp + -12;
	r1 = (r8 + r1)|0;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	heapFloat[(g0+2)] = f0;
	heapFloat[(g0+3)] = f1;
	heapFloat[(g0+4)] = f2;
	heap32[(g0+5)] = 1;
	r8 = heap32[(fp+4)];
	r1 = (r1 + 48)|0;
	r9 = 0;
	_ZNK20btAxisSweep3InternalItE8quantizeEPtRK9btVector3i(i7);
	r10 = r9;
_1: while(true){
	r11 = r9 << 2;
	r12 = r9 << 1;
	r13 = (r1 - r12)|0;
	r11 = (r6 - r11)|0;
	r14 = heapU16[(r13)>>1];
	r13 = heapU16[(r13+6)>>1];
	r11 = r11 >> 2;
	r15 = (r2 - r12)|0;
	r12 = (r5 - r12)|0;
	r16 = heap32[(r11+17)];
	r17 = r14 << 2;
	r18 = r13 << 2;
	r15 = heapU16[(r15)>>1];
	r19 = heapU16[(r16+r17)>>1];
	r20 = heapU16[(r16+r18)>>1];
	r12 = heapU16[(r12)>>1];
	heap16[(r16+r17)>>1] = r15;
	r11 = heap32[(r11+17)];
	r15 = (r15 - r19)|0;
	heap16[(r11+r18)>>1] = r12;
if(!(r15 >-1)) //_LBB64_3
{
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = 1;
	_ZN20btAxisSweep3InternalItE11sortMinDownEitP12btDispatcherb(i7);
}
	r11 = (r12 - r20)|0;
if(!(r11 <1)) //_LBB64_5
{
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = 1;
	_ZN20btAxisSweep3InternalItE9sortMaxUpEitP12btDispatcherb(i7);
}
if(!(r15 <1)) //_LBB64_7
{
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r14;
	heap32[(g0+3)] = r8;
	heap32[(g0+4)] = 1;
	_ZN20btAxisSweep3InternalItE9sortMinUpEitP12btDispatcherb(i7);
}
if(!(r11 >-1)) //_LBB64_9
{
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = r8;
	heap32[(g0+4)] = 1;
	_ZN20btAxisSweep3InternalItE11sortMaxDownEitP12btDispatcherb(i7);
}
	r9 = (r9 + -1)|0;
	r10 = (r10 + 1)|0;
	if(r9 !=-3) //_LBB64_1
{
continue _1;
}
else{
break _1;
}
}
	r1 = heap32[(r7+27)];
if(!(r1 ==0)) //_LBB64_12
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	r3 = heap32[(r3+15)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r8;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	return;
}