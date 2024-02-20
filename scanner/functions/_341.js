function _341(_342,_343){
var _344=$.data(_342,"tabs");
var opts=_344.options;
var cc=$(_342);
if(!opts.doSize){
return;
}
if(_343){
$.extend(opts,{width:_343.width,height:_343.height});
}
cc._size(opts);
var _345=cc.children("div.tabs-header");
var _346=cc.children("div.tabs-panels");
var wrap=_345.find("div.tabs-wrap");
var ul=wrap.find(".tabs");
ul.children("li").removeClass("tabs-first tabs-last");
ul.children("li:first").addClass("tabs-first");
ul.children("li:last").addClass("tabs-last");
if(opts.tabPosition=="left"||opts.tabPosition=="right"){
_345._outerWidth(opts.showHeader?opts.headerWidth:0);
_346._outerWidth(cc.width()-_345.outerWidth());
_345.add(_346)._size("height",isNaN(parseInt(opts.height))?"":cc.height());
wrap._outerWidth(_345.width());
ul._outerWidth(wrap.width()).css("height","");
}else{
_345.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool:not(.tabs-tool-hidden)").css("display",opts.showHeader?"block":"none");
_345._outerWidth(cc.width()).css("height","");
if(opts.showHeader){
_345.css("background-color","");
wrap.css("height","");
}else{
_345.css("background-color","transparent");
_345._outerHeight(0);
wrap._outerHeight(0);
}
ul._outerHeight(opts.tabHeight).css("width","");
ul._outerHeight(ul.outerHeight()-ul.height()-1+opts.tabHeight).css("width","");
_346._size("height",isNaN(parseInt(opts.height))?"":(cc.height()-_345.outerHeight()));
_346._size("width",cc.width());
}
if(_344.tabs.length){
var d1=ul.outerWidth(true)-ul.width();
var li=ul.children("li:first");
var d2=li.outerWidth(true)-li.width();
var _347=_345.width()-_345.children(".tabs-tool:not(.tabs-tool-hidden)")._outerWidth();
var _348=Math.floor((_347-d1-d2*_344.tabs.length)/_344.tabs.length);
$.map(_344.tabs,function(p){
_349(p,(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0)?_348:undefined);
});
if(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0){
var _34a=_347-d1-_332(ul);
_349(_344.tabs[_344.tabs.length-1],_348+_34a);
}
}
_333(_342);
function _349(p,_34b){
var _34c=p.panel("options");
var p_t=_34c.tab.find("a.tabs-inner");
var _34b=_34b?_34b:(parseInt(_34c.tabWidth||opts.tabWidth||undefined));
if(_34b){
p_t._outerWidth(_34b);
}else{
p_t.css("width","");
}
p_t._outerHeight(opts.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
};
}