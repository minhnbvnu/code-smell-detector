function _5f1(_5f2,_5f3){
var opts=$(_5f2).maskedbox("options");
var vv=_5e3(_5f2).split("");
var _5f4=$(_5f2).maskedbox("getSelectionRange");
if(_5f4.start==_5f4.end){
if(_5f3){
var _5f5=_5f6(_5f2,_5f4.start);
}else{
var _5f5=_5ed(_5f2,_5f4.start);
}
var _5f7=_5f5-_5ef(_5f2,_5f5);
if(_5f7>=0){
vv.splice(_5f7,1);
}
}else{
var _5f5=_5ed(_5f2,_5f4.start);
var end=_5f6(_5f2,_5f4.end);
var _5f7=_5f5-_5ef(_5f2,_5f5);
var _5f8=end-_5ef(_5f2,end);
vv.splice(_5f7,_5f8-_5f7+1);
}
$(_5f2).maskedbox("setValue",_5e6(_5f2,vv.join("")));
$(_5f2).maskedbox("setSelectionRange",{start:_5f5,end:_5f5});
}