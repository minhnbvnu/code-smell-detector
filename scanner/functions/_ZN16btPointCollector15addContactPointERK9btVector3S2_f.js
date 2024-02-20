function _ZN16btPointCollector15addContactPointERK9btVector3S2_f(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	f0 = heapFloat[(fp+3)];
	r1 = r0 >> 2;
	f1 = heapFloat[(r1+9)];
if(!(f1 <=f0)) //_LBB531_2
{
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = 1;
	r2 = r2 >> 2;
	heap8[r0+40] = r4;
	heap32[(r1+1)] = heap32[(r2)];
	heap32[(r1+2)] = heap32[(r2+1)];
	heap32[(r1+3)] = heap32[(r2+2)];
	r0 = r3 >> 2;
	heap32[(r1+4)] = heap32[(r2+3)];
	heap32[(r1+5)] = heap32[(r0)];
	heap32[(r1+6)] = heap32[(r0+1)];
	heap32[(r1+7)] = heap32[(r0+2)];
	heap32[(r1+8)] = heap32[(r0+3)];
	heapFloat[(r1+9)] = f0;
}
	return;
}