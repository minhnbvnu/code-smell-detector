function _5e9(_5ea,c){
var opts=$(_5ea).maskedbox("options");
var _5eb=$(_5ea).maskedbox("getSelectionRange");
var _5ec=_5ed(_5ea,_5eb.start);
var end=_5ed(_5ea,_5eb.end);
if(_5ec!=-1){
var r=new RegExp(opts.masks[opts.mask[_5ec]],"i");
if(r.test(c)){
var vv=_5e3(_5ea).split("");
var _5ee=_5ec-_5ef(_5ea,_5ec);
var _5f0=end-_5ef(_5ea,end);
vv.splice(_5ee,_5f0-_5ee,c);
$(_5ea).maskedbox("setValue",_5e6(_5ea,vv.join("")));
_5ec=_5ed(_5ea,++_5ec);
$(_5ea).maskedbox("setSelectionRange",{start:_5ec,end:_5ec});
}
}
}