function _cb3(_cb4){
var _cb5=$.data(_cb4,"slider");
var opts=_cb5.options;
var _cb6=_cb5.slider;
_cb6.removeClass("slider-h slider-v slider-disabled");
_cb6.addClass(opts.mode=="h"?"slider-h":"slider-v");
_cb6.addClass(opts.disabled?"slider-disabled":"");
var _cb7=_cb6.find(".slider-inner");
_cb7.html("<a href=\"javascript:;\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
if(opts.range){
_cb7.append("<a href=\"javascript:;\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
}
_cb6.find("a.slider-handle").draggable({axis:opts.mode,cursor:"pointer",disabled:opts.disabled,onDrag:function(e){
var left=e.data.left;
var _cb8=_cb6.width();
if(opts.mode!="h"){
left=e.data.top;
_cb8=_cb6.height();
}
if(left<0||left>_cb8){
return false;
}else{
_cb9(left,this);
return false;
}
},onStartDrag:function(){
_cb5.isDragging=true;
opts.onSlideStart.call(_cb4,opts.value);
},onStopDrag:function(e){
_cb9(opts.mode=="h"?e.data.left:e.data.top,this);
opts.onSlideEnd.call(_cb4,opts.value);
opts.onComplete.call(_cb4,opts.value);
_cb5.isDragging=false;
}});
_cb6.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(e){
if(_cb5.isDragging||opts.disabled){
return;
}
var pos=$(this).offset();
_cb9(opts.mode=="h"?(e.pageX-pos.left):(e.pageY-pos.top));
opts.onComplete.call(_cb4,opts.value);
});
function _cba(_cbb){
var dd=String(opts.step).split(".");
var dlen=dd.length>1?dd[1].length:0;
return parseFloat(_cbb.toFixed(dlen));
};
function _cb9(pos,_cbc){
var _cbd=_cbe(_cb4,pos);
var s=Math.abs(_cbd%opts.step);
if(s<opts.step/2){
_cbd-=s;
}else{
_cbd=_cbd-s+opts.step;
}
_cbd=_cba(_cbd);
if(opts.range){
var v1=opts.value[0];
var v2=opts.value[1];
var m=parseFloat((v1+v2)/2);
if(_cbc){
var _cbf=$(_cbc).nextAll(".slider-handle").length>0;
if(_cbd<=v2&&_cbf){
v1=_cbd;
}else{
if(_cbd>=v1&&(!_cbf)){
v2=_cbd;
}
}
}else{
if(_cbd<v1){
v1=_cbd;
}else{
if(_cbd>v2){
v2=_cbd;
}else{
_cbd<m?v1=_cbd:v2=_cbd;
}
}
}
$(_cb4).slider("setValues",[v1,v2]);
}else{
$(_cb4).slider("setValue",_cbd);
}
};
}