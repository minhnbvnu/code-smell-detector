function _190(_191,_192){
var opts=$.data(_191,"tree").options;
var node=_eb(_191,_192);
if(opts.onBeforeEdit.call(_191,node)==false){
return;
}
$(_192).css("position","relative");
var nt=$(_192).find(".tree-title");
var _193=nt.outerWidth();
nt.empty();
var _194=$("<input class=\"tree-editor\">").appendTo(nt);
_194.val(node.text).focus();
_194.width(_193+20);
_194._outerHeight(opts.editorHeight);
_194.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_195(_191,_192);
return false;
}else{
if(e.keyCode==27){
_199(_191,_192);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_195(_191,_192);
});
}