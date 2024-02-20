function _ZN23btDiscreteDynamicsWorldD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV23btDiscreteDynamicsWorld;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heapU8[r0+244];
if(!(r1 ==0)) //_LBB673_3
{
	r1 = heap32[(r2+45)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+45)];
if(!(r1 ==0)) //_LBB673_3
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r1 = heapU8[r0+245];
if(!(r1 ==0)) //_LBB673_6
{
	r1 = heap32[(r2+44)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+44)];
if(!(r1 ==0)) //_LBB673_6
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r1 = heap32[(r2+65)];
if(!(r1 ==0)) //_LBB673_10
{
	r3 = heapU8[r0+264];
if(!(r3 ==0)) //_LBB673_9
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r2+65)] = 0;
}
	r1 = 1;
	heap8[r0+264] = r1;
	heap32[(r2+65)] = 0;
	heap32[(r2+63)] = 0;
	heap32[(r2+64)] = 0;
	r3 = heap32[(r2+54)];
if(!(r3 ==0)) //_LBB673_14
{
	r4 = heapU8[r0+220];
if(!(r4 ==0)) //_LBB673_13
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r2+54)] = 0;
}
	heap8[r0+220] = r1;
	heap32[(r2+54)] = 0;
	heap32[(r2+52)] = 0;
	heap32[(r2+53)] = 0;
	r3 = heap32[(r2+49)];
if(!(r3 ==0)) //_LBB673_18
{
	r4 = heapU8[r0+200];
if(!(r4 ==0)) //_LBB673_17
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r2+49)] = 0;
}
	heap8[r0+200] = r1;
	heap32[(r2+49)] = 0;
	r1 = _ZTV15btDynamicsWorld;
	heap32[(r2+47)] = 0;
	r1 = (r1 + 8)|0;
	heap32[(r2+48)] = 0;
	heap32[(r2)] = r1;
	heap32[(g0)] = r0;
	_ZN16btCollisionWorldD2Ev(i7);
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}