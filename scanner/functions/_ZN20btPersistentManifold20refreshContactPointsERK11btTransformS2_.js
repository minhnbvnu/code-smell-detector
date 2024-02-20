function _ZN20btPersistentManifold20refreshContactPointsERK11btTransformS2_(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	r3 = (r2 + -1)|0;
	if(r3 >-1) //_LBB558_2
{
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
_3: while(true){
	r5 = (r2 * 69)|0;
	r5 = r5 << 2;
	r5 = (r0 + r5)|0;
	r6 = r3 >> 2;
	r5 = r5 >> 2;
	f0 = heapFloat[(r5+-68)];
	f1 = heapFloat[(r6)];
	f2 = heapFloat[(r5+-67)];
	f3 = heapFloat[(r6+1)];
	f4 = heapFloat[(r6+4)];
	f5 = heapFloat[(r6+5)];
	f1 = f1*f0;
	f3 = f3*f2;
	f6 = heapFloat[(r5+-66)];
	f7 = heapFloat[(r6+2)];
	f8 = heapFloat[(r6+8)];
	f9 = heapFloat[(r6+9)];
	f10 = heapFloat[(r6+6)];
	f4 = f4*f0;
	f5 = f5*f2;
	f1 = f1+f3;
	f3 = f7*f6;
	f7 = heapFloat[(r6+10)];
	f0 = f8*f0;
	f2 = f9*f2;
	f4 = f4+f5;
	f5 = f10*f6;
	f1 = f1+f3;
	f3 = heapFloat[(r6+12)];
	f8 = heapFloat[(r6+14)];
	f9 = heapFloat[(r6+13)];
	f4 = f4+f5;
	f0 = f0+f2;
	f2 = f7*f6;
	f1 = f1+f3;
	f0 = f0+f2;
	f2 = f4+f9;
	heapFloat[(r5+-56)] = f1;
	f0 = f0+f8;
	heapFloat[(r5+-55)] = f2;
	heapFloat[(r5+-54)] = f0;
	heap32[(r5+-53)] = 0;
	r6 = r4 >> 2;
	f0 = heapFloat[(r5+-64)];
	f1 = heapFloat[(r6)];
	f2 = heapFloat[(r5+-63)];
	f3 = heapFloat[(r6+1)];
	f4 = heapFloat[(r6+4)];
	f5 = heapFloat[(r6+5)];
	f1 = f1*f0;
	f3 = f3*f2;
	f6 = heapFloat[(r5+-62)];
	f7 = heapFloat[(r6+2)];
	f8 = heapFloat[(r6+8)];
	f9 = heapFloat[(r6+9)];
	f10 = heapFloat[(r6+6)];
	f4 = f4*f0;
	f5 = f5*f2;
	f1 = f1+f3;
	f3 = f7*f6;
	f7 = heapFloat[(r6+10)];
	f0 = f8*f0;
	f2 = f9*f2;
	f4 = f4+f5;
	f5 = f10*f6;
	f1 = f1+f3;
	f3 = heapFloat[(r6+12)];
	f8 = heapFloat[(r6+14)];
	f9 = heapFloat[(r6+13)];
	f4 = f4+f5;
	f0 = f0+f2;
	f2 = f7*f6;
	f1 = f1+f3;
	f0 = f0+f2;
	f2 = f4+f9;
	heapFloat[(r5+-60)] = f1;
	f0 = f0+f8;
	heapFloat[(r5+-59)] = f2;
	heapFloat[(r5+-58)] = f0;
	heap32[(r5+-57)] = 0;
	f0 = heapFloat[(r5+-55)];
	f1 = heapFloat[(r5+-59)];
	f2 = heapFloat[(r5+-56)];
	f3 = heapFloat[(r5+-60)];
	f2 = f2-f3;
	f3 = heapFloat[(r5+-52)];
	f0 = f0-f1;
	f1 = heapFloat[(r5+-51)];
	f4 = heapFloat[(r5+-54)];
	f5 = heapFloat[(r5+-58)];
	f6 = heapFloat[(r5+-50)];
	f4 = f4-f5;
	f2 = f2*f3;
	f0 = f0*f1;
	f0 = f2+f0;
	f1 = f4*f6;
	f0 = f0+f1;
	heapFloat[(r5+-48)] = f0;
	r6 = heap32[(r5+-32)];
	r2 = (r2 + -1)|0;
	r6 = (r6 + 1)|0;
	heap32[(r5+-32)] = r6;
if(!(r2 !=0)) //_LBB558_3
{
break _3;
}
}
	r2 = heap32[(r1+279)];
}
	r2 = (r2 + -1)|0;
_7: do {
if(!(r2 <0)) //_LBB558_11
{
_8: while(true){
	r3 = r2;
	r2 = (r3 * 69)|0;
	r2 = r2 << 2;
	r2 = (r0 + r2)|0;
	r2 = r2 >> 2;
	f0 = heapFloat[(r2+21)];
	f1 = heapFloat[(r1+280)];
	if(f0 <=f1) //_LBB558_8
{
	f2 = heapFloat[(r2+17)];
	f3 = heapFloat[(r2+18)];
	f4 = heapFloat[(r2+19)];
	f5 = heapFloat[(r2+13)];
	f2 = f2*f0;
	f6 = heapFloat[(r2+14)];
	f3 = f3*f0;
	f7 = heapFloat[(r2+9)];
	f2 = f5-f2;
	f5 = heapFloat[(r2+10)];
	f3 = f6-f3;
	f6 = heapFloat[(r2+15)];
	f0 = f4*f0;
	f2 = f7-f2;
	f3 = f5-f3;
	f4 = heapFloat[(r2+11)];
	f0 = f6-f0;
	f0 = f4-f0;
	f2 = f2*f2;
	f3 = f3*f3;
	f2 = f2+f3;
	f0 = f0*f0;
	f1 = f1*f1;
	f0 = f2+f0;
if(!(f1 >=f0)) //_LBB558_10
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	_ZN20btPersistentManifold18removeContactPointEi(i7);
}
}
else{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	_ZN20btPersistentManifold18removeContactPointEi(i7);
}
	r2 = (r3 + -1)|0;
	if(r3 !=0) //_LBB558_6
{
continue _8;
}
else{
break _7;
}
}
}
} while(0);
	return;
}