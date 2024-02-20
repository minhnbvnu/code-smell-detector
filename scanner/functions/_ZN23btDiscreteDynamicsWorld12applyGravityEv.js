function _ZN23btDiscreteDynamicsWorld12applyGravityEv(sp)
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
	r0 = r0 >> 2;
	r1 = heap32[(r0+52)];
if(!(r1 <1)) //_LBB668_7
{
	r1 = 0;
_3: while(true){
	r2 = heap32[(r0+54)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+54)];
if(!(r4 ==2)) //_LBB668_6
{
if(!(r4 ==5)) //_LBB668_6
{
	r2 = heapU8[r2+204];
	r2 = r2 & 3;
if(!(r2 !=0)) //_LBB668_6
{
	f0 = heapFloat[(r3+89)];
	f1 = heapFloat[(r3+85)];
	f0 = f0*f1;
	f1 = heapFloat[(r3+101)];
	f2 = heapFloat[(r3+91)];
	f3 = heapFloat[(r3+87)];
	f4 = heapFloat[(r3+90)];
	f5 = heapFloat[(r3+86)];
	f0 = f1+f0;
	heapFloat[(r3+101)] = f0;
	f0 = f4*f5;
	f1 = heapFloat[(r3+102)];
	f0 = f1+f0;
	heapFloat[(r3+102)] = f0;
	f0 = f2*f3;
	f1 = heapFloat[(r3+103)];
	f0 = f1+f0;
	heapFloat[(r3+103)] = f0;
}
}
}
	r1 = (r1 + 1)|0;
	r2 = heap32[(r0+52)];
	if(r2 >r1) //_LBB668_2
{
continue _3;
}
else{
break _3;
}
}
}
	return;
}