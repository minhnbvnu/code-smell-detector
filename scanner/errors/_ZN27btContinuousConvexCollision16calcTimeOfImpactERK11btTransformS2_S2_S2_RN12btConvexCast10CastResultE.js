if(!(r15 ==0)) //_LBB534_12
{
	r16 = r15 >> 2;
	r16 = heap32[(r16)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+5)];
	r17 = sp + -64;
	r19 = r17 >> 2;
	heap32[(fp+-16)] = 1065353216;
	heap32[(r19+1)] = 0;
	heap32[(r19+2)] = 0;
	heap32[(r19+3)] = 0;
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = 1045220557;
	heap32[(g0+3)] = r17;
	__FUNCTION_TABLE__[(r16)>>2](i7);
}
	if(r14 !=0) //_LBB534_14
{
	f20 = heapFloat[(r15+9)];
	if(f20 >=f6) //_LBB534_17
{
	f6 = heapFloat[(r15+5)];
	heapFloat[(fp+-32)] = f6;
	f10 = heapFloat[(r15+6)];
	heapFloat[(r10+1)] = f10;
	f13 = heapFloat[(r15+7)];
	heapFloat[(r10+2)] = f13;
	f14 = heapFloat[(r15+8)];
	heapFloat[(r10+3)] = f14;
	f15 = heapFloat[(r15+1)];
	f16 = heapFloat[(r15+2)];
	f17 = heapFloat[(r15+3)];
	f21 = heapFloat[(r15+4)];
	heap32[(fp+-142)] = r9;
	f9 = f19;
}
else{
__label__ = 14;
break _4;
}
}
else{
__label__ = 15;
break _4;
}