function _bb8(data){
var _bbc=_bbb(this);
var _bbd=$(_bbc).data("combogrid");
var opts=_bbd.options;
var _bbe=$(_bbc).combo("getValues");
_bca(_bbc,_bbe,_bbd.remainText);
opts.onLoadSuccess.call(this,data);
}