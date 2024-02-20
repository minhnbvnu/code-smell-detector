function _284(_285,_286){
var _287=$.data(_285,"window");
if(_286){
if(_286.left!=null){
_287.options.left=_286.left;
}
if(_286.top!=null){
_287.options.top=_286.top;
}
}
$(_285).panel("move",_287.options);
if(_287.shadow){
_287.shadow.css({left:_287.options.left,top:_287.options.top});
}
}