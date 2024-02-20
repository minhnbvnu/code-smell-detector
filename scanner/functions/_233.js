function _233(){
if(opts.noheader||(!opts.title&&!opts.header)){
_214(_232.children(".panel-header"));
_232.children(".panel-body").addClass("panel-body-noheader");
}else{
if(opts.header){
$(opts.header).addClass("panel-header").prependTo(_232);
}else{
var _237=_232.children(".panel-header");
if(!_237.length){
_237=$("<div class=\"panel-header\"></div>").prependTo(_232);
}
if(!$.isArray(opts.tools)){
_237.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
}
_237.empty();
var _238=$("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_237);
if(opts.iconCls){
_238.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_237);
}
if(opts.halign=="left"||opts.halign=="right"){
_238.addClass("panel-title-"+opts.titleDirection);
}
var tool=$("<div class=\"panel-tool\"></div>").appendTo(_237);
tool.bind("click",function(e){
e.stopPropagation();
});
if(opts.tools){
if($.isArray(opts.tools)){
$.map(opts.tools,function(t){
_239(tool,t.iconCls,eval(t.handler));
});
}else{
$(opts.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
});
}
}
if(opts.collapsible){
_239(tool,"panel-tool-collapse",function(){
if(opts.collapsed==true){
_25a(_230,true);
}else{
_24b(_230,true);
}
});
}
if(opts.minimizable){
_239(tool,"panel-tool-min",function(){
_260(_230);
});
}
if(opts.maximizable){
_239(tool,"panel-tool-max",function(){
if(opts.maximized==true){
_263(_230);
}else{
_24a(_230);
}
});
}
if(opts.closable){
_239(tool,"panel-tool-close",function(){
_24c(_230);
});
}
}
_232.children("div.panel-body").removeClass("panel-body-noheader");
}
}