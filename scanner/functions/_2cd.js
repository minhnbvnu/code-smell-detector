function _2cd(_2ce){
_2c5();
var dlg=$("<div class=\"messager-body\"></div>").appendTo("body");
dlg.dialog($.extend({},_2ce,{noheader:(_2ce.title?false:true),onClose:function(){
_2c9();
if(_2ce.onClose){
_2ce.onClose.call(this);
}
dlg.dialog("destroy");
}}));
var win=dlg.dialog("dialog").addClass("messager-window");
win.find(".dialog-button").addClass("messager-button").find("a:first").focus();
return dlg;
}