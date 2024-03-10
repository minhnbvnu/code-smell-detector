function _process_plane($in,$width,$height,$out,$size){
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
 var $indexw;
 var $indexh;
 var $code;
 var $collen;
 var $replen;
 var $color;
 var $x;
 var $revcode;
 var $last_line;
 var $this_line;
 var $org_in;
 var $org_out;
 $1=$in;
 $2=$width;
 $3=$height;
 $4=$out;
 $5=$size;
 var $6=$1;
 $org_in=$6;
 var $7=$4;
 $org_out=$7;
 $last_line=0;
 $indexh=0;
 label=2;break;
 case 2: 
 var $9=$indexh;
 var $10=$3;
 var $11=($9|0)<($10|0);
 if($11){label=3;break;}else{label=34;break;}
 case 3: 
 var $13=$org_out;
 var $14=$2;
 var $15=$3;
 var $16=(Math_imul($14,$15)|0);
 var $17=($16<<2);
 var $18=(($13+$17)|0);
 var $19=$indexh;
 var $20=((($19)+(1))|0);
 var $21=$2;
 var $22=(Math_imul($20,$21)|0);
 var $23=($22<<2);
 var $24=(((-$23))|0);
 var $25=(($18+$24)|0);
 $4=$25;
 $color=0;
 var $26=$4;
 $this_line=$26;
 $indexw=0;
 var $27=$last_line;
 var $28=($27|0)==0;
 if($28){label=4;break;}else{label=17;break;}
 case 4: 
 label=5;break;
 case 5: 
 var $31=$indexw;
 var $32=$2;
 var $33=($31|0)<($32|0);
 if($33){label=6;break;}else{label=16;break;}
 case 6: 
 var $35=$1;
 var $36=(($35+1)|0);
 $1=$36;
 var $37=HEAP8[($35)];
 var $38=($37&255);
 $code=$38;
 var $39=$code;
 var $40=$39&15;
 $replen=$40;
 var $41=$code;
 var $42=$41>>4;
 var $43=$42&15;
 $collen=$43;
 var $44=$replen;
 var $45=$44<<4;
 var $46=$collen;
 var $47=$45|$46;
 $revcode=$47;
 var $48=$revcode;
 var $49=($48|0)<=47;
 if($49){label=7;break;}else{label=9;break;}
 case 7: 
 var $51=$revcode;
 var $52=($51|0)>=16;
 if($52){label=8;break;}else{label=9;break;}
 case 8: 
 var $54=$revcode;
 $replen=$54;
 $collen=0;
 label=9;break;
 case 9: 
 label=10;break;
 case 10: 
 var $57=$collen;
 var $58=($57|0)>0;
 if($58){label=11;break;}else{label=12;break;}
 case 11: 
 var $60=$1;
 var $61=(($60+1)|0);
 $1=$61;
 var $62=HEAP8[($60)];
 var $63=($62&255);
 $color=$63;
 var $64=$color;
 var $65=(($64)&255);
 var $66=$4;
 HEAP8[($66)]=$65;
 var $67=$4;
 var $68=(($67+4)|0);
 $4=$68;
 var $69=$indexw;
 var $70=((($69)+(1))|0);
 $indexw=$70;
 var $71=$collen;
 var $72=((($71)-(1))|0);
 $collen=$72;
 label=10;break;
 case 12: 
 label=13;break;
 case 13: 
 var $75=$replen;
 var $76=($75|0)>0;
 if($76){label=14;break;}else{label=15;break;}
 case 14: 
 var $78=$color;
 var $79=(($78)&255);
 var $80=$4;
 HEAP8[($80)]=$79;
 var $81=$4;
 var $82=(($81+4)|0);
 $4=$82;
 var $83=$indexw;
 var $84=((($83)+(1))|0);
 $indexw=$84;
 var $85=$replen;
 var $86=((($85)-(1))|0);
 $replen=$86;
 label=13;break;
 case 15: 
 label=5;break;
 case 16: 
 label=33;break;
 case 17: 
 label=18;break;
 case 18: 
 var $91=$indexw;
 var $92=$2;
 var $93=($91|0)<($92|0);
 if($93){label=19;break;}else{label=32;break;}
 case 19: 
 var $95=$1;
 var $96=(($95+1)|0);
 $1=$96;
 var $97=HEAP8[($95)];
 var $98=($97&255);
 $code=$98;
 var $99=$code;
 var $100=$99&15;
 $replen=$100;
 var $101=$code;
 var $102=$101>>4;
 var $103=$102&15;
 $collen=$103;
 var $104=$replen;
 var $105=$104<<4;
 var $106=$collen;
 var $107=$105|$106;
 $revcode=$107;
 var $108=$revcode;
 var $109=($108|0)<=47;
 if($109){label=20;break;}else{label=22;break;}
 case 20: 
 var $111=$revcode;
 var $112=($111|0)>=16;
 if($112){label=21;break;}else{label=22;break;}
 case 21: 
 var $114=$revcode;
 $replen=$114;
 $collen=0;
 label=22;break;
 case 22: 
 label=23;break;
 case 23: 
 var $117=$collen;
 var $118=($117|0)>0;
 if($118){label=24;break;}else{label=28;break;}
 case 24: 
 var $120=$1;
 var $121=(($120+1)|0);
 $1=$121;
 var $122=HEAP8[($120)];
 var $123=($122&255);
 $x=$123;
 var $124=$x;
 var $125=$124&1;
 var $126=($125|0)!=0;
 if($126){label=25;break;}else{label=26;break;}
 case 25: 
 var $128=$x;
 var $129=$128>>1;
 $x=$129;
 var $130=$x;
 var $131=((($130)+(1))|0);
 $x=$131;
 var $132=$x;
 var $133=(((-$132))|0);
 $color=$133;
 label=27;break;
 case 26: 
 var $135=$x;
 var $136=$135>>1;
 $x=$136;
 var $137=$x;
 $color=$137;
 label=27;break;
 case 27: 
 var $139=$indexw;
 var $140=($139<<2);
 var $141=$last_line;
 var $142=(($141+$140)|0);
 var $143=HEAP8[($142)];
 var $144=($143&255);
 var $145=$color;
 var $146=((($144)+($145))|0);
 $x=$146;
 var $147=$x;
 var $148=(($147)&255);
 var $149=$4;
 HEAP8[($149)]=$148;
 var $150=$4;
 var $151=(($150+4)|0);
 $4=$151;
 var $152=$indexw;
 var $153=((($152)+(1))|0);
 $indexw=$153;
 var $154=$collen;
 var $155=((($154)-(1))|0);
 $collen=$155;
 label=23;break;
 case 28: 
 label=29;break;
 case 29: 
 var $158=$replen;
 var $159=($158|0)>0;
 if($159){label=30;break;}else{label=31;break;}
 case 30: 
 var $161=$indexw;
 var $162=($161<<2);
 var $163=$last_line;
 var $164=(($163+$162)|0);
 var $165=HEAP8[($164)];
 var $166=($165&255);
 var $167=$color;
 var $168=((($166)+($167))|0);
 $x=$168;
 var $169=$x;
 var $170=(($169)&255);
 var $171=$4;
 HEAP8[($171)]=$170;
 var $172=$4;
 var $173=(($172+4)|0);
 $4=$173;
 var $174=$indexw;
 var $175=((($174)+(1))|0);
 $indexw=$175;
 var $176=$replen;
 var $177=((($176)-(1))|0);
 $replen=$177;
 label=29;break;
 case 31: 
 label=18;break;
 case 32: 
 label=33;break;
 case 33: 
 var $181=$indexh;
 var $182=((($181)+(1))|0);
 $indexh=$182;
 var $183=$this_line;
 $last_line=$183;
 label=2;break;
 case 34: 
 var $185=$1;
 var $186=$org_in;
 var $187=$185;
 var $188=$186;
 var $189=((($187)-($188))|0);
 STACKTOP=sp;return $189;
  default: assert(0, "bad label: " + label);
 }

}