function _b27(_b28,_b29,_b2a){
var opts=$.data(_b28,"combobox").options;
var _b2b=$(_b28).combo("getValues");
if($.inArray(_b29+"",_b2b)==-1){
if(opts.multiple){
_b2b.push(_b29);
}else{
_b2b=[_b29];
}
_b2c(_b28,_b2b,_b2a);
}
}