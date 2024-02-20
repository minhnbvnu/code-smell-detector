function _seed_chase($seeds,$linesper,$n) {
 $seeds = $seeds|0;
 $linesper = $linesper|0;
 $n = $n|0;
 var $$alloca_mul = 0, $$alloca_mul1 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0.0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0.0, $39 = 0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0;
 var $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0, $endpos$0 = 0, $exitcond = 0;
 var $exitcond18 = 0, $exitcond19 = 0, $i$012 = 0, $i$17 = 0, $n$endpos$0 = 0, $or$cond = 0, $pos$06 = 0, $pos$1$lcssa = 0, $pos$15 = 0, $stack$011 = 0, $stack$1 = 0, $stack$1$lcssa = 0, $stack$1$lcssa23 = 0, $stack$2 = 0, $stack$2$in = 0, $stack$2$in$lcssa = 0, $stack$2$lcssa = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $n << 2;
 $$alloca_mul = $0;
 $1 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0;;
 $$alloca_mul1 = $0;
 $2 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul1)|0)+15)&-16)|0;;
 $3 = ($n|0)>(0);
 if ($3) {
  $i$012 = 0;$stack$011 = 0;
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $6 = ($stack$011|0)<(2);
  do {
   if ($6) {
    $9 = (($1) + ($stack$011<<2)|0);
    HEAP32[$9>>2] = $i$012;
    $10 = (($seeds) + ($i$012<<2)|0);
    $11 = HEAP32[$10>>2]|0;
    $12 = (($2) + ($stack$011<<2)|0);
    HEAP32[$12>>2] = $11;
    $stack$2$in = $stack$011;
   } else {
    $7 = (($seeds) + ($i$012<<2)|0);
    $8 = +HEAPF32[$7>>2];
    $stack$1 = $stack$011;
    while(1) {
     $13 = (($stack$1) + -1)|0;
     $14 = (($2) + ($13<<2)|0);
     $15 = +HEAPF32[$14>>2];
     $16 = $8 < $15;
     if ($16) {
      $stack$1$lcssa = $stack$1;
      label = 8;
      break;
     }
     $19 = (($1) + ($13<<2)|0);
     $20 = HEAP32[$19>>2]|0;
     $21 = (($20) + ($linesper))|0;
     $22 = ($i$012|0)<($21|0);
     $23 = ($stack$1|0)>(1);
     $or$cond = $23 & $22;
     if (!($or$cond)) {
      $stack$1$lcssa23 = $stack$1;
      label = 12;
      break;
     }
     $24 = (($stack$1) + -2)|0;
     $25 = (($2) + ($24<<2)|0);
     $26 = +HEAPF32[$25>>2];
     $27 = !($15 <= $26);
     if ($27) {
      $stack$1$lcssa23 = $stack$1;
      label = 12;
      break;
     }
     $28 = (($1) + ($24<<2)|0);
     $29 = HEAP32[$28>>2]|0;
     $30 = (($29) + ($linesper))|0;
     $31 = ($i$012|0)<($30|0);
     if ($31) {
      $stack$1 = $13;
     } else {
      $stack$1$lcssa23 = $stack$1;
      label = 12;
      break;
     }
    }
    if ((label|0) == 8) {
     label = 0;
     $17 = (($1) + ($stack$1$lcssa<<2)|0);
     HEAP32[$17>>2] = $i$012;
     $18 = (($2) + ($stack$1$lcssa<<2)|0);
     HEAPF32[$18>>2] = $8;
     $stack$2$in = $stack$1$lcssa;
     break;
    }
    else if ((label|0) == 12) {
     label = 0;
     $32 = (($1) + ($stack$1$lcssa23<<2)|0);
     HEAP32[$32>>2] = $i$012;
     $33 = (($2) + ($stack$1$lcssa23<<2)|0);
     HEAPF32[$33>>2] = $8;
     $stack$2$in = $stack$1$lcssa23;
     break;
    }
   }
  } while(0);
  $stack$2 = (($stack$2$in) + 1)|0;
  $34 = (($i$012) + 1)|0;
  $exitcond19 = ($34|0)==($n|0);
  if ($exitcond19) {
   $stack$2$in$lcssa = $stack$2$in;$stack$2$lcssa = $stack$2;
   break;
  } else {
   $i$012 = $34;$stack$011 = $stack$2;
  }
 }
 $4 = ($stack$2$in$lcssa|0)>(-1);
 if (!($4)) {
  STACKTOP = sp;return;
 }
 $5 = (($linesper) + 1)|0;
 $i$17 = 0;$pos$06 = 0;
 while(1) {
  $35 = ($i$17|0)<($stack$2$in$lcssa|0);
  if ($35) {
   $36 = (($i$17) + 1)|0;
   $37 = (($2) + ($36<<2)|0);
   $38 = +HEAPF32[$37>>2];
   $39 = (($2) + ($i$17<<2)|0);
   $40 = +HEAPF32[$39>>2];
   $41 = $38 > $40;
   if ($41) {
    $42 = (($1) + ($36<<2)|0);
    $43 = HEAP32[$42>>2]|0;
    $endpos$0 = $43;
   } else {
    label = 17;
   }
  } else {
   label = 17;
  }
  if ((label|0) == 17) {
   label = 0;
   $44 = (($1) + ($i$17<<2)|0);
   $45 = HEAP32[$44>>2]|0;
   $46 = (($5) + ($45))|0;
   $endpos$0 = $46;
  }
  $47 = ($endpos$0|0)>($n|0);
  $n$endpos$0 = $47 ? $n : $endpos$0;
  $48 = ($pos$06|0)<($n$endpos$0|0);
  if ($48) {
   $49 = (($2) + ($i$17<<2)|0);
   $50 = HEAP32[$49>>2]|0;
   $51 = ($endpos$0|0)<($n|0);
   $52 = $51 ? $endpos$0 : $n;
   $pos$15 = $pos$06;
   while(1) {
    $53 = (($seeds) + ($pos$15<<2)|0);
    HEAP32[$53>>2] = $50;
    $54 = (($pos$15) + 1)|0;
    $exitcond = ($54|0)==($52|0);
    if ($exitcond) {
     $pos$1$lcssa = $52;
     break;
    } else {
     $pos$15 = $54;
    }
   }
  } else {
   $pos$1$lcssa = $pos$06;
  }
  $55 = (($i$17) + 1)|0;
  $exitcond18 = ($55|0)==($stack$2$lcssa|0);
  if ($exitcond18) {
   break;
  } else {
   $i$17 = $55;$pos$06 = $pos$1$lcssa;
  }
 }
 STACKTOP = sp;return;
}