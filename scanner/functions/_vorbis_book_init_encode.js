function _vorbis_book_init_encode($c,$s) {
 $c = $c|0;
 $s = $s|0;
 var $$$i = 0.0, $$$i2 = 0.0, $$lcssa = 0, $$lcssa8 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0.0, $33 = 0, $34 = 0, $35 = 0, $36 = 0.0, $37 = 0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0.0, $46 = 0, $47 = 0, $48 = 0, $49 = 0.0, $5 = 0, $50 = 0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $acc$01$us$i = 0;
 var $acc1$02$us$i = 0, $exitcond = 0, $i$03$us$i = 0, $or$cond$us$i = 0, $rintf = 0.0, $rintf1 = 0.0, $vals$0$us$be$i = 0, $vals$0$us$be$v$i = 0, $vals$0$us$i = 0, $vals$0$us$i$lcssa = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 dest=$c; stop=dest+56|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $0 = ((($c)) + 12|0);
 HEAP32[$0>>2] = $s;
 $1 = ((($s)) + 4|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($c)) + 4|0);
 HEAP32[$3>>2] = $2;
 $4 = ((($c)) + 8|0);
 HEAP32[$4>>2] = $2;
 $5 = HEAP32[$s>>2]|0;
 HEAP32[$c>>2] = $5;
 $6 = ((($s)) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (__make_words($7,$2,0)|0);
 $9 = ((($c)) + 20|0);
 HEAP32[$9>>2] = $8;
 $10 = HEAP32[$1>>2]|0;
 $11 = HEAP32[$s>>2]|0;
 $12 = ($11|0)>(0);
 if (!($12)) {
  while(1) {
  }
 }
 $13 = (+($10|0));
 $14 = $13;
 $15 = (+($11|0));
 $16 = 1.0 / $15;
 $17 = $16;
 $18 = (+Math_pow((+$14),(+$17)));
 $19 = (+Math_floor((+$18)));
 $20 = (~~(($19)));
 $vals$0$us$i = $20;
 while(1) {
  $26 = (($vals$0$us$i) + 1)|0;
  $acc$01$us$i = 1;$acc1$02$us$i = 1;$i$03$us$i = 0;
  while(1) {
   $24 = Math_imul($acc$01$us$i, $vals$0$us$i)|0;
   $25 = Math_imul($acc1$02$us$i, $26)|0;
   $27 = (($i$03$us$i) + 1)|0;
   $exitcond = ($27|0)==($11|0);
   if ($exitcond) {
    $$lcssa = $24;$$lcssa8 = $25;
    break;
   } else {
    $acc$01$us$i = $24;$acc1$02$us$i = $25;$i$03$us$i = $27;
   }
  }
  $21 = ($$lcssa|0)<=($10|0);
  $22 = ($$lcssa8|0)>($10|0);
  $or$cond$us$i = $22 & $21;
  if ($or$cond$us$i) {
   $vals$0$us$i$lcssa = $vals$0$us$i;
   break;
  }
  $23 = ($$lcssa|0)>($10|0);
  $vals$0$us$be$v$i = $23 ? -1 : 1;
  $vals$0$us$be$i = (($vals$0$us$be$v$i) + ($vals$0$us$i))|0;
  $vals$0$us$i = $vals$0$us$be$i;
 }
 $28 = ((($c)) + 44|0);
 HEAP32[$28>>2] = $vals$0$us$i$lcssa;
 $29 = ((($s)) + 16|0);
 $30 = HEAP32[$29>>2]|0;
 $31 = $30 & 2097151;
 $32 = (+($31|0));
 $33 = $30 >>> 21;
 $34 = $33 & 1023;
 $35 = ($30|0)<(0);
 $36 = -$32;
 $$$i = $35 ? $36 : $32;
 $37 = (($34) + -788)|0;
 $38 = (+_ldexp($$$i,$37));
 $39 = $38;
 $rintf = (+_rintf($39));
 $40 = (~~(($rintf)));
 $41 = ((($c)) + 48|0);
 HEAP32[$41>>2] = $40;
 $42 = ((($s)) + 20|0);
 $43 = HEAP32[$42>>2]|0;
 $44 = $43 & 2097151;
 $45 = (+($44|0));
 $46 = $43 >>> 21;
 $47 = $46 & 1023;
 $48 = ($43|0)<(0);
 $49 = -$45;
 $$$i2 = $48 ? $49 : $45;
 $50 = (($47) + -788)|0;
 $51 = (+_ldexp($$$i2,$50));
 $52 = $51;
 $rintf1 = (+_rintf($52));
 $53 = (~~(($rintf1)));
 $54 = ((($c)) + 52|0);
 HEAP32[$54>>2] = $53;
 return 0;
}