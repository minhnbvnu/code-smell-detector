function _create_signature($0,$1,$2,$3,$4,$5,$6){$0=$0|0;$1=$1|0;$2=$2|0;$3=$3|0;$4=$4|0;$5=$5|0;$6=$6|0;var $7=0,$8=0,label=0,sp=0;sp=STACKTOP;STACKTOP=STACKTOP+272|0;$7=sp;$8=sp+208|0;_sha512_init($7)|0;_sha512_update($7,$3,32)|0;_sha512_update($7,$5,32)|0;_sha512_update($7,$1,$2)|0;_sha512_final($7,$8)|0;_sc_reduce($8);_sc_muladd($0,$8,$6,$4);STACKTOP=sp;return}