function _vsnprintf($0,$1,$2,$3){$0=$0|0;$1=$1|0;$2=$2|0;$3=$3|0;var $$$015=0,$$0=0,$$014=0,$$015=0,$10=0,$11=0,$12=0,$13=0,$14=0,$15=0,$16=0,$17=0,$18=0,$19=0,$20=0,$21=0,$22=0,$23=0,$24=0,$25=0;var $4=0,$5=0,$6=0,$7=0,$8=0,$9=0,dest=0,label=0,sp=0,src=0,stop=0;sp=STACKTOP;STACKTOP=STACKTOP+128|0;$4=sp+124|0;$5=sp;dest=$5;src=33792;stop=dest+124|0;do{HEAP32[dest>>2]=HEAP32[src>>2]|0;dest=dest+4|0;src=src+4|0}while((dest|0)<(stop|0));$6=$1+-1|0;$7=$6>>>0>2147483646;if($7){$8=($1|0)==0;if($8){$$014=$4;$$015=1;label=4}else{$9=___errno_location()|0;HEAP32[$9>>2]=75;$$0=-1}}else{$$014=$0;$$015=$1;label=4}if((label|0)==4){$10=$$014;$11=-2-$10|0;$12=$$015>>>0>$11>>>0;$$$015=$12?$11:$$015;$13=$5+48|0;HEAP32[$13>>2]=$$$015;$14=$5+20|0;HEAP32[$14>>2]=$$014;$15=$5+44|0;HEAP32[$15>>2]=$$014;$16=$$014+$$$015|0;$17=$5+16|0;HEAP32[$17>>2]=$16;$18=$5+28|0;HEAP32[$18>>2]=$16;$19=_vfprintf($5,$2,$3)|0;$20=($$$015|0)==0;if($20){$$0=$19}else{$21=HEAP32[$14>>2]|0;$22=HEAP32[$17>>2]|0;$23=($21|0)==($22|0);$24=$23<<31>>31;$25=$21+$24|0;HEAP8[$25>>0]=0;$$0=$19}}STACKTOP=sp;return $$0|0}