function _c58(_c5d){
var opts=$(_c5d).datebox("options");
var _c5e=$(_c5d).combo("panel");
_c5e.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _c5f=parseInt($(e.target).attr("datebox-button-index"));
opts.buttons[_c5f].handler.call(e.target,_c5d);
}
});
}