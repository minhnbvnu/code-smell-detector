function _2c5(){
$(document).unbind(".messager").bind("keydown.messager",function(e){
if(e.keyCode==27){
$("body").children("div.messager-window").children("div.messager-body").each(function(){
$(this).dialog("close");
});
}else{
if(e.keyCode==9){
var win=$("body").children("div.messager-window");
if(!win.length){
return;
}
var _2c6=win.find(".messager-input,.messager-button .l-btn");
for(var i=0;i<_2c6.length;i++){
if($(_2c6[i]).is(":focus")){
$(_2c6[i>=_2c6.length-1?0:i+1]).focus();
return false;
}
}
}else{
if(e.keyCode==13){
var _2c7=$(e.target).closest("input.messager-input");
if(_2c7.length){
var dlg=_2c7.closest(".messager-body");
_2c8(dlg,_2c7.val());
}
}
}
}
});
}