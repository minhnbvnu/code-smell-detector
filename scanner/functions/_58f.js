function _58f(_590){
var _591=$.data(_590,"textbox");
var opts=_591.options;
var tb=_591.textbox;
var _592=tb.find(".textbox-text");
_592.attr("placeholder",opts.prompt);
_592.unbind(".textbox");
$(_591.label).unbind(".textbox");
if(!opts.disabled&&!opts.readonly){
if(_591.label){
$(_591.label).bind("click.textbox",function(e){
if(!opts.hasFocusMe){
_592.focus();
$(_590).textbox("setSelectionRange",{start:0,end:_592.val().length});
}
});
}
_592.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
opts.value=$(this).val();
if(opts.value==""){
$(this).val(opts.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
tb.closest(".form-field").removeClass("form-field-focused");
}).bind("focus.textbox",function(e){
opts.hasFocusMe=true;
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=opts.value){
$(this).val(opts.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
tb.closest(".form-field").addClass("form-field-focused");
});
for(var _593 in opts.inputEvents){
_592.bind(_593+".textbox",{target:_590},opts.inputEvents[_593]);
}
}
var _594=tb.find(".textbox-addon");
_594.unbind().bind("click",{target:_590},function(e){
var icon=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(icon.length){
var _595=parseInt(icon.attr("icon-index"));
var conf=opts.icons[_595];
if(conf&&conf.handler){
conf.handler.call(icon[0],e);
}
opts.onClickIcon.call(_590,_595);
}
});
_594.find(".textbox-icon").each(function(_596){
var conf=opts.icons[_596];
var icon=$(this);
if(!conf||conf.disabled||opts.disabled||opts.readonly){
icon.addClass("textbox-icon-disabled");
}else{
icon.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.linkbutton((opts.disabled||opts.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_597){
if($(this).hasClass("easyui-fluid")||_597){
_57b(_590);
}
return false;
});
}