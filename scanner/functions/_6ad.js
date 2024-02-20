function _6ad(_6ae){
var _6af=$.data(_6ae,"spinner");
var opts=_6af.options;
var _6b0=$.extend(true,[],opts.icons);
if(opts.spinAlign=="left"||opts.spinAlign=="right"){
opts.spinArrow=true;
opts.iconAlign=opts.spinAlign;
var _6b1={iconCls:"spinner-button-updown",handler:function(e){
var spin=$(e.target).closest(".spinner-arrow-up,.spinner-arrow-down");
_6bb(e.data.target,spin.hasClass("spinner-arrow-down"));
}};
if(opts.spinAlign=="left"){
_6b0.unshift(_6b1);
}else{
_6b0.push(_6b1);
}
}else{
opts.spinArrow=false;
if(opts.spinAlign=="vertical"){
if(opts.buttonAlign!="top"){
opts.buttonAlign="bottom";
}
opts.clsLeft="textbox-button-bottom";
opts.clsRight="textbox-button-top";
}else{
opts.clsLeft="textbox-button-left";
opts.clsRight="textbox-button-right";
}
}
$(_6ae).addClass("spinner-f").textbox($.extend({},opts,{icons:_6b0,doSize:false,onResize:function(_6b2,_6b3){
if(!opts.spinArrow){
var span=$(this).next();
var btn=span.find(".textbox-button:not(.spinner-button)");
if(btn.length){
var _6b4=btn.outerWidth();
var _6b5=btn.outerHeight();
var _6b6=span.find(".spinner-button."+opts.clsLeft);
var _6b7=span.find(".spinner-button."+opts.clsRight);
if(opts.buttonAlign=="right"){
_6b7.css("marginRight",_6b4+"px");
}else{
if(opts.buttonAlign=="left"){
_6b6.css("marginLeft",_6b4+"px");
}else{
if(opts.buttonAlign=="top"){
_6b7.css("marginTop",_6b5+"px");
}else{
_6b6.css("marginBottom",_6b5+"px");
}
}
}
}
}
opts.onResize.call(this,_6b2,_6b3);
}}));
$(_6ae).attr("spinnerName",$(_6ae).attr("textboxName"));
_6af.spinner=$(_6ae).next();
_6af.spinner.addClass("spinner");
if(opts.spinArrow){
var _6b8=_6af.spinner.find(".spinner-button-updown");
_6b8.append("<span class=\"spinner-arrow spinner-button-top\">"+"<span class=\"spinner-arrow-up\"></span>"+"</span>"+"<span class=\"spinner-arrow spinner-button-bottom\">"+"<span class=\"spinner-arrow-down\"></span>"+"</span>");
}else{
var _6b9=$("<a href=\"javascript:;\" class=\"textbox-button spinner-button\"></a>").addClass(opts.clsLeft).appendTo(_6af.spinner);
var _6ba=$("<a href=\"javascript:;\" class=\"textbox-button spinner-button\"></a>").addClass(opts.clsRight).appendTo(_6af.spinner);
_6b9.linkbutton({iconCls:opts.reversed?"spinner-button-up":"spinner-button-down",onClick:function(){
_6bb(_6ae,!opts.reversed);
}});
_6ba.linkbutton({iconCls:opts.reversed?"spinner-button-down":"spinner-button-up",onClick:function(){
_6bb(_6ae,opts.reversed);
}});
if(opts.disabled){
$(_6ae).spinner("disable");
}
if(opts.readonly){
$(_6ae).spinner("readonly");
}
}
$(_6ae).spinner("resize");
}