function _362(_363,_364,pp){
_364=_364||{};
var _365=$.data(_363,"tabs");
var tabs=_365.tabs;
if(_364.index==undefined||_364.index>tabs.length){
_364.index=tabs.length;
}
if(_364.index<0){
_364.index=0;
}
var ul=$(_363).children("div.tabs-header").find("ul.tabs");
var _366=$(_363).children("div.tabs-panels");
var tab=$("<li>"+"<a href=\"javascript:;\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>"+"</li>");
if(!pp){
pp=$("<div></div>");
}
if(_364.index>=tabs.length){
tab.appendTo(ul);
pp.appendTo(_366);
tabs.push(pp);
}else{
tab.insertBefore(ul.children("li:eq("+_364.index+")"));
pp.insertBefore(_366.children("div.panel:eq("+_364.index+")"));
tabs.splice(_364.index,0,pp);
}
pp.panel($.extend({},_364,{tab:tab,border:false,noheader:true,closed:true,doSize:false,iconCls:(_364.icon?_364.icon:undefined),onLoad:function(){
if(_364.onLoad){
_364.onLoad.apply(this,arguments);
}
_365.options.onLoad.call(_363,$(this));
},onBeforeOpen:function(){
if(_364.onBeforeOpen){
if(_364.onBeforeOpen.call(this)==false){
return false;
}
}
var p=$(_363).tabs("getSelected");
if(p){
if(p[0]!=this){
$(_363).tabs("unselect",_36e(_363,p));
p=$(_363).tabs("getSelected");
if(p){
return false;
}
}else{
_34d(_363);
return false;
}
}
var _367=$(this).panel("options");
_367.tab.addClass("tabs-selected");
var wrap=$(_363).find(">div.tabs-header>div.tabs-wrap");
var left=_367.tab.position().left;
var _368=left+_367.tab.outerWidth();
if(left<0||_368>wrap.width()){
var _369=left-(wrap.width()-_367.tab.width())/2;
$(_363).tabs("scrollBy",_369);
}else{
$(_363).tabs("scrollBy",0);
}
var _36a=$(this).panel("panel");
_36a.css("display","block");
_34d(_363);
_36a.css("display","none");
},onOpen:function(){
if(_364.onOpen){
_364.onOpen.call(this);
}
var _36b=$(this).panel("options");
var _36c=_36e(_363,this);
_365.selectHis.push(_36c);
_365.options.onSelect.call(_363,_36b.title,_36c);
},onBeforeClose:function(){
if(_364.onBeforeClose){
if(_364.onBeforeClose.call(this)==false){
return false;
}
}
$(this).panel("options").tab.removeClass("tabs-selected");
},onClose:function(){
if(_364.onClose){
_364.onClose.call(this);
}
var _36d=$(this).panel("options");
_365.options.onUnselect.call(_363,_36d.title,_36e(_363,this));
}}));
$(_363).tabs("update",{tab:pp,options:pp.panel("options"),type:"header"});
}