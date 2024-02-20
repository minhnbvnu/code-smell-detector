function _374(_375,_376){
_376.type=_376.type||"all";
var _377=$.data(_375,"tabs").selectHis;
var pp=_376.tab;
var opts=pp.panel("options");
var _378=opts.title;
$.extend(opts,_376.options,{iconCls:(_376.options.icon?_376.options.icon:undefined)});
if(_376.type=="all"||_376.type=="body"){
pp.panel();
}
if(_376.type=="all"||_376.type=="header"){
var tab=opts.tab;
if(opts.header){
tab.find(".tabs-inner").html($(opts.header));
}else{
var _379=tab.find("span.tabs-title");
var _37a=tab.find("span.tabs-icon");
_379.html(opts.title);
_37a.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(opts.closable){
_379.addClass("tabs-closable");
$("<a href=\"javascript:;\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
_379.removeClass("tabs-closable");
}
if(opts.iconCls){
_379.addClass("tabs-with-icon");
_37a.addClass(opts.iconCls);
}else{
_379.removeClass("tabs-with-icon");
}
if(opts.tools){
var _37b=tab.find("span.tabs-p-tool");
if(!_37b.length){
var _37b=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
}
if($.isArray(opts.tools)){
_37b.empty();
for(var i=0;i<opts.tools.length;i++){
var t=$("<a href=\"javascript:;\"></a>").appendTo(_37b);
t.addClass(opts.tools[i].iconCls);
if(opts.tools[i].handler){
t.bind("click",{handler:opts.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}else{
$(opts.tools).children().appendTo(_37b);
}
var pr=_37b.children().length*12;
if(opts.closable){
pr+=8;
_37b.css("right","");
}else{
pr-=3;
_37b.css("right","5px");
}
_379.css("padding-right",pr+"px");
}else{
tab.find("span.tabs-p-tool").remove();
_379.css("padding-right","");
}
}
}
if(opts.disabled){
opts.tab.addClass("tabs-disabled");
}else{
opts.tab.removeClass("tabs-disabled");
}
_341(_375);
$.data(_375,"tabs").options.onUpdate.call(_375,opts.title,_36e(_375,pp));
}