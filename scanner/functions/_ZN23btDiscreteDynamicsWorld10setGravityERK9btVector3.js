function _ZN23btDiscreteDynamicsWorld10setGravityERK9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	heap32[(r0+56)] = heap32[(r1)];
	heap32[(r0+57)] = heap32[(r1+1)];
	heap32[(r0+58)] = heap32[(r1+2)];
	heap32[(r0+59)] = heap32[(r1+3)];
	r2 = heap32[(r0+52)];
if(!(r2 <1)) //_LBB661_9
{
	r2 = 0;
_3: while(true){
	r3 = heap32[(r0+54)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+54)];
if(!(r5 ==2)) //_LBB661_8
{
if(!(r5 ==5)) //_LBB661_8
{
	r3 = heapU8[r3+496];
	r3 = r3 & 1;
if(!(r3 != 0)) //_LBB661_8
{
	f0 = heapFloat[(r4+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB661_7
{
	f1 =                         1;
	f0 = f1/f0;
	f1 = heapFloat[(r1+2)];
	f2 = heapFloat[(r1+1)];
	f3 = heapFloat[(r1)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r4+89)] = f3;
	f0 = f1*f0;
	heapFloat[(r4+90)] = f2;
	heapFloat[(r4+91)] = f0;
	heap32[(r4+92)] = 0;
}
	heap32[(r4+93)] = heap32[(r1)];
	heap32[(r4+94)] = heap32[(r1+1)];
	heap32[(r4+95)] = heap32[(r1+2)];
	heap32[(r4+96)] = heap32[(r1+3)];
}
}
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r0+52)];
	if(r3 >r2) //_LBB661_2
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