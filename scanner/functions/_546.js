function _546(_547,_548,_549){
var _54a=$.data(_547,"validatebox");
var opts=_54a.options;
var t=$(_547);
if(_549=="hide"||!_548){
t.tooltip("hide");
}else{
if((t.is(":focus")&&_54a.validating)||_549=="show"){
t.tooltip($.extend({},opts.tipOptions,{content:_548,position:opts.tipPosition,deltaX:opts.deltaX,deltaY:opts.deltaY})).tooltip("show");
}
}
}