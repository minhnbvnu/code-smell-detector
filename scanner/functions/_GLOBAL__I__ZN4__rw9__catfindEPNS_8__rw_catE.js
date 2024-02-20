function _GLOBAL__I__ZN4__rw9__catfindEPNS_8__rw_catE(sp)
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
	var r8;
	var r9;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = _ZN4__rwL12__rw_catlistE_2E_0;
	r1 = _ZN4__rwL12__rw_catlistE_2E_1;
	r0 = r0 >> 2;
	r2 = _ZN4__rwL12__rw_catlistE_2E_2;
	r1 = r1 >> 2;
	heap32[(r0)] = 0;
	r2 = r2 >> 2;
	heap32[(r1)] = 0;
	heap32[(r2)] = 0;
	heap32[(g0)] = 136;
	_Znwj(i7);
	r3 = r_g0;
if(!(r3 !=0)) //_LBB695_3
{
	heap32[(g0)] = 3;
	_ZN4__rw10__rw_throwEiz(i7);
}
	r4 = (r3 + 136)|0;
	heap32[(g0)] = 0;
	_ZdlPv(i7);
	r5 = heap32[(r0)];
	if(r5 ==0) //_LBB695_6
{
	r8 = r3;
}
else{
	r6 = r5;
	r7 = r3;
_9: while(true){
	r9 = r6 >> 2;
	r6 = (r6 + 4)|0;
	r8 = (r7 + 4)|0;
	r7 = r7 >> 2;
	r9 = heap32[(r9)];
	heap32[(r7)] = r9;
	r7 = r8;
	if(r6 !=0) //_LBB695_7
{
continue _9;
}
else{
break _9;
}
}
}
	r6 = 0;
_12: while(true){
	r7 = r6 << 2;
	r7 = (r8 + r7)|0;
	r6 = (r6 + 1)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = 0;
	if(r6 !=2) //_LBB695_9
{
continue _12;
}
else{
break _12;
}
}
	r6 = heap32[(r1)];
	if(r6 ==0) //_LBB695_12
{
	r6 = (r8 + 8)|0;
	heap32[(r0)] = r3;
	heap32[(r1)] = r6;
	heap32[(r2)] = r4;
	heap32[(g0)] = r5;
	_ZdlPv(i7);
	return;
}
else{
	abort(i7);
}
}