function _free_memory($0,$1,$2,$3){$0=$0|0;$1=$1|0;$2=$2|0;$3=$3|0;var $10=0,$11=0,$4=0,$5=0,$6=0,$7=0,$8=0,$9=0,label=0,sp=0;sp=STACKTOP;$4=Math_imul($3,$2)|0;$5=$0+68|0;$6=HEAP32[$5>>2]|0;$7=$6&4;$8=($7|0)==0;if($8){_clear_internal_memory($1,$4)}$9=$0+64|0;$10=HEAP32[$9>>2]|0;$11=($10|0)==(0|0);if($11){_free($1);return}else{FUNCTION_TABLE_vii[$10&0]($1,$4);return}}