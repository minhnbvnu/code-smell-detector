function _vorbis_bitrate_managed($vb) {
 $vb = $vb|0;
 var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $not$ = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($vb)) + 64|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($1)) + 104|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($3)) + 80|0);
 $5 = HEAP32[$4>>2]|0;
 $not$ = ($5|0)!=(0);
 $$0 = $not$&1;
 return ($$0|0);
}