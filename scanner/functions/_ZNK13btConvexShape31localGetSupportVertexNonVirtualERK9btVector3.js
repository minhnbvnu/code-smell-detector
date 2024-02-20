function _ZNK13btConvexShape31localGetSupportVertexNonVirtualERK9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	r1 = sp + -32;
	heapFloat[(fp+-8)] = f0;
	f1 = heapFloat[(r0+1)];
	r2 = r1 >> 2;
	heapFloat[(r2+1)] = f1;
	f2 = heapFloat[(r0+2)];
	r3 = heap32[(fp)];
	r4 = heap32[(fp+1)];
	heapFloat[(r2+2)] = f2;
	f3 = f0*f0;
	f4 = f1*f1;
	f3 = f3+f4;
	f4 = f2*f2;
	heap32[(r2+3)] = heap32[(r0+3)];
	f3 = f3+f4;
	f4 =   1.4210854715202004e-014;
	if(f3 <f4) //_LBB463_2
{
	heap32[(fp+-8)] = -1082130432;
	heap32[(r2+1)] = -1082130432;
	f2 =                        -1;
	heap32[(r2+2)] = -1082130432;
	heap32[(r2+3)] = 0;
	f1 = f2;
	f0 = f2;
}
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 = f2*f2;
	f0 = f0+f1;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	f0 = f1/f_g0;
	f1 = heapFloat[(fp+-8)];
	f1 = f1*f0;
	heapFloat[(fp+-8)] = f1;
	f2 = heapFloat[(r2+1)];
	f2 = f2*f0;
	heapFloat[(r2+1)] = f2;
	f3 = heapFloat[(r2+2)];
	f0 = f3*f0;
	r0 = r4 >> 2;
	heapFloat[(r2+2)] = f0;
	r5 = heap32[(r0+1)];
_4: do {
	if(r5 >7) //_LBB463_7
{
	if(r5 ==13) //_LBB463_13
{
	f3 = heapFloat[(r0+11)];
__label__ = 16;
break _4;
}
else{
	if(r5 ==10) //_LBB463_14
{
	f3 = heapFloat[(r0+11)];
__label__ = 16;
break _4;
}
else{
	if(r5 !=8) //_LBB463_16
{
__label__ = 15;
break _4;
}
else{
	f3 = heapFloat[(r0+7)];
	f4 = heapFloat[(r0+3)];
	f3 = f3*f4;
__label__ = 16;
break _4;
}
}
}
}
else{
	if(r5 ==0) //_LBB463_11
{
	f3 = heapFloat[(r0+11)];
__label__ = 16;
break _4;
}
else{
	if(r5 ==1) //_LBB463_12
{
	f3 = heapFloat[(r0+11)];
__label__ = 16;
}
else{
	r5 = (r5 + -4)|0;
	if(uint(r5) <uint(2)) //_LBB463_15
{
	f3 = heapFloat[(r0+11)];
__label__ = 16;
}
else{
__label__ = 15;
}
}
}
}
} while(0);
if (__label__ == 15){
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+11)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	f3 = f_g0;
	f0 = heapFloat[(r2+2)];
	f2 = heapFloat[(r2+1)];
	f1 = heapFloat[(fp+-8)];
}
	r0 = sp + -16;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	_ZNK13btConvexShape44localGetSupportVertexWithoutMarginNonVirtualERK9btVector3(i7);
	r0 = r0 >> 2;
	f1 = f1*f3;
	f4 = heapFloat[(fp+-4)];
	f5 = heapFloat[(r0+2)];
	f6 = heapFloat[(r0+1)];
	f2 = f2*f3;
	r0 = r3 >> 2;
	f1 = f4+f1;
	f0 = f0*f3;
	f2 = f6+f2;
	heapFloat[(r0)] = f1;
	f0 = f5+f0;
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
}