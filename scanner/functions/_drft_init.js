function _drft_init($l,$n) {
 $l = $l|0;
 $n = $n|0;
 var $$lcssa = 0, $$not$i$i = 0, $$sum$i = 0, $$sum1$i = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0.0, $3 = 0, $30 = 0.0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $cosf$i$i = 0.0, $exitcond$i$i = 0, $exitcond28$i$i = 0, $exitcond29$i$i = 0, $fi$010$i$i = 0.0, $i$021$i$i = 0, $i$19$i$i = 0, $ii$08$i$i = 0, $indvars$iv$i$i = 0, $indvars$iv$i$i$lcssa18 = 0, $indvars$iv$in$i$i = 0, $indvars$iv$in$i$i$lcssa16 = 0, $is$018$i$i = 0, $is$1$lcssa$i$i = 0, $is$112$i$i = 0, $j$0$i$i = 0, $j$113$i$i = 0, $k1$019$i$i = 0, $l1$017$i$i = 0, $ld$011$i$i = 0;
 var $nf$0$i$i = 0, $nl$0$i$i = 0, $nl$1$i$i = 0, $ntry$0$i$i = 0, $ntry$1$ph$i$i = 0, $or$cond$i$i = 0, $or$cond33$i$i = 0, $sinf$i$i = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAP32[$l>>2] = $n;
 $0 = ($n*3)|0;
 $1 = (_calloc($0,4)|0);
 $2 = ((($l)) + 4|0);
 HEAP32[$2>>2] = $1;
 $3 = (_calloc(32,4)|0);
 $4 = ((($l)) + 8|0);
 HEAP32[$4>>2] = $3;
 $5 = ($n|0)==(1);
 if ($5) {
  return;
 }
 $6 = ((($3)) + 8|0);
 $j$0$i$i = -1;$nf$0$i$i = 0;$nl$0$i$i = $n;$ntry$0$i$i = 0;
 L4: while(1) {
  $7 = (($j$0$i$i) + 1)|0;
  $8 = ($7|0)<(4);
  if ($8) {
   $9 = (25768 + ($7<<2)|0);
   $10 = HEAP32[$9>>2]|0;
   $ntry$1$ph$i$i = $10;
  } else {
   $11 = (($ntry$0$i$i) + 2)|0;
   $ntry$1$ph$i$i = $11;
  }
  $12 = ($ntry$1$ph$i$i|0)!=(2);
  $indvars$iv$in$i$i = $nf$0$i$i;$nl$1$i$i = $nl$0$i$i;
  while(1) {
   $indvars$iv$i$i = (($indvars$iv$in$i$i) + 1)|0;
   $13 = (($nl$1$i$i|0) / ($ntry$1$ph$i$i|0))&-1;
   $14 = Math_imul($13, $ntry$1$ph$i$i)|0;
   $15 = ($nl$1$i$i|0)==($14|0);
   if (!($15)) {
    $j$0$i$i = $7;$nf$0$i$i = $indvars$iv$in$i$i;$nl$0$i$i = $nl$1$i$i;$ntry$0$i$i = $ntry$1$ph$i$i;
    continue L4;
   }
   $16 = (($indvars$iv$in$i$i) + 2)|0;
   $17 = (($3) + ($16<<2)|0);
   HEAP32[$17>>2] = $ntry$1$ph$i$i;
   $18 = ($indvars$iv$in$i$i|0)==(0);
   $or$cond$i$i = $12 | $18;
   if (!($or$cond$i$i)) {
    $19 = ($indvars$iv$in$i$i|0)<(1);
    if (!($19)) {
     $i$021$i$i = 1;
     while(1) {
      $20 = (($indvars$iv$i$i) - ($i$021$i$i))|0;
      $21 = (($20) + 1)|0;
      $22 = (($3) + ($21<<2)|0);
      $23 = HEAP32[$22>>2]|0;
      $24 = (($20) + 2)|0;
      $25 = (($3) + ($24<<2)|0);
      HEAP32[$25>>2] = $23;
      $26 = (($i$021$i$i) + 1)|0;
      $exitcond29$i$i = ($26|0)==($indvars$iv$i$i|0);
      if ($exitcond29$i$i) {
       break;
      } else {
       $i$021$i$i = $26;
      }
     }
    }
    HEAP32[$6>>2] = 2;
   }
   $27 = ($13|0)==(1);
   if ($27) {
    $$lcssa = $18;$indvars$iv$i$i$lcssa18 = $indvars$iv$i$i;$indvars$iv$in$i$i$lcssa16 = $indvars$iv$in$i$i;
    break L4;
   } else {
    $indvars$iv$in$i$i = $indvars$iv$i$i;$nl$1$i$i = $13;
   }
  }
 }
 HEAP32[$3>>2] = $n;
 $28 = ((($3)) + 4|0);
 HEAP32[$28>>2] = $indvars$iv$i$i$lcssa18;
 $29 = (+($n|0));
 $30 = 6.2831854820251465 / $29;
 $$not$i$i = $$lcssa ^ 1;
 $31 = ($indvars$iv$in$i$i$lcssa16|0)>(0);
 $or$cond33$i$i = $31 & $$not$i$i;
 if (!($or$cond33$i$i)) {
  return;
 }
 $32 = (($n) + 1)|0;
 $is$018$i$i = 0;$k1$019$i$i = 0;$l1$017$i$i = 1;
 while(1) {
  $33 = (($k1$019$i$i) + 2)|0;
  $34 = (($3) + ($33<<2)|0);
  $35 = HEAP32[$34>>2]|0;
  $36 = Math_imul($35, $l1$017$i$i)|0;
  $37 = (($n|0) / ($36|0))&-1;
  $38 = ($35|0)>(1);
  if ($38) {
   $39 = ($37|0)>(2);
   $40 = (($35) + -1)|0;
   $is$112$i$i = $is$018$i$i;$j$113$i$i = 0;$ld$011$i$i = 0;
   while(1) {
    $41 = (($ld$011$i$i) + ($l1$017$i$i))|0;
    $42 = (+($41|0));
    $43 = $42 * $30;
    if ($39) {
     $fi$010$i$i = 0.0;$i$19$i$i = $is$112$i$i;$ii$08$i$i = 2;
     while(1) {
      $44 = $fi$010$i$i + 1.0;
      $45 = $43 * $44;
      $cosf$i$i = (+Math_cos((+$45)));
      $$sum$i = (($i$19$i$i) + ($n))|0;
      $46 = (($1) + ($$sum$i<<2)|0);
      HEAPF32[$46>>2] = $cosf$i$i;
      $sinf$i$i = (+Math_sin((+$45)));
      $47 = (($i$19$i$i) + 2)|0;
      $$sum1$i = (($32) + ($i$19$i$i))|0;
      $48 = (($1) + ($$sum1$i<<2)|0);
      HEAPF32[$48>>2] = $sinf$i$i;
      $49 = (($ii$08$i$i) + 2)|0;
      $50 = ($49|0)<($37|0);
      if ($50) {
       $fi$010$i$i = $44;$i$19$i$i = $47;$ii$08$i$i = $49;
      } else {
       break;
      }
     }
    }
    $51 = (($is$112$i$i) + ($37))|0;
    $52 = (($j$113$i$i) + 1)|0;
    $exitcond$i$i = ($52|0)==($40|0);
    if ($exitcond$i$i) {
     break;
    } else {
     $is$112$i$i = $51;$j$113$i$i = $52;$ld$011$i$i = $41;
    }
   }
   $53 = Math_imul($37, $40)|0;
   $54 = (($53) + ($is$018$i$i))|0;
   $is$1$lcssa$i$i = $54;
  } else {
   $is$1$lcssa$i$i = $is$018$i$i;
  }
  $55 = (($k1$019$i$i) + 1)|0;
  $exitcond28$i$i = ($55|0)==($indvars$iv$in$i$i$lcssa16|0);
  if ($exitcond28$i$i) {
   break;
  } else {
   $is$018$i$i = $is$1$lcssa$i$i;$k1$019$i$i = $55;$l1$017$i$i = $36;
  }
 }
 return;
}