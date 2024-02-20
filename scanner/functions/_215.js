function _215(_216,_217){
var _218=$.data(_216,"panel");
var opts=_218.options;
var _219=_218.panel;
var _21a=_219.children(".panel-header");
var _21b=_219.children(".panel-body");
var _21c=_219.children(".panel-footer");
var _21d=(opts.halign=="left"||opts.halign=="right");
if(_217){
$.extend(opts,{width:_217.width,height:_217.height,minWidth:_217.minWidth,maxWidth:_217.maxWidth,minHeight:_217.minHeight,maxHeight:_217.maxHeight,left:_217.left,top:_217.top});
opts.hasResized=false;
}
var _21e=_219.outerWidth();
var _21f=_219.outerHeight();
_219._size(opts);
var _220=_219.outerWidth();
var _221=_219.outerHeight();
if(opts.hasResized&&(_21e==_220&&_21f==_221)){
return;
}
opts.hasResized=true;
if(!_21d){
_21a._outerWidth(_219.width());
}
_21b._outerWidth(_219.width());
if(!isNaN(parseInt(opts.height))){
if(_21d){
if(opts.header){
var _222=$(opts.header)._outerWidth();
}else{
_21a.css("width","");
var _222=_21a._outerWidth();
}
var _223=_21a.find(".panel-title");
_222+=Math.min(_223._outerWidth(),_223._outerHeight());
var _224=_219.height();
_21a._outerWidth(_222)._outerHeight(_224);
_223._outerWidth(_21a.height());
_21b._outerWidth(_219.width()-_222-_21c._outerWidth())._outerHeight(_224);
_21c._outerHeight(_224);
_21b.css({left:"",right:""});
if(_21a.length){
_21b.css(opts.halign,(_21a.position()[opts.halign]+_222)+"px");
}
opts.panelCssWidth=_219.css("width");
if(opts.collapsed){
_219._outerWidth(_222+_21c._outerWidth());
}
}else{
_21b._outerHeight(_219.height()-_21a._outerHeight()-_21c._outerHeight());
}
}else{
_21b.css("height","");
var min=$.parser.parseValue("minHeight",opts.minHeight,_219.parent());
var max=$.parser.parseValue("maxHeight",opts.maxHeight,_219.parent());
var _225=_21a._outerHeight()+_21c._outerHeight()+_219._outerHeight()-_219.height();
_21b._size("minHeight",min?(min-_225):"");
_21b._size("maxHeight",max?(max-_225):"");
}
_219.css({height:(_21d?undefined:""),minHeight:"",maxHeight:"",left:opts.left,top:opts.top});
opts.onResize.apply(_216,[opts.width,opts.height]);
$(_216).panel("doLayout");
}