function __ve_envelope_init($e,$vi) {
 $e = $e|0;
 $vi = $vi|0;
 var $$lcssa = 0.0, $$phi$trans$insert = 0, $$phi$trans$insert8 = 0, $$pre = 0, $$pre$phiZ2D = 0, $$pre9 = 0.0, $$promoted = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0.0, $19 = 0.0, $2 = 0;
 var $20 = 0.0, $21 = 0.0, $22 = 0, $23 = 0.0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0.0, $45 = 0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0, $53 = 0.0, $54 = 0.0, $55 = 0, $56 = 0.0;
 var $57 = 0.0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $exitcond4 = 0, $exitcond5 = 0, $i$03 = 0, $i$11 = 0, $j$02 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($vi)) + 28|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($vi)) + 4|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($e)) + 4|0);
 HEAP32[$4>>2] = 128;
 $5 = ((($e)) + 8|0);
 HEAP32[$5>>2] = 64;
 $6 = ((($1)) + 2932|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ((($e)) + 12|0);
 HEAP32[$8>>2] = $7;
 HEAP32[$e>>2] = $3;
 $9 = ((($e)) + 164|0);
 HEAP32[$9>>2] = 128;
 $10 = ((($1)) + 4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (($11|0) / 2)&-1;
 $13 = ((($e)) + 176|0);
 HEAP32[$13>>2] = $12;
 $14 = (_calloc(128,4)|0);
 $15 = ((($e)) + 36|0);
 HEAP32[$15>>2] = $14;
 $16 = ((($e)) + 16|0);
 _mdct_init($16,128);
 $17 = HEAP32[$15>>2]|0;
 $i$03 = 0;
 while(1) {
  $18 = (+($i$03|0));
  $19 = $18 * 0.024736950028266088;
  $20 = (+Math_sin((+$19)));
  $21 = $20;
  $22 = (($17) + ($i$03<<2)|0);
  $23 = $21 * $21;
  HEAPF32[$22>>2] = $23;
  $24 = (($i$03) + 1)|0;
  $exitcond5 = ($24|0)==(128);
  if ($exitcond5) {
   break;
  } else {
   $i$03 = $24;
  }
 }
 $25 = ((($e)) + 40|0);
 HEAP32[$25>>2] = 2;
 $26 = ((($e)) + 44|0);
 HEAP32[$26>>2] = 4;
 $27 = ((($e)) + 56|0);
 HEAP32[$27>>2] = 4;
 $28 = ((($e)) + 60|0);
 HEAP32[$28>>2] = 5;
 $29 = ((($e)) + 72|0);
 HEAP32[$29>>2] = 6;
 $30 = ((($e)) + 76|0);
 HEAP32[$30>>2] = 6;
 $31 = ((($e)) + 88|0);
 HEAP32[$31>>2] = 9;
 $32 = ((($e)) + 92|0);
 HEAP32[$32>>2] = 8;
 $33 = ((($e)) + 104|0);
 HEAP32[$33>>2] = 13;
 $34 = ((($e)) + 108|0);
 HEAP32[$34>>2] = 8;
 $35 = ((($e)) + 120|0);
 HEAP32[$35>>2] = 17;
 $36 = ((($e)) + 124|0);
 HEAP32[$36>>2] = 8;
 $37 = ((($e)) + 136|0);
 HEAP32[$37>>2] = 22;
 $38 = ((($e)) + 140|0);
 HEAP32[$38>>2] = 8;
 $40 = 4;$j$02 = 0;
 while(1) {
  $39 = $40 << 2;
  $41 = (_malloc($39)|0);
  $42 = (((((($e)) + 40|0) + ($j$02<<4)|0)) + 8|0);
  HEAP32[$42>>2] = $41;
  $43 = ($40|0)>(0);
  if ($43) {
   $44 = (+($40|0));
   $45 = (((((($e)) + 40|0) + ($j$02<<4)|0)) + 12|0);
   $$promoted = +HEAPF32[$45>>2];
   $54 = $$promoted;$i$11 = 0;
   while(1) {
    $46 = (+($i$11|0));
    $47 = $46 + 0.5;
    $48 = $47 / $44;
    $49 = $48 * 3.1415926535897931;
    $50 = (+Math_sin((+$49)));
    $51 = $50;
    $52 = (($41) + ($i$11<<2)|0);
    HEAPF32[$52>>2] = $51;
    $53 = $54 + $51;
    $55 = (($i$11) + 1)|0;
    $exitcond = ($55|0)==($40|0);
    if ($exitcond) {
     $$lcssa = $53;
     break;
    } else {
     $54 = $53;$i$11 = $55;
    }
   }
   HEAPF32[$45>>2] = $$lcssa;
   $$pre$phiZ2D = $45;$57 = $$lcssa;
  } else {
   $$phi$trans$insert8 = (((((($e)) + 40|0) + ($j$02<<4)|0)) + 12|0);
   $$pre9 = +HEAPF32[$$phi$trans$insert8>>2];
   $$pre$phiZ2D = $$phi$trans$insert8;$57 = $$pre9;
  }
  $56 = 1.0 / $57;
  HEAPF32[$$pre$phiZ2D>>2] = $56;
  $58 = (($j$02) + 1)|0;
  $exitcond4 = ($58|0)==(7);
  if ($exitcond4) {
   break;
  }
  $$phi$trans$insert = (((((($e)) + 40|0) + ($58<<4)|0)) + 4|0);
  $$pre = HEAP32[$$phi$trans$insert>>2]|0;
  $40 = $$pre;$j$02 = $58;
 }
 $59 = ($3*7)|0;
 $60 = (_calloc($59,144)|0);
 $61 = ((($e)) + 152|0);
 HEAP32[$61>>2] = $60;
 $62 = HEAP32[$9>>2]|0;
 $63 = (_calloc($62,4)|0);
 $64 = ((($e)) + 160|0);
 HEAP32[$64>>2] = $63;
 return;
}