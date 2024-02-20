function _2b0(_2b1){
var opts=$.data(_2b1,"dialog").options;
opts.inited=false;
$(_2b1).window($.extend({},opts,{onResize:function(w,h){
if(opts.inited){
_2b6(this);
opts.onResize.call(this,w,h);
}
}}));
var win=$(_2b1).window("window");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$(_2b1).siblings("div.dialog-toolbar").remove();
var _2b2=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
var tr=_2b2.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:;\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
$(opts.toolbar).show();
}
}else{
$(_2b1).siblings("div.dialog-toolbar").remove();
}
if(opts.buttons){
if($.isArray(opts.buttons)){
$(_2b1).siblings("div.dialog-button").remove();
var _2b3=$("<div class=\"dialog-button\"></div>").appendTo(win);
for(var i=0;i<opts.buttons.length;i++){
var p=opts.buttons[i];
var _2b4=$("<a href=\"javascript:;\"></a>").appendTo(_2b3);
if(p.handler){
_2b4[0].onclick=p.handler;
}
_2b4.linkbutton(p);
}
}else{
$(opts.buttons).addClass("dialog-button").appendTo(win);
$(opts.buttons).show();
}
}else{
$(_2b1).siblings("div.dialog-button").remove();
}
opts.inited=true;
var _2b5=opts.closed;
win.show();
$(_2b1).window("resize",{});
if(_2b5){
win.hide();
}
}