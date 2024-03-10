function _res2_class($vb,$vl,$in,$nonzero,$ch) {
 $vb = $vb|0;
 $vl = $vl|0;
 $in = $in|0;
 $nonzero = $nonzero|0;
 $ch = $ch|0;
 var $$0 = 0, $$angmax$1$i = 0, $$magmax$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $angmax$0$lcssa$i = 0, $angmax$09$i = 0, $angmax$1$lcssa$i = 0;
 var $angmax$15$i = 0, $exitcond = 0, $exitcond$i = 0, $exitcond25$i = 0, $i$01 = 0, $i$021$i = 0, $ispos$i = 0, $ispos1$i = 0, $j$07$i = 0, $j$1$lcssa$i = 0, $j$114$i = 0, $k$04$i = 0, $l$020$i = 0, $l$1$lcssa$i = 0, $l$16$i = 0, $magmax$0$lcssa$i = 0, $magmax$08$i = 0, $neg$i = 0, $neg2$i = 0, $not$ = 0;
 var $phitmp = 0, $used$0$ = 0, $used$0$$lcssa = 0, $used$02 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($ch|0)>(0);
 if ($0) {
  $i$01 = 0;$used$02 = 0;
 } else {
  $$0 = 0;
  return ($$0|0);
 }
 while(1) {
  $1 = (($nonzero) + ($i$01<<2)|0);
  $2 = HEAP32[$1>>2]|0;
  $not$ = ($2|0)!=(0);
  $3 = $not$&1;
  $used$0$ = (($3) + ($used$02))|0;
  $4 = (($i$01) + 1)|0;
  $exitcond = ($4|0)==($ch|0);
  if ($exitcond) {
   $used$0$$lcssa = $used$0$;
   break;
  } else {
   $i$01 = $4;$used$02 = $used$0$;
  }
 }
 $phitmp = ($used$0$$lcssa|0)==(0);
 if ($phitmp) {
  $$0 = 0;
  return ($$0|0);
 }
 $5 = HEAP32[$vl>>2]|0;
 $6 = ((($5)) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ((($5)) + 12|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = ((($5)) + 4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = HEAP32[$5>>2]|0;
 $13 = (($11) - ($12))|0;
 $14 = (($13|0) / ($7|0))&-1;
 $15 = (__vorbis_block_alloc($vb,4)|0);
 $16 = $14 << 2;
 $17 = (__vorbis_block_alloc($vb,$16)|0);
 HEAP32[$15>>2] = $17;
 _memset(($17|0),0,($16|0))|0;
 $18 = ($14|0)>(0);
 if ($18) {
  $19 = HEAP32[$5>>2]|0;
  $20 = (($19|0) / ($ch|0))&-1;
  $21 = ($7|0)>(0);
  $22 = (($9) + -1)|0;
  $23 = ($9|0)>(1);
  $24 = HEAP32[$15>>2]|0;
  $25 = ($ch|0)>(1);
  $i$021$i = 0;$l$020$i = $20;
  while(1) {
   if ($21) {
    $26 = HEAP32[$in>>2]|0;
    $angmax$09$i = 0;$j$07$i = 0;$l$16$i = $l$020$i;$magmax$08$i = 0;
    while(1) {
     $27 = (($26) + ($l$16$i<<2)|0);
     $28 = HEAP32[$27>>2]|0;
     $ispos$i = ($28|0)>(-1);
     $neg$i = (0 - ($28))|0;
     $29 = $ispos$i ? $28 : $neg$i;
     $30 = ($29|0)>($magmax$08$i|0);
     $$magmax$0$i = $30 ? $29 : $magmax$08$i;
     if ($25) {
      $angmax$15$i = $angmax$09$i;$k$04$i = 1;
      while(1) {
       $31 = (($in) + ($k$04$i<<2)|0);
       $32 = HEAP32[$31>>2]|0;
       $33 = (($32) + ($l$16$i<<2)|0);
       $34 = HEAP32[$33>>2]|0;
       $ispos1$i = ($34|0)>(-1);
       $neg2$i = (0 - ($34))|0;
       $35 = $ispos1$i ? $34 : $neg2$i;
       $36 = ($35|0)>($angmax$15$i|0);
       $$angmax$1$i = $36 ? $35 : $angmax$15$i;
       $37 = (($k$04$i) + 1)|0;
       $exitcond$i = ($37|0)==($ch|0);
       if ($exitcond$i) {
        $angmax$1$lcssa$i = $$angmax$1$i;
        break;
       } else {
        $angmax$15$i = $$angmax$1$i;$k$04$i = $37;
       }
      }
     } else {
      $angmax$1$lcssa$i = $angmax$09$i;
     }
     $38 = (($l$16$i) + 1)|0;
     $39 = (($j$07$i) + ($ch))|0;
     $40 = ($39|0)<($7|0);
     if ($40) {
      $angmax$09$i = $angmax$1$lcssa$i;$j$07$i = $39;$l$16$i = $38;$magmax$08$i = $$magmax$0$i;
     } else {
      $angmax$0$lcssa$i = $angmax$1$lcssa$i;$l$1$lcssa$i = $38;$magmax$0$lcssa$i = $$magmax$0$i;
      break;
     }
    }
   } else {
    $angmax$0$lcssa$i = 0;$l$1$lcssa$i = $l$020$i;$magmax$0$lcssa$i = 0;
   }
   L22: do {
    if ($23) {
     $j$114$i = 0;
     while(1) {
      $41 = (((($5)) + 2328|0) + ($j$114$i<<2)|0);
      $42 = HEAP32[$41>>2]|0;
      $43 = ($magmax$0$lcssa$i|0)>($42|0);
      if (!($43)) {
       $44 = (((($5)) + 2584|0) + ($j$114$i<<2)|0);
       $45 = HEAP32[$44>>2]|0;
       $46 = ($angmax$0$lcssa$i|0)>($45|0);
       if (!($46)) {
        $j$1$lcssa$i = $j$114$i;
        break L22;
       }
      }
      $47 = (($j$114$i) + 1)|0;
      $48 = ($47|0)<($22|0);
      if ($48) {
       $j$114$i = $47;
      } else {
       $j$1$lcssa$i = $47;
       break;
      }
     }
    } else {
     $j$1$lcssa$i = 0;
    }
   } while(0);
   $49 = (($24) + ($i$021$i<<2)|0);
   HEAP32[$49>>2] = $j$1$lcssa$i;
   $50 = (($i$021$i) + 1)|0;
   $exitcond25$i = ($50|0)==($14|0);
   if ($exitcond25$i) {
    break;
   } else {
    $i$021$i = $50;$l$020$i = $l$1$lcssa$i;
   }
  }
 }
 $51 = ((($vl)) + 40|0);
 $52 = HEAP32[$51>>2]|0;
 $53 = (($52) + 1)|0;
 HEAP32[$51>>2] = $53;
 $$0 = $15;
 return ($$0|0);
}