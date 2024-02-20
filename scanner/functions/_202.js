function _202(_208,_209){
var _20a=$.data(_208,"tooltip");
var opts=_20a.options;
if(_209){
opts.content=_209;
}
if(!_20a.tip){
return;
}
var cc=typeof opts.content=="function"?opts.content.call(_208):opts.content;
_20a.tip.children(".tooltip-content").html(cc);
opts.onUpdate.call(_208,cc);
}