function _floor1_inverse1($vb,$in) {
 $vb = $vb|0;
 $in = $in|0;
 var $$0 = 0, $$0$i = 0, $$0$p$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $cval$1$ph = 0, $cval$15 = 0, $i$09 = 0, $i$14 = 0, $ispos$i = 0, $j$08 = 0, $k$06 = 0, $neg$i = 0, $val$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($in)) + 1296|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($vb)) + 64|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($3)) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($5)) + 28|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ((($7)) + 2848|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = ((($vb)) + 4|0);
 $11 = (_oggpack_read($10,1)|0);
 $12 = ($11|0)==(1);
 if (!($12)) {
  $$0 = 0;
  return ($$0|0);
 }
 $13 = ((($in)) + 1284|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = $14 << 2;
 $16 = (__vorbis_block_alloc($vb,$15)|0);
 $17 = ((($in)) + 1292|0);
 $18 = HEAP32[$17>>2]|0;
 $19 = (($18) + -1)|0;
 $20 = (_ov_ilog($19)|0);
 $21 = (_oggpack_read($10,$20)|0);
 HEAP32[$16>>2] = $21;
 $22 = HEAP32[$17>>2]|0;
 $23 = (($22) + -1)|0;
 $24 = (_ov_ilog($23)|0);
 $25 = (_oggpack_read($10,$24)|0);
 $26 = ((($16)) + 4|0);
 HEAP32[$26>>2] = $25;
 $27 = HEAP32[$1>>2]|0;
 $28 = ($27|0)>(0);
 L4: do {
  if ($28) {
   $i$09 = 0;$j$08 = 2;
   L5: while(1) {
    $33 = (((($1)) + 4|0) + ($i$09<<2)|0);
    $34 = HEAP32[$33>>2]|0;
    $35 = (((($1)) + 128|0) + ($34<<2)|0);
    $36 = HEAP32[$35>>2]|0;
    $37 = (((($1)) + 192|0) + ($34<<2)|0);
    $38 = HEAP32[$37>>2]|0;
    $39 = 1 << $38;
    $40 = ($38|0)==(0);
    if ($40) {
     $cval$1$ph = 0;
    } else {
     $41 = (((($1)) + 256|0) + ($34<<2)|0);
     $42 = HEAP32[$41>>2]|0;
     $43 = (($9) + (($42*56)|0)|0);
     $44 = (_vorbis_book_decode($43,$10)|0);
     $45 = ($44|0)==(-1);
     if ($45) {
      $$0 = 0;
      label = 25;
      break;
     } else {
      $cval$1$ph = $44;
     }
    }
    $46 = ($36|0)>(0);
    if ($46) {
     $47 = (($39) + -1)|0;
     $cval$15 = $cval$1$ph;$k$06 = 0;
     while(1) {
      $48 = $cval$15 & $47;
      $49 = ((((($1)) + 320|0) + ($34<<5)|0) + ($48<<2)|0);
      $50 = HEAP32[$49>>2]|0;
      $51 = $cval$15 >> $38;
      $52 = ($50|0)>(-1);
      if ($52) {
       $53 = (($9) + (($50*56)|0)|0);
       $54 = (_vorbis_book_decode($53,$10)|0);
       $55 = (($k$06) + ($j$08))|0;
       $56 = (($16) + ($55<<2)|0);
       HEAP32[$56>>2] = $54;
       $57 = ($54|0)==(-1);
       if ($57) {
        $$0 = 0;
        label = 25;
        break L5;
       }
      } else {
       $58 = (($k$06) + ($j$08))|0;
       $59 = (($16) + ($58<<2)|0);
       HEAP32[$59>>2] = 0;
      }
      $60 = (($k$06) + 1)|0;
      $61 = ($60|0)<($36|0);
      if ($61) {
       $cval$15 = $51;$k$06 = $60;
      } else {
       break;
      }
     }
    }
    $62 = (($36) + ($j$08))|0;
    $63 = (($i$09) + 1)|0;
    $64 = HEAP32[$1>>2]|0;
    $65 = ($63|0)<($64|0);
    if ($65) {
     $i$09 = $63;$j$08 = $62;
    } else {
     break L4;
    }
   }
   if ((label|0) == 25) {
    return ($$0|0);
   }
  }
 } while(0);
 $29 = HEAP32[$13>>2]|0;
 $30 = ($29|0)>(2);
 if (!($30)) {
  $$0 = $16;
  return ($$0|0);
 }
 $31 = ((($in)) + 1032|0);
 $32 = ((($in)) + 780|0);
 $i$14 = 2;
 while(1) {
  $66 = (($i$14) + -2)|0;
  $67 = (($31) + ($66<<2)|0);
  $68 = HEAP32[$67>>2]|0;
  $69 = (((($1)) + 836|0) + ($68<<2)|0);
  $70 = HEAP32[$69>>2]|0;
  $71 = (($32) + ($66<<2)|0);
  $72 = HEAP32[$71>>2]|0;
  $73 = (((($1)) + 836|0) + ($72<<2)|0);
  $74 = HEAP32[$73>>2]|0;
  $75 = (($16) + ($68<<2)|0);
  $76 = HEAP32[$75>>2]|0;
  $77 = (($16) + ($72<<2)|0);
  $78 = HEAP32[$77>>2]|0;
  $79 = (((($1)) + 836|0) + ($i$14<<2)|0);
  $80 = HEAP32[$79>>2]|0;
  $81 = $76 & 32767;
  $82 = $78 & 32767;
  $83 = (($82) - ($81))|0;
  $84 = (($74) - ($70))|0;
  $ispos$i = ($83|0)>(-1);
  $neg$i = (0 - ($83))|0;
  $85 = $ispos$i ? $83 : $neg$i;
  $86 = (($80) - ($70))|0;
  $87 = Math_imul($85, $86)|0;
  $88 = (($87|0) / ($84|0))&-1;
  $89 = ($83|0)<(0);
  $90 = (0 - ($88))|0;
  $$0$p$i = $89 ? $90 : $88;
  $$0$i = (($$0$p$i) + ($81))|0;
  $91 = HEAP32[$17>>2]|0;
  $92 = (($91) - ($$0$i))|0;
  $93 = (($16) + ($i$14<<2)|0);
  $94 = HEAP32[$93>>2]|0;
  $95 = ($94|0)==(0);
  if ($95) {
   $120 = $$0$i | 32768;
   HEAP32[$93>>2] = $120;
  } else {
   $96 = ($92|0)<($$0$i|0);
   $97 = $96 ? $92 : $$0$i;
   $98 = $97 << 1;
   $99 = ($94|0)<($98|0);
   do {
    if ($99) {
     $104 = $94 & 1;
     $105 = ($104|0)==(0);
     if ($105) {
      $109 = $94 >> 1;
      $val$0 = $109;
      break;
     } else {
      $106 = (($94) + 1)|0;
      $107 = $106 >> 1;
      $108 = (0 - ($107))|0;
      $val$0 = $108;
      break;
     }
    } else {
     $100 = ($92|0)>($$0$i|0);
     if ($100) {
      $101 = (($94) - ($$0$i))|0;
      $val$0 = $101;
      break;
     } else {
      $102 = (($94) - ($92))|0;
      $103 = $102 ^ -1;
      $val$0 = $103;
      break;
     }
    }
   } while(0);
   $110 = (($val$0) + ($$0$i))|0;
   $111 = $110 & 32767;
   HEAP32[$93>>2] = $111;
   $112 = HEAP32[$67>>2]|0;
   $113 = (($16) + ($112<<2)|0);
   $114 = HEAP32[$113>>2]|0;
   $115 = $114 & 32767;
   HEAP32[$113>>2] = $115;
   $116 = HEAP32[$71>>2]|0;
   $117 = (($16) + ($116<<2)|0);
   $118 = HEAP32[$117>>2]|0;
   $119 = $118 & 32767;
   HEAP32[$117>>2] = $119;
  }
  $121 = (($i$14) + 1)|0;
  $122 = HEAP32[$13>>2]|0;
  $123 = ($121|0)<($122|0);
  if ($123) {
   $i$14 = $121;
  } else {
   $$0 = $16;
   break;
  }
 }
 return ($$0|0);
}