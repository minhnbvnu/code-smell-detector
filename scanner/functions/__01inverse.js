function __01inverse($vb,$vl,$in,$ch,$decodepart) {
 $vb = $vb|0;
 $vl = $vl|0;
 $in = $in|0;
 $ch = $ch|0;
 $decodepart = $decodepart|0;
 var $$ = 0, $$alloca_mul = 0, $$not = 0, $$not31 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0;
 var $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0;
 var $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $brmerge = 0, $exitcond = 0, $i$017 = 0, $i$1$lcssa = 0, $i$113 = 0, $i$113$us = 0;
 var $j$022 = 0, $j$18 = 0, $j$29$us = 0, $k$012 = 0, $k$012$us = 0, $l$014 = 0, $or$cond = 0, $or$cond$us = 0, $or$cond11 = 0, $s$020 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[$vl>>2]|0;
 $1 = ((($0)) + 8|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($vl)) + 16|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($vb)) + 36|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = $7 >> 1;
 $9 = ((($0)) + 4|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ($10|0)<($8|0);
 $$ = $11 ? $10 : $8;
 $12 = HEAP32[$0>>2]|0;
 $13 = (($$) - ($12))|0;
 $14 = ($13|0)>(0);
 if (!($14)) {
  STACKTOP = sp;return;
 }
 $15 = (($13|0) / ($2|0))&-1;
 $16 = $ch << 2;
 $$alloca_mul = $16;
 $17 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0;;
 $18 = ($ch|0)>(0);
 if ($18) {
  $19 = (($5) + -1)|0;
  $20 = (($19) + ($15))|0;
  $21 = (($20|0) / ($5|0))&-1;
  $22 = $21 << 2;
  $j$022 = 0;
  while(1) {
   $32 = (__vorbis_block_alloc($vb,$22)|0);
   $33 = (($17) + ($j$022<<2)|0);
   HEAP32[$33>>2] = $32;
   $34 = (($j$022) + 1)|0;
   $exitcond = ($34|0)==($ch|0);
   if ($exitcond) {
    break;
   } else {
    $j$022 = $34;
   }
  }
 }
 $23 = ((($vl)) + 8|0);
 $24 = HEAP32[$23>>2]|0;
 $25 = ($24|0)>(0);
 if (!($25)) {
  STACKTOP = sp;return;
 }
 $26 = ($15|0)>(0);
 $27 = ((($vb)) + 4|0);
 $28 = ((($0)) + 16|0);
 $29 = ((($vl)) + 28|0);
 $30 = ($5|0)>(0);
 $31 = ((($vl)) + 20|0);
 $$not31 = $18 ^ 1;
 $s$020 = 0;
 L12: while(1) {
  if ($26) {
   $35 = 1 << $s$020;
   $$not = ($s$020|0)!=(0);
   $brmerge = $$not | $$not31;
   $i$017 = 0;$l$014 = 0;
   while(1) {
    if (!($brmerge)) {
     $j$18 = 0;
     while(1) {
      $69 = HEAP32[$3>>2]|0;
      $70 = (_vorbis_book_decode($69,$27)|0);
      $71 = ($70|0)==(-1);
      if ($71) {
       label = 25;
       break L12;
      }
      $72 = HEAP32[$28>>2]|0;
      $73 = ($70|0)<($72|0);
      if (!($73)) {
       label = 25;
       break L12;
      }
      $74 = HEAP32[$29>>2]|0;
      $75 = (($74) + ($70<<2)|0);
      $76 = HEAP32[$75>>2]|0;
      $77 = (($17) + ($j$18<<2)|0);
      $78 = HEAP32[$77>>2]|0;
      $79 = (($78) + ($l$014<<2)|0);
      HEAP32[$79>>2] = $76;
      $80 = ($76|0)==(0);
      $67 = (($j$18) + 1)|0;
      if ($80) {
       label = 25;
       break L12;
      }
      $68 = ($67|0)<($ch|0);
      if ($68) {
       $j$18 = $67;
      } else {
       break;
      }
     }
    }
    $36 = ($i$017|0)<($15|0);
    $or$cond11 = $30 & $36;
    L25: do {
     if ($or$cond11) {
      if ($18) {
       $i$113$us = $i$017;$k$012$us = 0;
      } else {
       $i$113 = $i$017;$k$012 = 0;
       while(1) {
        $81 = (($k$012) + 1)|0;
        $82 = (($i$113) + 1)|0;
        $83 = ($81|0)<($5|0);
        $84 = ($82|0)<($15|0);
        $or$cond = $83 & $84;
        if ($or$cond) {
         $i$113 = $82;$k$012 = $81;
        } else {
         $i$1$lcssa = $82;
         break L25;
        }
       }
      }
      while(1) {
       $43 = Math_imul($i$113$us, $2)|0;
       $j$29$us = 0;
       while(1) {
        $41 = HEAP32[$0>>2]|0;
        $42 = (($41) + ($43))|0;
        $44 = (($17) + ($j$29$us<<2)|0);
        $45 = HEAP32[$44>>2]|0;
        $46 = (($45) + ($l$014<<2)|0);
        $47 = HEAP32[$46>>2]|0;
        $48 = (($47) + ($k$012$us<<2)|0);
        $49 = HEAP32[$48>>2]|0;
        $50 = (((($0)) + 24|0) + ($49<<2)|0);
        $51 = HEAP32[$50>>2]|0;
        $52 = $51 & $35;
        $53 = ($52|0)==(0);
        if (!($53)) {
         $54 = HEAP32[$31>>2]|0;
         $55 = (($54) + ($49<<2)|0);
         $56 = HEAP32[$55>>2]|0;
         $57 = (($56) + ($s$020<<2)|0);
         $58 = HEAP32[$57>>2]|0;
         $59 = ($58|0)==(0|0);
         if (!($59)) {
          $60 = (($in) + ($j$29$us<<2)|0);
          $61 = HEAP32[$60>>2]|0;
          $62 = (($61) + ($42<<2)|0);
          $63 = (FUNCTION_TABLE_iiiii[$decodepart & 3]($58,$62,$27,$2)|0);
          $64 = ($63|0)==(-1);
          if ($64) {
           label = 25;
           break L12;
          }
         }
        }
        $65 = (($j$29$us) + 1)|0;
        $66 = ($65|0)<($ch|0);
        if ($66) {
         $j$29$us = $65;
        } else {
         break;
        }
       }
       $37 = (($k$012$us) + 1)|0;
       $38 = (($i$113$us) + 1)|0;
       $39 = ($37|0)<($5|0);
       $40 = ($38|0)<($15|0);
       $or$cond$us = $39 & $40;
       if ($or$cond$us) {
        $i$113$us = $38;$k$012$us = $37;
       } else {
        $i$1$lcssa = $38;
        break;
       }
      }
     } else {
      $i$1$lcssa = $i$017;
     }
    } while(0);
    $85 = (($l$014) + 1)|0;
    $86 = ($i$1$lcssa|0)<($15|0);
    if ($86) {
     $i$017 = $i$1$lcssa;$l$014 = $85;
    } else {
     break;
    }
   }
  }
  $87 = (($s$020) + 1)|0;
  $88 = HEAP32[$23>>2]|0;
  $89 = ($87|0)<($88|0);
  if ($89) {
   $s$020 = $87;
  } else {
   label = 25;
   break;
  }
 }
 if ((label|0) == 25) {
  STACKTOP = sp;return;
 }
}