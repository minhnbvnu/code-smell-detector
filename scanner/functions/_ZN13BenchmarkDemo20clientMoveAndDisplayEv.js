function _ZN13BenchmarkDemo20clientMoveAndDisplayEv(sp)
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
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -128;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
if(!(r1 ==0)) //_LBB21_2
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 1015580809;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = 1015580809;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = heap32[(r0+1)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+5)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
	r1 = heap32[(r0+17)];
if(!(r1 !=7)) //_LBB21_10
{
	r1 = _ZL10raycastBar;
	r2 = r1 >> 2;
	r0 = heap32[(r0+1)];
	r3 = heap32[(r2+10006)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	r3 = 0;
	gettimeofday(i7);
_6: while(true){
	r4 = sp + -96;
	r5 = r4 >> 2;
	heap32[(r5+1)] = 1065353216;
	r6 = 1;
	heap32[(r5+2)] = 0;
	r7 = -1;
	heap16[(sp+-84)>>1] = r6;
	r6 = _ZTVN16btCollisionWorld24ClosestRayResultCallbackE;
	heap16[(sp+-82)>>1] = r7;
	r7 = (r1 + r3)|0;
	r6 = (r6 + 8)|0;
	heap32[(r5+4)] = 0;
	r8 = r7 >> 2;
	heap32[(fp+-24)] = r6;
	heap32[(r5+5)] = heap32[(r8)];
	heap32[(r5+6)] = heap32[(r8+1)];
	heap32[(r5+7)] = heap32[(r8+2)];
	heap32[(r5+8)] = heap32[(r8+3)];
	heap32[(r5+9)] = heap32[(r8+2000)];
	heap32[(r5+10)] = heap32[(r8+2001)];
	heap32[(r5+11)] = heap32[(r8+2002)];
	r9 = r0 >> 2;
	heap32[(r5+12)] = heap32[(r8+2003)];
	r9 = heap32[(r9)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+7)];
	r10 = (r7 + 8000)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	r4 = heap32[(r5+2)];
	if(r4 ==0) //_LBB21_6
{
	r4 = r7 >> 2;
	r5 = r7 >> 2;
	r9 = r7 >> 2;
	r10 = r7 >> 2;
	heap32[(r4+6000)] = heap32[(r5+2000)];
	r4 = r7 >> 2;
	r5 = r7 >> 2;
	heap32[(r9+6001)] = heap32[(r10+2001)];
	r9 = r7 >> 2;
	r10 = r7 >> 2;
	heap32[(r4+6002)] = heap32[(r5+2002)];
	r4 = r7 >> 2;
	heap32[(r9+6003)] = heap32[(r10+2003)];
	r5 = r7 >> 2;
	heap32[(r4+8000)] = 1065353216;
	r4 = r7 >> 2;
	heap32[(r5+8001)] = 0;
	heap32[(r4+8002)] = 0;
	heap32[(r8+8003)] = 0;
}
else{
	r4 = r7 >> 2;
	r9 = r7 >> 2;
	heap32[(r4+6000)] = heap32[(r5+17)];
	r4 = r7 >> 2;
	heap32[(r9+6001)] = heap32[(r5+18)];
	r9 = r7 >> 2;
	heap32[(r4+6002)] = heap32[(r5+19)];
	heap32[(r9+6003)] = heap32[(r5+20)];
	f0 = heapFloat[(r5+13)];
	r4 = r7 >> 2;
	heapFloat[(r4+8000)] = f0;
	f1 = heapFloat[(r5+14)];
	r9 = r7 >> 2;
	heapFloat[(r9+8001)] = f1;
	f2 = heapFloat[(r5+15)];
	r7 = r7 >> 2;
	f0 = f0*f0;
	f1 = f1*f1;
	heapFloat[(r7+8002)] = f2;
	heap32[(r8+8003)] = heap32[(r5+16)];
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	f0 = f1/f_g0;
	f1 = heapFloat[(r4+8000)];
	f1 = f1*f0;
	heapFloat[(r4+8000)] = f1;
	f1 = heapFloat[(r9+8001)];
	f1 = f1*f0;
	heapFloat[(r9+8001)] = f1;
	f1 = heapFloat[(r7+8002)];
	f0 = f1*f0;
	heapFloat[(r7+8002)] = f0;
}
	r3 = (r3 + 16)|0;
	heap32[(fp+-24)] = r6;
if(!(r3 !=8000)) //_LBB21_4
{
break _6;
}
}
	r0 = heap32[(r2+10001)];
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	gettimeofday(i7);
	r3 = heap32[(r2+10006)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 - r5)|0;
	r1 = (r1 / 1000)|0;
	r3 = (r3 * 1000)|0;
	r1 = (r1 + r3)|0;
	r0 = (r1 + r0)|0;
	heap32[(r2+10001)] = r0;
	r1 = heap32[(r2+10000)];
	r1 = (r1 + 1)|0;
	heap32[(r2+10000)] = r1;
if(!(r1 <51)) //_LBB21_10
{
	r3 = heap32[(r2+10004)];
	r3 = r0 < r3 ? r0 : r3;
	heap32[(r2+10004)] = r3;
	r4 = heap32[(r2+10005)];
	r4 = r0 > r4 ? r0 : r4;
	heap32[(r2+10005)] = r4;
	r5 = heap32[(r2+10002)];
	r5 = (r0 + r5)|0;
	heap32[(r2+10002)] = r5;
	r6 = heap32[(r2+10003)];
	r6 = (r6 + 1)|0;
	f0 = r5; //fitos r5, f0
	f1 = r6; //fitos r6, f1
	f0 = f0/f1;
	heap32[(r2+10003)] = r6;
	r5 = _2E_str7;
	r1 = (r1 * 500)|0;
	f0 = f0; //fstod f0, f0
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	llvm_writeDouble((i7+24),f0);
	printf(i7);
	heap32[(r2+10001)] = 0;
	heap32[(r2+10000)] = 0;
}
}
	return;
}