function _ZN11CFileStdout6fwriteEPKvjj(sp)
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
var __label__ = 0;
	i7 = sp + -16392;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+3)];
	r0 = (r1 * r0)|0;
	if(r0 !=0) //_LBB790_2
{
	r2 = heap32[(fp+1)];
	r3 = sp + -16384;
	r4 = r0;
_3: while(true){
	r5 = heapU8[r2];
	r4 = (r4 + -1)|0;
	r2 = (r2 + 1)|0;
	r6 = (r3 + 1)|0;
	heap8[r3] = r5;
	r3 = r6;
if(!(r4 !=0)) //_LBB790_3
{
break _3;
}
}
	r2 = sp + -16384;
	r0 = (r2 + r0)|0;
}
else{
	r0 = sp + -16384;
}
	r2 = 0;
	heap8[r0] = r2;
	r0 = sp + -16384;
	heap32[(g0)] = r0;
	puts(i7);
	r_g0 = r1;
	return;
}