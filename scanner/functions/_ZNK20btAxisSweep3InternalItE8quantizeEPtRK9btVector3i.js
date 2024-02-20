function _ZNK20btAxisSweep3InternalItE8quantizeEPtRK9btVector3i(sp)
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
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	f0 = heapFloat[(fp+2)];
	f1 = heapFloat[(r1+2)];
	f2 = heapFloat[(fp+4)];
	f3 = heapFloat[(r1+4)];
	f4 = heapFloat[(fp+3)];
	f5 = heapFloat[(r1+3)];
	f0 = f0-f1;
	f1 = heapFloat[(r1+10)];
	f2 = f2-f3;
	f3 = heapFloat[(r1+12)];
	f4 = f4-f5;
	f5 = heapFloat[(r1+11)];
	f0 = f0*f1;
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+5)];
	f1 = f2*f3;
	f2 = f4*f5;
	f3 =                         0;
	if(f0 >f3) //_LBB58_2
{
	r3 = heapU16[(r0+6)>>1];
	f4 = r3; //fitos r3, f4
	if(f0 <f4) //_LBB58_4
{
	r3 = heapU16[(r0+4)>>1];
	r4 = Math.floor(f0);
	r3 = r3 & r4;
	r3 = r3 | r2;
}
else{
	r4 = heapU16[(r0+4)>>1];
	r3 = r4 & r3;
	r3 = r3 | r2;
}
}
else{
	r3 = r2;
}
	heap16[(r1)>>1] = r3;
	if(f2 >f3) //_LBB58_7
{
	r3 = heapU16[(r0+6)>>1];
	f0 = r3; //fitos r3, f0
	if(f2 <f0) //_LBB58_9
{
	r3 = heapU16[(r0+4)>>1];
	r4 = Math.floor(f2);
	r3 = r3 & r4;
	r3 = r3 | r2;
}
else{
	r4 = heapU16[(r0+4)>>1];
	r3 = r4 & r3;
	r3 = r3 | r2;
}
}
else{
	r3 = r2;
}
	heap16[(r1+2)>>1] = r3;
	if(f1 >f3) //_LBB58_12
{
	r3 = heapU16[(r0+6)>>1];
	f0 = r3; //fitos r3, f0
	if(f1 <f0) //_LBB58_14
{
	r0 = heapU16[(r0+4)>>1];
	r3 = Math.floor(f1);
	r0 = r0 & r3;
	r2 = r0 | r2;
}
else{
	r0 = heapU16[(r0+4)>>1];
	r0 = r0 & r3;
	r2 = r0 | r2;
}
}
	heap16[(r1+4)>>1] = r2;
	return;
}