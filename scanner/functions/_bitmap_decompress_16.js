function _bitmap_decompress_16($output,$output_width,$output_height,$input_width,$input_height,$input,$size){
 var label=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1;
 var $2;
 var $3;
 var $4;
 var $5;
 var $6;
 var $7;
 var $temp;
 var $rv;
 var $y;
 var $x;
 var $a;
 var $r;
 var $g;
 var $b;
 $1=$output;
 $2=$output_width;
 $3=$output_height;
 $4=$input_width;
 $5=$input_height;
 $6=$input;
 $7=$size;
 var $8=$4;
 var $9=$5;
 var $10=(Math_imul($8,$9)|0);
 var $11=($10<<1);
 var $12=_malloc($11);
 $temp=$12;
 var $13=$temp;
 var $14=$4;
 var $15=$5;
 var $16=$6;
 var $17=$7;
 var $18=_bitmap_decompress2($13,$14,$15,$16,$17);
 $rv=$18;
 $y=0;
 label=2;break;
 case 2: 
 var $20=$y;
 var $21=$3;
 var $22=($20|0)<($21|0);
 if($22){label=3;break;}else{label=9;break;}
 case 3: 
 $x=0;
 label=4;break;
 case 4: 
 var $25=$x;
 var $26=$2;
 var $27=($25|0)<($26|0);
 if($27){label=5;break;}else{label=7;break;}
 case 5: 
 var $29=$y;
 var $30=$4;
 var $31=(Math_imul($29,$30)|0);
 var $32=$x;
 var $33=((($31)+($32))|0);
 var $34=$temp;
 var $35=$34;
 var $36=(($35+($33<<1))|0);
 var $37=HEAP16[(($36)>>1)];
 $a=$37;
 var $38=$a;
 var $39=($38&65535);
 var $40=$39&63488;
 var $41=$40>>11;
 var $42=(($41)&255);
 $r=$42;
 var $43=$a;
 var $44=($43&65535);
 var $45=$44&2016;
 var $46=$45>>5;
 var $47=(($46)&255);
 $g=$47;
 var $48=$a;
 var $49=($48&65535);
 var $50=$49&31;
 var $51=(($50)&255);
 $b=$51;
 var $52=$r;
 var $53=($52&255);
 var $54=((($53)*(255))&-1);
 var $55=(((($54|0))/(31))&-1);
 var $56=(($55)&255);
 $r=$56;
 var $57=$g;
 var $58=($57&255);
 var $59=((($58)*(255))&-1);
 var $60=(((($59|0))/(63))&-1);
 var $61=(($60)&255);
 $g=$61;
 var $62=$b;
 var $63=($62&255);
 var $64=((($63)*(255))&-1);
 var $65=(((($64|0))/(31))&-1);
 var $66=(($65)&255);
 $b=$66;
 var $67=$b;
 var $68=($67&255);
 var $69=$68<<16;
 var $70=-16777216|$69;
 var $71=$g;
 var $72=($71&255);
 var $73=$72<<8;
 var $74=$70|$73;
 var $75=$r;
 var $76=($75&255);
 var $77=$74|$76;
 var $78=$y;
 var $79=$2;
 var $80=(Math_imul($78,$79)|0);
 var $81=$x;
 var $82=((($80)+($81))|0);
 var $83=$1;
 var $84=$83;
 var $85=(($84+($82<<2))|0);
 HEAP32[(($85)>>2)]=$77;
 label=6;break;
 case 6: 
 var $87=$x;
 var $88=((($87)+(1))|0);
 $x=$88;
 label=4;break;
 case 7: 
 label=8;break;
 case 8: 
 var $91=$y;
 var $92=((($91)+(1))|0);
 $y=$92;
 label=2;break;
 case 9: 
 var $94=$temp;
 _free($94);
 var $95=$rv;
 STACKTOP=sp;return $95;
  default: assert(0, "bad label: " + label);
 }

}