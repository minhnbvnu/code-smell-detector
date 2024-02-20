function __book_maptype1_quantvals($b) {
 $b = $b|0;
 var $$lcssa = 0, $$lcssa10 = 0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0.0, $5 = 0.0, $6 = 0.0, $7 = 0.0;
 var $8 = 0.0, $9 = 0.0, $acc$01$us = 0, $acc1$02$us = 0, $i$03$us = 0, $or$cond$us = 0, $vals$0$us = 0, $vals$0$us$be = 0, $vals$0$us$be$v = 0, $vals$0$us$lcssa = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($b)) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = HEAP32[$b>>2]|0;
 $3 = ($2|0)>(0);
 if (!($3)) {
  while(1) {
  }
 }
 $4 = (+($1|0));
 $5 = $4;
 $6 = (+($2|0));
 $7 = 1.0 / $6;
 $8 = $7;
 $9 = (+Math_pow((+$5),(+$8)));
 $10 = (+Math_floor((+$9)));
 $11 = (~~(($10)));
 $vals$0$us = $11;
 while(1) {
  $17 = (($vals$0$us) + 1)|0;
  $acc$01$us = 1;$acc1$02$us = 1;$i$03$us = 0;
  while(1) {
   $15 = Math_imul($acc$01$us, $vals$0$us)|0;
   $16 = Math_imul($acc1$02$us, $17)|0;
   $18 = (($i$03$us) + 1)|0;
   $19 = ($18|0)<($2|0);
   if ($19) {
    $acc$01$us = $15;$acc1$02$us = $16;$i$03$us = $18;
   } else {
    $$lcssa = $15;$$lcssa10 = $16;
    break;
   }
  }
  $12 = ($$lcssa|0)<=($1|0);
  $13 = ($$lcssa10|0)>($1|0);
  $or$cond$us = $12 & $13;
  if ($or$cond$us) {
   $vals$0$us$lcssa = $vals$0$us;
   break;
  }
  $14 = ($$lcssa|0)>($1|0);
  $vals$0$us$be$v = $14 ? -1 : 1;
  $vals$0$us$be = (($vals$0$us) + ($vals$0$us$be$v))|0;
  $vals$0$us = $vals$0$us$be;
 }
 return ($vals$0$us$lcssa|0);
}