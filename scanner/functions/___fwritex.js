function ___fwritex($0,$1,$2){$0=$0|0;$1=$1|0;$2=$2|0;var $$038=0,$$042=0,$$1=0,$$139=0,$$141=0,$$143=0,$$pre=0,$$pre47=0,$10=0,$11=0,$12=0,$13=0,$14=0,$15=0,$16=0,$17=0,$18=0,$19=0,$20=0,$21=0;var $22=0,$23=0,$24=0,$25=0,$26=0,$27=0,$28=0,$29=0,$3=0,$30=0,$31=0,$32=0,$33=0,$34=0,$4=0,$5=0,$6=0,$7=0,$8=0,$9=0;var label=0,sp=0;sp=STACKTOP;$3=$2+16|0;$4=HEAP32[$3>>2]|0;$5=($4|0)==(0|0);if($5){$7=___towrite($2)|0;$8=($7|0)==0;if($8){$$pre=HEAP32[$3>>2]|0;$12=$$pre;label=5}else{$$1=0}}else{$6=$4;$12=$6;label=5}L5:do{if((label|0)==5){$9=$2+20|0;$10=HEAP32[$9>>2]|0;$11=$12-$10|0;$13=$11>>>0<$1>>>0;$14=$10;if($13){$15=$2+36|0;$16=HEAP32[$15>>2]|0;$17=FUNCTION_TABLE_iiii[$16&3]($2,$0,$1)|0;$$1=$17;break}$18=$2+75|0;$19=HEAP8[$18>>0]|0;$20=$19<<24>>24>-1;L10:do{if($20){$$038=$1;while(1){$21=($$038|0)==0;if($21){$$139=0;$$141=$0;$$143=$1;$31=$14;break L10}$22=$$038+-1|0;$23=$0+$22|0;$24=HEAP8[$23>>0]|0;$25=$24<<24>>24==10;if($25){break}else{$$038=$22}}$26=$2+36|0;$27=HEAP32[$26>>2]|0;$28=FUNCTION_TABLE_iiii[$27&3]($2,$0,$$038)|0;$29=$28>>>0<$$038>>>0;if($29){$$1=$28;break L5}$30=$0+$$038|0;$$042=$1-$$038|0;$$pre47=HEAP32[$9>>2]|0;$$139=$$038;$$141=$30;$$143=$$042;$31=$$pre47}else{$$139=0;$$141=$0;$$143=$1;$31=$14}}while(0);_memcpy($31|0,$$141|0,$$143|0)|0;$32=HEAP32[$9>>2]|0;$33=$32+$$143|0;HEAP32[$9>>2]=$33;$34=$$139+$$143|0;$$1=$34}}while(0);return $$1|0}