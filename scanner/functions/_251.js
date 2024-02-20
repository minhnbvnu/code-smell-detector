function _251(_252,_253){
var _254=$.data(_252,"panel");
var opts=_254.options;
var _255=_254.panel;
if(_253!=true){
if(opts.onBeforeDestroy.call(_252)==false){
return;
}
}
$(_252).panel("clear").panel("clear","footer");
_214(_255);
opts.onDestroy.call(_252);
}