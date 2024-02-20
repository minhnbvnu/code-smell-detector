function _ZNK10btBoxShape8isInsideERK9btVector3f(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	f1 = heapFloat[(fp+2)];
	f2 = heapFloat[(r1+7)];
	f3 = f2+f1;
if(!(f0 >f3)) //_LBB383_6
{
	f2 = -f2;
	f2 = f2-f1;
if(!(f0 <f2)) //_LBB383_6
{
	f0 = heapFloat[(r1+8)];
	f2 = heapFloat[(r0+1)];
	f3 = f0+f1;
if(!(f2 >f3)) //_LBB383_6
{
	f0 = -f0;
	f0 = f0-f1;
if(!(f2 <f0)) //_LBB383_6
{
	f0 = heapFloat[(r1+9)];
	f2 = heapFloat[(r0+2)];
	f3 = f0+f1;
if(!(f2 >f3)) //_LBB383_6
{
	f0 = -f0;
	f0 = f0-f1;
	r0 = f2 >= f0;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
}
}
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}