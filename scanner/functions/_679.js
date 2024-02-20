function _679(_67a,_67b){
var opts=$.data(_67a,"calendar").options;
var t=$(_67a);
if(_67b){
$.extend(opts,{width:_67b.width,height:_67b.height});
}
t._size(opts,t.parent());
t.find(".calendar-body")._outerHeight(t.height()-t.find(".calendar-header")._outerHeight());
if(t.find(".calendar-menu").is(":visible")){
_67c(_67a);
}
}