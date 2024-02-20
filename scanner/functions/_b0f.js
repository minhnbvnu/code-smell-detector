function _b0f(_b10){
var opts=$.data(_b10,"combo").options;
var _b11=opts.onChange;
opts.onChange=$.parser.emptyFn;
if(opts.multiple){
_aff(_b10,opts.value?opts.value:[]);
}else{
_b0c(_b10,opts.value);
}
opts.onChange=_b11;
}