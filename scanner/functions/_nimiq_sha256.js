function _nimiq_sha256($0,$1,$2){$0=$0|0;$1=$1|0;$2=$2|0;var $3=0,label=0,sp=0;sp=STACKTOP;STACKTOP=STACKTOP+112|0;$3=sp;_sha256_init($3);_sha256_update($3,$1,$2);_sha256_final($3,$0);STACKTOP=sp;return}