function _slide($0,$1){$0=$0|0;$1=$1|0;var $$05559=0,$$05663=0,$$058=0,$$160=0,$10=0,$11=0,$12=0,$13=0,$14=0,$15=0,$16=0,$17=0,$18=0,$19=0,$2=0,$20=0,$21=0,$22=0,$23=0,$24=0;var $25=0,$26=0,$27=0,$28=0,$29=0,$3=0,$30=0,$31=0,$32=0,$33=0,$34=0,$35=0,$36=0,$37=0,$4=0,$5=0,$6=0,$7=0,$8=0,$9=0;var $exitcond=0,$exitcond65=0,label=0,sp=0;sp=STACKTOP;$$05663=0;while(1){$2=$$05663>>3;$3=$1+$2|0;$4=HEAP8[$3>>0]|0;$5=$4&255;$6=$$05663&7;$7=$5>>>$6;$8=$7&1;$9=$8&255;$10=$0+$$05663|0;HEAP8[$10>>0]=$9;$11=$$05663+1|0;$exitcond65=($11|0)==256;if($exitcond65){$$160=0;break}else{$$05663=$11}}while(1){$12=$0+$$160|0;$13=HEAP8[$12>>0]|0;$14=$13<<24>>24==0;L5:do{if(!$14){$$05559=1;while(1){$15=$$05559+$$160|0;$16=($15|0)<256;if(!$16){break L5}$17=$0+$15|0;$18=HEAP8[$17>>0]|0;$19=$18<<24>>24==0;L9:do{if(!$19){$20=HEAP8[$12>>0]|0;$21=$20<<24>>24;$22=$18<<24>>24;$23=$22<<$$05559;$24=$21+$23|0;$25=($24|0)<16;if($25){$26=$24&255;HEAP8[$12>>0]=$26;HEAP8[$17>>0]=0;break}$27=$21-$23|0;$28=($27|0)>-16;if(!$28){break L5}$29=$27&255;HEAP8[$12>>0]=$29;$$058=$15;while(1){$30=$0+$$058|0;$31=HEAP8[$30>>0]|0;$32=$31<<24>>24==0;if($32){break}HEAP8[$30>>0]=0;$33=$$058+1|0;$34=($33|0)<256;if($34){$$058=$33}else{break L9}}HEAP8[$30>>0]=1}}while(0);$35=$$05559+1|0;$36=($35|0)<7;if($36){$$05559=$35}else{break}}}}while(0);$37=$$160+1|0;$exitcond=($37|0)==256;if($exitcond){break}else{$$160=$37}}return}