function _bba(_bc3){
return function(_bc4,row){
var _bc5=_bbb(this);
var opts=$(_bc5).combogrid("options");
if(_bc3=="onUnselectAll"){
if(opts.multiple){
_bc2.call(this);
}
}else{
_bc2.call(this);
}
opts[_bc3].call(this,_bc4,row);
};
}