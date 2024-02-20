function _ZN16btCollisionWorld25serializeCollisionObjectsEP12btSerializer(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
if(!(r1 <1)) //_LBB235_110
{
	r1 = heap32[(fp+1)];
	heap32[(fp+-2)] = r1;
	r1 = 0;
_3: while(true){
	r2 = heap32[(r0+4)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+58)];
if(!(r4 !=1)) //_LBB235_4
{
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+6)];
	heap32[(g0)] = r2;
	r2 = heap32[(fp+-2)];
	heap32[(g0+1)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	r1 = (r1 + 1)|0;
	r2 = heap32[(r0+2)];
if(!(r2 >r1)) //_LBB235_2
{
break _3;
}
}
if(!(r2 <1)) //_LBB235_110
{
	r1 = 0;
	r2 = r1;
	r3 = r1;
	r4 = r1;
	r5 = r1;
	r6 = r1;
	heap32[(fp+-1)] = r1;
	r7 = r1;
	r8 = r1;
	r9 = r1;
	r10 = r1;
	r11 = r1;
	r12 = r1;
_10: while(true){
	r13 = heap32[(r0+4)];
	r14 = r12 << 2;
	r13 = (r13 + r14)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+48)];
	r14 = r13 << 15;
	r14 = r14 ^ -1;
	r14 = (r13 + r14)|0;
	r15 = r14 >> 10;
	r14 = r15 ^ r14;
	r14 = (r14 * 9)|0;
	r15 = r14 >> 6;
	r14 = r15 ^ r14;
	r15 = r14 << 11;
	r15 = r15 ^ -1;
	r14 = (r14 + r15)|0;
	r15 = r14 >> 16;
	r14 = r15 ^ r14;
	r15 = (r4 + -1)|0;
	r15 = r14 & r15;
	r12 = (r12 + 1)|0;
_12: do {
	if(uint(r10) <=uint(r15)) //_LBB235_20
{
__label__ = 19;
}
else{
	r16 = r15 << 2;
	r17 = (r8 + r16)|0;
_14: while(true){
	r17 = r17 >> 2;
	r17 = heap32[(r17)];
	if(r17 ==-1) //_LBB235_14
{
__label__ = 13;
break _14;
}
else{
	r18 = r17 << 3;
	r18 = (r11 + r18)|0;
	r18 = r18 >> 2;
	r18 = heap32[(r18)];
	if(r13 !=r18) //_LBB235_9
{
	r17 = r17 << 2;
	r17 = (r6 + r17)|0;
}
else{
__label__ = 12;
break _14;
}
}
}
if (__label__ == 12){
	r17 = r17 << 2;
	r17 = (r3 + r17)|0;
if(!(r17 ==0)) //_LBB235_14
{
__label__ = 89;
break _12;
}
}
	if(uint(r10) <=uint(r15)) //_LBB235_20
{
__label__ = 19;
}
else{
	r16 = (r8 + r16)|0;
_22: while(true){
	r16 = r16 >> 2;
	r16 = heap32[(r16)];
	if(r16 ==-1) //_LBB235_20
{
__label__ = 19;
break _12;
}
else{
	r17 = r16 << 3;
	r17 = (r11 + r17)|0;
	r17 = r17 >> 2;
	r17 = heap32[(r17)];
	if(r13 !=r17) //_LBB235_16
{
	r16 = r16 << 2;
	r16 = (r6 + r16)|0;
}
else{
break _22;
}
}
}
	r14 = r16 << 2;
	r14 = (r3 + r14)|0;
	r14 = r14 >> 2;
	heap32[(r14)] = r13;
	r16 = r4;
	r17 = r5;
__label__ = 88;
}
}
} while(0);
if (__label__ == 19){
	if(r4 ==r5) //_LBB235_22
{
	r16 = 1;
	r17 = r5 << 1;
	r16 = r5 == 0 ? r16 : r17;
	if(r4 >=r16) //_LBB235_21
{
__label__ = 20;
}
else{
	if(r16 !=0) //_LBB235_25
{
	r17 = gNumAlignedAllocs;
	r17 = r17 >> 2;
	r18 = heap32[(r17)];
	r19 = r16 << 2;
	r18 = (r18 + 1)|0;
	r19 = r19 | 3;
	heap32[(r17)] = r18;
	r17 = (r19 + 16)|0;
	heap32[(g0)] = r17;
	malloc(i7);
	r17 = r_g0;
	if(r17 !=0) //_LBB235_27
{
	r18 = 0;
	r19 = (r17 + 4)|0;
	r18 = (r18 - r19)|0;
	r18 = r18 & 15;
	r18 = (r17 + r18)|0;
	r19 = (r18 + 4)|0;
	r18 = r18 >> 2;
	heap32[(r18)] = r17;
	r17 = r19;
}
}
else{
	r17 = 0;
}
_37: do {
if(!(r5 <1)) //_LBB235_31
{
	r18 = r17;
	r19 = r3;
	r20 = r5;
_39: while(true){
	r21 = r19 >> 2;
	r20 = (r20 + -1)|0;
	r19 = (r19 + 4)|0;
	r22 = (r18 + 4)|0;
	r18 = r18 >> 2;
	r21 = heap32[(r21)];
	heap32[(r18)] = r21;
	r18 = r22;
if(!(r20 !=0)) //_LBB235_30
{
break _37;
}
}
}
} while(0);
	if(r3 !=0) //_LBB235_33
{
	r18 = gNumAlignedFree;
	r18 = r18 >> 2;
	r19 = heap32[(r18)];
	r19 = (r19 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r18)] = r19;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
	r3 = r17;
__label__ = 32;
}
else{
	r3 = r17;
__label__ = 32;
}
}
}
else{
__label__ = 20;
}
if (__label__ == 20){
	r16 = r4;
}
	r18 = r5 << 2;
	r19 = (r3 + r18)|0;
	r17 = (r5 + 1)|0;
	r19 = r19 >> 2;
	heap32[(r19)] = r13;
	if(r1 ==r2) //_LBB235_36
{
	r19 = 1;
	r20 = r2 << 1;
	r19 = r2 == 0 ? r19 : r20;
if(!(r1 >=r19)) //_LBB235_35
{
	if(r19 !=0) //_LBB235_39
{
	r1 = gNumAlignedAllocs;
	r1 = r1 >> 2;
	r20 = heap32[(r1)];
	r21 = r19 << 3;
	r20 = (r20 + 1)|0;
	r21 = r21 | 3;
	heap32[(r1)] = r20;
	r1 = (r21 + 16)|0;
	heap32[(g0)] = r1;
	malloc(i7);
	r20 = r_g0;
	if(r20 !=0) //_LBB235_41
{
	r1 = 0;
	r21 = (r20 + 4)|0;
	r1 = (r1 - r21)|0;
	r1 = r1 & 15;
	r1 = (r20 + r1)|0;
	r21 = (r1 + 4)|0;
	r1 = r1 >> 2;
	heap32[(r1)] = r20;
	r20 = r21;
}
}
else{
	r20 = 0;
}
_56: do {
if(!(r2 <1)) //_LBB235_45
{
	r1 = (r11 + 4)|0;
	r21 = (r20 + 4)|0;
	r22 = r2;
_58: while(true){
	r23 = r1 >> 2;
	r24 = heap32[(r23)];
	r23 = heap32[(r23+-1)];
	r25 = r21 >> 2;
	r22 = (r22 + -1)|0;
	r1 = (r1 + 8)|0;
	r21 = (r21 + 8)|0;
	heap32[(r25+-1)] = r23;
	heap32[(r25)] = r24;
if(!(r22 !=0)) //_LBB235_44
{
break _56;
}
}
}
} while(0);
	if(r11 !=0) //_LBB235_47
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r21 = heap32[(r1)];
	r21 = (r21 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r1)] = r21;
	r1 = heap32[(r11+-1)];
	heap32[(g0)] = r1;
	free(i7);
	r1 = r19;
	r11 = r20;
}
else{
	r1 = r19;
	r11 = r20;
}
}
}
	r19 = r2 << 3;
	r19 = (r11 + r19)|0;
	r2 = (r2 + 1)|0;
	r19 = r19 >> 2;
	heap32[(r19)] = r13;
	if(r4 <r16) //_LBB235_50
{
	if(r10 <r16) //_LBB235_52
{
_69: do {
	if(r10 <=r16) //_LBB235_54
{
	if(r9 <r16) //_LBB235_56
{
	if(r16 !=0) //_LBB235_58
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r9 = heap32[(r4)];
	r15 = r16 << 2;
	r9 = (r9 + 1)|0;
	r15 = r15 | 3;
	heap32[(r4)] = r9;
	r4 = (r15 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB235_60
{
	r9 = 0;
	r15 = (r4 + 4)|0;
	r9 = (r9 - r15)|0;
	r9 = r9 & 15;
	r9 = (r4 + r9)|0;
	r15 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r4;
	r4 = r15;
}
}
else{
	r4 = 0;
}
_78: do {
if(!(r10 <1)) //_LBB235_64
{
	r9 = r4;
	r15 = r8;
	r19 = r10;
_80: while(true){
	r20 = r15 >> 2;
	r19 = (r19 + -1)|0;
	r15 = (r15 + 4)|0;
	r21 = (r9 + 4)|0;
	r9 = r9 >> 2;
	r20 = heap32[(r20)];
	heap32[(r9)] = r20;
	r9 = r21;
if(!(r19 !=0)) //_LBB235_63
{
break _78;
}
}
}
} while(0);
	if(r8 !=0) //_LBB235_66
{
	r9 = gNumAlignedFree;
	r9 = r9 >> 2;
	r15 = heap32[(r9)];
	r15 = (r15 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r9)] = r15;
	r8 = heap32[(r8+-1)];
	heap32[(g0)] = r8;
	free(i7);
	r8 = r4;
	r9 = r16;
}
else{
	r8 = r4;
	r9 = r16;
}
}
	r4 = r10;
_87: while(true){
	r15 = r4 << 2;
	r15 = (r8 + r15)|0;
	r4 = (r4 + 1)|0;
	r15 = r15 >> 2;
	heap32[(r15)] = 0;
if(!(r16 !=r4)) //_LBB235_68
{
break _69;
}
}
}
} while(0);
_90: do {
	if(r7 <=r16) //_LBB235_71
{
if(!(r7 >=r16)) //_LBB235_70
{
	r4 = heap32[(fp+-1)];
	if(r4 <r16) //_LBB235_74
{
	if(r16 !=0) //_LBB235_76
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r15 = heap32[(r4)];
	r19 = r16 << 2;
	r15 = (r15 + 1)|0;
	r19 = r19 | 3;
	heap32[(r4)] = r15;
	r4 = (r19 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB235_78
{
	r15 = 0;
	r19 = (r4 + 4)|0;
	r15 = (r15 - r19)|0;
	r15 = r15 & 15;
	r15 = (r4 + r15)|0;
	r19 = (r15 + 4)|0;
	r15 = r15 >> 2;
	heap32[(r15)] = r4;
	r4 = r19;
}
}
else{
	r4 = 0;
}
_100: do {
if(!(r7 <1)) //_LBB235_82
{
	r15 = r4;
	r19 = r6;
	r20 = r7;
_102: while(true){
	r21 = r19 >> 2;
	r20 = (r20 + -1)|0;
	r19 = (r19 + 4)|0;
	r22 = (r15 + 4)|0;
	r15 = r15 >> 2;
	r21 = heap32[(r21)];
	heap32[(r15)] = r21;
	r15 = r22;
if(!(r20 !=0)) //_LBB235_81
{
break _100;
}
}
}
} while(0);
if(!(r6 ==0)) //_LBB235_84
{
	r15 = gNumAlignedFree;
	r15 = r15 >> 2;
	r19 = heap32[(r15)];
	r19 = (r19 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r15)] = r19;
	r6 = heap32[(r6+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	if(r7 <r16) //_LBB235_86
{
	r6 = r4;
	heap32[(fp+-1)] = r16;
}
else{
	r6 = r4;
	heap32[(fp+-1)] = r16;
break _90;
}
}
_111: while(true){
	r4 = r7 << 2;
	r4 = (r6 + r4)|0;
	r7 = (r7 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = 0;
if(!(r16 !=r7)) //_LBB235_87
{
break _90;
}
}
}
}
} while(0);
_114: do {
if(!(r16 <1)) //_LBB235_94
{
	r4 = r8;
	r7 = r16;
_116: while(true){
	r7 = (r7 + -1)|0;
	r15 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = -1;
	r4 = r15;
if(!(r7 !=0)) //_LBB235_90
{
break _116;
}
}
if(!(r16 <1)) //_LBB235_94
{
	r4 = r6;
	r7 = r16;
_120: while(true){
	r7 = (r7 + -1)|0;
	r15 = (r4 + 4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = -1;
	r4 = r15;
if(!(r7 !=0)) //_LBB235_93
{
break _114;
}
}
}
}
} while(0);
_123: do {
	if(r10 >0) //_LBB235_96
{
	r4 = (r16 + -1)|0;
	r7 = 0;
_125: while(true){
	r15 = r7 << 3;
	r15 = (r11 + r15)|0;
	r15 = r15 >> 2;
	r15 = heap32[(r15)];
	r19 = r15 << 15;
	r19 = r19 ^ -1;
	r15 = (r15 + r19)|0;
	r19 = r15 >> 10;
	r15 = r19 ^ r15;
	r15 = (r15 * 9)|0;
	r19 = r15 >> 6;
	r15 = r19 ^ r15;
	r19 = r15 << 11;
	r19 = r19 ^ -1;
	r15 = (r15 + r19)|0;
	r19 = r15 >> 16;
	r15 = r19 ^ r15;
	r15 = r15 & r4;
	r15 = r15 << 2;
	r15 = (r8 + r15)|0;
	r15 = r15 >> 2;
	r19 = r7 << 2;
	r19 = (r6 + r19)|0;
	r20 = heap32[(r15)];
	r19 = r19 >> 2;
	r21 = (r7 + 1)|0;
	heap32[(r19)] = r20;
	heap32[(r15)] = r7;
	r7 = r21;
	if(r10 ==r21) //_LBB235_95
{
break _123;
}
}
}
} while(0);
	r7 = r16;
	r10 = r16;
}
	r4 = (r16 + -1)|0;
	r15 = r14 & r4;
}
	r4 = r15 << 2;
	r4 = (r8 + r4)|0;
	r4 = r4 >> 2;
	r14 = (r6 + r18)|0;
	r14 = r14 >> 2;
	r15 = heap32[(r4)];
	heap32[(r14)] = r15;
	heap32[(r4)] = r5;
__label__ = 88;
}
if (__label__ == 88){
	r4 = r13 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+14)];
	heap32[(g0)] = r13;
	r5 = heap32[(fp+-2)];
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r16;
	r5 = r17;
}
	r13 = heap32[(r0+2)];
if(!(r13 >r12)) //_LBB235_7
{
break _10;
}
}
if(!(r11 ==0)) //_LBB235_104
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r11 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
if(!(r3 ==0)) //_LBB235_106
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r3 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
if(!(r6 ==0)) //_LBB235_108
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r6 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
if(!(r8 ==0)) //_LBB235_110
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r8 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
}
	return;
}