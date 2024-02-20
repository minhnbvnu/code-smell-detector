function _577(_59c,mode){
var _59d=$.data(_59c,"textbox");
var opts=_59d.options;
var tb=_59d.textbox;
var _59e=tb.find(".textbox-text");
opts.readonly=mode==undefined?true:mode;
if(opts.readonly){
_59e.triggerHandler("blur.textbox");
}
_59e.validatebox("readonly",opts.readonly);
tb.removeClass("textbox-readonly").addClass(opts.readonly?"textbox-readonly":"");
}