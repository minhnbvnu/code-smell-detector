function _cb9(pos,_cbc){
var _cbd=_cbe(_cb4,pos);
var s=Math.abs(_cbd%opts.step);
if(s<opts.step/2){
_cbd-=s;
}else{
_cbd=_cbd-s+opts.step;
}
_cbd=_cba(_cbd);
if(opts.range){
var v1=opts.value[0];
var v2=opts.value[1];
var m=parseFloat((v1+v2)/2);
if(_cbc){
var _cbf=$(_cbc).nextAll(".slider-handle").length>0;
if(_cbd<=v2&&_cbf){
v1=_cbd;
}else{
if(_cbd>=v1&&(!_cbf)){
v2=_cbd;
}
}
}else{
if(_cbd<v1){
v1=_cbd;
}else{
if(_cbd>v2){
v2=_cbd;
}else{
_cbd<m?v1=_cbd:v2=_cbd;
}
}
}
$(_cb4).slider("setValues",[v1,v2]);
}else{
$(_cb4).slider("setValue",_cbd);
}
}