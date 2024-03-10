function _ZNK10__cxxabiv121__vmi_class_type_info11__do_upcastEPKNS_17__class_type_infoEPKvRNS1_15__upcast_resultE(sp)
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
	var r10;
	var r11;
	var r12;
	var r13;
	var r14;
	var r15;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 >> 2;
	r3 = r1 >> 2;
	r2 = heap32[(r2+1)];
	r4 = heap32[(r3+1)];
	r5 = _2E_str26;
	r2 = r2 == 0 ? r5 : r2;
	r4 = r4 == 0 ? r5 : r4;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	r6 = heap32[(fp+2)];
	r7 = heap32[(fp+3)];
	strcmp(i7);
	r8 = r_g0;
	if(r8 <0) //_LBB837_3
{
__label__ = 3;
}
else{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r2 = r_g0;
	if(r2 <0) //_LBB837_3
{
__label__ = 3;
}
else{
	r0 = r7 >> 2;
	heap32[(r0)] = r6;
	heap32[(r0+3)] = 8;
	heap32[(r0+1)] = 6;
__label__ = 39;
}
}
_4: do {
if (__label__ == 3){
	r2 = r7 >> 2;
	r4 = heap32[(r2+2)];
	r7 = r4 & 16;
	if(r7 !=0) //_LBB837_5
{
	r4 = heap32[(r3+2)];
}
	r3 = heap32[(r3+3)];
	r7 = r4 & 1;
	r3 = (r3 + 1)|0;
_9: while(true){
	if(r3 !=1) //_LBB837_7
{
	r8 = sp + -16;
	r9 = r8 >> 2;
	heap32[(fp+-4)] = 0;
	r10 = r3 << 3;
	heap32[(r9+1)] = 0;
	r10 = (r1 + r10)|0;
	heap32[(r9+2)] = r4;
	r10 = r10 >> 2;
	heap32[(r9+3)] = 0;
	r10 = heap32[(r10+1)];
	r11 = r10 & 2;
	if(r7 !=0) //_LBB837_10
{
__label__ = 9;
}
else{
	r12 = r11 >>> 1;
	if(r12 != 0) //_LBB837_10
{
__label__ = 9;
}
else{
__label__ = 8;
}
}
if (__label__ == 9){
	r12 = r3 << 1;
	r13 = r10 & 1;
	if(r6 !=0) //_LBB837_12
{
	r10 = r10 >> 8;
	if(r13 != 0) //_LBB837_14
{
	r14 = r6 >> 2;
	r14 = heap32[(r14)];
	r10 = (r14 + r10)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
}
	r10 = (r6 + r10)|0;
}
else{
	r10 = 0;
}
	r12 = r12 << 2;
	r12 = (r1 + r12)|0;
	r12 = r12 >> 2;
	r14 = heap32[(r12)];
	r15 = r14 >> 2;
	r15 = heap32[(r15)];
	r15 = r15 >> 2;
	r15 = heap32[(r15+5)];
	heap32[(g0)] = r14;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r8;
	__FUNCTION_TABLE__[(r15)>>2](i7);
	r8 = r_g0;
if(!(r8 ==0)) //_LBB837_9
{
	r8 = heap32[(r9+3)];
if(!(r8 !=8)) //_LBB837_19
{
	if(r13 != 0) //_LBB837_20
{
	r8 = heap32[(r12)];
	heap32[(r9+3)] = r8;
}
}
	r10 = heap32[(r9+1)];
if(!(r10 <4)) //_LBB837_23
{
	if(r11 ==0) //_LBB837_24
{
	r10 = r10 & -3;
	heap32[(r9+1)] = r10;
}
}
	r11 = heap32[(r2+3)];
	if(r11 !=0) //_LBB837_31
{
	r9 = heap32[(r2)];
	r12 = heap32[(fp+-4)];
	if(r9 ==r12) //_LBB837_33
{
	if(r9 ==0) //_LBB837_35
{
	if(r8 ==8) //_LBB837_39
{
__label__ = 35;
break _9;
}
else{
	if(r11 ==8) //_LBB837_39
{
__label__ = 35;
break _9;
}
else{
	r9 = r11 >> 2;
	r8 = r8 >> 2;
	r9 = heap32[(r9+1)];
	r8 = heap32[(r8+1)];
	r9 = r9 == 0 ? r5 : r9;
	r8 = r8 == 0 ? r5 : r8;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r9;
	strcmp(i7);
	r11 = r_g0;
	if(r11 <0) //_LBB837_39
{
__label__ = 35;
break _9;
}
else{
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r8;
	strcmp(i7);
	r8 = r_g0;
	if(r8 >-1) //_LBB837_40
{
	r8 = heap32[(r2+1)];
	r8 = r10 | r8;
	heap32[(r2+1)] = r8;
}
else{
__label__ = 35;
break _9;
}
}
}
}
}
else{
	r8 = heap32[(r2+1)];
	r8 = r10 | r8;
	heap32[(r2+1)] = r8;
}
}
else{
__label__ = 28;
break _9;
}
}
else{
	r11 = heap32[(fp+-4)];
	heap32[(r2)] = r11;
	heap32[(r2+1)] = r10;
	r11 = heap32[(r9+2)];
	heap32[(r2+2)] = r11;
	heap32[(r2+3)] = r8;
	if(r10 <4) //_LBB837_43
{
break _4;
}
else{
	r8 = r10 & 2;
	if(r8 ==0) //_LBB837_29
{
	r8 = r10 & 1;
	if(r8 ==0) //_LBB837_43
{
break _4;
}
else{
	r8 = heapU8[r1+8];
	r8 = r8 & 2;
	if(r8 ==0) //_LBB837_43
{
break _4;
}
}
}
else{
	r8 = heapU8[r1+8];
	r8 = r8 & 1;
	if(r8 ==0) //_LBB837_43
{
break _4;
}
}
}
}
}
}
	r3 = (r3 + -1)|0;
continue _9;
}
else{
__label__ = 38;
break _9;
}
}
switch(__label__ ){//multiple entries
case 38:
	r0 = heap32[(r2+1)];
	r1 = 0;
	r0 = r0 != r1;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
break;
case 28:
	heap32[(r2)] = 0;
break;
}
	heap32[(r2+1)] = 2;
}
} while(0);
	r0 = 1;
	r_g0 = r0;
	return;
}