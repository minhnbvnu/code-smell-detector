function _bb9(_bbf,row){
var _bc0=_bbb(this);
var _bc1=$(_bc0).data("combogrid");
var opts=_bc1.options;
_bc1.remainText=false;
_bc2.call(this);
if(!opts.multiple){
$(_bc0).combo("hidePanel");
}
opts.onClickRow.call(this,_bbf,row);
}