function _ZN20btAxisSweep3InternalItE7rayTestERK9btVector3S3_R23btBroadphaseRayCallbackS3_S3_(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+27)];
	r3 = heap32[(fp+3)];
	if(r2 !=0) //_LBB57_2
{
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r6 = r2 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+6)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	return;
}
else{
	r2 = heapU16[(r0+56)>>1];
	r2 = r2 << 1;
	r2 = r2 | 1;
if(!(r2 ==1)) //_LBB57_7
{
	r2 = 1;
	r4 = 2;
_6: while(true){
	r5 = r2 & 65535;
	r6 = heap32[(r1+17)];
	r5 = r5 << 2;
	r7 = heapU8[r6+r5];
	r7 = r7 & 1;
if(!(r7 ==0)) //_LBB57_6
{
	r7 = r3 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r5 = (r6 + r5)|0;
	r5 = heapU16[(r5+2)>>1];
	r6 = heap32[(r7+2)];
	r7 = heap32[(r1+15)];
	r5 = r5 << 6;
	r5 = (r7 + r5)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
}
	r5 = heapU16[(r0+56)>>1];
	r6 = (r4 + 1)|0;
	r2 = (r2 + 1)|0;
	r5 = r5 << 1;
	r7 = r4 & 65535;
	r5 = r5 | 1;
	r4 = r6;
if(!(uint(r7) <uint(r5))) //_LBB57_4
{
break _6;
}
}
}
	return;
}
}