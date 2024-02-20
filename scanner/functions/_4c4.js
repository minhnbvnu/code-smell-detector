function _4c4(_4c5,_4c6){
var _4c7=$.data(_4c5,"switchbutton");
var opts=_4c7.options;
var _4c8=_4c7.switchbutton;
if(_4c6){
$.extend(opts,_4c6);
}
var _4c9=_4c8.is(":visible");
if(!_4c9){
_4c8.appendTo("body");
}
_4c8._size(opts);
var w=_4c8.width();
var h=_4c8.height();
var w=_4c8.outerWidth();
var h=_4c8.outerHeight();
var _4ca=parseInt(opts.handleWidth)||_4c8.height();
var _4cb=w*2-_4ca;
_4c8.find(".switchbutton-inner").css({width:_4cb+"px",height:h+"px",lineHeight:h+"px"});
_4c8.find(".switchbutton-handle")._outerWidth(_4ca)._outerHeight(h).css({marginLeft:-_4ca/2+"px"});
_4c8.find(".switchbutton-on").css({width:(w-_4ca/2)+"px",textIndent:(opts.reversed?"":"-")+_4ca/2+"px"});
_4c8.find(".switchbutton-off").css({width:(w-_4ca/2)+"px",textIndent:(opts.reversed?"-":"")+_4ca/2+"px"});
opts.marginWidth=w-_4ca;
_4cc(_4c5,opts.checked,false);
if(!_4c9){
_4c8.insertAfter(_4c5);
}
}