function _42f(_435,menu){
var opts=$.data(_435,"menu").options;
var _436=menu.attr("style")||"";
var _437=menu.is(":visible");
menu.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
menu.find(".menu-item").each(function(){
$(this)._outerHeight(opts.itemHeight);
$(this).find(".menu-text").css({height:(opts.itemHeight-2)+"px",lineHeight:(opts.itemHeight-2)+"px"});
});
menu.removeClass("menu-noline").addClass(opts.noline?"menu-noline":"");
var _438=menu.data("menu").options;
var _439=_438.width;
var _43a=_438.height;
if(isNaN(parseInt(_439))){
_439=0;
menu.find("div.menu-text").each(function(){
if(_439<$(this).outerWidth()){
_439=$(this).outerWidth();
}
});
_439=_439?_439+40:"";
}
var _43b=menu.outerHeight();
if(isNaN(parseInt(_43a))){
_43a=_43b;
if(menu.hasClass("menu-top")&&opts.alignTo){
var at=$(opts.alignTo);
var h1=at.offset().top-$(document).scrollTop();
var h2=$(window)._outerHeight()+$(document).scrollTop()-at.offset().top-at._outerHeight();
_43a=Math.min(_43a,Math.max(h1,h2));
}else{
if(_43a>$(window)._outerHeight()){
_43a=$(window).height();
}
}
}
menu.attr("style",_436);
menu.show();
menu._size($.extend({},_438,{width:_439,height:_43a,minWidth:_438.minWidth||opts.minWidth,maxWidth:_438.maxWidth||opts.maxWidth}));
menu.find(".easyui-fluid").triggerHandler("_resize",[true]);
menu.css("overflow",menu.outerHeight()<_43b?"auto":"hidden");
menu.children("div.menu-line")._outerHeight(_43b-2);
if(!_437){
menu.hide();
}
}