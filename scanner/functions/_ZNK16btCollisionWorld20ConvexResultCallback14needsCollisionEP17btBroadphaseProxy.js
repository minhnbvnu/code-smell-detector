function _ZNK16btCollisionWorld20ConvexResultCallback14needsCollisionEP17btBroadphaseProxy(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heapU16[(r0+10)>>1];
	r3 = heapU16[(r1+4)>>1];
	r2 = r2 & r3;
	r2 = r2 & 65535;
	if(r2 ==0) //_LBB196_2
{
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	r1 = heapU16[(r1+6)>>1];
	r0 = heapU16[(r0+8)>>1];
	r0 = r1 & r0;
	r0 = r0 & 65535;
	r1 = 0;
	r0 = r0 != r1;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
}