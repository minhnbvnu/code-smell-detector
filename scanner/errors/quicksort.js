function quicksort(sp)
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
	var r16;
	var r17;
	var r18;
	var r19;
	var r20;
	var r21;
	var r22;
	var r23;
	var r24;
	var r25;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	heap32[(fp+-4)] = r0;
	r1 = heap32[(fp+1)];
	heap32[(fp+-3)] = r1;
if(!(r0 <=r1)) //_LBB737_37
{
	r0 = heap32[(fp)];
	r1 = heap32[(fp+3)];
	r2 = 4;
	r3 = heap32[(fp+-4)];
	r4 = r3 << 2;
	r5 = (r0 + r4)|0;
	r6 = -4;
	r7 = -8;
	r2 = (r2 - r0)|0;
	r3 = (r3 + -1)|0;
	r8 = (r0 + 4)|0;
	r6 = (r6 - r0)|0;
	heap32[(fp+-1)] = r6;
	r6 = (r5 + -4)|0;
	heap32[(fp+-2)] = r6;
	r6 = (r7 - r0)|0;
	r2 = (r2 - r4)|0;
	heap32[(fp+-6)] = r2;
_3: while(true){
	r2 = heap32[(fp+-3)];
	r4 = (r2 + -1)|0;
	r7 = (r2 + 1)|0;
	r9 = -1;
	r10 = -2;
	heap32[(fp+-5)] = r2;
	r2 = heap32[(fp+-4)];
	r11 = r4;
_5: while(true){
	r12 = r4 << 2;
	r13 = (r0 + r12)|0;
	r14 = (r12 + 4)|0;
	r15 = heap32[(fp+-1)];
	r15 = (r15 - r12)|0;
	r16 = (r8 + r12)|0;
	r12 = (r6 - r12)|0;
_7: while(true){
	r17 = r12;
	r18 = r16;
	r19 = r15;
	r20 = r14;
	r21 = r4;
	r22 = r13;
	if(r3 ==r21) //_LBB737_6
{
break _7;
}
else{
	r4 = (r0 + r20)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	r13 = (r22 + 4)|0;
	r4 = (r21 + 1)|0;
	r14 = (r20 + 4)|0;
	r15 = (r19 + -4)|0;
	r16 = (r18 + 4)|0;
	r12 = (r17 + -4)|0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r23 = r_g0;
if(!(r23 <0)) //_LBB737_4
{
break _7;
}
}
}
	r4 = r2 << 2;
	r12 = (r0 + r4)|0;
	r13 = 0;
	r14 = (r13 - r12)|0;
	r4 = (r21 + 1)|0;
	r15 = (r12 + -4)|0;
	r16 = r14;
_11: while(true){
	r23 = r14;
	r24 = r16;
	r25 = r2;
	r2 = (r15 + r13)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	r13 = (r13 + -4)|0;
	r2 = (r25 + -1)|0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r14 = r_g0;
	if(r14 >-1) //_LBB737_9
{
break _11;
}
else{
	r16 = (r24 + 4)|0;
	r14 = (r23 + 4)|0;
if(!(r7 !=r25)) //_LBB737_7
{
break _11;
}
}
}
	if(r4 >=r2) //_LBB737_20
{
break _5;
}
else{
	r17 = 0;
_16: while(true){
	r22 = (r17 - r19)|0;
	r14 = (r17 - r24)|0;
	r15 = heapU8[r22];
	r14 = heapU8[r14+-4];
	r16 = (r17 + 1)|0;
	r17 = (r17 - r23)|0;
	heap8[r22] = r14;
	heap8[r17+-4] = r15;
	r17 = r16;
if(!(r16 !=4)) //_LBB737_11
{
break _16;
}
}
	r17 = (r0 + r20)|0;
	heap32[(g0)] = r17;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r17 = r_g0;
_19: do {
	if(r17 ==0) //_LBB737_14
{
	r17 = r11 << 2;
	r11 = (r11 + 1)|0;
	r17 = (r8 + r17)|0;
	r22 = 0;
_21: while(true){
	r14 = (r18 - r22)|0;
	r15 = (r17 - r22)|0;
	r16 = heapU8[r15];
	r19 = heapU8[r14];
	r22 = (r22 + -1)|0;
	heap8[r15] = r19;
	heap8[r14] = r16;
if(!(r22 !=-4)) //_LBB737_15
{
break _19;
}
}
}
} while(0);
	r17 = (r12 + r13)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r17;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r17 = r_g0;
if(!(r17 !=0)) //_LBB737_3
{
	r4 = (r21 + 1)|0;
	r17 = 0;
_25: while(true){
	r18 = heap32[(fp+-2)];
	r18 = (r17 + r18)|0;
	r21 = r10 << 2;
	r18 = (r18 - r21)|0;
	r21 = (r17 + r12)|0;
	r21 = heapU8[r21+r13];
	r22 = heapU8[r18+-8];
	r14 = (r17 + r12)|0;
	r17 = (r17 + 1)|0;
	heap8[r14+r13] = r22;
	heap8[r18+-8] = r21;
	if(r17 ==4) //_LBB737_18
{
break _25;
}
}
	r10 = (r10 + 1)|0;
	r9 = (r9 + 1)|0;
}
}
}
	r2 = heap32[(fp+-4)];
	r2 = (r2 - r10)|0;
	r4 = 0;
	r2 = (r2 + -2)|0;
	r7 = (r4 - r22)|0;
_29: while(true){
	r12 = (r5 - r4)|0;
	r13 = (r18 - r4)|0;
	r14 = heapU8[r13];
	r15 = heapU8[r12];
	r4 = (r4 + -1)|0;
	heap8[r13] = r15;
	heap8[r12] = r14;
if(!(r4 !=-4)) //_LBB737_21
{
break _29;
}
}
	r4 = (r21 + 2)|0;
	r12 = heap32[(fp+-3)];
	if(r12 <r11) //_LBB737_24
{
	r13 = r12 << 2;
	r14 = 0;
	r13 = (r0 + r13)|0;
	r13 = (r14 - r13)|0;
	r12 = (r11 - r12)|0;
_34: while(true){
	r15 = r14;
_36: while(true){
	r16 = (r15 - r7)|0;
	r18 = (r15 - r13)|0;
	r19 = heapU8[r18];
	r20 = heapU8[r16];
	r15 = (r15 + 1)|0;
	heap8[r18] = r20;
	heap8[r16] = r19;
if(!(r15 !=4)) //_LBB737_26
{
break _36;
}
}
	r12 = (r12 + -1)|0;
	r13 = (r13 + -4)|0;
	r7 = (r7 + 4)|0;
if(!(r12 !=0)) //_LBB737_25
{
break _34;
}
}
	r7 = heap32[(fp+-3)];
	r7 = (r7 - r11)|0;
	r7 = (r7 + r21)|0;
}
else{
	r7 = r21;
}
	if(r3 >r2) //_LBB737_35
{
	r2 = heap32[(fp+-6)];
_44: while(true){
	r4 = 0;
_46: while(true){
	r11 = (r4 - r2)|0;
	r12 = (r4 - r17)|0;
	r13 = heapU8[r12];
	r14 = heapU8[r11];
	r4 = (r4 + 1)|0;
	heap8[r12] = r14;
	heap8[r11] = r13;
if(!(r4 !=4)) //_LBB737_30
{
break _46;
}
}
	r9 = (r9 + -1)|0;
	r17 = (r17 + -4)|0;
	r2 = (r2 + 4)|0;
if(!(r9 !=0)) //_LBB737_29
{
break _44;
}
}
	r2 = (r10 + r21)|0;
	r2 = (r2 + 3)|0;
	heap32[(fp+-3)] = r2;
}
else{
	heap32[(fp+-3)] = r4;
}
	heap32[(g0)] = r0;
	r2 = heap32[(fp+-5)];
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r1;
	quicksort(i7);
	r4 = heap32[(fp+-3)];
	r2 = heap32[(fp+-4)];
	if(r4 <r2) //_LBB737_2
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