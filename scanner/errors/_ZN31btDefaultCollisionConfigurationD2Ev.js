function _ZN31btDefaultCollisionConfigurationD2Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV31btDefaultCollisionConfiguration;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heapU8[r0+12];
_1: do {
if(!(r1 ==0)) //_LBB344_13
{
	r1 = heap32[(r2+2)];
	r3 = r1 >> 2;
	r4 = heap32[(r3+2)];
	if(r4 ==0) //_LBB344_3
{
	r1 = heapU8[r1+16];
if(!(r1 !=0)) //_LBB344_6
{
	r1 = heap32[(r3)];
if(!(r1 ==0)) //_LBB344_6
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r4)] = r5;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	heap32[(r3)] = 0;
	heap32[(r3+2)] = 0;
	r1 = heap32[(r2+2)];
	r3 = r1 >> 2;
	r4 = heap32[(r3+2)];
	if(r4 ==0) //_LBB344_8
{
	r1 = heapU8[r1+16];
if(!(r1 !=0)) //_LBB344_11
{
	r1 = heap32[(r3)];
if(!(r1 ==0)) //_LBB344_11
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r4)] = r5;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	heap32[(r3)] = 0;
	heap32[(r3+2)] = 0;
	r1 = heap32[(r2+2)];
	if(r1 ==0) //_LBB344_13
{
break _1;
}
else{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
break _1;
}
}
}
	r0 = _2E_str128;
	r1 = _2E_str1129;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 49;
	_assert(i7);
}
} while(0);
	r1 = heapU8[r0+28];
if(!(r1 ==0)) //_LBB344_19
{
	r1 = heap32[(r2+6)];
	r3 = r1 >> 2;
	r3 = heap32[(r3+4)];
	if(r3 !=0) //_LBB344_16
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r4 = heap32[(r1)];
	r4 = (r4 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r1)] = r4;
	r1 = heap32[(r3+-1)];
	heap32[(g0)] = r1;
	free(i7);
	r1 = heap32[(r2+6)];
}
if(!(r1 ==0)) //_LBB344_19
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r0 = heapU8[r0+20];
if(!(r0 ==0)) //_LBB344_25
{
	r0 = heap32[(r2+4)];
	r1 = r0 >> 2;
	r1 = heap32[(r1+4)];
	if(r1 !=0) //_LBB344_22
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r3 = heap32[(r0)];
	r3 = (r3 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r0)] = r3;
	r0 = heap32[(r1+-1)];
	heap32[(g0)] = r0;
	free(i7);
	r0 = heap32[(r2+4)];
}
if(!(r0 ==0)) //_LBB344_25
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	r0 = heap32[(r2+10)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+10)];
if(!(r0 ==0)) //_LBB344_27
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+11)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+11)];
if(!(r0 ==0)) //_LBB344_29
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+12)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+12)];
if(!(r0 ==0)) //_LBB344_31
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+13)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+13)];
if(!(r0 ==0)) //_LBB344_33
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+14)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+14)];
if(!(r0 ==0)) //_LBB344_35
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+15)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+15)];
if(!(r0 ==0)) //_LBB344_37
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+16)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+16)];
if(!(r0 ==0)) //_LBB344_39
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+18)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+18)];
if(!(r0 ==0)) //_LBB344_41
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+19)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+19)];
if(!(r0 ==0)) //_LBB344_43
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+17)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+17)];
if(!(r0 ==0)) //_LBB344_45
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+21)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+21)];
if(!(r0 ==0)) //_LBB344_47
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+20)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+20)];
if(!(r0 ==0)) //_LBB344_49
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+8)];
if(!(r0 ==0)) //_LBB344_51
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r3 = heap32[(r1)];
	r3 = (r3 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r3;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = heap32[(r2+9)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+9)];
if(!(r0 ==0)) //_LBB344_53
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	return;
}