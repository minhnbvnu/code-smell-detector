function _6c4(_6c5,down){
var opts=$.data(_6c5,"numberspinner").options;
var v=parseFloat($(_6c5).numberbox("getValue")||opts.value)||0;
if(down){
v-=opts.increment;
}else{
v+=opts.increment;
}
$(_6c5).numberbox("setValue",v);
}