function _5e0(_5e1){
var _5e2=$(_5e1).data("maskedbox");
var opts=_5e2.options;
$(_5e1).textbox(opts);
$(_5e1).maskedbox("initValue",opts.value);
}