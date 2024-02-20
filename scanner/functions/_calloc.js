function _calloc($n_elements,$elem_size) {
 $n_elements = $n_elements|0;
 $elem_size = $elem_size|0;
 var $$ = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $req$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n_elements|0)==(0);
 if ($0) {
  $req$0 = 0;
 } else {
  $1 = Math_imul($elem_size, $n_elements)|0;
  $2 = $elem_size | $n_elements;
  $3 = ($2>>>0)>(65535);
  if ($3) {
   $4 = (($1>>>0) / ($n_elements>>>0))&-1;
   $5 = ($4|0)==($elem_size|0);
   $$ = $5 ? $1 : -1;
   $req$0 = $$;
  } else {
   $req$0 = $1;
  }
 }
 $6 = (_malloc($req$0)|0);
 $7 = ($6|0)==(0|0);
 if ($7) {
  return ($6|0);
 }
 $8 = ((($6)) + -4|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = $9 & 3;
 $11 = ($10|0)==(0);
 if ($11) {
  return ($6|0);
 }
 _memset(($6|0),0,($req$0|0))|0;
 return ($6|0);
}