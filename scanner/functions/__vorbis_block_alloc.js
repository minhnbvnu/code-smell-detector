function __vorbis_block_alloc($vb,$bytes) {
 $vb = $vb|0;
 $bytes = $bytes|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($bytes) + 7)|0;
 $1 = $0 & -8;
 $2 = ((($vb)) + 72|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = (($3) + ($1))|0;
 $5 = ((($vb)) + 76|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = ($4|0)>($6|0);
 $8 = ((($vb)) + 68|0);
 $9 = HEAP32[$8>>2]|0;
 if (!($7)) {
  $21 = $9;$22 = $3;
  $20 = (($21) + ($22)|0);
  $23 = (($22) + ($1))|0;
  HEAP32[$2>>2] = $23;
  return ($20|0);
 }
 $10 = ($9|0)==(0|0);
 if (!($10)) {
  $11 = $9;
  $12 = (_malloc(8)|0);
  $13 = ((($vb)) + 80|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = (($14) + ($3))|0;
  HEAP32[$13>>2] = $15;
  $16 = ((($vb)) + 84|0);
  $17 = HEAP32[$16>>2]|0;
  $18 = ((($12)) + 4|0);
  HEAP32[$18>>2] = $17;
  HEAP32[$12>>2] = $11;
  HEAP32[$16>>2] = $12;
 }
 HEAP32[$5>>2] = $1;
 $19 = (_malloc($1)|0);
 HEAP32[$8>>2] = $19;
 HEAP32[$2>>2] = 0;
 $21 = $19;$22 = 0;
 $20 = (($21) + ($22)|0);
 $23 = (($22) + ($1))|0;
 HEAP32[$2>>2] = $23;
 return ($20|0);
}