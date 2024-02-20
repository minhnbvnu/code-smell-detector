function _ZNK15btTriangleShape8isInsideERK9btVector3f(sp)
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
	var f10;
	var f11;
	var f12;
	var f13;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	f0 = heapFloat[(r1+19)];
	f1 = heapFloat[(r1+15)];
	f2 = heapFloat[(r1+23)];
	f3 = heapFloat[(r1+17)];
	f4 = heapFloat[(r1+13)];
	f5 = heapFloat[(r1+21)];
	f6 = heapFloat[(r1+22)];
	f7 = heapFloat[(r1+14)];
	f8 = heapFloat[(r1+18)];
	f0 = f0-f1;
	f6 = f6-f7;
	f3 = f3-f4;
	f1 = f2-f1;
	f2 = f8-f7;
	f4 = f5-f4;
	f5 = f2*f1;
	f7 = f0*f6;
	f0 = f0*f4;
	f1 = f3*f1;
	f5 = f5-f7;
	f0 = f0-f1;
	f1 = f3*f6;
	f2 = f2*f4;
	f1 = f1-f2;
	f2 = f5*f5;
	f3 = f0*f0;
	f2 = f2+f3;
	f3 = f1*f1;
	f2 = f2+f3;
	heapFloat[(g0)] = f2;
	sqrtf(i7);
	r2 = heap32[(fp+1)];
	f3 =                         1;
	r2 = r2 >> 2;
	f2 = f3/f_g0;
	f4 = f5*f2;
	f5 = heapFloat[(r2)];
	f6 = heapFloat[(r1+13)];
	f0 = f0*f2;
	f7 = heapFloat[(r2+1)];
	f8 = heapFloat[(r1+14)];
	f1 = f1*f2;
	f2 = heapFloat[(r2+2)];
	f9 = heapFloat[(r1+15)];
	f5 = f5*f4;
	f7 = f7*f0;
	f6 = f6*f4;
	f8 = f8*f0;
	f5 = f5+f7;
	f2 = f2*f1;
	f6 = f6+f8;
	f7 = f9*f1;
	f8 = heapFloat[(fp+2)];
	f2 = f5+f2;
	f5 = f6+f7;
	f2 = f2-f5;
	f5 = -f8;
_1: do {
	if(f2 <f5) //_LBB286_2
{
__label__ = 2;
}
else{
	if(f2 <=f8) //_LBB286_3
{
	r3 = 0;
_4: while(true){
	if(r3 <3) //_LBB286_4
{
	r4 = heap32[(r1)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+23)];
	r5 = sp + -32;
	r6 = sp + -16;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r5 >> 2;
	r5 = r6 >> 2;
	f2 = heapFloat[(r4+2)];
	f6 = heapFloat[(r5+2)];
	f7 = heapFloat[(r4+1)];
	f8 = heapFloat[(r5+1)];
	f9 = heapFloat[(fp+-8)];
	f10 = heapFloat[(fp+-4)];
	f2 = f2-f6;
	f6 = f9-f10;
	f7 = f7-f8;
	f8 = f7*f1;
	f9 = f2*f0;
	f2 = f2*f4;
	f10 = f6*f1;
	f8 = f8-f9;
	f2 = f2-f10;
	f6 = f6*f0;
	f7 = f7*f4;
	f6 = f6-f7;
	f7 = f8*f8;
	f9 = f2*f2;
	f7 = f7+f9;
	f9 = f6*f6;
	f7 = f7+f9;
	heapFloat[(g0)] = f7;
	sqrtf(i7);
	f7 = f3/f_g0;
	f9 = heapFloat[(r2)];
	f8 = f8*f7;
	f10 = heapFloat[(fp+-4)];
	f11 = heapFloat[(r2+1)];
	f2 = f2*f7;
	f12 = heapFloat[(r5+1)];
	f9 = f9*f8;
	f11 = f11*f2;
	f13 = heapFloat[(r2+2)];
	f6 = f6*f7;
	f7 = heapFloat[(r5+2)];
	f8 = f10*f8;
	f2 = f12*f2;
	f9 = f9+f11;
	f10 = f13*f6;
	f2 = f8+f2;
	f6 = f7*f6;
	f7 = f9+f10;
	f2 = f2+f6;
	f2 = f7-f2;
	if(f2 <f5) //_LBB286_2
{
__label__ = 2;
break _1;
}
else{
	r3 = (r3 + 1)|0;
}
}
else{
break _4;
}
}
	r0 = 1;
__label__ = 8;
}
else{
__label__ = 2;
}
}
} while(0);
if (__label__ == 2){
	r0 = 0;
}
	r0 = r0 & 255;
	r_g0 = r0;
	return;
}