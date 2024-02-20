function _aec(_aed){
var _aee=$.data(_aed,"combo");
var _aef=_aee.combo;
var _af0=_aee.panel;
var opts=$(_aed).combo("options");
var _af1=_af0.panel("options");
_af1.comboTarget=_aed;
if(_af1.closed){
_af0.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:($.fn.window?$.fn.window.defaults.zIndex++:99)),left:-999999});
_af0.panel("resize",{width:(opts.panelWidth?opts.panelWidth:_aef._outerWidth()),height:opts.panelHeight});
_af0.panel("panel").hide();
_af0.panel("open");
}
(function(){
if(_af1.comboTarget==_aed&&_af0.is(":visible")){
_af0.panel("move",{left:_af2(),top:_af3()});
setTimeout(arguments.callee,200);
}
})();
function _af2(){
var left=_aef.offset().left;
if(opts.panelAlign=="right"){
left+=_aef._outerWidth()-_af0._outerWidth();
}
if(left+_af0._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-_af0._outerWidth();
}
if(left<0){
left=0;
}
return left;
};
function _af3(){
if(opts.panelValign=="top"){
var top=_aef.offset().top-_af0._outerHeight();
}else{
if(opts.panelValign=="bottom"){
var top=_aef.offset().top+_aef._outerHeight();
}else{
var top=_aef.offset().top+_aef._outerHeight();
if(top+_af0._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_aef.offset().top-_af0._outerHeight();
}
if(top<$(document).scrollTop()){
top=_aef.offset().top+_aef._outerHeight();
}
}
}
return top;
};
}