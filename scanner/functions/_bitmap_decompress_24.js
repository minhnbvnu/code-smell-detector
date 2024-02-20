function _bitmap_decompress_24($output,$output_width,$output_height,$input_width,$input_height,$input,$size){
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
 var $11=((($10)*(3))&-1);
 var $12=_malloc($11);
 $temp=$12;
 var $13=$temp;
 var $14=$4;
 var $15=$5;
 var $16=$6;
 var $17=$7;
 var $18=_bitmap_decompress3($13,$14,$15,$16,$17);
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
 var $34=((($33)*(3))&-1);
 var $35=$temp;
 var $36=(($35+$34)|0);
 var $37=HEAP8[($36)];
 $r=$37;
 var $38=$y;
 var $39=$4;
 var $40=(Math_imul($38,$39)|0);
 var $41=$x;
 var $42=((($40)+($41))|0);
 var $43=((($42)*(3))&-1);
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
 var $53=((($52)*(3))&-1);
 var $54=((($53)+(2))|0);
 var $55=$temp;
 var $56=(($55+$54)|0);
 var $57=HEAP8[($56)];
 $b=$57;
 var $58=$b;
 var $59=($58&255);
 var $60=$59<<16;
 var $61=-16777216|$60;
 var $62=$g;
 var $63=($62&255);
 var $64=$63<<8;
 var $65=$61|$64;
 var $66=$r;
 var $67=($66&255);
 var $68=$65|$67;
 var $69=$y;
 var $70=$2;
 var $71=(Math_imul($69,$70)|0);
 var $72=$x;
 var $73=((($71)+($72))|0);
 var $74=$1;
 var $75=$74;
 var $76=(($75+($73<<2))|0);
 HEAP32[(($76)>>2)]=$68;
 label=6;break;
 case 6: 
 var $78=$x;
 var $79=((($78)+(1))|0);
 $x=$79;
 label=4;break;
 case 7: 
 label=8;break;
 case 8: 
 var $82=$y;
 var $83=((($82)+(1))|0);
 $y=$83;
 label=2;break;
 case 9: 
 var $85=$temp;
 _free($85);
 var $86=$rv;
 STACKTOP=sp;return $86;
  default: assert(0, "bad label: " + label);
 }

}