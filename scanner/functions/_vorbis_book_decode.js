function _vorbis_book_decode($book,$b) {
 $book = $book|0;
 $b = $b|0;
 var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($book)) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)>(0);
 if (!($2)) {
  $$0 = -1;
  return ($$0|0);
 }
 $3 = (_decode_packed_entry_number($book,$b)|0);
 $4 = ($3|0)>(-1);
 if (!($4)) {
  $$0 = -1;
  return ($$0|0);
 }
 $5 = ((($book)) + 24|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = (($6) + ($3<<2)|0);
 $8 = HEAP32[$7>>2]|0;
 $$0 = $8;
 return ($$0|0);
}