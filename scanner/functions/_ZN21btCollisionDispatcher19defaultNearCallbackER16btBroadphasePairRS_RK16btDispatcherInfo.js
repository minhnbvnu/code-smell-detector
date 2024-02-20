function _ZN21btCollisionDispatcher19defaultNearCallbackER16btBroadphasePairRS_RK16btDispatcherInfo(sp)
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
var __label__ = 0;
	i7 = sp + -184;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r2 = r0 >> 2;
	r3 = heap32[(r2)];
	r4 = heap32[(r1)];
	r5 = heap32[(r1+1)];
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r4 = heap32[(r4)];
	r5 = heap32[(r5)];
	r3 = heap32[(r3+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = r_g0;
_1: do {
if(!(r3 ==0)) //_LBB184_8
{
	r3 = heap32[(fp+2)];
	r6 = heap32[(r1+2)];
	if(r6 ==0) //_LBB184_3
{
	r6 = heap32[(r2)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = 0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0;
	heap32[(r1+2)] = r6;
	if(r6 ==0) //_LBB184_8
{
break _1;
}
}
	r0 = _ZTV16btManifoldResult;
	r1 = sp + -160;
	r0 = (r0 + 8)|0;
	r2 = r1 >> 2;
	heap32[(fp+-40)] = r0;
	heap32[(r2+1)] = 0;
	heap32[(r2+34)] = r4;
	r0 = r4 >> 2;
	heap32[(r2+35)] = r5;
	heap32[(r2+2)] = heap32[(r0+1)];
	heap32[(r2+3)] = heap32[(r0+2)];
	heap32[(r2+4)] = heap32[(r0+3)];
	heap32[(r2+5)] = heap32[(r0+4)];
	heap32[(r2+6)] = heap32[(r0+5)];
	heap32[(r2+7)] = heap32[(r0+6)];
	heap32[(r2+8)] = heap32[(r0+7)];
	heap32[(r2+9)] = heap32[(r0+8)];
	heap32[(r2+10)] = heap32[(r0+9)];
	heap32[(r2+11)] = heap32[(r0+10)];
	heap32[(r2+12)] = heap32[(r0+11)];
	heap32[(r2+13)] = heap32[(r0+12)];
	heap32[(r2+14)] = heap32[(r0+13)];
	heap32[(r2+15)] = heap32[(r0+14)];
	heap32[(r2+16)] = heap32[(r0+15)];
	r7 = r5 >> 2;
	heap32[(r2+17)] = heap32[(r0+16)];
	heap32[(r2+18)] = heap32[(r7+1)];
	heap32[(r2+19)] = heap32[(r7+2)];
	heap32[(r2+20)] = heap32[(r7+3)];
	heap32[(r2+21)] = heap32[(r7+4)];
	heap32[(r2+22)] = heap32[(r7+5)];
	heap32[(r2+23)] = heap32[(r7+6)];
	heap32[(r2+24)] = heap32[(r7+7)];
	heap32[(r2+25)] = heap32[(r7+8)];
	heap32[(r2+26)] = heap32[(r7+9)];
	heap32[(r2+27)] = heap32[(r7+10)];
	heap32[(r2+28)] = heap32[(r7+11)];
	heap32[(r2+29)] = heap32[(r7+12)];
	heap32[(r2+30)] = heap32[(r7+13)];
	heap32[(r2+31)] = heap32[(r7+14)];
	heap32[(r2+32)] = heap32[(r7+15)];
	r0 = r6 >> 2;
	heap32[(r2+33)] = heap32[(r7+16)];
	r0 = heap32[(r0)];
	r2 = r3 >> 2;
	r7 = heap32[(r2+2)];
	if(r7 !=1) //_LBB184_6
{
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r1;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	f0 = f_g0;
	f1 = heapFloat[(r2+3)];
if(!(f1 <=f0)) //_LBB184_8
{
	heapFloat[(r2+3)] = f0;
}
}
else{
	r0 = r0 >> 2;
	r0 = heap32[(r0+2)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r1;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
}
}
} while(0);
	return;
}