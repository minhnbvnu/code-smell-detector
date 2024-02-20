function _ZL17convexHullSupportRK9btVector3PS0_iS1_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+5)];
if(!(r0 <1)) //_LBB461_4
{
	f0 = heapFloat[(fp+8)];
	f1 = heapFloat[(fp+3)];
	f2 = heapFloat[(fp+7)];
	f3 = heapFloat[(fp+2)];
	f4 = heapFloat[(fp+6)];
	f5 = heapFloat[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+4)];
	f1 = f1*f0;
	f3 = f3*f2;
	f5 = f5*f4;
	r3 = 0;
	r4 = -1;
	f6 =       -999999984306749440;
_3: while(true){
	r5 = r3 << 4;
	r5 = (r2 + r5)|0;
	r5 = r5 >> 2;
	f7 = heapFloat[(r5)];
	f8 = heapFloat[(r5+1)];
	f7 = f5*f7;
	f8 = f3*f8;
	f9 = heapFloat[(r5+2)];
	f7 = f7+f8;
	f8 = f1*f9;
	f7 = f7+f8;
	r5 = (r3 + 1)|0;
	r4 = f7 > f6 ? r3 : r4;
	f6 = f7 > f6 ? f7 : f6;
	r3 = r5;
if(!(r0 !=r5)) //_LBB461_2
{
break _3;
}
}
	if(r4 >-1) //_LBB461_5
{
	r0 = r4 << 4;
	r0 = (r2 + r0)|0;
	r0 = r0 >> 2;
	f1 = heapFloat[(r0)];
	f3 = heapFloat[(r0+2)];
	f5 = heapFloat[(r0+1)];
	r0 = r1 >> 2;
	f1 = f1*f4;
	f2 = f5*f2;
	heapFloat[(r0)] = f1;
	f0 = f3*f0;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
}
}
	r1 = _2E_str6249;
	r2 = _2E_str7250;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 108;
	_assert(i7);
}