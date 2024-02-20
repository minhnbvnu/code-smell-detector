function _cc0(_cc1,_cc2){
var _cc3=$.data(_cc1,"slider");
var opts=_cc3.options;
var _cc4=_cc3.slider;
var _cc5=$.isArray(opts.value)?opts.value:[opts.value];
var _cc6=[];
if(!$.isArray(_cc2)){
_cc2=$.map(String(_cc2).split(opts.separator),function(v){
return parseFloat(v);
});
}
_cc4.find(".slider-value").remove();
var name=$(_cc1).attr("sliderName")||"";
for(var i=0;i<_cc2.length;i++){
var _cc7=_cc2[i];
if(_cc7<opts.min){
_cc7=opts.min;
}
if(_cc7>opts.max){
_cc7=opts.max;
}
var _cc8=$("<input type=\"hidden\" class=\"slider-value\">").appendTo(_cc4);
_cc8.attr("name",name);
_cc8.val(_cc7);
_cc6.push(_cc7);
var _cc9=_cc4.find(".slider-handle:eq("+i+")");
var tip=_cc9.next();
var pos=_cca(_cc1,_cc7);
if(opts.showTip){
tip.show();
tip.html(opts.tipFormatter.call(_cc1,_cc7));
}else{
tip.hide();
}
if(opts.mode=="h"){
var _ccb="left:"+pos+"px;";
_cc9.attr("style",_ccb);
tip.attr("style",_ccb+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _ccb="top:"+pos+"px;";
_cc9.attr("style",_ccb);
tip.attr("style",_ccb+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
}
opts.value=opts.range?_cc6:_cc6[0];
$(_cc1).val(opts.range?_cc6.join(opts.separator):_cc6[0]);
if(_cc5.join(",")!=_cc6.join(",")){
opts.onChange.call(_cc1,opts.value,(opts.range?_cc5:_cc5[0]));
}
}