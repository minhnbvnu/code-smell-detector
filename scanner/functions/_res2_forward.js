function _res2_forward($opb,$vb,$vl,$in,$nonzero,$ch,$partword,$submap) {
 $opb = $opb|0;
 $vb = $vb|0;
 $vl = $vl|0;
 $in = $in|0;
 $nonzero = $nonzero|0;
 $ch = $ch|0;
 $partword = $partword|0;
 $submap = $submap|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $exitcond = 0, $i$03 = 0, $j$01 = 0, $k$02 = 0, $not$ = 0, $phitmp = 0, $used$0$ = 0, $used$0$$lcssa = 0, $used$04 = 0, $work = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $work = sp;
 $0 = ((($vb)) + 36|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = (($1|0) / 2)&-1;
 $3 = $ch << 2;
 $4 = Math_imul($3, $2)|0;
 $5 = (__vorbis_block_alloc($vb,$4)|0);
 HEAP32[$work>>2] = $5;
 $6 = ($ch|0)>(0);
 if (!($6)) {
  STACKTOP = sp;return 0;
 }
 $7 = ($1|0)>(1);
 $i$03 = 0;$used$04 = 0;
 while(1) {
  $8 = (($in) + ($i$03<<2)|0);
  $9 = HEAP32[$8>>2]|0;
  $10 = (($nonzero) + ($i$03<<2)|0);
  $11 = HEAP32[$10>>2]|0;
  $not$ = ($11|0)!=(0);
  $12 = $not$&1;
  $used$0$ = (($12) + ($used$04))|0;
  if ($7) {
   $j$01 = 0;$k$02 = $i$03;
   while(1) {
    $13 = (($9) + ($j$01<<2)|0);
    $14 = HEAP32[$13>>2]|0;
    $15 = (($5) + ($k$02<<2)|0);
    HEAP32[$15>>2] = $14;
    $16 = (($j$01) + 1)|0;
    $17 = (($k$02) + ($ch))|0;
    $18 = ($16|0)<($2|0);
    if ($18) {
     $j$01 = $16;$k$02 = $17;
    } else {
     break;
    }
   }
  }
  $19 = (($i$03) + 1)|0;
  $exitcond = ($19|0)==($ch|0);
  if ($exitcond) {
   $used$0$$lcssa = $used$0$;
   break;
  } else {
   $i$03 = $19;$used$04 = $used$0$;
  }
 }
 $phitmp = ($used$0$$lcssa|0)==(0);
 if ($phitmp) {
  STACKTOP = sp;return 0;
 }
 __01forward($opb,$vl,$work,1,$partword);
 STACKTOP = sp;return 0;
}