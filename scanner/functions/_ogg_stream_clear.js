function _ogg_stream_clear($os) {
 $os = $os|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($os|0)==(0|0);
 if ($0) {
  return 0;
 }
 $1 = HEAP32[$os>>2]|0;
 $2 = ($1|0)==(0|0);
 if (!($2)) {
  _free($1);
 }
 $3 = ((($os)) + 16|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)==(0|0);
 if (!($5)) {
  _free($4);
 }
 $6 = ((($os)) + 20|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)==(0|0);
 if (!($8)) {
  _free($7);
 }
 _memset(($os|0),0,360)|0;
 return 0;
}