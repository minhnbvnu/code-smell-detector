function _357(_358){
var _359=$.data(_358,"tabs");
var opts=_359.options;
$(_358).children("div.tabs-header").unbind().bind("click",function(e){
if($(e.target).hasClass("tabs-scroller-left")){
$(_358).tabs("scrollBy",-opts.scrollIncrement);
}else{
if($(e.target).hasClass("tabs-scroller-right")){
$(_358).tabs("scrollBy",opts.scrollIncrement);
}else{
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return false;
}
var a=$(e.target).closest("a.tabs-close");
if(a.length){
_37c(_358,_35a(li));
}else{
if(li.length){
var _35b=_35a(li);
var _35c=_359.tabs[_35b].panel("options");
if(_35c.collapsible){
_35c.closed?_373(_358,_35b):_393(_358,_35b);
}else{
_373(_358,_35b);
}
}
}
return false;
}
}
}).bind("contextmenu",function(e){
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
if(li.length){
opts.onContextMenu.call(_358,e,li.find("span.tabs-title").html(),_35a(li));
}
});
function _35a(li){
var _35d=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_35d=i;
return false;
}
});
return _35d;
};
}