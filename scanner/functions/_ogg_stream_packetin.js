function _ogg_stream_packetin($os,$op) {
 $os = $os|0;
 $op = $op|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $iov = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $iov = sp;
 $0 = HEAP32[$op>>2]|0;
 HEAP32[$iov>>2] = $0;
 $1 = ((($op)) + 4|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($iov)) + 4|0);
 HEAP32[$3>>2] = $2;
 $4 = ((($op)) + 12|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($op)) + 16|0);
 $7 = $6;
 $8 = $7;
 $9 = HEAP32[$8>>2]|0;
 $10 = (($7) + 4)|0;
 $11 = $10;
 $12 = HEAP32[$11>>2]|0;
 $13 = (_ogg_stream_iovecin($os,$iov,1,$5,$9,$12)|0);
 STACKTOP = sp;return ($13|0);
}