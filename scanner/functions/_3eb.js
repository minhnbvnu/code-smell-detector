function _3eb(_3ec,_3ed,_3ee){
if(_3ee==undefined){
_3ee="normal";
}
var _3ef=$.data(_3ec,"layout").panels;
var p=_3ef[_3ed];
var _3f0=p.panel("options");
if(_3f0.onBeforeCollapse.call(p)==false){
return;
}
var _3f1="expand"+_3ed.substring(0,1).toUpperCase()+_3ed.substring(1);
if(!_3ef[_3f1]){
_3ef[_3f1]=_3f2(_3ed);
var ep=_3ef[_3f1].panel("panel");
if(!_3f0.expandMode){
ep.css("cursor","default");
}else{
ep.bind("click",function(){
if(_3f0.expandMode=="dock"){
_3fe(_3ec,_3ed);
}else{
p.panel("expand",false).panel("open");
var _3f3=_3f4();
p.panel("resize",_3f3.collapse);
p.panel("panel").unbind(".layout").bind("mouseleave.layout",{region:_3ed},function(e){
$(this).stop(true,true);
if(_3be==true){
return;
}
if($("body>div.combo-p>div.combo-panel:visible").length){
return;
}
_3eb(_3ec,e.data.region);
});
p.panel("panel").animate(_3f3.expand,function(){
$(_3ec).layout("options").onExpand.call(_3ec,_3ed);
});
}
return false;
});
}
}
var _3f5=_3f4();
if(!_3c5(_3ef[_3f1])){
_3ef.center.panel("resize",_3f5.resizeC);
}
p.panel("panel").animate(_3f5.collapse,_3ee,function(){
p.panel("collapse",false).panel("close");
_3ef[_3f1].panel("open").panel("resize",_3f5.expandP);
$(this).unbind(".layout");
$(_3ec).layout("options").onCollapse.call(_3ec,_3ed);
});
function _3f2(dir){
var _3f6={"east":"left","west":"right","north":"down","south":"up"};
var isns=(_3f0.region=="north"||_3f0.region=="south");
var icon="layout-button-"+_3f6[dir];
var p=$("<div></div>").appendTo(_3ec);
p.panel($.extend({},$.fn.layout.paneldefaults,{cls:("layout-expand layout-expand-"+dir),title:"&nbsp;",titleDirection:_3f0.titleDirection,iconCls:(_3f0.hideCollapsedContent?null:_3f0.iconCls),closed:true,minWidth:0,minHeight:0,doSize:false,region:_3f0.region,collapsedSize:_3f0.collapsedSize,noheader:(!isns&&_3f0.hideExpandTool),tools:((isns&&_3f0.hideExpandTool)?null:[{iconCls:icon,handler:function(){
_3fe(_3ec,_3ed);
return false;
}}]),onResize:function(){
var _3f7=$(this).children(".layout-expand-title");
if(_3f7.length){
_3f7._outerWidth($(this).height());
var left=($(this).width()-Math.min(_3f7._outerWidth(),_3f7._outerHeight()))/2;
var top=Math.max(_3f7._outerWidth(),_3f7._outerHeight());
if(_3f7.hasClass("layout-expand-title-down")){
left+=Math.min(_3f7._outerWidth(),_3f7._outerHeight());
top=0;
}
_3f7.css({left:(left+"px"),top:(top+"px")});
}
}}));
if(!_3f0.hideCollapsedContent){
var _3f8=typeof _3f0.collapsedContent=="function"?_3f0.collapsedContent.call(p[0],_3f0.title):_3f0.collapsedContent;
isns?p.panel("setTitle",_3f8):p.html(_3f8);
}
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _3f4(){
var cc=$(_3ec);
var _3f9=_3ef.center.panel("options");
var _3fa=_3f0.collapsedSize;
if(_3ed=="east"){
var _3fb=p.panel("panel")._outerWidth();
var _3fc=_3f9.width+_3fb-_3fa;
if(_3f0.split||!_3f0.border){
_3fc++;
}
return {resizeC:{width:_3fc},expand:{left:cc.width()-_3fb},expandP:{top:_3f9.top,left:cc.width()-_3fa,width:_3fa,height:_3f9.height},collapse:{left:cc.width(),top:_3f9.top,height:_3f9.height}};
}else{
if(_3ed=="west"){
var _3fb=p.panel("panel")._outerWidth();
var _3fc=_3f9.width+_3fb-_3fa;
if(_3f0.split||!_3f0.border){
_3fc++;
}
return {resizeC:{width:_3fc,left:_3fa-1},expand:{left:0},expandP:{left:0,top:_3f9.top,width:_3fa,height:_3f9.height},collapse:{left:-_3fb,top:_3f9.top,height:_3f9.height}};
}else{
if(_3ed=="north"){
var _3fd=p.panel("panel")._outerHeight();
var hh=_3f9.height;
if(!_3c5(_3ef.expandNorth)){
hh+=_3fd-_3fa+((_3f0.split||!_3f0.border)?1:0);
}
_3ef.east.add(_3ef.west).add(_3ef.expandEast).add(_3ef.expandWest).panel("resize",{top:_3fa-1,height:hh});
return {resizeC:{top:_3fa-1,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:_3fa},collapse:{top:-_3fd,width:cc.width()}};
}else{
if(_3ed=="south"){
var _3fd=p.panel("panel")._outerHeight();
var hh=_3f9.height;
if(!_3c5(_3ef.expandSouth)){
hh+=_3fd-_3fa+((_3f0.split||!_3f0.border)?1:0);
}
_3ef.east.add(_3ef.west).add(_3ef.expandEast).add(_3ef.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_3fd},expandP:{top:cc.height()-_3fa,left:0,width:cc.width(),height:_3fa},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
};
}