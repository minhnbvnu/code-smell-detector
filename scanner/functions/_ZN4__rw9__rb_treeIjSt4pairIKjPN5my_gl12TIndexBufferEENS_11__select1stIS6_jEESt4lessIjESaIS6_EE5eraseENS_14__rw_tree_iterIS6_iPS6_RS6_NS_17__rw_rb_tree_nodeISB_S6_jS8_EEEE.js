function _ZN4__rw9__rb_treeIjSt4pairIKjPN5my_gl12TIndexBufferEENS_11__select1stIS6_jEESt4lessIjESaIS6_EE5eraseENS_14__rw_tree_iterIS6_iPS6_RS6_NS_17__rw_rb_tree_nodeISB_S6_jS8_EEEE(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = _ZN5my_glL9m_contextE;
	r0 = r0 >> 2;
	r1 = heap32[(r0+78)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp)];
	if(r1 !=r2) //_LBB864_2
{
	r4 = r2 >> 2;
	r5 = heap32[(r4+3)];
_3: do {
	if(r5 !=0) //_LBB864_6
{
	r6 = r5 >> 2;
	r7 = heap32[(r6+2)];
	if(r7 ==0) //_LBB864_8
{
	r6 = r5;
}
else{
_7: while(true){
	r6 = r7;
	r7 = r6 >> 2;
	r7 = heap32[(r7+2)];
	if(r7 !=0) //_LBB864_9
{
continue _7;
}
else{
break _3;
}
}
}
}
else{
	r6 = heap32[(r4+1)];
	r7 = r6 >> 2;
	r7 = heap32[(r7+3)];
	if(r7 ==r2) //_LBB864_5
{
_11: while(true){
	r8 = r6;
	r7 = r8 >> 2;
	r6 = heap32[(r7+1)];
	r9 = r6 >> 2;
	r9 = heap32[(r9+3)];
if(!(r8 ==r9)) //_LBB864_11
{
break _11;
}
}
	r7 = heap32[(r7+3)];
}
else{
	r7 = 0;
	r8 = r2;
}
	if(r7 ==r6) //_LBB864_15
{
	r6 = r8;
}
}
} while(0);
	r7 = heap32[(r4+2)];
	if(r7 !=0) //_LBB864_18
{
	if(r5 !=0) //_LBB864_20
{
	r8 = r5 >> 2;
	r9 = heap32[(r8+2)];
_22: do {
	if(r9 ==0) //_LBB864_22
{
	r8 = r5;
}
else{
_24: while(true){
	r8 = r9;
	r9 = r8 >> 2;
	r9 = heap32[(r9+2)];
if(!(r9 !=0)) //_LBB864_23
{
break _22;
}
}
}
} while(0);
	r10 = r8 >> 2;
	r5 = heap32[(r10+3)];
	if(r8 !=r2) //_LBB864_26
{
	r9 = r7 >> 2;
	heap32[(r9+1)] = r8;
	r9 = heap32[(r4+2)];
	heap32[(r10+2)] = r9;
	r9 = heap32[(r4+3)];
	if(r9 !=r8) //_LBB864_28
{
	r9 = heap32[(r10+1)];
	if(r5 !=0) //_LBB864_30
{
	r7 = r5 >> 2;
	heap32[(r7+1)] = r9;
	r7 = heap32[(r10+1)];
}
else{
	r7 = r9;
}
	r7 = r7 >> 2;
	heap32[(r7+2)] = r5;
	r7 = heap32[(r4+3)];
	heap32[(r10+3)] = r7;
	r7 = heap32[(r4+3)];
	r7 = r7 >> 2;
	heap32[(r7+1)] = r8;
}
else{
	r9 = r8;
}
	r7 = r1 >> 2;
	r11 = heap32[(r7+1)];
	if(r11 !=r2) //_LBB864_34
{
	r11 = heap32[(r4+1)];
	r7 = r11 >> 2;
	r7 = heap32[(r7+2)];
	r7 = r7 != r2;
	r7 = r7 & 1;
	r7 = r7 << 2;
	r11 = (r11 + r7)|0;
	r7 = (r11 + 8)|0;
	r11 = (r2 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r8;
}
else{
	r11 = (r2 + 4)|0;
	heap32[(r7+1)] = r8;
}
	r8 = r11 >> 2;
	r8 = heap32[(r8)];
	heap32[(r10+1)] = r8;
	r8 = heap32[(r10)];
	r7 = heap32[(r4)];
	heap32[(r10)] = r7;
	heap32[(r4)] = r8;
__label__ = 51;
}
else{
__label__ = 30;
}
}
else{
	r9 = heap32[(r4+1)];
	r8 = r2;
	r5 = r7;
__label__ = 32;
}
}
else{
	r8 = r2;
__label__ = 30;
}
if (__label__ == 30){
	r9 = r8 >> 2;
	r9 = heap32[(r9+1)];
	if(r5 ==0) //_LBB864_38
{
	r5 = 0;
__label__ = 33;
}
else{
__label__ = 32;
}
}
if (__label__ == 32){
	r7 = r5 >> 2;
	heap32[(r7+1)] = r9;
__label__ = 33;
}
if (__label__ == 33){
	r7 = r1 >> 2;
	r10 = heap32[(r7+1)];
	if(r10 !=r2) //_LBB864_42
{
	r10 = heap32[(r4+1)];
	r11 = r10 >> 2;
	r11 = heap32[(r11+2)];
	r11 = r11 != r2;
	r11 = r11 & 1;
	r11 = r11 << 2;
	r10 = (r10 + r11)|0;
	r10 = (r10 + 8)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r5;
}
else{
	heap32[(r7+1)] = r5;
}
	r10 = heap32[(r7+2)];
if(!(r10 !=r2)) //_LBB864_51
{
	r10 = heap32[(r4+3)];
	if(r10 !=0) //_LBB864_46
{
	r10 = r5 >> 2;
	r10 = heap32[(r10+2)];
_57: do {
	if(r10 ==0) //_LBB864_48
{
	r11 = r5;
}
else{
_59: while(true){
	r11 = r10;
	r10 = r11 >> 2;
	r10 = heap32[(r10+2)];
if(!(r10 !=0)) //_LBB864_49
{
break _57;
}
}
}
} while(0);
	heap32[(r7+2)] = r11;
}
else{
	r10 = heap32[(r4+1)];
	heap32[(r7+2)] = r10;
}
}
	r10 = heap32[(r7+3)];
	if(r10 ==r2) //_LBB864_53
{
	r2 = heap32[(r4+2)];
	if(r2 !=0) //_LBB864_55
{
	r2 = r5 >> 2;
	r2 = heap32[(r2+3)];
_68: do {
	if(r2 ==0) //_LBB864_57
{
	r4 = r5;
}
else{
_70: while(true){
	r4 = r2;
	r2 = r4 >> 2;
	r2 = heap32[(r2+3)];
if(!(r2 !=0)) //_LBB864_58
{
break _68;
}
}
}
} while(0);
	heap32[(r7+3)] = r4;
	r2 = r8;
}
else{
	r2 = heap32[(r4+1)];
	heap32[(r7+3)] = r2;
	r2 = r8;
}
}
else{
	r2 = r8;
}
}
	r4 = r2 >> 2;
	r7 = heap32[(r4)];
_76: do {
if(!(r7 ==0)) //_LBB864_141
{
_77: while(true){
	r7 = r1 >> 2;
	r8 = heap32[(r7+1)];
	if(r8 ==r5) //_LBB864_139
{
__label__ = 125;
break _77;
}
else{
if(!(r5 ==0)) //_LBB864_62
{
	r8 = r5 >> 2;
	r8 = heap32[(r8)];
if(!(r8 ==1)) //_LBB864_62
{
__label__ = 126;
break _77;
}
}
	r8 = r9 >> 2;
	r10 = heap32[(r8+2)];
	if(r10 !=r5) //_LBB864_100
{
	r11 = r10 >> 2;
	r12 = heap32[(r11)];
	if(r12 ==0) //_LBB864_102
{
	heap32[(r11)] = 1;
	heap32[(r8)] = 0;
	r10 = heap32[(r8+2)];
	r11 = r10 >> 2;
	r12 = heap32[(r11+3)];
	heap32[(r8+2)] = r12;
	r12 = heap32[(r11+3)];
if(!(r12 ==0)) //_LBB864_104
{
	r12 = r12 >> 2;
	heap32[(r12+1)] = r9;
}
	r12 = heap32[(r8+1)];
	heap32[(r11+1)] = r12;
	r12 = heap32[(r7+1)];
	if(r12 !=r9) //_LBB864_106
{
	r12 = heap32[(r8+1)];
	r12 = r12 >> 2;
	r13 = heap32[(r12+3)];
	if(r13 !=r9) //_LBB864_108
{
	heap32[(r12+2)] = r10;
}
else{
	heap32[(r12+3)] = r10;
}
}
else{
	heap32[(r7+1)] = r10;
}
	heap32[(r11+3)] = r9;
	heap32[(r8+1)] = r10;
	r10 = heap32[(r8+2)];
}
	r11 = r10 >> 2;
	r12 = heap32[(r11+3)];
if(!(r12 ==0)) //_LBB864_112
{
	r12 = r12 >> 2;
	r13 = heap32[(r12)];
	if(r13 !=1) //_LBB864_116
{
__label__ = 102;
break _77;
}
}
	r12 = heap32[(r11+2)];
if(!(r12 ==0)) //_LBB864_115
{
	r12 = r12 >> 2;
	r12 = heap32[(r12)];
if(!(r12 ==1)) //_LBB864_115
{
__label__ = 112;
break _77;
}
}
	heap32[(r11)] = 0;
}
else{
	r10 = heap32[(r8+3)];
	r11 = r10 >> 2;
	r12 = heap32[(r11)];
	if(r12 ==0) //_LBB864_65
{
	heap32[(r11)] = 1;
	heap32[(r8)] = 0;
	r10 = heap32[(r8+3)];
	r11 = r10 >> 2;
	r12 = heap32[(r11+2)];
	heap32[(r8+3)] = r12;
	r12 = heap32[(r11+2)];
if(!(r12 ==0)) //_LBB864_67
{
	r12 = r12 >> 2;
	heap32[(r12+1)] = r9;
}
	r12 = heap32[(r8+1)];
	heap32[(r11+1)] = r12;
	r12 = heap32[(r7+1)];
	if(r12 !=r9) //_LBB864_69
{
	r12 = heap32[(r8+1)];
	r12 = r12 >> 2;
	r13 = heap32[(r12+2)];
	if(r13 !=r9) //_LBB864_71
{
	heap32[(r12+3)] = r10;
}
else{
	heap32[(r12+2)] = r10;
}
}
else{
	heap32[(r7+1)] = r10;
}
	heap32[(r11+2)] = r9;
	heap32[(r8+1)] = r10;
	r10 = heap32[(r8+3)];
}
	r11 = r10 >> 2;
	r12 = heap32[(r11+2)];
if(!(r12 ==0)) //_LBB864_75
{
	r12 = r12 >> 2;
	r13 = heap32[(r12)];
	if(r13 !=1) //_LBB864_80
{
__label__ = 68;
break _77;
}
}
	r12 = heap32[(r11+3)];
if(!(r12 ==0)) //_LBB864_78
{
	r12 = r12 >> 2;
	r12 = heap32[(r12)];
if(!(r12 ==1)) //_LBB864_78
{
__label__ = 78;
break _77;
}
}
	heap32[(r11)] = 0;
}
	r10 = heap32[(r8+1)];
	r5 = r9;
	r9 = r10;
}
}
_125: do {
switch(__label__ ){//multiple entries
case 102:
	r1 = heap32[(r11+2)];
if(!(r1 ==0)) //_LBB864_118
{
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	if(r1 !=1) //_LBB864_114
{
__label__ = 112;
break _125;
}
}
	heap32[(r12)] = 1;
	r1 = heap32[(r11+3)];
	r12 = r1 >> 2;
	heap32[(r11)] = 0;
	r13 = heap32[(r12+2)];
	heap32[(r11+3)] = r13;
	r13 = heap32[(r12+2)];
if(!(r13 ==0)) //_LBB864_120
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r10;
}
	r13 = heap32[(r11+1)];
	heap32[(r12+1)] = r13;
	r13 = heap32[(r7+1)];
	if(r13 !=r10) //_LBB864_122
{
	r13 = heap32[(r11+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+2)];
	if(r14 !=r10) //_LBB864_124
{
	heap32[(r13+3)] = r1;
}
else{
	heap32[(r13+2)] = r1;
}
}
else{
	heap32[(r7+1)] = r1;
}
	heap32[(r12+2)] = r10;
	heap32[(r11+1)] = r1;
	r10 = heap32[(r8+2)];
__label__ = 112;
break _125;
break;
case 68:
	r1 = heap32[(r11+3)];
if(!(r1 ==0)) //_LBB864_82
{
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	if(r1 !=1) //_LBB864_77
{
__label__ = 78;
break _125;
}
}
	heap32[(r12)] = 1;
	r1 = heap32[(r11+2)];
	r12 = r1 >> 2;
	heap32[(r11)] = 0;
	r13 = heap32[(r12+3)];
	heap32[(r11+2)] = r13;
	r13 = heap32[(r12+3)];
if(!(r13 ==0)) //_LBB864_84
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r10;
}
	r13 = heap32[(r11+1)];
	heap32[(r12+1)] = r13;
	r13 = heap32[(r7+1)];
	if(r13 !=r10) //_LBB864_86
{
	r13 = heap32[(r11+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+3)];
	if(r14 !=r10) //_LBB864_88
{
	heap32[(r13+2)] = r1;
}
else{
	heap32[(r13+3)] = r1;
}
}
else{
	heap32[(r7+1)] = r1;
}
	heap32[(r12+3)] = r10;
	heap32[(r11+1)] = r1;
	r10 = heap32[(r8+3)];
__label__ = 78;
break;
}
} while(0);
_154: do {
switch(__label__ ){//multiple entries
case 112:
	r1 = r10 >> 2;
	r10 = heap32[(r8)];
	heap32[(r1)] = r10;
	heap32[(r8)] = 1;
	r1 = heap32[(r1+2)];
if(!(r1 ==0)) //_LBB864_128
{
	r1 = r1 >> 2;
	heap32[(r1)] = 1;
}
	r1 = heap32[(r8+2)];
	r10 = r1 >> 2;
	r11 = heap32[(r10+3)];
	heap32[(r8+2)] = r11;
	r11 = heap32[(r10+3)];
if(!(r11 ==0)) //_LBB864_130
{
	r11 = r11 >> 2;
	heap32[(r11+1)] = r9;
}
	r11 = heap32[(r8+1)];
	heap32[(r10+1)] = r11;
	r11 = heap32[(r7+1)];
	if(r11 !=r9) //_LBB864_132
{
	r7 = heap32[(r8+1)];
	r7 = r7 >> 2;
	r11 = heap32[(r7+3)];
	if(r11 !=r9) //_LBB864_134
{
	heap32[(r7+2)] = r1;
}
else{
	heap32[(r7+3)] = r1;
}
}
else{
	heap32[(r7+1)] = r1;
}
	heap32[(r10+3)] = r9;
	heap32[(r8+1)] = r1;
__label__ = 125;
break _154;
break;
case 78:
	r1 = r10 >> 2;
	r10 = heap32[(r8)];
	heap32[(r1)] = r10;
	heap32[(r8)] = 1;
	r1 = heap32[(r1+3)];
if(!(r1 ==0)) //_LBB864_92
{
	r1 = r1 >> 2;
	heap32[(r1)] = 1;
}
	r1 = heap32[(r8+3)];
	r10 = r1 >> 2;
	r11 = heap32[(r10+2)];
	heap32[(r8+3)] = r11;
	r11 = heap32[(r10+2)];
if(!(r11 ==0)) //_LBB864_94
{
	r11 = r11 >> 2;
	heap32[(r11+1)] = r9;
}
	r11 = heap32[(r8+1)];
	heap32[(r10+1)] = r11;
	r11 = heap32[(r7+1)];
	if(r11 !=r9) //_LBB864_96
{
	r7 = heap32[(r8+1)];
	r7 = r7 >> 2;
	r11 = heap32[(r7+2)];
	if(r11 !=r9) //_LBB864_98
{
	heap32[(r7+3)] = r1;
}
else{
	heap32[(r7+2)] = r1;
}
}
else{
	heap32[(r7+1)] = r1;
}
	heap32[(r10+2)] = r9;
	heap32[(r8+1)] = r1;
__label__ = 125;
break;
}
} while(0);
if (__label__ == 125){
	if(r5 ==0) //_LBB864_141
{
break _76;
}
}
	r1 = r5 >> 2;
	heap32[(r1)] = 1;
}
} while(0);
	r1 = heap32[(r0+75)];
	heap32[(r4+3)] = r1;
	heap32[(r0+75)] = r2;
	r1 = heap32[(r0+79)];
	r1 = (r1 + -1)|0;
	r2 = r3 >> 2;
	heap32[(r0+79)] = r1;
	heap32[(r2)] = r6;
	return;
}
else{
	r0 = r3 >> 2;
	heap32[(r0)] = r1;
	return;
}
}