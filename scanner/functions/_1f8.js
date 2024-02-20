function _1f8(_1f9){
var _1fa=$.data(_1f9,"tooltip");
if(!_1fa||!_1fa.tip){
return;
}
var opts=_1fa.options;
var tip=_1fa.tip;
var pos={left:-100000,top:-100000};
if($(_1f9).is(":visible")){
pos=_1fb(opts.position);
if(opts.position=="top"&&pos.top<0){
pos=_1fb("bottom");
}else{
if((opts.position=="bottom")&&(pos.top+tip._outerHeight()>$(window)._outerHeight()+$(document).scrollTop())){
pos=_1fb("top");
}
}
if(pos.left<0){
if(opts.position=="left"){
pos=_1fb("right");
}else{
$(_1f9).tooltip("arrow").css("left",tip._outerWidth()/2+pos.left);
pos.left=0;
}
}else{
if(pos.left+tip._outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
if(opts.position=="right"){
pos=_1fb("left");
}else{
var left=pos.left;
pos.left=$(window)._outerWidth()+$(document)._scrollLeft()-tip._outerWidth();
$(_1f9).tooltip("arrow").css("left",tip._outerWidth()/2-(pos.left-left));
}
}
}
}
tip.css({left:pos.left,top:pos.top,zIndex:(opts.zIndex!=undefined?opts.zIndex:($.fn.window?$.fn.window.defaults.zIndex++:""))});
opts.onPosition.call(_1f9,pos.left,pos.top);
function _1fb(_1fc){
opts.position=_1fc||"bottom";
tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+opts.position);
var left,top;
var _1fd=$.isFunction(opts.deltaX)?opts.deltaX.call(_1f9,opts.position):opts.deltaX;
var _1fe=$.isFunction(opts.deltaY)?opts.deltaY.call(_1f9,opts.position):opts.deltaY;
if(opts.trackMouse){
t=$();
left=opts.trackMouseX+_1fd;
top=opts.trackMouseY+_1fe;
}else{
var t=$(_1f9);
left=t.offset().left+_1fd;
top=t.offset().top+_1fe;
}
switch(opts.position){
case "right":
left+=t._outerWidth()+12+(opts.trackMouse?12:0);
if(opts.valign=="middle"){
top-=(tip._outerHeight()-t._outerHeight())/2;
}
break;
case "left":
left-=tip._outerWidth()+12+(opts.trackMouse?12:0);
if(opts.valign=="middle"){
top-=(tip._outerHeight()-t._outerHeight())/2;
}
break;
case "top":
left-=(tip._outerWidth()-t._outerWidth())/2;
top-=tip._outerHeight()+12+(opts.trackMouse?12:0);
break;
case "bottom":
left-=(tip._outerWidth()-t._outerWidth())/2;
top+=t._outerHeight()+12+(opts.trackMouse?12:0);
break;
}
return {left:left,top:top};
};
}