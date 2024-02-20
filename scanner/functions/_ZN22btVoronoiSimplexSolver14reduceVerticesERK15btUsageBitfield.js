function _ZN22btVoronoiSimplexSolver14reduceVerticesERK15btUsageBitfield(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r3 = heap32[(fp+1)];
	if(r2 >3) //_LBB570_2
{
	r2 = heapU8[r3];
	r4 = r2 & 8;
	if(r4 ==0) //_LBB570_4
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 3;
	_ZN22btVoronoiSimplexSolver12removeVertexEi(i7);
	r2 = heap32[(r1)];
__label__ = 3;
}
else{
__label__ = 5;
}
}
else{
__label__ = 3;
}
if (__label__ == 3){
	if(r2 >2) //_LBB570_7
{
	r2 = heapU8[r3];
__label__ = 5;
}
else{
__label__ = 7;
}
}
if (__label__ == 5){
	r4 = r2 & 4;
	if(r4 ==0) //_LBB570_10
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 2;
	_ZN22btVoronoiSimplexSolver12removeVertexEi(i7);
	r2 = heap32[(r1)];
__label__ = 7;
}
else{
__label__ = 9;
}
}
if (__label__ == 7){
	if(r2 >1) //_LBB570_13
{
	r2 = heapU8[r3];
__label__ = 9;
}
else{
__label__ = 11;
}
}
if (__label__ == 9){
	r4 = r2 & 2;
	if(r4 ==0) //_LBB570_16
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 1;
	_ZN22btVoronoiSimplexSolver12removeVertexEi(i7);
	r2 = heap32[(r1)];
__label__ = 11;
}
else{
__label__ = 13;
}
}
if (__label__ == 11){
	if(r2 <1) //_LBB570_20
{
__label__ = 14;
}
else{
	r2 = heapU8[r3];
__label__ = 13;
}
}
if (__label__ == 13){
	r1 = r2 & 1;
	if(r1 ==0) //_LBB570_21
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	_ZN22btVoronoiSimplexSolver12removeVertexEi(i7);
	return;
}
}
	return;
}