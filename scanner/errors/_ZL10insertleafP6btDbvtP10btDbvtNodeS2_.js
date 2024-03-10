function _ZL10insertleafP6btDbvtP10btDbvtNodeS2_(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+2)];
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
	if(r2 !=0) //_LBB80_2
{
	r2 = heap32[(fp+1)];
	r3 = r2 >> 2;
	r3 = heap32[(r3+10)];
	if(r3 !=0) //_LBB80_4
{
	r4 = r1 >> 2;
	f0 = heapFloat[(r4+2)];
	f1 = heapFloat[(r4+6)];
	f2 = heapFloat[(r4+1)];
	f3 = heapFloat[(r4+5)];
	f4 = heapFloat[(r4)];
	f5 = heapFloat[(r4+4)];
	f0 = f0+f1;
	f1 = f2+f3;
	f2 = f4+f5;
_5: while(true){
	r4 = r2 >> 2;
	r4 = heap32[(r4+9)];
	r4 = r4 >> 2;
	f3 = heapFloat[(r4)];
	f4 = heapFloat[(r4+4)];
	f5 = heapFloat[(r4+2)];
	f6 = heapFloat[(r4+6)];
	f7 = heapFloat[(r4+1)];
	f8 = heapFloat[(r4+5)];
	f3 = f3+f4;
	f4 = f5+f6;
	f5 = f7+f8;
	f3 = f2-f3;
	f4 = f0-f4;
	f5 = f1-f5;
	f6 =                         0;
	if(f3 <f6) //_LBB80_7
{
	f3 = -f3;
}
	if(f5 <f6) //_LBB80_10
{
	f5 = -f5;
}
	f3 = f3+f5;
	if(f4 <f6) //_LBB80_13
{
	f4 = -f4;
}
	r3 = r3 >> 2;
	f5 = heapFloat[(r3)];
	f7 = heapFloat[(r3+4)];
	f8 = heapFloat[(r3+2)];
	f9 = heapFloat[(r3+6)];
	f10 = heapFloat[(r3+1)];
	f11 = heapFloat[(r3+5)];
	f5 = f5+f7;
	f7 = f8+f9;
	f8 = f10+f11;
	f5 = f2-f5;
	f3 = f3+f4;
	f4 = f0-f7;
	f7 = f1-f8;
	if(f5 <f6) //_LBB80_16
{
	f5 = -f5;
}
	if(f7 <f6) //_LBB80_19
{
	f7 = -f7;
}
	f5 = f5+f7;
	if(f4 <f6) //_LBB80_22
{
	f4 = -f4;
}
	f4 = f5+f4;
	r3 = f3 >= f4;
	r3 = r3 & 1;
	r3 = r3 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2+9)];
	r3 = r2 >> 2;
	r3 = heap32[(r3+10)];
if(!(r3 !=0)) //_LBB80_5
{
break _5;
}
}
}
	r3 = r2 >> 2;
	r4 = heap32[(r0+1)];
	r5 = heap32[(r3+8)];
	if(r4 ==0) //_LBB80_26
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r6 = heap32[(r4)];
	r6 = (r6 + 1)|0;
	heap32[(r4)] = r6;
	heap32[(g0)] = 63;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB80_28
{
	r6 = 0;
	r7 = (r4 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r4 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r4;
	r4 = r7;
}
}
else{
	heap32[(r0+1)] = 0;
}
	r6 = r4 >> 2;
	heap32[(r6+8)] = r5;
	heap32[(r6+9)] = 0;
	heap32[(r6+10)] = 0;
	r7 = r1 >> 2;
	f0 = heapFloat[(r7)];
	f1 = heapFloat[(r3)];
	f0 = f0 < f1 ? f0 : f1;
	heapFloat[(r6)] = f0;
	f0 = heapFloat[(r7+4)];
	f1 = heapFloat[(r3+4)];
	f0 = f0 > f1 ? f0 : f1;
	heapFloat[(r6+4)] = f0;
	f0 = heapFloat[(r7+1)];
	f1 = heapFloat[(r3+1)];
	f0 = f0 < f1 ? f0 : f1;
	heapFloat[(r6+1)] = f0;
	f0 = heapFloat[(r7+5)];
	f1 = heapFloat[(r3+5)];
	f0 = f0 > f1 ? f0 : f1;
	heapFloat[(r6+5)] = f0;
	f0 = heapFloat[(r7+2)];
	f1 = heapFloat[(r3+2)];
	f0 = f0 < f1 ? f0 : f1;
	heapFloat[(r6+2)] = f0;
	f0 = heapFloat[(r7+6)];
	f1 = heapFloat[(r3+6)];
	f0 = f0 > f1 ? f0 : f1;
	heapFloat[(r6+6)] = f0;
_31: do {
	if(r5 ==0) //_LBB80_38
{
	heap32[(r6+9)] = r2;
	heap32[(r3+8)] = r4;
	heap32[(r6+10)] = r1;
	heap32[(r7+8)] = r4;
	heap32[(r0)] = r4;
}
else{
	r0 = heap32[(r3+8)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+10)];
	r0 = r0 == r2;
	r0 = r0 & 1;
	r0 = r0 << 2;
	r0 = (r5 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0+9)] = r4;
	heap32[(r6+9)] = r2;
	heap32[(r3+8)] = r4;
	heap32[(r6+10)] = r1;
	heap32[(r7+8)] = r4;
	f0 = heapFloat[(r6)];
_34: while(true){
	r0 = r5;
	r1 = r0 >> 2;
	f1 = heapFloat[(r1)];
if(!(f1 >f0)) //_LBB80_37
{
	r2 = r4 >> 2;
	f0 = heapFloat[(r1+1)];
	f1 = heapFloat[(r2+1)];
if(!(f0 >f1)) //_LBB80_37
{
	f0 = heapFloat[(r1+2)];
	f1 = heapFloat[(r2+2)];
if(!(f0 >f1)) //_LBB80_37
{
	f0 = heapFloat[(r1+4)];
	f1 = heapFloat[(r2+4)];
if(!(f0 <f1)) //_LBB80_37
{
	f0 = heapFloat[(r1+5)];
	f1 = heapFloat[(r2+5)];
if(!(f0 <f1)) //_LBB80_37
{
	f0 = heapFloat[(r1+6)];
	f1 = heapFloat[(r2+6)];
	if(f0 >=f1) //_LBB80_39
{
break _31;
}
}
}
}
}
}
	r2 = heap32[(r1+10)];
	r3 = heap32[(r1+9)];
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r3)];
	f1 = heapFloat[(r2)];
	f0 = f0 < f1 ? f0 : f1;
	heapFloat[(r1)] = f0;
	f1 = heapFloat[(r3+4)];
	f2 = heapFloat[(r2+4)];
	f1 = f1 > f2 ? f1 : f2;
	heapFloat[(r1+4)] = f1;
	f1 = heapFloat[(r3+1)];
	f2 = heapFloat[(r2+1)];
	f1 = f1 < f2 ? f1 : f2;
	heapFloat[(r1+1)] = f1;
	f1 = heapFloat[(r3+5)];
	f2 = heapFloat[(r2+5)];
	f1 = f1 > f2 ? f1 : f2;
	heapFloat[(r1+5)] = f1;
	f1 = heapFloat[(r3+2)];
	f2 = heapFloat[(r2+2)];
	f1 = f1 < f2 ? f1 : f2;
	heapFloat[(r1+2)] = f1;
	f1 = heapFloat[(r3+6)];
	f2 = heapFloat[(r2+6)];
	f1 = f1 > f2 ? f1 : f2;
	heapFloat[(r1+6)] = f1;
	r5 = heap32[(r1+8)];
	r4 = r0;
	if(r5 ==0) //_LBB80_39
{
break _31;
}
}
}
} while(0);
	return;
}
else{
	r2 = r1 >> 2;
	heap32[(r0)] = r1;
	heap32[(r2+8)] = 0;
	return;
}
}