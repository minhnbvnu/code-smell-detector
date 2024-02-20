function _451(_452,_453){
_453=_453||{};
var left,top;
var opts=$.data(_452,"menu").options;
var menu=$(_453.menu||_452);
$(_452).menu("resize",menu[0]);
if(menu.hasClass("menu-top")){
$.extend(opts,_453);
left=opts.left;
top=opts.top;
if(opts.alignTo){
var at=$(opts.alignTo);
left=at.offset().left;
top=at.offset().top+at._outerHeight();
if(opts.align=="right"){
left+=at.outerWidth()-menu.outerWidth();
}
}
if(left+menu.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-menu.outerWidth()-5;
}
if(left<0){
left=0;
}
top=_454(top,opts.alignTo);
}else{
var _455=_453.parent;
left=_455.offset().left+_455.outerWidth()-2;
if(left+menu.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
left=_455.offset().left-menu.outerWidth()+2;
}
top=_454(_455.offset().top-3);
}
function _454(top,_456){
if(top+menu.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
if(_456){
top=$(_456).offset().top-menu._outerHeight();
}else{
top=$(window)._outerHeight()+$(document).scrollTop()-menu.outerHeight();
}
}
if(top<0){
top=0;
}
return top;
};
menu.css(opts.position.call(_452,menu[0],left,top));
menu.show(0,function(){
if(!menu[0].shadow){
menu[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(menu);
}
menu[0].shadow.css({display:(menu.hasClass("menu-inline")?"none":"block"),zIndex:$.fn.menu.defaults.zIndex++,left:menu.css("left"),top:menu.css("top"),width:menu.outerWidth(),height:menu.outerHeight()});
menu.css("z-index",$.fn.menu.defaults.zIndex++);
if(menu.hasClass("menu-top")){
opts.onShow.call(_452);
}
});
}