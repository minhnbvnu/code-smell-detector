function __vp_ampmax_decay($amp,$vd) {
 $amp = +$amp;
 $vd = $vd|0;
 var $$0 = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($vd)) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($1)) + 28|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($vd)) + 40|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = (($3) + ($5<<2)|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($7|0) / 2)&-1;
 $9 = (+($8|0));
 $10 = ((($1)) + 8|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (+($11|0));
 $13 = $9 / $12;
 $14 = ((($3)) + 2936|0);
 $15 = +HEAPF32[$14>>2];
 $16 = $15 * $13;
 $17 = $16 + $amp;
 $18 = $17 < -9999.0;
 $$0 = $18 ? -9999.0 : $17;
 return (+$$0);
}