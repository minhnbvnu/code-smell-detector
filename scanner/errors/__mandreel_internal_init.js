function __mandreel_internal_init(sp)
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
var __label__ = 0;
	i7 = sp + -2456;var g0 = i7>>2; // save stack
	r0 = __mandreel_internal_SetResolution__index__;
	r1 = _ZZ24__mandreel_internal_initE54s_723478567_mandreel___mandreel_internal_SetResolution;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	r0 = iMandreel_TextureAsync_IsCompressed__index__;
	r1 = _ZZ24__mandreel_internal_initE56s_723478567_mandreel_iMandreel_TextureAsync_IsCompressed;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	r0 = iMandreel_TextureAsync_GetPackOffset__index__;
	r1 = _ZZ24__mandreel_internal_initE57s_723478567_mandreel_iMandreel_TextureAsync_GetPackOffset;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	r0 = __resize__index__;
	r1 = _ZZ24__mandreel_internal_initE29s_723478567_mandreel___resize;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	r0 = imandreel_restore_glcontext__index__;
	r1 = _ZZ24__mandreel_internal_initE48s_723478567_mandreel_imandreel_restore_glcontext;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	r0 = imandreel_viewport_resize__index__;
	r1 = _ZZ24__mandreel_internal_initE46s_723478567_mandreel_imandreel_viewport_resize;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	r0 = g_msgcallback;
	r0 = r0 >> 2;
	r1 = _Z31MandreelDefaultDebugMsgCallbackiPKc__index__;
	iMandreelRegisterExternalCallback(i7);
	r2 = _ZL7g_bInit_2E_b;
	heap32[(r0)] = r1;
	r0 = heapU8[r2];
	if(r0 !=1) //_LBB822_2
{
	r0 = 1;
	heap8[r2] = r0;
	r1 = 0;
	mandreel_audio_isLogEnabled(i7);
	r2 = r_g0 != r1;
	r3 = _ZL6g_bLog;
	r2 = r2 & 1;
	heap8[r3] = r2;
	mandreel_audio_useMusicFunctions(i7);
	r2 = heapU8[r3];
	if(r2 !=0) //_LBB822_4
{
	r2 = _2E_str35256;
	heap32[(g0)] = r2;
	printf(i7);
}
else{
	r1 = 0;
}
_6: while(true){
	r2 = (r1 * 73)|0;
	r3 = _ZL11g_aChannels;
	r2 = r2 << 2;
	r2 = (r3 + r2)|0;
	r4 = (r1 * 292)|0;
	r2 = r2 >> 2;
	r5 = _ZL15g_aFreeChannels;
	r6 = r1 << 2;
	r5 = (r5 + r6)|0;
	r3 = (r3 + r4)|0;
	heap32[(r2+69)] = r1;
	r2 = (r1 + 1)|0;
	r4 = r5 >> 2;
	heap8[r3+269] = r0;
	heap32[(r4)] = r1;
	r1 = r2;
if(!(r2 !=32)) //_LBB822_5
{
break _6;
}
}
	r1 = _ZL15g_iFreeChannels;
	r1 = r1 >> 2;
	heap32[(r1)] = 32;
	mandreel_audio_init(i7);
	r1 = _2E_str22243;
	heap32[(g0)] = r1;
	printf(i7);
	heap32[(g0)] = 0;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	r1 = _2E_str779;
	r2 = _2E_str1648;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	fopen(i7);
	r3 = r_g0;
	heap32[(g0)] = 1;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	if(r3 ==0) //_LBB822_19
{
	r4 = _2E_str24245;
	r5 = 0;
	heap32[(g0)] = r4;
	_printf_error(i7);
	r4 = r5;
}
else{
	if(uint(r3) <uint(10)) //_LBB822_9
{
	r4 = _ZL13s_file_stdout;
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+7)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
else{
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+7)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r4 = r3;
}
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+5)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r4 = r_g0;
	if(uint(r3) >uint(9)) //_LBB822_12
{
	r5 = r3;
}
else{
	r5 = _ZL13s_file_stdout;
}
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+7)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r5 = (r4 + 1)|0;
	heap32[(g0)] = r5;
	malloc(i7);
	r5 = r_g0;
	if(uint(r3) <uint(10)) //_LBB822_15
{
	r6 = _ZL13s_file_stdout;
	r7 = r6 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+1)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = r4;
	r8 = 0;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	heap8[r5+r4] = r8;
}
else{
	r6 = r3 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = r4;
	r7 = 0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	heap8[r5+r4] = r7;
	r6 = r3;
}
	r7 = r6 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+4)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	if(uint(r3) >uint(9)) //_LBB822_18
{
	heap32[(g0)] = r6;
	_ZdlPv(i7);
}
}
	r3 = sp + -128;
	heap32[(g0)] = r3;
	mandreel_audio_getAudioDriverName(i7);
	r6 = _2E_str4225;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r6;
	strcmp(i7);
	r3 = r_g0;
if(!(r5 ==0)) //_LBB822_198
{
_28: do {
if(!(r4 <1)) //_LBB822_197
{
	r6 = sp + -1408;
	r7 = (r6 + 1)|0;
	r8 = (r5 + 1)|0;
	r9 = 0;
_30: while(true){
	r10 = (r5 + r9)|0;
	r11 = heapU8[r5+r9];
if(!(r11 ==13)) //_LBB822_25
{
	if(r9 <r4) //_LBB822_26
{
	r11 = r9;
_35: while(true){
	r9 = (r11 + 1)|0;
	r11 = heapU8[r8+r11];
	if(r11 ==13) //_LBB822_29
{
break _35;
}
else{
	r11 = r9;
if(!(r9 <r4)) //_LBB822_27
{
break _35;
}
}
}
}
}
	r11 = _ZL10strtok_pos;
	r12 = 0;
	r11 = r11 >> 2;
	heap8[r5+r9] = r12;
	r13 = heap32[(r11)];
	r9 = (r9 + 2)|0;
	r10 = r10 == 0 ? r13 : r10;
_39: while(true){
	r13 = heapU8[r10];
	if(r13 ==0) //_LBB822_47
{
__label__ = 44;
break _39;
}
else{
	r14 = r12;
_42: while(true){
	if(r14 ==-1) //_LBB822_36
{
__label__ = 34;
break _39;
}
else{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r13 & 255;
	r15 = heapU8[r15];
	if(r16 !=r15) //_LBB822_30
{
	r14 = (r14 + -1)|0;
}
else{
break _42;
}
}
}
	r10 = (r10 + 1)|0;
}
}
_47: do {
if (__label__ == 34){
	if(r13 ==0) //_LBB822_47
{
__label__ = 44;
}
else{
	r12 = r10;
_50: while(true){
	r13 = heapU8[r12];
	if(r13 ==0) //_LBB822_44
{
break _50;
}
else{
	r14 = r0;
_53: while(true){
	if(r14 !=0) //_LBB822_38
{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r13 & 255;
	r15 = heapU8[r15+1];
	if(r16 ==r15) //_LBB822_44
{
break _50;
}
else{
	r14 = (r14 + -1)|0;
}
}
else{
break _53;
}
}
	r12 = (r12 + 1)|0;
}
}
	r13 = heapU8[r12];
	if(r13 !=0) //_LBB822_46
{
	r13 = (r12 + 1)|0;
	r14 = 0;
	heap8[r12] = r14;
	r12 = r13;
}
	heap32[(r11)] = r12;
	r13 = _2E_str26247;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r10;
	strcmp(i7);
	r13 = r_g0;
	if(r13 !=0) //_LBB822_71
{
	r13 = _2E_str29250;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r10;
	strcmp(i7);
	r13 = r_g0;
	if(r13 !=0) //_LBB822_154
{
	if(r3 !=0) //_LBB822_70
{
__label__ = 66;
break _47;
}
else{
	r13 = _2E_str32253;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r10;
	strcmp(i7);
	r13 = r_g0;
	if(r13 !=0) //_LBB822_176
{
	r13 = _2E_str33254;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r10;
	strcmp(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB822_70
{
__label__ = 66;
break _47;
}
else{
__label__ = 173; //SET chanka
_69: while(true){
	r10 = heapU8[r12];
	if(r10 ==0) //_LBB822_184
{
__label__ = 175;
break _69;
}
else{
	r13 = 0;
_72: while(true){
	if(r13 ==-1) //_LBB822_185
{
__label__ = 176;
break _69;
}
else{
	r14 = _2E_str4133;
	r14 = (r14 - r13)|0;
	r15 = r10 & 255;
	r14 = heapU8[r14];
	if(r15 !=r14) //_LBB822_178
{
	r13 = (r13 + -1)|0;
}
else{
break _72;
}
}
}
	r12 = (r12 + 1)|0;
}
}
if (__label__ == 176){
	if(r10 ==0) //_LBB822_184
{
__label__ = 175;
}
else{
	r13 = r12;
_80: while(true){
	r10 = heapU8[r13];
	if(r10 ==0) //_LBB822_193
{
break _80;
}
else{
	r14 = 1;
_83: while(true){
	if(r14 !=0) //_LBB822_187
{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r10 & 255;
	r15 = heapU8[r15+1];
	if(r16 ==r15) //_LBB822_193
{
break _80;
}
else{
	r14 = (r14 + -1)|0;
}
}
else{
break _83;
}
}
	r13 = (r13 + 1)|0;
}
}
	r10 = heapU8[r13];
	if(r10 !=0) //_LBB822_195
{
	r14 = (r13 + 1)|0;
	r10 = 0;
	heap8[r13] = r10;
	r10 = r12;
	r12 = r14;
__label__ = 187;
}
else{
	r10 = r12;
	r12 = r13;
__label__ = 187;
}
}
}
if (__label__ == 175){
	r10 = 0;
}
	heap32[(r11)] = r12;
	r11 = sp + -384;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r10;
	strcpy(i7);
__label__ = 66;
break _47;
}
}
else{
_95: while(true){
	r10 = heapU8[r12];
	if(r10 ==0) //_LBB822_163
{
__label__ = 155;
break _95;
}
else{
	r13 = 0;
_98: while(true){
	if(r13 ==-1) //_LBB822_164
{
__label__ = 156;
break _95;
}
else{
	r14 = _2E_str4133;
	r14 = (r14 - r13)|0;
	r15 = r10 & 255;
	r14 = heapU8[r14];
	if(r15 !=r14) //_LBB822_157
{
	r13 = (r13 + -1)|0;
}
else{
break _98;
}
}
}
	r12 = (r12 + 1)|0;
}
}
if (__label__ == 156){
	if(r10 ==0) //_LBB822_163
{
__label__ = 155;
}
else{
	r13 = r12;
_106: while(true){
	r10 = heapU8[r13];
	if(r10 ==0) //_LBB822_172
{
break _106;
}
else{
	r14 = 1;
_109: while(true){
	if(r14 !=0) //_LBB822_166
{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r10 & 255;
	r15 = heapU8[r15+1];
	if(r16 ==r15) //_LBB822_172
{
break _106;
}
else{
	r14 = (r14 + -1)|0;
}
}
else{
break _109;
}
}
	r13 = (r13 + 1)|0;
}
}
	r10 = heapU8[r13];
	if(r10 !=0) //_LBB822_174
{
	r14 = (r13 + 1)|0;
	r10 = 0;
	heap8[r13] = r10;
	r10 = r12;
	r12 = r14;
__label__ = 167;
}
else{
	r10 = r12;
	r12 = r13;
__label__ = 167;
}
}
}
if (__label__ == 155){
	r10 = 0;
}
	heap32[(r11)] = r12;
	r11 = sp + -2432;
	r12 = _2E_str12233;
	r13 = sp + -384;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = r10;
	sprintf(i7);
	heap32[(g0)] = r11;
	mandreel_add_valid_fopenfile(i7);
__label__ = 66;
break _47;
}
}
}
else{
	r10 = (r12 + 1)|0;
	r13 = 0;
	r14 = r12;
_122: while(true){
	r15 = heapU8[r12+r13];
	if(r15 ==0) //_LBB822_90
{
__label__ = 85;
break _122;
}
else{
	r16 = 0;
_125: while(true){
	if(r16 ==-1) //_LBB822_79
{
__label__ = 75;
break _122;
}
else{
	r17 = _2E_str4133;
	r17 = (r17 - r16)|0;
	r18 = r15 & 255;
	r17 = heapU8[r17];
	if(r18 !=r17) //_LBB822_73
{
	r16 = (r16 + -1)|0;
}
else{
break _125;
}
}
}
	r13 = (r13 + 1)|0;
	r14 = (r14 + 1)|0;
	r10 = (r10 + 1)|0;
}
}
_130: do {
if (__label__ == 75){
	if(r15 ==0) //_LBB822_90
{
__label__ = 85;
}
else{
	r15 = (r12 + r13)|0;
_133: while(true){
	r16 = heapU8[r14];
	if(r16 ==0) //_LBB822_87
{
break _133;
}
else{
	r17 = 1;
_136: while(true){
	if(r17 !=0) //_LBB822_81
{
	r18 = _2E_str4133;
	r18 = (r18 - r17)|0;
	r19 = r16 & 255;
	r18 = heapU8[r18+1];
	if(r19 ==r18) //_LBB822_87
{
break _133;
}
else{
	r17 = (r17 + -1)|0;
}
}
else{
break _136;
}
}
	r14 = (r14 + 1)|0;
}
}
	r16 = heapU8[r14];
	if(r16 !=0) //_LBB822_89
{
	r16 = (r14 + 1)|0;
	r17 = 0;
	heap8[r14] = r17;
	r14 = r16;
}
	r17 = 0;
	r16 = r15 == r17;
	heap32[(r11)] = r14;
_145: while(true){
	r18 = heapU8[r14];
	if(r18 ==0) //_LBB822_109
{
__label__ = 103;
break _145;
}
else{
	r19 = r17;
_148: while(true){
	if(r19 ==-1) //_LBB822_98
{
__label__ = 93;
break _145;
}
else{
	r20 = _2E_str4133;
	r20 = (r20 - r19)|0;
	r21 = r18 & 255;
	r20 = heapU8[r20];
	if(r21 !=r20) //_LBB822_92
{
	r19 = (r19 + -1)|0;
}
else{
break _148;
}
}
}
	r14 = (r14 + 1)|0;
}
}
if (__label__ == 93){
if(!(r18 ==0)) //_LBB822_109
{
	r17 = r14;
_156: while(true){
	r18 = heapU8[r17];
	if(r18 ==0) //_LBB822_106
{
break _156;
}
else{
	r19 = 1;
_159: while(true){
	if(r19 !=0) //_LBB822_100
{
	r20 = _2E_str4133;
	r20 = (r20 - r19)|0;
	r21 = r18 & 255;
	r20 = heapU8[r20+1];
	if(r21 ==r20) //_LBB822_106
{
break _156;
}
else{
	r19 = (r19 + -1)|0;
}
}
else{
break _159;
}
}
	r17 = (r17 + 1)|0;
}
}
	r18 = heapU8[r17];
	if(r18 !=0) //_LBB822_108
{
	r18 = (r17 + 1)|0;
	r19 = 0;
	heap8[r17] = r19;
	r17 = r18;
}
	heap32[(r11)] = r17;
_168: while(true){
	r18 = heapU8[r17];
	if(r18 ==0) //_LBB822_128
{
__label__ = 121;
break _168;
}
else{
	r19 = 0;
_171: while(true){
	if(r19 ==-1) //_LBB822_117
{
__label__ = 111;
break _168;
}
else{
	r20 = _2E_str4133;
	r20 = (r20 - r19)|0;
	r21 = r18 & 255;
	r20 = heapU8[r20];
	if(r21 !=r20) //_LBB822_111
{
	r19 = (r19 + -1)|0;
}
else{
break _171;
}
}
}
	r17 = (r17 + 1)|0;
}
}
if (__label__ == 111){
if(!(r18 ==0)) //_LBB822_128
{
	r15 = r17;
_179: while(true){
	r16 = heapU8[r15];
	if(r16 ==0) //_LBB822_125
{
break _179;
}
else{
	r18 = 1;
_182: while(true){
	if(r18 !=0) //_LBB822_119
{
	r19 = _2E_str4133;
	r19 = (r19 - r18)|0;
	r20 = r16 & 255;
	r19 = heapU8[r19+1];
	if(r20 ==r19) //_LBB822_125
{
break _179;
}
else{
	r18 = (r18 + -1)|0;
}
}
else{
break _182;
}
}
	r15 = (r15 + 1)|0;
}
}
	r16 = heapU8[r15];
	if(r16 !=0) //_LBB822_127
{
	r16 = (r15 + 1)|0;
	r18 = 0;
	heap8[r15] = r18;
	r15 = r16;
}
	heap32[(r11)] = r15;
	heap32[(g0)] = 264;
	_Znwj(i7);
	r11 = r_g0;
	heap32[(g0)] = r17;
	heap32[(g0+1)] = 0;
	r15 = 0;
	r16 = -1;
	r17 = r11 >> 2;
	strtol(i7);
	heap32[(r17+64)] = r_g0;
_191: while(true){
	r17 = r15;
	r18 = heapU8[r10+r17];
	if(r18 !=46) //_LBB822_133
{
	if(r18 ==0) //_LBB822_137
{
break _191;
}
else{
if(!(r18 ==47)) //_LBB822_136
{
	r15 = (r17 + 1)|0;
	if(r18 !=92) //_LBB822_131
{
continue _191;
}
}
	r16 = -1;
}
}
else{
	r16 = r17;
}
	r15 = (r17 + 1)|0;
}
	if(r16 ==-1) //_LBB822_143
{
	r10 = (r12 + r13)|0;
	r12 = _2E_str12233;
	r10 = (r10 + 1)|0;
	r15 = _2E_str2131;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r12;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r15;
	sprintf(i7);
}
else{
_205: do {
	if(r16 >0) //_LBB822_140
{
	r10 = (r12 + 1)|0;
	r12 = 0;
_207: while(true){
	r15 = (r12 + r10)|0;
	r17 = (r12 + 1)|0;
	r15 = heapU8[r15+r13];
	heap8[r6+r12] = r15;
	r12 = r17;
if(!(r16 !=r17)) //_LBB822_141
{
break _205;
}
}
}
else{
	r16 = 0;
}
} while(0);
	r10 = (r6 + r16)|0;
	r12 = _2E_str2131;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r12;
	strcpy(i7);
}
	r10 = heapU8[sp+-1408];
_212: do {
	if(r10 ==0) //_LBB822_146
{
	r15 = r11;
}
else{
	r12 = r7;
	r15 = r11;
_215: while(true){
	r16 = r10 & 255;
	if(r16 !=92) //_LBB822_149
{
	r16 = r10 << 24;
	r16 = r16 >> 24;
	r16 = (r16 + -65)|0;
	r13 = 26;
	r17 = (r10 + 32)|0;
	r10 = uint(r16) < uint(r13) ? r17 : r10;
}
else{
	r10 = 47;
}
	heap8[r15] = r10;
	r10 = heapU8[r12];
	r15 = (r15 + 1)|0;
	r12 = (r12 + 1)|0;
if(!(r10 !=0)) //_LBB822_147
{
break _212;
}
}
}
} while(0);
	r10 = _ZL21g_pFirstSoundDuration;
	r12 = 0;
	r10 = r10 >> 2;
	heap8[r15] = r12;
	r12 = r11 >> 2;
	r15 = heap32[(r10)];
	heap32[(r12+65)] = r15;
	heap32[(r10)] = r11;
	r10 = heapU8[r14];
	if(r10 ==48) //_LBB822_70
{
__label__ = 66;
break _47;
}
else{
	heap32[(g0)] = r11;
	heap32[(g0+1)] = 0;
	mandreel_audio_createBuffer(i7);
__label__ = 66;
break _47;
}
}
}
	heap32[(r11)] = r17;
__label__ = 146;
break _130;
}
}
	heap32[(r11)] = r14;
__label__ = 146;
}
}
} while(0);
if (__label__ == 85){
	r16 = 1;
	r15 = 0;
	r10 = (r12 + r13)|0;
	heap32[(r11)] = r10;
}
	r10 = _2E_str30251;
	r11 = _2E_str31252;
	r10 = r16 != 0 ? r10 : r15;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r10;
	_printf_warning(i7);
__label__ = 66;
break _47;
}
}
else{
_228: while(true){
	r10 = heapU8[r12];
	if(r10 ==0) //_LBB822_56
{
__label__ = 52;
break _228;
}
else{
	r13 = 0;
_231: while(true){
	if(r13 ==-1) //_LBB822_57
{
__label__ = 53;
break _228;
}
else{
	r14 = _2E_str4133;
	r14 = (r14 - r13)|0;
	r15 = r10 & 255;
	r14 = heapU8[r14];
	if(r15 !=r14) //_LBB822_50
{
	r13 = (r13 + -1)|0;
}
else{
break _231;
}
}
}
	r12 = (r12 + 1)|0;
}
}
if (__label__ == 53){
	if(r10 ==0) //_LBB822_56
{
__label__ = 52;
}
else{
	r13 = r12;
_239: while(true){
	r10 = heapU8[r13];
	if(r10 ==0) //_LBB822_65
{
break _239;
}
else{
	r14 = 1;
_242: while(true){
	if(r14 !=0) //_LBB822_59
{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r10 & 255;
	r15 = heapU8[r15+1];
	if(r16 ==r15) //_LBB822_65
{
break _239;
}
else{
	r14 = (r14 + -1)|0;
}
}
else{
break _242;
}
}
	r13 = (r13 + 1)|0;
}
}
	r10 = heapU8[r13];
	if(r10 !=0) //_LBB822_67
{
	r14 = (r13 + 1)|0;
	r10 = 0;
	heap8[r13] = r10;
	r10 = r12;
	r12 = r14;
__label__ = 64;
}
else{
	r10 = r12;
	r12 = r13;
__label__ = 64;
}
}
}
if (__label__ == 52){
	r10 = 0;
}
	heap32[(r11)] = r12;
	r11 = _2E_str27248;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	strcmp(i7);
	r12 = r_g0;
	if(r12 ==0) //_LBB822_70
{
__label__ = 66;
}
else{
	r12 = _2E_str28249;
	heap32[(g0)] = r12;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r11;
	_printf_error(i7);
__label__ = 66;
}
}
}
}
} while(0);
if (__label__ == 44){
	heap32[(r11)] = r10;
}
if(!(r9 <r4)) //_LBB822_23
{
break _28;
}
}
}
} while(0);
	heap32[(g0)] = r5;
	free(i7);
}
	__mandreel_internal_CreateWindow(i7);
	heap32[(g0)] = 0;
	_Z30mandreel_fopen_enable_checkfatb(i7);
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	fopen(i7);
	r0 = r_g0;
	heap32[(g0)] = 1;
	_Z30mandreel_fopen_enable_checkfatb(i7);
if(!(r0 ==0)) //_LBB822_389
{
	if(uint(r0) <uint(10)) //_LBB822_201
{
	r1 = _ZL13s_file_stdout;
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+7)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
else{
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+7)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r1 = r0;
}
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+5)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r1 = r_g0;
	if(uint(r0) >uint(9)) //_LBB822_204
{
	r2 = r0;
}
else{
	r2 = _ZL13s_file_stdout;
}
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = 0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = (r1 + 1)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r2 = r_g0;
	if(uint(r0) <uint(10)) //_LBB822_207
{
	r3 = _ZL13s_file_stdout;
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = r1;
	r5 = 0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	heap8[r2+r1] = r5;
}
else{
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+1)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = r1;
	r4 = 0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	heap8[r2+r1] = r4;
	r3 = r0;
}
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r3;
	__FUNCTION_TABLE__[(r4)>>2](i7);
if(!(uint(r0) <uint(10))) //_LBB822_210
{
	heap32[(g0)] = r3;
	_ZdlPv(i7);
}
if(!(r2 ==0)) //_LBB822_389
{
	r0 = (r2 + 1)|0;
	r3 = -1;
	r4 = 0;
	r5 = r4;
_278: while(true){
	r6 = r3;
_280: while(true){
	if(r5 <r1) //_LBB822_212
{
	r3 = (r2 + r5)|0;
	r7 = heapU8[r2+r5];
	if(r7 ==13) //_LBB822_214
{
	r7 = r5;
}
else{
_285: while(true){
	r7 = (r5 + 1)|0;
	r5 = heapU8[r0+r5];
	if(r5 ==13) //_LBB822_217
{
break _285;
}
else{
	r5 = r7;
if(!(r7 <r1)) //_LBB822_215
{
break _285;
}
}
}
}
	r5 = _ZL10strtok_pos;
	r8 = 0;
	r9 = r5 >> 2;
	heap8[r2+r7] = r8;
	r10 = heap32[(r9)];
	r5 = (r7 + 2)|0;
	r3 = r3 == 0 ? r10 : r3;
_289: while(true){
	r7 = heapU8[r3];
	if(r7 ==0) //_LBB822_235
{
__label__ = 224;
break _289;
}
else{
	r10 = r8;
_292: while(true){
	if(r10 ==-1) //_LBB822_224
{
__label__ = 214;
break _289;
}
else{
	r11 = _2E_str4133;
	r11 = (r11 - r10)|0;
	r12 = r7 & 255;
	r11 = heapU8[r11];
	if(r12 !=r11) //_LBB822_218
{
	r10 = (r10 + -1)|0;
}
else{
break _292;
}
}
}
	r3 = (r3 + 1)|0;
}
}
if (__label__ == 214){
if(!(r7 ==0)) //_LBB822_235
{
	r7 = r3;
_300: while(true){
	r8 = heapU8[r7];
	if(r8 ==0) //_LBB822_232
{
break _300;
}
else{
	r10 = 1;
_303: while(true){
	if(r10 !=0) //_LBB822_226
{
	r11 = _2E_str4133;
	r11 = (r11 - r10)|0;
	r12 = r8 & 255;
	r11 = heapU8[r11+1];
	if(r12 ==r11) //_LBB822_232
{
break _300;
}
else{
	r10 = (r10 + -1)|0;
}
}
else{
break _303;
}
}
	r7 = (r7 + 1)|0;
}
}
	r8 = heapU8[r7];
	if(r8 !=0) //_LBB822_234
{
	r8 = (r7 + 1)|0;
	r10 = 0;
	heap8[r7] = r10;
	r7 = r8;
}
	heap32[(r9)] = r7;
	r8 = _2E_str3782;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB822_341
{
	r8 = _2E_str5784;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB822_385
{
	r7 = _2E_str6785;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r3;
	r3 = -1;
	strcmp(i7);
	r7 = r_g0;
	if(r7 !=0) //_LBB822_387
{
continue _280;
}
else{
continue _278;
}
}
else{
break _280;
}
}
else{
_315: while(true){
	r3 = heapU8[r7];
	if(r3 ==0) //_LBB822_255
{
__label__ = 242;
break _315;
}
else{
	r8 = 0;
_318: while(true){
	if(r8 ==-1) //_LBB822_244
{
__label__ = 232;
break _315;
}
else{
	r10 = _2E_str4133;
	r10 = (r10 - r8)|0;
	r11 = r3 & 255;
	r10 = heapU8[r10];
	if(r11 !=r10) //_LBB822_238
{
	r8 = (r8 + -1)|0;
}
else{
break _318;
}
}
}
	r7 = (r7 + 1)|0;
}
}
_323: do {
if (__label__ == 232){
	if(r3 ==0) //_LBB822_255
{
__label__ = 242;
}
else{
	r3 = r7;
_326: while(true){
	r8 = heapU8[r3];
	if(r8 ==0) //_LBB822_252
{
break _326;
}
else{
	r10 = 1;
_329: while(true){
	if(r10 !=0) //_LBB822_246
{
	r11 = _2E_str4133;
	r11 = (r11 - r10)|0;
	r12 = r8 & 255;
	r11 = heapU8[r11+1];
	if(r12 ==r11) //_LBB822_252
{
break _326;
}
else{
	r10 = (r10 + -1)|0;
}
}
else{
break _329;
}
}
	r3 = (r3 + 1)|0;
}
}
	r8 = heapU8[r3];
	if(r8 !=0) //_LBB822_254
{
	r8 = (r3 + 1)|0;
	r10 = 0;
	heap8[r3] = r10;
	r3 = r8;
}
	heap32[(r9)] = r3;
_338: while(true){
	r8 = heapU8[r3];
	if(r8 ==0) //_LBB822_274
{
__label__ = 260;
break _338;
}
else{
	r10 = 0;
_341: while(true){
	if(r10 ==-1) //_LBB822_263
{
__label__ = 250;
break _338;
}
else{
	r11 = _2E_str4133;
	r11 = (r11 - r10)|0;
	r12 = r8 & 255;
	r11 = heapU8[r11];
	if(r12 !=r11) //_LBB822_257
{
	r10 = (r10 + -1)|0;
}
else{
break _341;
}
}
}
	r3 = (r3 + 1)|0;
}
}
if (__label__ == 250){
if(!(r8 ==0)) //_LBB822_274
{
	r8 = r3;
_349: while(true){
	r10 = heapU8[r8];
	if(r10 ==0) //_LBB822_271
{
break _349;
}
else{
	r11 = 1;
_352: while(true){
	if(r11 !=0) //_LBB822_265
{
	r12 = _2E_str4133;
	r12 = (r12 - r11)|0;
	r13 = r10 & 255;
	r12 = heapU8[r12+1];
	if(r13 ==r12) //_LBB822_271
{
break _349;
}
else{
	r11 = (r11 + -1)|0;
}
}
else{
break _352;
}
}
	r8 = (r8 + 1)|0;
}
}
	r10 = heapU8[r8];
	if(r10 !=0) //_LBB822_273
{
	r10 = (r8 + 1)|0;
	r11 = 0;
	heap8[r8] = r11;
	r8 = r10;
}
	heap32[(r9)] = r8;
_361: while(true){
	r10 = heapU8[r8];
	if(r10 ==0) //_LBB822_293
{
__label__ = 278;
break _361;
}
else{
	r11 = 0;
_364: while(true){
	if(r11 ==-1) //_LBB822_282
{
__label__ = 268;
break _361;
}
else{
	r12 = _2E_str4133;
	r12 = (r12 - r11)|0;
	r13 = r10 & 255;
	r12 = heapU8[r12];
	if(r13 !=r12) //_LBB822_276
{
	r11 = (r11 + -1)|0;
}
else{
break _364;
}
}
}
	r8 = (r8 + 1)|0;
}
}
if (__label__ == 268){
if(!(r10 ==0)) //_LBB822_293
{
	r10 = r8;
_372: while(true){
	r11 = heapU8[r10];
	if(r11 ==0) //_LBB822_290
{
break _372;
}
else{
	r12 = 1;
_375: while(true){
	if(r12 !=0) //_LBB822_284
{
	r13 = _2E_str4133;
	r13 = (r13 - r12)|0;
	r14 = r11 & 255;
	r13 = heapU8[r13+1];
	if(r14 ==r13) //_LBB822_290
{
break _372;
}
else{
	r12 = (r12 + -1)|0;
}
}
else{
break _375;
}
}
	r10 = (r10 + 1)|0;
}
}
	r11 = heapU8[r10];
	if(r11 !=0) //_LBB822_292
{
	r11 = (r10 + 1)|0;
	r12 = 0;
	heap8[r10] = r12;
	r10 = r11;
}
	heap32[(r9)] = r10;
_384: while(true){
	r11 = heapU8[r10];
	if(r11 ==0) //_LBB822_312
{
__label__ = 296;
break _384;
}
else{
	r12 = 0;
_387: while(true){
	if(r12 ==-1) //_LBB822_301
{
__label__ = 286;
break _384;
}
else{
	r13 = _2E_str4133;
	r13 = (r13 - r12)|0;
	r14 = r11 & 255;
	r13 = heapU8[r13];
	if(r14 !=r13) //_LBB822_295
{
	r12 = (r12 + -1)|0;
}
else{
break _387;
}
}
}
	r10 = (r10 + 1)|0;
}
}
if (__label__ == 286){
if(!(r11 ==0)) //_LBB822_312
{
	r11 = r10;
_395: while(true){
	r12 = heapU8[r11];
	if(r12 ==0) //_LBB822_309
{
break _395;
}
else{
	r13 = 1;
_398: while(true){
	if(r13 !=0) //_LBB822_303
{
	r14 = _2E_str4133;
	r14 = (r14 - r13)|0;
	r15 = r12 & 255;
	r14 = heapU8[r14+1];
	if(r15 ==r14) //_LBB822_309
{
break _395;
}
else{
	r13 = (r13 + -1)|0;
}
}
else{
break _398;
}
}
	r11 = (r11 + 1)|0;
}
}
	r12 = heapU8[r11];
	if(r12 !=0) //_LBB822_311
{
	r12 = (r11 + 1)|0;
	r13 = 0;
	heap8[r11] = r13;
	r11 = r12;
}
	heap32[(r9)] = r11;
_407: while(true){
	r12 = heapU8[r11];
	if(r12 ==0) //_LBB822_331
{
__label__ = 314;
break _407;
}
else{
	r13 = 0;
_410: while(true){
	if(r13 ==-1) //_LBB822_320
{
__label__ = 304;
break _407;
}
else{
	r14 = _2E_str4133;
	r14 = (r14 - r13)|0;
	r15 = r12 & 255;
	r14 = heapU8[r14];
	if(r15 !=r14) //_LBB822_314
{
	r13 = (r13 + -1)|0;
}
else{
break _410;
}
}
}
	r11 = (r11 + 1)|0;
}
}
if (__label__ == 304){
if(!(r12 ==0)) //_LBB822_331
{
	r12 = r11;
_418: while(true){
	r13 = heapU8[r12];
	if(r13 ==0) //_LBB822_328
{
break _418;
}
else{
	r14 = 1;
_421: while(true){
	if(r14 !=0) //_LBB822_322
{
	r15 = _2E_str4133;
	r15 = (r15 - r14)|0;
	r16 = r13 & 255;
	r15 = heapU8[r15+1];
	if(r16 ==r15) //_LBB822_328
{
break _418;
}
else{
	r14 = (r14 + -1)|0;
}
}
else{
break _421;
}
}
	r12 = (r12 + 1)|0;
}
}
	r13 = heapU8[r12];
	if(r13 !=0) //_LBB822_330
{
	r13 = (r12 + 1)|0;
	r14 = 0;
	heap8[r12] = r14;
	r12 = r13;
}
	heap32[(r9)] = r12;
	if(r8 ==0) //_LBB822_340
{
__label__ = 323;
break _323;
}
else{
	if(r11 ==0) //_LBB822_340
{
__label__ = 323;
break _323;
}
else{
	heap32[(g0)] = 284;
	_Znwj(i7);
	r9 = r_g0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 0;
	r3 = r9 >> 2;
	strtol(i7);
	heap32[(r3+65)] = r_g0;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = 0;
	strtol(i7);
	heap32[(r3+66)] = r_g0;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = 0;
	strtol(i7);
	heap32[(r3+67)] = r_g0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = 0;
	strtol(i7);
	heap32[(r3+69)] = r_g0;
	r7 = (r7 + 1)|0;
	r8 = 0;
	heap32[(r3+68)] = r4;
	heap32[(r3+64)] = r6;
	r3 = r9;
_432: while(true){
	r10 = heapU8[r7];
	if(r10 ==0) //_LBB822_339
{
break _432;
}
else{
	r11 = r10 << 24;
	r11 = r11 >> 24;
	r11 = (r11 + -65)|0;
	r12 = 26;
	r13 = (r10 + 32)|0;
	r10 = uint(r11) < uint(r12) ? r13 : r10;
	r11 = r10 & 255;
	r12 = 47;
	r10 = r11 == 92 ? r12 : r10;
	r7 = (r7 + 1)|0;
	r11 = r10 & 255;
if(!(r11 !=47)) //_LBB822_338
{
	r11 = r8 & 255;
	r8 = r10;
	if(r11 ==47) //_LBB822_335
{
continue _432;
}
}
	r8 = (r3 + 1)|0;
	heap8[r3] = r10;
	r3 = r8;
	r8 = r10;
}
}
	r7 = _ZL24g_pFirstTextureAsyncInfo;
	r8 = 0;
	r7 = r7 >> 2;
	heap8[r3] = r8;
	r3 = r9 >> 2;
	r8 = heap32[(r7)];
	heap32[(r3+70)] = r8;
	heap32[(r7)] = r9;
	r3 = heap32[(r3+69)];
	r4 = (r3 + r4)|0;
continue _280;
}
}
}
}
	heap32[(r9)] = r11;
__label__ = 323;
break _323;
}
}
	heap32[(r9)] = r10;
__label__ = 323;
break _323;
}
}
	heap32[(r9)] = r8;
__label__ = 323;
break _323;
}
}
	heap32[(r9)] = r3;
__label__ = 323;
}
}
} while(0);
if (__label__ == 242){
	heap32[(r9)] = r7;
}
	r3 = _2E_str4783;
	heap32[(g0)] = r3;
	_printf_warning(i7);
continue _280;
}
}
}
	heap32[(r9)] = r3;
}
else{
break _278;
}
}
_447: while(true){
	r3 = heapU8[r7];
	if(r3 ==0) //_LBB822_349
{
__label__ = 331;
break _447;
}
else{
	r4 = 0;
_450: while(true){
	if(r4 ==-1) //_LBB822_350
{
__label__ = 332;
break _447;
}
else{
	r8 = _2E_str4133;
	r8 = (r8 - r4)|0;
	r10 = r3 & 255;
	r8 = heapU8[r8];
	if(r10 !=r8) //_LBB822_343
{
	r4 = (r4 + -1)|0;
}
else{
break _450;
}
}
}
	r7 = (r7 + 1)|0;
}
}
if (__label__ == 332){
	if(r3 ==0) //_LBB822_349
{
__label__ = 331;
}
else{
	r3 = r7;
_458: while(true){
	r4 = heapU8[r3];
	if(r4 ==0) //_LBB822_358
{
break _458;
}
else{
	r8 = 1;
_461: while(true){
	if(r8 !=0) //_LBB822_352
{
	r10 = _2E_str4133;
	r10 = (r10 - r8)|0;
	r11 = r4 & 255;
	r10 = heapU8[r10+1];
	if(r11 ==r10) //_LBB822_358
{
break _458;
}
else{
	r8 = (r8 + -1)|0;
}
}
else{
break _461;
}
}
	r3 = (r3 + 1)|0;
}
}
	r4 = heapU8[r3];
	if(r4 !=0) //_LBB822_360
{
	r8 = (r3 + 1)|0;
	r4 = 0;
	heap8[r3] = r4;
	r4 = r7;
	r7 = r8;
__label__ = 343;
}
else{
	r4 = r7;
	r7 = r3;
__label__ = 343;
}
}
}
if (__label__ == 331){
	r4 = 0;
}
	heap32[(r9)] = r7;
_473: while(true){
	r3 = heapU8[r7];
	if(r3 ==0) //_LBB822_368
{
__label__ = 359;
break _473;
}
else{
	r8 = 0;
_476: while(true){
	if(r8 ==-1) //_LBB822_369
{
__label__ = 350;
break _473;
}
else{
	r10 = _2E_str4133;
	r10 = (r10 - r8)|0;
	r11 = r3 & 255;
	r10 = heapU8[r10];
	if(r11 !=r10) //_LBB822_362
{
	r8 = (r8 + -1)|0;
}
else{
break _476;
}
}
}
	r7 = (r7 + 1)|0;
}
}
if (__label__ == 350){
if(!(r3 ==0)) //_LBB822_368
{
_483: while(true){
	r3 = heapU8[r7];
	if(r3 ==0) //_LBB822_377
{
break _483;
}
else{
	r8 = 1;
_486: while(true){
	if(r8 !=0) //_LBB822_371
{
	r10 = _2E_str4133;
	r10 = (r10 - r8)|0;
	r11 = r3 & 255;
	r10 = heapU8[r10+1];
	if(r11 ==r10) //_LBB822_377
{
break _483;
}
else{
	r8 = (r8 + -1)|0;
}
}
else{
break _486;
}
}
	r7 = (r7 + 1)|0;
}
}
	r3 = heapU8[r7];
	if(r3 !=0) //_LBB822_379
{
	r3 = (r7 + 1)|0;
	r8 = 0;
	heap8[r7] = r8;
	r7 = r3;
}
}
}
	r3 = (r6 + 1)|0;
	heap32[(r9)] = r7;
	r7 = heapU8[r4];
_494: do {
	if(r7 ==0) //_LBB822_382
{
	r8 = 1;
}
else{
	r7 = 1;
_497: while(true){
	r8 = (r7 + 1)|0;
	r9 = heapU8[r4+r7];
	r7 = r8;
if(!(r9 !=0)) //_LBB822_383
{
break _494;
}
}
}
} while(0);
	r7 = _ZL17g_apPackFileNames;
	r6 = r6 << 2;
	r6 = (r7 + r6)|0;
	heap32[(g0)] = r8;
	r6 = r6 >> 2;
	_Znaj(i7);
	heap32[(r6+1)] = r_g0;
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = r4;
	r4 = 0;
	strcpy(i7);
}
	heap32[(g0)] = r2;
	free(i7);
}
}
	r0 = sp + -2440;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	r1 = _ZGVZ21Mandreel_GetTickCountE7s_first;
	gettimeofday(i7);
	r2 = heapU8[r1];
if(!(r2 !=0)) //_LBB822_391
{
	r2 = heap32[(fp+-610)];
	r3 = r2 >> 31;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 1000000;
	heap32[(g0+3)] = 0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	__muldi3(i7);
	r4 = 1;
	r5 = (r_g0 + r0)|0;
	r6 = 0;
	r7 = r0 >> 31;
	r2 = uint(r5) < uint(r_g0) ? r4 : r6;
	r6 = _ZZ21Mandreel_GetTickCountE7s_first;
	r3 = (r_g1 + r7)|0;
	r0 = uint(r5) < uint(r0) ? r4 : r2;
	r2 = r6 >> 2;
	r0 = (r3 + r0)|0;
	heap32[(r2)] = r5;
	heap32[(r2+1)] = r0;
	heap8[r1] = r4;
}
	return;
}
else{
	r2 = _2E_str34255;
	r0 = _2E_str1222;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 307;
	_assert(i7);
}
}