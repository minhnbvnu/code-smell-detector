function _bitmap_decompress_32($output,$output_width,$output_height,$input_width,$input_height,$input,$size){
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
 var $r;
 var $g;
 var $b;
 var $a;
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
 var $11=($10<<2);
 var $12=_malloc($11);
 $temp=$12;
 var $13=$temp;
 var $14=$4;
 var $15=$5;
 var $16=$6;
 var $17=$7;
 var $18=_bitmap_decompress4($13,$14,$15,$16,$17);
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
 var $34=($33<<2);
 var $35=$temp;
 var $36=(($35+$34)|0);
 var $37=HEAP8[($36)];
 $r=$37;
 var $38=$y;
 var $39=$4;
 var $40=(Math_imul($38,$39)|0);
 var $41=$x;
 var $42=((($40)+($41))|0);
 var $43=($42<<2);
 var $44=((($43)+(1))|0);
 var $45=$temp;
 var $46=(($45+$44)|0);
 var $47=HEAP8[($46)];
 $g=$47;
 var $48=$y;
 var $49=$4;
 var $50=(Math_imul($48,$49)|0);
 var $51=$x;
 var $52=((($50)+($51))|0);
 var $53=($52<<2);
 var $54=((($53)+(2))|0);
 var $55=$temp;
 var $56=(($55+$54)|0);
 var $57=HEAP8[($56)];
 $b=$57;
 var $58=$y;
 var $59=$4;
 var $60=(Math_imul($58,$59)|0);
 var $61=$x;
 var $62=((($60)+($61))|0);
 var $63=($62<<2);
 var $64=((($63)+(3))|0);
 var $65=$temp;
 var $66=(($65+$64)|0);
 var $67=HEAP8[($66)];
 $a=$67;
 var $68=$r;
 var $69=($68&255);
 var $70=$69<<16;
 var $71=-16777216|$70;
 var $72=$g;
 var $73=($72&255);
 var $74=$73<<8;
 var $75=$71|$74;
 var $76=$b;
 var $77=($76&255);
 var $78=$75|$77;
 var $79=$y;
 var $80=$2;
 var $81=(Math_imul($79,$80)|0);
 var $82=$x;
 var $83=((($81)+($82))|0);
 var $84=$1;
 var $85=$84;
 var $86=(($85+($83<<2))|0);
 HEAP32[(($86)>>2)]=$78;
 label=6;break;
 case 6: 
 var $88=$x;
 var $89=((($88)+(1))|0);
 $x=$89;
 label=4;break;
 case 7: 
 label=8;break;
 case 8: 
 var $92=$y;
 var $93=((($92)+(1))|0);
 $y=$93;
 label=2;break;
 case 9: 
 var $95=$temp;
 _free($95);
 var $96=$rv;
 STACKTOP=sp;return $96;
  default: assert(0, "bad label: " + label);
 }

}